import { motion } from "motion/react";
import BlurText from "@/components/BlurText";
import kiTelefonImg from "@/assets/ki-telefon.png";

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

      {/* Animated Phone Image */}
      <motion.div
        className="mt-10 sm:mt-16 relative flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
        {/* Glow behind image */}
        <motion.div
          className="absolute w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--accent) / 0.4) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 0.5, 0.3, 0.5], scale: 1 }}
          transition={{
            opacity: { duration: 4, repeat: Infinity, delay: 1.2, ease: "easeInOut" },
            scale: { duration: 1.2, delay: 1.2, ease: appleEase },
          }}
        />

        {/* Phone image with entry + float */}
        <motion.img
          src={kiTelefonImg}
          alt="KI-Telefonassistent Anruf auf iPhone"
          className="relative w-[280px] sm:w-[340px] md:w-[380px] h-auto drop-shadow-2xl"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{
            opacity: 1,
            y: [0, -8, 0],
            scale: 1,
          }}
          transition={{
            opacity: { duration: 1.2, delay: 0.8, ease: appleEase },
            scale: { duration: 1.2, delay: 0.8, ease: appleEase },
            y: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            },
          }}
        />
      </motion.div>
    </section>
  );
};

export default PhoneHero;
