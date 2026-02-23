import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const AGB = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="container mx-auto px-6 pt-32 pb-20 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Allgemeine Geschäftsbedingungen</h1>
        <div className="space-y-6 text-muted-foreground text-sm leading-relaxed">
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">§ 1 Geltungsbereich</h2>
            <p>Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen [Firmenname] und dem Auftraggeber über die Erbringung von Dienstleistungen im Bereich KI-Automatisierung und digitale Lösungen.</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">§ 2 Vertragsschluss</h2>
            <p>Ein Vertrag kommt durch die schriftliche Auftragsbestätigung von [Firmenname] oder durch den Beginn der Leistungserbringung zustande.</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">§ 3 Leistungen</h2>
            <p>Der Umfang der Leistungen ergibt sich aus der jeweiligen Leistungsbeschreibung bzw. dem individuellen Angebot. Änderungen des Leistungsumfangs bedürfen der schriftlichen Vereinbarung.</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">§ 4 Vergütung und Zahlung</h2>
            <p>Die Vergütung richtet sich nach dem vereinbarten Angebot. Rechnungen sind innerhalb von [14] Tagen nach Rechnungsstellung ohne Abzug zahlbar.</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">§ 5 Mitwirkungspflichten</h2>
            <p>Der Auftraggeber stellt alle für die Leistungserbringung erforderlichen Informationen, Zugänge und Materialien rechtzeitig und kostenfrei zur Verfügung.</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">§ 6 Haftung</h2>
            <p>[Platzhalter: Haftungsbeschränkungen und -ausschlüsse nach geltendem Recht.]</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">§ 7 Vertraulichkeit</h2>
            <p>Beide Parteien verpflichten sich, alle im Rahmen der Zusammenarbeit erhaltenen vertraulichen Informationen geheim zu halten.</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">§ 8 Schlussbestimmungen</h2>
            <p>Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist [Ort], sofern der Auftraggeber Kaufmann ist.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AGB;
