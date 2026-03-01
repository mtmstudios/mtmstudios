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

const Impressum = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title="Impressum | MTM Studios" description="Impressum von MTM Studios — Angaben gemäß § 5 TMG." />
      <Navigation />
      <div>
        <main className="container mx-auto px-6 pt-32 pb-20 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: appleEase }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Impressum</h1>
            <p className="text-muted-foreground text-base">Angaben gemäß § 5 TMG</p>
            <div className="mt-6 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          </motion.div>

          <div className="space-y-5">
            <Section title="Angaben gemäß § 5 TMG" delay={0.1}>
              <p>
                MTM studios<br />
                Einzelunternehmen<br />
                Inhaber: Meron Ghebremicael<br />
                Hildebrandtstraße 32<br />
                40215 Düsseldorf<br />
                Deutschland
              </p>
            </Section>

            <Section title="Kontakt" delay={0.15}>
              <p>
                Telefon: <a href="tel:+4915567077413" className="text-accent hover:underline">0155-67077413</a><br />
                E-Mail: <a href="mailto:hallo@mtmstudios.de" className="text-accent hover:underline">hallo@mtmstudios.de</a>
              </p>
            </Section>

            <Section title="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV" delay={0.2}>
              <p>
                Meron Ghebremicael<br />
                Hildebrandtstraße 32<br />
                40215 Düsseldorf
              </p>
            </Section>

            <Section title="Streitschlichtung" delay={0.25}>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p className="mt-3">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </Section>

            <Section title="Haftung für Inhalte" delay={0.3}>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
            </Section>

            <Section title="Haftung für Links" delay={0.35}>
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
            </Section>

            <Section title="Urheberrecht" delay={0.4}>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </Section>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Impressum;
