import { useState, useEffect, useRef } from "react";
import { Clock, ClipboardList, Shield } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PageBackground from "@/components/PageBackground";
import logo from "@/assets/logo-2.png";

const VoiceKI = () => {
  const [formData, setFormData] = useState({ name: "", company: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsFormVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (formRef.current) observer.observe(formRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (typeof (window as any).fbq === "function") {
      (window as any).fbq("track", "Lead");
    }
  };

  const problems = [
    "Anrufe gehen verloren während Sie beim Kunden sind",
    "Interessenten rufen die Konkurrenz an — nicht zurück",
    "Kein Mitarbeiter für Telefon verfügbar",
    "Abends und am Wochenende unerreichbar",
  ];

  const features = [
    { icon: Clock, title: "24/7 Erreichbar", desc: "Jeder Anruf wird angenommen — auch nachts und am Wochenende" },
    { icon: ClipboardList, title: "Leads erfassen", desc: "Name, Anliegen und Rückrufnummer werden automatisch gespeichert" },
    { icon: Shield, title: "DSGVO-konform", desc: "Server in Deutschland, keine Datenweitergabe" },
  ];

  const audiences = ["Handwerker", "Arztpraxen", "Dienstleister", "Immobilien"];

  const faqs = [
    { q: "Was kostet die Voice KI?", a: "Die Kosten hängen vom Gesprächsvolumen ab. In einem kurzen Gespräch ermitteln wir gemeinsam das passende Paket für Ihr Unternehmen." },
    { q: "Wie schnell ist sie einsatzbereit?", a: "In der Regel ist Ihre Voice KI innerhalb von 48 Stunden aktiv — inklusive individueller Konfiguration." },
    { q: "Kann sie auch Termine buchen?", a: "Ja. Die KI kann Termine direkt in Ihren Kalender eintragen oder Anfragen für Sie erfassen." },
    { q: "Was passiert mit den Gesprächsdaten?", a: "Alle Daten werden auf deutschen Servern gespeichert und nicht an Dritte weitergegeben. Vollständig DSGVO-konform." },
  ];

  return (
    <div className="min-h-screen text-white font-['Inter',sans-serif] relative">
      {/* Globe background — same as other pages */}
      <PageBackground />

      {/* All content sits above the background */}
      <div className="relative z-10">
        {/* ===== SECTION 1 — Hero ===== */}
        <section className="px-5 pt-8 pb-16 md:pt-12 md:pb-24 max-w-3xl mx-auto text-center">
          <div className="flex justify-center md:justify-start mb-12 md:mb-16">
            <img
              src={logo}
              alt="MTM Studios Logo"
              className="h-8 md:h-10 object-contain"
              loading="eager"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-4">
            Nie wieder verpasste Anrufe.
          </h1>
          <p className="text-lg md:text-xl font-medium mb-6 text-accent">
            Ihr KI-Telefonassistent — fertig in 48 Stunden
          </p>
          <p className="text-sm mb-10 text-muted-foreground">
            ★★★★★&nbsp;&nbsp;Bereits von 12+ Unternehmen in Bayern genutzt
          </p>
          <button
            onClick={scrollToForm}
            className="w-full md:w-auto md:px-12 py-4 rounded-xl font-semibold text-base text-black transition-all hover:brightness-110 active:scale-[0.98]"
            style={{ backgroundColor: "#22C55E" }}
          >
            Jetzt kostenlos Demo anfragen
          </button>
        </section>

        {/* ===== SECTION 2 — Problem ===== */}
        <section className="px-5 py-16 md:py-24 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Was passiert gerade in Ihrem Unternehmen?
          </h2>
          <div className="space-y-4">
            {problems.map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-xl bg-card border border-white/[0.08] backdrop-blur-sm"
              >
                <span className="text-xl shrink-0 mt-0.5">❌</span>
                <p className="text-muted-foreground">{p}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== SECTION 3 — Demo Bot ===== */}
        <section className="px-5 py-16 md:py-24 max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full text-accent bg-accent/10 border border-accent/20">
            LIVE DEMO
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Sprechen Sie jetzt mit unserer Voice KI
          </h2>
          <div
            id="demo-bot"
            className="w-full min-h-[400px] md:min-h-[500px] rounded-xl flex items-center justify-center bg-card border border-white/[0.08] backdrop-blur-sm overflow-hidden"
          >
            {/* Embed code will be inserted here */}
            <p className="text-sm text-muted-foreground">
              [ Demo-Bot Embed wird hier eingefügt ]
            </p>
          </div>
          <p className="text-sm mt-4 text-muted-foreground">
            Echte KI — kein Script. So klingt Ihr zukünftiger KI-Mitarbeiter.
          </p>
        </section>

        {/* ===== SECTION 4 — Features ===== */}
        <section className="px-5 py-16 md:py-24 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div
                key={i}
                className="p-6 rounded-xl text-center bg-card border border-white/[0.08] backdrop-blur-sm"
              >
                <f.icon className="mx-auto mb-4 text-accent" size={32} />
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== SECTION 5 — Target Audience ===== */}
        <section className="px-5 py-16 md:py-24 max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full text-accent bg-accent/10 border border-accent/20">
            PERFEKT FÜR
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Branchenunabhängig einsetzbar
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {audiences.map((a, i) => (
              <span
                key={i}
                className="px-5 py-2 text-sm font-medium rounded-full bg-white/5 border border-white/10"
              >
                {a}
              </span>
            ))}
          </div>
          <p className="text-muted-foreground">
            Wenn Sie Anrufe erhalten, hilft Ihnen unsere Voice KI — egal in welcher Branche.
          </p>
        </section>

        {/* ===== SECTION 6 — Lead Form ===== */}
        <section className="px-5 py-16 md:py-24 max-w-xl mx-auto" id="lead-form" ref={formRef}>
          <div className="p-8 rounded-xl bg-card border border-white/[0.08] backdrop-blur-sm border-t-2 border-t-accent">
            {submitted ? (
              <div className="text-center py-8">
                <p className="text-xl font-semibold mb-2">Vielen Dank! 🎉</p>
                <p className="text-muted-foreground">
                  Wir melden uns innerhalb von 24 Stunden.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-center mb-2">
                  Jetzt unverbindlich Demo anfragen
                </h2>
                <p className="text-sm text-center mb-8 text-muted-foreground">
                  Wir melden uns innerhalb von 24 Stunden
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    required
                    placeholder="Ihr Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background text-foreground placeholder:text-muted-foreground/50 text-sm outline-none border border-white/10 focus:ring-2 focus:ring-accent"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Unternehmen"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background text-foreground placeholder:text-muted-foreground/50 text-sm outline-none border border-white/10 focus:ring-2 focus:ring-accent"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Telefonnummer"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background text-foreground placeholder:text-muted-foreground/50 text-sm outline-none border border-white/10 focus:ring-2 focus:ring-accent"
                  />
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-semibold text-base text-black transition-all hover:brightness-110 active:scale-[0.98]"
                    style={{ backgroundColor: "#22C55E" }}
                  >
                    Demo anfragen →
                  </button>
                </form>
                <p className="text-xs text-center mt-4 text-muted-foreground/60">
                  🔒 Keine Weitergabe · DSGVO-konform · Kein Spam
                </p>
              </>
            )}
          </div>
        </section>

        {/* ===== SECTION 7 — FAQ ===== */}
        <section className="px-5 py-16 md:py-24 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Häufige Fragen
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border-0 rounded-xl overflow-hidden bg-card border border-white/[0.08] backdrop-blur-sm"
              >
                <AccordionTrigger className="px-6 py-5 text-left font-medium hover:no-underline text-white">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* ===== SECTION 8 — Final CTA ===== */}
        <section className="px-5 py-16 md:py-24 text-center bg-card/80 backdrop-blur-sm">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Noch Fragen?</h2>
          <p className="mb-8 text-muted-foreground">
            Wir melden uns innerhalb von 2 Stunden.
          </p>
          <button
            onClick={scrollToForm}
            className="px-10 py-4 rounded-xl font-semibold text-base text-black transition-all hover:brightness-110 active:scale-[0.98]"
            style={{ backgroundColor: "#22C55E" }}
          >
            Jetzt Demo anfragen
          </button>
        </section>

        {/* ===== Footer ===== */}
        <footer className="px-5 py-8 text-center text-xs text-muted-foreground/60">
          © 2025 MTM Studios ·{" "}
          <a href="/datenschutz" className="hover:underline">Datenschutz</a> ·{" "}
          <a href="/impressum" className="hover:underline">Impressum</a>
        </footer>
      </div>

      {/* ===== Floating Mobile CTA ===== */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden transition-transform duration-300 ${
          isFormVisible ? "translate-y-full" : "translate-y-0"
        }`}
        style={{ backgroundColor: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <button
          onClick={scrollToForm}
          className="w-full py-3.5 rounded-xl font-semibold text-sm text-black active:scale-[0.98]"
          style={{ backgroundColor: "#22C55E" }}
        >
          Demo anfragen
        </button>
      </div>
    </div>
  );
};

export default VoiceKI;
