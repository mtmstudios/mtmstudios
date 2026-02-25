import { motion } from "motion/react";
import WaveformAnimation from "./WaveformAnimation";
import FlowDotsAnimation from "./FlowDotsAnimation";
import CalendarAnimation from "./CalendarAnimation";
import TypewriterAnimation from "./TypewriterAnimation";

const appleEase = [0.16, 1, 0.3, 1] as const;

const features = [
  {
    title: "Natürliche Gespräche",
    description:
      "Der Assistent spricht wie ein Mensch — nicht wie ein Roboter. Natürliche Sprache, anpassbarer Tonfall, mehrsprachig.",
    Demo: WaveformAnimation,
  },
  {
    title: "Intelligente Weiterleitung",
    description:
      "Erkennt, wann ein Mensch übernehmen muss, und leitet nahtlos an die richtige Person weiter.",
    Demo: FlowDotsAnimation,
  },
  {
    title: "Terminbuchung",
    description:
      "Bucht Termine direkt während des Anrufs — synchronisiert mit eurem Kalender.",
    Demo: CalendarAnimation,
  },
  {
    title: "Echtzeit-Zusammenfassung",
    description:
      "Nach jedem Anruf: automatische Zusammenfassung, Transkript und Action Items.",
    Demo: TypewriterAnimation,
  },
];

const PhoneFeatures = () => {
  return (
    <section className="py-32 px-4">
      <div className="max-w-5xl mx-auto flex flex-col gap-32">
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
              {/* Demo area */}
              <div
                className={`h-[280px] md:h-[340px] rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-md overflow-hidden ${
                  isEven ? "md:order-2" : ""
                }`}
              >
                <feature.Demo />
              </div>

              {/* Text area */}
              <div
                className={`flex flex-col gap-4 ${
                  isEven ? "md:order-1 md:text-right md:items-end" : "md:items-start"
                } items-center text-center md:text-left`}
              >
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
    </section>
  );
};

export default PhoneFeatures;
