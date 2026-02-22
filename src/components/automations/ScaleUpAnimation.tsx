import { motion, useInView } from "motion/react";
import { useRef } from "react";

const ScaleUpAnimation = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const steps = [
    { size: 24, x: 40, delay: 0 },
    { size: 36, x: 100, delay: 0.2 },
    { size: 52, x: 170, delay: 0.4 },
  ];

  return (
    <div ref={ref} className="h-full flex items-center justify-center">
      <svg viewBox="0 0 220 120" className="w-full max-w-[220px]">
        {/* Connection arrows */}
        {inView && (
          <>
            <motion.line
              x1="55" y1="60" x2="80" y2="60"
              stroke="hsl(var(--neon))" strokeWidth="1" opacity="0.3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
            <motion.line
              x1="125" y1="60" x2="145" y2="60"
              stroke="hsl(var(--neon))" strokeWidth="1" opacity="0.3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            />
          </>
        )}

        {steps.map((step, i) => (
          <motion.g key={i}>
            <motion.rect
              x={step.x - step.size / 2}
              y={60 - step.size / 2}
              width={step.size}
              height={step.size}
              rx="6"
              fill="hsl(var(--neon))"
              opacity="0.1"
              stroke="hsl(var(--neon))"
              strokeWidth="1.5"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: step.delay }}
            />
            {/* Pulse ring on last */}
            {i === steps.length - 1 && inView && (
              <motion.rect
                x={step.x - step.size / 2 - 4}
                y={60 - step.size / 2 - 4}
                width={step.size + 8}
                height={step.size + 8}
                rx="9"
                fill="none"
                stroke="hsl(var(--neon))"
                strokeWidth="1"
                animate={{ opacity: [0.4, 0, 0.4], scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.g>
        ))}
      </svg>
    </div>
  );
};

export default ScaleUpAnimation;
