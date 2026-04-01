import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Clock, ClipboardList, Shield, Check, Loader2, Phone, Wrench, Stethoscope, Building2, Home } from "lucide-react";
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

/* ─── Phone Visual ─── */
const PhoneVisual = () => {
  const barCount = 7;
  return (
    <div className="relative w-full flex items-center justify-center">
      <svg viewBox="0 0 320 560" className="w-full max-w-[280px] md:max-w-[320px]" fill="none">
        <defs>
          <linearGradient id="vkFrameGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
          </linearGradient>
          <filter id="vkGlow"><feGaussianBlur stdDeviation="25" /></filter>
          <filter id="vkShadow"><feGaussianBlur stdDeviation="12" /></filter>
          <clipPath id="vkAvatarClip"><circle cx="160" cy="120" r="28" /></clipPath>
        </defs>
        <ellipse cx="160" cy="540" rx="100" ry="12" fill="hsl(var(--accent))" fillOpacity="0.08" filter="url(#vkShadow)" />
        <rect x="20" y="10" width="280" height="520" rx="40" fill="hsl(var(--background))" />
        <motion.rect x="20" y="10" width="280" height="520" rx="40" stroke="url(#vkFrameGrad)" strokeWidth="2.5" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: appleEase }} />
        <motion.rect x="120" y="22" width="80" height="6" rx="3" fill="hsl(var(--accent))" fillOpacity="0.2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} />
        <motion.circle cx="160" cy="120" r="28" fill="hsl(var(--accent)/0.1)" stroke="hsl(var(--accent)/0.25)" strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 1.4, ease: appleEase }} />
        <motion.image href={logoAvatar} x="140" y="100" width="40" height="40" clipPath="url(#vkAvatarClip)" preserveAspectRatio="xMidYMid meet"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} />
        <motion.text x="160" y="170" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="15" fontWeight="600" fontFamily="system-ui"
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, ease: appleEase }}>KI-Telefonassistent</motion.text>
        <motion.text x="160" y="190" textAnchor="middle" fill="hsl(var(--accent))" fontSize="10" fontFamily="system-ui"
          animate={{ opacity: [0, 0.5, 1, 0.5, 1] }} transition={{ duration: 3, delay: 1.8, repeat: Infinity, ease: "easeInOut" }}>Bereit für Anrufe</motion.text>
        <motion.circle cx="160" cy="255" r="50" fill="hsl(var(--accent))" fillOpacity="0.05" filter="url(#vkGlow)"
          animate={{ opacity: [0, 0.6, 0.3, 0.6] }} transition={{ duration: 4, repeat: Infinity, delay: 2.0 }} />
        {Array.from({ length: barCount }).map((_, i) => {
          const center = (barCount - 1) / 2;
          const dist = Math.abs(i - center) / center;
          const maxH = 55 * (1 - dist * 0.5);
          const minH = 12;
          return (
            <motion.rect key={i} x={109 + i * 15} width="8" rx="4" fill="hsl(var(--accent))"
              fillOpacity={i === Math.floor(center) ? 0.7 : 0.45}
              initial={{ y: 255, height: minH }}
              animate={{ height: [minH, maxH, minH, maxH * 0.7, minH], y: [255 - minH / 2, 255 - maxH / 2, 255 - minH / 2, 255 - maxH * 0.7 / 2, 255 - minH / 2] }}
              transition={{ duration: 4, repeat: Infinity, delay: 2.0 + i * 0.12, ease: "easeInOut" }} />
          );
        })}
        <motion.text x="160" y="320" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="system-ui"
          initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 2.3 }}>Teste jetzt live — ruf an und erlebe die KI</motion.text>
        {/* Outer pulsing rings */}
        <motion.circle cx="160" cy="415" r="42" fill="none" stroke="#22c55e" strokeWidth="1.5"
          animate={{ opacity: [0, 0.15, 0.3, 0.15, 0], scale: [0.9, 1.15, 0.9] }} transition={{ duration: 2, repeat: Infinity, delay: 2.8 }} />
        <motion.circle cx="160" cy="415" r="36" fill="none" stroke="#22c55e" strokeWidth="2"
          animate={{ opacity: [0, 0.3, 0.6, 0.3, 0], scale: [1, 1.1, 1] }} transition={{ duration: 1.8, repeat: Infinity, delay: 3.0 }} />
        <motion.circle cx="160" cy="415" r="30" fill="#22c55e"
          initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: [1, 1.05, 1] }}
          transition={{ opacity: { duration: 0.6, delay: 2.5, ease: appleEase }, scale: { duration: 1.5, repeat: Infinity, delay: 3.2, ease: "easeInOut" } }} />
        <motion.path d="M152 408c0-1.1.9-2 2-2h1.5a1 1 0 0 1 .9.6l1.2 2.4a1 1 0 0 1-.2 1.1l-1.4 1.4a8 8 0 0 0 4.5 4.5l1.4-1.4a1 1 0 0 1 1.1-.2l2.4 1.2a1 1 0 0 1 .6.9V419a2 2 0 0 1-2 2 12 12 0 0 1-12-12z"
          fill="white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.7 }} />
        <motion.text x="160" y="475" textAnchor="middle" fill="#22c55e" style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.02em" }}
          initial={{ opacity: 0 }} animate={{ opacity: [0.7, 1, 0.7] }} transition={{ delay: 2.7, duration: 2, repeat: Infinity }}>Jetzt anrufen</motion.text>
        <foreignObject x="120" y="380" width="80" height="110">
          <a href="tel:+4928528879850" style={{ display: "block", width: "100%", height: "100%", cursor: "pointer" }} aria-label="Testbot anrufen" />
        </foreignObject>
      </svg>
    </div>
  );
};

/* ─── Main Component ─── */
const VoiceKI = () => {
  const [formData, setFormData] = useState({ name: "", company: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsFormVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (formRef.current) observer.observe(formRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      setPastHero(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToDemo = () => {
    document.getElementById("live-demo")?.scrollIntoView({ behavior: "smooth" });
  };

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
          name: formData.name, company: formData.company, phone: formData.phone,
          source: "voice-ki-landing", service: "KI-Telefonassistent",
          timestamp: new Date().toISOString(),
        }),
      });
    } catch { /* fire-and-forget */ }
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

  const audiences = [
    { icon: Wrench, label: "Handwerker" },
    { icon: Stethoscope, label: "Arztpraxen" },
    { icon: Building2, label: "Dienstleister" },
    { icon: Home, label: "Immobilien" },
  ];

  const faqs = [
    { q: "Was kostet die Voice KI?", a: "Die Kosten hängen vom Gesprächsvolumen ab. In einem kurzen Gespräch ermitteln wir gemeinsam das passende Paket für Ihr Unternehmen." },
    { q: "Wie schnell ist sie einsatzbereit?", a: "In der Regel ist Ihre Voice KI innerhalb von 48 Stunden aktiv — inklusive individueller Konfiguration." },
    { q: "Kann sie auch Termine buchen?", a: "Ja. Die KI kann Termine direkt in Ihren Kalender eintragen oder Anfragen für Sie erfassen." },
    { q: "Was passiert mit den Gesprächsdaten?", a: "Alle Daten werden auf deutschen Servern gespeichert und nicht an Dritte weitergegeben. Vollständig DSGVO-konform." },
  ];

  return (
    <div className="min-h-screen text-white font-['Inter',sans-serif] relative">
      <PageBackground />

      {/* ─── Sticky Header ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
        style={{
          backgroundColor: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
          <img src={logo} alt="MTM Studios" className="h-7 md:h-8 object-contain" />
          <div className="flex items-center gap-3">
            <a
              href="tel:+4928528879850"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-white/10 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone size={14} /> Anrufen
            </a>
            <button
              onClick={scrollToForm}
              className="px-5 py-2.5 rounded-full text-sm font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-all active:scale-[0.97]"
            >
              Demo anfragen
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10">
        {/* ─── HERO ─── */}
        <section className="min-h-screen flex items-center justify-center px-5 pt-20 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-amber-400 text-sm tracking-wider">★★★★★</span>
              <span className="text-xs text-foreground/90 font-medium">50+ Unternehmen in Baden-Württemberg & Bayern</span>
            </motion.div>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.08] mb-5"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: appleEase }}
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
              className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Die KI nimmt Ihre Anrufe an, beantwortet Fragen, erfasst Leads und bucht Termine — rund um die Uhr. Für Unternehmen in Süddeutschland.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, ease: appleEase }}
            >
              <button
                onClick={scrollToForm}
                className="px-10 py-4 rounded-full font-semibold text-base bg-accent text-accent-foreground hover:bg-accent/90 transition-all active:scale-[0.98]"
              >
                Kostenlose Demo anfragen
              </button>
              <button
                onClick={scrollToDemo}
                className="px-10 py-4 rounded-full font-semibold text-base border border-white/10 text-foreground hover:bg-white/5 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Phone size={18} /> Live testen
              </button>
            </motion.div>
          </div>
        </section>

        {/* ─── PROBLEM ─── */}
        <section className="py-20 md:py-28 px-5">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 leading-snug"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, ease: appleEase }}
            >
              Während Sie arbeiten, gehen Aufträge in Baden-Württemberg & Bayern verloren.
            </motion.h2>
            <motion.p
              className="text-center text-accent font-semibold text-lg mb-12"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.15 }}
            >
              Unsere KI übernimmt.
            </motion.p>
            <div className="space-y-3">
              {problems.map((p, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-xl bg-card border border-white/[0.08] backdrop-blur-sm"
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1, ease: appleEase }}
                >
                  <span className="text-xl shrink-0 mt-0.5">❌</span>
                  <p className="text-muted-foreground">{p}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── LIVE DEMO (Main Conversion Zone) ─── */}
        <section className="py-20 md:py-28 px-5" id="live-demo">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full text-accent bg-accent/10 border border-accent/20"
              initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.4, ease: appleEase }}
            >
              {/* Pulsing live dot */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              LIVE DEMO
            </motion.span>
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1, ease: appleEase }}
            >
              Testen Sie unsere Voice KI
            </motion.h2>
            <motion.p
              className="text-muted-foreground mb-10 text-base"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.2 }}
            >
              Echte KI — kein Script. So klingt Ihr zukünftiger KI-Mitarbeiter.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2, ease: appleEase }}
            >
              <PhoneVisual />
            </motion.div>

            <motion.p
              className="text-xs text-muted-foreground/70 mt-4 max-w-xs mx-auto"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.4 }}
            >
              Kostenloser Testanruf. Du sprichst direkt mit der KI – kein Verkaufsgespräch.
            </motion.p>
          </div>
        </section>

        {/* ─── FEATURES ─── */}
        <section className="py-20 md:py-28 px-5">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  className="p-6 rounded-xl text-center bg-card border border-white/[0.08] backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1, ease: appleEase }}
                >
                  <f.icon className="mx-auto mb-4 text-accent" size={28} />
                  <h3 className="text-base font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </motion.div>
              ))}
            </div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.3 }}
            >
              <span className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-4 py-1.5 rounded-full text-accent bg-accent/10 border border-accent/20">
                PERFEKT FÜR
              </span>
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                {audiences.map((a, i) => (
                  <span key={i} className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full bg-white/5 border border-white/10">
                    <a.icon size={16} className="text-accent shrink-0" />
                    {a.label}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── FORM + FAQ ─── */}
        <section className="py-20 md:py-28 px-5" id="lead-form" ref={formRef}>
          <div className="max-w-xl mx-auto">
            {submitted ? (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: appleEase }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <Check size={32} className="text-accent" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-3">Vielen Dank! 🎉</h2>
                <p className="text-muted-foreground">Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
              </motion.div>
            ) : (
              <motion.div
                className="p-6 md:p-8 rounded-xl bg-card border border-white/[0.08] backdrop-blur-sm border-t-2 border-t-accent"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, ease: appleEase }}
              >
                <h2 className="text-2xl font-bold text-center mb-2">Individuelles Angebot & Demo anfordern</h2>
                <p className="text-sm text-center mb-8 text-muted-foreground">Für Unternehmen in Baden-Württemberg & Bayern · Antwort innerhalb von 24h</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input type="text" placeholder="Ihr Name" value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-background text-foreground placeholder:text-muted-foreground/50 text-sm outline-none border border-white/10 focus:border-accent focus:ring-2 focus:ring-accent/50 transition-all" />
                    {errors.name && <p className="text-destructive text-xs mt-1.5 ml-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input type="text" placeholder="Unternehmen" value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-background text-foreground placeholder:text-muted-foreground/50 text-sm outline-none border border-white/10 focus:border-accent focus:ring-2 focus:ring-accent/50 transition-all" />
                    {errors.company && <p className="text-destructive text-xs mt-1.5 ml-1">{errors.company}</p>}
                  </div>
                  <div>
                    <input type="tel" placeholder="Telefonnummer" value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-background text-foreground placeholder:text-muted-foreground/50 text-sm outline-none border border-white/10 focus:border-accent focus:ring-2 focus:ring-accent/50 transition-all" />
                    {errors.phone && <p className="text-destructive text-xs mt-1.5 ml-1">{errors.phone}</p>}
                  </div>
                  <button type="submit" disabled={submitting}
                    className="w-full py-4 rounded-full font-semibold text-base bg-accent text-accent-foreground hover:bg-accent/90 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70">
                    {submitting ? <Loader2 size={18} className="animate-spin" /> : null}
                    {submitting ? "Wird gesendet..." : "Demo anfragen →"}
                  </button>
                  <p className="text-xs text-center text-muted-foreground/50 mt-1">Antwort in der Regel innerhalb von 24 Stunden.</p>
                </form>
                <p className="text-xs text-center mt-4 text-muted-foreground/60">🔒 Keine Weitergabe · DSGVO-konform · Kein Spam</p>
              </motion.div>
            )}

            {!submitted && (
              <motion.div className="mt-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                <h3 className="text-lg font-semibold text-center mb-6 text-muted-foreground">Häufige Fragen</h3>
                <Accordion type="single" collapsible className="space-y-2">
                  {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="border-0 rounded-xl overflow-hidden bg-card border border-white/[0.08]">
                      <AccordionTrigger className="px-5 py-4 text-left text-sm font-medium hover:no-underline text-foreground">{faq.q}</AccordionTrigger>
                      <AccordionContent className="px-5 pb-4 text-sm text-muted-foreground">{faq.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            )}
          </div>
        </section>

        {/* ─── Footer ─── */}
        <footer className="px-5 py-8 text-center text-xs text-muted-foreground/60">
          © 2026 MTM Studios ·{" "}
          <a href="/datenschutz" className="hover:underline">Datenschutz</a> ·{" "}
          <a href="/impressum" className="hover:underline">Impressum</a>
        </footer>
      </div>

      {/* ─── Floating Mobile CTA ─── */}
      <div
        className={`fixed bottom-20 left-0 right-0 z-[80] px-4 md:hidden transition-all duration-500 ease-out ${
          pastHero && !isFormVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={scrollToForm}
          className="w-full py-3.5 rounded-full font-semibold text-sm bg-accent text-accent-foreground shadow-[0_-4px_20px_rgba(0,229,192,0.25)] active:scale-[0.98] flex items-center justify-center gap-2 transition-all"
        >
          Kostenlose Demo anfragen
        </button>
      </div>
    </div>
  );
};

export default VoiceKI;
