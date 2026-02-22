import { motion } from "motion/react";

const appleEase = [0.16, 1, 0.3, 1] as const;

/* Gear SVG component */
const Gear = ({ size, cx, cy, delay }: { size: number; cx: number; cy: number; delay: number }) => {
  const teeth = size > 40 ? 10 : size > 30 ? 8 : 6;
  const innerR = size * 0.55;
  const outerR = size * 0.75;
  const toothWidth = (Math.PI * 2) / teeth / 3;

  const path = Array.from({ length: teeth }, (_, i) => {
    const angle = (i / teeth) * Math.PI * 2;
    const x1 = Math.cos(angle - toothWidth) * innerR;
    const y1 = Math.sin(angle - toothWidth) * innerR;
    const x2 = Math.cos(angle - toothWidth * 0.6) * outerR;
    const y2 = Math.sin(angle - toothWidth * 0.6) * outerR;
    const x3 = Math.cos(angle + toothWidth * 0.6) * outerR;
    const y3 = Math.sin(angle + toothWidth * 0.6) * outerR;
    const x4 = Math.cos(angle + toothWidth) * innerR;
    const y4 = Math.sin(angle + toothWidth) * innerR;
    return `L${x1},${y1} L${x2},${y2} L${x3},${y3} L${x4},${y4}`;
  }).join(" ");

  return (
    <motion.g
      style={{ transformOrigin: `${cx}px ${cy}px` }}
      animate={{ rotate: size > 40 ? [0, 360] : [360, 0] }}
      transition={{ duration: size > 40 ? 20 : 15, repeat: Infinity, ease: "linear", delay }}
    >
      <g transform={`translate(${cx}, ${cy})`}>
        <path
          d={`M${Math.cos(-toothWidth) * innerR},${Math.sin(-toothWidth) * innerR} ${path} Z`}
          fill="none"
          stroke="hsl(var(--neon))"
          strokeWidth="1.5"
          opacity="0.4"
        />
        <circle r={size * 0.3} fill="none" stroke="hsl(var(--neon))" strokeWidth="1" opacity="0.3" />
        <circle r="3" fill="hsl(var(--neon))" opacity="0.6" />
      </g>
    </motion.g>
  );
};

/* Animated data dot traveling along a path */
const DataDot = ({ path, duration, delay }: { path: string; duration: number; delay: number }) => (
  <motion.circle
    r="3"
    fill="hsl(var(--neon))"
    filter="url(#glow)"
    initial={{ offsetDistance: "0%" }}
    animate={{ offsetDistance: "100%" }}
    transition={{ duration, repeat: Infinity, ease: "linear", delay }}
  >
    <animateMotion dur={`${duration}s`} repeatCount="indefinite" begin={`${delay}s`}>
      <mpath href={`#${path}`} />
    </animateMotion>
  </motion.circle>
);

const GearFlowVisual = () => (
  <div className="relative w-full max-w-[320px] mx-auto h-[200px]">
    <svg viewBox="0 0 320 200" className="w-full h-full">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <path id="path1" d="M80,100 Q160,60 240,100" fill="none" />
        <path id="path2" d="M80,100 Q160,140 240,100" fill="none" />
      </defs>

      {/* Connection lines */}
      <path d="M80,100 Q160,60 240,100" fill="none" stroke="hsl(var(--neon))" strokeWidth="1" opacity="0.15" />
      <path d="M80,100 Q160,140 240,100" fill="none" stroke="hsl(var(--neon))" strokeWidth="1" opacity="0.15" />

      {/* Data dots */}
      <DataDot path="path1" duration={3} delay={0} />
      <DataDot path="path2" duration={3.5} delay={1} />
      <DataDot path="path1" duration={4} delay={2} />

      {/* Gears */}
      <Gear size={24} cx={80} cy={100} delay={0} />
      <Gear size={34} cx={160} cy={100} delay={0.5} />
      <Gear size={46} cx={240} cy={100} delay={1} />
    </svg>
  </div>
);

const AutomationsHero = () => {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: appleEase }}
          className="mb-12"
        >
          <GearFlowVisual />
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-bold text-foreground leading-tight"
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2, ease: appleEase }}
        >
          Automatisierung, die mit euch wächst.
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground mt-6 leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: appleEase }}
        >
          Vom ersten kleinen Workflow bis zur kompletten Prozesslandschaft.
          <br />
          Euer Partner im Zeitalter der KI.
        </motion.p>
      </div>
    </section>
  );
};

export default AutomationsHero;
