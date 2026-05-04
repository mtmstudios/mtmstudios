import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, MapPin, Phone, MessageSquare, Zap } from "lucide-react";

const appleEase = [0.16, 1, 0.3, 1] as const;

const stadtConfig = [
  {
    slug: "stuttgart",
    badge: "STR",
    name: "KI Agentur Stuttgart",
    tagline: "lokal, schnell, messbar",
    desc: "Für Handwerk, Praxen, Kanzleien und Dienstleister in Stuttgart, Vaihingen, Bad Cannstatt, Möhringen und der gesamten Region.",
    href: "/ki-agentur/stuttgart",
    services: [
      { icon: Phone, label: "Voice KI Telefonassistent Stuttgart", desc: "Jeder Anruf angenommen — 24/7", href: "/ki-telefonassistent/stuttgart" },
      { icon: MessageSquare, label: "KI-Chatbot Stuttgart", desc: "WhatsApp & Website, sofort live", href: "/ki-chatbot/stuttgart" },
      { icon: Zap, label: "KI-Automatisierung Stuttgart", desc: "n8n Prozesse in 1–2 Wochen", href: "/automatisierungen/stuttgart" },
    ],
  },
  {
    slug: "ulm",
    badge: "ULM",
    name: "KI Agentur Ulm",
    tagline: "Mittelstand trifft Innovation",
    desc: "Für Handwerk, Praxen und Dienstleister in Ulm, Neu-Ulm, Söflingen, Wiblingen und der gesamten Region Ulm/Alb-Donau.",
    href: "/ki-agentur/ulm",
    services: [
      { icon: Phone, label: "Voice KI Telefonassistent Ulm", desc: "Kein Anruf geht mehr verloren", href: "/ki-telefonassistent/ulm" },
      { icon: MessageSquare, label: "KI-Chatbot Ulm", desc: "WhatsApp & Website automatisiert", href: "/ki-chatbot/ulm" },
      { icon: Zap, label: "KI-Automatisierung Ulm", desc: "n8n Workflows, schnell umgesetzt", href: "/automatisierungen/ulm" },
    ],
  },
];

/**
 * StandortTeaser — interne Link-Sektion für Stuttgart & Ulm
 * Stärkt das interne Linking-Signal für beide Standort-Seiten
 */
const StandortTeaser = () => (
  <section className="py-20 px-6" aria-label="KI Agentur Standorte Stuttgart und Ulm">
    <div className="max-w-5xl mx-auto">
      {/* Eyebrow */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <MapPin className="w-4 h-4 text-accent" />
        <span className="text-accent text-sm font-semibold tracking-wide uppercase">Schwerpunktregionen</span>
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: appleEase }}
        className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10"
      >
        KI Agentur für Baden-Württemberg
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-6">
        {stadtConfig.map((stadt, i) => (
          <motion.div
            key={stadt.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: appleEase, delay: i * 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8 flex flex-col"
          >
            {/* City header */}
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-[11px] bg-accent/15 text-accent border border-accent/20 rounded-full px-2.5 py-0.5 font-bold tracking-wide">
                {stadt.badge}
              </span>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-1 leading-tight">
              {stadt.name} —<br />
              <span className="text-accent">{stadt.tagline}</span>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5 mt-2">
              {stadt.desc}
            </p>
            <Link
              to={stadt.href}
              className="inline-flex items-center gap-2 bg-accent text-black font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity text-sm mb-5 self-start"
            >
              {stadt.name} entdecken
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Service mini-cards */}
            <div className="flex flex-col gap-2 mt-auto">
              {stadt.services.map(({ icon: Icon, label, desc, href }) => (
                <Link
                  key={href}
                  to={href}
                  className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-accent/30 hover:bg-white/[0.04] transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-foreground text-xs font-medium group-hover:text-accent transition-colors truncate">{label}</div>
                    <div className="text-muted-foreground text-[11px]">{desc}</div>
                  </div>
                  <ArrowRight className="w-3 h-3 text-muted-foreground ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StandortTeaser;
