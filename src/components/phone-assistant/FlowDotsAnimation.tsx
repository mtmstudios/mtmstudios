import { motion, useInView } from "motion/react";
import { useRef } from "react";

const appleEase = [0.16, 1, 0.3, 1] as const;

const nodes = [
  { label: "KI", emoji: "🤖" },
  { label: "Entscheidung", emoji: "⟡" },
  { label: "Mensch", emoji: "👤" },
];

const FlowDotsAnimation = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="h-full flex items-center justify-center px-8">
      <div className="relative w-full max-w-[260px]">
        {/* Gradient connecting line */}
        {inView && (
          <motion.div
            className="absolute top-1/2 left-[28px] right-[28px] h-[2px] -translate-y-1/2"
            style={{ background: "linear-gradient(90deg, hsl(var(--accent) / 0.1), hsl(var(--accent) / 0.3), hsl(var(--accent) / 0.1))" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: appleEase }}
            // @ts-ignore
            style2={{ transformOrigin: "left" }}
          />
        )}

        {/* Traveling dot */}
        {inView && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent"
            style={{ boxShadow: "0 0 20px hsl(var(--accent) / 0.5)" }}
            animate={{
              left: ["28px", "calc(50% - 6px)", "calc(50% - 6px)", "calc(100% - 34px)"],
            }}
            transition={{
              duration: 5,
              times: [0, 0.3, 0.6, 1],
              repeat: Infinity,
              repeatDelay: 2,
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
              <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center transition-all duration-300 hover:bg-accent/20">
                <span className="text-accent text-sm font-medium">
                  {node.emoji}
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
