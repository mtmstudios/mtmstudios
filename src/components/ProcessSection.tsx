import { MessageSquare, Lightbulb, Cog, Rocket, Handshake, LucideIcon } from "lucide-react";
import { motion } from "motion/react";

const steps: { number: string; title: string; icon: LucideIcon; description: string }[] = [
  {
    number: "01",
    title: "Erstgespräch & Analyse",
    icon: MessageSquare,
    description: "Wir lernen euer Unternehmen kennen, analysieren Prozesse und identifizieren Potenziale.",
  },
  {
    number: "02",
    title: "Konzept & Strategie",
    icon: Lightbulb,
    description: "Basierend auf der Analyse entwickeln wir eine maßgeschneiderte Strategie und einen klaren Plan.",
  },
  {
    number: "03",
    title: "Umsetzung & Integration",
    icon: Cog,
    description: "Wir entwickeln die Lösung und integrieren sie nahtlos in eure bestehenden Systeme.",
  },
  {
    number: "04",
    title: "Testing & Go-Live",
    icon: Rocket,
    description: "Gründliches Testen, Feinschliff und begleiteter Launch eurer neuen KI-Lösung.",
  },
  {
    number: "05",
    title: "Langfristige Partnerschaft",
    icon: Handshake,
    description: "Kontinuierliche Optimierung, Skalierung und persönlicher Support als euer KI-Partner.",
  },
];

const easing = [0.25, 0.1, 0.25, 1] as const;

const ProcessSection = () => {
  return (
    <section id="prozess" className="py-20 px-4 bg-muted/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easing }}
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-neon/10 text-neon border border-neon/20 mb-4"
          >
            So funktioniert's
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: easing }}
            className="text-3xl md:text-4xl font-bold text-foreground"
          >
            Von der Idee zur Lösung
          </motion.h2>
        </div>

        <div className="flex flex-col gap-6">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            const isRight = index % 2 === 1;
            const xDirection = isRight ? 60 : -60;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: xDirection, ...(isLast ? { scale: 0.97 } : {}) }}
                whileInView={{ opacity: 1, x: 0, ...(isLast ? { scale: 1 } : {}) }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: isLast ? 0.7 : 0.6, delay: index * 0.12, ease: easing }}
                className={`relative max-w-2xl border-l-4 rounded-xl p-8 text-center ${
                  isLast
                    ? "border-neon bg-neon/5 backdrop-blur-md shadow-[0_0_40px_hsl(174_72%_48%/0.1)]"
                    : "border-neon bg-white/5 backdrop-blur-md"
                } ${isRight ? "md:ml-auto" : ""}`}
              >
                <span className={`absolute top-4 right-6 text-6xl font-bold select-none pointer-events-none ${
                  isLast ? "text-neon/20" : "text-neon/10"
                }`}>
                  {step.number}
                </span>
                <div className="relative">
                  <step.icon className={`w-5 h-5 mb-3 mx-auto ${isLast ? "text-neon" : "text-neon/60"}`} />
                  <h3 className={`text-xl font-semibold mb-2 ${isLast ? "text-neon" : "text-foreground"}`}>
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                  {isLast && (
                    <span className="inline-block mt-4 px-3 py-1 rounded-full text-xs font-medium bg-neon/10 text-neon border border-neon/20">
                      Euer langfristiger KI-Partner
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
