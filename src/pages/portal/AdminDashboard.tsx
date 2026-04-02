import { useEffect, useState } from "react";
import {
  Users,
  Phone,
  Euro,
  AlertCircle,
  CheckCircle,
  Search,
} from "lucide-react";
import { format } from "date-fns";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import PortalLayout, { StatCard, SectionHeading, StatusBadge } from "@/components/portal/PortalLayout";
import type { Profile, N8nError, CustomerSummary } from "@/types/portal";

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

  // Hard guard: non-admins should never reach this component, but defend anyway
  if (profile !== null && !profile?.is_admin) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center h-64">
          <p className={`text-sm ${isDark ? "text-slate-600" : "text-slate-400"}`}>Keine Berechtigung.</p>
        </div>
      </PortalLayout>
    );
  }

  useEffect(() => {
    fetchCustomers();
    fetchAllErrors();
  }, []);

  async function fetchCustomers() {
    const { data: profiles } = await (supabase
      .from("profiles") as any)
      .select("*")
      .eq("is_admin", false)
      .order("created_at", { ascending: false });

    if (!profiles) { setLoadingCustomers(false); return; }

    // Fetch aggregated call stats per customer
    const summaries: CustomerSummary[] = await Promise.all(
      profiles.map(async (profile: Profile) => {
        const { data: stats } = await (supabase
          .from("call_stats") as any)
          .select("total_calls, answered_calls, duration_seconds")
          .eq("customer_id", profile.id);

        const { count } = await (supabase
          .from("n8n_errors") as any)
          .select("*", { count: "exact", head: true })
          .eq("customer_id", profile.id)
          .eq("status", "open");

        const totalCalls = stats?.reduce((s: number, r: any) => s + r.total_calls, 0) ?? 0;
        const answeredCalls = stats?.reduce((s: number, r: any) => s + r.answered_calls, 0) ?? 0;
        const COST_PER_MIN = 0.15;
        const totalCostEur = stats?.reduce((s: number, r: any) => s + (r.duration_seconds / 60) * COST_PER_MIN, 0) ?? 0;

        return {
          profile,
          totalCalls,
          answeredCalls,
          totalCostEur,
          openErrors: count ?? 0,
        };
      })
    );

    setCustomers(summaries);
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
    if (error) {
      console.error("[AdminDashboard] resolveError failed:", error.message);
      return;
    }
    setErrors((prev) => prev.map((e) => (e.id === id ? { ...e, status: "resolved" as const } : e)));
  }

  // System-wide totals
  const totalCalls = customers.reduce((s, c) => s + c.totalCalls, 0);
  const totalCost = customers.reduce((s, c) => s + c.totalCostEur, 0);
  const openErrors = errors.filter((e) => e.status === "open").length;

  const filtered = customers.filter((c) => {
    const q = search.toLowerCase();
    return (
      !q ||
      c.profile.name?.toLowerCase().includes(q) ||
      c.profile.company?.toLowerCase().includes(q)
    );
  });

  const displayErrors = selectedCustomer
    ? errors.filter((e) => e.customer_id === selectedCustomer)
    : errors;

  // Theme tokens
  const cardBg = isDark ? "bg-[#0E0E16] border-white/[0.07]" : "bg-white border-slate-200/80 shadow-sm";
  const eyebrowColor = isDark ? "text-[#00E5C0]" : "text-teal-600";
  const headingColor = isDark ? "text-white" : "text-slate-900";
  const subColor = isDark ? "text-slate-400" : "text-slate-500";
  const spinnerColor = isDark ? "border-[#00E5C0]" : "border-teal-500";
  const mutedColor = isDark ? "text-slate-600" : "text-slate-400";
  const emptyText = isDark ? "text-slate-600" : "text-slate-400";

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

  const errorRowBg = isDark ? "bg-[#050508] border-white/[0.06]" : "bg-slate-50 border-slate-200/80";
  const customerBadgeBg = isDark ? "bg-white/[0.06] text-slate-400" : "bg-slate-100 text-slate-500";
  const resolveBtn = isDark ? "text-[#00E5C0] hover:underline" : "text-teal-600 hover:underline";
  const clearFilterBtn = isDark ? "text-slate-600 hover:text-white" : "text-slate-400 hover:text-slate-900";

  return (
    <PortalLayout>
      {/* Header */}
      <div className="mb-8">
        <p className={`text-xs font-semibold tracking-widest ${eyebrowColor} uppercase mb-1`}>
          Administration
        </p>
        <h1 className={`text-2xl font-bold ${headingColor}`}>Admin Dashboard</h1>
        <p className={`text-sm ${subColor} mt-1`}>
          Alle Kunden und System-Aktivitäten im Überblick
        </p>
      </div>

      {/* System stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Kunden gesamt"
          value={loadingCustomers ? "—" : customers.length}
          icon={<Users size={18} />}
        />
        <StatCard
          label="Gesamte Anrufe"
          value={loadingCustomers ? "—" : totalCalls}
          icon={<Phone size={18} />}
          accent
        />
        <StatCard
          label="Gesamtkosten"
          value={loadingCustomers ? "—" : `€${totalCost.toFixed(2)}`}
          icon={<Euro size={18} />}
        />
        <StatCard
          label="Offene Fehler"
          value={loadingErrors ? "—" : openErrors}
          icon={<AlertCircle size={18} />}
          accent={openErrors > 0}
        />
      </div>

      {/* Customers table */}
      <div className={`rounded-2xl border p-5 mb-8 ${cardBg}`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <SectionHeading title="Kunden" badge={`${customers.length}`} />
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
                {filtered.map(({ profile, totalCalls, answeredCalls, totalCostEur, openErrors }) => (
                  <tr
                    key={profile.id}
                    onClick={() =>
                      setSelectedCustomer((prev) => (prev === profile.id ? null : profile.id))
                    }
                    className={`border-b ${tableRowBorder} cursor-pointer transition-colors ${
                      selectedCustomer === profile.id
                        ? tableRowSelected
                        : tableRowHover
                    }`}
                  >
                    <td className="py-3 pr-4 pl-5">
                      <p className={`font-medium ${tableCellPrimary}`}>{profile.name ?? "—"}</p>
                      <p className={`text-xs ${tableCellSubtext}`}>{profile.company ?? "—"}</p>
                    </td>
                    <td className={`py-3 pr-4 ${tableCellPrimary} font-medium`}>{totalCalls}</td>
                    <td className={`py-3 pr-4 ${tableCellAccent} font-medium hidden sm:table-cell`}>{answeredCalls}</td>
                    <td className={`py-3 pr-4 ${tableCellMuted} hidden sm:table-cell`}>€{totalCostEur.toFixed(2)}</td>
                    <td className="py-3 pr-4">
                      {openErrors > 0 ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400">
                          {openErrors} offen
                        </span>
                      ) : (
                        <CheckCircle size={14} className="text-emerald-500" />
                      )}
                    </td>
                    <td className={`py-3 pr-5 ${tableCellSubtext} text-xs hidden md:table-cell`}>
                      {format(new Date(profile.created_at), "dd.MM.yy")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Error log */}
      <div className={`rounded-2xl border p-5 ${cardBg}`}>
        <div className="flex items-center justify-between mb-4">
          <SectionHeading
            title={selectedCustomer ? "Fehler (gefiltert)" : "Fehler-Log — alle Kunden"}
            badge={openErrors > 0 ? `${openErrors} offen` : undefined}
          />
          {selectedCustomer && (
            <button
              onClick={() => setSelectedCustomer(null)}
              className={`text-xs transition-colors cursor-pointer ${clearFilterBtn}`}
            >
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
                <div
                  key={err.id}
                  className={`flex items-start justify-between gap-4 rounded-xl border px-4 py-3 ${errorRowBg}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <StatusBadge status={err.status} />
                      <span className={`text-xs ${tableCellSubtext}`}>
                        {format(new Date(err.created_at), "dd.MM.yyyy HH:mm")}
                      </span>
                      {!selectedCustomer && err.customer_id && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${customerBadgeBg}`}>
                          {customerName}
                        </span>
                      )}
                    </div>
                    <p className={`text-sm font-medium ${tableCellPrimary}`}>{err.workflow_name}</p>
                    {err.error_message && (
                      <p className={`text-xs ${tableCellMuted} mt-0.5`}>{err.error_message}</p>
                    )}
                    {err.execution_id && (
                      <p className={`text-xs ${tableCellSubtext} mt-0.5`}>
                        Execution ID: {err.execution_id}
                      </p>
                    )}
                  </div>
                  {err.status === "open" && (
                    <button
                      onClick={() => resolveError(err.id)}
                      className={`text-xs flex-shrink-0 cursor-pointer ${resolveBtn}`}
                    >
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
