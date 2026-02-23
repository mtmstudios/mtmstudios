import { Button } from "@/components/ui/button";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useContactFunnel } from "@/contexts/ContactFunnelContext";
import whatsappLogo from "@/assets/whatsapp-logo.png";

const appleEase = [0.16, 1, 0.3, 1] as const;

const CTASection = () => {
  const ref = useRef(null);
  const { setIsOpen } = useContactFunnel();
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: appleEase }}
          className="text-sm text-muted-foreground mb-8 tracking-wide"
        >
          24/7 erreichbar · 80% automatisiert · 15h+ gespart pro Woche
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: appleEase }}
          className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6"
        >
          Bereit für den
          <br />
          nächsten Schritt?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: appleEase }}
          className="text-muted-foreground text-lg leading-relaxed max-w-lg mx-auto mb-10"
        >
          Lass uns gemeinsam herausfinden, wie KI euer Business entlastet — kostenlos und unverbindlich.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: appleEase }}
          className="flex flex-col items-center gap-4"
        >
          <Button
            size="lg"
            onClick={() => setIsOpen(true)}
            className="bg-foreground text-background hover:bg-foreground/90 font-semibold text-lg px-10 py-6 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--accent)/0.2)]"
          >
            Jetzt beraten lassen
          </Button>
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
      </div>
    </section>
  );
};

export default CTASection;
