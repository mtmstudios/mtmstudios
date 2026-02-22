import { TestimonialCard, type TestimonialAuthor } from "@/components/ui/testimonial-card";

const testimonials: { author: TestimonialAuthor; text: string }[] = [
  {
    author: { name: "Thomas Müller", role: "Vertriebsleiter" },
    text: "Seit der Automatisierung unseres Sales-Prozesses sparen wir pro Woche über 15 Stunden manuelle Arbeit. Die Leads werden automatisch qualifiziert und unser Team kann sich auf die wirklich wichtigen Gespräche konzentrieren.",
  },
  {
    author: { name: "Dr. Lisa Weber", role: "Praxismanagerin" },
    text: "Der KI-Telefonassistent hat unsere Erreichbarkeit komplett verändert. Kein Patient landet mehr in der Warteschleife – Termine werden rund um die Uhr automatisch vergeben. Das Team ist deutlich entlastet.",
  },
  {
    author: { name: "Marco Hoffmann", role: "Geschäftsführer" },
    text: "Der Chatbot auf unserer Website beantwortet 80% der Kundenanfragen sofort – von Preisanfragen bis zur Terminbuchung. Wir bekommen jetzt deutlich mehr qualifizierte Anfragen als vorher.",
  },
  {
    author: { name: "Stefan Krause", role: "Projektleiter" },
    text: "Mit dem WhatsApp-Bot können unsere Bauleiter Projektupdates direkt vom Handy abfragen und Statusberichte automatisch erstellen lassen. Das spart uns jeden Tag mindestens eine Stunde Dokumentation.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-32 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Was unsere Kunden sagen
          </h2>
        </div>
      </div>

      <div
        className="relative"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div
          className="flex animate-marquee"
          style={{ "--duration": "40s", "--gap": "24px", gap: "var(--gap)" } as React.CSSProperties}
        >
          {[...Array(4)].map((_, setIndex) =>
            testimonials.map((t, i) => (
              <TestimonialCard key={`${setIndex}-${i}`} author={t.author} text={t.text} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
