import { motion, useInView } from "motion/react";
import { useRef } from "react";

const appleEase = [0.16, 1, 0.3, 1] as const;

const nodes = [
  { label: "KI", x: 0 },
  { label: "Entscheidung", x: 50 },
  { label: "Mensch", x: 100 },
];

const FlowDotsAnimation = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="h-full flex items-center justify-center px-8">
      <div className="relative w-full max-w-[260px]">
        {/* Connecting line */}
        {inView && (
          <motion.div
            className="absolute top-1/2 left-[24px] right-[24px] h-[2px] -translate-y-1/2 bg-accent/20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: appleEase }}
            style={{ transformOrigin: "left" }}
          />
        )}

        {/* Traveling dot */}
        {inView && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_12px_hsl(var(--accent)/0.6)]"
            animate={{
              left: ["24px", "calc(50% - 5px)", "calc(50% - 5px)", "calc(100% - 29px)"],
            }}
            transition={{
              duration: 3,
              times: [0, 0.35, 0.55, 1],
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Nodes */}
        <div className="relative z-10 flex items-center justify-between">
          {nodes.map((node, i) => (
            <motion.div
              key={node.label}
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.15, ease: appleEase }}
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
                <span className="text-accent text-xs font-medium">
                  {i === 0 ? "🤖" : i === 1 ? "⟡" : "👤"}
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                {node.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlowDotsAnimation;
