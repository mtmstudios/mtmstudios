import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import BlurText from "./BlurText";
import GradientText from "./GradientText";
import whatsappLogo from "@/assets/whatsapp-logo.png";
const smoothEase = [0.25, 0.1, 0.25, 1] as const;
const HeroSection = () => {
  return <section className="min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Content Overlay */}
      <div className="container mx-auto px-6 py-32 text-center">
        {/* Badge */}

        {/* Hero Headline */}
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold text-foreground mb-2 leading-snug flex flex-col items-center">
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
          }} className="font-bold">
              <GradientText animationSpeed={5}>Zeit sparen</GradientText>
            </motion.span>
          </span>
        </h1>

        {/* Description */}
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
      }} className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
          Von intelligenten Telefonassistenten über smarte Chatbots bis hin zu maßgeschneiderten Automatisierungen — wir entwickeln KI, die dein Unternehmen entlastet.
        </motion.p>

        {/* CTA Buttons */}
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
      }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#kontakt">
            <Button size="lg" className="bg-neon text-accent-foreground hover:bg-neon-glow neon-glow font-semibold text-lg px-8 py-6 rounded-full transition-all duration-300">
              <ArrowRight className="w-5 h-5 mr-2" />
              Jetzt anfragen!
            </Button>
          </a>
          <a href="https://wa.me/4915123456789" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="border-foreground/20 hover:border-neon hover:text-neon text-foreground font-semibold text-lg px-8 py-6 rounded-full transition-all duration-300">
              <img src={whatsappLogo} alt="WhatsApp" className="w-5 h-5 mr-2" />
              WhatsApp schreiben
            </Button>
          </a>
        </motion.div>

        {/* Bottom Text */}
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 1.2,
        delay: 1,
        ease: smoothEase
      }} className="mt-32">
          
        </motion.div>
      </div>
    </section>;
};
export default HeroSection;