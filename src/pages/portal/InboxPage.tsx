import { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Search,
  Send,
  Clock,
  Mail,
  Phone,
  PhoneMissed,
  PhoneCall,
  PhoneIncoming,
  Zap,
  RefreshCw,
  ArrowLeft,
  Info,
  Building2,
  ChevronDown,
  CheckCircle2,
  Circle,
  FileText,
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
const CHAT_STATUS_CONFIG = {
  open:        { label: "Offen",      color: "text-[#00E5C0] bg-[#00E5C0]/10", dot: "bg-[#00E5C0]" },
  in_progress: { label: "Bearbeitet", color: "text-yellow-400 bg-yellow-400/10", dot: "bg-yellow-400" },
  done:        { label: "Erledigt",   color: "text-slate-400 bg-slate-400/10",  dot: "bg-slate-400" },
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

  // Nachrichten: web chats with visitor messages | Anrufe: voice call summaries (bot-only)
  const [chats, setChats] = useState<Conversation[]>([]);
  const [missed, setMissed] = useState<Conversation[]>([]);

  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
  const [selectedMissed, setSelectedMissed] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [callMessages, setCallMessages] = useState<Message[]>([]);
  const [loadingCallMessages, setLoadingCallMessages] = useState(false);

  const [view, setView] = useState<"chats" | "missed">("chats");
  const [reply, setReply] = useState("");
  const [filter, setFilter] = useState<"open" | "in_progress" | "done" | "all">("open");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const [customers, setCustomers] = useState<CustomerOption[]>([]);
  const [customerFilter, setCustomerFilter] = useState<string | null>(null);
  const [customerDropdownOpen, setCustomerDropdownOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    if (selectedChat) loadMessages(selectedChat.id);
  }, [selectedChat?.id]);

  useEffect(() => {
    if (selectedMissed) loadCallMessages(selectedMissed.id);
    else setCallMessages([]);
  }, [selectedMissed?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Realtime for selected chat
  useEffect(() => {
    if (!selectedChat) return;
    const channel = (supabase as any)
      .channel(`messages-${selectedChat.id}`)
      .on("postgres_changes", {
        event: "INSERT", schema: "public", table: "messages",
        filter: `conversation_id=eq.${selectedChat.id}`,
      }, (payload: any) => {
        setMessages((prev) => [...prev, payload.new as Message]);
      })
      .subscribe();
    return () => { (supabase as any).removeChannel(channel); };
  }, [selectedChat?.id]);

  async function loadCustomers() {
    const { data } = await (supabase.from("profiles") as any)
      .select("id, name, company")
      .eq("is_admin", false)
      .order("company", { ascending: true });
    setCustomers(data ?? []);
  }

  async function loadConversations() {
    setLoading(true);

    // 1. Load conversations
    let query = (supabase.from("conversations") as any)
      .select("*")
      .order("last_message_at", { ascending: false });
    if (filter !== "all") query = query.eq("status", filter);
    if (profile && !profile.is_admin) query = query.eq("customer_id", profile.id);
    if (profile?.is_admin && customerFilter) query = query.eq("customer_id", customerFilter);

    const { data: convData, error } = await query;
    if (error) console.error("[InboxPage] loadConversations error:", error.message);
    const allConvs: Conversation[] = convData ?? [];

    if (allConvs.length === 0) {
      setChats([]);
      setMissed([]);
      setLoading(false);
      return;
    }

    // 2. Find conversations with at least one VISITOR message (= real web chats)
    //    Voice call summaries only have bot messages → they go to "Anrufe" tab
    const { data: visitorRows } = await (supabase.from("messages") as any)
      .select("conversation_id")
      .in("conversation_id", allConvs.map((c) => c.id))
      .eq("sender", "visitor");

    const convIdsWithVisitorMsgs = new Set((visitorRows ?? []).map((r: any) => r.conversation_id));

    // 3. Split: Nachrichten = visitor typed something | Anrufe = voice call summaries / hung-up
    setChats(allConvs.filter((c) => convIdsWithVisitorMsgs.has(c.id)));
    setMissed(allConvs.filter((c) => !convIdsWithVisitorMsgs.has(c.id)));
    setLoading(false);
  }

  async function loadMessages(convId: string) {
    const { data } = await (supabase.from("messages") as any)
      .select("*")
      .eq("conversation_id", convId)
      .order("created_at", { ascending: true });
    setMessages(data ?? []);
  }

  async function loadCallMessages(convId: string) {
    setLoadingCallMessages(true);
    const { data } = await (supabase.from("messages") as any)
      .select("*")
      .eq("conversation_id", convId)
      .order("created_at", { ascending: true });
    setCallMessages(data ?? []);
    setLoadingCallMessages(false);
  }

  async function sendReply() {
    if (!selectedChat || !reply.trim()) return;
    setSending(true);
    setSendError(null);
    const { error: insertError } = await (supabase.from("messages") as any).insert({
      conversation_id: selectedChat.id,
      sender: "agent",
      content: reply.trim(),
    });
    if (insertError) {
      setSendError("Nachricht konnte nicht gesendet werden.");
      setSending(false);
      return;
    }
    await (supabase.from("conversations") as any)
      .update({ last_message_at: new Date().toISOString() })
      .eq("id", selectedChat.id);
    setReply("");
    setSending(false);
  }

  async function updateChatStatus(status: "open" | "in_progress" | "done") {
    if (!selectedChat) return;
    const { error } = await (supabase.from("conversations") as any).update({ status }).eq("id", selectedChat.id);
    if (error) { console.error("[InboxPage] updateChatStatus failed:", error.message); return; }
    const updated = { ...selectedChat, status };
    setSelectedChat(updated);
    setChats((prev) => prev.map((c) => (c.id === selectedChat.id ? updated : c)));
  }

  async function toggleMissedCallback(conv: Conversation) {
    const newStatus = conv.status === "done" ? "open" : "done";
    const { error } = await (supabase.from("conversations") as any)
      .update({ status: newStatus })
      .eq("id", conv.id);
    if (error) return;
    const updated = { ...conv, status: newStatus as "open" | "done" };
    setMissed((prev) => prev.map((c) => (c.id === conv.id ? updated : c)));
    if (selectedMissed?.id === conv.id) setSelectedMissed(updated);
  }

  function getCustomerLabel(id: string | null): string {
    if (!id) return "Unbekannt";
    const c = customers.find((c) => c.id === id);
    return c?.company ?? c?.name ?? "Unbekannt";
  }

  const selectedCustomerLabel = customerFilter ? getCustomerLabel(customerFilter) : null;

  const filteredChats = chats.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      c.visitor_name?.toLowerCase().includes(q) ||
      c.visitor_email?.toLowerCase().includes(q) ||
      c.subject?.toLowerCase().includes(q) ||
      getCustomerLabel(c.customer_id).toLowerCase().includes(q)
    );
  });

  const filteredMissed = missed.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      c.visitor_phone?.includes(q) ||
      c.visitor_name?.toLowerCase().includes(q) ||
      c.subject?.toLowerCase().includes(q) ||
      getCustomerLabel(c.customer_id).toLowerCase().includes(q)
    );
  });

  const openChats = chats.filter((c) => c.status === "open").length;
  const openMissed = missed.filter((c) => c.status !== "done").length;

  // ── Theme tokens ──
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

  const tabActive = isDark ? "text-white border-b-2 border-[#00E5C0]" : "text-slate-900 border-b-2 border-teal-500";
  const tabDefault = isDark ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-700";

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

  const convItemBorder = isDark ? "border-b border-white/[0.04]" : "border-b border-slate-100";
  const convItemHover = isDark ? "hover:bg-white/[0.02]" : "hover:bg-slate-50";
  const convItemActive = isDark ? "bg-[#00E5C0]/[0.04] border-l-[#00E5C0]" : "bg-teal-500/[0.04] border-l-teal-500";
  const adminBadge = isDark ? "text-slate-600 bg-white/[0.04]" : "text-slate-400 bg-slate-100";

  const chatHeaderBg = isDark ? "bg-[#0A0A0F]" : "bg-white";
  const statusBtnDefault = isDark
    ? "text-slate-600 hover:text-slate-400 bg-white/[0.03] border border-white/[0.06]"
    : "text-slate-400 hover:text-slate-600 bg-slate-50 border border-slate-200";

  const msgBotBg = isDark ? "bg-[#0E0E16] text-slate-400 border-white/[0.06]" : "bg-slate-100 text-slate-600 border-slate-200/80";
  const msgVisitorBg = isDark ? "bg-[#161620] text-white border-white/[0.06]" : "bg-white text-slate-900 border-slate-200/80";
  const msgAgentBg = isDark ? "bg-[#00E5C0]/10 text-white border-[#00E5C0]/20" : "bg-teal-500/10 text-slate-900 border-teal-500/20";
  const msgSenderLabel = isDark ? "text-slate-600" : "text-slate-400";

  const textareaClass = isDark
    ? "bg-[#050508] border-white/[0.08] text-white placeholder:text-slate-700 focus:border-[#00E5C0]/50"
    : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-teal-500/50";
  const sendBtnActive = isDark ? "bg-[#00E5C0] hover:bg-[#00cdb0] text-black" : "bg-teal-500 hover:bg-teal-600 text-white";
  const quickReplyBtn = isDark
    ? "bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.07] border-white/[0.06]"
    : "bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-50 border-slate-200";

  const infoAvatarBg = isDark ? "bg-[#00E5C0]/10 text-[#00E5C0] border-[#00E5C0]/20" : "bg-teal-500/10 text-teal-600 border-teal-500/20";
  const infoIconColor = isDark ? "text-slate-600" : "text-slate-400";
  const infoTextColor = isDark ? "text-slate-400" : "text-slate-500";
  const infoLinkHover = isDark ? "group-hover:text-[#00E5C0]" : "group-hover:text-teal-600";
  const quickReplyListBtn = isDark
    ? "bg-[#050508] border-white/[0.06] text-slate-400 hover:text-white hover:border-[#00E5C0]/30"
    : "bg-white border-slate-200 text-slate-500 hover:text-slate-900 hover:border-teal-500/30";

  // Missed call row
  const missedRowBase = isDark ? "border-b border-white/[0.04] hover:bg-white/[0.02]" : "border-b border-slate-100 hover:bg-slate-50";
  const missedRowActive = isDark ? "bg-[#00E5C0]/[0.04] border-l-[#00E5C0]" : "bg-teal-500/[0.04] border-l-teal-500";

  const selectedItem = view === "chats" ? selectedChat : selectedMissed;
  const hasMobileOpen = selectedItem !== null;

  return (
    <PortalLayout>
      <div className="relative flex h-[calc(100vh-4rem)] lg:h-[calc(100vh-2rem)] -m-6 lg:-m-8 overflow-hidden rounded-none">

        {/* ══ Column 1: Left panel ══ */}
        <div className={`${hasMobileOpen ? "hidden lg:flex" : "flex"} w-full lg:w-72 xl:w-80 flex-shrink-0 border-r ${panelBorder} flex-col ${panelBg}`}>

          {/* ── Tab bar ── */}
          <div className={`flex border-b ${panelBorder} px-1`}>
            <button
              onClick={() => { setView("chats"); setSelectedMissed(null); }}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-3 text-[12px] font-semibold transition-colors cursor-pointer ${view === "chats" ? tabActive : tabDefault}`}
            >
              <MessageSquare size={13} />
              Nachrichten
              {openChats > 0 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${view === "chats" ? accentBadgeBg : isDark ? "bg-white/[0.06] text-slate-500" : "bg-slate-100 text-slate-400"}`}>
                  {openChats}
                </span>
              )}
            </button>
            <button
              onClick={() => { setView("missed"); setSelectedChat(null); }}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-3 text-[12px] font-semibold transition-colors cursor-pointer ${view === "missed" ? tabActive : tabDefault}`}
            >
              <PhoneIncoming size={13} />
              Anrufe
              {openMissed > 0 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${view === "missed" ? accentBadgeBg : isDark ? "bg-white/[0.06] text-slate-500" : "bg-slate-100 text-slate-400"}`}>
                  {openMissed}
                </span>
              )}
            </button>
          </div>

          {/* ── Search + filters header ── */}
          <div className={`px-4 pt-3 pb-3 border-b ${panelBorder}`}>
            {/* Customer filter (admin only) */}
            {profile?.is_admin && customers.length > 0 && (
              <div className="relative mb-3" ref={dropdownRef}>
                <button
                  onClick={() => setCustomerDropdownOpen((v) => !v)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl border text-xs transition-colors cursor-pointer ${customerDropBtn(!!customerFilter)}`}
                >
                  <Building2 size={12} className="shrink-0" />
                  <span className="flex-1 text-left truncate">{selectedCustomerLabel ?? "Alle Kunden"}</span>
                  <ChevronDown size={12} className={`shrink-0 transition-transform ${customerDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {customerDropdownOpen && (
                  <div className={`absolute top-full left-0 right-0 mt-1 rounded-xl border shadow-xl z-20 overflow-hidden ${dropdownMenuBg}`}>
                    <button onClick={() => { setCustomerFilter(null); setCustomerDropdownOpen(false); }} className={`w-full text-left px-3 py-2.5 text-xs transition-colors cursor-pointer ${!customerFilter ? dropItemActive : dropItemDefault}`}>Alle Kunden</button>
                    {customers.map((c) => (
                      <button key={c.id} onClick={() => { setCustomerFilter(c.id); setCustomerDropdownOpen(false); }} className={`w-full text-left px-3 py-2.5 text-xs transition-colors cursor-pointer ${customerFilter === c.id ? dropItemActive : dropItemDefault}`}>
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
                placeholder={view === "chats" ? "Suchen..." : "Nummer oder Betreff suchen..."}
                className={`w-full pl-8 pr-3 py-2 rounded-xl text-xs border transition-colors focus:outline-none ${searchInput}`}
              />
            </div>

            {/* Status filter — only for chats */}
            {view === "chats" && (
              <div className="flex gap-1">
                {(["open", "in_progress", "done", "all"] as const).map((f) => (
                  <button key={f} onClick={() => setFilter(f)} className={`flex-1 text-[11px] py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${filter === f ? filterPillActive : filterPillDefault}`}>
                    {f === "all" ? "Alle" : f === "open" ? "Offen" : f === "in_progress" ? "Bearb." : "Erl."}
                  </button>
                ))}
              </div>
            )}

            {/* Anrufe filter pills */}
            {view === "missed" && (
              <div className="flex gap-1">
                {(["open", "done", "all"] as const).map((f) => (
                  <button key={f} onClick={() => setFilter(f)} className={`flex-1 text-[11px] py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${filter === f ? filterPillActive : filterPillDefault}`}>
                    {f === "all" ? "Alle" : f === "open" ? "Offen" : "Erledigt"}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── List ── */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className={`p-6 text-center text-xs ${mutedText}`}>Lade...</div>
            ) : view === "chats" ? (
              /* Chat list */
              filteredChats.length === 0 ? (
                <div className="p-8 text-center flex flex-col items-center gap-2">
                  <MessageSquare size={28} className={mutedText} />
                  <p className={`text-xs ${mutedText}`}>Keine Konversationen</p>
                </div>
              ) : (
                filteredChats.map((conv) => (
                  <button key={conv.id} onClick={() => setSelectedChat(conv)} className={`w-full text-left px-4 py-3.5 transition-all cursor-pointer ${convItemBorder} ${convItemHover} ${selectedChat?.id === conv.id ? `${convItemActive} border-l-2` : "border-l-2 border-l-transparent"}`}>
                    <div className="flex items-start justify-between gap-2 mb-0.5">
                      <span className={`text-sm font-medium ${headingText} truncate leading-tight`}>{conv.visitor_name ?? "Unbekannt"}</span>
                      <span className={`text-[10px] ${mutedText} shrink-0 mt-0.5`}>
                        {(() => {
                          const d = new Date(conv.last_message_at);
                          const today = new Date();
                          const isToday = d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
                          return isToday ? d.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }) : d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
                        })()}
                      </span>
                    </div>
                    <p className={`text-xs ${subText} truncate mb-2 leading-snug`}>{conv.subject ?? "Neue Anfrage"}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${CHAT_STATUS_CONFIG[conv.status].color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${CHAT_STATUS_CONFIG[conv.status].dot}`} />
                        {CHAT_STATUS_CONFIG[conv.status].label}
                      </span>
                      <span className={`text-[10px] ${mutedText} capitalize`}>{conv.source}</span>
                      {profile?.is_admin && !customerFilter && (
                        <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full truncate max-w-[100px] ${adminBadge}`}>{getCustomerLabel(conv.customer_id)}</span>
                      )}
                    </div>
                  </button>
                ))
              )
            ) : (
              /* Missed calls list */
              filteredMissed.length === 0 ? (
                <div className="p-8 text-center flex flex-col items-center gap-2">
                  <PhoneIncoming size={28} className={mutedText} />
                  <p className={`text-xs ${mutedText}`}>Keine Anrufe</p>
                </div>
              ) : (
                filteredMissed.map((conv) => {
                  const isDone = conv.status === "done";
                  const hasSubject = !!conv.subject;
                  return (
                    <button key={conv.id} onClick={() => setSelectedMissed(conv)} className={`w-full text-left px-4 py-3.5 transition-all cursor-pointer ${convItemBorder} ${convItemHover} ${selectedMissed?.id === conv.id ? `${missedRowActive} border-l-2` : "border-l-2 border-l-transparent"}`}>
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${isDone ? isDark ? "bg-emerald-500/10" : "bg-emerald-50" : isDark ? "bg-[#00E5C0]/10" : "bg-teal-50"}`}>
                          <PhoneIncoming size={14} className={isDone ? "text-emerald-500" : isDark ? "text-[#00E5C0]" : "text-teal-600"} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <p className={`text-sm font-semibold ${headingText} truncate`}>
                              {conv.visitor_name ?? conv.visitor_phone ?? "Unbekannte Nummer"}
                            </p>
                            <span className={`text-[10px] ${mutedText} shrink-0`}>
                              {(() => {
                                const d = new Date(conv.created_at);
                                const today = new Date();
                                const isToday = d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
                                return isToday ? d.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }) : d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
                              })()}
                            </span>
                          </div>
                          <p className={`text-xs ${subText} truncate mb-1.5 leading-snug`}>
                            {hasSubject ? conv.subject : conv.visitor_phone ?? "Kein Betreff"}
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${isDone ? "bg-emerald-500/10 text-emerald-500" : isDark ? "bg-[#00E5C0]/10 text-[#00E5C0]" : "bg-teal-500/10 text-teal-600"}`}>
                              {isDone ? "Erledigt" : "Offen"}
                            </span>
                            {profile?.is_admin && !customerFilter && (
                              <span className={`text-[10px] px-2 py-0.5 rounded-full truncate max-w-[80px] ${adminBadge}`}>{getCustomerLabel(conv.customer_id)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })
              )
            )}
          </div>
        </div>

        {/* ══ Column 2: Main content area ══ */}
        <div className={`${!hasMobileOpen ? "hidden lg:flex" : "flex"} flex-1 flex-col ${chatBg} min-w-0`}>

          {/* ── Chat view ── */}
          {view === "chats" && selectedChat ? (
            <>
              {/* Chat header */}
              <div className={`px-3 lg:px-5 py-3.5 border-b ${panelBorder} flex items-center gap-2 justify-between ${chatHeaderBg} shrink-0`}>
                <button onClick={() => { setSelectedChat(null); setShowInfo(false); }} className={`lg:hidden p-1 -ml-1 shrink-0 cursor-pointer ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`} aria-label="Zurück">
                  <ArrowLeft size={18} />
                </button>
                <div className="flex-1 min-w-0">
                  <h2 className={`text-sm font-semibold ${headingText} truncate`}>{selectedChat.visitor_name ?? "Unbekannt"}</h2>
                  <p className={`text-xs ${mutedText} truncate`}>
                    {selectedChat.subject ?? "Anfrage"}
                    {profile?.is_admin && <span className="ml-2">· {getCustomerLabel(selectedChat.customer_id)}</span>}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button onClick={() => setShowInfo((v) => !v)} className={`lg:hidden p-1.5 rounded-lg transition-colors cursor-pointer ${showInfo ? isDark ? "text-[#00E5C0] bg-[#00E5C0]/10" : "text-teal-600 bg-teal-500/10" : isDark ? "text-slate-600 hover:text-slate-400" : "text-slate-400 hover:text-slate-600"}`} aria-label="Info">
                    <Info size={16} />
                  </button>
                  {(["open", "in_progress", "done"] as const).map((s) => (
                    <button key={s} onClick={() => updateChatStatus(s)} className={`text-[11px] px-2 lg:px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${selectedChat.status === s ? CHAT_STATUS_CONFIG[s].color : statusBtnDefault}`}>
                      <span className="hidden lg:inline">{CHAT_STATUS_CONFIG[s].label}</span>
                      <span className={`lg:hidden w-2 h-2 rounded-full inline-block ${CHAT_STATUS_CONFIG[s].dot}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                {messages.length === 0 ? (
                  <div className={`text-center text-xs ${mutedText} mt-12`}>Noch keine Nachrichten.</div>
                ) : (
                  messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === "agent" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[72%] px-4 py-2.5 rounded-2xl text-sm border ${msg.sender === "agent" ? `${msgAgentBg} rounded-br-sm` : msg.sender === "bot" ? `${msgBotBg} rounded-bl-sm` : `${msgVisitorBg} rounded-bl-sm`}`}>
                        {msg.sender !== "agent" && (
                          <p className={`text-[10px] font-semibold tracking-wide uppercase mb-1 ${msgSenderLabel}`}>
                            {msg.sender === "bot" ? "KI Assistent" : selectedChat.visitor_name ?? "Besucher"}
                          </p>
                        )}
                        <p className="leading-relaxed">{msg.content}</p>
                        <p className={`text-[10px] mt-1 ${msg.sender === "agent" ? isDark ? "text-[#00E5C0]/50 text-right" : "text-teal-500/60 text-right" : mutedText}`}>
                          {new Date(msg.created_at).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick replies */}
              <div className={`px-5 py-2 flex gap-2 overflow-x-auto border-t ${isDark ? "border-white/[0.04]" : "border-slate-100"} shrink-0`}>
                {QUICK_REPLIES.slice(0, 5).map((qr) => (
                  <button key={qr} onClick={() => setReply(qr)} className={`shrink-0 flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-full transition-colors border cursor-pointer ${quickReplyBtn}`}>
                    <Zap size={10} className={accentText} />
                    {qr}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className={`px-5 py-3.5 border-t ${panelBorder} ${chatHeaderBg} shrink-0`}>
                {sendError && <p className="text-xs text-red-400 mb-2">{sendError}</p>}
                <div className="flex gap-3 items-end">
                  <textarea value={reply} onChange={(e) => { setReply(e.target.value); if (sendError) setSendError(null); }}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendReply(); } }}
                    placeholder="Nachricht schreiben... (Enter zum Senden)" rows={2}
                    className={`flex-1 rounded-xl px-4 py-3 text-sm border transition-colors focus:outline-none resize-none ${textareaClass}`}
                  />
                  <button onClick={sendReply} disabled={!reply.trim() || sending} className={`disabled:opacity-30 disabled:cursor-not-allowed p-3 rounded-xl transition-colors shrink-0 cursor-pointer ${sendBtnActive}`}>
                    <Send size={15} />
                  </button>
                </div>
              </div>
            </>

          ) : view === "missed" && selectedMissed ? (
            /* ── Anruf detail view ── */
            <div className="flex-1 overflow-y-auto">
              {/* Header */}
              <div className={`px-3 lg:px-6 py-3.5 border-b ${panelBorder} flex items-center gap-3 ${chatHeaderBg} shrink-0`}>
                <button onClick={() => setSelectedMissed(null)} className={`lg:hidden p-1 -ml-1 cursor-pointer ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}>
                  <ArrowLeft size={18} />
                </button>
                <PhoneIncoming size={16} className={isDark ? "text-[#00E5C0] shrink-0" : "text-teal-600 shrink-0"} />
                <div className="flex-1 min-w-0">
                  <span className={`text-sm font-semibold ${headingText}`}>{selectedMissed.subject ?? "Eingehender Anruf"}</span>
                  {profile?.is_admin && (
                    <span className={`ml-2 text-xs ${mutedText}`}>· {getCustomerLabel(selectedMissed.customer_id)}</span>
                  )}
                </div>
                {/* Status toggle in header */}
                <button
                  onClick={() => toggleMissedCallback(selectedMissed)}
                  className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedMissed.status === "done"
                      ? isDark ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                      : isDark ? "bg-[#00E5C0]/10 text-[#00E5C0] border border-[#00E5C0]/20 hover:bg-[#00E5C0]/20" : "bg-teal-500/10 text-teal-600 border border-teal-500/20 hover:bg-teal-500/20"
                  }`}
                >
                  {selectedMissed.status === "done" ? <><CheckCircle2 size={12} /> Erledigt</> : <><Circle size={12} /> Offen</>}
                </button>
              </div>

              <div className="px-5 py-5 max-w-2xl space-y-4">

                {/* Caller card */}
                <div className={`rounded-2xl border p-5 ${isDark ? "bg-[#0E0E16] border-white/[0.07]" : "bg-white border-slate-200/80 shadow-sm"}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isDark ? "bg-[#00E5C0]/10 border border-[#00E5C0]/20" : "bg-teal-50 border border-teal-100"}`}>
                      <Phone size={20} className={isDark ? "text-[#00E5C0]" : "text-teal-600"} />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-lg font-bold tracking-wide ${headingText}`}>
                        {selectedMissed.visitor_phone ?? "Nummer unbekannt"}
                      </p>
                      {selectedMissed.visitor_name && (
                        <p className={`text-sm ${subText}`}>{selectedMissed.visitor_name}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleMissedCallback(selectedMissed)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                        selectedMissed.status === "done"
                          ? isDark ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20" : "bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100"
                          : isDark ? "bg-[#00E5C0] hover:bg-[#00cdb0] text-black" : "bg-teal-500 hover:bg-teal-600 text-white"
                      }`}
                    >
                      {selectedMissed.status === "done" ? (
                        <><CheckCircle2 size={15} /> Als erledigt markiert</>
                      ) : (
                        <><PhoneCall size={15} /> Als erledigt markieren</>
                      )}
                    </button>
                    {selectedMissed.visitor_phone && (
                      <a
                        href={`tel:${selectedMissed.visitor_phone}`}
                        className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${isDark ? "text-slate-300 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08]" : "text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100"}`}
                      >
                        <Phone size={14} />
                        Anrufen
                      </a>
                    )}
                  </div>
                </div>

                {/* AI call summary */}
                <div className={`rounded-2xl border ${isDark ? "bg-[#0E0E16] border-white/[0.07]" : "bg-white border-slate-200/80 shadow-sm"}`}>
                  <div className={`flex items-center justify-between gap-2 px-5 py-3.5 border-b ${isDark ? "border-white/[0.06]" : "border-slate-100"}`}>
                    <div className="flex items-center gap-2">
                      <FileText size={14} className={isDark ? "text-[#00E5C0]" : "text-teal-600"} />
                      <p className={`text-xs font-semibold uppercase tracking-widest ${isDark ? "text-[#00E5C0]" : "text-teal-600"}`}>KI Gesprächsprotokoll</p>
                    </div>
                    {callMessages.length > 0 && (
                      <button
                        onClick={() => {
                          const lines = [
                            `=== Anruf-Zusammenfassung ===`,
                            `Datum: ${new Date(selectedMissed!.created_at).toLocaleString("de-DE")}`,
                            `Telefon: ${selectedMissed!.visitor_phone ?? "–"}`,
                            `Betreff: ${selectedMissed!.subject ?? "–"}`,
                            ``,
                            ...callMessages.map((m) => m.content),
                          ].join("\n");
                          const blob = new Blob([lines], { type: "text/plain;charset=utf-8" });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = `anruf-${new Date(selectedMissed!.created_at).toISOString().split("T")[0]}.txt`;
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                        className={`text-[10px] flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${isDark ? "text-slate-500 hover:text-white bg-white/[0.04] hover:bg-white/[0.08]" : "text-slate-400 hover:text-slate-900 bg-slate-50 hover:bg-slate-100"}`}
                      >
                        ↓ Exportieren
                      </button>
                    )}
                  </div>
                  <div className="p-5">
                    {loadingCallMessages ? (
                      <div className="flex items-center justify-center py-4">
                        <div className={`w-5 h-5 border-2 ${isDark ? "border-[#00E5C0]" : "border-teal-500"} border-t-transparent rounded-full animate-spin`} />
                      </div>
                    ) : callMessages.length === 0 ? (
                      <div className="flex items-center gap-3 py-2">
                        <PhoneMissed size={16} className="text-slate-400 shrink-0" />
                        <p className={`text-sm ${mutedText}`}>Kein Gesprächsinhalt — Anruf wurde aufgelegt.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {callMessages.map((msg) => (
                          <div key={msg.id} className={`rounded-xl px-4 py-3 text-sm border ${isDark ? "bg-[#050508] border-white/[0.06] text-slate-300" : "bg-slate-50 border-slate-100 text-slate-700"}`}>
                            <p className={`text-[10px] font-semibold uppercase tracking-wide mb-1.5 ${isDark ? "text-slate-600" : "text-slate-400"}`}>KI Assistent</p>
                            <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                            <p className={`text-[10px] mt-2 ${isDark ? "text-slate-700" : "text-slate-400"}`}>
                              {new Date(msg.created_at).toLocaleString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Meta info */}
                <div className={`rounded-2xl border p-4 space-y-3 ${isDark ? "bg-[#0E0E16] border-white/[0.07]" : "bg-white border-slate-200/80 shadow-sm"}`}>
                  <p className={`text-[11px] font-semibold uppercase tracking-widest ${mutedText}`}>Details</p>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3">
                      <Clock size={13} className={infoIconColor} />
                      <span className={`text-xs ${infoTextColor}`}>{new Date(selectedMissed.created_at).toLocaleString("de-DE", { weekday: "long", day: "2-digit", month: "long", hour: "2-digit", minute: "2-digit" })}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={13} className={infoIconColor} />
                      <span className={`text-xs ${infoTextColor} capitalize`}>{selectedMissed.source}</span>
                    </div>
                    {selectedMissed.visitor_email && (
                      <div className="flex items-center gap-3">
                        <Mail size={13} className={infoIconColor} />
                        <a href={`mailto:${selectedMissed.visitor_email}`} className={`text-xs ${infoTextColor} ${infoLinkHover} transition-colors`}>{selectedMissed.visitor_email}</a>
                      </div>
                    )}
                    {profile?.is_admin && (
                      <div className="flex items-center gap-3">
                        <Building2 size={13} className={infoIconColor} />
                        <span className={`text-xs ${infoTextColor}`}>{getCustomerLabel(selectedMissed.customer_id)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

          ) : (
            /* ── Empty state ── */
            <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border ${isDark ? "bg-[#00E5C0]/10 border-[#00E5C0]/20" : "bg-teal-500/10 border-teal-500/20"}`}>
                {view === "missed" ? <PhoneIncoming size={28} className={accentText} /> : <MessageSquare size={28} className={accentText} />}
              </div>
              <h3 className={`font-semibold mb-2 ${headingText}`}>
                {view === "missed" ? "Anruf auswählen" : "Konversation auswählen"}
              </h3>
              <p className={`text-sm ${mutedText} max-w-xs`}>
                {view === "missed"
                  ? "Wähle links einen Anruf aus, um das KI-Gesprächsprotokoll und Kontaktdetails zu sehen."
                  : "Wähle links eine Konversation aus, um den Chat-Verlauf anzuzeigen."}
              </p>
            </div>
          )}
        </div>

        {/* ══ Column 3: Chat info panel (only for chats) ══ */}
        {view === "chats" && selectedChat && (
          <div className={`${showInfo ? "flex" : "hidden"} lg:flex w-full absolute inset-0 z-20 lg:relative lg:inset-auto lg:z-auto lg:w-64 xl:w-72 flex-shrink-0 border-l ${panelBorder} flex-col ${isDark ? "bg-[#0A0A0F]" : "bg-white"} overflow-y-auto`}>
            {/* Contact */}
            <div className={`px-4 py-4 border-b ${panelBorder}`}>
              <div className="flex items-center justify-between mb-3">
                <p className={`text-[10px] font-semibold ${mutedText} uppercase tracking-widest`}>Kontakt</p>
                <button onClick={() => setShowInfo(false)} className={`lg:hidden text-xs cursor-pointer ${isDark ? "text-slate-600 hover:text-white" : "text-slate-400 hover:text-slate-900"}`}>✕</button>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border ${infoAvatarBg}`}>
                  {(selectedChat.visitor_name?.trim() || "?")[0].toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className={`text-sm font-semibold ${headingText} truncate`}>{selectedChat.visitor_name ?? "Unbekannt"}</p>
                  <p className={`text-xs ${mutedText} capitalize`}>{selectedChat.source}</p>
                </div>
              </div>
              <div className="space-y-2">
                {selectedChat.visitor_email && (
                  <a href={`mailto:${selectedChat.visitor_email}`} className="flex items-center gap-2.5 group">
                    <Mail size={13} className={`${infoIconColor} shrink-0`} />
                    <span className={`text-xs ${infoTextColor} ${infoLinkHover} truncate transition-colors`}>{selectedChat.visitor_email}</span>
                  </a>
                )}
                {selectedChat.visitor_phone && (
                  <a href={`tel:${selectedChat.visitor_phone}`} className="flex items-center gap-2.5 group">
                    <Phone size={13} className={`${infoIconColor} shrink-0`} />
                    <span className={`text-xs ${infoTextColor} ${infoLinkHover} transition-colors`}>{selectedChat.visitor_phone}</span>
                  </a>
                )}
                <div className="flex items-center gap-2.5">
                  <Clock size={13} className={`${infoIconColor} shrink-0`} />
                  <span className={`text-xs ${mutedText}`}>{new Date(selectedChat.created_at).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" })}</span>
                </div>
              </div>
            </div>

            {profile?.is_admin && (
              <div className={`px-4 py-4 border-b ${panelBorder}`}>
                <p className={`text-[10px] font-semibold ${mutedText} uppercase tracking-widest mb-2`}>Kunde</p>
                <div className="flex items-center gap-2">
                  <Building2 size={13} className={`${infoIconColor} shrink-0`} />
                  <span className={`text-xs ${infoTextColor}`}>{getCustomerLabel(selectedChat.customer_id)}</span>
                </div>
              </div>
            )}

            <div className={`px-4 py-4 border-b ${panelBorder}`}>
              <p className={`text-[10px] font-semibold ${mutedText} uppercase tracking-widest mb-2`}>Status</p>
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${CHAT_STATUS_CONFIG[selectedChat.status].color}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${CHAT_STATUS_CONFIG[selectedChat.status].dot}`} />
                {CHAT_STATUS_CONFIG[selectedChat.status].label}
              </span>
            </div>

            <div className="px-4 py-4">
              <p className={`text-[10px] font-semibold ${mutedText} uppercase tracking-widest mb-3`}>Schnellantworten</p>
              <div className="space-y-1.5">
                {QUICK_REPLIES.map((qr) => (
                  <button key={qr} onClick={() => setReply(qr)} className={`w-full text-left text-xs px-3 py-2 rounded-xl border transition-all flex items-center gap-2 cursor-pointer ${quickReplyListBtn}`}>
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
