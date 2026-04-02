import { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";

/* ---------- Types ---------- */
interface Message {
  id: string;
  sender: "visitor" | "bot" | "agent";
  content: string;
  created_at: string;
}

/* ---------- Typing Indicator ---------- */
function TypingDots() {
  return (
    <div className="flex items-end gap-1.5 px-4 py-3 rounded-2xl rounded-tl-sm bg-[#161620] w-fit max-w-[80px]">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.9s" }}
        />
      ))}
    </div>
  );
}

/* ---------- Component ---------- */
export default function ChatWidget() {
  const { customerId } = useParams<{ customerId: string }>();
  const [searchParams] = useSearchParams();
  const botNameParam = searchParams.get("name");

  /* ── State ── */
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "bot",
      content: "Hallo! 👋 Wie kann ich Ihnen heute helfen?",
      created_at: new Date().toISOString(),
    },
  ]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  /* Bot display name: URL param → localStorage config → default */
  const [botDisplayName, setBotDisplayName] = useState("KI Assistent");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  const isPreview =
    typeof window !== "undefined" &&
    (window.location.pathname.startsWith("/chat/") ||
      window.location.hostname.includes("localhost") ||
      window.location.hostname.includes("127.0.0.1"));

  /* ── Init ── */
  useEffect(() => {
    if (!customerId) return;

    // Resolve bot name
    const storedConfig = localStorage.getItem(`widget_config_${customerId}`);
    if (botNameParam) {
      setBotDisplayName(botNameParam);
    } else if (storedConfig) {
      try {
        const parsed = JSON.parse(storedConfig);
        if (parsed.botName) setBotDisplayName(parsed.botName);
        if (parsed.greeting) {
          setMessages([
            {
              id: "init",
              sender: "bot",
              content: parsed.greeting,
              created_at: new Date().toISOString(),
            },
          ]);
        }
      } catch {
        /* ignore */
      }
    }

    // Restore existing conversation
    const stored = sessionStorage.getItem(`chat_conv_${customerId}`);
    if (stored) {
      setConversationId(stored);
      loadMessages(stored);
    }
  }, [customerId, botNameParam]);

  /* ── Load existing messages ── */
  async function loadMessages(convId: string) {
    const { data } = await (supabase.from("messages") as any)
      .select("*")
      .eq("conversation_id", convId)
      .order("created_at");
    if (data && data.length > 0) {
      setMessages(data as Message[]);
    }
  }

  /* ── Realtime subscription ── */
  useEffect(() => {
    if (!conversationId) return;

    // Clean up previous channel
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }

    const channel = supabase
      .channel(`chat-${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const msg = payload.new as Message;
          if (msg.sender !== "visitor") {
            setIsTyping(false);
            setMessages((prev) => {
              // Avoid duplicates
              if (prev.some((m) => m.id === msg.id)) return prev;
              return [...prev, msg];
            });
            if (!isOpen) setUnreadCount((prev) => prev + 1);
          }
        }
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, isOpen]);

  /* ── Auto-scroll ── */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  /* ── Focus input when opened ── */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      setUnreadCount(0);
    }
  }, [isOpen]);

  /* ── Send message ── */
  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || sending || !customerId) return;

    setSending(true);
    setInput("");

    let convId = conversationId;

    // Create conversation if first message
    if (!convId) {
      const { data: conv, error: convErr } = await (supabase.from("conversations") as any)
        .insert({
          customer_id: customerId,
          source: "web",
          status: "open",
          subject: trimmed.slice(0, 60),
        })
        .select()
        .single();

      if (convErr || !conv) {
        setSending(false);
        return;
      }

      convId = conv.id as string;
      setConversationId(convId);
      sessionStorage.setItem(`chat_conv_${customerId}`, convId);
    }

    // Optimistic message
    const optimisticMsg: Message = {
      id: `opt-${Date.now()}`,
      sender: "visitor",
      content: trimmed,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimisticMsg]);

    // Insert to Supabase
    await (supabase.from("messages") as any).insert({
      conversation_id: convId,
      sender: "visitor",
      content: trimmed,
    });

    // Show typing indicator briefly
    setIsTyping(true);

    setSending(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function formatTime(iso: string) {
    try {
      return new Date(iso).toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  }

  return (
    <div className="min-h-screen bg-[#050508]">
      {/* Preview label */}
      {isPreview && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40">
          <span className="bg-white/[0.06] border border-white/[0.08] text-slate-400 text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
            Vorschau — Chat Widget
          </span>
        </div>
      )}

      {/* ── Floating button ── */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#00E5C0] shadow-lg hover:bg-[#00cdb0] transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
          aria-label="Chat öffnen"
        >
          {/* Chat bubble icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/* Unread badge */}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      )}

      {/* ── Chat panel ── */}
      {isOpen && (
        <div
          className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-24px)] flex flex-col"
          style={{ height: "560px", maxHeight: "calc(100vh - 48px)" }}
        >
          <div className="flex flex-col h-full bg-[#0A0A0F] rounded-2xl shadow-2xl border border-white/[0.08] overflow-hidden">

            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 bg-[#0E0E16] border-b border-white/[0.06] flex-shrink-0">
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-[#00E5C0]/20 border border-[#00E5C0]/30 flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z"
                    fill="#00E5C0"
                  />
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold truncate">{botDisplayName}</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-emerald-400">Online</span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer flex-shrink-0"
                aria-label="Chat schließen"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "visitor" ? "justify-end" : "justify-start"}`}
                >
                  <div className="max-w-[80%] space-y-1">
                    <div
                      className={`px-4 py-2.5 text-sm leading-relaxed ${
                        msg.sender === "visitor"
                          ? "bg-[#00E5C0] text-black rounded-2xl rounded-tr-sm font-medium"
                          : msg.sender === "agent"
                          ? "bg-[#22C55E]/20 text-white rounded-2xl rounded-tl-sm border border-[#22C55E]/20"
                          : "bg-[#161620] text-white rounded-2xl rounded-tl-sm"
                      }`}
                    >
                      {msg.content}
                    </div>
                    <p
                      className={`text-[10px] text-slate-600 ${
                        msg.sender === "visitor" ? "text-right" : "text-left"
                      }`}
                    >
                      {formatTime(msg.created_at)}
                      {msg.sender === "agent" && (
                        <span className="ml-1 text-[#22C55E]/60">· Agent</span>
                      )}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <TypingDots />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="flex-shrink-0 px-3 py-3 border-t border-white/[0.06] bg-[#0A0A0F]">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Nachricht schreiben…"
                  disabled={sending}
                  maxLength={2000}
                  className="flex-1 bg-[#050508] border border-white/[0.08] text-white placeholder:text-slate-600 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#00E5C0]/40 transition-colors disabled:opacity-50"
                />
                <button
                  onClick={sendMessage}
                  disabled={sending || !input.trim()}
                  className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#00E5C0] text-black flex items-center justify-center hover:bg-[#00cdb0] transition-colors disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                  aria-label="Senden"
                >
                  {sending ? (
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Powered by */}
            <div className="flex-shrink-0 flex items-center justify-center py-2 bg-[#0A0A0F] border-t border-white/[0.04]">
              <span className="text-[10px] text-slate-700 tracking-wide">
                powered by{" "}
                <a
                  href="https://www.mtmstudios.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-slate-400 transition-colors"
                >
                  MTM Studios
                </a>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
