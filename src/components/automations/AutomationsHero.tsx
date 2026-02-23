import { motion, useInView } from "motion/react";
import { useRef } from "react";
import BlurText from "@/components/BlurText";

const appleEase = [0.16, 1, 0.3, 1] as const;

/* Neural Flow Network Nodes */
const nodes = [
  { x: 160, y: 100, r: 14, isHub: true },  // Central hub
  { x: 60, y: 60, r: 7 },
  { x: 260, y: 55, r: 8 },
  { x: 45, y: 140, r: 6 },
  { x: 275, y: 145, r: 7 },
  { x: 110, y: 170, r: 6 },
  { x: 210, y: 175, r: 7 },
  { x: 160, y: 35, r: 5 },
];

const connections: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
  [1, 3], [1, 7], [2, 4], [2, 7], [3, 5], [4, 6], [5, 6],
];

const NeuralFlowVisual = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="w-full max-w-[320px] sm:max-w-[400px] h-[250px] sm:h-[320px] mx-auto">
      {inView && (
        <motion.svg
          viewBox="0 0 320 200"
          className="w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <defs>
            <filter id="neuralGlow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="hubGlow">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Define paths for data dots */}
            {connections.map(([a, b], i) => (
              <path
                key={`path-${i}`}
                id={`conn-${i}`}
                d={`M${nodes[a].x},${nodes[a].y} L${nodes[b].x},${nodes[b].y}`}
                fill="none"
              />
            ))}
          </defs>

          {/* Connection lines with pathLength animation */}
          {connections.map(([a, b], i) => (
            <motion.line
              key={`line-${i}`}
              x1={nodes[a].x} y1={nodes[a].y}
              x2={nodes[b].x} y2={nodes[b].y}
              stroke="hsl(var(--neon))"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.15 }}
              transition={{ duration: 1.2, delay: 1.2 + i * 0.08, ease: appleEase }}
            />
          ))}

          {/* Traveling data dots */}
          {[0, 2, 4, 6, 9, 12].map((connIdx, i) => {
            const [a, b] = connections[connIdx];
            return (
              <circle key={`dot-${i}`} r="2.5" fill="hsl(var(--neon))" filter="url(#neuralGlow)" opacity="0.8">
                <animateMotion
                  dur={`${2.5 + i * 0.5}s`}
                  repeatCount="indefinite"
                  begin={`${1.5 + i * 0.4}s`}
                >
                  <mpath href={`#conn-${connIdx}`} />
                </animateMotion>
              </circle>
            );
          })}

          {/* Nodes with staggered scale-in */}
          {nodes.map((node, i) => (
            <g key={`node-${i}`}>
              {/* Pulsing ring for hub */}
              {node.isHub && (
                <motion.circle
                  cx={node.x} cy={node.y} r={node.r + 10}
                  fill="none"
                  stroke="hsl(var(--neon))"
                  strokeWidth="1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0, 0.3, 0], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                />
              )}
              {/* Outer glow */}
              <motion.circle
                cx={node.x} cy={node.y} r={node.r + 4}
                fill={`hsl(var(--neon) / ${node.isHub ? '0.08' : '0.04'})`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.9 + i * 0.1, ease: appleEase }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              />
              {/* Core node */}
              <motion.circle
                cx={node.x} cy={node.y} r={node.r}
                fill={node.isHub ? "hsl(var(--neon) / 0.3)" : "hsl(var(--neon) / 0.15)"}
                stroke="hsl(var(--neon))"
                strokeWidth={node.isHub ? "1.5" : "1"}
                filter={node.isHub ? "url(#hubGlow)" : undefined}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.9 + i * 0.1, ease: appleEase }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              />
              {/* Inner bright dot */}
              <motion.circle
                cx={node.x} cy={node.y} r={node.isHub ? 4 : 2}
                fill="hsl(var(--neon))"
                opacity={node.isHub ? 0.8 : 0.5}
                initial={{ opacity: 0 }}
                animate={{ opacity: node.isHub ? 0.8 : 0.5 }}
                transition={{ duration: 0.4, delay: 1.0 + i * 0.1 }}
              />
            </g>
          ))}
        </motion.svg>
      )}
    </div>
  );
};

const AutomationsHero = () => {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-start px-4 sm:px-6 pt-[15vh] pb-16">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
        <BlurText
          text="Automatisierung, die mit euch wächst."
          className="text-3xl sm:text-5xl md:text-7xl font-bold text-foreground"
          delay={100}
        />

        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: appleEase }}
        >
          Vom ersten kleinen Workflow bis zur kompletten Prozesslandschaft.
          <br />
          Euer Partner im Zeitalter der KI.
        </motion.p>

        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: appleEase }}
        >
          <NeuralFlowVisual />
        </motion.div>
      </div>
    </section>
  );
};

export default AutomationsHero;
