import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Mail, GitBranch, Layers } from "lucide-react";

const appleEase = [0.16, 1, 0.3, 1] as const;

const tiers = [
  {
    icon: Mail,
    title: "Kleine Helfer",
    items: ["E-Mail-Weiterleitung", "Kalender-Sync", "Benachrichtigungen"],
    highlight: false,
  },
  {
    icon: GitBranch,
    title: "Vernetzte Prozesse",
    items: ["Lead-Erfassung", "Rechnungsstellung", "Kundenkommunikation"],
    highlight: false,
  },
  {
    icon: Layers,
    title: "Komplette Automatisierung",
    items: ["Sales-Pipelines", "Onboarding", "Reporting"],
    highlight: true,
  },
];

const AutomationsSpectrum = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-32 px-4 bg-muted/20" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-foreground text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: appleEase }}
        >
          Von der ersten Automation zur kompletten Transformation.
        </motion.h2>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Connection line (desktop only) */}
          <div className="hidden md:block absolute top-1/2 left-[16.66%] right-[16.66%] -translate-y-1/2 h-[2px] z-0">
            <motion.div
              className="h-full bg-gradient-to-r from-neon/20 via-neon/40 to-neon/60"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, ease: appleEase, delay: 0.5 }}
              style={{ transformOrigin: "left" }}
            />
            {/* Traveling dot */}
            {inView && (
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-neon shadow-[0_0_12px_hsl(var(--neon))]"
                animate={{ left: ["0%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
              />
            )}
          </div>

          {tiers.map((tier, index) => (
            <motion.div
              key={tier.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: appleEase }}
              className={`relative z-10 rounded-2xl p-8 md:p-10 transition-all duration-300 ${
                tier.highlight
                  ? "bg-neon/5 backdrop-blur-md border border-neon/20 shadow-[0_0_40px_hsl(var(--neon)/0.08)]"
                  : "bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.06]"
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                tier.highlight ? "bg-neon/20" : "bg-neon/10"
              }`}>
                <tier.icon className={`w-6 h-6 ${tier.highlight ? "text-neon" : "text-neon/70"}`} />
              </div>
              <h3 className={`text-xl md:text-2xl font-semibold mb-4 ${
                tier.highlight ? "text-neon" : "text-foreground"
              }`}>
                {tier.title}
              </h3>
              <ul className="space-y-2">
                {tier.items.map((item) => (
                  <li key={item} className="text-muted-foreground text-sm flex items-center gap-2">
                    <span className={`w-1 h-1 rounded-full ${tier.highlight ? "bg-neon" : "bg-neon/40"}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AutomationsSpectrum;
