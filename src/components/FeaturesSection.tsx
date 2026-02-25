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
    glowHue: "180, 70%, 55%",
  },
  {
    title: "WhatsApp & Chatbots",
    description:
      "Automatisierte Chatbots, die Kundenanfragen sofort beantworten und euer Team spürbar entlasten.",
    Icon: MessageSquare,
    href: "/ki-chatbot",
    glowHue: "170, 80%, 50%",
  },
  {
    title: "Automatisierungen",
    description:
      "Workflows optimieren und wertvolle Zeit sparen – mit maßgeschneiderten KI-Lösungen für eure Prozesse.",
    Icon: Zap,
    href: "/automatisierungen",
    glowHue: "190, 65%, 50%",
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
                  {/* Primary centered glow */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, hsla(${feature.glowHue}, 0.25) 0%, hsla(${feature.glowHue}, 0.08) 40%, transparent 70%)`,
                    }}
                    animate={{
                      opacity: [0.6, 1, 0.6],
                      scale: [0.95, 1.1, 0.95],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Secondary accent ring */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] rounded-full pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, hsla(${feature.glowHue}, 0.15) 0%, transparent 60%)`,
                    }}
                    animate={{
                      opacity: [0.4, 0.9, 0.4],
                      scale: [1.1, 0.9, 1.1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5,
                    }}
                  />

                  <div className="relative z-10 flex flex-col gap-5">
                    {/* Icon */}
                    <div className="relative w-fit">
                      <div className="absolute inset-0 bg-accent/25 blur-xl rounded-full scale-[2]" />
                      <feature.Icon
                        className="relative text-accent"
                        size={40}
                        strokeWidth={1.5}
                      />
                    </div>

                    <h3 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                      {feature.title}
                    </h3>

                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                      {feature.description}
                    </p>

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
