import { motion, useInView } from "motion/react";
import { useRef } from "react";
import BlurText from "@/components/BlurText";

const appleEase = [0.16, 1, 0.3, 1] as const;

const ChatBubbleVisual = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 320 400" className="w-full h-full max-w-[320px]" fill="none">
        {/* Chat container outline */}
        <motion.rect
          x="20" y="20" width="280" height="360" rx="24"
          stroke="hsl(var(--accent)/0.2)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: appleEase }}
        />

        {/* Header bar */}
        <motion.rect
          x="20" y="20" width="280" height="50" rx="24"
          fill="hsl(var(--accent)/0.05)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8, ease: appleEase }}
        />
        <motion.circle
          cx="52" cy="45" r="12"
          fill="hsl(var(--accent)/0.15)"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 1.0, ease: appleEase }}
        />
        <motion.rect
          x="72" y="38" width="80" height="6" rx="3"
          fill="hsl(var(--foreground)/0.3)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 1.1, ease: appleEase }}
        />
        <motion.rect
          x="72" y="49" width="50" height="4" rx="2"
          fill="hsl(var(--foreground)/0.15)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 1.2, ease: appleEase }}
        />

        {/* User bubble (right) */}
        <motion.rect
          x="120" y="100" width="160" height="44" rx="18"
          fill="hsl(var(--secondary))"
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.5, ease: appleEase }}
        />
        <motion.text
          x="200" y="126" textAnchor="middle"
          fill="hsl(var(--foreground))"
          fontSize="12" fontFamily="system-ui"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 1.8, ease: appleEase }}
        >
          Wann habt ihr offen?
        </motion.text>

        {/* Typing dots (appear then fade to bot bubble) */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={60 + i * 14} cy="185"
            r="4"
            fill="hsl(var(--accent)/0.5)"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? {
              opacity: [0, 0.7, 0.7, 0],
              scale: [0, 1, 1, 0],
            } : {}}
            transition={{
              duration: 1.6,
              delay: 2.2 + i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Bot bubble (left) */}
        <motion.rect
          x="40" y="160" width="200" height="56" rx="18"
          fill="hsl(var(--accent)/0.12)"
          stroke="hsl(var(--accent)/0.25)"
          strokeWidth="1"
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 3.4, ease: appleEase }}
        />
        <motion.text
          x="140" y="184" textAnchor="middle"
          fill="hsl(var(--accent))"
          fontSize="11" fontFamily="system-ui"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 3.7, ease: appleEase }}
        >
          Mo–Fr 9–18 Uhr. Soll ich
        </motion.text>
        <motion.text
          x="140" y="200" textAnchor="middle"
          fill="hsl(var(--accent))"
          fontSize="11" fontFamily="system-ui"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 3.9, ease: appleEase }}
        >
          einen Termin buchen?
        </motion.text>

        {/* Subtle glow behind bot bubble */}
        <motion.ellipse
          cx="140" cy="188" rx="90" ry="30"
          fill="hsl(var(--accent)/0.06)"
          filter="blur(20px)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 3.4, ease: appleEase }}
        />

        {/* Second user bubble */}
        <motion.rect
          x="150" y="240" width="130" height="44" rx="18"
          fill="hsl(var(--secondary))"
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 4.4, ease: appleEase }}
        />
        <motion.text
          x="215" y="266" textAnchor="middle"
          fill="hsl(var(--foreground))"
          fontSize="12" fontFamily="system-ui"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 4.7, ease: appleEase }}
        >
          Ja, gerne! 👍
        </motion.text>
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
          className="w-full max-w-[400px] h-[400px] sm:h-[500px]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: appleEase }}
        >
          <ChatBubbleVisual />
        </motion.div>
      </div>
    </section>
  );
};

export default ChatbotHero;
