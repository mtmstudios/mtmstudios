import { motion, AnimatePresence, useInView } from "motion/react";
import { useRef, useEffect, useState, useCallback } from "react";

const summaries = [
  [
    "Anrufer: Herr Schmidt",
    "Anliegen: Terminbuchung",
    "Termin: Di, 14:00 Uhr",
    "Status: ✓ Erledigt",
  ],
  [
    "Anrufer: Frau Weber",
    "Anliegen: Rückrufbitte",
    "Priorität: Hoch",
    "Status: ✓ Weitergeleitet",
  ],
  [
    "Anrufer: Dr. Meier",
    "Anliegen: Produktanfrage",
    "Produkt: Enterprise Plan",
    "Status: ✓ Info gesendet",
  ],
];

const CYCLE = 7000;

const TypewriterAnimation = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [summaryIdx, setSummaryIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [cursorLine, setCursorLine] = useState(0);

  const reset = useCallback(() => {
    setDisplayed([]);
    setVisible(true);
    setCursorLine(0);
  }, []);

  useEffect(() => {
    if (!inView) { reset(); return; }

    const timers: ReturnType<typeof setTimeout>[] = [];
    let cancelled = false;

    const typeLines = (lines: string[]) => {
      let lineIdx = 0;
      let charIdx = 0;
      const current: string[] = [];

      const tick = () => {
        if (cancelled || lineIdx >= lines.length) return;
        charIdx++;
        current[lineIdx] = lines[lineIdx].slice(0, charIdx);
        setDisplayed([...current]);
        setCursorLine(lineIdx);

        if (charIdx >= lines[lineIdx].length) {
          lineIdx++;
          charIdx = 0;
          if (lineIdx < lines.length) {
            timers.push(setTimeout(tick, 400));
          }
        } else {
          timers.push(setTimeout(tick, 25 + Math.random() * 35));
        }
      };

      timers.push(setTimeout(tick, 600));
    };

    const run = () => {
      if (cancelled) return;
      reset();
      const lines = summaries[summaryIdx % summaries.length];
      typeLines(lines);

      // Fade out after typing completes
      const totalTypingTime = lines.reduce((t, l) => t + l.length * 40 + 400, 0) + 600;

      timers.push(setTimeout(() => {
        if (cancelled) return;
        setVisible(false);
      }, totalTypingTime + 1500));

      timers.push(setTimeout(() => {
        if (cancelled) return;
        setSummaryIdx(prev => prev + 1);
        reset();
        timers.push(setTimeout(run, 300));
      }, CYCLE));
    };

    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [inView, summaryIdx, reset]);

  return (
    <div ref={ref} className="h-full flex items-center justify-center px-6">
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={summaryIdx}
            className="font-mono text-base space-y-2 w-full max-w-[260px]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.5 }}
          >
            {displayed.map((line, i) => {
              const lines = summaries[summaryIdx % summaries.length];
              const isComplete = line.length >= (lines[i]?.length ?? 0);
              return (
                <motion.div
                  key={i}
                  className="text-accent/70"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    textShadow: isComplete
                      ? ["0 0 0px hsl(var(--accent) / 0)", "0 0 8px hsl(var(--accent) / 0.3)", "0 0 0px hsl(var(--accent) / 0)"]
                      : "none",
                  }}
                  transition={{
                    duration: 0.15,
                    textShadow: isComplete ? { duration: 0.8, ease: "easeOut" } : undefined,
                  }}
                >
                  {line}
                  {i === cursorLine && !isComplete && (
                    <motion.span
                      className="inline-block w-[2px] h-4 bg-accent/60 ml-0.5 align-middle"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.7, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              );
            })}
            {displayed.length === 0 && (
              <motion.span
                className="inline-block w-[2px] h-4 bg-accent/60"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.7, repeat: Infinity }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TypewriterAnimation;
