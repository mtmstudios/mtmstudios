import { motion } from "motion/react";
import BlurText from "@/components/BlurText";
import kiTelefonImg from "@/assets/ki-telefon.png";

const appleEase = [0.16, 1, 0.3, 1] as const;

const PhoneHero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-16 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
        <BlurText
          text="Euer KI-Telefonassistent"
          className="text-3xl sm:text-5xl md:text-7xl font-bold text-foreground tracking-tight text-center"
          delay={80}
          animateBy="words"
          direction="top"
        />

        <motion.p
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl text-center px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: appleEase }}
        >
          Nimmt Anrufe entgegen, beantwortet Fragen, bucht Termine — rund um die Uhr.
        </motion.p>

        {/* Animated Phone Image */}
        <motion.div
          className="w-full relative flex items-center justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: appleEase }}
        >
          {/* Glow behind image */}
          <motion.div
            className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full"
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
            className="relative w-[340px] sm:w-[420px] md:w-[480px] h-auto drop-shadow-2xl"
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
      </div>
    </section>
  );
};

export default PhoneHero;
