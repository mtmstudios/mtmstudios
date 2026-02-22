import { motion } from "motion/react";

const appleEase = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    number: "01",
    title: "Analyse & Strategie",
    description: "Wir verstehen euer Business, identifizieren Potenziale und entwickeln einen klaren Plan.",
  },
  {
    number: "02",
    title: "Entwicklung & Launch",
    description: "Von der Umsetzung bis zum Go-Live – wir bauen und testen eure maßgeschneiderte KI-Lösung.",
  },
  {
    number: "03",
    title: "Langfristige Partnerschaft",
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
                className={`group relative rounded-2xl p-8 md:p-10 min-h-[240px] transition-all duration-300 hover:translate-y-[-2px] hover:bg-white/[0.06] ${
                  isLast
                    ? "bg-neon/5 backdrop-blur-md border border-neon/20"
                    : "bg-white/[0.03] backdrop-blur-md"
                }`}
              >
                <span className="block text-lg font-mono tracking-widest text-neon/40 mb-6 select-none transition-colors duration-300 group-hover:text-neon/60">
                  {step.number}
                </span>

                <h3 className={`text-xl md:text-2xl font-semibold mb-3 ${isLast ? "text-neon" : "text-foreground"}`}>
                  {step.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
