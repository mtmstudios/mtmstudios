import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

const appleEase = [0.16, 1, 0.3, 1] as const;

const testimonials = [
  {
    name: "Thomas Müller",
    role: "Vertriebsleiter",
    text: "Seit der Automatisierung unseres Sales-Prozesses sparen wir pro Woche über 15 Stunden manuelle Arbeit. Die Leads werden automatisch qualifiziert und unser Team kann sich auf die wirklich wichtigen Gespräche konzentrieren.",
  },
  {
    name: "Dr. Lisa Weber",
    role: "Praxismanagerin",
    text: "Der KI-Telefonassistent hat unsere Erreichbarkeit komplett verändert. Kein Patient landet mehr in der Warteschleife – Termine werden rund um die Uhr automatisch vergeben. Das Team ist deutlich entlastet.",
  },
  {
    name: "Marco Hoffmann",
    role: "Geschäftsführer",
    text: "Der Chatbot auf unserer Website beantwortet 80% der Kundenanfragen sofort – von Preisanfragen bis zur Terminbuchung. Wir bekommen jetzt deutlich mehr qualifizierte Anfragen als vorher.",
  },
  {
    name: "Stefan Krause",
    role: "Projektleiter",
    text: "Mit dem WhatsApp-Bot können unsere Bauleiter Projektupdates direkt vom Handy abfragen und Statusberichte automatisch erstellen lassen. Das spart uns jeden Tag mindestens eine Stunde Dokumentation.",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);


  const t = testimonials[current];

  return (
    <section className="py-32 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-foreground mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: appleEase }}
        >
          Was unsere Kunden sagen
        </motion.h2>

        <div className="min-h-[200px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8, ease: appleEase }}
              className="flex flex-col items-center gap-8"
            >
              <p className="text-xl md:text-2xl lg:text-3xl font-light text-foreground/90 leading-relaxed italic">
                „{t.text}"
              </p>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                i === current ? "bg-foreground w-4" : "bg-foreground/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
