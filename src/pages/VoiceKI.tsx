import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, ClipboardList, Shield, ArrowRight, Check, Loader2, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PageBackground from "@/components/PageBackground";
import logo from "@/assets/logo-2.png";
import logoAvatar from "@/assets/logo-phone-avatar.png";
import { z } from "zod";

const appleEase = [0.16, 1, 0.3, 1] as const;

const WEBHOOK_URL = "https://mtmstudios.app.n8n.cloud/webhook/website-kontaktformular";

const leadSchema = z.object({
  name: z.string().trim().min(1, "Name ist erforderlich").max(100),
  company: z.string().trim().min(1, "Unternehmen ist erforderlich").max(100),
  phone: z.string().trim().min(4, "Telefonnummer ist erforderlich").max(30),
});

/* ─── Phone Visual (from /ki-telefonassistent) ─── */
const PhoneVisual = () => {
  const ref = useRef(null);
  const barCount = 7;

  return (
    <div ref={ref} className="relative w-full flex items-center justify-center">
      <svg viewBox="0 0 320 560" className="w-full max-w-[300px] md:max-w-[340px]" fill="none">
        <defs>
          <linearGradient id="vkFrameGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
          </linearGradient>
          <filter id="vkGlow"><feGaussianBlur stdDeviation="25" /></filter>
          <filter id="vkShadow"><feGaussianBlur stdDeviation="12" /></filter>
          <clipPath id="vkAvatarClip"><circle cx="160" cy="120" r="28" /></clipPath>
        </defs>

        {/* Shadow */}
        <ellipse cx="160" cy="540" rx="100" ry="12" fill="hsl(var(--accent))" fillOpacity="0.08" filter="url(#vkShadow)" />

        {/* Phone body */}
        <rect x="20" y="10" width="280" height="520" rx="40" fill="hsl(var(--background))" />
        <motion.rect
          x="20" y="10" width="280" height="520" rx="40"
          stroke="url(#vkFrameGrad)" strokeWidth="2.5" fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: appleEase }}
        />

        {/* Notch */}
        <motion.rect
          x="120" y="22" width="80" height="6" rx="3"
          fill="hsl(var(--accent))" fillOpacity="0.2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        />

        {/* Avatar */}
        <motion.circle
          cx="160" cy="120" r="28"
          fill="hsl(var(--accent)/0.1)" stroke="hsl(var(--accent)/0.25)" strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.4, ease: appleEase }}
        />
        <motion.image
          href={logoAvatar} x="140" y="100" width="40" height="40"
          clipPath="url(#vkAvatarClip)" preserveAspectRatio="xMidYMid meet"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        />

        {/* Name */}
        <motion.text
          x="160" y="170" textAnchor="middle"
          fill="hsl(var(--foreground))" fontSize="15" fontWeight="600" fontFamily="system-ui"
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, ease: appleEase }}
        >KI-Telefonassistent</motion.text>

        {/* Status */}
        <motion.text
          x="160" y="190" textAnchor="middle"
          fill="hsl(var(--accent))" fontSize="10" fontFamily="system-ui"
          animate={{ opacity: [0, 0.5, 1, 0.5, 1] }}
          transition={{ duration: 3, delay: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >Bereit für Anrufe</motion.text>

        {/* Waveform glow */}
        <motion.circle
          cx="160" cy="255" r="50"
          fill="hsl(var(--accent))" fillOpacity="0.05" filter="url(#vkGlow)"
          animate={{ opacity: [0, 0.6, 0.3, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2.0 }}
        />

        {/* Waveform bars */}
        {Array.from({ length: barCount }).map((_, i) => {
          const center = (barCount - 1) / 2;
          const dist = Math.abs(i - center) / center;
          const maxH = 55 * (1 - dist * 0.5);
          const minH = 12;
          return (
            <motion.rect
              key={i}
              x={109 + i * 15} width="8" rx="4"
              fill="hsl(var(--accent))"
              fillOpacity={i === Math.floor(center) ? 0.7 : 0.45}
              initial={{ y: 255, height: minH }}
              animate={{
                height: [minH, maxH, minH, maxH * 0.7, minH],
                y: [255 - minH / 2, 255 - maxH / 2, 255 - minH / 2, 255 - maxH * 0.7 / 2, 255 - minH / 2],
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 2.0 + i * 0.12, ease: "easeInOut" }}
            />
          );
        })}

        {/* Invitation text */}
        <motion.text
          x="160" y="320" textAnchor="middle"
          fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="system-ui"
          initial={{ opacity: 0 }} animate={{ opacity: 0.8 }}
          transition={{ delay: 2.3 }}
        >Teste jetzt live — ruf an und erlebe die KI</motion.text>

        {/* Call button */}
        <motion.circle
          cx="160" cy="415" r="36" fill="none" stroke="#22c55e" strokeWidth="2"
          animate={{ opacity: [0, 0.25, 0.5, 0.25], scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 2.8 }}
        />
        <motion.circle
          cx="160" cy="415" r="30" fill="#22c55e"
          initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 2.5, ease: appleEase }}
        />
        <motion.path
          d="M152 408c0-1.1.9-2 2-2h1.5a1 1 0 0 1 .9.6l1.2 2.4a1 1 0 0 1-.2 1.1l-1.4 1.4a8 8 0 0 0 4.5 4.5l1.4-1.4a1 1 0 0 1 1.1-.2l2.4 1.2a1 1 0 0 1 .6.9V419a2 2 0 0 1-2 2 12 12 0 0 1-12-12z"
          fill="white"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2.7 }}
        />
        <motion.text
          x="160" y="475" textAnchor="middle" fill="#22c55e"
          style={{ fontSize: "12px", fontWeight: 500 }}
          initial={{ opacity: 0 }} animate={{ opacity: 0.85 }}
          transition={{ delay: 2.7 }}
        >Jetzt anrufen</motion.text>

        {/* Clickable tel link */}
        <foreignObject x="120" y="380" width="80" height="110">
          <a
            href="tel:+4928528879850"
            style={{ display: "block", width: "100%", height: "100%", cursor: "pointer" }}
            aria-label="Testbot anrufen"
          />
        </foreignObject>
      </svg>
    </div>
  );
};

/* ─── Step Indicator ─── */
const StepIndicator = ({ current, total }: { current: number; total: number }) => (
  <div className="flex items-center gap-2 justify-center mb-8">
    {Array.from({ length: total }).map((_, i) => (
      <motion.div
        key={i}
        className={`h-1.5 rounded-full transition-all duration-500 ${
          i <= current ? "bg-accent" : "bg-white/10"
        }`}
        animate={{ width: i === current ? 32 : 12 }}
        transition={{ duration: 0.4, ease: appleEase }}
      />
    ))}
  </div>
);

/* ─── Main Component ─── */
const VoiceKI = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: "", company: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const totalSteps = 5; // 0=Hero, 1=Problem, 2=Demo, 3=Features, 4=Form

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsFormVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (formRef.current) observer.observe(formRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const nextStep = useCallback(() => {
    setStep((s) => Math.min(s + 1, totalSteps - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = leadSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          phone: formData.phone,
          source: "voice-ki-landing",
          service: "KI-Telefonassistent",
          timestamp: new Date().toISOString(),
        }),
      });
    } catch {
      // Fire-and-forget — don't block the user
    }
    setSubmitting(false);
    setSubmitted(true);
    if (typeof (window as any).fbq === "function") {
      (window as any).fbq("track", "Lead");
    }
  };

  const problems = [
    "Anrufe gehen verloren während Sie beim Kunden sind",
    "Interessenten rufen die Konkurrenz an — nicht zurück",
    "Kein Mitarbeiter für Telefon verfügbar",
    "Abends und am Wochenende unerreichbar",
  ];

  const features = [
    { icon: Clock, title: "24/7 Erreichbar", desc: "Jeder Anruf wird angenommen — auch nachts und am Wochenende" },
    { icon: ClipboardList, title: "Leads erfassen", desc: "Name, Anliegen und Rückrufnummer werden automatisch gespeichert" },
    { icon: Shield, title: "DSGVO-konform", desc: "Server in Deutschland, keine Datenweitergabe" },
  ];

  const audiences = ["Handwerker", "Arztpraxen", "Dienstleister", "Immobilien"];

  const faqs = [
    { q: "Was kostet die Voice KI?", a: "Die Kosten hängen vom Gesprächsvolumen ab. In einem kurzen Gespräch ermitteln wir gemeinsam das passende Paket für Ihr Unternehmen." },
    { q: "Wie schnell ist sie einsatzbereit?", a: "In der Regel ist Ihre Voice KI innerhalb von 48 Stunden aktiv — inklusive individueller Konfiguration." },
    { q: "Kann sie auch Termine buchen?", a: "Ja. Die KI kann Termine direkt in Ihren Kalender eintragen oder Anfragen für Sie erfassen." },
    { q: "Was passiert mit den Gesprächsdaten?", a: "Alle Daten werden auf deutschen Servern gespeichert und nicht an Dritte weitergegeben. Vollständig DSGVO-konform." },
  ];

  /* ─── Funnel Step Content ─── */
  const stepContent = [
    /* Step 0 — Hero */
    <div key="hero" className="text-center px-5 pt-6 pb-12 max-w-3xl mx-auto">
      <div className="flex justify-center mb-10">
        <img src={logo} alt="MTM Studios" className="h-7 md:h-9 object-contain" />
      </div>
      <motion.h1
        className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-4"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: appleEase }}
      >
        Nie wieder verpasste Anrufe.
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl font-medium mb-5 text-accent"
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: appleEase }}
      >
        Ihr KI-Telefonassistent — fertig in 48 Stunden
      </motion.p>
      <motion.p
        className="text-sm mb-10 text-muted-foreground"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        ★★★★★&nbsp;&nbsp;Bereits 50+ Unternehmen in Baden-Württemberg und Bayern
      </motion.p>
      <motion.button
        onClick={nextStep}
        className="w-full md:w-auto md:px-14 py-4 rounded-xl font-semibold text-base text-black transition-all hover:brightness-110 active:scale-[0.98] flex items-center justify-center gap-2 mx-auto"
        style={{ backgroundColor: "#22C55E" }}
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, ease: appleEase }}
      >
        Weiter <ArrowRight size={18} />
      </motion.button>
    </div>,

    /* Step 1 — Problem */
    <div key="problem" className="px-5 py-8 max-w-3xl mx-auto">
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: appleEase }}
      >
        Kennen Sie das?
      </motion.h2>
      <div className="space-y-3 mb-10">
        {problems.map((p, i) => (
          <motion.div
            key={i}
            className="flex items-start gap-4 p-5 rounded-xl bg-card border border-white/[0.08] backdrop-blur-sm"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1, ease: appleEase }}
          >
            <span className="text-xl shrink-0 mt-0.5">❌</span>
            <p className="text-muted-foreground">{p}</p>
          </motion.div>
        ))}
      </div>
      <motion.button
        onClick={nextStep}
        className="w-full py-4 rounded-xl font-semibold text-base text-black transition-all hover:brightness-110 active:scale-[0.98] flex items-center justify-center gap-2"
        style={{ backgroundColor: "#22C55E" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        So lösen wir das <ArrowRight size={18} />
      </motion.button>
    </div>,

    /* Step 2 — Demo Bot */
    <div key="demo" className="px-5 py-8 max-w-3xl mx-auto text-center">
      <motion.span
        className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-4 py-1.5 rounded-full text-accent bg-accent/10 border border-accent/20"
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: appleEase }}
      >
        LIVE DEMO
      </motion.span>
      <motion.h2
        className="text-2xl md:text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: appleEase }}
      >
        Testen Sie unsere Voice KI — jetzt anrufen
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: appleEase }}
      >
        <PhoneVisual />
      </motion.div>
      <motion.p
        className="text-sm mt-4 text-muted-foreground mb-8"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Echte KI — kein Script. So klingt Ihr zukünftiger KI-Mitarbeiter.
      </motion.p>
      <motion.button
        onClick={nextStep}
        className="w-full md:w-auto md:px-14 py-4 rounded-xl font-semibold text-base text-black transition-all hover:brightness-110 active:scale-[0.98] flex items-center justify-center gap-2 mx-auto"
        style={{ backgroundColor: "#22C55E" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Mehr erfahren <ArrowRight size={18} />
      </motion.button>
    </div>,

    /* Step 3 — Features + Audience */
    <div key="features" className="px-5 py-8 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {features.map((f, i) => (
          <motion.div
            key={i}
            className="p-6 rounded-xl text-center bg-card border border-white/[0.08] backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1, ease: appleEase }}
          >
            <f.icon className="mx-auto mb-4 text-accent" size={28} />
            <h3 className="text-base font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <span className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-4 py-1.5 rounded-full text-accent bg-accent/10 border border-accent/20">
          PERFEKT FÜR
        </span>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {audiences.map((a, i) => (
            <span key={i} className="px-4 py-2 text-sm font-medium rounded-full bg-white/5 border border-white/10">
              {a}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.button
        onClick={nextStep}
        className="w-full py-4 rounded-xl font-semibold text-base text-black transition-all hover:brightness-110 active:scale-[0.98] flex items-center justify-center gap-2"
        style={{ backgroundColor: "#22C55E" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Jetzt Demo anfragen <ArrowRight size={18} />
      </motion.button>
    </div>,

    /* Step 4 — Form */
    <div key="form" className="px-5 py-8 max-w-xl mx-auto" ref={formRef} id="lead-form">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: appleEase }}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Check size={32} className="text-green-400" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-3">Vielen Dank! 🎉</h2>
            <p className="text-muted-foreground">
              Wir melden uns innerhalb von 24 Stunden bei Ihnen.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            className="p-6 md:p-8 rounded-xl bg-card border border-white/[0.08] backdrop-blur-sm border-t-2 border-t-accent"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: appleEase }}
          >
            <h2 className="text-2xl font-bold text-center mb-2">
              Jetzt unverbindlich Demo anfragen
            </h2>
            <p className="text-sm text-center mb-8 text-muted-foreground">
              Wir melden uns innerhalb von 24 Stunden
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Ihr Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-background text-foreground placeholder:text-muted-foreground/50 text-sm outline-none border border-white/10 focus:ring-2 focus:ring-accent transition-all"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.name}</p>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Unternehmen"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-background text-foreground placeholder:text-muted-foreground/50 text-sm outline-none border border-white/10 focus:ring-2 focus:ring-accent transition-all"
                />
                {errors.company && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.company}</p>}
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Telefonnummer"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-background text-foreground placeholder:text-muted-foreground/50 text-sm outline-none border border-white/10 focus:ring-2 focus:ring-accent transition-all"
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.phone}</p>}
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl font-semibold text-base text-black transition-all hover:brightness-110 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
                style={{ backgroundColor: "#22C55E" }}
              >
                {submitting ? <Loader2 size={18} className="animate-spin" /> : null}
                {submitting ? "Wird gesendet..." : "Demo anfragen →"}
              </button>
            </form>
            <p className="text-xs text-center mt-4 text-muted-foreground/60">
              🔒 Keine Weitergabe · DSGVO-konform · Kein Spam
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQ below form */}
      {!submitted && (
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-center mb-6 text-muted-foreground">Häufige Fragen</h3>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border-0 rounded-xl overflow-hidden bg-card border border-white/[0.08]"
              >
                <AccordionTrigger className="px-5 py-4 text-left text-sm font-medium hover:no-underline text-white">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-4 text-sm text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      )}
    </div>,
  ];

  return (
    <div className="min-h-screen text-white font-['Inter',sans-serif] relative">
      <PageBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Step indicator */}
        <div className="pt-6 md:pt-8">
          <StepIndicator current={step} total={totalSteps} />
        </div>

        {/* Animated step content */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: appleEase }}
            >
              {stepContent[step]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="px-5 py-6 text-center text-xs text-muted-foreground/60">
          © 2025 MTM Studios ·{" "}
          <a href="/datenschutz" className="hover:underline">Datenschutz</a> ·{" "}
          <a href="/impressum" className="hover:underline">Impressum</a>
        </footer>
      </div>

      {/* Floating Mobile CTA — only on non-form steps */}
      {step < 4 && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <button
            onClick={step < 3 ? nextStep : () => setStep(4)}
            className="w-full py-3.5 rounded-xl font-semibold text-sm text-black active:scale-[0.98] flex items-center justify-center gap-2"
            style={{ backgroundColor: "#22C55E" }}
          >
            {step < 3 ? "Weiter" : "Demo anfragen"} <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default VoiceKI;
