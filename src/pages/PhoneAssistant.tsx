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
import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const PhoneAssistant = () => {
  const isMobile = useIsMobile();
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const attemptAutoplay = async () => {
      try { await video.play(); } catch {
        video.muted = true;
        try { await video.play(); } catch {}
      }
    };
    attemptAutoplay();
  }, []);

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (bgRef.current) {
          const scrollPosition = window.scrollY;
          const maxScroll = 300;
          const opacity = isMobile
            ? Math.max(0.25, 1 - (scrollPosition / maxScroll) * 0.75)
            : Math.max(0.1, 1 - (scrollPosition / maxScroll) * 0.9);
          bgRef.current.style.opacity = opacity.toString();
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => { window.removeEventListener("scroll", handleScroll); cancelAnimationFrame(rafId); };
  }, [isMobile]);

  return (
    <div className="relative min-h-screen bg-background">
      <SEOHead title="KI-Telefonassistent | Anrufe automatisieren | MTM Studios" description="KI-Telefonassistent von MTM Studios. Automatische Anrufannahme, Terminbuchung und Weiterleitung — 24/7 erreichbar." />
      <div ref={bgRef} className="fixed inset-0 w-screen h-screen overflow-hidden" style={{ isolation: "isolate", zIndex: 0 }}>
        <img src="/videos/hero-background-still.jpg" alt="" loading="lazy" className="md:hidden w-full h-full object-cover absolute inset-0" style={{ filter: "brightness(0.7) contrast(1.5)", pointerEvents: "none" }} />
        <video ref={videoRef} autoPlay loop muted playsInline
          // @ts-ignore
          webkit-playsinline=""
          preload="auto"
          onLoadedData={(e) => { e.currentTarget.play().catch(() => {}); }}
          className="hidden md:block w-full h-full object-cover" style={{ mixBlendMode: "hard-light", position: "absolute", top: 0, left: 0, width: "100%", height: "100%", filter: "brightness(0.7) contrast(2)", pointerEvents: "none" }}>
          <source src="/videos/hero-background.webm" type="video/webm" />
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
      </div>
      <div style={{ position: "relative", zIndex: 50 }}><Navigation /></div>
      <div style={{ position: "relative", zIndex: 10 }}>
        <PhoneHero testPhoneNumber="+4928528879850" />
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
