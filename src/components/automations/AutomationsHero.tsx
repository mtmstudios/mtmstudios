import { motion, useInView } from "motion/react";
import { useRef } from "react";
import BlurText from "@/components/BlurText";

const appleEase = [0.16, 1, 0.3, 1] as const;

/* Workflow Node Definitions */
const workflowNodes = [
  { id: "trigger", x: 60, y: 120, label: "Trigger", icon: "trigger" },
  { id: "data", x: 195, y: 120, label: "Daten laden", icon: "database" },
  { id: "ai", x: 340, y: 120, label: "KI verarbeiten", icon: "ai", isMain: true },
  { id: "crm", x: 490, y: 120, label: "CRM Update", icon: "webhook" },
  { id: "email", x: 340, y: 240, label: "E-Mail senden", icon: "mail" },
];

const NODE_W = 100;
const NODE_H = 60;

/* Bezier connections between nodes */
const connections = [
  {
    from: 0, to: 1,
    path: "M110,120 C145,120 160,120 195,120",
  },
  {
    from: 1, to: 2,
    path: "M245,120 C280,120 305,120 340,120",
  },
  {
    from: 2, to: 3,
    path: "M390,120 C425,120 455,120 490,120",
  },
  {
    from: 2, to: 4,
    path: "M340,150 C340,175 340,200 340,210",
  },
];

/* Simple SVG icon paths for each node type */
const NodeIcon = ({ type, x, y }: { type: string; x: number; y: number }) => {
  const cx = x + NODE_W / 2;
  const cy = y + 18;
  const s = 9;

  switch (type) {
    case "trigger":
      return (
        <g>
          {/* Lightning bolt */}
          <polygon
            points={`${cx - 2},${cy - s} ${cx - 5},${cy + 1} ${cx + 0},${cy - 1} ${cx + 2},${cy + s} ${cx + 5},${cy - 1} ${cx},${cy + 1}`}
            fill="hsl(var(--neon))"
            opacity="0.9"
          />
        </g>
      );
    case "database":
      return (
        <g>
          <ellipse cx={cx} cy={cy - 4} rx={s - 2} ry={3} fill="none" stroke="hsl(var(--neon))" strokeWidth="1.5" opacity="0.9" />
          <line x1={cx - s + 2} y1={cy - 4} x2={cx - s + 2} y2={cy + 4} stroke="hsl(var(--neon))" strokeWidth="1.5" opacity="0.9" />
          <line x1={cx + s - 2} y1={cy - 4} x2={cx + s - 2} y2={cy + 4} stroke="hsl(var(--neon))" strokeWidth="1.5" opacity="0.9" />
          <ellipse cx={cx} cy={cy + 4} rx={s - 2} ry={3} fill="none" stroke="hsl(var(--neon))" strokeWidth="1.5" opacity="0.9" />
        </g>
      );
    case "ai":
      return (
        <g>
          {/* Brain/sparkle icon */}
          <circle cx={cx} cy={cy} r={s - 2} fill="none" stroke="hsl(var(--neon))" strokeWidth="1.5" opacity="0.9" />
          <circle cx={cx} cy={cy} r={2} fill="hsl(var(--neon))" opacity="0.9" />
          <line x1={cx} y1={cy - s + 2} x2={cx} y2={cy - 3} stroke="hsl(var(--neon))" strokeWidth="1" opacity="0.7" />
          <line x1={cx} y1={cy + 3} x2={cx} y2={cy + s - 2} stroke="hsl(var(--neon))" strokeWidth="1" opacity="0.7" />
          <line x1={cx - s + 2} y1={cy} x2={cx - 3} y2={cy} stroke="hsl(var(--neon))" strokeWidth="1" opacity="0.7" />
          <line x1={cx + 3} y1={cy} x2={cx + s - 2} y2={cy} stroke="hsl(var(--neon))" strokeWidth="1" opacity="0.7" />
        </g>
      );
    case "webhook":
      return (
        <g>
          {/* Upload/sync arrows */}
          <path d={`M${cx - 4},${cy + 3} L${cx},${cy - 5} L${cx + 4},${cy + 3}`} fill="none" stroke="hsl(var(--neon))" strokeWidth="1.5" opacity="0.9" strokeLinecap="round" strokeLinejoin="round" />
          <line x1={cx} y1={cy - 4} x2={cx} y2={cy + 6} stroke="hsl(var(--neon))" strokeWidth="1.5" opacity="0.9" strokeLinecap="round" />
        </g>
      );
    case "mail":
      return (
        <g>
          <rect x={cx - s + 1} y={cy - 4} width={(s - 1) * 2} height={10} rx={1.5} fill="none" stroke="hsl(var(--neon))" strokeWidth="1.5" opacity="0.9" />
          <polyline points={`${cx - s + 1},${cy - 4} ${cx},${cy + 1} ${cx + s - 1},${cy - 4}`} fill="none" stroke="hsl(var(--neon))" strokeWidth="1.2" opacity="0.7" />
        </g>
      );
    default:
      return null;
  }
};

const WorkflowVisual = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="w-full max-w-[620px] h-[300px] sm:h-[380px] mx-auto">
      {inView && (
        <motion.svg
          viewBox="0 0 560 290"
          className="w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <defs>
            <filter id="wfGlow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="wfNodeGlow">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="wfGlass">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
            </filter>
            {/* Arrow marker */}
            <marker id="wfArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 2 L 8 5 L 0 8" fill="none" stroke="hsl(var(--neon))" strokeWidth="1.5" opacity="0.4" />
            </marker>
            {/* Grid pattern */}
            <pattern id="wfGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="hsl(var(--neon))" strokeWidth="0.3" opacity="0.08" />
            </pattern>
            {/* Define connection paths for animateMotion */}
            {connections.map((conn, i) => (
              <path key={`def-${i}`} id={`wfConn-${i}`} d={conn.path} fill="none" />
            ))}
          </defs>

          {/* Grid background */}
          <motion.rect
            x="0" y="0" width="560" height="290"
            fill="url(#wfGrid)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          />

          {/* Connection lines with stroke animation */}
          {connections.map((conn, i) => (
            <motion.path
              key={`line-${i}`}
              d={conn.path}
              fill="none"
              stroke="hsl(var(--neon))"
              strokeWidth="1.5"
              strokeLinecap="round"
              markerEnd="url(#wfArrow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.25 }}
              transition={{ duration: 1, delay: 1.6 + i * 0.15, ease: appleEase }}
            />
          ))}

          {/* Data particles traveling along paths */}
          {[0, 1, 2, 3].map((connIdx, i) => (
            <circle key={`particle-${i}`} r="3" fill="hsl(var(--neon))" filter="url(#wfGlow)" opacity="0.8">
              <animateMotion
                dur={`${2.5 + i * 0.4}s`}
                repeatCount="indefinite"
                begin={`${2.2 + i * 0.3}s`}
              >
                <mpath href={`#wfConn-${connIdx}`} />
              </animateMotion>
            </circle>
          ))}

          {/* Workflow Nodes */}
          {workflowNodes.map((node, i) => {
            const nx = node.x;
            const ny = node.y - NODE_H / 2;
            return (
              <motion.g
                key={node.id}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.9 + i * 0.12, ease: appleEase }}
                style={{ transformOrigin: `${nx + NODE_W / 2}px ${ny + NODE_H / 2}px` }}
              >
                {/* Node glow for main AI node */}
                {node.isMain && (
                  <motion.rect
                    x={nx - 6} y={ny - 6}
                    width={NODE_W + 12} height={NODE_H + 12}
                    rx={16}
                    fill="none"
                    stroke="hsl(var(--neon))"
                    strokeWidth="1"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: [0, 0.3, 0], scale: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
                    style={{ transformOrigin: `${nx + NODE_W / 2}px ${ny + NODE_H / 2}px` }}
                  />
                )}
                {/* Node background */}
                <rect
                  x={nx} y={ny}
                  width={NODE_W} height={NODE_H}
                  rx={12}
                  fill={node.isMain ? "hsl(var(--neon) / 0.08)" : "hsl(0 0% 100% / 0.04)"}
                  stroke="hsl(var(--neon))"
                  strokeWidth={node.isMain ? "1.2" : "0.7"}
                  strokeOpacity={node.isMain ? 0.5 : 0.2}
                />
                {/* Subtle inner highlight */}
                <rect
                  x={nx} y={ny}
                  width={NODE_W} height={NODE_H / 2}
                  rx={12}
                  fill="hsl(0 0% 100% / 0.02)"
                />
                {/* Icon */}
                <NodeIcon type={node.icon} x={nx} y={ny} />
                {/* Label */}
                <text
                  x={nx + NODE_W / 2}
                  y={ny + NODE_H - 10}
                  textAnchor="middle"
                  fill="hsl(var(--foreground))"
                  fontSize="9"
                  fontFamily="system-ui, sans-serif"
                  opacity="0.7"
                >
                  {node.label}
                </text>
              </motion.g>
            );
          })}
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
          <WorkflowVisual />
        </motion.div>
      </div>
    </section>
  );
};

export default AutomationsHero;
