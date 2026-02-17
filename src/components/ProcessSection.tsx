import { MessageSquare, Lightbulb, Cog, Rocket, Handshake, LucideIcon } from "lucide-react";

const steps: { number: string; title: string; icon: LucideIcon; description: string }[] = [
  {
    number: "01",
    title: "Erstgespräch & Analyse",
    icon: MessageSquare,
    description: "Wir lernen euer Unternehmen kennen, analysieren Prozesse und identifizieren Potenziale.",
  },
  {
    number: "02",
    title: "Konzept & Strategie",
    icon: Lightbulb,
    description: "Basierend auf der Analyse entwickeln wir eine maßgeschneiderte Strategie und einen klaren Plan.",
  },
  {
    number: "03",
    title: "Umsetzung & Integration",
    icon: Cog,
    description: "Wir entwickeln die Lösung und integrieren sie nahtlos in eure bestehenden Systeme.",
  },
  {
    number: "04",
    title: "Testing & Go-Live",
    icon: Rocket,
    description: "Gründliches Testen, Feinschliff und begleiteter Launch eurer neuen KI-Lösung.",
  },
  {
    number: "05",
    title: "Langfristige Partnerschaft",
    icon: Handshake,
    description: "Kontinuierliche Optimierung, Skalierung und persönlicher Support als euer KI-Partner.",
  },
];

const ProcessSection = () => {
  return (
    <section id="prozess" className="py-20 px-4 bg-muted/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-neon/10 text-neon border border-neon/20 mb-4">
            So funktioniert's
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Von der Idee zur Lösung
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`relative max-w-2xl border-l-4 border-neon bg-white/5 backdrop-blur-md rounded-xl p-8 ${
                index % 2 === 1 ? "md:ml-auto" : ""
              }`}
            >
              <span className="absolute top-4 right-6 text-6xl font-bold text-neon/10 select-none pointer-events-none">
                {step.number}
              </span>
              <div className="relative">
                <step.icon className="w-5 h-5 text-neon/60 mb-3" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
