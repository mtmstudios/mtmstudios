import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import whatsappLogo from "@/assets/whatsapp-logo.png";

const smoothEase = [0.25, 0.1, 0.25, 1] as const;

interface CountUpProps {
  target: number;
  suffix?: string;
  duration?: number;
  inView: boolean;
}

const CountUp = ({ target, suffix = "", duration = 2, inView }: CountUpProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setCount(current);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [inView, target, duration]);

  return (
    <span className="text-neon font-bold">
      {count}{suffix}
    </span>
  );
};

const stats = [
  { value: 15, suffix: "h+", label: "gespart pro Woche" },
  { value: 80, suffix: "%", label: "Anfragen automatisiert" },
  { value: 24, suffix: "/7", label: "erreichbar für Kunden" },
];

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 items-center">
          {/* Left: Stats */}
          <motion.div
            initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, ease: smoothEase }}
            className="space-y-8 text-center md:text-left md:border-r md:border-border/20 md:pr-16"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: smoothEase }}
              >
                <div className="text-5xl md:text-6xl font-bold tracking-tight">
                  <CountUp target={stat.value} suffix={stat.suffix} inView={isInView} />
                </div>
                <p className="text-muted-foreground text-lg mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: CTA */}
          <motion.div
            initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: smoothEase }}
            className="md:pl-16 space-y-6 text-center md:text-left items-center md:items-start flex flex-col"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
              Bereit für den
              <br />
              nächsten Schritt?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              Lass uns gemeinsam herausfinden, wie KI euer Business entlastet — kostenlos und unverbindlich.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.6, delay: 0.6, ease: smoothEase }}
              className="flex flex-col sm:flex-row gap-4 pt-2 items-center sm:items-start"
            >
              <a href="#kontakt">
                <Button
                  size="lg"
                  className="bg-neon text-accent-foreground hover:bg-neon-glow neon-glow font-semibold text-lg px-8 py-6 rounded-full transition-all duration-300"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Jetzt beraten lassen
                </Button>
              </a>
              <a href="https://wa.me/4915123456789" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-foreground/20 text-foreground hover:border-[#25D366]/50 hover:bg-[#25D366]/5 font-semibold text-lg px-8 py-6 rounded-full transition-all duration-300"
                >
                  <img src={whatsappLogo} alt="WhatsApp" className="w-5 h-5 mr-2" />
                  WhatsApp schreiben
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
