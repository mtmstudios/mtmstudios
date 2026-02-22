import { motion } from "motion/react";
import BlurText from "@/components/BlurText";

const appleEase = [0.16, 1, 0.3, 1] as const;

const PhoneHero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24">
      <BlurText
        text="Euer KI-Telefonassistent"
        className="text-5xl md:text-7xl font-bold text-foreground tracking-tight"
        delay={80}
        animateBy="words"
        direction="top"
      />

      <motion.p
        className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: appleEase }}
      >
        Nimmt Anrufe entgegen, beantwortet Fragen, bucht Termine — rund um die Uhr.
      </motion.p>

      {/* Animated Phone Visual */}
      <motion.div
        className="mt-16 w-full max-w-[320px] h-[500px] relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <svg
          viewBox="0 0 320 500"
          fill="none"
          className="w-full h-full"
        >
          {/* Phone outline */}
          <motion.rect
            x="20"
            y="10"
            width="280"
            height="480"
            rx="40"
            stroke="hsl(var(--accent))"
            strokeWidth="2"
            strokeOpacity="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: appleEase, delay: 1 }}
          />

          {/* Notch */}
          <motion.rect
            x="120"
            y="24"
            width="80"
            height="6"
            rx="3"
            fill="hsl(var(--accent))"
            fillOpacity="0.2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.4 }}
          />

          {/* Waveform bars inside the phone */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <motion.rect
              key={i}
              x={100 + i * 18}
              width="8"
              rx="4"
              fill="hsl(var(--accent))"
              fillOpacity="0.5"
              initial={{ y: 250, height: 20 }}
              animate={{
                height: [20, 30 + Math.random() * 60, 20, 40 + Math.random() * 40, 20],
                y: [250, 250 - (30 + Math.random() * 60) / 2, 250, 250 - (40 + Math.random() * 40) / 2, 250],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: 2.5 + i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* "Anruf läuft" text */}
          <motion.text
            x="160"
            y="340"
            textAnchor="middle"
            className="text-xs fill-accent/50"
            style={{ fontSize: "12px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0.7, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2.5 }}
          >
            Anruf läuft…
          </motion.text>
        </svg>
      </motion.div>
    </section>
  );
};

export default PhoneHero;
