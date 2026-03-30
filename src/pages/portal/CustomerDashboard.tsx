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
import PortalLayout, { StatCard, SectionHeading, StatusBadge } from "@/components/portal/PortalLayout";
import type { CallStat, N8nError } from "@/types/portal";

export default function CustomerDashboard() {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState<CallStat[]>([]);
  const [errors, setErrors] = useState<N8nError[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingErrors, setLoadingErrors] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchStats();
    fetchErrors();
  }, [user]);

  async function fetchStats() {
    const { data } = await supabase
      .from("call_stats")
      .select("*")
      .eq("customer_id", user!.id)
      .order("date", { ascending: false })
      .limit(30);
    setStats(data ?? []);
    setLoadingStats(false);
  }

  async function fetchErrors() {
    const { data } = await supabase
      .from("n8n_errors")
      .select("*")
      .eq("customer_id", user!.id)
      .order("created_at", { ascending: false })
      .limit(20);
    setErrors(data ?? []);
    setLoadingErrors(false);
  }

  async function resolveError(id: string) {
    await supabase.from("n8n_errors").update({ status: "resolved" }).eq("id", id);
    setErrors((prev) => prev.map((e) => (e.id === id ? { ...e, status: "resolved" } : e)));
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

  return (
    <PortalLayout>
      {/* Page header */}
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-widest text-[#00E5C0] uppercase mb-1">
          Voice KI Portal
        </p>
        <h1 className="text-2xl font-bold text-white">
          Guten Tag, {profile?.name ?? profile?.company ?? ""}
        </h1>
        <p className="text-sm text-[#9CA3AF] mt-1">
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
          label="Kosten (Monat)"
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
      <div className="bg-[#0E0E0E] border border-white/[0.08] rounded-xl p-5 mb-8">
        <SectionHeading title="Anrufverlauf" badge="Letzte 14 Tage" />
        {chartData.length === 0 ? (
          <div className="h-40 flex items-center justify-center text-[#4B5563] text-sm">
            Noch keine Daten vorhanden
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00E5C0" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#00E5C0" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis
                dataKey="date"
                tick={{ fill: "#4B5563", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis tick={{ fill: "#4B5563", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "#161616",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 8,
                  color: "#fff",
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="Anrufe"
                stroke="#00E5C0"
                strokeWidth={2}
                fill="url(#tealGrad)"
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

      {/* Recent calls table */}
      <div className="bg-[#0E0E0E] border border-white/[0.08] rounded-xl p-5 mb-8 overflow-x-auto">
        <SectionHeading title="Anruf-Statistik" badge="Nach Datum" />
        {loadingStats ? (
          <div className="h-24 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-[#00E5C0] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : stats.length === 0 ? (
          <p className="text-sm text-[#4B5563] py-4">Noch keine Statistiken vorhanden.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-[#4B5563] border-b border-white/[0.06]">
                <th className="pb-3 pr-6 font-medium">Datum</th>
                <th className="pb-3 pr-6 font-medium">Anrufe</th>
                <th className="pb-3 pr-6 font-medium">Beantwortet</th>
                <th className="pb-3 pr-6 font-medium">Dauer</th>
                <th className="pb-3 font-medium">Kosten</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((row) => (
                <tr key={row.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                  <td className="py-3 pr-6 text-[#9CA3AF]">
                    {format(new Date(row.date), "dd.MM.yyyy")}
                  </td>
                  <td className="py-3 pr-6 text-white font-medium">{row.total_calls}</td>
                  <td className="py-3 pr-6 text-[#00E5C0]">{row.answered_calls}</td>
                  <td className="py-3 pr-6 text-[#9CA3AF]">
                    {Math.floor(row.duration_seconds / 60)}m {row.duration_seconds % 60}s
                  </td>
                  <td className="py-3 text-[#9CA3AF]">€{row.cost_eur.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* n8n Error Log */}
      <div className="bg-[#0E0E0E] border border-white/[0.08] rounded-xl p-5">
        <SectionHeading
          title="Fehler-Log"
          badge={openErrors > 0 ? `${openErrors} offen` : undefined}
        />
        {loadingErrors ? (
          <div className="h-24 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-[#00E5C0] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : errors.length === 0 ? (
          <div className="flex items-center gap-3 py-4">
            <CheckCircle size={16} className="text-green-400" />
            <p className="text-sm text-[#4B5563]">Keine Fehler — alles läuft stabil.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {errors.map((err) => (
              <div
                key={err.id}
                className="flex items-start justify-between gap-4 bg-black border border-white/[0.06] rounded-lg px-4 py-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <StatusBadge status={err.status} />
                    <span className="text-xs text-[#4B5563]">
                      {format(new Date(err.created_at), "dd.MM.yyyy HH:mm")}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-white">{err.workflow_name}</p>
                  {err.error_message && (
                    <p className="text-xs text-[#9CA3AF] mt-0.5 truncate">{err.error_message}</p>
                  )}
                </div>
                {err.status === "open" && (
                  <button
                    onClick={() => resolveError(err.id)}
                    className="text-xs text-[#00E5C0] hover:underline flex-shrink-0"
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
