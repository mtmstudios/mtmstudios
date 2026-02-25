import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import AutomationsHero from "@/components/automations/AutomationsHero";
import AutomationsProblem from "@/components/automations/AutomationsProblem";
import AutomationsSpectrum from "@/components/automations/AutomationsSpectrum";
import AutomationsHowItWorks from "@/components/automations/AutomationsHowItWorks";
import AutomationsFeatures from "@/components/automations/AutomationsFeatures";
import TrustSection from "@/components/automations/TrustSection";
import AutomationsTestimonial from "@/components/automations/AutomationsTestimonial";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import RegionalSection from "@/components/RegionalSection";
import { useEffect, useRef } from "react";

const Automations = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

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
          const opacity = Math.max(0.1, 1 - (scrollPosition / maxScroll) * 0.9);
          bgRef.current.style.opacity = opacity.toString();
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => { window.removeEventListener("scroll", handleScroll); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <SEOHead title="KI-Automatisierung für Unternehmen | MTM Studios" description="KI-Automatisierung von MTM Studios. Wir automatisieren deine Geschäftsprozesse — effizient, skalierbar und DSGVO-konform." />
      <div ref={bgRef} className="fixed inset-0 w-screen h-screen overflow-hidden" style={{ isolation: "isolate", zIndex: 0, willChange: "opacity" }}>
        <img src="/videos/hero-background-still.jpg" alt="" className="md:hidden w-full h-full object-cover absolute inset-0" style={{ mixBlendMode: "hard-light", filter: "brightness(0.5) contrast(2)", pointerEvents: "none" }} />
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
        <AutomationsHero />
        <AutomationsProblem />
        <AutomationsSpectrum />
        <AutomationsHowItWorks />
        <AutomationsFeatures />
        <TrustSection />
        <AutomationsTestimonial />
        <CTASection />
        <RegionalSection contextPath="automatisierungen" />
        <Footer />
      </div>
    </div>
  );
};

export default Automations;
