
## Footer anpassen

### Aenderungen in `src/components/Footer.tsx`

1. **Kontakt-Spalte komplett entfernen** -- die dritte Spalte (Mail, Telefon, Deutschland) faellt weg. Grid wird `md:grid-cols-2`.

2. **LinkedIn-Icon durch WhatsApp ersetzen** -- Import von `Linkedin` entfernen, stattdessen das WhatsApp-Logo (`src/assets/whatsapp-logo.png`) als kleines Bild (gleiche Groesse wie die Icons, `w-5 h-5`) einbinden. Link geht auf `https://wa.me/4912345678`.

3. **"Beratung" und "Ueber uns" entfernen** -- nur noch die drei Kernleistungen bleiben (KI-Telefonassistent, WhatsApp & Chatbots, Automatisierungen).

4. **Rechtlichen Hinweis einfuegen** (aus dem zuvor genehmigten Plan) -- im Copyright-Bereich:
   > Es gelten die [AGB](/agb) von MTMstudios. Informationen zur Datenverarbeitung sowie zur Auftragsverarbeitung (AVV) finden Sie in unserer [Datenschutzerklaerung](/datenschutz).

5. **Nicht mehr benoetigte Imports entfernen**: `Linkedin`, `Phone`, `MapPin` raus.

### Ergebnis

Kompakterer Footer mit nur zwei Spalten (Brand + Leistungen), WhatsApp statt LinkedIn, und rechtlichem Hinweis unten.
