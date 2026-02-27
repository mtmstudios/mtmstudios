import { motion, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";
import { useInView } from "motion/react";
import { Mail, GitBranch, Layers, Check } from "lucide-react";

const appleEase = [0.16, 1, 0.3, 1] as const;

const tiers = [
  {
    icon: Mail,
    title: "Kleine Helfer",
    description: "Einzelne Aufgaben automatisieren — E-Mails, Kalender, Benachrichtigungen.",
    metric: 3,
    metricLabel: "Workflows aktiv",
    suffix: "",
  },
  {
    icon: GitBranch,
    title: "Vernetzte Prozesse",
    description: "Systeme verbinden — Leads, Rechnungen und Kommunikation im Fluss.",
    metric: 12,
    metricLabel: "Systeme verbunden",
    suffix: "",
  },
  {
    icon: Layers,
    title: "Komplette Automatisierung",
    description: "End-to-End — Sales, Onboarding und Reporting laufen von selbst.",
    metric: 100,
    metricLabel: "automatisiert",
    suffix: "%",
  },
];

const CountUp = ({ target, suffix, active }: { target: number; suffix: string; active: boolean }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    let start = 0;
    const duration = 1200;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = target / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.round(start));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [active, target]);

  return (
    <span className="tabular-nums">
      {value}{suffix}
    </span>
  );
};

const AutomationsSpectrum = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" } as any);
  const [activePhase, setActivePhase] = useState(0);

  const resetCycle = useCallback(() => {
    setActivePhase(0);
  }, []);

  useEffect(() => {
    if (!inView) {
      resetCycle();
      return;
    }

    const durations = [3000, 3000, 4000]; // longer pause on phase 3
    let timeout: ReturnType<typeof setTimeout>;

    const advance = (phase: number) => {
      setActivePhase(phase);
      timeout = setTimeout(() => {
        const next = (phase + 1) % 3;
        advance(next);
      }, durations[phase]);
    };

    advance(0);
    return () => clearTimeout(timeout);
  }, [inView, resetCycle]);

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

        {/* Timeline bar — desktop horizontal */}
        <div className="hidden md:block relative mb-16">
          <div className="h-[2px] bg-white/[0.08] rounded-full relative">
            {/* Fill */}
            <div
              className="absolute inset-y-0 left-0 bg-neon/50 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${((activePhase + 1) / 3) * 100}%` }}
            />
            {/* Station dots */}
            {tiers.map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 -translate-y-1/2"
                style={{ left: `${((i + 0.5) / 3) * 100}%` }}
              >
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    i <= activePhase
                      ? "bg-neon shadow-[0_0_12px_hsl(var(--neon)/0.4)]"
                      : "bg-white/[0.12]"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {tiers.map((tier, index) => {
            const isActive = index === activePhase;
            const isPast = index < activePhase;

            return (
              <motion.div
                key={tier.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: appleEase }}
                className={`relative rounded-2xl p-8 md:p-10 text-center transition-all duration-500 cursor-default ${
                  isActive
                    ? "bg-white/[0.05] backdrop-blur-md border border-neon/20 shadow-[0_0_30px_hsl(var(--neon)/0.06)]"
                    : "bg-white/[0.02] backdrop-blur-md border border-white/[0.04] opacity-40"
                }`}
                onClick={() => setActivePhase(index)}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 mx-auto transition-colors duration-500 ${
                    isActive ? "bg-neon/15" : "bg-white/[0.04]"
                  }`}
                >
                  <tier.icon
                    className={`w-6 h-6 transition-colors duration-500 ${
                      isActive ? "text-neon" : "text-muted-foreground"
                    }`}
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
                  {tier.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {tier.description}
                </p>

                {/* Metric badge */}
                <div className="flex justify-center">
                  <AnimatePresence mode="wait">
                    {(isActive || isPast) && (
                      <motion.div
                        key={`badge-${index}-${activePhase}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.4, ease: appleEase }}
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium border transition-colors duration-500 ${
                          isActive
                            ? "border-neon/30 bg-neon/10 text-neon"
                            : "border-white/[0.08] bg-white/[0.04] text-muted-foreground"
                        }`}
                      >
                        {index === 2 && isPast ? (
                          <Check className="w-3 h-3" />
                        ) : null}
                        {index === 2 && isActive ? (
                          <Check className="w-3 h-3" />
                        ) : null}
                        <CountUp target={tier.metric} suffix={tier.suffix} active={isActive} />
                        <span>{tier.metricLabel}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AutomationsSpectrum;
