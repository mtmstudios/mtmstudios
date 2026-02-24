import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import logoAvatar from "@/assets/logo-phone-avatar.png";

const appleEase = [0.16, 1, 0.3, 1] as const;

/* ─── PhoneDemo — Mini SVG Smartphone with Waveform ─── */
const PhoneDemo = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const barCount = 7;

  return (
    <div ref={ref} className="h-full flex items-center justify-center py-4">
      <svg viewBox="0 0 200 360" className="w-full h-full max-w-[180px]" fill="none">
        {/* Background */}
        <rect x="12" y="6" width="176" height="348" rx="28" fill="hsl(var(--background))" />

        {/* Phone frame */}
        <motion.rect
          x="12" y="6" width="176" height="348" rx="28"
          stroke="hsl(var(--accent))"
          strokeWidth="1.5"
          strokeOpacity="0.3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2, ease: appleEase }}
        />

        {/* Notch */}
        <motion.rect
          x="72" y="14" width="56" height="5" rx="2.5"
          fill="hsl(var(--accent))"
          fillOpacity="0.2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.0, duration: 0.3 }}
        />

        {/* Avatar */}
        <motion.circle
          cx="100" cy="85" r="18"
          fill="hsl(var(--accent)/0.1)"
          stroke="hsl(var(--accent)/0.25)"
          strokeWidth="1"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 1.2, ease: appleEase }}
        />
        <defs>
          <clipPath id="miniAvatarClip">
            <circle cx="100" cy="85" r="18" />
          </clipPath>
        </defs>
        <motion.image
          href={logoAvatar}
          x="86" y="71" width="28" height="28"
          clipPath="url(#miniAvatarClip)"
          preserveAspectRatio="xMidYMid meet"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 1.4 }}
        />

        {/* Title */}
        <motion.text
          x="100" y="122" textAnchor="middle"
          fill="hsl(var(--foreground))"
          fontSize="10" fontWeight="600" fontFamily="system-ui"
          initial={{ opacity: 0, y: 6 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 1.4, ease: appleEase }}
        >
          KI-Telefonassistent
        </motion.text>

        {/* Status */}
        <motion.text
          x="100" y="136" textAnchor="middle"
          fill="hsl(var(--accent))"
          fontSize="7" fontFamily="system-ui"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: [0, 0.5, 1, 0.5, 1] } : {}}
          transition={{ duration: 3, delay: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          Bereit für Anrufe
        </motion.text>

        {/* Waveform glow */}
        <defs>
          <filter id="miniPhoneGlow">
            <feGaussianBlur stdDeviation="16" />
          </filter>
        </defs>
        <motion.circle
          cx="100" cy="195" r="30"
          fill="hsl(var(--accent))"
          fillOpacity="0.05"
          filter="url(#miniPhoneGlow)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: [0, 0.6, 0.3, 0.6] } : {}}
          transition={{ duration: 4, repeat: Infinity, delay: 1.8 }}
        />

        {/* Waveform bars */}
        {Array.from({ length: barCount }).map((_, i) => {
          const center = (barCount - 1) / 2;
          const dist = Math.abs(i - center) / center;
          const maxH = 40 * (1 - dist * 0.5);
          const minH = 8;
          return (
            <motion.rect
              key={i}
              x={62 + i * 11}
              width="6"
              rx="3"
              fill="hsl(var(--accent))"
              fillOpacity={i === Math.floor(center) ? 0.7 : 0.4}
              initial={{ y: 195, height: minH }}
              animate={inView ? {
                height: [minH, maxH, minH, maxH * 0.7, minH],
                y: [195 - minH / 2, 195 - maxH / 2, 195 - minH / 2, 195 - maxH * 0.7 / 2, 195 - minH / 2],
              } : {}}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: 1.8 + i * 0.1,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};

/* ─── ChatDemo — Mini WhatsApp Smartphone ─── */
const chatMessages = [
  { from: "user", text: "Wann ist mein Termin?" },
  { from: "bot", text: "Morgen, 14:30 Uhr." },
  { from: "user", text: "Kann ich verschieben?" },
  { from: "bot", text: "Klar! Wie wäre Freitag, 10:00?" },
];

const MiniTypingDots = ({ delay }: { delay: number }) => (
  <motion.div
    style={{
      display: "flex",
      gap: "3px",
      padding: "5px 8px",
      maxWidth: "44px",
      borderRadius: "3px 10px 10px 10px",
      backgroundColor: "hsl(var(--accent) / 0.1)",
      border: "1px solid hsl(var(--accent) / 0.2)",
    }}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.8] }}
    transition={{ duration: 0.5, delay, ease: "easeInOut" }}
  >
    {[0, 1, 2].map((d) => (
      <motion.div
        key={d}
        style={{
          width: 4, height: 4, borderRadius: "50%",
          backgroundColor: "hsl(var(--accent) / 0.5)",
        }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 0.7, delay: delay + d * 0.12, repeat: 0 }}
      />
    ))}
  </motion.div>
);

const ChatDemo = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const msgStartDelay = 1.6;
  const msgInterval = 0.7;
  const typingDuration = 0.5;

  const getDelay = (i: number) => {
    let d = msgStartDelay;
    for (let j = 0; j < i; j++) {
      d += msgInterval;
      if (chatMessages[j + 1]?.from === "bot") d += typingDuration;
    }
    return d;
  };

  return (
    <div ref={ref} className="h-full flex items-center justify-center py-4">
      <svg viewBox="0 0 200 360" className="w-full h-full max-w-[180px]" fill="none">
        <rect x="12" y="6" width="176" height="348" rx="28" fill="hsl(var(--background))" />

        <motion.rect
          x="12" y="6" width="176" height="348" rx="28"
          stroke="hsl(var(--accent))"
          strokeWidth="1.5"
          strokeOpacity="0.3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2, ease: appleEase }}
        />

        {/* Notch */}
        <motion.rect
          x="72" y="14" width="56" height="5" rx="2.5"
          fill="hsl(var(--accent))"
          fillOpacity="0.2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.0, duration: 0.3 }}
        />

        {/* Header bar */}
        <motion.rect
          x="12" y="28" width="176" height="30" rx="0"
          fill="hsl(var(--accent)/0.06)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.2 }}
        />

        {/* Avatar */}
        <motion.circle
          cx="34" cy="42" r="9"
          fill="hsl(var(--accent)/0.2)"
          stroke="hsl(var(--accent)/0.3)"
          strokeWidth="0.8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 1.3 }}
        />
        <motion.text
          x="34" y="45" textAnchor="middle"
          fill="hsl(var(--accent))"
          fontSize="9"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 1.3 }}
        >
          🤖
        </motion.text>

        {/* Name + status */}
        <motion.text
          x="50" y="40" fill="hsl(var(--foreground))"
          fontSize="8" fontWeight="600" fontFamily="system-ui"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 1.4 }}
        >
          KI-Assistent
        </motion.text>
        <motion.text
          x="50" y="50" fill="hsl(var(--accent))"
          fontSize="6" fontFamily="system-ui" fillOpacity="0.7"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 1.4 }}
        >
          Online
        </motion.text>

        {/* Chat messages */}
        <foreignObject x="18" y="62" width="164" height="280">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              padding: "8px 4px",
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: "8px",
              lineHeight: "1.35",
            }}
          >
            {chatMessages.map((msg, i) => {
              const isBot = msg.from === "bot";
              const delay = getDelay(i);
              return (
                <div key={i}>
                  {isBot && inView && (
                    <div style={{ marginBottom: "4px" }}>
                      <MiniTypingDots delay={delay - typingDuration} />
                    </div>
                  )}
                  <motion.div
                    style={{ display: "flex", justifyContent: isBot ? "flex-start" : "flex-end" }}
                    initial={{ opacity: 0, scale: 0.8, y: 8 }}
                    animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay, ease: appleEase }}
                  >
                    <div
                      style={{
                        maxWidth: "82%",
                        padding: "5px 8px",
                        borderRadius: isBot ? "3px 10px 10px 10px" : "10px 10px 3px 10px",
                        backgroundColor: isBot ? "hsl(var(--accent) / 0.1)" : "hsl(var(--secondary))",
                        color: isBot ? "hsl(var(--accent))" : "hsl(var(--foreground))",
                        border: isBot ? "1px solid hsl(var(--accent) / 0.2)" : "none",
                        whiteSpace: "pre-line",
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
      </svg>
    </div>
  );
};

/* ─── WorkflowDemo — Animated Gears with Data Dots ─── */
const Gear = ({ size, cx, cy }: { size: number; cx: number; cy: number }) => {
  const teeth = size > 30 ? 8 : 6;
  const innerR = size * 0.55;
  const outerR = size * 0.75;
  const tw = (Math.PI * 2) / teeth / 3;

  const path = Array.from({ length: teeth }, (_, i) => {
    const a = (i / teeth) * Math.PI * 2;
    return `L${Math.cos(a - tw) * innerR},${Math.sin(a - tw) * innerR} L${Math.cos(a - tw * 0.6) * outerR},${Math.sin(a - tw * 0.6) * outerR} L${Math.cos(a + tw * 0.6) * outerR},${Math.sin(a + tw * 0.6) * outerR} L${Math.cos(a + tw) * innerR},${Math.sin(a + tw) * innerR}`;
  }).join(" ");

  return (
    <motion.g
      style={{ transformOrigin: `${cx}px ${cy}px` }}
      animate={{ rotate: size > 30 ? [0, 360] : [360, 0] }}
      transition={{ duration: size > 30 ? 20 : 15, repeat: Infinity, ease: "linear" }}
    >
      <g transform={`translate(${cx}, ${cy})`}>
        <path
          d={`M${Math.cos(-tw) * innerR},${Math.sin(-tw) * innerR} ${path} Z`}
          fill="none"
          stroke="hsl(var(--neon))"
          strokeWidth="1.5"
          opacity="0.4"
        />
        <circle r={size * 0.3} fill="none" stroke="hsl(var(--neon))" strokeWidth="1" opacity="0.3" />
        <circle r="2.5" fill="hsl(var(--neon))" opacity="0.6" />
      </g>
    </motion.g>
  );
};

const WorkflowDemo = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="h-full flex items-center justify-center py-4">
      {inView && (
        <motion.svg
          viewBox="0 0 260 160"
          className="w-full max-w-[240px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <defs>
            <filter id="miniGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <path id="miniPath1" d="M65,80 Q130,40 195,80" fill="none" />
            <path id="miniPath2" d="M65,80 Q130,120 195,80" fill="none" />
          </defs>

          {/* Connection lines */}
          <path d="M65,80 Q130,40 195,80" fill="none" stroke="hsl(var(--neon))" strokeWidth="1" opacity="0.15" />
          <path d="M65,80 Q130,120 195,80" fill="none" stroke="hsl(var(--neon))" strokeWidth="1" opacity="0.15" />

          {/* Data dots */}
          <circle r="2.5" fill="hsl(var(--neon))" filter="url(#miniGlow)">
            <animateMotion dur="3s" repeatCount="indefinite" begin="0s">
              <mpath href="#miniPath1" />
            </animateMotion>
          </circle>
          <circle r="2.5" fill="hsl(var(--neon))" filter="url(#miniGlow)">
            <animateMotion dur="3.5s" repeatCount="indefinite" begin="1s">
              <mpath href="#miniPath2" />
            </animateMotion>
          </circle>
          <circle r="2.5" fill="hsl(var(--neon))" filter="url(#miniGlow)">
            <animateMotion dur="4s" repeatCount="indefinite" begin="2s">
              <mpath href="#miniPath1" />
            </animateMotion>
          </circle>

          {/* Gears */}
          <Gear size={20} cx={65} cy={80} />
          <Gear size={28} cx={130} cy={80} />
          <Gear size={38} cx={195} cy={80} />
        </motion.svg>
      )}
    </div>
  );
};

/* ─── Card Data ─── */
const features = [
  {
    title: "KI-Telefonassistent",
    description:
      "Nimmt Anrufe entgegen, beantwortet Fragen und leitet Gespräche weiter – rund um die Uhr, ohne Wartezeit.",
    Demo: PhoneDemo,
    href: "/ki-telefonassistent",
  },
  {
    title: "WhatsApp & Chatbots",
    description:
      "Automatisierte Chatbots, die Kundenanfragen sofort beantworten und euer Team spürbar entlasten.",
    Demo: ChatDemo,
    href: "/ki-chatbot",
  },
  {
    title: "Automatisierungen",
    description:
      "Workflows optimieren und wertvolle Zeit sparen – mit maßgeschneiderten KI-Lösungen für eure Prozesse.",
    Demo: WorkflowDemo,
    href: "/automatisierungen",
  },
];

/* ─── Main Section ─── */
const FeaturesSection = () => {
  return (
    <section id="loesungen" className="py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-foreground text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: appleEase }}
        >
          Was wir für euch tun können
        </motion.h2>

        <div className="flex flex-col gap-32">
          {features.map((feature, index) => {
            const isEven = index % 2 === 1;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: appleEase }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
              >
                {/* Demo area */}
                <div
                  className={`h-[280px] md:h-[340px] rounded-2xl bg-white/[0.03] backdrop-blur-md overflow-hidden relative border border-white/[0.06] shadow-[0_0_40px_-10px_hsl(var(--neon)/0.15)] ${
                    isEven ? "md:order-2" : ""
                  }`}
                >
                  <div className="relative z-10 h-full">
                    <feature.Demo />
                  </div>
                </div>

                {/* Text area */}
                <div className={`flex flex-col gap-4 ${isEven ? "md:order-1 md:text-right md:items-end" : "md:items-start"} items-center text-center md:text-left`}>
                  <h3 className="text-3xl md:text-4xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-md">
                    {feature.description}
                  </p>
                  <a
                    href={feature.href}
                    className="text-sm text-accent hover:text-accent/80 transition-opacity duration-200 mt-2"
                  >
                    Mehr erfahren →
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
