import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Bot, User } from "lucide-react";

const appleEase = [0.16, 1, 0.3, 1] as const;

const HandoffAnimation = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <div ref={ref} className="h-full flex items-center justify-center px-8">
      <div className="relative flex items-center justify-between w-full max-w-[260px]">
        {/* Connection line */}
        {inView && (
          <motion.div
            className="absolute top-1/2 left-[28px] right-[28px] h-[2px] -translate-y-1/2"
            style={{ background: "linear-gradient(90deg, hsl(var(--accent)/0.3), hsl(var(--accent)/0.1))" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: appleEase }}
            // @ts-ignore
            transformOrigin="left"
          />
        )}

        {/* Traveling dot */}
        {inView && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent shadow-[0_0_16px_hsl(var(--accent)/0.5)]"
            animate={{ left: ["28px", "calc(100% - 28px)"] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Bot node */}
        <motion.div
          className="relative z-10 w-14 h-14 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: appleEase }}
        >
          <Bot className="w-6 h-6 text-accent" />
        </motion.div>

        {/* Person node */}
        <motion.div
          className="relative z-10 w-14 h-14 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15, ease: appleEase }}
        >
          <User className="w-6 h-6 text-accent" />
        </motion.div>

        {/* Labels */}
        <motion.span
          className="absolute -bottom-8 left-0 text-[10px] text-muted-foreground font-mono w-14 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          Bot
        </motion.span>
        <motion.span
          className="absolute -bottom-8 right-0 text-[10px] text-muted-foreground font-mono w-14 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          Mensch
        </motion.span>
      </div>
    </div>
  );
};

export default HandoffAnimation;
