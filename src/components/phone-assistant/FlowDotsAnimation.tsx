import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Bot, GitBranch, User, Zap } from "lucide-react";

const appleEase = [0.16, 1, 0.3, 1] as const;

type Phase = "incoming" | "deciding" | "simple" | "complex" | "reset";

const FlowDotsAnimation = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });
  const [phase, setPhase] = useState<Phase>("incoming");
  const [pathChoice, setPathChoice] = useState<"simple" | "complex">("simple");

  useEffect(() => {
    if (!inView) { setPhase("incoming"); return; }
    let cancelled = false;
    let alt = false;

    const run = () => {
      if (cancelled) return;
      const choice = alt ? "complex" : "simple";
      setPathChoice(choice);
      alt = !alt;

      setPhase("incoming");
      setTimeout(() => { if (!cancelled) setPhase("deciding"); }, 1200);
      setTimeout(() => { if (!cancelled) setPhase(choice); }, 2400);
      setTimeout(() => { if (!cancelled) setPhase("reset"); }, 4200);
      setTimeout(() => { if (!cancelled) run(); }, 5000);
    };
    run();
    return () => { cancelled = true; };
  }, [inView]);

  // Layout: KI left, Decision center, Simple top-right, Complex bottom-right
  const nodePositions = {
    ki: { x: 40, y: 120 },
    decision: { x: 150, y: 120 },
    simple: { x: 260, y: 60 },
    complex: { x: 260, y: 180 },
  };

  const isSimple = pathChoice === "simple";

  return (
    <div ref={ref} className="h-full flex items-center justify-center px-4">
      <div className="relative w-full max-w-[300px]">
        <svg viewBox="0 0 300 240" className="w-full" fill="none">
          <defs>
            <filter id="flow-glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Path: KI -> Decision */}
          <motion.line
            x1={nodePositions.ki.x} y1={nodePositions.ki.y}
            x2={nodePositions.decision.x} y2={nodePositions.decision.y}
            stroke={phase === "incoming" || phase === "deciding" ? "hsl(var(--accent)/0.35)" : "hsl(var(--foreground)/0.08)"}
            strokeWidth="2"
            strokeDasharray="6 4"
            animate={phase === "incoming" ? { strokeDashoffset: [0, -20] } : {}}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />

          {/* Path: Decision -> Simple */}
          <motion.line
            x1={nodePositions.decision.x} y1={nodePositions.decision.y}
            x2={nodePositions.simple.x} y2={nodePositions.simple.y}
            stroke={phase === "simple" && isSimple ? "hsl(var(--accent)/0.4)" : "hsl(var(--foreground)/0.06)"}
            strokeWidth="1.5"
            strokeDasharray="5 4"
            animate={phase === "simple" && isSimple ? { strokeDashoffset: [0, -18] } : {}}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          />

          {/* Path: Decision -> Complex */}
          <motion.line
            x1={nodePositions.decision.x} y1={nodePositions.decision.y}
            x2={nodePositions.complex.x} y2={nodePositions.complex.y}
            stroke={phase === "complex" && !isSimple ? "hsl(var(--accent)/0.4)" : "hsl(var(--foreground)/0.06)"}
            strokeWidth="1.5"
            strokeDasharray="5 4"
            animate={phase === "complex" && !isSimple ? { strokeDashoffset: [0, -18] } : {}}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          />

          {/* Path labels */}
          <AnimatePresence>
            {phase === "deciding" && (
              <>
                <motion.text
                  x={210} y={78}
                  className="text-[9px]"
                  fill="hsl(var(--accent)/0.5)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Einfach
                </motion.text>
                <motion.text
                  x={210} y={170}
                  className="text-[9px]"
                  fill="hsl(var(--accent)/0.5)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Komplex
                </motion.text>
              </>
            )}
          </AnimatePresence>

          {/* Traveling particle */}
          {inView && phase === "incoming" && (
            <motion.circle
              r="4"
              fill="hsl(var(--accent))"
              filter="url(#flow-glow)"
              initial={{ cx: nodePositions.ki.x, cy: nodePositions.ki.y, opacity: 0 }}
              animate={{
                cx: nodePositions.decision.x,
                cy: nodePositions.decision.y,
                opacity: [0, 1, 1],
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          )}

          {inView && (phase === "simple" || phase === "complex") && (
            <motion.circle
              key={`particle-${pathChoice}`}
              r="4"
              fill="hsl(var(--accent))"
              filter="url(#flow-glow)"
              initial={{
                cx: nodePositions.decision.x,
                cy: nodePositions.decision.y,
                opacity: 1,
              }}
              animate={{
                cx: isSimple ? nodePositions.simple.x : nodePositions.complex.x,
                cy: isSimple ? nodePositions.simple.y : nodePositions.complex.y,
                opacity: [1, 1, 0],
              }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          )}
        </svg>

        {/* Node overlays */}
        {/* KI Node */}
        <motion.div
          className="absolute w-14 h-14 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center"
          style={{ left: nodePositions.ki.x - 28, top: nodePositions.ki.y - 28 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, ease: appleEase }}
        >
          <Bot className="w-5 h-5 text-accent" />
        </motion.div>
        <span className="absolute text-[9px] text-muted-foreground" style={{ left: nodePositions.ki.x - 6, top: nodePositions.ki.y + 32 }}>
          KI
        </span>

        {/* Decision Node */}
        <motion.div
          className={`absolute w-14 h-14 rounded-xl border flex items-center justify-center transition-all duration-500 ${
            phase === "deciding"
              ? "bg-accent/15 border-accent/35 shadow-[0_0_20px_hsl(var(--accent)/0.25)]"
              : "bg-white/[0.04] border-white/[0.08]"
          }`}
          style={{ left: nodePositions.decision.x - 28, top: nodePositions.decision.y - 28 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1, ease: appleEase }}
        >
          <GitBranch className={`w-5 h-5 transition-colors duration-400 ${
            phase === "deciding" ? "text-accent" : "text-muted-foreground"
          }`} />
          {/* Pulse ring */}
          {phase === "deciding" && (
            <motion.div
              className="absolute inset-0 -m-1.5 rounded-xl border border-accent/25"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.div>
        <span className="absolute text-[9px] text-muted-foreground" style={{ left: nodePositions.decision.x - 20, top: nodePositions.decision.y + 32 }}>
          Entscheidung
        </span>

        {/* Simple (Zap) Node */}
        <motion.div
          className={`absolute w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 ${
            phase === "simple" && isSimple
              ? "bg-accent/15 border-accent/30 shadow-[0_0_14px_hsl(var(--accent)/0.2)]"
              : "bg-white/[0.04] border-white/[0.08]"
          }`}
          style={{ left: nodePositions.simple.x - 24, top: nodePositions.simple.y - 24 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2, ease: appleEase }}
        >
          <Zap className={`w-4 h-4 transition-colors duration-400 ${
            phase === "simple" && isSimple ? "text-accent" : "text-muted-foreground"
          }`} />
        </motion.div>
        <span className="absolute text-[9px] text-muted-foreground" style={{ left: nodePositions.simple.x - 14, top: nodePositions.simple.y + 28 }}>
          Direkt
        </span>

        {/* Complex (User) Node */}
        <motion.div
          className={`absolute w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 ${
            phase === "complex" && !isSimple
              ? "bg-accent/15 border-accent/30 shadow-[0_0_14px_hsl(var(--accent)/0.2)]"
              : "bg-white/[0.04] border-white/[0.08]"
          }`}
          style={{ left: nodePositions.complex.x - 24, top: nodePositions.complex.y - 24 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3, ease: appleEase }}
        >
          <User className={`w-4 h-4 transition-colors duration-400 ${
            phase === "complex" && !isSimple ? "text-accent" : "text-muted-foreground"
          }`} />
        </motion.div>
        <span className="absolute text-[9px] text-muted-foreground" style={{ left: nodePositions.complex.x - 12, top: nodePositions.complex.y + 28 }}>
          Mensch
        </span>
      </div>
    </div>
  );
};

export default FlowDotsAnimation;
