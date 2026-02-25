import { motion } from "motion/react";
import { Phone, MessageSquare, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const appleEase = [0.16, 1, 0.3, 1] as const;

const features = [
  {
    title: "KI-Telefonassistent",
    description:
      "Nimmt Anrufe entgegen, beantwortet Fragen und leitet Gespräche weiter – rund um die Uhr, ohne Wartezeit.",
    Icon: Phone,
    href: "/ki-telefonassistent",
    glowPosition: "top-[-20%] right-[-10%]",
    glowColor: "from-accent/20 via-accent/5 to-transparent",
  },
  {
    title: "WhatsApp & Chatbots",
    description:
      "Automatisierte Chatbots, die Kundenanfragen sofort beantworten und euer Team spürbar entlasten.",
    Icon: MessageSquare,
    href: "/ki-chatbot",
    glowPosition: "top-[-15%] left-[-10%]",
    glowColor: "from-accent/15 via-accent/5 to-transparent",
  },
  {
    title: "Automatisierungen",
    description:
      "Workflows optimieren und wertvolle Zeit sparen – mit maßgeschneiderten KI-Lösungen für eure Prozesse.",
    Icon: Zap,
    href: "/automatisierungen",
    glowPosition: "bottom-[-20%] right-[-5%]",
    glowColor: "from-accent/20 via-accent/5 to-transparent",
  },
];

const FeaturesSection = () => {
  return (
    <section id="loesungen" className="py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-foreground text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: appleEase }}
        >
          Was wir für euch tun können
        </motion.h2>

        <div className="flex flex-col gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: appleEase,
              }}
            >
              <Link to={feature.href} className="block group">
                <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.04] p-10 md:p-14 transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
                  {/* Animated glow */}
                  <motion.div
                    className={`absolute ${feature.glowPosition} w-[60%] h-[60%] rounded-full bg-radial ${feature.glowColor} blur-3xl pointer-events-none`}
                    animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.08, 1] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <div className="relative z-10 flex flex-col gap-5">
                    {/* Icon */}
                    <div className="relative w-fit">
                      <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full scale-150" />
                      <feature.Icon
                        className="relative text-accent"
                        size={40}
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                      {feature.description}
                    </p>

                    {/* Link */}
                    <span className="inline-flex items-center gap-1.5 text-sm text-accent mt-2 group-hover:gap-2.5 transition-all duration-300">
                      Mehr erfahren
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
