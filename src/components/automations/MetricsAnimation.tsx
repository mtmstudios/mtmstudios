import { motion, AnimatePresence, useInView } from "motion/react";
import { useRef, useEffect, useState, useCallback } from "react";
import { TrendingUp } from "lucide-react";

const appleEase = [0.16, 1, 0.3, 1] as const;
const CYCLE = 7000;

const sparklinePoints = "0,40 15,35 30,38 45,25 60,28 75,15 90,18 105,8 120,12 135,5";

const CountUp = ({ target, suffix, active }: { target: number; suffix: string; active: boolean }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) { setValue(0); return; }
    const duration = 1500;
    const start = performance.now();
    let raf: number;
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);

  return <>{value}{suffix}</>;
};

const MetricsAnimation = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });
  const [phase, setPhase] = useState<"idle" | "counting" | "sparkline" | "trend">("idle");

  const reset = useCallback(() => {
    setPhase("idle");
  }, []);

  useEffect(() => {
    if (!inView) { reset(); return; }

    const timers: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      setPhase("counting");
      timers.push(setTimeout(() => setPhase("sparkline"), 800));
      timers.push(setTimeout(() => setPhase("trend"), 2200));
      timers.push(setTimeout(() => {
        reset();
        timers.push(setTimeout(run, 400));
      }, CYCLE));
    };
    timers.push(setTimeout(run, 300));
    return () => timers.forEach(clearTimeout);
  }, [inView, reset]);

  const isActive = phase !== "idle";

  return (
    <div ref={ref} className="h-full flex flex-col items-center justify-center gap-3 px-5">
      {/* Live dot */}
      <div className="w-full flex justify-end">
        <motion.div
          className="flex items-center gap-1"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            animate={isActive ? { opacity: [1, 0.3, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-[8px] text-emerald-400 font-mono">LIVE</span>
        </motion.div>
      </div>

      {/* KPI numbers */}
      <div className="flex gap-4 w-full">
        <motion.div
          className="flex-1 rounded-lg bg-white/[0.03] border border-white/[0.06] px-3 py-2"
          initial={{ opacity: 0, y: 8 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.5, ease: appleEase }}
        >
          <div className="text-[9px] text-muted-foreground mb-0.5">Gespart</div>
          <div className="text-lg font-bold text-accent tabular-nums">
            <CountUp target={847} suffix="h" active={isActive} />
          </div>
        </motion.div>
        <motion.div
          className="flex-1 rounded-lg bg-white/[0.03] border border-white/[0.06] px-3 py-2"
          initial={{ opacity: 0, y: 8 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.5, delay: 0.1, ease: appleEase }}
        >
          <div className="text-[9px] text-muted-foreground mb-0.5">Schneller</div>
          <div className="text-lg font-bold text-accent tabular-nums">
            <CountUp target={94} suffix="%" active={isActive} />
          </div>
        </motion.div>
      </div>

      {/* Sparkline */}
      <motion.div
        className="w-full h-10"
        initial={{ opacity: 0 }}
        animate={phase === "sparkline" || phase === "trend" ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <svg viewBox="0 0 140 45" className="w-full h-full" preserveAspectRatio="none">
          <motion.polyline
            points={sparklinePoints}
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={phase === "sparkline" || phase === "trend" ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.2, ease: appleEase }}
          />
          <motion.polyline
            points={sparklinePoints}
            fill="none"
            stroke="hsl(var(--accent) / 0.1)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={phase === "sparkline" || phase === "trend" ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.2, ease: appleEase }}
          />
        </svg>
      </motion.div>

      {/* Trend line */}
      <AnimatePresence>
        {phase === "trend" && (
          <motion.div
            className="flex items-center gap-1 text-emerald-400"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: appleEase }}
          >
            <TrendingUp className="w-3 h-3" />
            <span className="text-[10px] font-medium">↑ 23% vs. Vorquartal</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MetricsAnimation;
