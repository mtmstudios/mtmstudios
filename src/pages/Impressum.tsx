import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Impressum = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="container mx-auto px-6 pt-32 pb-20 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Impressum</h1>
        <div className="space-y-6 text-muted-foreground text-sm leading-relaxed">
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">Angaben gemäß § 5 TMG</h2>
            <p>[Firmenname]<br />[Straße und Hausnummer]<br />[PLZ Ort]</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">Vertreten durch</h2>
            <p>[Vorname Nachname], Geschäftsführer</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">Kontakt</h2>
            <p>Telefon: [+49 XXX XXXXXXX]<br />E-Mail: info@mtmstudios.de</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">Handelsregister</h2>
            <p>Registergericht: [Amtsgericht Ort]<br />Registernummer: [HRB XXXXX]</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">Umsatzsteuer-ID</h2>
            <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:<br />[DE XXXXXXXXX]</p>
          </section>
          <section>
            <h2 className="text-foreground font-semibold text-lg mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>[Vorname Nachname]<br />[Straße und Hausnummer]<br />[PLZ Ort]</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Impressum;
