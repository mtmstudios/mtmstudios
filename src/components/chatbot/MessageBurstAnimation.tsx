import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Bot, User } from "lucide-react";

const appleEase = [0.16, 1, 0.3, 1] as const;

const messages = [
  { from: "user", text: "Hallo, ich brauche Hilfe" },
  { from: "bot", text: "Klar! Wie kann ich helfen?" },
  { from: "user", text: "Wann ist mein Termin?" },
  { from: "bot", text: "Morgen um 14:00 Uhr ✓" },
];

const TypingIndicator = () => (
  <motion.div
    className="flex items-end gap-2"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -5 }}
    transition={{ duration: 0.3, ease: appleEase }}
  >
    <div className="w-6 h-6 rounded-full bg-accent/15 border border-accent/25 flex items-center justify-center flex-shrink-0">
      <Bot className="w-3 h-3 text-accent" />
    </div>
    <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-accent/10 border border-accent/15">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-accent/60"
            animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

const MessageBurstAnimation = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    if (!inView) {
      setVisibleCount(0);
      setShowTyping(false);
      return;
    }

    let idx = 0;
    let cancelled = false;

    const showNext = () => {
      if (cancelled) return;
      if (idx >= messages.length) {
        setTimeout(() => {
          if (!cancelled) {
            setVisibleCount(0);
            setShowTyping(false);
            setTimeout(() => { idx = 0; showNext(); }, 800);
          }
        }, 2500);
        return;
      }

      const msg = messages[idx];
      if (msg.from === "bot") {
        setShowTyping(true);
        setTimeout(() => {
          if (cancelled) return;
          setShowTyping(false);
          idx++;
          setVisibleCount(idx);
          setTimeout(showNext, 600);
        }, 900);
      } else {
        idx++;
        setVisibleCount(idx);
        setTimeout(showNext, 600);
      }
    };

    setTimeout(showNext, 400);
    return () => { cancelled = true; };
  }, [inView]);

  return (
    <div ref={ref} className="flex items-center justify-center h-full p-4">
      <div className="w-full max-w-[280px] rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] p-4 flex flex-col gap-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.15)]">
        {/* Header */}
        <div className="flex items-center gap-2 pb-2 border-b border-white/[0.06] mb-1">
          <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
            <Bot className="w-3 h-3 text-accent" />
          </div>
          <span className="text-[11px] text-muted-foreground font-medium">KI-Assistent</span>
          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent/80" />
        </div>

        {/* Messages */}
        <AnimatePresence mode="popLayout">
          {messages.slice(0, visibleCount).map((msg, i) => {
            const isBot = msg.from === "bot";
            return (
              <motion.div
                key={`${msg.text}-${i}`}
                className={`flex items-end gap-2 ${isBot ? "" : "flex-row-reverse"}`}
                initial={{ opacity: 0, scale: 0.85, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.45, ease: appleEase }}
                layout
              >
                {/* Avatar */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isBot
                      ? "bg-accent/15 border border-accent/25"
                      : "bg-secondary border border-white/[0.08]"
                  }`}
                >
                  {isBot ? (
                    <Bot className="w-3 h-3 text-accent" />
                  ) : (
                    <User className="w-3 h-3 text-muted-foreground" />
                  )}
                </div>

                {/* Bubble */}
                <div className="flex flex-col gap-0.5">
                  <motion.div
                    className={`px-3.5 py-2 text-[12px] leading-relaxed max-w-[190px] ${
                      isBot
                        ? "bg-accent/10 text-accent border border-accent/15 rounded-2xl rounded-bl-md"
                        : "bg-secondary text-foreground border border-white/[0.06] rounded-2xl rounded-br-md"
                    }`}
                    initial={{ boxShadow: "0 0 0px hsl(var(--accent) / 0)" }}
                    animate={{
                      boxShadow: isBot
                        ? "0 0 12px hsl(var(--accent) / 0.12)"
                        : "0 0 0px hsl(var(--accent) / 0)",
                    }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {msg.text}
                  </motion.div>
                  <span className="text-[9px] text-muted-foreground/50 px-1">
                    gerade eben
                  </span>
                </div>
              </motion.div>
            );
          })}

          {showTyping && <TypingIndicator key="typing" />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MessageBurstAnimation;
