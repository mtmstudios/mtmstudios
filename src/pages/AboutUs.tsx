import Navigation from "@/components/Navigation";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import BlurText from "@/components/BlurText";
import SEOHead from "@/components/SEOHead";
import { motion, useInView } from "motion/react";
import { useEffect, useRef } from "react";

const appleEase = [0.16, 1, 0.3, 1] as const;

const values = [
  {
    title: "Klarheit",
    description: "Wir machen Komplexes einfach — in Technologie, Kommunikation und Zusammenarbeit.",
  },
  {
    title: "Geschwindigkeit",
    description: "Schnelle Ergebnisse ohne Kompromisse bei Qualität. Weil eure Zeit zu wertvoll ist.",
  },
  {
    title: "Partnerschaft",
    description: "Wir sind kein Dienstleister — wir sind Teil eures Teams. Euer Erfolg ist unser Antrieb.",
  },
  {
    title: "Vertrauen",
    description: "Transparenz in jedem Schritt. Ihr wisst immer, was wir tun, warum wir es tun — und was es euch bringt.",
  },
];

const AboutUs = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const reasonsRef = useRef(null);

  const missionInView = useInView(missionRef, { once: true, margin: "-100px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const reasonsInView = useInView(reasonsRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const scrollPosition = window.scrollY;
        const maxScroll = 300;
        const opacity = Math.max(0.3, 1 - (scrollPosition / maxScroll) * 0.7);
        bgRef.current.style.opacity = opacity.toString();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <SEOHead title="Über MTM Studios | KI-Agentur für Unternehmen" description="Wir sind MTM Studios — euer Partner für KI-Lösungen, die wirklich funktionieren. Klarheit, Geschwindigkeit und Vertrauen." />
      {/* Video Background */}
      <div ref={bgRef} className="fixed inset-0 w-screen h-screen overflow-hidden" style={{ isolation: "isolate", zIndex: 0, willChange: "opacity" }}>
        <img src="/videos/hero-background-still.jpg" alt="" className="md:hidden w-full h-full object-cover absolute inset-0" style={{ mixBlendMode: "hard-light", filter: "brightness(0.5) contrast(2)", pointerEvents: "none" }} />
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: appleEase }}
            className="mt-6 text-lg md:text-xl text-foreground/70 max-w-2xl text-center leading-relaxed"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)' }}
          >
            Euer Partner für KI-Lösungen, die wirklich funktionieren.
          </motion.p>
        </section>

        {/* Mission */}
        <section ref={missionRef} className="py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="border-t border-border/10" />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={missionInView ? { opacity: 1, y: 0 } : {}}
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
              initial={{ opacity: 0, y: 20 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: appleEase }}
              className="text-3xl md:text-5xl font-bold text-foreground text-center mb-4"
            >
              Wofür wir stehen
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: appleEase }}
              className="text-muted-foreground text-center mb-20 text-lg"
            >
              Vier Prinzipien, die alles leiten, was wir tun.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.15 * i, ease: appleEase }}
                  className="bg-white/[0.03] backdrop-blur-sm border border-border/10 rounded-2xl p-10 hover:border-accent/30 transition-all duration-500 relative overflow-hidden group cursor-default text-center"
                >
                  <span 
                    className="absolute inset-0 flex items-center justify-center font-bold text-white/[0.10] select-none pointer-events-none group-hover:text-accent/[0.15] transition-colors duration-500 leading-none uppercase tracking-widest px-2"
                    style={{ fontSize: `clamp(2.5rem, ${Math.max(8, 42 / v.title.length)}vw, 8rem)` }}
                  >
                    {v.title}
                  </span>
                  <p className="text-lg text-muted-foreground leading-relaxed relative z-10">{v.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Warum wir — Editorial */}
        <section ref={reasonsRef} className="py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={reasonsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: appleEase }}
              className="text-3xl md:text-5xl font-bold text-foreground text-center mb-20"
            >
              Warum wir
            </motion.h2>

            <div className="space-y-12 text-center">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={reasonsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: appleEase }}
                className="text-xl md:text-2xl text-foreground/90 leading-relaxed"
              >
                Wir arbeiten direkt mit euch —<br />
                persönlich, vor Ort oder remote.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={reasonsInView ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.25, ease: appleEase }}
                className="w-12 h-[2px] bg-accent/40 mx-auto"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={reasonsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: appleEase }}
                className="text-lg md:text-xl text-muted-foreground leading-relaxed"
              >
                Wir zählen keine Features.<br />
                Wir messen, wie viel Zeit<br />
                ihr zurückbekommt.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={reasonsInView ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.45, ease: appleEase }}
                className="w-12 h-[2px] bg-accent/40 mx-auto"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={reasonsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5, ease: appleEase }}
                className="text-xl md:text-2xl text-foreground/90 leading-relaxed"
              >
                Unsere Lösungen wachsen mit euch.<br />
                Weil wir miteinander wachsen wollen.
              </motion.p>
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
