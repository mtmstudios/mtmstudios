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
    <section className="py-32 px-4 bg-muted/20">
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
                className={`relative rounded-2xl p-8 md:p-10 min-h-[240px] ${
                  isLast
                    ? "bg-neon/5 backdrop-blur-md border border-neon/20"
                    : "bg-white/[0.03] backdrop-blur-md"
                }`}
              >
                <span className="block text-lg font-mono tracking-widest text-neon/40 mb-6 select-none">
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

export default HowItWorks;
