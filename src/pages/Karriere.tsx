import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlurText from "@/components/BlurText";
import { motion } from "motion/react";
import {
  Dumbbell, Wifi, Clock, MapPin, BookOpen, Wrench, Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CareerFunnel from "@/components/career/CareerFunnel";

const appleEase = [0.16, 1, 0.3, 1] as const;

const statements = [
  {
    headline: "Du willst mit den neusten KI-Tools arbeiten?",
    subtext: "Wir setzen auf Claude, ChatGPT, N8N und alles, was morgen Standard ist – heute schon.",
  },
  {
    headline: "Du willst KI wirklich verstehen?",
    subtext: "Nicht nur anwenden, sondern durchdringen. Bei uns baust du Lösungen, die Unternehmen transformieren.",
  },
  {
    headline: "Du willst kein Konzern-Hamsterrad?",
    subtext: "Flache Hierarchien, echte Verantwortung, Remote-first. Dein Impact zählt ab Tag eins.",
  },
];

const benefits = [
  { label: "Wellpass", icon: Dumbbell },
  { label: "100% Remote", icon: Wifi },
  { label: "Vertrauensarbeitszeit", icon: Clock },
  { label: "Teamausflüge", icon: MapPin },
  { label: "Weiterbildungsbudget", icon: BookOpen },
  { label: "Neuste Tools & Hardware", icon: Wrench },
  { label: "Flache Hierarchien", icon: Users },
];

const Karriere = () => {
  const [funnelOpen, setFunnelOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-[18vh] pb-[12vh] px-6 flex flex-col items-center text-center">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 0%, hsl(var(--accent) / 0.08) 0%, transparent 70%)",
        }} />

        <div className="relative z-10 max-w-2xl mx-auto">
          <BlurText
            text="Bock auf Zukunft?"
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground mb-6"
            delay={80}
          />
          <motion.p
            className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.4, ease: appleEase }}
          >
            Arbeite mit den neusten KI-Tools und Technologien in einem Team, das Unternehmen in die Zukunft bringt.
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
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.label}
                  className="flex flex-col items-center gap-3 p-6 rounded-2xl transition-transform duration-200 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: "hsl(var(--foreground) / 0.03)",
                    border: "1px solid hsl(var(--border) / 0.1)",
                  }}
                  initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: appleEase }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "hsl(var(--foreground) / 0.04)" }}
                  >
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{b.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-32 px-6 text-center">
        <motion.p
          className="text-2xl md:text-3xl font-semibold text-foreground mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Bereit für was Neues?
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

      <CareerFunnel open={funnelOpen} onOpenChange={setFunnelOpen} />
    </div>
  );
};

export default Karriere;
