import { Phone, MessageSquare } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";

const appleEase = [0.16, 1, 0.3, 1] as const;

/* ─── Phone Demo ─── */
const PhoneDemo = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [seconds, setSeconds] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [inView]);

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div
      ref={ref}
      className="relative flex flex-col items-center justify-center h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {inView &&
        [0, 1].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-neon/30"
            initial={{ width: 40, height: 40, opacity: 0.6 }}
            animate={{
              width: [40, isHovered ? 180 : 160],
              height: [40, isHovered ? 180 : 160],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeOut",
            }}
          />
        ))}

      <motion.div
        className="relative z-10 w-14 h-14 rounded-full bg-neon/20 border border-neon/40 flex items-center justify-center"
        animate={inView ? { scale: [1, 1.08, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Phone className="w-6 h-6 text-neon" />
      </motion.div>

      {inView && (
        <motion.div
          className="mt-4 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-xs text-neon font-medium tracking-wider uppercase">
            Anruf läuft…
          </span>
          <span className="text-sm font-mono text-muted-foreground">{fmt(seconds)}</span>
        </motion.div>
      )}

      <motion.div
        className="absolute -right-2 top-4 bg-neon/10 border border-neon/30 rounded-xl rounded-br-none px-3 py-2 max-w-[150px]"
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={isHovered ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 10 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-[11px] text-neon">Wie kann ich Ihnen helfen?</p>
      </motion.div>
    </div>
  );
};

/* ─── Chat Demo ─── */
const chatMessages = [
  { from: "user", text: "Wann ist mein Termin?" },
  { from: "bot", text: "Ihr nächster Termin ist am Montag um 14:00 Uhr." },
  { from: "user", text: "Kann ich verschieben?" },
];

const TypingIndicator = () => (
  <div className="flex gap-1 px-3 py-2">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-[hsl(142_70%_49%)]"
        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </div>
);

const ChatDemo = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let idx = 0;
    const show = () => {
      if (idx < chatMessages.length) {
        const isBot = chatMessages[idx].from === "bot";
        if (isBot) {
          setShowTyping(true);
          setTimeout(() => {
            setShowTyping(false);
            idx++;
            setVisibleCount(idx);
            setTimeout(show, 800);
          }, 1200);
        } else {
          idx++;
          setVisibleCount(idx);
          setTimeout(show, 800);
        }
      }
    };
    setTimeout(show, 400);
  }, [inView]);

  return (
    <div ref={ref} className="flex flex-col gap-2 h-full justify-center px-2">
      {chatMessages.slice(0, visibleCount).map((msg, i) => (
        <motion.div
          key={i}
          className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.35 }}
        >
          <div
            className={`px-3 py-2 rounded-xl text-xs max-w-[80%] ${
              msg.from === "user"
                ? "bg-secondary text-foreground rounded-br-none"
                : "bg-[hsl(142_70%_49%/0.15)] text-[hsl(142_70%_70%)] border border-[hsl(142_70%_49%/0.3)] rounded-bl-none"
            }`}
          >
            {msg.text}
          </div>
        </motion.div>
      ))}
      {showTyping && (
        <motion.div
          className="flex justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-[hsl(142_70%_49%/0.15)] border border-[hsl(142_70%_49%/0.3)] rounded-xl rounded-bl-none">
            <TypingIndicator />
          </div>
        </motion.div>
      )}
    </div>
  );
};

/* ─── Workflow Demo ─── */
const WorkflowDemo = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const steps = [
    { icon: "↓", label: "Input" },
    { icon: "⚙", label: "Process" },
    { icon: "↑", label: "Output" },
  ];

  return (
    <div ref={ref} className="h-full flex items-center justify-center px-6">
      <div className="relative flex items-center justify-between w-full max-w-[220px]">
        {inView && (
          <motion.div
            className="absolute top-1/2 left-[24px] right-[24px] h-[2px] -translate-y-1/2 bg-neon/20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
        )}
        {inView && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-neon shadow-[0_0_16px_hsl(var(--neon))]"
            animate={{ left: ["24px", "calc(100% - 24px)"] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
          />
        )}
        {steps.map((step, i) => (
          <motion.div
            key={step.label}
            className="relative z-10 flex flex-col items-center gap-2"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.35, delay: i * 0.15 }}
          >
            <div className="w-12 h-12 rounded-full bg-neon/10 border border-neon/40 flex items-center justify-center text-neon text-lg">
              {step.icon}
            </div>
            <span className="text-[10px] text-muted-foreground font-mono">{step.label}</span>
          </motion.div>
        ))}
      </div>
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
    href: "/telefonassistent",
  },
  {
    title: "WhatsApp & Chatbots",
    description:
      "Automatisierte Chatbots, die Kundenanfragen sofort beantworten und euer Team spürbar entlasten.",
    Demo: ChatDemo,
    href: "#chatbot",
  },
  {
    title: "Automatisierungen",
    description:
      "Workflows optimieren und wertvolle Zeit sparen – mit maßgeschneiderten KI-Lösungen für eure Prozesse.",
    Demo: WorkflowDemo,
    href: "#automatisierungen",
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
                  className={`h-[280px] md:h-[340px] rounded-2xl bg-white/[0.03] backdrop-blur-md overflow-hidden relative ${
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
