import { motion } from "motion/react";
import BlurText from "@/components/BlurText";

const appleEase = [0.16, 1, 0.3, 1] as const;

const AutomationsHero = () => {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-start px-4 sm:px-6 pt-[30vh] pb-16">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
        <BlurText
          text="Automatisierung, die mit dir wächst."
          className="text-3xl sm:text-5xl md:text-7xl font-bold text-foreground"
          delay={100}
        />

        <motion.p
          className="text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: appleEase }}
        >
          Vom ersten kleinen Workflow bis zur kompletten Prozesslandschaft.
          <br />
          Dein Partner im Zeitalter der KI.
        </motion.p>
      </div>
    </section>
  );
};

export default AutomationsHero;
