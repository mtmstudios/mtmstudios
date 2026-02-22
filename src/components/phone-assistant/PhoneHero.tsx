import { motion } from "motion/react";
import BlurText from "@/components/BlurText";

const appleEase = [0.16, 1, 0.3, 1] as const;

const PhoneHero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-24 overflow-hidden">
      <BlurText
        text="Euer KI-Telefonassistent"
        className="text-3xl sm:text-5xl md:text-7xl font-bold text-foreground tracking-tight text-center"
        delay={80}
        animateBy="words"
        direction="top"
      />

      <motion.p
        className="text-base sm:text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl text-center px-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: appleEase }}
      >
        Nimmt Anrufe entgegen, beantwortet Fragen, bucht Termine — rund um die Uhr.
      </motion.p>

      {/* Animated Phone Visual */}
      <motion.div
        className="mt-10 sm:mt-16 w-full max-w-[260px] sm:max-w-[320px] h-[400px] sm:h-[500px] relative"
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

          {/* Glow behind waveform */}
          <motion.circle
            cx="160"
            cy="250"
            r="60"
            fill="hsl(var(--accent))"
            fillOpacity="0.06"
            filter="url(#waveGlow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0.4, 0.8, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, delay: 2.5 }}
          />
          <defs>
            <filter id="waveGlow">
              <feGaussianBlur stdDeviation="30" />
            </filter>
          </defs>

          {/* Waveform bars inside the phone */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const h1 = 40 + Math.random() * 80;
            const h2 = 40 + Math.random() * 80;
            const h3 = 40 + Math.random() * 80;
            return (
              <motion.rect
                key={i}
                x={97 + i * 19}
                width="10"
                rx="5"
                fill="hsl(var(--accent))"
                fillOpacity="0.5"
                initial={{ y: 250, height: 20 }}
                animate={{
                  height: [20, h1, 20, h2, 20, h3, 20],
                  y: [250, 250 - h1 / 2, 250, 250 - h2 / 2, 250, 250 - h3 / 2, 250],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  delay: 2.5 + i * 0.1,
                  ease: "easeInOut",
                }}
              />
            );
          })}

          {/* "Anruf läuft" text */}
          <motion.text
            x="160"
            y="340"
            textAnchor="middle"
            className="text-xs fill-accent/50"
            style={{ fontSize: "12px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0.7, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: 2.5 }}
          >
            Anruf läuft…
          </motion.text>
        </svg>
      </motion.div>
    </section>
  );
};

export default PhoneHero;
