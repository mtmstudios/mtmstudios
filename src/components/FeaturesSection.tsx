import { Phone, MessageSquare, Zap } from "lucide-react";

const features = [
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
    icon: Zap,
    title: "Automatisierungen",
    description:
      "Wiederkehrende Prozesse automatisieren, Workflows optimieren und wertvolle Zeit sparen – mit maßgeschneiderten KI-Lösungen.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="loesungen" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-neon/10 text-neon border border-neon/20 mb-4">
            Unsere Lösungen
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Was wir für euch tun können
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-xl border border-border/30 bg-white/5 backdrop-blur-md p-8 text-center transition-all duration-300 hover:border-neon/40 hover:shadow-[0_0_30px_hsl(72_100%_60%/0.15)]"
            >
              <div className="mb-5 mx-auto inline-flex items-center justify-center w-12 h-12 rounded-lg bg-neon/10 text-neon transition-colors duration-300 group-hover:bg-neon/20">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
