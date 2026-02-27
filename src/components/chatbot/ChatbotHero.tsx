import { motion, useInView } from "motion/react";
import { useRef } from "react";
import BlurText from "@/components/BlurText";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const appleEase = [0.16, 1, 0.3, 1] as const;

const messages = [
  { from: "user", text: "Hallo, ich würde gerne einen Termin vereinbaren" },
  { from: "bot", text: "Hi! Gerne. Um welchen Service geht es?" },
  { from: "user", text: "Haare schneiden + Bart" },
  { from: "bot", text: "Alles klar! Wann passt es dir? Ich habe morgen um 10:00 oder 14:30 Uhr frei." },
  { from: "user", text: "14:30 bitte" },
  { from: "bot", text: "Perfekt! Dein Termin ist gebucht:\nMorgen, 14:30 Uhr\nHaare + Bart. Bis dann! ✓" },
];

const TypingDots = ({ delay }: { delay: number }) => (
  <motion.div
    style={{
      display: "flex",
      gap: "4px",
      padding: "7px 10px",
      maxWidth: "60px",
      borderRadius: "4px 14px 14px 14px",
      backgroundColor: "hsl(var(--accent) / 0.1)",
      border: "1px solid hsl(var(--accent) / 0.2)",
    }}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.8] }}
    transition={{ duration: 0.6, delay, ease: "easeInOut" }}
  >
    {[0, 1, 2].map((d) => (
      <motion.div
        key={d}
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          backgroundColor: "hsl(var(--accent) / 0.5)",
        }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{
          duration: 0.8,
          delay: delay + d * 0.15,
          repeat: 0,
          ease: "easeInOut",
        }}
      />
    ))}
  </motion.div>
);

const WhatsAppPhoneVisual = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const msgStartDelay = 2.0;
  const msgInterval = 0.8;
  const typingDuration = 0.6;

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
      <svg viewBox="0 0 320 600" className="w-full h-full max-w-[380px]" fill="none">
        <defs>
          <linearGradient id="chatFrameGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="chatScreenGlare" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="40%" stopColor="white" stopOpacity="0.03" />
            <stop offset="60%" stopColor="white" stopOpacity="0.06" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <filter id="chatShadow">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>

        {/* Floor shadow */}
        <ellipse cx="163" cy="578" rx="110" ry="14" fill="hsl(var(--accent))" fillOpacity="0.08" filter="url(#chatShadow)" />

        {/* Bezel / side edge */}
        <rect x="23" y="14" width="280" height="560" rx="40" fill="hsl(var(--accent))" fillOpacity="0.06" />

        {/* Solid background inside phone */}
        <rect x="20" y="10" width="280" height="560" rx="40" fill="hsl(var(--background))" />

        {/* Phone frame with gradient stroke */}
        <motion.rect
          x="20" y="10" width="280" height="560" rx="40"
          stroke="url(#chatFrameGrad)"
          strokeWidth="2.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, ease: appleEase }}
        />

        {/* Screen glare */}
        <rect x="22" y="12" width="276" height="556" rx="38" fill="url(#chatScreenGlare)" />

        {/* Notch */}
        <motion.rect
          x="120" y="24" width="80" height="6" rx="3"
          fill="hsl(var(--accent))"
          fillOpacity="0.2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.3, duration: 0.4 }}
        />

        {/* WhatsApp Header background - flat rect below phone curve */}
        <motion.rect
          x="20" y="40" width="280" height="40" rx="0"
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
        <foreignObject x="30" y="85" width="260" height="470">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              padding: "12px 6px",
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: "11px",
              lineHeight: "1.4",
            }}
          >
            {messages.map((msg, i) => {
              const isBot = msg.from === "bot";
              const isLast = i === messages.length - 1;
              const delay = getMessageDelay(i);
              const typingDelay = delay - typingDuration;

              return (
                <div key={i}>
                  {/* Inline typing dots before bot messages */}
                  {isBot && inView && (
                    <div style={{ marginBottom: "6px" }}>
                      <TypingDots delay={typingDelay} />
                    </div>
                  )}
                  <motion.div
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
                </div>
              );
            })}
          </div>
        </foreignObject>

        {/* Glow behind last message */}
        <motion.ellipse
          cx="160" cy="510" rx="100" ry="30"
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
    <section className="flex flex-col items-center justify-start">
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center gap-8">
            <BlurText
              text="Chatbots, die wirklich helfen."
              className="text-3xl sm:text-5xl md:text-7xl font-bold text-foreground tracking-tight"
              delay={80}
              animateBy="words"
              direction="top"
            />
            <motion.p
              className="text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: appleEase }}
            >
              WhatsApp und Website-Chat — automatisiert, intelligent, 24/7 erreichbar.
            </motion.p>
          </div>
        }
      >
        <WhatsAppPhoneVisual />
      </ContainerScroll>
    </section>
  );
};

export default ChatbotHero;
