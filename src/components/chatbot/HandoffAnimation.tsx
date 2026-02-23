import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Bot, User, Check, FileText } from "lucide-react";

const appleEase = [0.16, 1, 0.3, 1] as const;

type Phase = "active" | "detecting" | "handoff" | "done";

const HandoffAnimation = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });
  const [phase, setPhase] = useState<Phase>("active");

  useEffect(() => {
    if (!inView) { setPhase("active"); return; }
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      setPhase("active");
      setTimeout(() => { if (!cancelled) setPhase("detecting"); }, 1800);
      setTimeout(() => { if (!cancelled) setPhase("handoff"); }, 3200);
      setTimeout(() => { if (!cancelled) setPhase("done"); }, 4800);
      setTimeout(() => { if (!cancelled) run(); }, 7000);
    };
    run();
    return () => { cancelled = true; };
  }, [inView]);

  const progress =
    phase === "active" ? 0
    : phase === "detecting" ? 35
    : phase === "handoff" ? 75
    : 100;

  const botLabel =
    phase === "active" ? "Aktiv"
    : phase === "detecting" ? "Analysiert..."
    : "Übergeben";

  const humanLabel =
    phase === "done" ? "Übernommen"
    : phase === "handoff" ? "Bereit"
    : "Wartet";

  return (
    <div ref={ref} className="h-full flex items-center justify-center px-6">
      <div className="relative flex flex-col items-center gap-6 w-full max-w-[280px]">
        {/* Nodes row */}
        <div className="flex items-center justify-between w-full">
          {/* Bot */}
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: appleEase }}
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-500 ${
              phase === "active" || phase === "detecting"
                ? "bg-accent/15 border-accent/30 shadow-[0_0_16px_hsl(var(--accent)/0.2)]"
                : "bg-white/[0.04] border-white/[0.08]"
            }`}>
              <Bot className={`w-6 h-6 transition-colors duration-500 ${
                phase === "active" || phase === "detecting" ? "text-accent" : "text-muted-foreground"
              }`} />
            </div>
            <AnimatePresence mode="wait">
              <motion.span
                key={botLabel}
                className="text-[10px] text-muted-foreground font-mono"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
              >
                {botLabel}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Human */}
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15, ease: appleEase }}
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-500 ${
              phase === "done"
                ? "bg-accent/15 border-accent/30 shadow-[0_0_16px_hsl(var(--accent)/0.2)]"
                : "bg-white/[0.04] border-white/[0.08]"
            }`}>
              {phase === "done" ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Check className="w-6 h-6 text-accent" />
                </motion.div>
              ) : (
                <User className={`w-6 h-6 transition-colors duration-500 ${
                  phase === "handoff" ? "text-accent" : "text-muted-foreground"
                }`} />
              )}
            </div>
            <AnimatePresence mode="wait">
              <motion.span
                key={humanLabel}
                className="text-[10px] text-muted-foreground font-mono"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
              >
                {humanLabel}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="w-full relative">
          <div className="w-full h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-accent/50"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: appleEase }}
              style={{ boxShadow: "0 0 8px hsl(var(--accent) / 0.3)" }}
            />
          </div>
        </div>

        {/* Context card */}
        <AnimatePresence>
          {(phase === "handoff" || phase === "done") && (
            <motion.div
              className="w-full rounded-xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] px-3.5 py-2.5 flex items-center gap-3"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                x: phase === "done" ? 20 : 0,
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: appleEase }}
            >
              <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                <FileText className="w-3.5 h-3.5 text-accent" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-medium text-foreground/80">Kontext-Paket</span>
                <span className="text-[9px] text-muted-foreground">3 Nachrichten · Kundendaten</span>
              </div>
              {phase === "done" && (
                <motion.div
                  className="ml-auto"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <Check className="w-3.5 h-3.5 text-accent" />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HandoffAnimation;
