import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import ChatbotHero from "@/components/chatbot/ChatbotHero";
import ChatbotProblem from "@/components/chatbot/ChatbotProblem";
import ChatbotHowItWorks from "@/components/chatbot/ChatbotHowItWorks";
import ChatbotFeatures from "@/components/chatbot/ChatbotFeatures";
import ChannelsSection from "@/components/chatbot/ChannelsSection";
import ChatbotUseCases from "@/components/chatbot/ChatbotUseCases";
import ChatbotTestimonial from "@/components/chatbot/ChatbotTestimonial";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import RegionalSection from "@/components/RegionalSection";
import { useEffect, useRef } from "react";

const Chatbots = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <SEOHead title="KI-Chatbot für WhatsApp & Website | MTM Studios" description="KI-Chatbot von MTM Studios. Automatisierte Kundenkommunikation auf WhatsApp, Website und mehr — rund um die Uhr." />
      <div
        className="fixed inset-0 w-screen h-screen overflow-hidden"
        style={{ isolation: "isolate", zIndex: 0 }}
      >
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="auto"
          src="/videos/hero-background.mp4"
          className="w-full h-full object-cover transition-opacity duration-300"
          style={{
            mixBlendMode: "hard-light",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            filter: "brightness(0.7) contrast(2)",
            pointerEvents: "none",
          }}
        />
      </div>

      <div style={{ position: "relative", zIndex: 50 }}>
        <Navigation />
      </div>

      <div style={{ position: "relative", zIndex: 10 }}>
        <ChatbotHero />
        <ChatbotProblem />
        <ChatbotHowItWorks />
        <ChatbotFeatures />
        <ChannelsSection />
        <ChatbotUseCases />
        <ChatbotTestimonial />
        <CTASection />
        <RegionalSection contextPath="ki-chatbot" />
        <Footer />
      </div>
    </div>
  );
};

export default Chatbots;
