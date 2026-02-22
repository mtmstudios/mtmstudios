import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";

const appleEase = [0.16, 1, 0.3, 1] as const;

const CountUp = ({ target }: { target: number }) => {
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

  return <span ref={ref}>{value} %</span>;
};

const ChatbotProblem = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-foreground leading-tight"
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: appleEase }}
        >
          Kunden warten nicht.
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground mt-6 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: appleEase }}
        >
          Langsame Antworten, überlastete Service-Teams, immer die gleichen Fragen.
          <br />
          Kunden erwarten sofortige Hilfe — auf dem Kanal, den sie schon nutzen.
        </motion.p>

        <motion.p
          className="text-sm text-muted-foreground/60 mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: appleEase }}
        >
          <CountUp target={78} /> der Kunden bevorzugen Messaging gegenüber Telefonieren.
        </motion.p>
      </div>
    </section>
  );
};

export default ChatbotProblem;
