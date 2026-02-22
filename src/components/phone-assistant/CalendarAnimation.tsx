import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Check } from "lucide-react";

const appleEase = [0.16, 1, 0.3, 1] as const;

const days = ["Mo", "Di", "Mi", "Do", "Fr"];
const times = ["9:00", "11:00", "14:00"];
const BOOKED = { row: 1, col: 2 }; // Di 14:00

const CalendarAnimation = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="h-full flex items-center justify-center">
      <div className="grid gap-1.5">
        {/* Header row */}
        <div className="grid grid-cols-5 gap-1.5">
          {days.map((d) => (
            <div key={d} className="text-[10px] text-muted-foreground text-center font-medium py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Time slots */}
        {times.map((time, ri) => (
          <div key={time} className="grid grid-cols-5 gap-1.5">
            {days.map((_, ci) => {
              const isBooked = ri === BOOKED.row && ci === BOOKED.col;
              return (
                <motion.div
                  key={ci}
                  className={`w-10 h-8 rounded-lg flex items-center justify-center text-[10px] ${
                    isBooked
                      ? "bg-accent/20 border border-accent/40"
                      : "bg-white/[0.03] border border-white/[0.06]"
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.1 + (ri * 5 + ci) * 0.03,
                    ease: appleEase,
                  }}
                >
                  {isBooked && inView && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2, duration: 0.4, ease: appleEase }}
                    >
                      <Check className="w-3.5 h-3.5 text-accent" />
                    </motion.div>
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
