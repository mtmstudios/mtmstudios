import { Phone, MessageSquare } from "lucide-react";
import { motion } from "motion/react";
import { type LucideIcon } from "lucide-react";

const N8nIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z" opacity="0" />
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="7" r="2.5" />
    <circle cx="18" cy="17" r="2.5" />
    <line x1="8.5" y1="12" x2="15.5" y2="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <line x1="8.5" y1="12" x2="15.5" y2="17" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);

interface Feature {
  icon?: LucideIcon;
  customIcon?: React.FC;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Phone,
    title: "KI-Telefonassistent",
    description:
      "Unser intelligenter Telefonassistent nimmt Anrufe entgegen, beantwortet Fragen und leitet wichtige Gespräche weiter – rund um die Uhr, ohne Wartezeiten.",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp & Chatbots",
    description:
      "Automatisierte Chatbots für WhatsApp und Web, die Kundenanfragen sofort beantworten und euer Team entlasten.",
  },
  {
    customIcon: N8nIcon,
    title: "Automatisierungen",
    description:
      "Wiederkehrende Prozesse automatisieren, Workflows optimieren und wertvolle Zeit sparen – mit maßgeschneiderten KI-Lösungen.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="loesungen" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-neon/10 text-neon border border-neon/20 mb-4">
            Unsere Lösungen
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Was wir für euch tun können
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative rounded-xl border border-border/30 bg-white/5 backdrop-blur-md p-8 text-center transition-all duration-300 hover:border-neon/40 hover:shadow-[0_0_30px_hsl(174_72%_48%/0.15)] hover:-translate-y-1"
            >
              <div className="mb-5 mx-auto inline-flex items-center justify-center w-12 h-12 rounded-lg bg-neon/10 text-neon transition-all duration-300 group-hover:bg-neon/20 group-hover:scale-110">
                {feature.icon ? (
                  <feature.icon className="w-6 h-6" />
                ) : feature.customIcon ? (
                  <feature.customIcon />
                ) : null}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
