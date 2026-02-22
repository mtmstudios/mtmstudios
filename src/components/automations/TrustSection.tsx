import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";

const appleEase = [0.16, 1, 0.3, 1] as const;

const CountUp = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{value}{suffix}</span>;
};

const stats = [
  { target: 100, suffix: "+", label: "automatisierte Workflows" },
  { target: 15, suffix: "h+", label: "pro Woche eingespart" },
  { target: 98, suffix: "%", label: "Kundenzufriedenheit" },
  { target: 24, suffix: "/7", label: "Prozesse laufen immer" },
];

const TrustSection = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16"
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: appleEase }}
        >
          Zahlen, die für sich sprechen.
        </motion.h2>

        <div className="grid grid-cols-2 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: appleEase }}
            >
              <div className="text-4xl md:text-5xl font-bold text-neon mb-2">
                <CountUp target={stat.target} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
