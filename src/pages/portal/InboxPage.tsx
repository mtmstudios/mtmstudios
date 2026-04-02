import { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Search,
  Send,
  Clock,
  Mail,
  Phone,
  Zap,
  RefreshCw,
  ArrowLeft,
  Info,
  Building2,
  ChevronDown,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import PortalLayout from "@/components/portal/PortalLayout";

/* ---------- Types ---------- */
interface Conversation {
  id: string;
  customer_id: string;
  source: string;
  status: "open" | "in_progress" | "done";
  subject: string | null;
  visitor_name: string | null;
  visitor_email: string | null;
  visitor_phone: string | null;
  last_message_at: string;
  created_at: string;
}

interface Message {
  id: string;
  conversation_id: string;
  sender: "visitor" | "bot" | "agent";
  content: string;
  created_at: string;
}

interface CustomerOption {
  id: string;
  name: string | null;
  company: string | null;
}

/* ---------- Constants ---------- */
const STATUS_CONFIG = {
  open: { label: "Offen", color: "text-[#00E5C0] bg-[#00E5C0]/10", dot: "bg-[#00E5C0]" },
  in_progress: { label: "Bearbeitet", color: "text-yellow-400 bg-yellow-400/10", dot: "bg-yellow-400" },
  done: { label: "Erledigt", color: "text-slate-400 bg-slate-400/10", dot: "bg-slate-400" },
};

const QUICK_REPLIES = [
  "Terminanfrage",
  "Terminbestätigung",
  "Terminabsage bestätigen",
  "Terminanfragen weiterverweisen",
  "Leider kein Termin derzeit möglich",
  "Untersuchung bei uns nicht möglich",
  "Dokumente mitbringen",
];

/* ---------- Component ---------- */
export default function InboxPage() {
  const { profile } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [reply, setReply] = useState("");
  const [filter, setFilter] = useState<"open" | "in_progress" | "done" | "all">("open");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  // Customer filter (admin only)
  const [customers, setCustomers] = useState<CustomerOption[]>([]);
  const [customerFilter, setCustomerFilter] = useState<string | null>(null);
  const [customerDropdownOpen, setCustomerDropdownOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCustomerDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (profile !== undefined) loadConversations();
  }, [filter, profile?.id, customerFilter]);

  useEffect(() => {
    if (profile?.is_admin) loadCustomers();
  }, [profile?.is_admin]);

  useEffect(() => {
    if (selected) loadMessages(selected.id);
  }, [selected?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Supabase Realtime — neue Nachrichten sofort anzeigen
  useEffect(() => {
    if (!selected) return;
    const channel = (supabase as any)
      .channel(`messages-${selected.id}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${selected.id}` },
        (payload: any) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();
    return () => { (supabase as any).removeChannel(channel); };
  }, [selected?.id]);

  async function loadCustomers() {
    const { data } = await (supabase.from("profiles") as any)
      .select("id, name, company")
      .eq("is_admin", false)
      .order("company", { ascending: true });
    setCustomers(data ?? []);
  }

  async function loadConversations() {
    setLoading(true);
    let query = (supabase.from("conversations") as any)
      .select("*")
      .order("last_message_at", { ascending: false });
    if (filter !== "all") query = query.eq("status", filter);
    if (profile && !profile.is_admin) {
      query = query.eq("customer_id", profile.id);
    }
    if (profile?.is_admin && customerFilter) {
      query = query.eq("customer_id", customerFilter);
    }
    const { data, error } = await query;
    if (error) console.error("[InboxPage] loadConversations error:", error.message);
    setConversations(data ?? []);
    setLoading(false);
  }

  async function loadMessages(convId: string) {
    const { data } = await (supabase.from("messages") as any)
      .select("*")
      .eq("conversation_id", convId)
      .order("created_at", { ascending: true });
    setMessages(data ?? []);
  }

  async function sendReply() {
    if (!selected || !reply.trim()) return;
    setSending(true);
    setSendError(null);
    const { error: insertError } = await (supabase.from("messages") as any).insert({
      conversation_id: selected.id,
      sender: "agent",
      content: reply.trim(),
    });
    if (insertError) {
      console.error("[InboxPage] sendReply insert error:", insertError.message);
      setSendError("Nachricht konnte nicht gesendet werden. Bitte erneut versuchen.");
      setSending(false);
      return;
    }
    await (supabase.from("conversations") as any)
      .update({ last_message_at: new Date().toISOString() })
      .eq("id", selected.id);
    setReply("");
    setSending(false);
  }

  async function updateStatus(status: "open" | "in_progress" | "done") {
    if (!selected) return;
    const { error } = await (supabase.from("conversations") as any)
      .update({ status })
      .eq("id", selected.id);
    if (error) {
      console.error("[InboxPage] updateStatus error:", error.message);
      return;
    }
    const updated = { ...selected, status };
    setSelected(updated);
    setConversations((prev) => prev.map((c) => (c.id === selected.id ? updated : c)));
  }

  function getCustomerLabel(id: string | null): string {
    if (!id) return "Unbekannt";
    const c = customers.find((c) => c.id === id);
    if (!c) return "Unbekannt";
    return c.company ?? c.name ?? "Unbekannt";
  }

  const selectedCustomerLabel = customerFilter ? getCustomerLabel(customerFilter) : null;

  const filtered = conversations.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      c.visitor_name?.toLowerCase().includes(q) ||
      c.visitor_email?.toLowerCase().includes(q) ||
      c.subject?.toLowerCase().includes(q) ||
      getCustomerLabel(c.customer_id).toLowerCase().includes(q)
    );
  });

  const openCount = conversations.filter((c) => c.status === "open").length;

  // ── Theme tokens ──────────────────────────────────────────────────────────
  const panelBg = isDark ? "bg-[#0A0A0F]" : "bg-white";
  const panelBorder = isDark ? "border-white/[0.06]" : "border-slate-200/80";
  const chatBg = isDark ? "bg-[#050508]" : "bg-slate-50";
  const headingText = isDark ? "text-white" : "text-slate-900";
  const mutedText = isDark ? "text-slate-600" : "text-slate-400";
  const subText = isDark ? "text-slate-400" : "text-slate-500";
  const accentText = isDark ? "text-[#00E5C0]" : "text-teal-600";
  const accentBadgeBg = isDark ? "bg-[#00E5C0]/10 text-[#00E5C0]" : "bg-teal-500/10 text-teal-600";
  const refreshBtn = isDark ? "text-slate-600 hover:text-slate-400" : "text-slate-400 hover:text-slate-600";
  const spinnerColor = isDark ? "border-[#00E5C0]" : "border-teal-500";

  const searchInput = isDark
    ? "bg-[#050508] border-white/[0.06] text-white placeholder:text-slate-700 focus:border-[#00E5C0]/50"
    : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-teal-500/50";
  const filterPillActive = isDark ? "bg-[#00E5C0]/10 text-[#00E5C0]" : "bg-teal-500/10 text-teal-600";
  const filterPillDefault = isDark ? "text-slate-600 hover:text-slate-400" : "text-slate-400 hover:text-slate-600";

  const customerDropBtn = (active: boolean) => active
    ? isDark ? "bg-[#00E5C0]/10 border-[#00E5C0]/30 text-[#00E5C0]" : "bg-teal-500/10 border-teal-500/30 text-teal-600"
    : isDark ? "bg-[#050508] border-white/[0.06] text-slate-400 hover:text-white" : "bg-white border-slate-200 text-slate-500 hover:text-slate-900";
  const dropdownMenuBg = isDark ? "bg-[#161620] border-white/[0.08]" : "bg-white border-slate-200 shadow-xl";
  const dropItemActive = isDark ? "text-[#00E5C0] bg-[#00E5C0]/10" : "text-teal-600 bg-teal-500/10";
  const dropItemDefault = isDark ? "text-slate-400 hover:text-white hover:bg-white/[0.04]" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50";

  const convItemBase = isDark ? "border-b border-white/[0.04] hover:bg-white/[0.02]" : "border-b border-slate-100 hover:bg-slate-50";
  const convItemActive = isDark ? "bg-[#00E5C0]/[0.04] border-l-[#00E5C0]" : "bg-teal-500/[0.04] border-l-teal-500";
  const convNameText = isDark ? "text-white" : "text-slate-900";
  const convSubText = isDark ? "text-slate-400" : "text-slate-500";
  const convTimeText = isDark ? "text-slate-600" : "text-slate-400";
  const convSourceText = isDark ? "text-slate-600" : "text-slate-400";
  const adminBadge = isDark ? "text-slate-600 bg-white/[0.04]" : "text-slate-400 bg-slate-100";

  const chatHeaderBg = isDark ? "bg-[#0A0A0F]" : "bg-white";
  const chatBackBtn = isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900";
  const chatTitleText = isDark ? "text-white" : "text-slate-900";
  const chatSubText = isDark ? "text-slate-600" : "text-slate-400";
  const infoToggleActive = isDark ? "text-[#00E5C0] bg-[#00E5C0]/10" : "text-teal-600 bg-teal-500/10";
  const infoToggleDefault = isDark ? "text-slate-600 hover:text-slate-400" : "text-slate-400 hover:text-slate-600";
  const statusBtnActive = (s: string) => STATUS_CONFIG[s as keyof typeof STATUS_CONFIG].color;
  const statusBtnDefault = isDark
    ? "text-slate-600 hover:text-slate-400 bg-white/[0.03] border border-white/[0.06]"
    : "text-slate-400 hover:text-slate-600 bg-slate-50 border border-slate-200";

  const msgEmptyText = isDark ? "text-slate-600" : "text-slate-400";
  const msgBotBg = isDark ? "bg-[#0E0E16] text-slate-400 border-white/[0.06]" : "bg-slate-100 text-slate-600 border-slate-200/80";
  const msgVisitorBg = isDark ? "bg-[#161620] text-white border-white/[0.06]" : "bg-white text-slate-900 border-slate-200/80";
  const msgAgentBg = isDark ? "bg-[#00E5C0]/10 text-white border-[#00E5C0]/20" : "bg-teal-500/10 text-slate-900 border-teal-500/20";
  const msgSenderLabel = isDark ? "text-slate-600" : "text-slate-400";
  const msgAgentTime = isDark ? "text-[#00E5C0]/50" : "text-teal-500/60";
  const msgDefaultTime = isDark ? "text-slate-600" : "text-slate-400";

  const quickReplyStrip = isDark ? "border-white/[0.04]" : "border-slate-100";
  const quickReplyBtn = isDark
    ? "bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.07] border-white/[0.06]"
    : "bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-50 border-slate-200";

  const inputAreaBg = isDark ? "bg-[#0A0A0F]" : "bg-white";
  const textareaClass = isDark
    ? "bg-[#050508] border-white/[0.08] text-white placeholder:text-slate-700 focus:border-[#00E5C0]/50"
    : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-teal-500/50";
  const sendBtnActive = isDark ? "bg-[#00E5C0] hover:bg-[#00cdb0] text-black" : "bg-teal-500 hover:bg-teal-600 text-white";

  const infoPanelBg = isDark ? "bg-[#0A0A0F]" : "bg-white";
  const infoLabelText = isDark ? "text-slate-600" : "text-slate-400";
  const infoAvatarBg = isDark ? "bg-[#00E5C0]/10 text-[#00E5C0] border-[#00E5C0]/20" : "bg-teal-500/10 text-teal-600 border-teal-500/20";
  const infoCloseBtnText = isDark ? "text-slate-600 hover:text-white" : "text-slate-400 hover:text-slate-900";
  const infoLinkHover = isDark ? "group-hover:text-[#00E5C0]" : "group-hover:text-teal-600";
  const infoIconColor = isDark ? "text-slate-600" : "text-slate-400";
  const infoTextColor = isDark ? "text-slate-400" : "text-slate-500";
  const quickReplyListBtn = isDark
    ? "bg-[#050508] border-white/[0.06] text-slate-400 hover:text-white hover:border-[#00E5C0]/30"
    : "bg-white border-slate-200 text-slate-500 hover:text-slate-900 hover:border-teal-500/30";
  const emptyIcon = isDark ? "bg-[#00E5C0]/10 border-[#00E5C0]/20" : "bg-teal-500/10 border-teal-500/20";

  return (
    <PortalLayout>
      <div className="relative flex h-[calc(100vh-4rem)] lg:h-[calc(100vh-2rem)] -m-6 lg:-m-8 overflow-hidden rounded-none">

        {/* ── Column 1: Conversation List ── */}
        <div className={`${selected ? "hidden lg:flex" : "flex"} w-full lg:w-72 xl:w-80 flex-shrink-0 border-r ${panelBorder} flex-col ${panelBg}`}>
          {/* Header */}
          <div className={`px-4 pt-4 pb-3 border-b ${panelBorder}`}>
            <div className="flex items-center justify-between mb-3">
              <h1 className={`text-sm font-semibold ${headingText} flex items-center gap-2`}>
                <MessageSquare size={15} className={accentText} />
                Nachrichten
                {openCount > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${accentBadgeBg}`}>
                    {openCount}
                  </span>
                )}
              </h1>
              <button
                onClick={loadConversations}
                className={`transition-colors cursor-pointer ${refreshBtn}`}
                title="Aktualisieren"
              >
                <RefreshCw size={13} />
              </button>
            </div>

            {/* Customer filter (admin only) */}
            {profile?.is_admin && customers.length > 0 && (
              <div className="relative mb-3" ref={dropdownRef}>
                <button
                  onClick={() => setCustomerDropdownOpen((v) => !v)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl border text-xs transition-colors cursor-pointer ${customerDropBtn(!!customerFilter)}`}
                >
                  <Building2 size={12} className="shrink-0" />
                  <span className="flex-1 text-left truncate">
                    {selectedCustomerLabel ?? "Alle Kunden"}
                  </span>
                  <ChevronDown
                    size={12}
                    className={`shrink-0 transition-transform ${customerDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {customerDropdownOpen && (
                  <div className={`absolute top-full left-0 right-0 mt-1 rounded-xl border shadow-xl z-20 overflow-hidden ${dropdownMenuBg}`}>
                    <button
                      onClick={() => { setCustomerFilter(null); setCustomerDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-2.5 text-xs transition-colors cursor-pointer ${!customerFilter ? dropItemActive : dropItemDefault}`}
                    >
                      Alle Kunden
                    </button>
                    {customers.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => { setCustomerFilter(c.id); setCustomerDropdownOpen(false); }}
                        className={`w-full text-left px-3 py-2.5 text-xs transition-colors cursor-pointer ${customerFilter === c.id ? dropItemActive : dropItemDefault}`}
                      >
                        {c.company ?? c.name ?? "Unbekannt"}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Search */}
            <div className="relative mb-3">
              <Search size={12} className={`absolute left-3 top-1/2 -translate-y-1/2 ${mutedText}`} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Suchen..."
                className={`w-full pl-8 pr-3 py-2 rounded-xl text-xs border transition-colors focus:outline-none ${searchInput}`}
              />
            </div>

            {/* Filter pills */}
            <div className="flex gap-1">
              {(["open", "in_progress", "done", "all"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex-1 text-[11px] py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    filter === f ? filterPillActive : filterPillDefault
                  }`}
                >
                  {f === "all" ? "Alle" : f === "open" ? "Offen" : f === "in_progress" ? "Bearb." : "Erl."}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className={`p-6 text-center text-xs ${mutedText}`}>Lade...</div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center flex flex-col items-center gap-2">
                <MessageSquare size={28} className={mutedText} />
                <p className={`text-xs ${mutedText}`}>Keine Konversationen</p>
              </div>
            ) : (
              filtered.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelected(conv)}
                  className={`w-full text-left px-4 py-3.5 transition-all cursor-pointer ${convItemBase} ${
                    selected?.id === conv.id
                      ? `${convItemActive} border-l-2`
                      : "border-l-2 border-l-transparent"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-0.5">
                    <span className={`text-sm font-medium ${convNameText} truncate leading-tight`}>
                      {conv.visitor_name ?? "Unbekannt"}
                    </span>
                    <span className={`text-[10px] ${convTimeText} shrink-0 mt-0.5`}>
                      {(() => {
                        const d = new Date(conv.last_message_at);
                        const today = new Date();
                        const isToday =
                          d.getDate() === today.getDate() &&
                          d.getMonth() === today.getMonth() &&
                          d.getFullYear() === today.getFullYear();
                        return isToday
                          ? d.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })
                          : d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
                      })()}
                    </span>
                  </div>
                  <p className={`text-xs ${convSubText} truncate mb-2 leading-snug`}>
                    {conv.subject ?? "Neue Anfrage"}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${STATUS_CONFIG[conv.status].color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_CONFIG[conv.status].dot}`} />
                      {STATUS_CONFIG[conv.status].label}
                    </span>
                    <span className={`text-[10px] ${convSourceText} capitalize`}>{conv.source}</span>
                    {profile?.is_admin && !customerFilter && (
                      <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full truncate max-w-[100px] ${adminBadge}`}>
                        {getCustomerLabel(conv.customer_id)}
                      </span>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* ── Column 2: Chat Area ── */}
        <div className={`${!selected ? "hidden lg:flex" : "flex"} flex-1 flex-col ${chatBg} min-w-0`}>
          {selected ? (
            <>
              {/* Chat Header */}
              <div className={`px-3 lg:px-5 py-3.5 border-b ${panelBorder} flex items-center gap-2 justify-between ${chatHeaderBg} shrink-0`}>
                <button
                  onClick={() => { setSelected(null); setShowInfo(false); }}
                  className={`lg:hidden p-1 -ml-1 shrink-0 cursor-pointer ${chatBackBtn}`}
                  aria-label="Zurück"
                >
                  <ArrowLeft size={18} />
                </button>
                <div className="flex-1 min-w-0">
                  <h2 className={`text-sm font-semibold ${chatTitleText} truncate`}>{selected.visitor_name ?? "Unbekannt"}</h2>
                  <p className={`text-xs ${chatSubText} truncate`}>
                    {selected.subject ?? "Anfrage"}
                    {profile?.is_admin && (
                      <span className={`ml-2 ${chatSubText}`}>· {getCustomerLabel(selected.customer_id)}</span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setShowInfo((v) => !v)}
                    className={`lg:hidden p-1.5 rounded-lg transition-colors cursor-pointer ${showInfo ? infoToggleActive : infoToggleDefault}`}
                    aria-label="Kontaktinfo"
                  >
                    <Info size={16} />
                  </button>
                  {(["open", "in_progress", "done"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(s)}
                      className={`text-[11px] px-2 lg:px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                        selected.status === s ? statusBtnActive(s) : statusBtnDefault
                      }`}
                    >
                      <span className="hidden lg:inline">{STATUS_CONFIG[s].label}</span>
                      <span className={`lg:hidden w-2 h-2 rounded-full inline-block ${STATUS_CONFIG[s].dot}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                {messages.length === 0 ? (
                  <div className={`text-center text-xs ${msgEmptyText} mt-12`}>
                    Noch keine Nachrichten in dieser Konversation.
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "agent" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[72%] px-4 py-2.5 rounded-2xl text-sm border ${
                          msg.sender === "agent"
                            ? `${msgAgentBg} rounded-br-sm`
                            : msg.sender === "bot"
                            ? `${msgBotBg} rounded-bl-sm`
                            : `${msgVisitorBg} rounded-bl-sm`
                        }`}
                      >
                        {msg.sender !== "agent" && (
                          <p className={`text-[10px] font-semibold tracking-wide uppercase mb-1 ${msgSenderLabel}`}>
                            {msg.sender === "bot" ? "KI Assistent" : selected.visitor_name ?? "Besucher"}
                          </p>
                        )}
                        <p className="leading-relaxed">{msg.content}</p>
                        <p className={`text-[10px] mt-1 ${msg.sender === "agent" ? `${msgAgentTime} text-right` : msgDefaultTime}`}>
                          {new Date(msg.created_at).toLocaleTimeString("de-DE", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies strip */}
              <div className={`px-5 py-2 flex gap-2 overflow-x-auto border-t ${quickReplyStrip} shrink-0`}>
                {QUICK_REPLIES.slice(0, 5).map((qr) => (
                  <button
                    key={qr}
                    onClick={() => setReply(qr)}
                    className={`shrink-0 flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-full transition-colors border cursor-pointer ${quickReplyBtn}`}
                  >
                    <Zap size={10} className={accentText} />
                    {qr}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className={`px-5 py-3.5 border-t ${panelBorder} ${inputAreaBg} shrink-0`}>
                {sendError && (
                  <p className="text-xs text-red-400 mb-2">{sendError}</p>
                )}
                <div className="flex gap-3 items-end">
                  <textarea
                    value={reply}
                    onChange={(e) => { setReply(e.target.value); if (sendError) setSendError(null); }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendReply();
                      }
                    }}
                    placeholder="Nachricht schreiben... (Enter zum Senden)"
                    rows={2}
                    className={`flex-1 rounded-xl px-4 py-3 text-sm border transition-colors focus:outline-none resize-none ${textareaClass}`}
                  />
                  <button
                    onClick={sendReply}
                    disabled={!reply.trim() || sending}
                    className={`disabled:opacity-30 disabled:cursor-not-allowed p-3 rounded-xl transition-colors shrink-0 cursor-pointer ${sendBtnActive}`}
                  >
                    <Send size={15} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border ${emptyIcon}`}>
                <MessageSquare size={28} className={accentText} />
              </div>
              <h3 className={`font-semibold mb-2 ${headingText}`}>Konversation auswählen</h3>
              <p className={`text-sm ${mutedText} max-w-xs`}>
                Wähle links eine Konversation aus, um den Chat-Verlauf anzuzeigen und zu antworten.
              </p>
            </div>
          )}
        </div>

        {/* ── Column 3: Visitor Info ── */}
        {selected && (
          <div className={`${showInfo ? "flex" : "hidden"} lg:flex w-full absolute inset-0 z-20 lg:relative lg:inset-auto lg:z-auto lg:w-64 xl:w-72 flex-shrink-0 border-l ${panelBorder} flex-col ${infoPanelBg} overflow-y-auto`}>
            {/* Contact info */}
            <div className={`px-4 py-4 border-b ${panelBorder}`}>
              <div className="flex items-center justify-between mb-3">
                <p className={`text-[10px] font-semibold ${infoLabelText} uppercase tracking-widest`}>Kontakt</p>
                <button
                  onClick={() => setShowInfo(false)}
                  className={`lg:hidden text-xs cursor-pointer ${infoCloseBtnText}`}
                >
                  ✕
                </button>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border ${infoAvatarBg}`}>
                  {(selected.visitor_name?.trim() || "?")[0].toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className={`text-sm font-semibold ${headingText} truncate`}>
                    {selected.visitor_name ?? "Unbekannt"}
                  </p>
                  <p className={`text-xs ${infoLabelText} capitalize`}>{selected.source}</p>
                </div>
              </div>

              <div className="space-y-2">
                {selected.visitor_email && (
                  <a href={`mailto:${selected.visitor_email}`} className="flex items-center gap-2.5 group">
                    <Mail size={13} className={`${infoIconColor} shrink-0`} />
                    <span className={`text-xs ${infoTextColor} ${infoLinkHover} truncate transition-colors`}>
                      {selected.visitor_email}
                    </span>
                  </a>
                )}
                {selected.visitor_phone && (
                  <a href={`tel:${selected.visitor_phone}`} className="flex items-center gap-2.5 group">
                    <Phone size={13} className={`${infoIconColor} shrink-0`} />
                    <span className={`text-xs ${infoTextColor} ${infoLinkHover} transition-colors`}>
                      {selected.visitor_phone}
                    </span>
                  </a>
                )}
                <div className="flex items-center gap-2.5">
                  <Clock size={13} className={`${infoIconColor} shrink-0`} />
                  <span className={`text-xs ${infoLabelText}`}>
                    {new Date(selected.created_at).toLocaleDateString("de-DE", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer info — admin only */}
            {profile?.is_admin && (
              <div className={`px-4 py-4 border-b ${panelBorder}`}>
                <p className={`text-[10px] font-semibold ${infoLabelText} uppercase tracking-widest mb-2`}>Kunde</p>
                <div className="flex items-center gap-2">
                  <Building2 size={13} className={`${infoIconColor} shrink-0`} />
                  <span className={`text-xs ${infoTextColor}`}>{getCustomerLabel(selected.customer_id)}</span>
                </div>
              </div>
            )}

            {/* Status */}
            <div className={`px-4 py-4 border-b ${panelBorder}`}>
              <p className={`text-[10px] font-semibold ${infoLabelText} uppercase tracking-widest mb-2`}>Status</p>
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_CONFIG[selected.status].color}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${STATUS_CONFIG[selected.status].dot}`} />
                {STATUS_CONFIG[selected.status].label}
              </span>
            </div>

            {/* Quick replies full list */}
            <div className="px-4 py-4">
              <p className={`text-[10px] font-semibold ${infoLabelText} uppercase tracking-widest mb-3`}>
                Schnellantworten
              </p>
              <div className="space-y-1.5">
                {QUICK_REPLIES.map((qr) => (
                  <button
                    key={qr}
                    onClick={() => setReply(qr)}
                    className={`w-full text-left text-xs px-3 py-2 rounded-xl border transition-all flex items-center gap-2 cursor-pointer ${quickReplyListBtn}`}
                  >
                    <Zap size={10} className={`${accentText} shrink-0`} />
                    {qr}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
