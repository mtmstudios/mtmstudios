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

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: appleEase }}
              whileHover={{ x: 8 }}
              className={`group flex items-start gap-6 md:gap-10 py-8 md:py-10 border-t border-border/10 cursor-default ${
                index === steps.length - 1 ? "border-b border-border/10" : ""
              }`}
            >
              <span className="text-5xl md:text-6xl font-bold text-accent/20 select-none transition-colors duration-300 group-hover:text-accent/50 shrink-0 leading-none pt-1">
                {step.number}
              </span>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 transition-colors duration-300 group-hover:text-accent">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
