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

const appleEase = [0.16, 1, 0.3, 1] as const;

/* ─── Count-Up Hook ─────────────────────────────────────────────── */
function useCountUp(target: number, inView: boolean, duration = 1.6) {
  const motionVal = useMotionValue(0);
  const rounded   = useTransform(motionVal, (v) => Math.round(v));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionVal, target, {
      duration,
      ease: appleEase,
    });
    return controls.stop;
  }, [inView, target, duration, motionVal]);

  return rounded;
}

/* ─── Stat Card ─────────────────────────────────────────────────── */
interface StatDef {
  /** Numerischer Zielwert für Count-Up; null = statische Anzeige */
  numericValue: number | null;
  prefix?: string;
  suffix?: string;
  /** Fallback-Text wenn kein numericValue (z.B. "20–40 %") */
  display?: string;
  label: string;
  source?: string;
}

interface StatCardProps extends StatDef {
  index: number;
  sectionInView: boolean;
}

const StatCard = ({
  numericValue,
  prefix = "",
  suffix = "",
  display,
  label,
  source,
  index,
  sectionInView,
}: StatCardProps) => {
  const count = useCountUp(numericValue ?? 0, sectionInView && numericValue !== null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      animate={
        sectionInView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : {}
      }
      transition={{
        duration: 0.7,
        delay: 0.1 + index * 0.12,
        ease: appleEase,
      }}
      className="
        group relative overflow-hidden
        border border-white/[0.07] rounded-2xl
        p-7 md:p-9
        bg-white/[0.025]
        hover:bg-white/[0.05]
        hover:border-accent/20
        transition-colors duration-500
        flex flex-col gap-4
      "
    >
      {/* Subtle accent glow on hover */}
      <div className="
        absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
        transition-opacity duration-500
        pointer-events-none
        bg-[radial-gradient(ellipse_at_top_left,hsl(var(--accent)/0.06),transparent_70%)]
      " />

      {/* Value */}
      <div className="flex items-end gap-1 leading-none">
        {prefix && (
          <span className="text-2xl md:text-3xl font-bold text-accent/80 mb-1">
            {prefix}
          </span>
        )}

        {numericValue !== null ? (
          <motion.span className="text-4xl md:text-5xl font-bold text-accent tabular-nums">
            {count}
          </motion.span>
        ) : (
          <span className="text-4xl md:text-5xl font-bold text-accent leading-none">
            {display}
          </span>
        )}

        {suffix && (
          <span className="text-xl md:text-2xl font-semibold text-accent/70 mb-1 ml-0.5">
            {suffix}
          </span>
        )}
      </div>

      {/* Label */}
      <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
        {label}
      </p>

      {/* Source */}
      {source && (
        <span className="text-xs text-foreground/25 mt-auto pt-3 border-t border-white/[0.06]">
          Quelle: {source}
        </span>
      )}
    </motion.div>
  );
};

/* ─── Section Wrapper ───────────────────────────────────────────── */
interface SectionProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  stats: StatDef[];
}

const StatSection = ({ icon, title, subtitle, stats }: SectionProps) => {
  const ref    = useRef<HTMLElement>(null!);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="border-t border-white/[0.06] mb-16" />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: appleEase }}
          className="mb-12 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
              {icon}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {title}
            </h2>
          </div>
          <p className="text-foreground/45 text-base md:text-lg max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard
              key={i}
              {...stat}
              index={i}
              sectionInView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Data ──────────────────────────────────────────────────────── */
const adoptionStats: StatDef[] = [
  { numericValue: 28,  suffix: " %",      label: "der deutschen KMU setzen KI bereits ein",                                    source: "Bitkom 2025" },
  { numericValue: 41,  suffix: " %",      label: "planen KI-Einsatz in den nächsten 12 Monaten",                               source: "Bitkom 2025" },
  { numericValue: null, display: "20–40 %", label: "durchschnittliche Zeitersparnis durch Prozessautomatisierung",             source: "Deloitte 2024" },
  { numericValue: 1,   prefix: "#",       label: "häufigster Anwendungsfall: Kundenkommunikation & Automatisierung",           source: "McKinsey 2025" },
];

const phoneStats: StatDef[] = [
  { numericValue: 35,   suffix: " %",       label: "der Erstanrufe gehen außerhalb der Geschäftszeiten verloren" },
  { numericValue: 60,   suffix: " %",       label: "der Kunden rufen nach einem verpassten Anruf nicht zurück" },
  { numericValue: null, display: "< 10 %",  label: "der KMU sind ohne KI rund um die Uhr telefonisch erreichbar" },
  { numericValue: null, display: "40–70 %", label: "Kosteneinsparung gegenüber klassischem Call-Center-Outsourcing" },
];

const chatbotStats: StatDef[] = [
  { numericValue: 60,   suffix: " Mio.", label: "WhatsApp-Nutzer in Deutschland",                                             source: "Statista 2025" },
  { numericValue: 43,   suffix: " %",   label: "der Kunden bevorzugen Messenger gegenüber Telefon oder E-Mail",               source: "Twilio 2024" },
  { numericValue: null, display: "60–80 %", label: "aller Anfragen kann ein gut konfigurierter Chatbot vollständig bearbeiten", source: "Gartner 2024" },
  { numericValue: 78,   suffix: " %",   label: "Kundenzufriedenheit bei korrektem Chatbot-Einsatz",                           source: "Zendesk 2025" },
];

const roiStats: StatDef[] = [
  { numericValue: null, display: "3–9",       suffix: " Mon.", label: "durchschnittliche Amortisationszeit für KI-Projekte im Mittelstand" },
  { numericValue: null, display: "8–15",      suffix: " Std.", label: "wöchentliche Zeitersparnis pro Mitarbeiter durch Automatisierung" },
  { numericValue: null, display: "< 0,5 %",              label: "Fehlerquote bei automatisierten Dateneingaben (vs. 4 % manuell)" },
  { numericValue: null, display: "+25–50 %",             label: "Wachstumspotenzial ohne proportionale Personalaufstockung" },
];

/* ─── Page ──────────────────────────────────────────────────────── */
const KiStatistiken = () => {
  const bgRef    = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLElement>(null!);
  const outroInView = useInView(outroRef, { once: true, margin: "-60px" });

  return (
    <div className="relative min-h-screen bg-background">
      <SEOHead
        title="KI im deutschen Mittelstand 2026 — Zahlen & Fakten | MTM Studios"
        description="Aktuelle Statistiken zur KI-Nutzung im deutschen Mittelstand: Adoption, Telefonassistenten, Chatbots, ROI und Automatisierung. Kostenlos zitierbar mit Quellenangabe."
      />

      {/* Video Background */}
      <div
        ref={bgRef}
        className="fixed inset-0 w-screen h-screen overflow-hidden"
        style={{ isolation: "isolate", zIndex: 0 }}
      >
        <img
          src="/videos/hero-background-still.jpg"
          alt=""
          loading="lazy"
          className="md:hidden w-full h-full object-cover absolute inset-0"
          style={{ filter: "brightness(0.7) contrast(1.5)", pointerEvents: "none" }}
        />
        <video
          autoPlay loop muted playsInline
          className="hidden md:block w-full h-full object-cover"
          style={{
            mixBlendMode: "hard-light",
            position: "absolute", top: 0, left: 0,
            width: "100%", height: "100%",
            filter: "brightness(0.7) contrast(2)",
          }}
        >
          <source src="/videos/hero-background.webm" type="video/webm" />
          <source src="/videos/hero-background.mp4"  type="video/mp4" />
        </video>
      </div>

      {/* Navigation */}
      <div style={{ position: "relative", zIndex: 100 }}>
        <Navigation />
      </div>

      {/* Content */}
      <main id="main" style={{ position: "relative", zIndex: 10 }}>

        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="min-h-[65vh] flex flex-col items-center justify-start px-6 pt-[15vh] pb-16 text-center">

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: appleEase }}
            className="text-xs font-semibold tracking-widest uppercase text-accent mb-6"
          >
            Studien & Marktdaten · Stand März 2026
          </motion.span>

          <BlurText
            text="KI im deutschen Mittelstand"
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight"
            animateBy="words"
            direction="top"
            delay={100}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: appleEase }}
            className="mt-6 text-lg md:text-xl text-foreground/60 max-w-2xl leading-relaxed"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.8)" }}
          >
            Zahlen, Fakten und Trends zur KI-Nutzung in kleinen und mittelständischen Unternehmen — aktuell, belegt und kostenlos zitierbar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.0, ease: appleEase }}
            className="mt-8 flex items-center gap-2 text-xs text-foreground/30 border border-white/[0.08] rounded-full px-5 py-2.5"
          >
            <ExternalLink className="w-3 h-3 shrink-0" />
            Redaktionen dürfen alle Daten frei verwenden — Quellenangabe: mtmstudios.de
          </motion.div>
        </section>

        {/* ── Stat Sections ─────────────────────────────────────── */}
        <StatSection
          icon={<TrendingUp className="w-4 h-4" />}
          title="KI-Adoption im Mittelstand"
          subtitle="Wie weit ist der deutsche Mittelstand beim Einsatz von Künstlicher Intelligenz wirklich?"
          stats={adoptionStats}
        />

        <StatSection
          icon={<Phone className="w-4 h-4" />}
          title="Telefon & Erreichbarkeit"
          subtitle="Was verpasste Anrufe kosten — und was KI-Telefonassistenten daran ändern."
          stats={phoneStats}
        />

        <StatSection
          icon={<MessageSquare className="w-4 h-4" />}
          title="Chatbots & WhatsApp"
          subtitle="Messenger-Kommunikation ist kein Trend mehr — es ist der Standard, den Kunden erwarten."
          stats={chatbotStats}
        />

        <StatSection
          icon={<Zap className="w-4 h-4" />}
          title="ROI & Automatisierung"
          subtitle="Was Automatisierung konkret bringt — in Zeit, Fehlerquoten und Wachstumspotenzial."
          stats={roiStats}
        />

        {/* ── Outro ─────────────────────────────────────────────── */}
        <section ref={outroRef} className="py-24 px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="border-t border-white/[0.06] mb-16" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={outroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: appleEase }}
              className="text-2xl md:text-3xl font-bold text-foreground"
            >
              Über diese Seite
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={outroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: appleEase }}
              className="text-foreground/45 text-base md:text-lg leading-relaxed"
            >
              Diese Statistiken basieren auf öffentlich zugänglichen Studien von Bitkom, McKinsey, Deloitte, Gartner, Statista, Twilio und Zendesk. MTM Studios aktualisiert die Daten regelmäßig. Redaktionen, Blogger und Unternehmen dürfen alle Zahlen frei verwenden — mit Quellenangabe „mtmstudios.de".
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={outroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.25, ease: appleEase }}
              className="text-foreground/25 text-sm"
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
