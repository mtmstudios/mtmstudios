import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import PhoneHero from "@/components/phone-assistant/PhoneHero";
import ProblemSection from "@/components/phone-assistant/ProblemSection";
import HowItWorks from "@/components/phone-assistant/HowItWorks";
import PhoneFeatures from "@/components/phone-assistant/PhoneFeatures";
import UseCases from "@/components/phone-assistant/UseCases";
import PhoneTestimonial from "@/components/phone-assistant/PhoneTestimonial";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import RegionalSection from "@/components/RegionalSection";
import { useIsMobile } from "@/hooks/use-mobile";
import earthHero from "@/assets/earth-hero.jpg";
import { useEffect, useRef } from "react";

const PhoneAssistant = () => {
  const isMobile = useIsMobile();
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    if (isMobile) return;
    const video = videoRef.current;
    if (!video) return;
    const attemptAutoplay = async () => {
      try { await video.play(); } catch {
        video.muted = true;
        try { await video.play(); } catch {}
      }
    };
    attemptAutoplay();
  }, [isMobile]);

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

  return (
    <div className="relative min-h-screen bg-background">
      <SEOHead title="KI-Telefonassistent | Anrufe automatisieren | MTM Studios" description="KI-Telefonassistent von MTM Studios. Automatische Anrufannahme, Terminbuchung und Weiterleitung — 24/7 erreichbar." />
      <div ref={bgRef} className="fixed inset-0 w-screen h-screen overflow-hidden" style={{ isolation: "isolate", zIndex: 0, willChange: "opacity" }}>
        {isMobile ? (
          <img src={earthHero} alt="Hero background" className="w-full h-full object-cover" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", filter: "brightness(0.7) contrast(2)", pointerEvents: "none" }} />
        ) : (
          <video ref={videoRef} loop muted playsInline preload="auto" src="/videos/hero-background.mp4" className="w-full h-full object-cover transition-opacity duration-300" style={{ mixBlendMode: "hard-light", position: "absolute", top: 0, left: 0, width: "100%", height: "100%", filter: "brightness(0.7) contrast(2)", pointerEvents: "none" }} />
        )}
      </div>
      <div style={{ position: "relative", zIndex: 50 }}><Navigation /></div>
      <div style={{ position: "relative", zIndex: 10 }}>
        <PhoneHero testPhoneNumber="+4915567077414" />
        <ProblemSection />
        <HowItWorks />
        <PhoneFeatures />
        <UseCases />
        <PhoneTestimonial />
        <CTASection />
        <RegionalSection contextPath="ki-telefonassistent" />
        <Footer />
      </div>
    </div>
  );
};

export default PhoneAssistant;
