import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";

const bars = [
  { label: "Q1", height: 40, target: 12 },
  { label: "Q2", height: 65, target: 28 },
  { label: "Q3", height: 85, target: 45 },
  { label: "Q4", height: 110, target: 67 },
];

const CountUp = ({ target, inView }: { target: number; inView: boolean }) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setValue(Math.round((1 - Math.pow(1 - t, 3)) * target));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);
  return <>{value}</>;
};

const MetricsAnimation = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="h-full flex items-end justify-center gap-4 pb-6 px-4">
      {bars.map((bar, i) => (
        <div key={bar.label} className="flex flex-col items-center gap-2">
          <motion.span
            className="text-xs font-mono text-neon"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 + i * 0.15 }}
          >
            <CountUp target={bar.target} inView={inView} />h
          </motion.span>
          <motion.div
            className="w-8 rounded-t-md bg-gradient-to-t from-neon/20 to-neon/50"
            initial={{ height: 0 }}
            animate={inView ? { height: bar.height } : {}}
            transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          />
          <span className="text-[10px] text-muted-foreground">{bar.label}</span>
        </div>
      ))}
    </div>
  );
};

export default MetricsAnimation;
