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
  done: { label: "Erledigt", color: "text-[#4B5563] bg-white/[0.04]", dot: "bg-[#4B5563]" },
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
    // Non-admins only see their own conversations
    if (profile && !profile.is_admin) {
      query = query.eq("customer_id", profile.id);
    }
    // Admin customer filter
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

  // Helper: get customer label from id
  function getCustomerLabel(id: string | null): string {
    if (!id) return "Unbekannt";
    const c = customers.find((c) => c.id === id);
    if (!c) return "Unbekannt";
    return c.company ?? c.name ?? "Unbekannt";
  }

  // Selected customer label
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

  return (
    <PortalLayout>
      {/* Full-height three-column layout — mobile: single column (list OR chat) */}
      <div className="relative flex h-[calc(100vh-4rem)] lg:h-[calc(100vh-2rem)] -m-6 lg:-m-8 overflow-hidden rounded-none">

        {/* ── Column 1: Conversation List — hidden on mobile when chat open ── */}
        <div className={`${selected ? "hidden lg:flex" : "flex"} w-full lg:w-72 xl:w-80 flex-shrink-0 border-r border-white/[0.06] flex-col bg-[#0E0E0E]`}>
          {/* Header */}
          <div className="px-4 pt-4 pb-3 border-b border-white/[0.06]">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-sm font-semibold text-white flex items-center gap-2">
                <MessageSquare size={15} className="text-[#00E5C0]" />
                Nachrichten
                {openCount > 0 && (
                  <span className="text-[10px] bg-[#00E5C0]/10 text-[#00E5C0] px-1.5 py-0.5 rounded-full font-bold">
                    {openCount}
                  </span>
                )}
              </h1>
              <button
                onClick={loadConversations}
                className="text-[#4B5563] hover:text-[#9CA3AF] transition-colors"
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
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg border text-xs transition-colors ${
                    customerFilter
                      ? "bg-[#00E5C0]/10 border-[#00E5C0]/30 text-[#00E5C0]"
                      : "bg-black border-white/[0.06] text-[#9CA3AF] hover:text-white"
                  }`}
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
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[#161616] border border-white/[0.08] rounded-lg shadow-xl z-20 overflow-hidden">
                    <button
                      onClick={() => { setCustomerFilter(null); setCustomerDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-2.5 text-xs transition-colors ${
                        !customerFilter
                          ? "text-[#00E5C0] bg-[#00E5C0]/10"
                          : "text-[#9CA3AF] hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      Alle Kunden
                    </button>
                    {customers.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => { setCustomerFilter(c.id); setCustomerDropdownOpen(false); }}
                        className={`w-full text-left px-3 py-2.5 text-xs transition-colors ${
                          customerFilter === c.id
                            ? "text-[#00E5C0] bg-[#00E5C0]/10"
                            : "text-[#9CA3AF] hover:text-white hover:bg-white/[0.04]"
                        }`}
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
              <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4B5563]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Suchen..."
                className="w-full pl-8 pr-3 py-2 bg-black border border-white/[0.06] rounded-lg text-xs text-white placeholder:text-[#4B5563] focus:outline-none focus:border-[#00E5C0]/50 transition-colors"
              />
            </div>

            {/* Filter pills */}
            <div className="flex gap-1">
              {(["open", "in_progress", "done", "all"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex-1 text-[11px] py-1.5 rounded-lg font-medium transition-colors ${
                    filter === f
                      ? "bg-[#00E5C0]/10 text-[#00E5C0]"
                      : "text-[#4B5563] hover:text-[#9CA3AF]"
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
              <div className="p-6 text-center text-xs text-[#4B5563]">Lade...</div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center flex flex-col items-center gap-2">
                <MessageSquare size={28} className="text-[#4B5563]" />
                <p className="text-xs text-[#4B5563]">Keine Konversationen</p>
              </div>
            ) : (
              filtered.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelected(conv)}
                  className={`w-full text-left px-4 py-3.5 border-b border-white/[0.04] transition-all hover:bg-white/[0.02] ${
                    selected?.id === conv.id
                      ? "bg-[#00E5C0]/[0.04] border-l-2 border-l-[#00E5C0]"
                      : "border-l-2 border-l-transparent"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-0.5">
                    <span className="text-sm font-medium text-white truncate leading-tight">
                      {conv.visitor_name ?? "Unbekannt"}
                    </span>
                    <span className="text-[10px] text-[#4B5563] shrink-0 mt-0.5">
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
                  <p className="text-xs text-[#9CA3AF] truncate mb-2 leading-snug">
                    {conv.subject ?? "Neue Anfrage"}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${STATUS_CONFIG[conv.status].color}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_CONFIG[conv.status].dot}`} />
                      {STATUS_CONFIG[conv.status].label}
                    </span>
                    <span className="text-[10px] text-[#4B5563] capitalize">{conv.source}</span>
                    {/* Customer badge — only shown to admin when not filtered to one customer */}
                    {profile?.is_admin && !customerFilter && (
                      <span className="ml-auto text-[10px] text-[#4B5563] bg-white/[0.04] px-2 py-0.5 rounded-full truncate max-w-[100px]">
                        {getCustomerLabel(conv.customer_id)}
                      </span>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* ── Column 2: Chat Area — hidden on mobile when no chat selected ── */}
        <div className={`${!selected ? "hidden lg:flex" : "flex"} flex-1 flex-col bg-black min-w-0`}>
          {selected ? (
            <>
              {/* Chat Header */}
              <div className="px-3 lg:px-5 py-3.5 border-b border-white/[0.06] flex items-center gap-2 justify-between bg-[#0E0E0E] shrink-0">
                {/* Back button — mobile only */}
                <button
                  onClick={() => { setSelected(null); setShowInfo(false); }}
                  className="lg:hidden text-[#9CA3AF] hover:text-white p-1 -ml-1 shrink-0"
                  aria-label="Zurück"
                >
                  <ArrowLeft size={18} />
                </button>
                <div className="flex-1 min-w-0">
                  <h2 className="text-sm font-semibold text-white truncate">{selected.visitor_name ?? "Unbekannt"}</h2>
                  <p className="text-xs text-[#4B5563] truncate">
                    {selected.subject ?? "Anfrage"}
                    {profile?.is_admin && (
                      <span className="ml-2 text-[#4B5563]">· {getCustomerLabel(selected.customer_id)}</span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Info toggle — mobile only */}
                  <button
                    onClick={() => setShowInfo((v) => !v)}
                    className={`lg:hidden p-1.5 rounded-lg transition-colors ${showInfo ? "text-[#00E5C0] bg-[#00E5C0]/10" : "text-[#4B5563] hover:text-[#9CA3AF]"}`}
                    aria-label="Kontaktinfo"
                  >
                    <Info size={16} />
                  </button>
                  {/* Status buttons — icon-only on mobile, label on desktop */}
                  {(["open", "in_progress", "done"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(s)}
                      className={`text-[11px] px-2 lg:px-3 py-1.5 rounded-lg font-medium transition-colors ${
                        selected.status === s
                          ? STATUS_CONFIG[s].color
                          : "text-[#4B5563] hover:text-[#9CA3AF] bg-white/[0.03] border border-white/[0.06]"
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
                  <div className="text-center text-xs text-[#4B5563] mt-12">
                    Noch keine Nachrichten in dieser Konversation.
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "agent" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[72%] px-4 py-2.5 rounded-2xl text-sm ${
                          msg.sender === "agent"
                            ? "bg-[#00E5C0]/10 text-white border border-[#00E5C0]/20 rounded-br-sm"
                            : msg.sender === "bot"
                            ? "bg-[#161616] text-[#9CA3AF] border border-white/[0.06] rounded-bl-sm"
                            : "bg-[#1a1a1a] text-white border border-white/[0.06] rounded-bl-sm"
                        }`}
                      >
                        {msg.sender !== "agent" && (
                          <p className="text-[10px] font-semibold tracking-wide uppercase mb-1 text-[#4B5563]">
                            {msg.sender === "bot" ? "KI Assistent" : selected.visitor_name ?? "Besucher"}
                          </p>
                        )}
                        <p className="leading-relaxed">{msg.content}</p>
                        <p
                          className={`text-[10px] mt-1 ${
                            msg.sender === "agent" ? "text-[#00E5C0]/50 text-right" : "text-[#4B5563]"
                          }`}
                        >
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
              <div className="px-5 py-2 flex gap-2 overflow-x-auto border-t border-white/[0.04] shrink-0">
                {QUICK_REPLIES.slice(0, 5).map((qr) => (
                  <button
                    key={qr}
                    onClick={() => setReply(qr)}
                    className="shrink-0 flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-full bg-white/[0.03] text-[#9CA3AF] hover:text-white hover:bg-white/[0.07] transition-colors border border-white/[0.06]"
                  >
                    <Zap size={10} className="text-[#00E5C0]" />
                    {qr}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="px-5 py-3.5 border-t border-white/[0.06] bg-[#0E0E0E] shrink-0">
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
                    className="flex-1 bg-black border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#4B5563] focus:outline-none focus:border-[#00E5C0]/50 resize-none transition-colors"
                  />
                  <button
                    onClick={sendReply}
                    disabled={!reply.trim() || sending}
                    className="bg-[#00E5C0] hover:bg-[#00cdb0] disabled:opacity-30 disabled:cursor-not-allowed text-black p-3 rounded-xl transition-colors shrink-0"
                  >
                    <Send size={15} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
              <div className="w-16 h-16 rounded-2xl bg-[#00E5C0]/10 flex items-center justify-center mb-4 border border-[#00E5C0]/20">
                <MessageSquare size={28} className="text-[#00E5C0]" />
              </div>
              <h3 className="text-white font-semibold mb-2">Konversation auswählen</h3>
              <p className="text-sm text-[#4B5563] max-w-xs">
                Wähle links eine Konversation aus, um den Chat-Verlauf anzuzeigen und zu antworten.
              </p>
            </div>
          )}
        </div>

        {/* ── Column 3: Visitor Info — desktop always visible, mobile overlay when showInfo ── */}
        {selected && (
          <div className={`${showInfo ? "flex" : "hidden"} lg:flex w-full absolute inset-0 z-20 lg:relative lg:inset-auto lg:z-auto lg:w-64 xl:w-72 flex-shrink-0 border-l border-white/[0.06] flex-col bg-[#0E0E0E] overflow-y-auto`}>
            {/* Contact info */}
            <div className="px-4 py-4 border-b border-white/[0.06]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-semibold text-[#4B5563] uppercase tracking-widest">Kontakt</p>
                <button
                  onClick={() => setShowInfo(false)}
                  className="lg:hidden text-[#4B5563] hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#00E5C0]/10 flex items-center justify-center text-[#00E5C0] font-bold text-sm border border-[#00E5C0]/20">
                  {(selected.visitor_name?.trim() || "?")[0].toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {selected.visitor_name ?? "Unbekannt"}
                  </p>
                  <p className="text-xs text-[#4B5563] capitalize">{selected.source}</p>
                </div>
              </div>

              <div className="space-y-2">
                {selected.visitor_email && (
                  <a
                    href={`mailto:${selected.visitor_email}`}
                    className="flex items-center gap-2.5 group"
                  >
                    <Mail size={13} className="text-[#4B5563] shrink-0" />
                    <span className="text-xs text-[#9CA3AF] group-hover:text-[#00E5C0] truncate transition-colors">
                      {selected.visitor_email}
                    </span>
                  </a>
                )}
                {selected.visitor_phone && (
                  <a
                    href={`tel:${selected.visitor_phone}`}
                    className="flex items-center gap-2.5 group"
                  >
                    <Phone size={13} className="text-[#4B5563] shrink-0" />
                    <span className="text-xs text-[#9CA3AF] group-hover:text-[#00E5C0] transition-colors">
                      {selected.visitor_phone}
                    </span>
                  </a>
                )}
                <div className="flex items-center gap-2.5">
                  <Clock size={13} className="text-[#4B5563] shrink-0" />
                  <span className="text-xs text-[#4B5563]">
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
              <div className="px-4 py-4 border-b border-white/[0.06]">
                <p className="text-[10px] font-semibold text-[#4B5563] uppercase tracking-widest mb-2">Kunde</p>
                <div className="flex items-center gap-2">
                  <Building2 size={13} className="text-[#4B5563] shrink-0" />
                  <span className="text-xs text-[#9CA3AF]">{getCustomerLabel(selected.customer_id)}</span>
                </div>
              </div>
            )}

            {/* Status */}
            <div className="px-4 py-4 border-b border-white/[0.06]">
              <p className="text-[10px] font-semibold text-[#4B5563] uppercase tracking-widest mb-2">Status</p>
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_CONFIG[selected.status].color}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${STATUS_CONFIG[selected.status].dot}`} />
                {STATUS_CONFIG[selected.status].label}
              </span>
            </div>

            {/* Quick replies full list */}
            <div className="px-4 py-4">
              <p className="text-[10px] font-semibold text-[#4B5563] uppercase tracking-widest mb-3">
                Schnellantworten
              </p>
              <div className="space-y-1.5">
                {QUICK_REPLIES.map((qr) => (
                  <button
                    key={qr}
                    onClick={() => setReply(qr)}
                    className="w-full text-left text-xs px-3 py-2 rounded-lg bg-black border border-white/[0.06] text-[#9CA3AF] hover:text-white hover:border-[#00E5C0]/30 transition-all flex items-center gap-2"
                  >
                    <Zap size={10} className="text-[#00E5C0] shrink-0" />
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
