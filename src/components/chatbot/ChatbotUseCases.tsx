import { motion } from "motion/react";

const appleEase = [0.16, 1, 0.3, 1] as const;

const useCases = [
  {
    title: "E-Commerce",
    description: "Bestellstatus, Retouren und Produktberatung automatisieren",
  },
  {
    title: "Gesundheitswesen",
    description: "Terminbuchung und Rezeptanfragen per WhatsApp",
  },
  {
    title: "Immobilien",
    description: "Besichtigungstermine und Objektinfos automatisch beantworten",
  },
  {
    title: "Gastronomie",
    description: "Reservierungen und Speisekarten-Anfragen rund um die Uhr",
  },
];

const ChatbotUseCases = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-foreground text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: appleEase }}
        >
          Für jede Branche.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: appleEase }}
              className={`py-6 transition-all duration-300 hover:pl-2 ${
                i < useCases.length - 1 || i < useCases.length - 2
                  ? "border-b border-white/[0.06]"
                  : ""
              }`}
            >
              <h3 className="text-foreground font-semibold text-lg transition-colors duration-300 hover:text-accent">
                {uc.title}
              </h3>
              <p className="text-muted-foreground mt-1">{uc.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChatbotUseCases;
