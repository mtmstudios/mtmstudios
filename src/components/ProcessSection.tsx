import { motion } from "motion/react";
import { useMobileBlur } from "@/hooks/use-mobile-blur";

const appleEase = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    number: "01",
    title: "Analyse & Strategie",
    description: "Wir verstehen dein Business, identifizieren Potenziale und entwickeln einen klaren Plan.",
  },
  {
    number: "02",
    title: "Entwicklung & Launch",
    description: "Von der Umsetzung bis zum Go-Live – wir bauen und testen deine maßgeschneiderte KI-Lösung.",
  },
  {
    number: "03",
    title: "Langfristige Partnerschaft",
    description: "Keine Einmal-Projekte. Wir optimieren, skalieren und wachsen mit dir – als dein KI-Partner.",
  },
];

const ProcessSection = () => {
  const { blur, noBlur } = useMobileBlur();

  return (
    <section id="prozess" className="py-20 md:py-28 lg:py-32 px-6 bg-muted/20">
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: appleEase }}
              className="group flex flex-col items-center text-center py-8 md:py-12 cursor-default"
            >
              <motion.span
                className={`text-4xl md:text-5xl lg:text-6xl font-bold select-none mb-3 transition-all duration-300 ${
                  index === 2
                    ? 'text-accent/50 group-hover:text-accent/60 group-hover:text-glow'
                    : 'text-accent/50 group-hover:text-accent/60'
                }`}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: appleEase, delay: index * 0.15 }}
              >
                {step.number}
              </motion.span>
              <motion.div
                initial={{ opacity: 0, y: 20, ...blur(6) }}
                whileInView={{ opacity: 1, y: 0, ...noBlur }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 + 0.1, ease: appleEase }}
              >
                <h3 className={`text-lg md:text-xl lg:text-2xl font-bold mb-2 transition-colors duration-300 ${
                  index === 2 ? 'text-foreground group-hover:text-accent' : 'text-foreground'
                }`}>
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

export default ProcessSection;
