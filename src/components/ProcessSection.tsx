import { Search, Rocket, Handshake, LucideIcon } from "lucide-react";
import { motion } from "motion/react";

const appleEase = [0.16, 1, 0.3, 1] as const;

const steps: { number: string; title: string; icon: LucideIcon; description: string }[] = [
  {
    number: "01",
    title: "Analyse & Strategie",
    icon: Search,
    description: "Wir verstehen euer Business, identifizieren Potenziale und entwickeln einen klaren Plan.",
  },
  {
    number: "02",
    title: "Entwicklung & Launch",
    icon: Rocket,
    description: "Von der Umsetzung bis zum Go-Live – wir bauen und testen eure maßgeschneiderte KI-Lösung.",
  },
  {
    number: "03",
    title: "Langfristige Partnerschaft",
    icon: Handshake,
    description: "Keine Einmal-Projekte. Wir optimieren, skalieren und wachsen mit euch – als euer KI-Partner.",
  },
];

const ProcessSection = () => {
  return (
    <section id="prozess" className="py-32 px-4 bg-muted/20">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: appleEase }}
          className="text-4xl md:text-5xl font-bold text-foreground text-center mb-20"
        >
          Von der Idee zur Lösung
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: appleEase }}
                className={`relative rounded-2xl p-8 md:p-10 text-center ${
                  isLast
                    ? "bg-neon/5 backdrop-blur-md border border-neon/20"
                    : "bg-white/[0.03] backdrop-blur-md"
                }`}
              >
                <span className={`block text-5xl md:text-6xl font-bold mb-6 select-none ${
                  isLast ? "text-neon/25" : "text-neon/10"
                }`}>
                  {step.number}
                </span>

                <step.icon className={`w-6 h-6 mx-auto mb-4 ${isLast ? "text-neon" : "text-neon/60"}`} />

                <h3 className={`text-xl md:text-2xl font-semibold mb-3 ${isLast ? "text-neon" : "text-foreground"}`}>
                  {step.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {isLast && (
                  <span className="inline-block mt-6 px-4 py-1.5 rounded-full text-xs font-medium bg-neon/10 text-neon border border-neon/20">
                    Euer langfristiger KI-Partner
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
