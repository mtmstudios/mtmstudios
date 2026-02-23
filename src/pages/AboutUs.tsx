import Navigation from "@/components/Navigation";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import BlurText from "@/components/BlurText";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

const appleEase = [0.16, 1, 0.3, 1] as const;

const values = [
  {
    num: "01",
    title: "Klarheit",
    description: "Wir machen Komplexes einfach — in Technologie, Kommunikation und Zusammenarbeit.",
  },
  {
    num: "02",
    title: "Geschwindigkeit",
    description: "Schnelle Ergebnisse ohne Kompromisse bei Qualität. Weil eure Zeit zu wertvoll ist.",
  },
  {
    num: "03",
    title: "Partnerschaft",
    description: "Wir sind kein Dienstleister — wir sind Teil eures Teams. Euer Erfolg ist unser Antrieb.",
  },
  {
    num: "04",
    title: "Vertrauen",
    description: "Transparenz in jedem Schritt. Ihr wisst immer, was wir tun, warum wir es tun — und was es euch bringt.",
  },
];

const reasons = [
  {
    num: "01",
    title: "Persönlich statt anonym",
    description: "Bei uns landet ihr nicht in einer Warteschleife. Ihr arbeitet direkt mit den Leuten, die eure Lösung bauen.",
  },
  {
    num: "02",
    title: "Ergebnisorientiert",
    description: "Wir zählen keine Features — wir messen, wie viel Zeit ihr zurückbekommt.",
  },
  {
    num: "03",
    title: "Langfristig gedacht",
    description: "Unsere Lösungen wachsen mit euch. Kein Vendor Lock-in, keine bösen Überraschungen.",
  },
];

const trustStats = [
  { target: 50, suffix: "+", label: "automatisierte Prozesse" },
  { target: 12, suffix: "h+", label: "eingesparte Zeit pro Woche" },
  { target: 100, suffix: "%", label: "Transparenz" },
];

const CountUp = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
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

  return <span ref={ref}>{value}{suffix}</span>;
};

const AboutUs = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const reasonsRef = useRef(null);
  const trustRef = useRef(null);

  const missionInView = useInView(missionRef, { once: true, margin: "-100px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const reasonsInView = useInView(reasonsRef, { once: true, margin: "-100px" });
  const trustInView = useInView(trustRef, { once: true, margin: "-100px" });

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

      {/* Navbar */}
      <div style={{ position: "relative", zIndex: 50 }}>
        <Navigation />
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Hero */}
        <section className="min-h-[70vh] flex flex-col items-center justify-start px-6 pt-[15vh]">
          <BlurText
            text="Wir sind MTM Studios."
            className="text-5xl md:text-7xl font-bold text-foreground tracking-tight"
            animateBy="words"
            direction="top"
            delay={120}
          />
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.6, ease: appleEase }}
            className="mt-6 text-lg md:text-xl text-foreground/70 max-w-2xl text-center leading-relaxed"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)' }}
          >
            Technologie schafft Möglichkeiten, Vertrauen entscheidet. Wir sorgen dafür, dass KI dir vor allem eines bringt: Zeit für deine Kunden.
          </motion.p>
        </section>

        {/* Mission */}
        <section ref={missionRef} className="py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="border-t border-border/10" />
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={missionInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8, ease: appleEase }}
              className="py-20 space-y-8"
            >
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed text-center">
                Technologie schafft Möglichkeiten, Vertrauen entscheidet. Wir sorgen dafür, dass KI dir vor allem eines bringt: Zeit für deine Kunden.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground/80 leading-relaxed text-center">
                Kein Fachchinesisch, keine leeren Versprechen. Wir bauen Lösungen, die sich gut anfühlen — für euch und für eure Kunden. Auf Augenhöhe, mit Klarheit und echtem Interesse an eurem Erfolg.
              </p>
            </motion.div>
            <div className="border-t border-border/10" />
          </div>
        </section>

        {/* Werte */}
        <section ref={valuesRef} className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={valuesInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8, ease: appleEase }}
              className="text-3xl md:text-5xl font-bold text-foreground text-center mb-20"
            >
              Wofür wir stehen
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((v, i) => (
                <motion.div
                  key={v.num}
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  animate={valuesInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.8, delay: 0.15 * i, ease: appleEase }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="bg-white/[0.03] backdrop-blur-sm border border-border/10 rounded-2xl p-8 hover:border-accent/30 transition-all duration-500 relative overflow-hidden group cursor-default"
                  style={{ boxShadow: "0 0 0 transparent" }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 30px hsl(174 72% 48% / 0.08)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 0 transparent"; }}
                >
                  <span className="absolute -top-4 -right-2 text-[8rem] font-bold text-white/[0.03] select-none pointer-events-none group-hover:text-accent/[0.05] transition-colors duration-500">{v.num}</span>
                  <span className="text-sm font-medium text-accent tracking-widest">{v.num}</span>
                  <h3 className="text-2xl font-bold text-foreground mt-2 mb-3">{v.title}</h3>
                  <p className="text-muted-foreground leading-relaxed relative z-10">{v.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Warum wir */}
        <section ref={reasonsRef} className="py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={reasonsInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8, ease: appleEase }}
              className="text-3xl md:text-5xl font-bold text-foreground text-center mb-20"
            >
              Warum wir
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reasons.map((r, i) => (
                <motion.div
                  key={r.num}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={reasonsInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.8, delay: 0.15 * i, ease: appleEase }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="bg-white/[0.03] backdrop-blur-sm border border-border/10 border-l-2 border-l-accent/40 rounded-2xl p-8 hover:border-accent/30 hover:border-l-accent/60 transition-all duration-500 relative overflow-hidden group cursor-default"
                  style={{ boxShadow: "0 0 0 transparent" }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 30px hsl(174 72% 48% / 0.08)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 0 transparent"; }}
                >
                  <span className="absolute -top-6 -right-2 text-[7rem] font-bold text-white/[0.03] select-none pointer-events-none group-hover:text-accent/[0.05] transition-colors duration-500">{r.num}</span>
                  <span className="text-sm font-medium text-accent tracking-widest">{r.num}</span>
                  <h3 className="text-xl font-bold text-foreground mt-2 mb-3">{r.title}</h3>
                  <p className="text-muted-foreground leading-relaxed relative z-10">{r.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust-Zahlen */}
        <section ref={trustRef} className="py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-8">
              {trustStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={trustInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: appleEase }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                    <CountUp target={stat.target} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA + Footer */}
        <CTASection />
        <Footer />
      </div>
    </div>
  );
};

export default AboutUs;
