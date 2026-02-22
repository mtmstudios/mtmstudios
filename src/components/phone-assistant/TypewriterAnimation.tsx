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
        lineIdx++;
        charIdx = 0;
        if (lineIdx < lines.length) {
          setTimeout(tick, 400);
        }
      } else {
        setTimeout(tick, 35);
      }
    };

    setTimeout(tick, 600);
  }, [inView]);

  return (
    <div ref={ref} className="h-full flex items-center justify-center px-6">
      <div className="font-mono text-sm space-y-2 w-full max-w-[240px]">
        {displayed.map((line, i) => (
          <motion.div
            key={i}
            className="text-accent/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            {line}
            {i === displayed.length - 1 && displayed[i]?.length < lines[i]?.length && (
              <motion.span
                className="inline-block w-[2px] h-4 bg-accent/60 ml-0.5 align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}
          </motion.div>
        ))}
        {displayed.length === 0 && inView && (
          <motion.span
            className="inline-block w-[2px] h-4 bg-accent/60"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}
      </div>
    </div>
  );
};

export default TypewriterAnimation;
