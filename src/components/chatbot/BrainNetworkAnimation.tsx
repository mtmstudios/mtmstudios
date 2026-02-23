import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";

const appleEase = [0.16, 1, 0.3, 1] as const;

const nodes = [
  { x: 160, y: 45, label: "Wissen", r: 12 },
  { x: 60, y: 125, label: "Absicht", r: 9 },
  { x: 260, y: 125, label: "Kontext", r: 9 },
  { x: 90, y: 225, label: "Verlauf", r: 9 },
  { x: 230, y: 225, label: "Aktion", r: 9 },
  { x: 160, y: 165, label: "KI", r: 15, central: true },
];

const connections: [number, number][] = [
  [0, 5], [1, 5], [2, 5], [3, 5], [4, 5],
  [0, 1], [0, 2], [1, 3], [2, 4], [3, 4],
];

const BrainNetworkAnimation = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });
  const [activeNode, setActiveNode] = useState(-1);

  useEffect(() => {
    if (!inView) { setActiveNode(-1); return; }
    let idx = 0;
    const outerNodes = [0, 1, 2, 3, 4];
    const interval = setInterval(() => {
      setActiveNode(outerNodes[idx % outerNodes.length]);
      idx++;
    }, 1400);
    return () => clearInterval(interval);
  }, [inView]);

  const activeConnections = connections.filter(
    ([a, b]) => a === activeNode || b === activeNode
  );

  return (
    <div ref={ref} className="h-full flex items-center justify-center">
      <svg viewBox="0 0 320 280" className="w-full h-full max-w-[280px]" fill="none">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connections with animated dashes */}
        {connections.map(([a, b], i) => {
          const isActive = activeConnections.some(
            ([ca, cb]) => (ca === a && cb === b) || (ca === b && cb === a)
          );
          return (
            <motion.line
              key={`line-${i}`}
              x1={nodes[a].x} y1={nodes[a].y}
              x2={nodes[b].x} y2={nodes[b].y}
              stroke={isActive ? "hsl(var(--accent)/0.4)" : "hsl(var(--foreground)/0.06)"}
              strokeWidth={isActive ? 1.5 : 1}
              strokeDasharray={isActive ? "6 4" : "0"}
              initial={{ opacity: 0 }}
              animate={inView ? {
                opacity: 1,
                strokeDashoffset: isActive ? [0, -20] : 0,
              } : {}}
              transition={isActive ? {
                strokeDashoffset: { duration: 1.5, repeat: Infinity, ease: "linear" },
                opacity: { duration: 0.5, delay: i * 0.04 },
              } : {
                duration: 0.5, delay: i * 0.04, ease: appleEase,
              }}
            />
          );
        })}

        {/* Traveling particles on active connections */}
        {inView && activeConnections.map(([a, b], i) => {
          const na = nodes[a], nb = nodes[b];
          return (
            <motion.circle
              key={`particle-${a}-${b}-${activeNode}`}
              r="2.5"
              fill="hsl(var(--accent))"
              filter="url(#glow)"
              initial={{ cx: na.x, cy: na.y, opacity: 0 }}
              animate={{
                cx: [na.x, nb.x],
                cy: [na.y, nb.y],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1.2,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const isActive = i === activeNode;
          const isCentral = node.central;

          return (
            <g key={`node-${i}`}>
              {/* Pulse ring for active node */}
              {isActive && inView && (
                <motion.circle
                  cx={node.x} cy={node.y} r={node.r + 8}
                  fill="none"
                  stroke="hsl(var(--accent)/0.3)"
                  strokeWidth="1.5"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: [0, 0.6, 0], scale: [0.7, 1.3, 1.5] }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                />
              )}

              {/* Central glow */}
              {isCentral && inView && (
                <motion.circle
                  cx={node.x} cy={node.y} r={node.r + 4}
                  fill="hsl(var(--accent)/0.06)"
                  animate={{ r: [node.r + 2, node.r + 8, node.r + 2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              {/* Main node */}
              <motion.circle
                cx={node.x} cy={node.y} r={node.r}
                fill={
                  isCentral
                    ? "hsl(var(--accent)/0.25)"
                    : isActive
                    ? "hsl(var(--accent)/0.5)"
                    : "hsl(var(--foreground)/0.08)"
                }
                stroke={
                  isCentral
                    ? "hsl(var(--accent)/0.5)"
                    : isActive
                    ? "hsl(var(--accent)/0.35)"
                    : "hsl(var(--foreground)/0.05)"
                }
                strokeWidth={isCentral ? 2 : 1.5}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08, ease: appleEase }}
                style={{
                  filter: isActive || isCentral ? "drop-shadow(0 0 8px hsl(var(--accent)/0.3))" : "none",
                  transition: "filter 0.4s, fill 0.4s",
                }}
              />

              {/* Central icon text */}
              {isCentral && inView && (
                <motion.text
                  x={node.x} y={node.y + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-[10px] font-bold"
                  fill="hsl(var(--accent))"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  ⚡
                </motion.text>
              )}

              {/* Label */}
              <motion.text
                x={node.x}
                y={node.y + node.r + 14}
                textAnchor="middle"
                className="text-[9px]"
                fill={isActive ? "hsl(var(--accent)/0.8)" : "hsl(var(--foreground)/0.3)"}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.06 }}
                style={{ transition: "fill 0.4s" }}
              >
                {node.label}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default BrainNetworkAnimation;
