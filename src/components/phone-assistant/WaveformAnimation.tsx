import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";

const BAR_COUNT = 9;
const appleEase = [0.16, 1, 0.3, 1] as const;

const getWaveHeights = () =>
  Array.from({ length: BAR_COUNT }, (_, i) => {
    const center = (BAR_COUNT - 1) / 2;
    const dist = Math.abs(i - center) / center;
    const base = 24 + Math.random() * 80;
    return base * (1 - dist * 0.4);
  });

const WaveformAnimation = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });
  const [heights, setHeights] = useState<number[]>(Array(BAR_COUNT).fill(20));

  useEffect(() => {
    if (!inView) {
      setHeights(Array(BAR_COUNT).fill(20));
      return;
    }
    // Immediately start with a wave
    setHeights(getWaveHeights());
    const interval = setInterval(() => {
      setHeights(getWaveHeights());
    }, 1200);
    return () => clearInterval(interval);
  }, [inView]);

  const center = Math.floor(BAR_COUNT / 2);

  return (
    <div ref={ref} className="h-full flex items-center justify-center">
      <div className="flex items-end gap-[6px]">
        {heights.map((h, i) => {
          const isCenter = i === center;
          return (
            <motion.div
              key={i}
              className={`w-3 rounded-full ${isCenter ? "bg-accent/80" : "bg-accent/50"}`}
              style={isCenter ? { boxShadow: "0 0 12px hsl(var(--accent) / 0.3)" } : undefined}
              animate={{ height: h }}
              transition={{ duration: 0.9, ease: appleEase, delay: i * 0.05 }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WaveformAnimation;
