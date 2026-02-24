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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const scrollPosition = window.scrollY;
        const maxScroll = 300;
        const opacity = Math.max(0.3, 1 - (scrollPosition / maxScroll) * 0.7);
        videoRef.current.style.opacity = opacity.toString();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <SEOHead title="KI-Automatisierung für Unternehmen | MTM Studios" description="KI-Automatisierung von MTM Studios. Wir automatisieren eure Geschäftsprozesse — effizient, skalierbar und DSGVO-konform." />
      <div
        className="fixed inset-0 w-screen h-screen overflow-hidden"
        style={{ isolation: "isolate", zIndex: 0 }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-opacity duration-300"
          style={{
            mixBlendMode: "hard-light",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            filter: "brightness(0.7) contrast(2)",
          }}
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
      </div>

      <div style={{ position: "relative", zIndex: 50 }}>
        <Navigation />
      </div>

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
