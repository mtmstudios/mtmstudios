import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import BlurText from "./BlurText";
import whatsappLogo from "@/assets/whatsapp-logo.png";

const smoothEase = [0.25, 0.1, 0.25, 1] as const;

const HeroSection = () => {
  return (
    <section className="min-h-[70vh] flex items-start justify-center overflow-hidden pt-[15vh]">
      <div className="container mx-auto px-6 py-0 text-center">
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold text-foreground mb-2 leading-snug flex flex-col items-center" style={{ textShadow: '0 2px 30px rgba(0,0,0,0.6)' }}>
          <span className="flex items-baseline gap-x-[0.3em]">
            <BlurText text="Wir bauen KI-Lösungen," delay={60} className="inline" animateBy="words" direction="bottom" stepDuration={0.5} animationFrom={{
              filter: 'blur(12px)',
              opacity: 0,
              y: 30
            }} animationTo={[{
              filter: 'blur(4px)',
              opacity: 0.7,
              y: 8
            }, {
              filter: 'blur(0px)',
              opacity: 1,
              y: 0
            }]} />
          </span>
          <span className="flex flex-wrap justify-center items-baseline gap-x-[0.3em]">
            <BlurText text="die" delay={60} className="inline" animateBy="words" direction="bottom" stepDuration={0.5} animationFrom={{
              filter: 'blur(12px)',
              opacity: 0,
              y: 30
            }} animationTo={[{
              filter: 'blur(4px)',
              opacity: 0.7,
              y: 8
            }, {
              filter: 'blur(0px)',
              opacity: 1,
              y: 0
            }]} />
            <motion.span initial={{
              filter: 'blur(12px)',
              opacity: 0,
              y: 30
            }} animate={{
              filter: 'blur(0px)',
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5,
              delay: 0.18,
              ease: smoothEase
            }} className="font-bold text-accent">
              Zeit sparen
            </motion.span>
          </span>
        </h1>

        <motion.p initial={{
          opacity: 0,
          y: 20,
          filter: "blur(8px)"
        }} animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)"
        }} transition={{
          duration: 1,
          delay: 0.5,
          ease: smoothEase
        }} className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-12 leading-relaxed" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)' }}>
          Intelligente KI-Lösungen, die euer Team entlasten — rund um die Uhr.
        </motion.p>

        <motion.div initial={{
          opacity: 0,
          y: 20,
          filter: "blur(8px)"
        }} animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)"
        }} transition={{
          duration: 1,
          delay: 0.7,
          ease: smoothEase
        }} className="flex flex-col items-center gap-4">
          <a href="#kontakt">
            <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 font-semibold text-lg px-10 py-6 rounded-full transition-all duration-200">
              Jetzt beraten lassen
            </Button>
          </a>
          <a
            href="https://wa.me/4915123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-opacity duration-200"
          >
            <img src={whatsappLogo} alt="WhatsApp" className="w-4 h-4" />
            Oder schreib uns auf WhatsApp
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{
          duration: 1.2,
          delay: 1,
          ease: smoothEase
        }} className="mt-8" />
      </div>
    </section>
  );
};

export default HeroSection;
