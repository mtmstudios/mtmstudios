import { motion, AnimatePresence, useInView } from "motion/react";
import { useRef, useEffect, useState, useCallback } from "react";

const appleEase = [0.16, 1, 0.3, 1] as const;
const CYCLE = 7000;

const multipliers = ["1x", "10x", "100x"];
const badges = ["+Region", "+Team", "+Prozesse"];

const ScaleUpAnimation = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });
  const [multiplierIdx, setMultiplierIdx] = useState(0);
  const [visibleBadges, setVisibleBadges] = useState(0);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false);

  const reset = useCallback(() => {
    setMultiplierIdx(0);
    setVisibleBadges(0);
    setProgress(0);
    setActive(false);
  }, []);

  useEffect(() => {
    if (!inView) { reset(); return; }

    const timers: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      setActive(true);
      setMultiplierIdx(0);
      setProgress(0);

      // Multiplier steps
      timers.push(setTimeout(() => setMultiplierIdx(1), 1000));
      timers.push(setTimeout(() => setMultiplierIdx(2), 2000));

      // Progress ring
      timers.push(setTimeout(() => setProgress(33), 1000));
      timers.push(setTimeout(() => setProgress(66), 2000));
      timers.push(setTimeout(() => setProgress(100), 3000));

      // Badges
      timers.push(setTimeout(() => setVisibleBadges(1), 1200));
      timers.push(setTimeout(() => setVisibleBadges(2), 2200));
      timers.push(setTimeout(() => setVisibleBadges(3), 3200));

      // Reset and loop
      timers.push(setTimeout(() => {
        reset();
        timers.push(setTimeout(run, 400));
      }, CYCLE));
    };

    timers.push(setTimeout(run, 300));
    return () => timers.forEach(clearTimeout);
  }, [inView, reset]);

  const circumference = 2 * Math.PI * 44;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div ref={ref} className="h-full flex flex-col items-center justify-center gap-3">
      {/* Progress ring with multiplier */}
      <div className="relative w-28 h-28">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {/* Background ring */}
          <circle
            cx="50" cy="50" r="44"
            fill="none"
            stroke="hsl(var(--accent) / 0.08)"
            strokeWidth="3"
          />
          {/* Progress ring */}
          <motion.circle
            cx="50" cy="50" r="44"
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.8, ease: appleEase }}
          />
        </svg>

        {/* Pulse rings */}
        {active && [0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-accent/10"
            initial={{ scale: 1, opacity: 0.3 }}
            animate={{ scale: [1, 1.4 + i * 0.15], opacity: [0.2, 0] }}
            transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, ease: "easeOut" }}
          />
        ))}

        {/* Center number */}
        <div className="absolute inset-0 flex items-center justify-center rotate-0">
          <AnimatePresence mode="wait">
            <motion.span
              key={multiplierIdx}
              className="text-2xl font-bold text-accent tabular-nums"
              initial={{ opacity: 0, scale: 0.7, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.2, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: appleEase }}
            >
              {multipliers[multiplierIdx]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Badges */}
      <div className="flex gap-1.5 h-5">
        {badges.map((badge, i) => (
          <motion.span
            key={badge}
            className="text-[9px] px-2 py-0.5 rounded-full bg-accent/10 text-accent/70 border border-accent/10 font-medium"
            initial={{ opacity: 0, scale: 0.5, y: 5 }}
            animate={i < visibleBadges
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.5, y: 5 }
            }
            transition={{ duration: 0.4, ease: appleEase }}
          >
            {badge}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default ScaleUpAnimation;
