import { useParams, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { AlertTriangle, Sparkles, MapPin, ChevronDown } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import RegionalSection from "@/components/RegionalSection";
import SEOHead from "@/components/SEOHead";
import { useContactFunnel } from "@/contexts/ContactFunnelContext";
import { getRegionalContent, getServiceLabel, validCities } from "@/data/regionalContent";
import { useEffect, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import whatsappLogo from "@/assets/whatsapp-logo.png";

const appleEase = [0.16, 1, 0.3, 1] as const;

interface RegionalPageProps {
  context: string;
}

const RegionalPage = ({ context }: RegionalPageProps) => {
  const { city } = useParams<{ city: string }>();
  const { setIsOpen } = useContactFunnel();
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [city]);

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (bgRef.current) {
          const scrollPosition = window.scrollY;
          const maxScroll = 300;
          const opacity = Math.max(0.3, 1 - (scrollPosition / maxScroll) * 0.7);
          bgRef.current.style.opacity = opacity.toString();
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => { window.removeEventListener("scroll", handleScroll); cancelAnimationFrame(rafId); };
  }, []);

  if (!city || !validCities.includes(city as any)) {
    return <Navigate to="/404" replace />;
  }

  const content = getRegionalContent(context, city);
  if (!content) return <Navigate to="/404" replace />;

  const serviceLabel = getServiceLabel(context);

  return (
    <div className="relative min-h-screen bg-background">
      <SEOHead title={content.title} description={content.description} />

      <div ref={bgRef} className="fixed inset-0 w-screen h-screen overflow-hidden" style={{ isolation: "isolate", zIndex: 0, willChange: "opacity" }}>
        <img src="/videos/hero-background-still.jpg" alt="" className="w-full h-full object-cover absolute inset-0" style={{ mixBlendMode: "hard-light", filter: "brightness(0.7) contrast(2)", pointerEvents: "none", objectPosition: "center 60%" }} />
      </div>

      <div style={{ position: "relative", zIndex: 50 }}>
        <Navigation />
      </div>

      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Hero */}
        <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: appleEase }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-foreground/50 mb-6"
          >
            <MapPin className="w-3.5 h-3.5" />
            {serviceLabel} · {city.charAt(0).toUpperCase() + city.slice(1)}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.1, ease: appleEase }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight max-w-4xl mx-auto"
          >
            {content.h1}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.3, ease: appleEase }}
            className="mt-6 text-base md:text-lg lg:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.9)" }}
          >
            {content.subtext}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: appleEase }}
            className="flex flex-col items-center gap-4 mt-10"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="bg-accent text-background hover:bg-accent/90 font-semibold rounded-full px-8 py-3.5 text-base transition-colors"
            >
              Kostenlos beraten lassen
            </button>
            <a
              href="https://wa.me/4915567077414"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground/70 transition-colors"
            >
              <img src={whatsappLogo} alt="WhatsApp" className="w-4 h-4" />
              Oder direkt per WhatsApp
            </a>
          </motion.div>
        </section>

        {/* Local Context */}
        <section className="py-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: appleEase }}
            className="max-w-2xl mx-auto text-center"
          >
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {content.localContext}
            </p>
          </motion.div>
        </section>

        {/* Detailed Content */}
        {content.detailedContent && (
          <section className="py-20 px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: appleEase }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-2xl md:text-4xl font-bold text-foreground text-center mb-8">
                So profitieren Unternehmen in {city.charAt(0).toUpperCase() + city.slice(1)}
              </h2>
              <div className="text-base md:text-lg text-muted-foreground leading-relaxed space-y-4 text-center">
                {content.detailedContent.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* Pain Points */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: appleEase }}
              className="text-2xl md:text-4xl font-bold text-foreground text-center mb-12"
            >
              Kennt ihr das?
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {content.painPoints.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: appleEase }}
                  className="text-center p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/10"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-destructive/10 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-destructive/70" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{point.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: appleEase }}
              className="text-2xl md:text-4xl font-bold text-foreground text-center mb-4"
            >
              Unsere Leistungen
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: appleEase }}
              className="text-muted-foreground text-center mb-12 text-base md:text-lg max-w-xl mx-auto"
            >
              Was wir für euch in {city.charAt(0).toUpperCase() + city.slice(1)} umsetzen.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {content.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: appleEase }}
                  className="text-center p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-accent/30 transition-all duration-500"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Advantages */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: appleEase }}
              className="text-2xl md:text-4xl font-bold text-foreground text-center mb-12"
            >
              Warum MTM Studios in {city.charAt(0).toUpperCase() + city.slice(1)}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {content.advantages.map((adv, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: appleEase }}
                  className="text-center p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/10"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{adv.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{adv.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6">
          <div className="max-w-2xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: appleEase }}
              className="text-2xl md:text-4xl font-bold text-foreground text-center mb-12"
            >
              Häufige Fragen
            </motion.h2>

            <Accordion type="single" collapsible className="w-full">
              {content.faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: appleEase }}
                >
                  <AccordionItem value={`faq-${i}`} className="border-white/10">
                    <AccordionTrigger className="text-left text-foreground hover:text-accent transition-colors text-sm md:text-base">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: appleEase }}
            className="text-2xl md:text-4xl font-bold text-foreground mb-4"
          >
            Bereit für den nächsten Schritt?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: appleEase }}
            className="text-muted-foreground mb-8 text-base md:text-lg max-w-xl mx-auto"
          >
            Kostenloses Erstgespräch — unverbindlich und persönlich.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: appleEase }}
            className="flex flex-col items-center gap-4"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="bg-accent text-background hover:bg-accent/90 font-semibold rounded-full px-8 py-3.5 text-base transition-colors"
            >
              Jetzt Gespräch vereinbaren
            </button>
            <a
              href="https://wa.me/4915567077414"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground/70 transition-colors"
            >
              <img src={whatsappLogo} alt="WhatsApp" className="w-4 h-4" />
              Oder direkt per WhatsApp
            </a>
          </motion.div>
        </section>

        <RegionalSection contextPath={context} />
        <Footer />
      </div>
    </div>
  );
};

export default RegionalPage;
