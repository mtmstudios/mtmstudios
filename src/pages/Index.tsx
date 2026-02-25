import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import LogosSection from "@/components/LogosSection";
import FeaturesSection from "@/components/FeaturesSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import RegionalSection from "@/components/RegionalSection";
import SEOHead from "@/components/SEOHead";
import { useEffect, useRef } from "react";

const Index = () => {
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
          const opacity = Math.max(0.3, 1 - (scrollPosition / maxScroll) * 0.7);
          bgRef.current.style.opacity = opacity.toString();
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { window.removeEventListener('scroll', handleScroll); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <SEOHead title="KI-Agentur für Telefonassistenten, Chatbots & Automatisierungen | MTM Studios" description="MTM Studios ist eure KI-Agentur. Wir entwickeln Telefonassistenten, Chatbots und Automatisierungen für Unternehmen." />
      <div ref={bgRef} className="fixed inset-0 w-screen h-screen overflow-hidden" style={{ isolation: 'isolate', zIndex: 0, willChange: 'opacity' }}>
        <img
          src="/videos/hero-background-still.jpg"
          alt=""
          className="md:hidden w-full h-full object-cover absolute inset-0"
          style={{ mixBlendMode: 'hard-light', filter: 'brightness(0.7) contrast(2)', pointerEvents: 'none' }}
        />
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          // @ts-ignore
          webkit-playsinline=""
          preload="auto"
          onLoadedData={(e) => {
            const video = e.currentTarget;
            video.play().catch(() => {});
          }}
          className="hidden md:block w-full h-full object-cover"
          style={{
            mixBlendMode: 'hard-light', position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%', filter: 'brightness(0.7) contrast(2)',
            pointerEvents: 'none',
          }}
        >
          <source src="/videos/hero-background.webm" type="video/webm" />
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
      </div>
      <div style={{ position: 'relative', zIndex: 50 }}><Navigation /></div>
      <div style={{ position: 'relative', zIndex: 10 }}>
        <HeroSection />
        <LogosSection />
        <FeaturesSection />
        <IntegrationsSection />
        <ProcessSection />
        <TestimonialsSection />
        <CTASection />
        <RegionalSection contextPath="ki-agentur" />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
