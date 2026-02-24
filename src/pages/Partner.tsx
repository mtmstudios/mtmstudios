import Navigation from "@/components/Navigation";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import BlurText from "@/components/BlurText";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

const appleEase = [0.16, 1, 0.3, 1] as const;

const painPoints = [
  {
    num: "01",
    title: "KI-Kompetenz aufbauen kostet Zeit und Geld",
    description: "Neue Teams, neue Tools, neue Prozesse — der Aufwand ist enorm, bevor ihr überhaupt die erste Lösung liefern könnt.",
  },
  {
    num: "02",
    title: "Kunden erwarten fertige Lösungen",
    description: "Keine Experimente, keine Prototypen. Eure Kunden wollen Ergebnisse — ab Tag eins.",
  },
  {
    num: "03",
    title: "Chancen gehen verloren",
    description: "Jede Anfrage, die ihr nicht bedienen könnt, ist Umsatz, der woanders landet.",
  },
];

const steps = [
  {
    title: "Ihr bringt den Kunden",
    description: "Wir analysieren gemeinsam den Bedarf und finden die passende Lösung.",
  },
  {
    title: "Wir bauen die Lösung",
    description: "Unter eurem Namen, in eurem Branding — niemand merkt, dass wir im Hintergrund arbeiten.",
  },
  {
    title: "Ihr liefert Ergebnisse",
    description: "Eure Kunden sind begeistert. Ihr wachst. Wir bleiben unsichtbar.",
  },
];

const benefits = [
  {
    title: "Neue Umsatzquelle",
    description: "Erweitert euer Portfolio ohne eigenes Investment in Technologie oder Personal.",
  },
  {
    title: "100% White-Label",
    description: "Euer Branding, unsere Technik. Eure Kunden sehen nur euch.",
  },
  {
    title: "Schnelle Umsetzung",
    description: "Keine Wartezeiten, keine langen Onboardings. Wir starten sofort.",
  },
  {
    title: "Persönlicher Ansprechpartner",
    description: "Ein fester Kontakt, der euer Geschäft versteht — kein anonymes Ticket-System.",
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const problemRef = useRef(null);
  const trustRef = useRef(null);
  const benefitsRef = useRef(null);

  const problemInView = useInView(problemRef, { once: true, margin: "-100px" });
  const trustInView = useInView(trustRef, { once: true, margin: "-100px" });
  const benefitsInView = useInView(benefitsRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const scrollPosition = window.scrollY;
        const maxScroll = 300;
        const opacity = Math.max(0.3, 1 - (scrollPosition / maxScroll) * 0.7);
        videoRef.current.style.opacity = opacity.toString();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Video Background */}
      <div className="fixed inset-0 w-screen h-screen overflow-hidden" style={{ isolation: "isolate", zIndex: 0 }}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-opacity duration-300"
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
            text="Euer Angebot. Unsere Technologie."
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground tracking-tight"
            animateBy="words"
            direction="top"
            delay={120}
          />
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(10px)", scale: 0.98 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: appleEase }}
            className="mt-6 text-lg md:text-xl text-foreground/70 max-w-xl text-center leading-relaxed"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)' }}
          >
            Wir sind der Partner, den eure Kunden nie sehen — aber immer spüren.
          </motion.p>
        </section>

        {/* Problem */}
        <section ref={problemRef} className="py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={problemInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8, ease: appleEase }}
              className="text-3xl md:text-5xl font-bold text-foreground text-center mb-20"
            >
              Nicht jede Agentur kann alles.
            </motion.h2>

            <div className="space-y-0">
              {painPoints.map((p, i) => (
                <motion.div
                  key={p.num}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={problemInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.8, delay: 0.15 * i, ease: appleEase }}
                  className="group cursor-default"
                >
                  <div className="border-t border-border/10" />
                  <motion.div
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.4, ease: appleEase }}
                    className="flex items-start gap-8 md:gap-12 py-12"
                  >
                    <span className="text-5xl md:text-6xl font-bold text-destructive/40 group-hover:text-destructive group-active:text-destructive transition-colors duration-500 select-none shrink-0 leading-none pt-1">
                      {p.num}
                    </span>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-destructive/80 group-active:text-destructive/80 transition-colors duration-500">
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
              Wir übernehmen. Ihr glänzt.
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-center mb-20 text-lg"
              initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
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
                  whileHover={{ y: -4 }}
                  className="group flex flex-col items-center text-center py-8 md:py-12 cursor-default"
                >
                  <motion.span
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent/15 select-none mb-3 transition-colors duration-300 group-hover:text-accent/40"
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: i * 0.15 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.span>
                  <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.15 + 0.1, ease: appleEase }}
                  >
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-2 transition-colors duration-300 group-hover:text-accent">
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

        {/* Vorteile — Fullwidth stacked with accent border */}
        <section ref={benefitsRef} className="py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={benefitsInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8, ease: appleEase }}
              className="text-3xl md:text-5xl font-bold text-foreground text-center mb-20"
            >
              Was ihr davon habt.
            </motion.h2>

            <div className="space-y-0">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, x: -20, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: 0.12 * i, ease: appleEase }}
                  className="group cursor-default"
                >
                  <motion.div
                    className="h-px bg-border/10 origin-center"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.12 * i, ease: appleEase }}
                  />
                  <motion.div
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.4, ease: appleEase }}
                    className="relative py-10 md:py-12 pl-6 md:pl-8 text-center md:text-left"
                  >
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-8 bg-accent/30 group-hover:h-16 group-hover:bg-accent/60 transition-all duration-500 rounded-full" />
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-500">
                      {b.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto md:mx-0">{b.description}</p>
                  </motion.div>
                </motion.div>
              ))}
              <motion.div
                className="h-px bg-border/10 origin-center"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5, ease: appleEase }}
              />
            </div>
          </div>
        </section>

        {/* Trust-Zahlen */}
        <section ref={trustRef} className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={trustInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8, ease: appleEase }}
              className="text-3xl md:text-5xl font-bold text-foreground text-center mb-20"
            >
              In Zahlen.
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trustStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="bg-white/[0.03] backdrop-blur-sm border border-border/10 rounded-2xl p-8 text-center group cursor-default hover:border-accent/30 transition-all duration-500"
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  animate={trustInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.8, delay: i * 0.12, ease: appleEase }}
                  whileHover={{ scale: 1.03, y: -4, rotateX: 2 }}
                  style={{ boxShadow: "0 0 0 transparent", perspective: "800px" }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 40px hsl(174 72% 48% / 0.1)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 0 transparent"; }}
                >
                  <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-accent mb-4 tracking-tight">
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
