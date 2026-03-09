import Navigation from "@/components/Navigation";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import BlurText from "@/components/BlurText";
import SEOHead from "@/components/SEOHead";
import { motion, useInView } from "motion/react";
import { TrendingUp, EyeOff, Zap, UserCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const appleEase = [0.16, 1, 0.3, 1] as const;

const painPoints = [
  {
    num: "01",
    title: "KI-Kompetenz aufbauen kostet Zeit und Geld",
    description: "Neue Teams, neue Tools, neue Prozesse — der Aufwand ist enorm, bevor du überhaupt die erste Lösung liefern kannst.",
  },
  {
    num: "02",
    title: "Kunden erwarten fertige Lösungen",
    description: "Keine Experimente, keine Prototypen. Deine Kunden wollen Ergebnisse — ab Tag eins.",
  },
  {
    num: "03",
    title: "Chancen gehen verloren",
    description: "Jede Anfrage, die du nicht bedienen kannst, ist Umsatz, der woanders landet.",
  },
];

const steps = [
  {
    title: "Du bringst den Kunden",
    description: "Wir analysieren gemeinsam den Bedarf und finden die passende Lösung.",
  },
  {
    title: "Wir bauen die Lösung",
    description: "Unter deinem Namen, in deinem Branding — niemand merkt, dass wir im Hintergrund arbeiten.",
  },
  {
    title: "Du lieferst Ergebnisse",
    description: "Deine Kunden sind begeistert. Du wächst. Wir bleiben unsichtbar.",
  },
];

const benefits = [
  {
    title: "Neue Umsatzquelle",
    description: "Erweitere dein Portfolio ohne eigenes Investment in Technologie oder Personal.",
    icon: TrendingUp,
  },
  {
    title: "100% White-Label",
    description: "Dein Branding, unsere Technik. Deine Kunden sehen nur dich.",
    icon: EyeOff,
  },
  {
    title: "Schnelle Umsetzung",
    description: "Keine Wartezeiten, keine langen Onboardings. Wir starten sofort.",
    icon: Zap,
  },
  {
    title: "Persönlicher Ansprechpartner",
    description: "Ein fester Kontakt, der dein Geschäft versteht — kein anonymes Ticket-System.",
    icon: UserCheck,
  },
];

const trustStats = [
  { target: 30, suffix: "+", label: "Partner-Projekte" },
  { target: 100, suffix: "%", label: "White-Label" },
  { target: 48, suffix: "h", label: "Reaktionszeit" },
];

const CountUp = ({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{prefix}{value}{suffix}</span>;
};

const Partner = () => {
  const isMobile = useIsMobile();
  const bgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const problemRef = useRef(null);
  const trustRef = useRef(null);
  const benefitsRef = useRef(null);

  const problemInView = useInView(problemRef, { once: true, margin: "-100px" });
  const trustInView = useInView(trustRef, { once: true, margin: "-100px" });
  const benefitsInView = useInView(benefitsRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const scrollPosition = window.scrollY;
        const maxScroll = 300;
        const opacity = isMobile
          ? Math.max(0.25, 1 - (scrollPosition / maxScroll) * 0.75)
          : Math.max(0.1, 1 - (scrollPosition / maxScroll) * 0.9);
        bgRef.current.style.opacity = opacity.toString();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <SEOHead title="Partner werden | White-Label KI-Lösungen | MTM Studios" description="Werde Partner von MTM Studios. White-Label KI-Lösungen für Agenturen und Dienstleister — dein Angebot, unsere Technologie." />
      {/* Video Background */}
      <div ref={bgRef} className="fixed inset-0 w-screen h-screen overflow-hidden" style={{ isolation: "isolate", zIndex: 0 }}>
        <img src="/videos/hero-background-still.jpg" alt="" loading="lazy" className="md:hidden w-full h-full object-cover absolute inset-0" style={{ filter: "brightness(0.7) contrast(1.5)", pointerEvents: "none" }} />
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="hidden md:block w-full h-full object-cover transition-opacity duration-300"
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

      <div style={{ position: "relative", zIndex: 50 }}>
        <Navigation />
      </div>

      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Hero */}
        <section className="min-h-[70vh] flex flex-col items-center pt-[15vh] px-6">
          <BlurText
            text="Dein Angebot. Unsere Technologie."
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground tracking-tight"
            animateBy="words"
            direction="top"
            delay={120}
          />
          <motion.p
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: appleEase }}
            className="mt-6 text-lg md:text-xl text-foreground/70 max-w-xl text-center leading-relaxed"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)' }}
          >
            Wir sind der Partner, den deine Kunden nie sehen — aber immer spüren.
          </motion.p>
        </section>

        {/* Problem */}
        <section ref={problemRef} className="py-20 md:py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={problemInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: appleEase }}
              className="text-3xl md:text-5xl font-bold text-foreground text-center mb-20"
            >
              Nicht jede Agentur kann alles.
            </motion.h2>

            <div className="space-y-0">
              {painPoints.map((p, i) => (
                <motion.div
                  key={p.num}
                  initial={{ opacity: 0, y: 20 }}
                  animate={problemInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.15 * i, ease: appleEase }}
                  className="group cursor-default"
                >
                  <div className="border-t border-border/10" />
                  <motion.div
                    transition={{ duration: 0.4, ease: appleEase }}
                    className="flex flex-col items-center text-center gap-4 py-12"
                  >
                    <span className="text-5xl md:text-6xl font-bold text-destructive/40 md:group-hover:text-destructive transition-colors duration-500 select-none leading-none">
                      {p.num}
                    </span>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 transition-colors duration-500">
                        {p.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed max-w-lg">{p.description}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
              <div className="border-t border-border/10" />
            </div>
          </div>
        </section>

        {/* Lösung — HowItWorks vertical style */}
        <section className="py-20 md:py-28 lg:py-32 px-6 bg-muted/20">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-foreground text-center mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: appleEase }}
            >
              Wir übernehmen. Du glänzt.
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-center mb-20 text-lg"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: appleEase }}
            >
              In drei Schritten zur fertigen KI-Lösung.
            </motion.p>

            <div className="max-w-4xl mx-auto">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: appleEase }}
                  className="group flex flex-col items-center text-center py-8 md:py-12 cursor-default"
                >
                  <motion.span
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent/50 select-none mb-3 transition-colors duration-300 md:group-hover:text-accent/60"
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: appleEase, delay: i * 0.15 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.span>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.15 + 0.1, ease: appleEase }}
                  >
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-2">
                      {s.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
                      {s.description}
                    </p>
                  </motion.div>
                  {i < steps.length - 1 && (
                    <motion.div
                      className="w-full max-w-[120px] mx-auto h-px bg-border/10 mt-8 md:mt-12 origin-center"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.15 + 0.3, ease: appleEase }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vorteile — Bento-Grid mit Glassmorphism-Cards */}
        <section ref={benefitsRef} className="py-20 md:py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: appleEase }}
              className="text-3xl md:text-5xl font-bold text-foreground text-center mb-16"
            >
              Was du davon hast.
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <motion.div
                    key={b.title}
                    className="group cursor-default bg-white/[0.03] backdrop-blur-sm border border-border/10 rounded-2xl p-6 md:p-8 md:hover:border-accent/30 transition-all duration-500"
                    initial={{ opacity: 0, y: 30 }}
                    animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: i * 0.12, ease: appleEase }}
                  >
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 mx-auto md:mx-0"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={benefitsInView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ duration: 0.6, delay: i * 0.12 + 0.2, ease: appleEase }}
                    >
                      <Icon className="w-6 h-6 text-accent" />
                    </motion.div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 transition-colors duration-500 text-center md:text-left">
                      {b.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-center md:text-left">{b.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trust-Zahlen */}
        <section ref={trustRef} className="py-20 md:py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={trustInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: appleEase }}
              className="text-3xl md:text-5xl font-bold text-foreground text-center mb-20"
            >
              In Zahlen.
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trustStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="bg-white/[0.03] backdrop-blur-sm border border-border/10 rounded-2xl p-8 text-center group cursor-default md:hover:border-accent/30 transition-all duration-500"
                  initial={{ opacity: 0, y: 30 }}
                  animate={trustInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.12, ease: appleEase }}
                >
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent mb-4 tracking-tight">
                    {i === 2 ? (
                      <span>&lt; <CountUp target={stat.target} suffix={stat.suffix} /></span>
                    ) : (
                      <CountUp target={stat.target} suffix={stat.suffix} />
                    )}
                  </div>
                  <div className="w-12 h-[1px] bg-border/20 mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground tracking-wide uppercase">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
        <Footer />
      </div>
    </div>
  );
};

export default Partner;
