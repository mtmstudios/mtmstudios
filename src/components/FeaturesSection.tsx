import { motion, useInView } from "motion/react";
import { Phone, MessageSquare, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";

const appleEase = [0.16, 1, 0.3, 1] as const;

const features = [
  {
    title: "KI-Telefonassistent",
    description:
      "Nimmt Anrufe entgegen, beantwortet Fragen und leitet Gespräche weiter – rund um die Uhr, ohne Wartezeit.",
    Icon: Phone,
    href: "/ki-telefonassistent",
    glowHue: "174, 72%, 56%",
  },
  {
    title: "WhatsApp & Chatbots",
    description:
      "Automatisierte Chatbots, die Kundenanfragen sofort beantworten und euer Team spürbar entlasten.",
    Icon: MessageSquare,
    href: "/ki-chatbot",
    glowHue: "168, 80%, 50%",
  },
  {
    title: "Automatisierungen",
    description:
      "Workflows optimieren und wertvolle Zeit sparen – mit maßgeschneiderten KI-Lösungen für eure Prozesse.",
    Icon: Zap,
    href: "/automatisierungen",
    glowHue: "186, 65%, 50%",
  },
];

const FeatureCard = ({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
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
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 60% 50% at 50% 50%, hsla(${feature.glowHue}, 0.3) 0%, hsla(${feature.glowHue}, 0.1) 40%, transparent 70%)`,
              }}
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Secondary breathing ring */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 35% 35% at 50% 50%, hsla(${feature.glowHue}, 0.2) 0%, transparent 60%)`,
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
            />

            <div className="relative z-10 flex flex-col items-center text-center gap-5">
              {/* Icon */}
              <div className="relative w-fit">
                <div
                  className="absolute inset-0 blur-xl rounded-full scale-[2.5]"
                  style={{
                    backgroundColor: `hsla(${feature.glowHue}, 0.3)`,
                  }}
                />
                <feature.Icon
                  className="relative text-accent"
                  size={44}
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
    </div>
  );
};

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
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
