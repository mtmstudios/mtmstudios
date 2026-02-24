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
      <section className="relative pt-32 pb-20 px-6 flex flex-col items-center text-center">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 0%, hsl(var(--accent) / 0.08) 0%, transparent 70%)",
        }} />

        <div className="relative z-10 max-w-2xl mx-auto">
          <BlurText
            text="Bock auf Zukunft?"
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6"
            delay={80}
          />
          <motion.p
            className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.4, ease: appleEase }}
          >
            Arbeite mit den neusten KI-Tools und Technologien in einem Team, das Unternehmen in die Zukunft bringt. Kein Konzern, keine starren Strukturen – dafür echte Innovation, jeden Tag.
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

      {/* Benefits */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            className="text-2xl font-bold text-foreground mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Was dich erwartet
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-3">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.label}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium text-foreground"
                  style={{
                    backgroundColor: "hsl(var(--foreground) / 0.03)",
                    borderColor: "hsl(var(--border) / 0.1)",
                  }}
                  initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: appleEase }}
                >
                  <Icon className="w-4 h-4 text-accent" />
                  {b.label}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6 text-center">
        <motion.p
          className="text-lg text-muted-foreground mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Klingt gut? Dann lass uns reden.
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
