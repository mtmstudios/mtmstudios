import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlurText from "@/components/BlurText";
import SEOHead from "@/components/SEOHead";
import { motion } from "motion/react";
import {
  Dumbbell, Wifi, Clock, MapPin, BookOpen, Wrench, Users, Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CareerFunnel from "@/components/career/CareerFunnel";

const appleEase = [0.16, 1, 0.3, 1] as const;

const statements = [
  { headline: "Dein Tech-Stack? Immer der neueste.", subtext: "Claude, ChatGPT, N8N – wir probieren alles aus, was spannend ist. Nicht weil's im Budget steht, sondern weil's Spaß macht." },
  { headline: "Hier lernst du mehr als in jedem Masterstudium.", subtext: "Keine PowerPoints, keine Theorie. Du baust echte KI-Lösungen für echte Unternehmen – und verstehst dabei, wie der ganze Laden funktioniert." },
  { headline: "Kein Bullshit. Kein Hamsterrad.", subtext: "Remote, flexible Zeiten, keine Hierarchie-Spielchen. Du machst dein Ding – und wir sorgen dafür, dass niemand dazwischenfunkt." },
];

const benefits = [
  { label: "Wellpass", icon: Dumbbell, sub: "Fitness & Wellness" },
  { label: "100% Remote", icon: Wifi, sub: "Arbeite von überall" },
  { label: "Vertrauensarbeitszeit", icon: Clock, sub: "Keine Stechuhr" },
  { label: "Teamausflüge", icon: MapPin, sub: "Zusammen unterwegs" },
  { label: "Weiterbildungsbudget", icon: BookOpen, sub: "Lerne was du willst" },
  { label: "Neuste Tools & Hardware", icon: Wrench, sub: "Top-Setup ab Tag 1" },
  { label: "Flache Hierarchien", icon: Users, sub: "Deine Meinung zählt" },
  { label: "Startup-Vibes", icon: Rocket, sub: "Klein, schnell, direkt" },
];

const Karriere = () => {
  const [funnelOpen, setFunnelOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const attemptAutoplay = async () => {
      try { await video.play(); } catch {
        video.muted = true;
        try { await video.play(); } catch {}
      }
    };
    attemptAutoplay();
  }, []);

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (bgRef.current) {
          const scrollPosition = window.scrollY;
          const maxScroll = 300;
          const opacity = Math.max(0.3, 1 - (scrollPosition / maxScroll) * 0.7);
          bgRef.current.style.opacity = opacity.toString();
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => { window.removeEventListener("scroll", handleScroll); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <SEOHead title="Karriere bei MTM Studios | Jobs in KI & Automatisierung" description="Arbeite bei MTM Studios an KI-Lösungen, die Unternehmen verändern. Remote-first, neueste Tools, echte Verantwortung." />

      <div ref={bgRef} className="fixed inset-0 w-screen h-screen overflow-hidden" style={{ isolation: "isolate", zIndex: 0 }}>
        <img src="/videos/hero-background-still.jpg" alt="" className="md:hidden w-full h-full object-cover absolute inset-0" style={{ filter: "brightness(0.7) contrast(1.5)", pointerEvents: "none" }} />
        <video ref={videoRef} autoPlay loop muted playsInline
          // @ts-ignore
          webkit-playsinline=""
          preload="auto"
          onLoadedData={(e) => { e.currentTarget.play().catch(() => {}); }}
          className="hidden md:block w-full h-full object-cover" style={{ mixBlendMode: "hard-light", position: "absolute", top: 0, left: 0, width: "100%", height: "100%", filter: "brightness(0.7) contrast(2)", pointerEvents: "none" }}>
          <source src="/videos/hero-background.webm" type="video/webm" />
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
      </div>

      <div style={{ position: "relative", zIndex: 50 }}>
        <Navigation />
      </div>

      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Hero */}
        <section className="relative pt-[18vh] pb-[12vh] px-6 flex flex-col items-center text-center">
          <div className="relative z-10 max-w-2xl mx-auto">
            <BlurText
              text="Bau Dinge, die es noch nicht gibt."
              className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground mb-6"
              delay={80}
            />
            <motion.p
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: appleEase }}
            >
              Kein Legacy-Code, keine Ticket-Schlangen. Bei uns arbeitest du mit den neuesten KI-Tools an Projekten, die Unternehmen wirklich verändern.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease: appleEase }}
            >
              <Button
                onClick={() => setFunnelOpen(true)}
                className="bg-accent text-background hover:bg-accent/90 font-semibold rounded-full px-8 py-6 text-base"
              >
                Jetzt bewerben
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Apple-Style Statement Sections */}
        {statements.map((s, i) => (
          <section key={i} className="py-[18vh] sm:py-[20vh] px-6 flex items-center justify-center">
            <div className="max-w-2xl mx-auto text-center">
              <BlurText
                text={s.headline}
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground"
                delay={60}
                animateBy="words"
                direction="bottom"
              />
              <motion.p
                className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto mt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.3, ease: appleEase }}
              >
                {s.subtext}
              </motion.p>
            </div>
          </section>
        ))}

        {/* Benefits */}
        <section className="py-24 sm:py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Was dich erwartet
            </motion.h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <motion.div
                    key={b.label}
                    className="flex flex-col items-center gap-3 p-8 rounded-2xl transition-all duration-200"
                    style={{
                      backgroundColor: "hsl(var(--foreground) / 0.03)",
                      border: "1px solid hsl(var(--border) / 0.1)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06, ease: appleEase }}
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: "hsl(var(--foreground) / 0.05)" }}
                    >
                      <Icon className="w-7 h-7 text-foreground/60" />
                    </div>
                    <span className="text-base font-medium text-foreground">{b.label}</span>
                    <span className="text-xs text-foreground/40">{b.sub}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-32 px-6 text-center">
          <motion.p
            className="text-2xl md:text-3xl font-semibold text-foreground mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Überzeugt? Dann melde dich.
          </motion.p>
          <motion.p
            className="text-lg text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Kein Anschreiben nötig. Erzähl uns einfach, worauf du Lust hast.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Button
              onClick={() => setFunnelOpen(true)}
              className="bg-accent text-background hover:bg-accent/90 font-semibold rounded-full px-8 py-6 text-base"
            >
              Jetzt bewerben
            </Button>
          </motion.div>
        </section>

        <Footer />
      </div>

      <CareerFunnel open={funnelOpen} onOpenChange={setFunnelOpen} />
    </div>
  );
};

export default Karriere;
