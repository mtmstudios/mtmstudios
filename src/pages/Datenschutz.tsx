import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Datenschutz = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title="Datenschutzerklärung | MTM Studios" description="Datenschutzerklärung von MTM Studios — Informationen zur Erhebung und Verarbeitung personenbezogener Daten." />
      <Navigation />
      <main className="container mx-auto px-6 pt-32 pb-20 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Datenschutzerklärung</h1>
        <div className="space-y-6 text-muted-foreground text-sm leading-relaxed">
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">1. Verantwortlicher</h2>
            <p>[Firmenname]<br />[Straße und Hausnummer]<br />[PLZ Ort]<br />E-Mail: hallo@mtmstudios.de</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">2. Erhebung und Speicherung personenbezogener Daten</h2>
            <p>Beim Besuch unserer Website werden automatisch Informationen erfasst, die Ihr Browser an unseren Server übermittelt (sog. Server-Logfiles). Diese umfassen Browsertyp und -version, verwendetes Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse.</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">3. Kontaktformular</h2>
            <p>Bei Nutzung unseres Kontaktformulars werden die von Ihnen eingegebenen Daten (Name, E-Mail-Adresse, ggf. Telefonnummer und Nachricht) zum Zwecke der Bearbeitung Ihrer Anfrage bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">4. Cookies</h2>
            <p>[Platzhalter: Beschreibung der verwendeten Cookies und deren Zweck. Hinweis auf Opt-out-Möglichkeiten.]</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">5. Weitergabe von Daten</h2>
            <p>Eine Übermittlung Ihrer persönlichen Daten an Dritte zu anderen als den im Folgenden aufgeführten Zwecken findet nicht statt.</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">6. Rechte der Betroffenen</h2>
            <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch. Bitte wenden Sie sich hierzu an hallo@mtmstudios.de.</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">7. Aktualität und Änderung dieser Datenschutzerklärung</h2>
            <p>Diese Datenschutzerklärung ist aktuell gültig. Durch die Weiterentwicklung unserer Website kann es notwendig werden, diese Datenschutzerklärung zu ändern.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Datenschutz;
