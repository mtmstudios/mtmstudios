import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";

const appleEase = [0.16, 1, 0.3, 1] as const;

const nodes = [
  { x: 160, y: 50 },
  { x: 60, y: 130 },
  { x: 260, y: 130 },
  { x: 100, y: 230 },
  { x: 220, y: 230 },
  { x: 160, y: 300 },
];

const connections = [
  [0, 1], [0, 2], [1, 3], [2, 4], [1, 2],
  [3, 5], [4, 5], [3, 4], [0, 3], [0, 4],
];

const BrainNetworkAnimation = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });
  const [activeNode, setActiveNode] = useState(-1);

  useEffect(() => {
    if (!inView) { setActiveNode(-1); return; }
    let idx = 0;
    const interval = setInterval(() => {
      setActiveNode(idx % nodes.length);
      idx++;
    }, 1200);
    return () => clearInterval(interval);
  }, [inView]);

  const activeConnections = connections.filter(
    ([a, b]) => a === activeNode || b === activeNode
  );

  return (
    <div ref={ref} className="h-full flex items-center justify-center">
      <svg viewBox="0 0 320 350" className="w-full h-full max-w-[280px]" fill="none">
        {/* Connections */}
        {connections.map(([a, b], i) => {
          const isActive = activeConnections.some(
            ([ca, cb]) => (ca === a && cb === b) || (ca === b && cb === a)
          );
          return (
            <motion.line
              key={i}
              x1={nodes[a].x} y1={nodes[a].y}
              x2={nodes[b].x} y2={nodes[b].y}
              stroke={isActive ? "hsl(var(--accent)/0.5)" : "hsl(var(--foreground)/0.08)"}
              strokeWidth={isActive ? 2 : 1}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.05, ease: appleEase }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const isActive = i === activeNode;
          return (
            <g key={i}>
              {isActive && (
                <motion.circle
                  cx={node.x} cy={node.y} r="20"
                  fill="hsl(var(--accent)/0.08)"
                  filter="blur(8px)"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1.5, 0.5] }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
              )}
              <motion.circle
                cx={node.x} cy={node.y} r="8"
                fill={isActive ? "hsl(var(--accent)/0.6)" : "hsl(var(--foreground)/0.12)"}
                stroke={isActive ? "hsl(var(--accent)/0.4)" : "hsl(var(--foreground)/0.06)"}
                strokeWidth="2"
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: appleEase }}
                style={{
                  filter: isActive ? "drop-shadow(0 0 8px hsl(var(--accent)/0.4))" : "none",
                  transition: "filter 0.4s, fill 0.4s",
                }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default BrainNetworkAnimation;
