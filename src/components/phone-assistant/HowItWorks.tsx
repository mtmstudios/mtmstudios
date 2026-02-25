import { motion } from "motion/react";

const appleEase = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    number: "01",
    title: "Anruf kommt rein",
    description: "Euer KI-Assistent nimmt ab — sofort, ohne Wartezeit, 24/7.",
  },
  {
    number: "02",
    title: "KI versteht und handelt",
    description: "Beantwortet Fragen, vereinbart Termine und leitet bei Bedarf an euer Team weiter.",
  },
  {
    number: "03",
    title: "Alles im CRM",
    description: "Zusammenfassung, Transkript und gebuchte Termine — automatisch in eurem System.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 md:py-28 lg:py-32 px-6 bg-muted/20">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-foreground text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: appleEase }}
        >
          So funktioniert's
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: appleEase }}
              className="group flex flex-col items-center text-center py-8 md:py-12 cursor-default"
            >
              <motion.span
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent/15 select-none mb-3 transition-colors duration-300 group-hover:text-accent/40"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: index * 0.15 }}
              >
                {step.number}
              </motion.span>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 + 0.1, ease: appleEase }}
              >
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
                  {step.description}
                </p>
              </motion.div>
              {index < steps.length - 1 && (
                <div className="w-full max-w-[120px] mx-auto h-px bg-border/10 mt-8 md:mt-12" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
