import Navigation from "@/components/Navigation";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import BlurText from "@/components/BlurText";
import SEOHead from "@/components/SEOHead";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "motion/react";
import { useRef, useEffect } from "react";
import { TrendingUp, Phone, MessageSquare, Zap, ExternalLink } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const appleEase = [0.16, 1, 0.3, 1] as const;

/* ─── Count-Up Hook ────────────────────────────────────────────── */
function useCountUp(target: number, inView: boolean, duration = 1.5) {
  const val     = useMotionValue(0);
  const rounded = useTransform(val, (v) => Math.round(v));
  useEffect(() => {
    if (!inView) return;
    const c = animate(val, target, { duration, ease: appleEase });
    return c.stop;
  }, [inView, target, duration, val]);
  return rounded;
}

/* ─── Animated Bar Chart ────────────────────────────────────────── */
interface BarDef {
  label: string;
  value: number;   // 0–100 für die Breite
  display: string; // "28 %"
  source: string;
}

const chartData: BarDef[] = [
  { label: "KMU setzen KI bereits ein",              value: 28, display: "28 %",  source: "Bitkom 2025" },
  { label: "KMU planen KI (nächste 12 Monate)",      value: 41, display: "41 %",  source: "Bitkom 2025" },
  { label: "Kunden bevorzugen Messenger-Kanäle",     value: 43, display: "43 %",  source: "Twilio 2024" },
  { label: "Chatbot-Abdeckungsrate (gut konfiguriert)", value: 70, display: "70 %", source: "Gartner 2024" },
  { label: "Kundenzufriedenheit mit KI-Chatbots",    value: 78, display: "78 %",  source: "Zendesk 2025" },
];

const AnimatedBar = ({ label, value, display, source, index, inView }: BarDef & { index: number; inView: boolean }) => {
  const barVal = useMotionValue(0);
  const width  = useTransform(barVal, (v) => `${v}%`);

  useEffect(() => {
    if (!inView) return;
    const c = animate(barVal, value, {
      duration: 1.2,
      delay: 0.1 + index * 0.18,
      ease: appleEase,
    });
    return c.stop;
  }, [inView, value, index, barVal]);

  const count = useCountUp(value, inView, 1.2);

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.08 * index, ease: appleEase }}
      className="group"
    >
      {/* Labels */}
      <div className="flex items-baseline justify-between mb-2 gap-4">
        <span className="text-sm text-foreground/60 leading-snug">{label}</span>
        <div className="flex items-baseline gap-1 shrink-0">
          <motion.span className="text-lg font-bold text-accent tabular-nums">{count}</motion.span>
          <span className="text-sm font-semibold text-accent/70">%</span>
        </div>
      </div>

      {/* Track */}
      <div className="relative h-[3px] bg-white/[0.07] rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-accent rounded-full"
          style={{ width }}
        />
      </div>

      {/* Source */}
      <p className="text-[10px] text-foreground/20 mt-1.5">{source}</p>
    </motion.div>
  );
};

/* ─── Stat Row (kompakter Listenstil) ───────────────────────────── */
interface StatRow {
  display: string;
  label: string;
  source: string;
}

const StatListItem = ({ display, label, source, index, inView }: StatRow & { index: number; inView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.55, delay: 0.08 + index * 0.1, ease: appleEase }}
    className="flex items-start justify-between gap-6 py-5 border-b border-white/[0.06] last:border-0"
  >
    <div className="space-y-0.5">
      <p className="text-sm text-foreground/55 leading-relaxed">{label}</p>
      <p className="text-[10px] text-foreground/20">{source}</p>
    </div>
    <span className="text-2xl font-bold text-accent shrink-0 tabular-nums">{display}</span>
  </motion.div>
);

/* ─── "Auf einen Blick" Hero Stats ──────────────────────────────── */
const heroStats = [
  { value: 28,   suffix: " %",     label: "KMU mit KI",        source: "Bitkom 2025" },
  { value: 60,   suffix: " Mio.",  label: "WhatsApp-Nutzer DE", source: "Statista 2025" },
  { value: 35,   suffix: " %",     label: "verpasste Anrufe",   source: "Bitkom 2025" },
  { value: 78,   suffix: " %",     label: "Chatbot-Zufriedenheit", source: "Zendesk 2025" },
];

const HeroStat = ({ value, suffix, label, source, index, inView }: typeof heroStats[0] & { index: number; inView: boolean }) => {
  const count = useCountUp(value, inView, 1.4);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.13, ease: appleEase }}
      className="text-center px-4"
    >
      <div className="flex items-end justify-center gap-0.5 leading-none mb-2">
        <motion.span className="text-5xl md:text-6xl font-bold text-foreground tabular-nums">{count}</motion.span>
        <span className="text-2xl md:text-3xl font-bold text-accent mb-1">{suffix}</span>
      </div>
      <p className="text-xs text-foreground/40 font-medium tracking-wide uppercase">{label}</p>
      <p className="text-[9px] text-foreground/20 mt-1">{source}</p>
    </motion.div>
  );
};

/* ─── Data ──────────────────────────────────────────────────────── */
const phoneRows: StatRow[] = [
  { display: "35 %",    label: "der Erstanrufe gehen außerhalb der Öffnungszeiten verloren",               source: "Bitkom 2025" },
  { display: "60 %",    label: "der Kunden rufen nach verpasstem Anruf nicht mehr zurück",                 source: "Forrester Research 2024" },
  { display: "< 10 %",  label: "der deutschen KMU sind ohne KI rund um die Uhr erreichbar",               source: "Deloitte 2024" },
  { display: "40–70 %", label: "Kostenvorteil gegenüber klassischem Call-Center-Outsourcing",              source: "McKinsey 2025" },
];

const chatRows: StatRow[] = [
  { display: "60 Mio.", label: "WhatsApp-Nutzer in Deutschland",                                           source: "Statista 2025" },
  { display: "43 %",    label: "der Kunden bevorzugen Messenger gegenüber Telefon oder E-Mail",            source: "Twilio 2024" },
  { display: "60–80 %", label: "aller Anfragen kann ein gut konfigurierter Chatbot vollständig beantworten", source: "Gartner 2024" },
  { display: "78 %",    label: "Kundenzufriedenheit bei korrektem Chatbot-Einsatz",                        source: "Zendesk 2025" },
];

const roiRows: StatRow[] = [
  { display: "3–9 Mon.", label: "durchschnittliche Amortisationszeit für KI-Projekte im Mittelstand",      source: "McKinsey 2025" },
  { display: "8–15 Std.", label: "wöchentliche Zeitersparnis pro Mitarbeiter durch Automatisierung",       source: "Deloitte 2024" },
  { display: "< 0,5 %",  label: "Fehlerquote bei automatisierten Dateneingaben (vs. 4 % manuell)",        source: "MIT Sloan Management 2024" },
  { display: "+25–50 %", label: "Wachstumspotenzial ohne proportionale Personalaufstockung",              source: "McKinsey 2025" },
];

/* ─── Section Header ────────────────────────────────────────────── */
const SectionHeader = ({ icon, title, subtitle, inView }: { icon: React.ReactNode; title: string; subtitle: string; inView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.65, ease: appleEase }}
    className="mb-10"
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">{icon}</div>
      <h2 className="text-xl md:text-2xl font-bold text-foreground">{title}</h2>
    </div>
    <p className="text-foreground/40 text-sm md:text-base leading-relaxed max-w-xl">{subtitle}</p>
  </motion.div>
);

/* ─── Page ──────────────────────────────────────────────────────── */
const KiStatistiken = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  /* Refs für jede Section */
  const heroStatRef = useRef<HTMLDivElement>(null!);
  const chartRef    = useRef<HTMLElement>(null!);
  const phoneRef    = useRef<HTMLElement>(null!);
  const chatRef     = useRef<HTMLElement>(null!);
  const roiRef      = useRef<HTMLElement>(null!);
  const outroRef    = useRef<HTMLElement>(null!);

  const heroStatInView = useInView(heroStatRef, { once: true, margin: "-60px" });
  const chartInView    = useInView(chartRef,    { once: true, margin: "-80px" });
  const phoneInView    = useInView(phoneRef,    { once: true, margin: "-80px" });
  const chatInView     = useInView(chatRef,     { once: true, margin: "-80px" });
  const roiInView      = useInView(roiRef,      { once: true, margin: "-80px" });
  const outroInView    = useInView(outroRef,    { once: true, margin: "-60px" });

  return (
    <div className="relative min-h-screen bg-background">
      <SEOHead
        title="KI im deutschen Mittelstand 2026 — Zahlen & Fakten | MTM Studios"
        description="Aktuelle Statistiken zur KI-Nutzung im deutschen Mittelstand: Adoption, Telefonassistenten, Chatbots, ROI. Kostenlos zitierbar mit Quellenangabe."
      />

      {/* Background */}
      <div ref={bgRef} className="fixed inset-0 w-screen h-screen overflow-hidden" style={{ isolation: "isolate", zIndex: 0 }}>
        <img src="/videos/hero-background-still.jpg" alt="" loading="lazy"
          className="md:hidden w-full h-full object-cover absolute inset-0"
          style={{ filter: "brightness(0.7) contrast(1.5)", pointerEvents: "none" }} />
        <video autoPlay loop muted playsInline className="hidden md:block w-full h-full object-cover"
          style={{ mixBlendMode: "hard-light", position: "absolute", top: 0, left: 0, width: "100%", height: "100%", filter: "brightness(0.7) contrast(2)" }}>
          <source src="/videos/hero-background.webm" type="video/webm" />
          <source src="/videos/hero-background.mp4"  type="video/mp4" />
        </video>
      </div>

      {/* Nav */}
      <div style={{ position: "relative", zIndex: 100 }}><Navigation /></div>

      {/* Content */}
      <main id="main" style={{ position: "relative", zIndex: 10 }}>

        {/* ── Hero Text ──────────────────────────────────────────── */}
        <section className="flex flex-col items-center justify-start px-6 pt-[14vh] pb-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: appleEase }}
            className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent mb-5"
          >
            Marktdaten & Studien · Stand März 2026
          </motion.span>

          <BlurText
            text="KI im deutschen Mittelstand"
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight"
            animateBy="words" direction="top" delay={100}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: appleEase }}
            className="mt-5 text-base md:text-lg text-foreground/50 max-w-xl leading-relaxed"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.8)" }}
          >
            Zahlen, Fakten und Trends — aktuell, belegt und kostenlos zitierbar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.0, ease: appleEase }}
            className="mt-6 inline-flex items-center gap-2 text-[10px] text-foreground/25 border border-white/[0.07] rounded-full px-4 py-2"
          >
            <ExternalLink className="w-3 h-3 shrink-0" />
            Frei verwendbar mit Quellenangabe: mtmstudios.de
          </motion.div>
        </section>

        {/* ── Auf einen Blick — 4 große Zahlen ──────────────────── */}
        <section className="px-6 pb-6">
          <div className="max-w-4xl mx-auto">
            <div ref={heroStatRef} className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/[0.07] rounded-2xl overflow-hidden bg-white/[0.02]">
              {heroStats.map((s, i) => (
                <div key={i} className={`py-8 ${i < 3 ? "border-r border-white/[0.06]" : ""} ${i >= 2 ? "border-t md:border-t-0 border-white/[0.06]" : ""}`}>
                  <HeroStat {...s} index={i} inView={heroStatInView} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bar Chart: KI-Adoption ─────────────────────────────── */}
        <section ref={chartRef} className="px-6 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="border-t border-white/[0.06] mb-12" />
            <SectionHeader
              inView={chartInView}
              icon={<TrendingUp className="w-4 h-4" />}
              title="KI-Adoption auf einen Blick"
              subtitle="Wie weit ist der deutsche Mittelstand — und was Kunden heute bereits erwarten."
            />
            <div className="space-y-7">
              {chartData.map((bar, i) => (
                <AnimatedBar key={i} {...bar} index={i} inView={chartInView} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Telefon & Chatbot — 2 Spalten ─────────────────────── */}
        <section className="px-6 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="border-t border-white/[0.06] mb-12" />
            <div className="grid md:grid-cols-2 gap-12 md:gap-16">

              {/* Telefon */}
              <div ref={phoneRef as React.RefObject<HTMLDivElement>}>
                <SectionHeader
                  inView={phoneInView}
                  icon={<Phone className="w-4 h-4" />}
                  title="Telefon & Erreichbarkeit"
                  subtitle="Was verpasste Anrufe wirklich kosten."
                />
                {phoneRows.map((row, i) => (
                  <StatListItem key={i} {...row} index={i} inView={phoneInView} />
                ))}
              </div>

              {/* Chatbot */}
              <div ref={chatRef as React.RefObject<HTMLDivElement>}>
                <SectionHeader
                  inView={chatInView}
                  icon={<MessageSquare className="w-4 h-4" />}
                  title="Chatbots & WhatsApp"
                  subtitle="Der Kanal, den Kunden heute bevorzugen."
                />
                {chatRows.map((row, i) => (
                  <StatListItem key={i} {...row} index={i} inView={chatInView} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── ROI & Automatisierung ──────────────────────────────── */}
        <section ref={roiRef} className="px-6 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="border-t border-white/[0.06] mb-12" />
            <SectionHeader
              inView={roiInView}
              icon={<Zap className="w-4 h-4" />}
              title="ROI & Automatisierung"
              subtitle="Konkrete Zahlen zu Zeit, Fehlerquoten und Wachstumspotenzial."
            />
            <div className="grid sm:grid-cols-2 gap-4">
              {roiRows.map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                  animate={roiInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.6, delay: 0.08 + i * 0.12, ease: appleEase }}
                  className="border border-white/[0.07] rounded-xl p-5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300"
                >
                  <span className="text-3xl font-bold text-accent block mb-2 tabular-nums">{row.display}</span>
                  <p className="text-sm text-foreground/55 leading-relaxed">{row.label}</p>
                  <p className="text-[10px] text-foreground/20 mt-2">{row.source}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Outro ─────────────────────────────────────────────── */}
        <section ref={outroRef} className="px-6 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="border-t border-white/[0.06] mb-12" />
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={outroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: appleEase }}
              className="text-xl md:text-2xl font-bold text-foreground mb-4"
            >
              Über diese Seite
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={outroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1, ease: appleEase }}
              className="text-foreground/40 text-sm md:text-base leading-relaxed"
            >
              Alle Daten basieren auf öffentlich zugänglichen Studien von Bitkom, McKinsey, Deloitte, Gartner, Statista, Twilio, Zendesk, Forrester und MIT Sloan Management. Redaktionen und Blogger dürfen die Zahlen frei verwenden — mit Quellenangabe „mtmstudios.de".
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={outroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2, ease: appleEase }}
              className="text-foreground/20 text-xs mt-4"
            >
              Zuletzt aktualisiert: März 2026 · Nächste Aktualisierung: Q3 2026
            </motion.p>
          </div>
        </section>

        <CTASection />
        <Footer />
      </main>
    </div>
  );
};

export default KiStatistiken;
