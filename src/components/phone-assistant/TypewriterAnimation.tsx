import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";

const lines = [
  "Anrufer: Herr Schmidt",
  "Anliegen: Terminbuchung",
  "Termin: Di, 14:00 Uhr",
  "Status: ✓ Erledigt",
];

const TypewriterAnimation = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [completedLines, setCompletedLines] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!inView) return;

    let lineIdx = 0;
    let charIdx = 0;
    const current: string[] = [];

    const tick = () => {
      if (lineIdx >= lines.length) return;

      charIdx++;
      current[lineIdx] = lines[lineIdx].slice(0, charIdx);
      setDisplayed([...current]);

      if (charIdx >= lines[lineIdx].length) {
        setCompletedLines((prev) => new Set(prev).add(lineIdx));
        lineIdx++;
        charIdx = 0;
        if (lineIdx < lines.length) {
          setTimeout(tick, 600);
        }
      } else {
        const delay = 25 + Math.random() * 35;
        setTimeout(tick, delay);
      }
    };

    setTimeout(tick, 800);
  }, [inView]);

  return (
    <div ref={ref} className="h-full flex items-center justify-center px-6">
      <div className="font-mono text-base space-y-2 w-full max-w-[260px]">
        {displayed.map((line, i) => (
          <motion.div
            key={i}
            className="text-accent/70"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              textShadow: completedLines.has(i)
                ? ["0 0 0px hsl(var(--accent) / 0)", "0 0 8px hsl(var(--accent) / 0.3)", "0 0 0px hsl(var(--accent) / 0)"]
                : "none",
            }}
            transition={{
              duration: 0.15,
              textShadow: completedLines.has(i) ? { duration: 0.8, ease: "easeOut" } : undefined,
            }}
          >
            {line}
            {i === displayed.length - 1 && displayed[i]?.length < lines[i]?.length && (
              <motion.span
                className="inline-block w-[2px] h-4 bg-accent/60 ml-0.5 align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.7, repeat: Infinity }}
              />
            )}
          </motion.div>
        ))}
        {displayed.length === 0 && inView && (
          <motion.span
            className="inline-block w-[2px] h-4 bg-accent/60"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.7, repeat: Infinity }}
          />
        )}
      </div>
    </div>
  );
};

export default TypewriterAnimation;
