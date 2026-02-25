import { motion } from "motion/react";
import MessageBurstAnimation from "./MessageBurstAnimation";
import BrainNetworkAnimation from "./BrainNetworkAnimation";
import HandoffAnimation from "./HandoffAnimation";
import ChannelIconsAnimation from "./ChannelIconsAnimation";

const appleEase = [0.16, 1, 0.3, 1] as const;

const features = [
  {
    title: "Sofortige Antworten",
    description:
      "Kein Warten, keine Warteschlange. Der Bot antwortet in Sekunden — rund um die Uhr, auf jeder Plattform.",
    Demo: MessageBurstAnimation,
  },
  {
    title: "Kontextverständnis",
    description:
      "Der Bot versteht den Kontext — erkennt Absichten, merkt sich den Gesprächsverlauf und gibt relevante Antworten.",
    Demo: BrainNetworkAnimation,
  },
  {
    title: "Nahtlose Übergabe",
    description:
      "Wenn der Bot nicht weiterweiss, übergibt er an einen echten Menschen — mit dem kompletten Kontext.",
    Demo: HandoffAnimation,
  },
  {
    title: "Multi-Channel",
    description:
      "Ein Bot, alle Kanäle. WhatsApp, Website-Chat, Instagram, Facebook Messenger — alles zentral gesteuert.",
    Demo: ChannelIconsAnimation,
  },
];

const ChatbotFeatures = () => {
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

export default ChatbotFeatures;
