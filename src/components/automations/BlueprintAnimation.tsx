import { motion, AnimatePresence, useInView } from "motion/react";
import { useRef, useEffect, useState, useCallback } from "react";
import { LogIn, Search, Cog, CheckCircle } from "lucide-react";

const appleEase = [0.16, 1, 0.3, 1] as const;
const CYCLE = 7000;

const nodes = [
  { icon: LogIn, label: "Eingang" },
  { icon: Search, label: "Prüfen" },
  { icon: Cog, label: "Verarbeiten" },
  { icon: CheckCircle, label: "Ausgabe" },
];

const BlueprintAnimation = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });
  const [activeNode, setActiveNode] = useState(-1);
  const [showConfig, setShowConfig] = useState(false);
  const [connectedTo, setConnectedTo] = useState(-1);

  const reset = useCallback(() => {
    setActiveNode(-1);
    setShowConfig(false);
    setConnectedTo(-1);
  }, []);

  useEffect(() => {
    if (!inView) {
      reset();
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    const run = () => {
      // Nodes appear one by one
      for (let i = 0; i < nodes.length; i++) {
        timers.push(setTimeout(() => {
          setActiveNode(i);
        }, 400 + i * 600));

        // Connection lines draw after each node
        if (i > 0) {
          timers.push(setTimeout(() => {
            setConnectedTo(i);
          }, 600 + i * 600));
        }
      }

      // Config text appears
      timers.push(setTimeout(() => {
        setShowConfig(true);
      }, 3400));

      // Reset and loop
      timers.push(setTimeout(() => {
        reset();
        timers.push(setTimeout(run, 400));
      }, CYCLE));
    };

    timers.push(setTimeout(run, 300));
    return () => timers.forEach(clearTimeout);
  }, [inView, reset]);

  return (
    <div ref={ref} className="h-full flex flex-col items-center justify-center gap-3 px-4">
      <div className="flex items-center gap-2">
        {nodes.map((node, i) => {
          const Icon = node.icon;
          const isVisible = i <= activeNode;
          const isLast = i === nodes.length - 1;
          const isActive = i === activeNode;

          return (
            <div key={node.label} className="flex items-center gap-2">
              <motion.div
                className="flex flex-col items-center gap-1"
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.5, y: 10 }}
                transition={{ duration: 0.5, ease: appleEase }}
              >
                <motion.div
                  className="w-12 h-12 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center"
                  animate={{
                    borderColor: isActive
                      ? "hsl(var(--accent) / 0.4)"
                      : isVisible
                        ? "hsl(0 0% 100% / 0.1)"
                        : "hsl(0 0% 100% / 0.06)",
                    boxShadow: isLast && isVisible
                      ? "0 0 14px hsl(var(--accent) / 0.2)"
                      : "0 0 0px transparent",
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <Icon className={`w-4 h-4 ${isLast && isVisible ? "text-emerald-400" : "text-accent/70"}`} />
                </motion.div>
                <span className="text-[9px] text-muted-foreground font-medium">{node.label}</span>
              </motion.div>

              {/* Connection line */}
              {i < nodes.length - 1 && (
                <motion.div
                  className="w-4 h-[1.5px] bg-accent/20 rounded-full origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: connectedTo > i ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: appleEase }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Config text */}
      <AnimatePresence>
        {showConfig && (
          <motion.div
            className="text-[10px] text-accent/60 font-medium flex items-center gap-1"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.5, ease: appleEase }}
          >
            <CheckCircle className="w-3 h-3 text-emerald-400" />
            Konfiguriert für: Dein Unternehmen
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlueprintAnimation;
