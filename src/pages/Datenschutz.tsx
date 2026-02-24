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

const Datenschutz = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title="Datenschutzerklärung | MTM Studios" description="Datenschutzerklärung von MTM Studios — Informationen zur Erhebung und Verarbeitung personenbezogener Daten." />
      <Navigation />
      <main className="container mx-auto px-6 pt-32 pb-20 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: appleEase }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Datenschutzerklärung</h1>
          <p className="text-muted-foreground text-base">Stand: Januar 2026</p>
          <div className="mt-6 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        </motion.div>

        <div className="space-y-5">
          <Section title="1. Datenschutz auf einen Blick">
            <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit deinen personenbezogenen Daten passiert, wenn du diese Website besuchst. Personenbezogene Daten sind alle Daten, mit denen du persönlich identifiziert werden kannst. Ausführliche Informationen zum Thema Datenschutz entnimmst du unserer unter diesem Text aufgeführten Datenschutzerklärung.</p>
          </Section>

          <Section title="2. Verantwortliche Stelle">
            <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
            <p className="mt-3 font-medium text-foreground">MTM studios</p>
            <p>Meron Ghebremicael<br />Hildebrandstraße 32<br />40215 Düsseldorf<br />Deutschland</p>
            <p className="mt-3">
              E-Mail: <a href="mailto:hallo@mtmstudios.de" className="text-accent hover:underline">hallo@mtmstudios.de</a><br />
              Telefon: <a href="tel:+4917697698466" className="text-accent hover:underline">+49 176 97698466</a>
            </p>
            <p className="mt-3">Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.</p>
          </Section>

          <Section title="3. Deine Rechte">
            <p>Du hast jederzeit folgende Rechte bezüglich deiner bei uns gespeicherten personenbezogenen Daten:</p>
            <BulletList items={[
              "Auskunftsrecht (Art. 15 DSGVO): Du kannst Auskunft über deine von uns verarbeiteten personenbezogenen Daten verlangen.",
              "Recht auf Berichtigung (Art. 16 DSGVO): Du kannst die Berichtigung unrichtiger Daten verlangen.",
              "Recht auf Löschung (Art. 17 DSGVO): Du kannst die Löschung deiner bei uns gespeicherten Daten verlangen.",
              "Recht auf Einschränkung (Art. 18 DSGVO): Du kannst die Einschränkung der Verarbeitung verlangen.",
              "Recht auf Datenübertragbarkeit (Art. 20 DSGVO): Du kannst verlangen, deine Daten in einem strukturierten Format zu erhalten.",
              "Widerspruchsrecht (Art. 21 DSGVO): Du kannst der Verarbeitung deiner Daten widersprechen.",
              "Widerrufsrecht: Erteilte Einwilligungen kannst du jederzeit für die Zukunft widerrufen.",
            ]} />
            <p className="mt-3">Zur Ausübung deiner Rechte wende dich bitte an die oben genannte verantwortliche Stelle.</p>
          </Section>

          <Section title="4. Beschwerderecht bei der Aufsichtsbehörde">
            <p>Wenn du der Ansicht bist, dass die Verarbeitung deiner personenbezogenen Daten gegen das Datenschutzrecht verstößt, hast du das Recht, dich bei einer Aufsichtsbehörde zu beschweren. Die für uns zuständige Aufsichtsbehörde ist:</p>
            <p className="mt-3 font-medium text-foreground">Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen</p>
            <p>Kavalleriestraße 2-4<br />40213 Düsseldorf</p>
            <p className="mt-2">
              Telefon: +49 211 38424-0<br />
              E-Mail: <a href="mailto:poststelle@ldi.nrw.de" className="text-accent hover:underline">poststelle@ldi.nrw.de</a><br />
              Website: <a href="https://www.ldi.nrw.de" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.ldi.nrw.de</a>
            </p>
          </Section>

          <Section title="5. Hosting">
            <p>Diese Website wird auf Servern der Google Cloud Platform gehostet.</p>
            <p className="mt-3 font-medium text-foreground">Anbieter:</p>
            <p>Google LLC<br />1600 Amphitheatre Parkway<br />Mountain View, CA 94043, USA</p>
            <p className="mt-3">Beim Besuch unserer Website werden automatisch folgende Daten in Server-Logfiles erfasst:</p>
            <BulletList items={[
              "IP-Adresse des anfragenden Rechners",
              "Datum und Uhrzeit der Anfrage",
              "Name und URL der abgerufenen Datei",
              "Übertragene Datenmenge",
              "Meldung, ob der Abruf erfolgreich war",
              "Browsertyp und -version",
              "Betriebssystem",
              "Referrer URL (zuvor besuchte Seite)",
            ]} />
            <p className="mt-3"><strong className="text-foreground">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der sicheren und effizienten Bereitstellung der Website).</p>
            <p><strong className="text-foreground">Speicherdauer:</strong> Die Server-Logfiles werden nach 14 Tagen automatisch gelöscht.</p>
            <p><strong className="text-foreground">Datenübermittlung in die USA:</strong> Google LLC ist unter dem EU-US Data Privacy Framework zertifiziert, was einen angemessenen Datenschutz gewährleistet.</p>
          </Section>

          <Section title="6. Cookies">
            <p>Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf deinem Endgerät gespeichert werden und die bestimmte Einstellungen und Daten zum Austausch mit unserem System speichern.</p>
            <h3 className="text-foreground font-medium mt-4 mb-2">Notwendige Cookies</h3>
            <p>Diese Cookies sind für den Betrieb der Website technisch erforderlich und können nicht deaktiviert werden. Sie werden nur als Reaktion auf von dir durchgeführte Aktionen gesetzt.</p>
            <p><strong className="text-foreground">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)</p>
            <h3 className="text-foreground font-medium mt-4 mb-2">Analyse-Cookies (Google Analytics)</h3>
            <p>Nach deiner Einwilligung setzen wir Cookies für Analysezwecke (siehe Abschnitt „Google Analytics").</p>
            <p><strong className="text-foreground">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</p>
          </Section>

          <Section title="7. Google Analytics 4">
            <p>Soweit du deine Einwilligung erteilt hast, nutzen wir auf dieser Website Google Analytics 4, einen Webanalysedienst der Google LLC.</p>
            <p className="mt-3 font-medium text-foreground">Anbieter:</p>
            <p>Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA</p>
            <p className="mt-3"><strong className="text-foreground">Zweck:</strong> Analyse des Nutzerverhaltens zur Verbesserung unserer Website und unseres Angebots.</p>
            <p className="mt-3"><strong className="text-foreground">Verarbeitete Daten:</strong></p>
            <BulletList items={[
              "IP-Adresse (anonymisiert)",
              "Geräte- und Browserinformationen",
              "Besuchte Seiten und Verweildauer",
              "Herkunft/Referrer",
              "Zeitpunkt des Zugriffs",
            ]} />
            <p className="mt-3"><strong className="text-foreground">IP-Anonymisierung:</strong> Google Analytics 4 anonymisiert IP-Adressen standardmäßig.</p>
            <p><strong className="text-foreground">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (deine Einwilligung) und § 25 Abs. 1 TDDDG.</p>
            <p><strong className="text-foreground">Speicherdauer:</strong> 2 Monate.</p>
            <p><strong className="text-foreground">Datenübermittlung in die USA:</strong> Google LLC ist unter dem EU-US Data Privacy Framework zertifiziert.</p>
            <p className="mt-3">Weitere Informationen: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Google Datenschutzerklärung</a></p>
          </Section>

          <Section title="8. Google Search Console">
            <p>Wir nutzen die Google Search Console, um die Sichtbarkeit unserer Website in den Google-Suchergebnissen zu überwachen und zu verbessern.</p>
            <p className="mt-3 font-medium text-foreground">Anbieter:</p>
            <p>Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA</p>
            <p className="mt-3"><strong className="text-foreground">Zweck:</strong> Überwachung und Optimierung der Suchmaschinenperformance unserer Website.</p>
            <p><strong className="text-foreground">Verarbeitete Daten:</strong> Die Google Search Console verarbeitet keine personenbezogenen Daten von Website-Besuchern. Die Daten werden ausschließlich auf Serverebene erhoben und betreffen aggregierte Statistiken.</p>
            <p><strong className="text-foreground">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).</p>
            <p className="mt-3">Weitere Informationen: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Google Datenschutzerklärung</a></p>
          </Section>

          <Section title="9. Kontaktformular">
            <p>Wenn du uns per Kontaktformular Anfragen zukommen lässt, werden deine Angaben aus dem Anfrageformular inklusive der von dir dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.</p>
            <p className="mt-3"><strong className="text-foreground">Verarbeitete Daten:</strong></p>
            <BulletList items={[
              "Name",
              "E-Mail-Adresse",
              "Telefonnummer (optional)",
              "Nachricht / Anfrage",
              "Gewählte Lösung und Herausforderung",
            ]} />
            <p className="mt-3"><strong className="text-foreground">Zweck:</strong> Bearbeitung deiner Anfrage und Kontaktaufnahme.</p>
            <p><strong className="text-foreground">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).</p>
            <p><strong className="text-foreground">Speicherdauer:</strong> Wir speichern deine Anfrage, bis der Zweck der Speicherung entfällt (i.d.R. nach Abschluss der Kommunikation).</p>
          </Section>

          <Section title="10. Terminbuchung (Calendly)">
            <p>Wir nutzen den Dienst Calendly zur Online-Terminvereinbarung.</p>
            <p className="mt-3 font-medium text-foreground">Anbieter:</p>
            <p>Calendly LLC, 3423 Piedmont Road NE, Atlanta, GA 30305, USA</p>
            <p className="mt-3"><strong className="text-foreground">Verarbeitete Daten:</strong></p>
            <BulletList items={[
              "Name",
              "E-Mail-Adresse",
              "Gewählter Termin",
              "Ggf. weitere von dir angegebene Informationen",
            ]} />
            <p className="mt-3"><strong className="text-foreground">Zweck:</strong> Vereinbarung und Verwaltung von Terminen.</p>
            <p><strong className="text-foreground">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung/vorvertragliche Maßnahmen).</p>
            <p><strong className="text-foreground">Datenübermittlung in die USA:</strong> Calendly LLC ist unter dem EU-US Data Privacy Framework zertifiziert.</p>
            <p className="mt-3">Weitere Informationen: <a href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Calendly Datenschutzerklärung</a></p>
          </Section>

          <Section title="11. SSL/TLS-Verschlüsselung">
            <p>Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennst du daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in deiner Browserzeile.</p>
          </Section>

          <Section title="12. Externe Links">
            <p>Unsere Website kann Links zu externen Websites enthalten. Wir haben keinen Einfluss auf deren Inhalte und Datenschutzpraktiken. Bitte informiere dich auf den jeweiligen Websites über deren Datenschutzbestimmungen.</p>
          </Section>

          <Section title="13. Änderungen dieser Datenschutzerklärung">
            <p>Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen umzusetzen. Für deinen erneuten Besuch gilt dann die neue Datenschutzerklärung.</p>
          </Section>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 pt-6 border-t border-white/[0.06] flex items-center gap-3 text-sm text-muted-foreground"
        >
          <Link to="/impressum" className="text-accent hover:underline">Zum Impressum</Link>
          <span>·</span>
          <Link to="/agb" className="text-accent hover:underline">AGB</Link>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Datenschutz;
