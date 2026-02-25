import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import BlurText from "./BlurText";
import { useContactFunnel } from "@/contexts/ContactFunnelContext";
import { useMobileBlur } from "@/hooks/use-mobile-blur";


const smoothEase = [0.25, 0.1, 0.25, 1] as const;

const HeroSection = () => {
  const { setIsOpen } = useContactFunnel();
  const { blur, noBlur } = useMobileBlur();
  return (
    <section className="min-h-[70vh] flex items-start justify-center overflow-hidden pt-[15vh]">
      <div className="container mx-auto px-6 py-0 text-center">
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold text-foreground mb-2 leading-snug flex flex-col items-center" style={{ textShadow: '0 2px 30px rgba(0,0,0,0.6)' }}>
          <span className="flex items-baseline gap-x-[0.3em]">
            <BlurText text="Wir bauen KI-Lösungen," delay={60} className="inline" animateBy="words" direction="bottom" stepDuration={0.5} />
          </span>
          <span className="flex flex-wrap justify-center items-baseline gap-x-[0.3em]">
            <BlurText text="die" delay={60} className="inline" animateBy="words" direction="bottom" stepDuration={0.5} />
            <motion.span initial={{
              opacity: 0,
              y: 30,
              ...blur(12)
            }} animate={{
              opacity: 1,
              y: 0,
              ...noBlur
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
          ...blur(8)
        }} animate={{
          opacity: 1,
          y: 0,
          ...noBlur
        }} transition={{
          duration: 1,
          delay: 0.5,
          ease: smoothEase
        }} className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-12 leading-relaxed" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)' }}>
          Intelligente KI-Lösungen, die dein Team entlasten — rund um die Uhr.
        </motion.p>

        <motion.div initial={{
          opacity: 0,
          y: 20,
          ...blur(8)
        }} animate={{
          opacity: 1,
          y: 0,
          ...noBlur
        }} transition={{
          duration: 1,
          delay: 0.7,
          ease: smoothEase
        }} className="flex flex-col items-center gap-4">
          <Button
            size="lg"
            onClick={() => setIsOpen(true)}
            className="bg-foreground text-background hover:bg-foreground/90 font-semibold text-lg px-10 py-6 rounded-full transition-all duration-200"
          >
            Jetzt beraten lassen
          </Button>
          <a
            href="https://wa.me/4915567077414"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-opacity duration-200"
            style={{ position: 'relative', zIndex: 20 }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
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
