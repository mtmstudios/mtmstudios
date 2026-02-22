import { motion, useInView } from "motion/react";
import { useRef } from "react";
import BlurText from "@/components/BlurText";

const appleEase = [0.16, 1, 0.3, 1] as const;

const messages = [
  { from: "user", text: "Hallo, ich würde gerne einen Termin vereinbaren" },
  { from: "bot", text: "Hi! Gerne. Um welchen Service geht es?" },
  { from: "user", text: "Haare schneiden + Bart" },
  { from: "bot", text: "Alles klar! Wann passt es dir? Ich habe morgen um 10:00 oder 14:30 Uhr frei." },
  { from: "user", text: "14:30 bitte" },
  { from: "bot", text: "Perfekt! Dein Termin ist gebucht:\nMorgen, 14:30 Uhr\nHaare + Bart. Bis dann! ✓" },
];

const WhatsAppPhoneVisual = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const msgStartDelay = 2.0;
  const msgInterval = 0.8;
  const typingDuration = 0.6;

  // Calculate delay for each message, adding typing pause before bot messages
  const getMessageDelay = (index: number) => {
    let delay = msgStartDelay;
    for (let i = 0; i < index; i++) {
      delay += msgInterval;
      if (messages[i + 1]?.from === "bot") {
        delay += typingDuration;
      }
    }
    return delay;
  };

  return (
    <div ref={ref} className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 320 580" className="w-full h-full max-w-[380px]" fill="none">
        {/* Phone frame */}
        <motion.rect
          x="20" y="10" width="280" height="560" rx="40"
          stroke="hsl(var(--accent))"
          strokeWidth="2"
          strokeOpacity="0.3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, ease: appleEase }}
        />

        {/* Notch */}
        <motion.rect
          x="120" y="24" width="80" height="6" rx="3"
          fill="hsl(var(--accent))"
          fillOpacity="0.2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.3, duration: 0.4 }}
        />

        {/* WhatsApp Header background */}
        <motion.rect
          x="20" y="10" width="280" height="70" rx="40"
          fill="hsl(var(--accent)/0.08)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.5, ease: appleEase }}
        />
        {/* Clip bottom corners of header */}
        <motion.rect
          x="20" y="50" width="280" height="30"
          fill="hsl(var(--accent)/0.08)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.5, ease: appleEase }}
        />

        {/* Avatar circle */}
        <motion.circle
          cx="56" cy="58" r="14"
          fill="hsl(var(--accent)/0.2)"
          stroke="hsl(var(--accent)/0.3)"
          strokeWidth="1"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 1.6, ease: appleEase }}
        />
        {/* Bot icon in avatar */}
        <motion.text
          x="56" y="63" textAnchor="middle"
          fill="hsl(var(--accent))"
          fontSize="14"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 1.7 }}
        >
          🤖
        </motion.text>

        {/* Name */}
        <motion.text
          x="80" y="55" fill="hsl(var(--foreground))"
          fontSize="12" fontWeight="600" fontFamily="system-ui"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 1.7 }}
        >
          KI-Assistent
        </motion.text>
        {/* Online status */}
        <motion.text
          x="80" y="68" fill="hsl(var(--accent))"
          fontSize="9" fontFamily="system-ui"
          fillOpacity="0.7"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 1.8 }}
        >
          Online
        </motion.text>

        {/* Chat messages via foreignObject */}
        <foreignObject x="30" y="90" width="260" height="460">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              padding: "8px 4px",
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: "10px",
              lineHeight: "1.4",
            }}
          >
            {messages.map((msg, i) => {
              const isBot = msg.from === "bot";
              const isLast = i === messages.length - 1;
              const delay = getMessageDelay(i);

              return (
                <motion.div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: isBot ? "flex-start" : "flex-end",
                  }}
                  initial={{ opacity: 0, scale: 0.8, y: 12 }}
                  animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay, ease: appleEase }}
                >
                  <div
                    style={{
                      maxWidth: "82%",
                      padding: "7px 10px",
                      borderRadius: isBot
                        ? "4px 14px 14px 14px"
                        : "14px 14px 4px 14px",
                      backgroundColor: isBot
                        ? "hsl(var(--accent) / 0.1)"
                        : "hsl(var(--secondary))",
                      color: isBot
                        ? "hsl(var(--accent))"
                        : "hsl(var(--foreground))",
                      border: isBot
                        ? "1px solid hsl(var(--accent) / 0.2)"
                        : "none",
                      whiteSpace: "pre-line",
                      boxShadow: isLast
                        ? "0 0 20px hsl(var(--accent) / 0.2)"
                        : "none",
                    }}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </foreignObject>

        {/* Typing dots (appear before each bot message) */}
        {messages.map((msg, i) => {
          if (msg.from !== "bot") return null;
          const typingDelay = getMessageDelay(i) - typingDuration;
          const yPos = 100 + i * 58;
          return [0, 1, 2].map((d) => (
            <motion.circle
              key={`typing-${i}-${d}`}
              cx={46 + d * 10} cy={yPos}
              r="3"
              fill="hsl(var(--accent)/0.4)"
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? {
                opacity: [0, 0.7, 0.7, 0],
                scale: [0, 1, 1, 0],
              } : {}}
              transition={{
                duration: typingDuration,
                delay: typingDelay + d * 0.1,
                ease: "easeInOut",
              }}
            />
          ));
        })}

        {/* Glow behind last message */}
        <motion.ellipse
          cx="160" cy="480" rx="100" ry="30"
          fill="hsl(var(--accent)/0.06)"
          filter="blur(20px)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: getMessageDelay(5), ease: appleEase }}
        />
      </svg>
    </div>
  );
};

const ChatbotHero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
        <BlurText
          text="Chatbots, die wirklich helfen."
          className="text-3xl sm:text-5xl md:text-7xl font-bold text-foreground"
          delay={100}
        />

        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: appleEase }}
        >
          WhatsApp und Website-Chat — automatisiert, intelligent, 24/7 erreichbar.
        </motion.p>

        <motion.div
          className="w-full max-w-[380px] h-[500px] sm:h-[600px]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: appleEase }}
        >
          <WhatsAppPhoneVisual />
        </motion.div>
      </div>
    </section>
  );
};

export default ChatbotHero;
