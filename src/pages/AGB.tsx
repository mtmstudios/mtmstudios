import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

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
    <div className="text-muted-foreground text-base leading-relaxed space-y-3">{children}</div>
  </motion.section>
);

const NumberedList = ({ items }: { items: string[] }) => (
  <ol className="space-y-2 mt-2 list-none">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3">
        <span className="text-accent/70 font-medium shrink-0 w-5 text-right">{i + 1}.</span>
        <span>{item}</span>
      </li>
    ))}
  </ol>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2 mt-2">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3">
        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const AGB = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title="AGB | MTM Studios" description="Allgemeine Geschäftsbedingungen von MTM Studios für KI-Automatisierung und digitale Lösungen." />
      <Navigation />
      <main className="container mx-auto px-6 pt-32 pb-20 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: appleEase }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Allgemeine Geschäftsbedingungen</h1>
          <p className="text-muted-foreground text-base">Stand: Januar 2026</p>
          <div className="mt-6 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        </motion.div>

        <div className="space-y-5">
          <Section title="I. Geltungsbereich">
            <NumberedList items={[
              "Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen der MTMstudios (nachfolgend \u201EMTMstudios\u201C) und ihren Auftraggebern, soweit nicht ausdrücklich etwas anderes schriftlich vereinbart wurde.",
              "Diese AGB gelten ausschließlich gegenüber Unternehmern im Sinne des § 14 BGB.",
              "Die AGB gelten für sämtliche Leistungen von MTMstudios, insbesondere für Webdesign, Webhosting-nahe Leistungen, Online-Marketing, Automatisierungen, KI-Telefonie, KI-Chatbots sowie sonstige digitale Dienstleistungen.",
              "Abweichende Bedingungen des Auftraggebers gelten nur, wenn MTMstudios ihrer Geltung ausdrücklich schriftlich zugestimmt hat.",
            ]} />
          </Section>

          <Section title="II. Vertragsinhalt und Vertragsschluss">
            <NumberedList items={[
              "Angebote von MTMstudios sind freibleibend und unverbindlich.",
              "Ein Vertrag kommt durch schriftliche Bestätigung, Leistungsbeginn oder Rechnungsstellung zustande.",
              "Mündliche Nebenabreden bedürfen der schriftlichen Bestätigung.",
              "Leistungsbeschreibungen werden nur dann Vertragsbestandteil, wenn ausdrücklich Bezug genommen wird.",
            ]} />
          </Section>

          <Section title="III. Vertragsdauer und Kündigung">
            <NumberedList items={[
              "Die Vertragslaufzeit ergibt sich aus dem jeweiligen Vertrag.",
              "Eine ordentliche Kündigung während der Laufzeit ist ausgeschlossen, sofern nichts anderes vereinbart wurde.",
              "Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.",
            ]} />
          </Section>

          <Section title="IV. Vergütung und Zahlungsbedingungen">
            <NumberedList items={[
              "Es gelten die vereinbarten Preise zzgl. gesetzlicher Umsatzsteuer.",
              "Rechnungen sind innerhalb von 14 Tagen fällig.",
              "Bei Zahlungsverzug ist MTMstudios berechtigt, Verzugszinsen in Höhe von 9 Prozentpunkten über dem Basiszinssatz zu verlangen.",
              "Eine Aufrechnung ist nur mit unbestrittenen oder rechtskräftig festgestellten Forderungen zulässig.",
            ]} />
          </Section>

          <Section title="V. Mitwirkungspflichten">
            <p>Der Auftraggeber verpflichtet sich, alle zur Leistungserbringung erforderlichen Inhalte und Informationen rechtzeitig bereitzustellen.</p>
          </Section>

          <Section title="VI. Gewährleistung">
            <p>MTMstudios erbringt Leistungen nach dem Stand der Technik. Gewährleistungsansprüche verjähren innerhalb von 12 Monaten.</p>
          </Section>

          <Section title="VII. Haftung">
            <p>MTMstudios haftet unbeschränkt bei Vorsatz, grober Fahrlässigkeit sowie bei Verletzung von Leben, Körper oder Gesundheit. Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist die Haftung auf den vorhersehbaren Schaden begrenzt.</p>
          </Section>

          <Section title="VIII. Datenschutz">
            <p>
              Die Verarbeitung personenbezogener Daten erfolgt ausschließlich nach den geltenden Datenschutzgesetzen. Weitere Informationen ergeben sich aus der{" "}
              <Link to="/datenschutz" className="text-accent hover:underline">Datenschutzerklärung</Link> von MTMstudios.
            </p>
          </Section>

          <Section title="IX. Schlussbestimmungen">
            <p>Es gilt deutsches Recht. Gerichtsstand ist — soweit zulässig — der Sitz von MTMstudios.</p>
          </Section>

          {/* AVV Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: appleEase }}
            className="mt-10 pt-8"
          >
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Auftragsverarbeitungsvereinbarung (AVV)</h2>
              <p className="text-muted-foreground text-sm mt-1">nach Art. 28 DSGVO</p>
              <div className="mt-4 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
            </div>
          </motion.div>

          <Section title="Gegenstand der Verarbeitung">
            <p>MTMstudios verarbeitet personenbezogene Daten ausschließlich im Auftrag des jeweiligen Kunden im Rahmen der vertraglich vereinbarten Leistungen.</p>
            <p className="mt-3 font-medium text-foreground">Die Verarbeitung kann insbesondere folgende Tätigkeiten umfassen:</p>
            <BulletList items={[
              "Betrieb von Websites und Formularen",
              "KI-gestützte Telefonie und Voicebots",
              "Chatbots und automatisierte Kommunikation",
              "Automationen (z. B. n8n)",
              "Hosting-nahe technische Leistungen",
            ]} />
          </Section>

          <Section title="Verarbeitete Daten">
            <p>Verarbeitete Daten können u. a. sein:</p>
            <BulletList items={[
              "Kontakt- und Stammdaten",
              "Kommunikationsinhalte (Telefon, Chat)",
              "Bewerber- und Lead-Daten",
              "Technische Metadaten",
            ]} />
          </Section>

          <Section title="Technische und organisatorische Maßnahmen">
            <p>MTMstudios setzt geeignete technische und organisatorische Maßnahmen gemäß Art. 32 DSGVO ein.</p>
          </Section>

          <Section title="Subdienstleister">
            <p className="font-medium text-foreground">Eingesetzte Subdienstleister:</p>
            <p>Replit, Mittwald, Twilio, OpenAI, Voico, n8n Cloud</p>
            <p className="mt-3">Eine Datenverarbeitung in Drittländern (z. B. USA) kann erfolgen und basiert auf geeigneten Garantien gemäß Art. 44 ff. DSGVO, insbesondere Standardvertragsklauseln.</p>
            <p className="mt-3">Die vollständige AVV wird dem Auftraggeber auf Wunsch zur Verfügung gestellt.</p>
          </Section>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 pt-6 border-t border-white/[0.06] flex items-center gap-3 text-sm text-muted-foreground"
        >
          <Link to="/impressum" className="text-accent hover:underline">Impressum</Link>
          <span>·</span>
          <Link to="/datenschutz" className="text-accent hover:underline">Datenschutz</Link>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default AGB;
