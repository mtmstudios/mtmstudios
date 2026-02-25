import { motion } from "motion/react";
import { Link } from "react-router-dom";

const appleEase = [0.16, 1, 0.3, 1] as const;

const features = [
  {
    title: "KI-Telefonassistent",
    description:
      "Nimmt Anrufe entgegen, beantwortet Fragen und leitet Gespräche weiter – rund um die Uhr, ohne Wartezeit.",
    href: "/ki-telefonassistent",
  },
  {
    title: "WhatsApp & Chatbots",
    description:
      "Automatisierte Chatbots, die Kundenanfragen sofort beantworten und euer Team spürbar entlasten.",
    href: "/ki-chatbot",
  },
  {
    title: "Automatisierungen",
    description:
      "Workflows optimieren und wertvolle Zeit sparen – mit maßgeschneiderten KI-Lösungen für eure Prozesse.",
    href: "/automatisierungen",
  },
];

const FeaturesSection = () => {
  return (
    <section id="loesungen" className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-foreground text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: appleEase }}
        >
          Was wir für euch tun können
        </motion.h2>

        <div className="flex flex-col">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: appleEase,
              }}
            >
              <Link to={feature.href} className="group block py-12 md:py-16">
                <div className="text-center space-y-5 transition-transform duration-500 group-hover:scale-[1.02]">
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto transition-colors duration-500 group-hover:text-foreground/80">
                    {feature.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm text-accent mt-2 group-hover:gap-2.5 transition-all duration-300">
                    Mehr erfahren
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
              {index < features.length - 1 && (
                <div className="w-full max-w-[160px] mx-auto h-px bg-border/10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
