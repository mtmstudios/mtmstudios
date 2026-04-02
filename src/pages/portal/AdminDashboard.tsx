import { useEffect, useState } from "react";
import {
  Users,
  Phone,
  Euro,
  AlertCircle,
  CheckCircle,
  Search,
  ChevronDown,
  TrendingUp,
} from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import PortalLayout, { StatCard, SectionHeading, StatusBadge } from "@/components/portal/PortalLayout";
import type { Profile, N8nError, CustomerSummary, CallStat } from "@/types/portal";

const COST_PER_MIN = 0.15;

export default function AdminDashboard() {
  const { profile } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [customers, setCustomers] = useState<CustomerSummary[]>([]);
  const [errors, setErrors] = useState<N8nError[]>([]);
  const [loadingCustomers, setLoadingCustomers] = useState(true);
  const [loadingErrors, setLoadingErrors] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [dateRange, setDateRange] = useState<7 | 14 | 30 | 90>(30);

  // Fetch only when confirmed admin — useEffect MUST be before any conditional return (React Rules of Hooks)
  useEffect(() => {
    if (profile?.is_admin) {
      fetchCustomers();
      fetchAllErrors();
    }
  }, [profile?.is_admin, dateRange]);

  async function fetchCustomers() {
    setLoadingCustomers(true);
    const { data: profiles } = await (supabase
      .from("profiles") as any)
      .select("*")
      .eq("is_admin", false)
      .order("created_at", { ascending: false });

    if (!profiles) { setLoadingCustomers(false); return; }

    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - dateRange);

    const summaries: CustomerSummary[] = await Promise.all(
      profiles.map(async (prof: Profile) => {
        const { data: stats } = await (supabase
          .from("call_stats") as any)
          .select("*")
          .eq("customer_id", prof.id)
          .gte("date", fromDate.toISOString().split("T")[0])
          .order("date", { ascending: false })
          .limit(dateRange);

        const { data: errs } = await (supabase
          .from("n8n_errors") as any)
          .select("*")
          .eq("customer_id", prof.id)
          .order("created_at", { ascending: false })
          .limit(5);

        const dailyStats: CallStat[] = stats ?? [];
        const recentErrors: N8nError[] = errs ?? [];

        const totalCalls = dailyStats.reduce((s, r) => s + r.total_calls, 0);
        const answeredCalls = dailyStats.reduce((s, r) => s + r.answered_calls, 0);
        const totalCostEur = dailyStats.reduce((s, r) => s + (r.duration_seconds / 60) * COST_PER_MIN, 0);
        const openErrors = recentErrors.filter((e) => e.status === "open").length;

        return {
          profile: prof,
          totalCalls,
          answeredCalls,
          totalCostEur,
          openErrors,
          dailyStats,
          recentErrors,
        };
      })
    );

    setCustomers(summaries);
    // Auto-expand all customers on load
    setExpanded(new Set(summaries.map((s) => s.profile.id)));
    setLoadingCustomers(false);
  }

  async function fetchAllErrors() {
    const { data } = await (supabase
      .from("n8n_errors") as any)
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    setErrors((data as N8nError[]) ?? []);
    setLoadingErrors(false);
  }

  async function resolveError(id: string) {
    const { error } = await (supabase.from("n8n_errors") as any)
      .update({ status: "resolved" })
      .eq("id", id);
    if (error) { console.error("[AdminDashboard] resolveError failed:", error.message); return; }
    setErrors((prev) => prev.map((e) => (e.id === id ? { ...e, status: "resolved" as const } : e)));
    // Also update within customer summaries
    setCustomers((prev) => prev.map((c) => ({
      ...c,
      recentErrors: c.recentErrors.map((e) => e.id === id ? { ...e, status: "resolved" as const } : e),
      openErrors: c.recentErrors.filter((e) => e.id !== id && e.status === "open").length,
    })));
  }

  function toggleExpand(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  // System-wide totals
  const totalCalls = customers.reduce((s, c) => s + c.totalCalls, 0);
  const totalCost = customers.reduce((s, c) => s + c.totalCostEur, 0);
  const openErrors = errors.filter((e) => e.status === "open").length;

  const filtered = customers.filter((c) => {
    const q = search.toLowerCase();
    return !q || c.profile.name?.toLowerCase().includes(q) || c.profile.company?.toLowerCase().includes(q);
  });

  const displayErrors = selectedCustomer ? errors.filter((e) => e.customer_id === selectedCustomer) : errors;

  // ── Theme tokens ──
  const cardBg = isDark ? "bg-[#0E0E16] border-white/[0.07]" : "bg-white border-slate-200/80 shadow-sm";
  const cardBgDeep = isDark ? "bg-[#0A0A0F] border-white/[0.06]" : "bg-slate-50 border-slate-200/60";
  const eyebrowColor = isDark ? "text-[#00E5C0]" : "text-teal-600";
  const headingColor = isDark ? "text-white" : "text-slate-900";
  const subColor = isDark ? "text-slate-400" : "text-slate-500";
  const spinnerColor = isDark ? "border-[#00E5C0]" : "border-teal-500";
  const mutedColor = isDark ? "text-slate-600" : "text-slate-400";
  const emptyText = isDark ? "text-slate-600" : "text-slate-400";
  const accentText = isDark ? "text-[#00E5C0]" : "text-teal-600";
  const accentBg = isDark ? "bg-[#00E5C0]/10" : "bg-teal-500/10";

  const tableHeaderText = isDark ? "text-slate-600" : "text-slate-400";
  const tableHeaderBorder = isDark ? "border-white/[0.06]" : "border-slate-200";
  const tableRowBorder = isDark ? "border-white/[0.04]" : "border-slate-100";
  const tableCellPrimary = isDark ? "text-white" : "text-slate-900";
  const tableCellMuted = isDark ? "text-slate-400" : "text-slate-500";
  const tableCellSubtext = isDark ? "text-slate-600" : "text-slate-400";
  const tableCellAccent = isDark ? "text-[#00E5C0]" : "text-teal-600";
  const tableRowSelected = isDark ? "bg-[#00E5C0]/5" : "bg-teal-500/5";
  const tableRowHover = isDark ? "hover:bg-white/[0.02]" : "hover:bg-slate-50";

  const searchInputBg = isDark
    ? "bg-[#050508] border-white/[0.08] text-white placeholder:text-slate-600 focus:border-[#00E5C0]"
    : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-teal-500";

  const errorRowBg = isDark ? "bg-[#050508] border-white/[0.06]" : "bg-white border-slate-200/80";
  const customerBadgeBg = isDark ? "bg-white/[0.06] text-slate-400" : "bg-slate-100 text-slate-500";
  const resolveBtn = isDark ? "text-[#00E5C0] hover:underline" : "text-teal-600 hover:underline";
  const clearFilterBtn = isDark ? "text-slate-600 hover:text-white" : "text-slate-400 hover:text-slate-900";

  // Chart tokens
  const accentColor = isDark ? "#00E5C0" : "#0d9488";
  const gridStroke = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)";
  const axisTickFill = isDark ? "#475569" : "#94a3b8";
  const tooltipStyle = isDark
    ? { background: "#0E0E16", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, color: "#fff", fontSize: 11 }
    : { background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 8, color: "#0f172a", fontSize: 11 };

  // Guard: non-admin users (loaded, confirmed) see nothing
  if (profile !== undefined && profile !== null && !profile.is_admin) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center h-64">
          <p className={`text-sm ${isDark ? "text-slate-600" : "text-slate-400"}`}>Keine Berechtigung.</p>
        </div>
      </PortalLayout>
    );
  }

  // Mini stat box for customer cards
  function MiniStat({ label, value, accent }: { label: string; value: string | number; accent?: boolean }) {
    return (
      <div className={`rounded-xl border px-4 py-3 ${cardBgDeep}`}>
        <p className={`text-[11px] font-medium mb-1 ${mutedColor}`}>{label}</p>
        <p className={`text-xl font-bold tracking-tight ${accent ? accentText : headingColor}`}>{value}</p>
      </div>
    );
  }

  return (
    <PortalLayout>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
        <div>
          <p className={`text-xs font-semibold tracking-widest ${eyebrowColor} uppercase mb-1`}>Administration</p>
          <h1 className={`text-2xl font-bold ${headingColor}`}>Admin Dashboard</h1>
          <p className={`text-sm ${subColor} mt-1`}>Alle Kunden und System-Aktivitäten im Überblick</p>
        </div>
        <div className={`flex gap-1 rounded-xl p-1 self-start mt-1 ${isDark ? "bg-white/[0.04]" : "bg-slate-100"}`}>
          {([7, 14, 30, 90] as const).map((d) => (
            <button key={d} onClick={() => setDateRange(d)}
              className={`text-[11px] px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                dateRange === d
                  ? isDark ? "bg-[#00E5C0] text-black" : "bg-teal-500 text-white"
                  : isDark ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-700"
              }`}>
              {d}T
            </button>
          ))}
        </div>
      </div>

      {/* System stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Kunden gesamt" value={loadingCustomers ? "—" : customers.length} icon={<Users size={18} />} />
        <StatCard label="Gesamte Anrufe" value={loadingCustomers ? "—" : totalCalls} icon={<Phone size={18} />} accent />
        <StatCard label="Gesamtkosten" value={loadingCustomers ? "—" : `€${totalCost.toFixed(2)}`} icon={<Euro size={18} />} />
        <StatCard label="Offene Fehler" value={loadingErrors ? "—" : openErrors} icon={<AlertCircle size={18} />} accent={openErrors > 0} />
      </div>

      {/* ── Alle Kunden Tabelle ── */}
      <div className={`rounded-2xl border p-5 mb-8 ${cardBg}`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <SectionHeading title="Alle Kunden" badge={`${customers.length}`} />
          <div className="relative">
            <Search size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 ${mutedColor}`} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Suchen..."
              className={`rounded-xl pl-8 pr-4 py-2 text-sm border w-full sm:w-48 transition-colors focus:outline-none ${searchInputBg}`}
            />
          </div>
        </div>

        {loadingCustomers ? (
          <div className="h-24 flex items-center justify-center">
            <div className={`w-6 h-6 border-2 ${spinnerColor} border-t-transparent rounded-full animate-spin`} />
          </div>
        ) : filtered.length === 0 ? (
          <p className={`text-sm ${emptyText} py-4`}>Keine Kunden gefunden.</p>
        ) : (
          <div className="overflow-x-auto -mx-5">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className={`text-left text-xs ${tableHeaderText} border-b ${tableHeaderBorder}`}>
                  <th className="pb-3 pr-4 pl-5 font-medium">Kunde</th>
                  <th className="pb-3 pr-4 font-medium">Anrufe</th>
                  <th className="pb-3 pr-4 font-medium hidden sm:table-cell">Beantwortet</th>
                  <th className="pb-3 pr-4 font-medium hidden sm:table-cell">Kosten</th>
                  <th className="pb-3 pr-4 font-medium">Fehler</th>
                  <th className="pb-3 pr-5 font-medium hidden md:table-cell">Seit</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(({ profile: prof, totalCalls: tc, answeredCalls: ac, totalCostEur: cost, openErrors: oe }) => (
                  <tr
                    key={prof.id}
                    onClick={() => setSelectedCustomer((prev) => (prev === prof.id ? null : prof.id))}
                    className={`border-b ${tableRowBorder} cursor-pointer transition-colors ${selectedCustomer === prof.id ? tableRowSelected : tableRowHover}`}
                  >
                    <td className="py-3 pr-4 pl-5">
                      <p className={`font-medium ${tableCellPrimary}`}>{prof.name ?? "—"}</p>
                      <p className={`text-xs ${tableCellSubtext}`}>{prof.company ?? "—"}</p>
                    </td>
                    <td className={`py-3 pr-4 ${tableCellPrimary} font-medium`}>{tc}</td>
                    <td className={`py-3 pr-4 ${tableCellAccent} font-medium hidden sm:table-cell`}>{ac}</td>
                    <td className={`py-3 pr-4 ${tableCellMuted} hidden sm:table-cell`}>€{cost.toFixed(2)}</td>
                    <td className="py-3 pr-4">
                      {oe > 0 ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400">{oe} offen</span>
                      ) : (
                        <CheckCircle size={14} className="text-emerald-500" />
                      )}
                    </td>
                    <td className={`py-3 pr-5 ${tableCellSubtext} text-xs hidden md:table-cell`}>
                      {format(new Date(prof.created_at), "dd.MM.yy")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Kundenübersichten ── */}
      {!loadingCustomers && customers.length > 0 && (
        <div className="mb-8">
          <div className="mb-5">
            <SectionHeading title="Kundenübersichten" badge={`${customers.length} Kunden`} />
          </div>

          <div className="space-y-4">
            {customers.map((c) => {
              const isOpen = expanded.has(c.profile.id);
              const initials = (c.profile.name?.trim() || c.profile.company?.trim() || "?")[0].toUpperCase();

              // Chart data for this customer
              const chartData = [...c.dailyStats]
                .slice(0, 14)
                .reverse()
                .map((r) => ({
                  date: format(new Date(r.date), "dd.MM", { locale: de }),
                  Anrufe: r.total_calls,
                  Beantwortet: r.answered_calls,
                }));

              const answerRate = c.totalCalls > 0
                ? Math.round((c.answeredCalls / c.totalCalls) * 100)
                : 0;

              const totalDuration = c.dailyStats.reduce((s, r) => s + r.duration_seconds, 0);
              const avgDurationMin = c.dailyStats.length > 0
                ? Math.round(totalDuration / c.dailyStats.length / 60 * 10) / 10
                : 0;

              return (
                <div key={c.profile.id} className={`rounded-2xl border overflow-hidden ${cardBg}`}>
                  {/* Card header — always visible */}
                  <button
                    onClick={() => toggleExpand(c.profile.id)}
                    className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-colors cursor-pointer ${isDark ? "hover:bg-white/[0.02]" : "hover:bg-slate-50"}`}
                  >
                    {/* Avatar */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${accentBg} ${accentText}`}>
                      {initials}
                    </div>

                    {/* Name + company */}
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold text-[15px] ${headingColor}`}>{c.profile.name ?? c.profile.company ?? "Unbekannt"}</p>
                      <p className={`text-xs ${mutedColor}`}>{c.profile.company ?? ""}</p>
                    </div>

                    {/* Quick stats inline */}
                    <div className="hidden md:flex items-center gap-5 mr-2">
                      <div className="text-center">
                        <p className={`text-[13px] font-bold ${headingColor}`}>{c.totalCalls}</p>
                        <p className={`text-[10px] ${mutedColor}`}>Anrufe</p>
                      </div>
                      <div className="text-center">
                        <p className={`text-[13px] font-bold ${accentText}`}>{answerRate}%</p>
                        <p className={`text-[10px] ${mutedColor}`}>Quote</p>
                      </div>
                      <div className="text-center">
                        <p className={`text-[13px] font-bold ${headingColor}`}>€{c.totalCostEur.toFixed(2)}</p>
                        <p className={`text-[10px] ${mutedColor}`}>Kosten</p>
                      </div>
                      {c.openErrors > 0 && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400">
                          {c.openErrors} Fehler
                        </span>
                      )}
                    </div>

                    {/* Chevron */}
                    <ChevronDown
                      size={16}
                      className={`flex-shrink-0 transition-transform duration-200 ${mutedColor} ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Expandable content */}
                  {isOpen && (
                    <div className={`border-t ${isDark ? "border-white/[0.06]" : "border-slate-100"} px-5 pt-5 pb-5`}>

                      {/* Mini stat grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                        <MiniStat label="Gesamte Anrufe" value={c.totalCalls} />
                        <MiniStat label="Beantwortet" value={c.answeredCalls} accent />
                        <MiniStat label="Antwortquote" value={`${answerRate}%`} accent />
                        <MiniStat label="Kosten gesamt" value={`€${c.totalCostEur.toFixed(2)}`} />
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                        <MiniStat label="Ø Min/Tag" value={`${avgDurationMin} min`} />
                        <MiniStat label="Tage mit Daten" value={c.dailyStats.length} />
                        <MiniStat label="Offene Fehler" value={c.openErrors} accent={c.openErrors > 0} />
                        <MiniStat label="Kunde seit" value={format(new Date(c.profile.created_at), "dd.MM.yy")} />
                      </div>

                      {/* Chart */}
                      {chartData.length > 0 ? (
                        <div className={`rounded-xl border p-4 mb-5 ${cardBgDeep}`}>
                          <p className={`text-[12px] font-semibold ${mutedColor} mb-3`}>Anrufverlauf — Letzte 14 Tage</p>
                          <ResponsiveContainer width="100%" height={130}>
                            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                              <defs>
                                <linearGradient id={`grad-${c.profile.id}`} x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor={accentColor} stopOpacity={0.18} />
                                  <stop offset="95%" stopColor={accentColor} stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                              <XAxis dataKey="date" tick={{ fill: axisTickFill, fontSize: 10 }} axisLine={false} tickLine={false} />
                              <YAxis tick={{ fill: axisTickFill, fontSize: 10 }} axisLine={false} tickLine={false} />
                              <Tooltip contentStyle={tooltipStyle} />
                              <Area type="monotone" dataKey="Anrufe" stroke={accentColor} strokeWidth={1.5} fill={`url(#grad-${c.profile.id})`} />
                              <Area type="monotone" dataKey="Beantwortet" stroke="#22C55E" strokeWidth={1.5} fill="none" strokeDasharray="4 3" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      ) : (
                        <p className={`text-sm ${emptyText} mb-5`}>Noch keine Anruf-Statistiken vorhanden.</p>
                      )}

                      {/* Recent errors for this customer */}
                      {c.recentErrors.length > 0 && (
                        <div>
                          <p className={`text-[12px] font-semibold ${mutedColor} mb-2`}>Letzte Fehler</p>
                          <div className="space-y-1.5">
                            {c.recentErrors.map((err) => (
                              <div key={err.id} className={`flex items-start justify-between gap-3 rounded-xl border px-4 py-2.5 ${errorRowBg}`}>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-0.5">
                                    <StatusBadge status={err.status} />
                                    <span className={`text-[10px] ${tableCellSubtext}`}>
                                      {format(new Date(err.created_at), "dd.MM.yy HH:mm")}
                                    </span>
                                  </div>
                                  <p className={`text-xs font-medium ${tableCellPrimary}`}>{err.workflow_name}</p>
                                  {err.error_message && (
                                    <p className={`text-[11px] ${tableCellMuted} mt-0.5 truncate`}>{err.error_message}</p>
                                  )}
                                </div>
                                {err.status === "open" && (
                                  <button onClick={() => resolveError(err.id)} className={`text-xs flex-shrink-0 cursor-pointer ${resolveBtn}`}>
                                    Beheben
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Fehler-Log (gesamt) ── */}
      <div className={`rounded-2xl border p-5 ${cardBg}`}>
        <div className="flex items-center justify-between mb-4">
          <SectionHeading
            title={selectedCustomer ? "Fehler (gefiltert)" : "Fehler-Log — alle Kunden"}
            badge={openErrors > 0 ? `${openErrors} offen` : undefined}
          />
          {selectedCustomer && (
            <button onClick={() => setSelectedCustomer(null)} className={`text-xs transition-colors cursor-pointer ${clearFilterBtn}`}>
              Filter aufheben
            </button>
          )}
        </div>

        {loadingErrors ? (
          <div className="h-24 flex items-center justify-center">
            <div className={`w-6 h-6 border-2 ${spinnerColor} border-t-transparent rounded-full animate-spin`} />
          </div>
        ) : displayErrors.length === 0 ? (
          <div className="flex items-center gap-3 py-4">
            <CheckCircle size={16} className="text-emerald-500" />
            <p className={`text-sm ${emptyText}`}>Keine Fehler — System stabil.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {displayErrors.map((err) => {
              const customerName =
                customers.find((c) => c.profile.id === err.customer_id)?.profile.company ??
                customers.find((c) => c.profile.id === err.customer_id)?.profile.name ??
                "Unbekannt";
              return (
                <div key={err.id} className={`flex items-start justify-between gap-4 rounded-xl border px-4 py-3 ${errorRowBg}`}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <StatusBadge status={err.status} />
                      <span className={`text-xs ${tableCellSubtext}`}>{format(new Date(err.created_at), "dd.MM.yyyy HH:mm")}</span>
                      {!selectedCustomer && err.customer_id && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${customerBadgeBg}`}>{customerName}</span>
                      )}
                    </div>
                    <p className={`text-sm font-medium ${tableCellPrimary}`}>{err.workflow_name}</p>
                    {err.error_message && <p className={`text-xs ${tableCellMuted} mt-0.5`}>{err.error_message}</p>}
                    {err.execution_id && <p className={`text-xs ${tableCellSubtext} mt-0.5`}>Execution ID: {err.execution_id}</p>}
                  </div>
                  {err.status === "open" && (
                    <button onClick={() => resolveError(err.id)} className={`text-xs flex-shrink-0 cursor-pointer ${resolveBtn}`}>
                      Beheben
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
