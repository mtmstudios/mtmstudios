import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "motion/react";
import Navigation from "@/components/Navigation";
import BlurText from "@/components/BlurText";
import PageBackground from "@/components/PageBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <PageBackground />
      <Navigation />

      {/* Decorative accent glow circles */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/[0.07] blur-[120px] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/[0.05] blur-[100px] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
      />

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-6">
        <BlurText
          text="404"
          className="text-[7rem] md:text-[12rem] lg:text-[18rem] font-bold tracking-tighter leading-none"
          animateBy="characters"
          delay={120}
          direction="top"
          stepDuration={0.4}
        />

        <motion.p
          className="text-lg md:text-xl text-foreground/50 mt-4 md:mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
        >
          Diese Seite existiert nicht.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
          className="mt-8 md:mt-10"
        >
          <Link
            to="/"
            className="inline-block px-8 py-3 rounded-2xl bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm text-foreground/90 text-sm md:text-base font-medium transition-all duration-300 hover:bg-white/[0.12] hover:shadow-[0_0_30px_hsl(174_72%_48%/0.15)]"
          >
            Zurück zur Startseite
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
