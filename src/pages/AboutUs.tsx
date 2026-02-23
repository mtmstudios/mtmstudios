import Navigation from "@/components/Navigation";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import BlurText from "@/components/BlurText";
import { motion, useInView } from "motion/react";
import { useEffect, useRef } from "react";

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
];

const team = [
  { name: "Max Mustermann", role: "Gründer & CEO" },
  { name: "Tom Technik", role: "Co-Founder & CTO" },
  { name: "Marie Marketing", role: "Co-Founder & CMO" },
];

const AboutUs = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);

  const missionInView = useInView(missionRef, { once: true, margin: "-100px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const teamInView = useInView(teamRef, { once: true, margin: "-100px" });

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
        <section className="min-h-[70vh] flex flex-col items-center justify-center px-6">
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
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl text-center leading-relaxed"
          >
            Wir bauen intelligente Automatisierung, die Unternehmen Zeit zurückgibt — für das, was wirklich zählt.
          </motion.p>
        </section>

        {/* Mission */}
        <section ref={missionRef} className="py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="border-t border-border/10" />
            <motion.p
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={missionInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8, ease: appleEase }}
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed text-center py-20"
            >
              Wir glauben, dass Technologie unsichtbar sein sollte — sie soll im Hintergrund arbeiten, damit Menschen im Vordergrund glänzen können. Deshalb entwickeln wir KI-Lösungen, die sich anfühlen, als wären sie schon immer da gewesen.
            </motion.p>
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

            <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-border/10">
              {values.map((v, i) => (
                <motion.div
                  key={v.num}
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  animate={valuesInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.8, delay: 0.15 * i, ease: appleEase }}
                  className="px-8 py-8 md:py-0 text-center md:text-left"
                >
                  <span className="text-sm font-medium text-accent tracking-widest">{v.num}</span>
                  <h3 className="text-2xl font-bold text-foreground mt-2 mb-3">{v.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{v.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section ref={teamRef} className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={teamInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8, ease: appleEase }}
              className="text-3xl md:text-5xl font-bold text-foreground mb-20"
            >
              Die Köpfe dahinter
            </motion.h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-16">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={teamInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.8, delay: 0.15 * i, ease: appleEase }}
                  className="flex flex-col items-center"
                >
                  <div className="w-28 h-28 rounded-full bg-accent/10 mb-5" />
                  <span className="text-foreground font-semibold">{member.name}</span>
                  <span className="text-sm text-muted-foreground mt-1">{member.role}</span>
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
