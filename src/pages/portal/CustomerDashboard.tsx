import { useEffect, useState } from "react";
import { Phone, CheckCircle, Euro, AlertCircle } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import PortalLayout, { StatCard, SectionHeading, StatusBadge } from "@/components/portal/PortalLayout";
import type { CallStat, N8nError } from "@/types/portal";

export default function CustomerDashboard() {
  const { user, profile } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [stats, setStats] = useState<CallStat[]>([]);
  const [errors, setErrors] = useState<N8nError[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingErrors, setLoadingErrors] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    fetchStats();
    fetchErrors();
  }, [user?.id]);

  async function fetchStats() {
    const { data } = await (supabase
      .from("call_stats") as any)
      .select("*")
      .eq("customer_id", user!.id)
      .order("date", { ascending: false })
      .limit(30);
    setStats((data as CallStat[]) ?? []);
    setLoadingStats(false);
  }

  async function fetchErrors() {
    const { data } = await (supabase
      .from("n8n_errors") as any)
      .select("*")
      .eq("customer_id", user!.id)
      .order("created_at", { ascending: false })
      .limit(20);
    setErrors((data as N8nError[]) ?? []);
    setLoadingErrors(false);
  }

  async function resolveError(id: string) {
    const { error } = await (supabase.from("n8n_errors") as any)
      .update({ status: "resolved" })
      .eq("id", id);
    if (error) {
      console.error("[CustomerDashboard] resolveError failed:", error.message);
      return;
    }
    setErrors((prev) => prev.map((e) => (e.id === id ? { ...e, status: "resolved" as const } : e)));
  }

  // Aggregates
  const totalCalls = stats.reduce((s, r) => s + r.total_calls, 0);
  const answeredCalls = stats.reduce((s, r) => s + r.answered_calls, 0);
  const totalCost = stats.reduce((s, r) => s + r.cost_eur, 0);
  const openErrors = errors.filter((e) => e.status === "open").length;

  // Chart data — last 14 days, reversed for chronological display
  const chartData = [...stats]
    .slice(0, 14)
    .reverse()
    .map((r) => ({
      date: format(new Date(r.date), "dd.MM", { locale: de }),
      Anrufe: r.total_calls,
      Beantwortet: r.answered_calls,
    }));

  // Theme tokens
  const accentColor = isDark ? "#00E5C0" : "#0d9488";
  const cardBg = isDark ? "bg-[#0E0E16] border-white/[0.07]" : "bg-white border-slate-200/80 shadow-sm";
  const labelColor = isDark ? "text-slate-400" : "text-slate-500";
  const valueColor = isDark ? "text-white" : "text-slate-900";
  const mutedColor = isDark ? "text-slate-600" : "text-slate-400";
  const eyebrowColor = isDark ? "text-[#00E5C0]" : "text-teal-600";
  const headingColor = isDark ? "text-white" : "text-slate-900";
  const subColor = isDark ? "text-slate-400" : "text-slate-500";
  const spinnerColor = isDark ? "border-[#00E5C0]" : "border-teal-500";

  const tableRowHover = isDark ? "hover:bg-white/[0.02]" : "hover:bg-slate-50";
  const tableRowBorder = isDark ? "border-white/[0.04]" : "border-slate-100";
  const tableHeaderBorder = isDark ? "border-white/[0.06]" : "border-slate-200";
  const tableHeaderText = isDark ? "text-slate-600" : "text-slate-400";
  const tableCellPrimary = isDark ? "text-white" : "text-slate-900";
  const tableCellMuted = isDark ? "text-slate-400" : "text-slate-500";
  const tableCellAccent = isDark ? "text-[#00E5C0]" : "text-teal-600";

  const errorRowBg = isDark ? "bg-[#050508] border-white/[0.06]" : "bg-slate-50 border-slate-200/80";
  const errorCustomerBadge = isDark ? "bg-white/[0.06] text-slate-400" : "bg-slate-100 text-slate-500";
  const resolveBtn = isDark ? "text-[#00E5C0] hover:underline" : "text-teal-600 hover:underline";
  const emptyText = isDark ? "text-slate-600" : "text-slate-400";

  // Chart colors
  const gridStroke = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)";
  const axisTickFill = isDark ? "#475569" : "#94a3b8";
  const tooltipStyle = isDark
    ? { background: "#0E0E16", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, color: "#fff", fontSize: 12 }
    : { background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 10, color: "#0f172a", fontSize: 12 };

  return (
    <PortalLayout>
      {/* Page header */}
      <div className="mb-8">
        <p className={`text-xs font-semibold tracking-widest ${eyebrowColor} uppercase mb-1`}>
          Voice KI Portal
        </p>
        <h1 className={`text-2xl font-bold ${headingColor}`}>
          Guten Tag, {profile?.name ?? profile?.company ?? ""}
        </h1>
        <p className={`text-sm ${subColor} mt-1`}>
          Übersicht deiner Voice KI Aktivitäten
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Gesamte Anrufe"
          value={loadingStats ? "—" : totalCalls}
          icon={<Phone size={18} />}
        />
        <StatCard
          label="Beantwortet"
          value={loadingStats ? "—" : answeredCalls}
          icon={<CheckCircle size={18} />}
          accent
        />
        <StatCard
          label="Kosten (30 Tage)"
          value={loadingStats ? "—" : `€${totalCost.toFixed(2)}`}
          icon={<Euro size={18} />}
        />
        <StatCard
          label="Offene Fehler"
          value={loadingErrors ? "—" : openErrors}
          icon={<AlertCircle size={18} />}
          accent={openErrors > 0}
        />
      </div>

      {/* Chart */}
      <div className={`rounded-2xl border p-4 lg:p-5 mb-8 ${cardBg}`}>
        <SectionHeading title="Anrufverlauf" badge="Letzte 14 Tage" />
        {chartData.length === 0 ? (
          <div className={`h-40 flex items-center justify-center ${emptyText} text-sm`}>
            Noch keine Daten vorhanden
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="tealGradCust" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={accentColor} stopOpacity={0.18} />
                  <stop offset="95%" stopColor={accentColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis
                dataKey="date"
                tick={{ fill: axisTickFill, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis tick={{ fill: axisTickFill, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area
                type="monotone"
                dataKey="Anrufe"
                stroke={accentColor}
                strokeWidth={2}
                fill="url(#tealGradCust)"
              />
              <Area
                type="monotone"
                dataKey="Beantwortet"
                stroke="#22C55E"
                strokeWidth={2}
                fill="none"
                strokeDasharray="4 4"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Anruf-Statistik table */}
      <div id="calls" className={`rounded-2xl border p-4 lg:p-5 mb-8 ${cardBg}`}>
        <SectionHeading title="Anruf-Statistik" badge="Nach Datum" />
        {loadingStats ? (
          <div className="h-24 flex items-center justify-center">
            <div className={`w-6 h-6 border-2 ${spinnerColor} border-t-transparent rounded-full animate-spin`} />
          </div>
        ) : stats.length === 0 ? (
          <p className={`text-sm ${emptyText} py-4`}>Noch keine Statistiken vorhanden.</p>
        ) : (
          <div className="overflow-x-auto -mx-4 lg:mx-0">
            <table className="w-full text-sm min-w-[480px] px-4 lg:px-0">
              <thead>
                <tr className={`text-left text-xs ${tableHeaderText} border-b ${tableHeaderBorder}`}>
                  <th className="pb-3 pr-4 pl-4 lg:pl-0 font-medium">Datum</th>
                  <th className="pb-3 pr-4 font-medium">Anrufe</th>
                  <th className="pb-3 pr-4 font-medium">Beantwortet</th>
                  <th className="pb-3 pr-4 font-medium">Dauer</th>
                  <th className="pb-3 pr-4 lg:pr-0 font-medium">Kosten</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((row) => (
                  <tr key={row.id} className={`border-b ${tableRowBorder} ${tableRowHover} transition-colors`}>
                    <td className={`py-3 pr-4 pl-4 lg:pl-0 ${tableCellMuted}`}>
                      {format(new Date(row.date), "dd.MM.yy")}
                    </td>
                    <td className={`py-3 pr-4 ${tableCellPrimary} font-medium`}>{row.total_calls}</td>
                    <td className={`py-3 pr-4 ${tableCellAccent} font-medium`}>{row.answered_calls}</td>
                    <td className={`py-3 pr-4 ${tableCellMuted}`}>
                      {Math.floor(row.duration_seconds / 60)}m {row.duration_seconds % 60}s
                    </td>
                    <td className={`py-3 pr-4 lg:pr-0 ${tableCellMuted}`}>€{row.cost_eur.toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* n8n Error Log */}
      <div id="errors" className={`rounded-2xl border p-4 lg:p-5 ${cardBg}`}>
        <SectionHeading
          title="Fehler-Log"
          badge={openErrors > 0 ? `${openErrors} offen` : undefined}
        />
        {loadingErrors ? (
          <div className="h-24 flex items-center justify-center">
            <div className={`w-6 h-6 border-2 ${spinnerColor} border-t-transparent rounded-full animate-spin`} />
          </div>
        ) : errors.length === 0 ? (
          <div className="flex items-center gap-3 py-4">
            <CheckCircle size={16} className="text-emerald-500" />
            <p className={`text-sm ${emptyText}`}>Keine Fehler — alles läuft stabil.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {errors.map((err) => (
              <div
                key={err.id}
                className={`flex items-start justify-between gap-4 rounded-xl border px-4 py-3 ${errorRowBg}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <StatusBadge status={err.status} />
                    <span className={`text-xs ${mutedColor}`}>
                      {format(new Date(err.created_at), "dd.MM.yyyy HH:mm")}
                    </span>
                  </div>
                  <p className={`text-sm font-medium ${tableCellPrimary}`}>{err.workflow_name}</p>
                  {err.error_message && (
                    <p className={`text-xs ${tableCellMuted} mt-0.5 truncate`}>{err.error_message}</p>
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
            ))}
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
