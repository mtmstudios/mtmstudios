import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, MapPin, Phone, MessageSquare, Zap } from "lucide-react";

const appleEase = [0.16, 1, 0.3, 1] as const;

/**
 * StuttgartTeaser — interner Link-Block für "KI Agentur Stuttgart"
 * Stärkt das interne Linking-Signal für /ki-agentur/stuttgart
 */
const StuttgartTeaser = () => (
  <section className="py-20 px-6" aria-label="KI Agentur Stuttgart">
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: appleEase }}
        className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-12"
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-4 h-4 text-accent" />
          <span className="text-accent text-sm font-semibold tracking-wide uppercase">Schwerpunkt Region</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Text */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
              KI Agentur Stuttgart —<br />
              <span className="text-accent">lokal, schnell, messbar</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              MTM Studios ist die KI Agentur für den Stuttgarter Mittelstand. Wir automatisieren
              Telefon, Kundenservice und Geschäftsprozesse — für Handwerk, Praxen, Kanzleien
              und Dienstleister in Stuttgart, Vaihingen, Bad Cannstatt, Möhringen und der gesamten Region.
            </p>
            <Link
              to="/ki-agentur/stuttgart"
              className="inline-flex items-center gap-2 bg-accent text-black font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity text-sm"
            >
              KI Agentur Stuttgart entdecken
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right: Mini-Cards */}
          <div className="grid grid-cols-1 gap-3">
            {[
              { icon: Phone, label: "Voice KI Telefonassistent Stuttgart", desc: "Jeder Anruf angenommen — 24/7", href: "/ki-telefonassistent/stuttgart" },
              { icon: MessageSquare, label: "KI-Chatbot Stuttgart", desc: "WhatsApp & Website, sofort live", href: "/ki-chatbot/stuttgart" },
              { icon: Zap, label: "KI-Automatisierung Stuttgart", desc: "n8n Prozesse in 1–2 Wochen", href: "/automatisierungen/stuttgart" },
            ].map(({ icon: Icon, label, desc, href }) => (
              <Link
                key={href}
                to={href}
                className="flex items-center gap-4 p-4 rounded-xl border border-white/08 bg-white/[0.02] hover:border-accent/30 hover:bg-white/[0.04] transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <div className="text-foreground text-sm font-medium group-hover:text-accent transition-colors">{label}</div>
                  <div className="text-muted-foreground text-xs">{desc}</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default StuttgartTeaser;
