import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";

const BAR_COUNT = 7;
const appleEase = [0.16, 1, 0.3, 1] as const;

const WaveformAnimation = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [heights, setHeights] = useState<number[]>(Array(BAR_COUNT).fill(20));

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setHeights(Array.from({ length: BAR_COUNT }, () => 16 + Math.random() * 64));
    }, 800);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <div ref={ref} className="h-full flex items-center justify-center">
      <div className="flex items-end gap-2">
        {heights.map((h, i) => (
          <motion.div
            key={i}
            className="w-2 rounded-full bg-accent/60"
            initial={{ height: 20 }}
            animate={inView ? { height: h } : {}}
            transition={{ duration: 0.6, ease: appleEase, delay: i * 0.05 }}
          />
        ))}
      </div>
    </div>
  );
};

export default WaveformAnimation;
