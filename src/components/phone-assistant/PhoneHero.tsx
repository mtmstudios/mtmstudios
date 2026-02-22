import { motion } from "motion/react";
import BlurText from "@/components/BlurText";
import phoneMockup from "@/assets/phone-mockup.png";

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

      {/* Phone Mockup with Apple-like animations */}
      <div className="mt-10 sm:mt-16 relative flex flex-col items-center">
        {/* Floating container */}
        <motion.div
          className="relative"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Glow ring behind phone */}
          <motion.div
            className="absolute inset-0 -inset-x-8 -inset-y-8 rounded-[60px]"
            style={{
              background: "radial-gradient(ellipse at center, hsl(var(--neon) / 0.15) 0%, hsl(var(--neon) / 0.05) 40%, transparent 70%)",
            }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Phone image */}
          <motion.img
            src={phoneMockup}
            alt="iPhone Mockup — KI-Telefonassistent"
            className="relative z-10 w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] h-auto drop-shadow-2xl"
            initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.8, ease: appleEase }}
          />
        </motion.div>

        {/* Dynamic shadow */}
        <motion.div
          className="mt-4 rounded-full"
          style={{
            width: "60%",
            height: 18,
            background: "radial-gradient(ellipse at center, hsl(var(--neon) / 0.18) 0%, transparent 70%)",
            filter: "blur(10px)",
          }}
          animate={{
            scaleX: [1, 1.12, 1],
            opacity: [0.6, 0.35, 0.6],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
};

export default PhoneHero;
