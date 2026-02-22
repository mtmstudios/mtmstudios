import { motion, useInView } from "motion/react";
import { useRef } from "react";

const BlueprintAnimation = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const nodes = [
    { x: 30, y: 30 }, { x: 100, y: 30 }, { x: 170, y: 30 },
    { x: 30, y: 100 }, { x: 100, y: 100 }, { x: 170, y: 100 },
    { x: 30, y: 170 }, { x: 100, y: 170 }, { x: 170, y: 170 },
  ];

  const connections = [
    [0, 1], [1, 2], [3, 4], [4, 5], [6, 7], [7, 8],
    [0, 3], [1, 4], [2, 5], [3, 6], [4, 7], [5, 8],
  ];

  return (
    <div ref={ref} className="h-full flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-full max-w-[200px]">
        {/* Grid lines */}
        {connections.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x} y1={nodes[a].y}
            x2={nodes[b].x} y2={nodes[b].y}
            stroke="hsl(var(--neon))" strokeWidth="1" opacity="0.15"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.g key={i}>
            <motion.circle
              cx={node.x} cy={node.y} r="8"
              fill="hsl(var(--neon))" opacity="0.08"
              stroke="hsl(var(--neon))" strokeWidth="1"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
            />
            <motion.circle
              cx={node.x} cy={node.y} r="2.5"
              fill="hsl(var(--neon))"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: [0.3, 0.8, 0.3] } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
          </motion.g>
        ))}
      </svg>
    </div>
  );
};

export default BlueprintAnimation;
