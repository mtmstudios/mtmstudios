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
import { ExternalLink } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const appleEase = [0.16, 1, 0.3, 1] as const;

/* ─── Count-Up ──────────────────────────────────────────────────── */
function useCountUp(target: number, inView: boolean, duration = 1.5) {
  const val = useMotionValue(0);
  const rounded = useTransform(val, (v) => Math.round(v));
  useEffect(() => {
    if (!inView) return;
    const c = animate(val, target, { duration, ease: appleEase });
    return c.stop;
  }, [inView, target, duration, val]);
  return rounded;
}

/* ─── Bento Stat Card ───────────────────────────────────────────── */
interface BentoStat {
  value: number;
  displayOverride?: string;
  suffix: string;
  label: string;
  source: string;
  category?: string;
  span?: string;
}

const BentoCard = ({
  value,
  displayOverride,
  suffix,
  label,
  source,
  category,
  span = "",
  index,
  inView,
}: BentoStat & { index: number; inView: boolean }) => {
  const count = useCountUp(value, inView, 1.4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{
        duration: 0.7,
        delay: 0.06 + index * 0.08,
        ease: appleEase,
      }}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md p-8 md:p-10 flex flex-col justify-between items-center text-center min-h-[220px] hover:bg-white/[0.06] hover:border-white/[0.14] transition-all duration-500 ${span}`}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.04),transparent_70%)]" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Category label */}
        {category && (
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent/70 mb-4 block">
            {category}
          </span>
        )}

        <div className="flex items-end gap-1 leading-none mb-4">
          {displayOverride ? (
            <span className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight tabular-nums">
              {displayOverride}
            </span>
          ) : (
            <motion.span className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight tabular-nums">
              {count}
            </motion.span>
          )}
          <span className="text-2xl md:text-3xl font-semibold text-accent/80 mb-1.5 tracking-tight">
            {suffix}
          </span>
        </div>
        <p className="text-sm md:text-base text-foreground/40 leading-relaxed max-w-md">
          {label}
        </p>
      </div>

      <p className="relative z-10 text-[10px] text-foreground/15 mt-6 tracking-wide">
        {source}
      </p>
    </motion.div>
  );
};

/* ─── Section Divider ───────────────────────────────────────────── */
const SectionLabel = ({
  label,
  inView,
  delay = 0,
}: {
  label: string;
  inView: boolean;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay, ease: appleEase }}
    className="mb-8 md:mb-12"
  >
    <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent/70">
      {label}
    </span>
  </motion.div>
);

/* ─── Data ──────────────────────────────────────────────────────── */
const heroStats: BentoStat[] = [
  {
    value: 28,
    suffix: "%",
    label: "der KMU setzen KI bereits produktiv ein — der Rest riskiert, den Anschluss zu verlieren.",
    source: "Bitkom 2026",
    category: "Adoption",
    span: "md:col-span-2",
  },
  {
    value: 60,
    suffix: "Mio.",
    label: "WhatsApp-Nutzer in Deutschland. Der Kanal, den Ihre Kunden bereits täglich nutzen.",
    source: "Statista 2026",
    category: "Reichweite",
  },
  {
    value: 78,
    suffix: "%",
    label: "Kundenzufriedenheit bei korrektem Chatbot-Einsatz — höher als bei klassischem E-Mail-Support.",
    source: "Zendesk 2026",
    category: "Zufriedenheit",
  },
  {
    value: 41,
    suffix: "%",
    label: "der KMU planen KI-Einführung in den nächsten 12 Monaten. Die Welle rollt.",
    source: "Bitkom 2026",
    category: "Planung",
    span: "md:col-span-2",
  },
];

const phoneStats: BentoStat[] = [
  {
    value: 35,
    suffix: "%",
    label: "der Erstanrufe gehen außerhalb der Öffnungszeiten verloren — unwiederbringlich.",
    source: "Bitkom 2026",
    category: "Verlust",
    span: "md:col-span-2",
  },
  {
    value: 60,
    suffix: "%",
    label: "der Kunden rufen nach verpasstem Anruf nicht mehr zurück.",
    source: "Forrester Research 2024",
    category: "Rückrufrate",
  },
  {
    value: 10,
    displayOverride: "< 10",
    suffix: "%",
    label: "der deutschen KMU sind ohne KI rund um die Uhr telefonisch erreichbar.",
    source: "Deloitte 2024",
    category: "Erreichbarkeit",
  },
  {
    value: 70,
    displayOverride: "40–70",
    suffix: "%",
    label: "Kostenvorteil gegenüber klassischem Call-Center-Outsourcing.",
    source: "McKinsey 2026",
    category: "Kostenersparnis",
    span: "md:col-span-2",
  },
];

const chatStats: BentoStat[] = [
  {
    value: 43,
    suffix: "%",
    label: "der Kunden bevorzugen Messenger gegenüber Telefon oder E-Mail.",
    source: "Twilio 2024",
    category: "Präferenz",
  },
  {
    value: 80,
    displayOverride: "60–80",
    suffix: "%",
    label: "aller Anfragen kann ein gut konfigurierter Chatbot vollständig beantworten.",
    source: "Gartner 2024",
    category: "Automatisierung",
    span: "md:col-span-2",
  },
  {
    value: 78,
    suffix: "%",
    label: "Kundenzufriedenheit bei korrektem Chatbot-Einsatz.",
    source: "Zendesk 2026",
    category: "Zufriedenheit",
    span: "md:col-span-2",
  },
  {
    value: 60,
    suffix: "Mio.",
    label: "WhatsApp-Nutzer in Deutschland — der meistgenutzte Messenger.",
    source: "Statista 2026",
    category: "Reichweite",
  },
];

const roiStats: BentoStat[] = [
  {
    value: 9,
    displayOverride: "3–9",
    suffix: "Mon.",
    label: "durchschnittliche Amortisationszeit für KI-Projekte im Mittelstand.",
    source: "McKinsey 2026",
    category: "Amortisation",
  },
  {
    value: 15,
    displayOverride: "8–15",
    suffix: "Std.",
    label: "wöchentliche Zeitersparnis pro Mitarbeiter durch Automatisierung.",
    source: "Deloitte 2024",
    category: "Zeitersparnis",
  },
  {
    value: 0,
    displayOverride: "< 0,5",
    suffix: "%",
    label: "Fehlerquote bei automatisierten Dateneingaben (vs. 4 % manuell).",
    source: "MIT Sloan Management 2024",
    category: "Präzision",
    span: "md:col-span-2",
  },
  {
    value: 50,
    displayOverride: "+25–50",
    suffix: "%",
    label: "Wachstumspotenzial ohne proportionale Personalaufstockung.",
    source: "McKinsey 2026",
    category: "Skalierung",
    span: "md:col-span-3",
  },
];

/* ─── Page ──────────────────────────────────────────────────────── */
const KiStatistiken = () => {
  const isMobile = useIsMobile();
  const bgRef = useRef<HTMLDivElement>(null);

  const heroRef = useRef<HTMLDivElement>(null!);
  const phoneRef = useRef<HTMLDivElement>(null!);
  const chatRef = useRef<HTMLDivElement>(null!);
  const roiRef = useRef<HTMLDivElement>(null!);
  const outroRef = useRef<HTMLElement>(null!);

  const heroInView = useInView(heroRef, { once: true, margin: "-60px" });
  const phoneInView = useInView(phoneRef, { once: true, margin: "-80px" });
  const chatInView = useInView(chatRef, { once: true, margin: "-80px" });
  const roiInView = useInView(roiRef, { once: true, margin: "-80px" });
  const outroInView = useInView(outroRef, { once: true, margin: "-60px" });

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (bgRef.current) {
          const scrollPosition = window.scrollY;
          const maxScroll = 300;
          const opacity = isMobile
            ? Math.max(0.25, 1 - (scrollPosition / maxScroll) * 0.75)
            : Math.max(0.1, 1 - (scrollPosition / maxScroll) * 0.9);
          bgRef.current.style.opacity = opacity.toString();
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  return (
    <div className="relative min-h-screen bg-background">
      <SEOHead
        title="KI im deutschen Mittelstand 2026 — Zahlen & Fakten | MTM Studios"
        description="Aktuelle Statistiken zur KI-Nutzung im deutschen Mittelstand: Adoption, Telefonassistenten, Chatbots, ROI. Kostenlos zitierbar mit Quellenangabe."
      />

      {/* Background */}
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
          style={{
            filter: "brightness(0.7) contrast(1.5)",
            pointerEvents: "none",
          }}
        />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hidden md:block w-full h-full object-cover"
          style={{
            mixBlendMode: "hard-light",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            filter: "brightness(0.7) contrast(2)",
          }}
        >
          <source src="/videos/hero-background.webm" type="video/webm" />
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Nav */}
      <div style={{ position: "relative", zIndex: 100 }}>
        <Navigation />
      </div>

      {/* Content */}
      <main id="main" style={{ position: "relative", zIndex: 10 }}>
        {/* ── Hero ────────────────────────────────────────────────── */}
        <section className="flex flex-col items-center justify-start px-6 pt-[20vh] md:pt-[24vh] pb-24 md:pb-32 text-center max-w-5xl mx-auto">
          <BlurText
            text="KI im deutschen Mittelstand"
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight leading-[0.95]"
            animateBy="words"
            direction="top"
            delay={100}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: appleEase }}
            className="mt-6 md:mt-8 text-base md:text-xl text-foreground/50 max-w-2xl leading-relaxed"
          >
            Marktdaten & Studien · Stand März 2026 — aktuell, belegt und kostenlos zitierbar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.0, ease: appleEase }}
            className="mt-8 inline-flex items-center gap-2 text-[11px] text-foreground/25 border border-white/[0.07] rounded-full px-5 py-2.5"
          >
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            Frei verwendbar mit Quellenangabe: mtmstudios.de
          </motion.div>
        </section>

        {/* ── KI-Adoption Bento ──────────────────────────────────── */}
        <section className="px-4 sm:px-6 pb-28 md:pb-36">
          <div ref={heroRef} className="max-w-6xl mx-auto">
            <SectionLabel label="KI-Adoption" inView={heroInView} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {heroStats.map((s, i) => (
                <BentoCard key={i} {...s} index={i} inView={heroInView} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Telefon & Erreichbarkeit ───────────────────────────── */}
        <section className="px-4 sm:px-6 pb-28 md:pb-36">
          <div ref={phoneRef} className="max-w-6xl mx-auto">
            <SectionLabel
              label="Telefon & Erreichbarkeit"
              inView={phoneInView}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {phoneStats.map((s, i) => (
                <BentoCard key={i} {...s} index={i} inView={phoneInView} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Chatbots & WhatsApp ────────────────────────────────── */}
        <section className="px-4 sm:px-6 pb-28 md:pb-36">
          <div ref={chatRef} className="max-w-6xl mx-auto">
            <SectionLabel label="Chatbots & WhatsApp" inView={chatInView} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {chatStats.map((s, i) => (
                <BentoCard key={i} {...s} index={i} inView={chatInView} />
              ))}
            </div>
          </div>
        </section>

        {/* ── ROI & Automatisierung ──────────────────────────────── */}
        <section className="px-4 sm:px-6 pb-28 md:pb-36">
          <div ref={roiRef} className="max-w-6xl mx-auto">
            <SectionLabel label="ROI & Automatisierung" inView={roiInView} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {roiStats.map((s, i) => (
                <BentoCard key={i} {...s} index={i} inView={roiInView} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Über diese Seite ───────────────────────────────────── */}
        <section ref={outroRef} className="px-6 py-24 md:py-32">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={
                outroInView
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : {}
              }
              transition={{ duration: 0.7, ease: appleEase }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md p-10 md:p-14 text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Über diese Seite
              </h2>
              <p className="text-foreground/40 text-sm md:text-base leading-relaxed mb-6 max-w-xl mx-auto">
                Alle Daten basieren auf öffentlich zugänglichen Studien
                renommierter Institutionen:
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {[
                  "Bitkom",
                  "McKinsey",
                  "Deloitte",
                  "Gartner",
                  "Statista",
                  "Twilio",
                  "Zendesk",
                  "Forrester",
                  "MIT Sloan",
                ].map((s) => (
                  <span
                    key={s}
                    className="text-[11px] text-foreground/30 border border-white/[0.06] rounded-full px-3 py-1"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <p className="text-foreground/35 text-sm leading-relaxed max-w-lg mx-auto">
                Redaktionen und Blogger dürfen die Zahlen frei verwenden — mit
                Quellenangabe „mtmstudios.de".
              </p>
              <p className="text-foreground/15 text-xs mt-8">
                Zuletzt aktualisiert: März 2026 · Nächste Aktualisierung: Q3
                2026
              </p>
            </motion.div>
          </div>
        </section>

        <CTASection />
        <Footer />
      </main>
    </div>
  );
};

export default KiStatistiken;
