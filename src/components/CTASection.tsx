import { Button } from "@/components/ui/button";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useContactFunnel } from "@/contexts/ContactFunnelContext";


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
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Oder schreib uns auf WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
