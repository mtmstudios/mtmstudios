import { Phone, MessageCircle, Workflow } from "lucide-react";
import { Card } from "@/components/ui/card";

const FeaturesSection = () => {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon/10 border border-neon/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-neon"></div>
            <span className="text-sm text-neon font-medium">Was wir anbieten</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Unsere Lösungen
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Intelligente KI-Lösungen, die euer Business effizienter machen –
            von automatisierten Anrufen bis hin zu smarten Chatbots.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* KI-Telefonassistent — tall left card */}
          <Card className="group relative p-8 md:row-span-2 bg-card/50 backdrop-blur-sm border-border/50 hover:border-neon/50 transition-all duration-300 hover:shadow-lg hover:shadow-neon/10 flex flex-col justify-between">
            <div>
              <div className="mb-6 w-14 h-14 rounded-xl bg-neon/10 flex items-center justify-center group-hover:bg-neon/20 transition-colors">
                <Phone className="w-7 h-7 text-neon" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                KI-Telefonassistent
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Euer KI-Assistent nimmt Anrufe entgegen, beantwortet Fragen und
                leitet wichtige Anfragen weiter – rund um die Uhr, ohne Wartezeit.
              </p>
            </div>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          </Card>

          {/* WhatsApp & Chatbots */}
          <Card className="group relative p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-neon/50 transition-all duration-300 hover:shadow-lg hover:shadow-neon/10">
            <div className="mb-6 w-14 h-14 rounded-xl bg-neon/10 flex items-center justify-center group-hover:bg-neon/20 transition-colors">
              <MessageCircle className="w-7 h-7 text-neon" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">
              WhatsApp & Chatbots
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Intelligente Chatbots für WhatsApp und eure Website, die
              Kundenanfragen sofort beantworten und Leads qualifizieren.
            </p>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          </Card>

          {/* Automatisierungen */}
          <Card className="group relative p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-neon/50 transition-all duration-300 hover:shadow-lg hover:shadow-neon/10">
            <div className="mb-6 w-14 h-14 rounded-xl bg-neon/10 flex items-center justify-center group-hover:bg-neon/20 transition-colors">
              <Workflow className="w-7 h-7 text-neon" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Automatisierungen
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Wiederkehrende Aufgaben automatisieren – von E-Mail-Workflows bis
              zur Datenverarbeitung. Mehr Effizienz, weniger manueller Aufwand.
            </p>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
