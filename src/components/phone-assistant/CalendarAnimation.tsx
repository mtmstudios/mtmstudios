import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState, useCallback } from "react";
import { Check } from "lucide-react";

const appleEase = [0.16, 1, 0.3, 1] as const;
const CYCLE = 6000;

const days = ["Mo", "Di", "Mi", "Do", "Fr"];
const times = ["9:00", "11:00", "14:00"];

// Available slots (row, col)
const availableSlots = [
  [0, 1], [0, 3], [1, 0], [1, 2], [1, 4], [2, 1], [2, 3],
] as const;

type Phase = "idle" | "grid" | "scanning" | "selected" | "confirmed";

const CalendarAnimation = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });
  const [phase, setPhase] = useState<Phase>("idle");
  const [scanIdx, setScanIdx] = useState(-1);
  const [selectedSlot, setSelectedSlot] = useState<[number, number] | null>(null);

  const reset = useCallback(() => {
    setPhase("idle");
    setScanIdx(-1);
    setSelectedSlot(null);
  }, []);

  useEffect(() => {
    if (!inView) { reset(); return; }

    const timers: ReturnType<typeof setTimeout>[] = [];

    const run = () => {
      setPhase("grid");

      // Start scanning after grid appears
      timers.push(setTimeout(() => {
        setPhase("scanning");
        // Scan through available slots
        availableSlots.forEach((_, i) => {
          timers.push(setTimeout(() => setScanIdx(i), i * 300));
        });
      }, 800));

      // Pick a random slot
      const pick = availableSlots[Math.floor(Math.random() * availableSlots.length)];

      timers.push(setTimeout(() => {
        setPhase("selected");
        setSelectedSlot([pick[0], pick[1]]);
        setScanIdx(-1);
      }, 800 + availableSlots.length * 300 + 200));

      timers.push(setTimeout(() => {
        setPhase("confirmed");
      }, 800 + availableSlots.length * 300 + 800));

      // Loop
      timers.push(setTimeout(() => {
        reset();
        timers.push(setTimeout(run, 400));
      }, CYCLE));
    };

    timers.push(setTimeout(run, 300));
    return () => timers.forEach(clearTimeout);
  }, [inView, reset]);

  const isGridVisible = phase !== "idle";

  return (
    <div ref={ref} className="h-full flex items-center justify-center">
      <div className="grid gap-1.5">
        {/* Header row */}
        <div className="grid grid-cols-5 gap-1.5">
          {days.map((d, i) => (
            <motion.div
              key={d}
              className="text-[10px] text-muted-foreground text-center font-medium py-1"
              initial={{ opacity: 0, y: -5 }}
              animate={isGridVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
              transition={{ duration: 0.3, delay: i * 0.05, ease: appleEase }}
            >
              {d}
            </motion.div>
          ))}
        </div>

        {/* Time slots */}
        {times.map((_, ri) => (
          <div key={ri} className="grid grid-cols-5 gap-1.5">
            {days.map((__, ci) => {
              const isAvailable = availableSlots.some(([r, c]) => r === ri && c === ci);
              const isScanning = phase === "scanning" && scanIdx >= 0 &&
                scanIdx < availableSlots.length &&
                availableSlots[scanIdx][0] === ri && availableSlots[scanIdx][1] === ci;
              const isSelected = selectedSlot && selectedSlot[0] === ri && selectedSlot[1] === ci;
              const isConfirmed = phase === "confirmed" && isSelected;

              return (
                <motion.div
                  key={ci}
                  className={`w-12 h-10 rounded-lg flex items-center justify-center text-[10px] ${
                    isConfirmed
                      ? "bg-accent/20 border border-accent/40"
                      : isScanning
                        ? "bg-accent/10 border border-accent/20"
                        : isAvailable
                          ? "bg-white/[0.05] border border-white/[0.08]"
                          : "bg-white/[0.02] border border-white/[0.04]"
                  }`}
                  style={isConfirmed ? { boxShadow: "0 0 16px hsl(var(--accent) / 0.3)" } : undefined}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isGridVisible ? {
                    opacity: 1,
                    scale: 1,
                  } : { opacity: 0, scale: 0.8 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2 + (ri * 5 + ci) * 0.03,
                    ease: appleEase,
                  }}
                >
                  {isConfirmed && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0, rotate: -10 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ duration: 0.4, ease: appleEase }}
                    >
                      <Check className="w-3.5 h-3.5 text-accent" />
                    </motion.div>
                  )}
                  {isScanning && (
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-accent"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarAnimation;
