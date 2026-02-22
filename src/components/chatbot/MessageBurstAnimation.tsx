import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";

const appleEase = [0.16, 1, 0.3, 1] as const;

const messages = [
  { from: "user", text: "Hallo, ich brauche Hilfe" },
  { from: "bot", text: "Klar! Wie kann ich helfen?" },
  { from: "user", text: "Wann ist mein Termin?" },
  { from: "bot", text: "Morgen um 14:00 Uhr ✓" },
];

const MessageBurstAnimation = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!inView) {
      setVisibleCount(0);
      return;
    }
    let idx = 0;
    const show = () => {
      if (idx < messages.length) {
        idx++;
        setVisibleCount(idx);
        setTimeout(show, 700);
      } else {
        setTimeout(() => setVisibleCount(0), 2500);
        setTimeout(() => {
          idx = 0;
          show();
        }, 3200);
      }
    };
    setTimeout(show, 500);
  }, [inView]);

  return (
    <div ref={ref} className="flex flex-col gap-3 h-full justify-center px-6 py-4">
      {messages.slice(0, visibleCount).map((msg, i) => {
        const isBot = msg.from === "bot";
        const isLast = i === messages.length - 1 && isBot;
        return (
          <motion.div
            key={`${msg.text}-${i}`}
            className={`flex ${isBot ? "justify-start" : "justify-end"}`}
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: appleEase }}
          >
            <div
              className={`px-4 py-2.5 rounded-2xl text-sm max-w-[80%] ${
                isBot
                  ? `bg-accent/10 text-accent border border-accent/20 ${isLast ? "shadow-[0_0_16px_hsl(var(--accent)/0.25)]" : ""} rounded-bl-md`
                  : "bg-secondary text-foreground rounded-br-md"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default MessageBurstAnimation;
