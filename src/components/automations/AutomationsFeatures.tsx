import { motion } from "motion/react";
import IntegrationNodesAnimation from "./IntegrationNodesAnimation";
import BlueprintAnimation from "./BlueprintAnimation";
import MetricsAnimation from "./MetricsAnimation";
import ScaleUpAnimation from "./ScaleUpAnimation";

const appleEase = [0.16, 1, 0.3, 1] as const;

const features = [
  {
    title: "Nahtlose Integration",
    description: "Alle Tools verbunden — CRM, E-Mail, Kalender und mehr. Ein zentraler Hub für deine Prozesse.",
    Demo: IntegrationNodesAnimation,
  },
  {
    title: "Maßgeschneidert",
    description: "Keine Standard-Lösung, sondern Workflows, die exakt zu deinem Unternehmen passen.",
    Demo: BlueprintAnimation,
  },
  {
    title: "Messbare Ergebnisse",
    description: "Transparente Dashboards zeigen genau, wie viel Zeit und Geld du sparst.",
    Demo: MetricsAnimation,
  },
  {
    title: "Zukunftssicher",
    description: "Skalierbare Architektur, die mit deinem Wachstum Schritt hält.",
    Demo: ScaleUpAnimation,
  },
];

const AutomationsFeatures = () => {
  return (
    <section className="py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-foreground text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: appleEase }}
        >
          Was uns ausmacht
        </motion.h2>

        <div className="flex flex-col gap-32">
          {features.map((feature, index) => {
            const isEven = index % 2 === 1;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: appleEase }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
              >
                <div
                  className={`h-[280px] md:h-[340px] rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-md overflow-hidden relative ${
                    isEven ? "md:order-2" : ""
                  }`}
                >
                  <div className="relative z-10 h-full">
                    <feature.Demo />
                  </div>
                </div>

                <div className={`flex flex-col gap-4 ${isEven ? "md:order-1 md:text-right md:items-end" : "md:items-start"} items-center text-center md:text-left`}>
                  <h3 className="text-3xl md:text-4xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-md">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AutomationsFeatures;
