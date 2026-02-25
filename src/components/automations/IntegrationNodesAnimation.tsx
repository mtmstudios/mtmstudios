import { motion, AnimatePresence, useInView } from "motion/react";
import { useRef, useEffect, useState, useCallback } from "react";
import { Database, Mail, Calendar, Check } from "lucide-react";

const appleEase = [0.16, 1, 0.3, 1] as const;
const CYCLE = 6000;

const tools = [
  { icon: Database, label: "CRM" },
  { icon: Mail, label: "Mail" },
  { icon: Calendar, label: "Kalender" },
];

type Phase = "idle" | "syncing" | "done";

const IntegrationNodesAnimation = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });
  const [phase, setPhase] = useState<Phase>("idle");
  const [activeSync, setActiveSync] = useState(0);
  const [particles, setParticles] = useState<{ id: number; from: number; to: number }[]>([]);
  const particleId = useRef(0);

  const reset = useCallback(() => {
    setPhase("idle");
    setActiveSync(0);
    setParticles([]);
  }, []);

  useEffect(() => {
    if (!inView) {
      reset();
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    const run = () => {
      // Phase 1: syncing with particles
      setPhase("syncing");
      setActiveSync(0);

      // Particle bursts between tools
      for (let i = 0; i < 3; i++) {
        timers.push(setTimeout(() => {
          setActiveSync(i);
          const newParticles = Array.from({ length: 3 }, () => ({
            id: particleId.current++,
            from: i,
            to: (i + 1) % 3,
          }));
          setParticles(prev => [...prev, ...newParticles]);
          // Clean up old particles
          timers.push(setTimeout(() => {
            setParticles(prev => prev.filter(p => !newParticles.includes(p)));
          }, 1200));
        }, i * 800));
      }

      // Phase 2: done
      timers.push(setTimeout(() => {
        setPhase("done");
      }, 3000));

      // Phase 3: reset and loop
      timers.push(setTimeout(() => {
        reset();
        timers.push(setTimeout(run, 300));
      }, CYCLE));
    };

    timers.push(setTimeout(run, 500));
    return () => timers.forEach(clearTimeout);
  }, [inView, reset]);

  return (
    <div ref={ref} className="h-full flex items-center justify-center px-4">
      <div className="flex items-center gap-3 relative">
        {tools.map((tool, i) => {
          const Icon = tool.icon;
          const isSyncing = phase === "syncing" && activeSync >= i;
          const isDone = phase === "done";

          return (
            <div key={tool.label} className="flex items-center gap-3">
              <motion.div
                className="relative flex flex-col items-center gap-1.5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: appleEase }}
              >
                <motion.div
                  className="w-14 h-14 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center"
                  animate={{
                    borderColor: isDone
                      ? "hsl(var(--accent) / 0.4)"
                      : isSyncing
                        ? "hsl(var(--accent) / 0.2)"
                        : "hsl(0 0% 100% / 0.06)",
                    boxShadow: isDone
                      ? "0 0 14px hsl(var(--accent) / 0.2)"
                      : "0 0 0px transparent",
                  }}
                  transition={{ duration: 0.4, ease: appleEase }}
                >
                  <Icon className="w-5 h-5 text-accent/70" />
                </motion.div>

                <span className="text-[10px] text-muted-foreground font-medium">{tool.label}</span>

                {/* Status badge */}
                <AnimatePresence mode="wait">
                  {isSyncing && !isDone && (
                    <motion.span
                      key="sync"
                      className="absolute -top-1.5 -right-1.5 text-[8px] px-1.5 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/20"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3 }}
                    >
                      Sync…
                    </motion.span>
                  )}
                  {isDone && (
                    <motion.span
                      key="done"
                      className="absolute -top-1.5 -right-1.5 flex items-center gap-0.5 text-[8px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/20"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Check className="w-2.5 h-2.5" /> OK
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Connection line + particles */}
              {i < tools.length - 1 && (
                <div className="relative w-6 h-[2px]">
                  <motion.div
                    className="absolute inset-0 bg-accent/10 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  />
                  {/* Traveling particles */}
                  {particles
                    .filter(p => p.from === i)
                    .map(p => (
                      <motion.div
                        key={p.id}
                        className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent"
                        style={{ boxShadow: "0 0 6px hsl(var(--accent) / 0.5)" }}
                        initial={{ left: 0, opacity: 1 }}
                        animate={{ left: "100%", opacity: [1, 1, 0] }}
                        transition={{ duration: 0.8, ease: appleEase }}
                      />
                    ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IntegrationNodesAnimation;
