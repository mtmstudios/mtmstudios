import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { motion } from "motion/react";

const appleEase = [0.16, 1, 0.3, 1] as const;

const Section = ({ title, children, delay = 0 }: { title: string; children: React.ReactNode; delay?: number }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay, ease: appleEase }}
    className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 md:p-8"
  >
    <h2 className="text-xl font-semibold text-foreground mb-4">{title}</h2>
    <div className="text-muted-foreground text-base leading-relaxed">{children}</div>
  </motion.section>
);

const Barrierefreiheit = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Barrierefreiheitserklärung | MTM Studios"
        description="Erklärung zur Barrierefreiheit der Website mtmstudios.de gemäß BFSG und BITV 2.0."
      />
      <Navigation />
      <div>
        <main id="main" className="container mx-auto px-6 pt-32 pb-20 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: appleEase }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Barrierefreiheitserklärung</h1>
            <p className="text-muted-foreground text-base">Gemäß BFSG und BITV 2.0</p>
            <div className="mt-6 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          </motion.div>

          <div className="space-y-5">
            <Section title="Stand der Barrierefreiheit" delay={0.1}>
              <p>
                Diese Website ist <strong>teilweise barrierefrei</strong>. Wir arbeiten kontinuierlich daran, die
                Barrierefreiheit unserer Website zu verbessern und die Anforderungen der BITV 2.0 (Barrierefreie-Informationstechnik-Verordnung)
                sowie des Barrierefreiheitsstärkungsgesetzes (BFSG) zu erfüllen.
              </p>
            </Section>

            <Section title="Geltungsbereich" delay={0.15}>
              <p>
                Diese Erklärung gilt für die unter <strong>mtmstudios.de</strong> veröffentlichte Website der MTM Studios.
              </p>
            </Section>

            <Section title="Nicht barrierefreie Inhalte" delay={0.2}>
              <p className="mb-3">Die nachfolgend aufgeführten Inhalte sind aus den angegebenen Gründen noch nicht vollständig barrierefrei:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Videos ohne Untertitel:</strong> Das Hintergrundvideo auf der Startseite verfügt derzeit nicht über Untertitel oder eine Audiodeskription. Es handelt sich um ein rein dekoratives Element ohne informationsrelevanten Inhalt.</li>
                <li><strong>Komplexe Animationen:</strong> Einige Seitenabschnitte verwenden Animationen und Bewegungseffekte, die für Nutzer mit vestibulären Störungen problematisch sein können. Über das Barrierefreiheits-Widget (Symbol unten links) können Animationen reduziert werden.</li>
                <li><strong>Kontraste:</strong> In einzelnen Bereichen können die Kontrastwerte unter dem empfohlenen Mindestwert von 4.5:1 liegen. Über das Barrierefreiheits-Widget kann ein hoher Kontrastmodus aktiviert werden.</li>
                <li><strong>Drittanbieter-Inhalte:</strong> Eingebundene Drittanbieter-Inhalte (z.B. Icon-Bibliotheken, Schriftarten) unterliegen nicht unserer vollständigen Kontrolle.</li>
              </ul>
            </Section>

            <Section title="Erstellung dieser Erklärung" delay={0.25}>
              <p>
                Diese Erklärung wurde am <strong>25. Februar 2026</strong> erstellt. Die Bewertung basiert auf einer Selbstbewertung
                durch MTM Studios. Eine Überprüfung durch externe Prüfstellen ist geplant.
              </p>
            </Section>

            <Section title="Feedback und Kontakt" delay={0.3}>
              <p className="mb-3">
                Wenn Sie auf Barrieren auf unserer Website stoßen oder Informationen zur Umsetzung der Barrierefreiheit benötigen,
                kontaktieren Sie uns bitte:
              </p>
              <div className="bg-white/[0.03] rounded-xl border border-white/[0.06] p-4 space-y-1">
                <p><strong>E-Mail:</strong>{" "}
                  <a href="mailto:hallo@mtmstudios.de" className="text-accent hover:text-accent/80 transition-colors underline">
                    hallo@mtmstudios.de
                  </a>
                </p>
                <p><strong>Telefon / WhatsApp:</strong>{" "}
                  <a href="tel:+4915567077414" className="text-accent hover:text-accent/80 transition-colors underline">
                    +49 155 67077414
                  </a>
                </p>
              </div>
              <p className="mt-3">
                Wir bemühen uns, Ihre Anfrage innerhalb von <strong>zwei Wochen</strong> zu beantworten und eine Lösung zu finden.
              </p>
            </Section>

            <Section title="Durchsetzungsverfahren" delay={0.35}>
              <p>
                Sollten Sie nach Ihrer Kontaktaufnahme keine zufriedenstellende Lösung erhalten, können Sie sich an die
                zuständige Durchsetzungsstelle wenden:
              </p>
              <div className="bg-white/[0.03] rounded-xl border border-white/[0.06] p-4 mt-3 space-y-1">
                <p><strong>Bundesfachstelle Barrierefreiheit</strong></p>
                <p>Schlichtungsstelle nach § 16 BGG</p>
                <p>Mauerstraße 53, 10117 Berlin</p>
                <p>Telefon:{" "}
                  <a href="tel:+493018527-2805" className="text-accent hover:text-accent/80 transition-colors underline">
                    +49 30 18527-2805
                  </a>
                </p>
                <p>E-Mail:{" "}
                  <a href="mailto:info@schlichtungsstelle-bgg.de" className="text-accent hover:text-accent/80 transition-colors underline">
                    info@schlichtungsstelle-bgg.de
                  </a>
                </p>
                <p>Website:{" "}
                  <a href="https://www.schlichtungsstelle-bgg.de" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 transition-colors underline">
                    www.schlichtungsstelle-bgg.de
                  </a>
                </p>
              </div>
            </Section>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Barrierefreiheit;
