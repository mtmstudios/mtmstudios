import { useEffect, useState } from "react";
import {
  Users,
  Phone,
  Euro,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Search,
} from "lucide-react";
import { format } from "date-fns";
import { supabase } from "@/lib/supabase";
import PortalLayout, { StatCard, SectionHeading, StatusBadge } from "@/components/portal/PortalLayout";
import type { Profile, N8nError, CustomerSummary } from "@/types/portal";

export default function AdminDashboard() {
  const [customers, setCustomers] = useState<CustomerSummary[]>([]);
  const [errors, setErrors] = useState<N8nError[]>([]);
  const [loadingCustomers, setLoadingCustomers] = useState(true);
  const [loadingErrors, setLoadingErrors] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);

  useEffect(() => {
    fetchCustomers();
    fetchAllErrors();
  }, []);

  async function fetchCustomers() {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("*")
      .eq("is_admin", false)
      .order("created_at", { ascending: false });

    if (!profiles) { setLoadingCustomers(false); return; }

    // Fetch aggregated call stats per customer
    const summaries: CustomerSummary[] = await Promise.all(
      profiles.map(async (profile: Profile) => {
        const { data: stats } = await supabase
          .from("call_stats")
          .select("total_calls, answered_calls, cost_eur")
          .eq("customer_id", profile.id);

        const { count } = await supabase
          .from("n8n_errors")
          .select("*", { count: "exact", head: true })
          .eq("customer_id", profile.id)
          .eq("status", "open");

        const totalCalls = stats?.reduce((s, r) => s + r.total_calls, 0) ?? 0;
        const answeredCalls = stats?.reduce((s, r) => s + r.answered_calls, 0) ?? 0;
        const totalCostEur = stats?.reduce((s, r) => s + r.cost_eur, 0) ?? 0;

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
    const { data } = await supabase
      .from("n8n_errors")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    setErrors(data ?? []);
    setLoadingErrors(false);
  }

  async function resolveError(id: string) {
    await supabase.from("n8n_errors").update({ status: "resolved" }).eq("id", id);
    setErrors((prev) => prev.map((e) => (e.id === id ? { ...e, status: "resolved" } : e)));
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

  return (
    <PortalLayout>
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-widest text-[#00E5C0] uppercase mb-1">
          Administration
        </p>
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-sm text-[#9CA3AF] mt-1">
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
      <div className="bg-[#0E0E0E] border border-white/[0.08] rounded-xl p-5 mb-8">
        <div className="flex items-center justify-between mb-4">
          <SectionHeading title="Kunden" badge={`${customers.length}`} />
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4B5563]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Suchen..."
              className="bg-black border border-white/[0.08] rounded-lg pl-8 pr-4 py-2 text-sm text-white placeholder:text-[#4B5563] focus:outline-none focus:border-[#00E5C0] w-48 transition-colors"
            />
          </div>
        </div>

        {loadingCustomers ? (
          <div className="h-24 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-[#00E5C0] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-[#4B5563] py-4">Keine Kunden gefunden.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-[#4B5563] border-b border-white/[0.06]">
                  <th className="pb-3 pr-6 font-medium">Kunde</th>
                  <th className="pb-3 pr-6 font-medium">Anrufe</th>
                  <th className="pb-3 pr-6 font-medium">Beantwortet</th>
                  <th className="pb-3 pr-6 font-medium">Kosten</th>
                  <th className="pb-3 pr-6 font-medium">Fehler</th>
                  <th className="pb-3 font-medium">Seit</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(({ profile, totalCalls, answeredCalls, totalCostEur, openErrors }) => (
                  <tr
                    key={profile.id}
                    onClick={() =>
                      setSelectedCustomer((prev) => (prev === profile.id ? null : profile.id))
                    }
                    className={`border-b border-white/[0.04] cursor-pointer transition-colors ${
                      selectedCustomer === profile.id
                        ? "bg-[#00E5C0]/5"
                        : "hover:bg-white/[0.02]"
                    }`}
                  >
                    <td className="py-3 pr-6">
                      <p className="font-medium text-white">{profile.name ?? "—"}</p>
                      <p className="text-xs text-[#4B5563]">{profile.company ?? "—"}</p>
                    </td>
                    <td className="py-3 pr-6 text-white">{totalCalls}</td>
                    <td className="py-3 pr-6 text-[#00E5C0]">{answeredCalls}</td>
                    <td className="py-3 pr-6 text-[#9CA3AF]">€{totalCostEur.toFixed(2)}</td>
                    <td className="py-3 pr-6">
                      {openErrors > 0 ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400">
                          {openErrors} offen
                        </span>
                      ) : (
                        <CheckCircle size={14} className="text-green-400" />
                      )}
                    </td>
                    <td className="py-3 text-[#4B5563] text-xs">
                      {format(new Date(profile.created_at), "dd.MM.yyyy")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Error log */}
      <div className="bg-[#0E0E0E] border border-white/[0.08] rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <SectionHeading
            title={selectedCustomer ? "Fehler (gefiltert)" : "Fehler-Log — alle Kunden"}
            badge={openErrors > 0 ? `${openErrors} offen` : undefined}
          />
          {selectedCustomer && (
            <button
              onClick={() => setSelectedCustomer(null)}
              className="text-xs text-[#4B5563] hover:text-white transition-colors"
            >
              Filter aufheben
            </button>
          )}
        </div>

        {loadingErrors ? (
          <div className="h-24 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-[#00E5C0] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : displayErrors.length === 0 ? (
          <div className="flex items-center gap-3 py-4">
            <CheckCircle size={16} className="text-green-400" />
            <p className="text-sm text-[#4B5563]">Keine Fehler — System stabil.</p>
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
                  className="flex items-start justify-between gap-4 bg-black border border-white/[0.06] rounded-lg px-4 py-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <StatusBadge status={err.status} />
                      <span className="text-xs text-[#4B5563]">
                        {format(new Date(err.created_at), "dd.MM.yyyy HH:mm")}
                      </span>
                      {!selectedCustomer && err.customer_id && (
                        <span className="text-xs bg-white/[0.06] text-[#9CA3AF] px-2 py-0.5 rounded-full">
                          {customerName}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-white">{err.workflow_name}</p>
                    {err.error_message && (
                      <p className="text-xs text-[#9CA3AF] mt-0.5">{err.error_message}</p>
                    )}
                    {err.execution_id && (
                      <p className="text-xs text-[#4B5563] mt-0.5">
                        Execution ID: {err.execution_id}
                      </p>
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
              );
            })}
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
