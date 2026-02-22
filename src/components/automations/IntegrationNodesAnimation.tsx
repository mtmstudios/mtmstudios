import { motion, useInView } from "motion/react";
import { useRef } from "react";

const tools = [
  { label: "CRM", angle: 0 },
  { label: "Mail", angle: 72 },
  { label: "Cal", angle: 144 },
  { label: "ERP", angle: 216 },
  { label: "API", angle: 288 },
];

const IntegrationNodesAnimation = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const radius = 70;

  return (
    <div ref={ref} className="h-full flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-full max-w-[200px]">
        {/* Hub */}
        <motion.circle
          cx="100" cy="100" r="18"
          fill="hsl(var(--neon))" opacity="0.15"
          stroke="hsl(var(--neon))" strokeWidth="1.5"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.5 }}
        />
        <motion.circle
          cx="100" cy="100" r="4"
          fill="hsl(var(--neon))"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        {tools.map((tool, i) => {
          const rad = (tool.angle * Math.PI) / 180;
          const x = 100 + Math.cos(rad) * radius;
          const y = 100 + Math.sin(rad) * radius;
          return (
            <g key={tool.label}>
              <motion.line
                x1="100" y1="100" x2={x} y2={y}
                stroke="hsl(var(--neon))" strokeWidth="1" opacity="0.2"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              />
              <motion.circle
                cx={x} cy={y} r="14"
                fill="hsl(var(--neon))" opacity="0.1"
                stroke="hsl(var(--neon))" strokeWidth="1"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              />
              <motion.text
                x={x} y={y + 1}
                textAnchor="middle" dominantBaseline="middle"
                fill="hsl(var(--neon))" fontSize="7" fontWeight="600"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 0.8 } : {}}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                {tool.label}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default IntegrationNodesAnimation;
