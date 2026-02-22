

## Automatisierungen-Seite + Umbenennung zu MTM Studios

Zwei Aufgaben in einem: Die neue Automatisierungen-Seite bauen und gleichzeitig ueberall "Setrex" durch "MTM Studios" ersetzen.

---

### Teil 1: Umbenennung Setrex zu MTM Studios

Alle Vorkommen von "Setrex" werden zu "MTM Studios" geaendert:

| Datei | Aenderung |
|-------|-----------|
| `index.html` | `meta author` von "Setrex" zu "MTM Studios" |
| `src/components/Navigation.tsx` | Logo alt-Text: "MTM Studios Logo" (2 Stellen) |
| `src/components/Footer.tsx` | Logo alt-Text, E-Mail zu `info@mtmstudios.de`, Copyright zu "MTM Studios" |
| `src/pages/AboutUs.tsx` | "About Setrex" Badge, Firmenname im Fliesstext |

Hinweis: Die E-Mail-Adresse wird zu `info@mtmstudios.de` geaendert -- falls eine andere Domain gewuenscht ist, bitte Bescheid geben.

---

### Teil 2: Automatisierungen-Seite

8 Sektionen, Apple-like Premium-Qualitaet, vertrauensbildend.

**Sektion 1: Hero**
- Headline: `Automatisierung, die mit euch waechst.`
- Subline: `Vom ersten kleinen Workflow bis zur kompletten Prozesslandschaft. Euer Partner im Zeitalter der KI.`
- Animation: GearFlowVisual -- 3 ineinandergreifende Zahnraeder (klein, mittel, gross) die sich drehen, mit leuchtenden Datenpunkten entlang der Verbindungslinien.

**Sektion 2: Problem**
- Headline: `Euer Team ist zu gut fuer Routinearbeit.`
- CountUp-Statistik: `73% aller Arbeitsschritte lassen sich automatisieren.`

**Sektion 3: Das Spektrum (einzigartig fuer diese Seite)**
- Headline: `Von der ersten Automation zur kompletten Transformation.`
- 3 aufsteigende Karten:
  - **Kleine Helfer:** E-Mail-Weiterleitung, Kalender-Sync, Benachrichtigungen
  - **Vernetzte Prozesse:** Lead-Erfassung, Rechnungsstellung, Kundenkommunikation
  - **Komplette Automatisierung:** Sales-Pipelines, Onboarding, Reporting (Neon-Highlight)
- Animierte Verbindungslinie mit leuchtenden Punkten zwischen den Karten

**Sektion 4: So funktioniert's**
- 3 Schritte: Analyse, Umsetzung, Skalierung
- Gleicher Stil wie die anderen Seiten

**Sektion 5: Features (4 mit eigenen Animationen)**
- **Nahtlose Integration** -- IntegrationNodesAnimation (Tool-Icons verbinden sich mit Hub)
- **Massgeschneidert** -- BlueprintAnimation (Bauplan-Grid mit leuchtenden Nodes)
- **Messbare Ergebnisse** -- MetricsAnimation (wachsende Balken mit CountUp-Zahlen)
- **Zukunftssicher** -- ScaleUpAnimation (stufenweise Vergroesserung mit Pulse)

**Sektion 6: Vertrauen (Trust-Builder)**
- 2x2 Grid mit CountUp-Zahlen:
  - 100+ automatisierte Workflows
  - 15h+ pro Woche eingespart
  - 98% Kundenzufriedenheit
  - 24/7 Prozesse laufen immer

**Sektion 7: Testimonial**
- "MTM Studios hat unseren kompletten Sales-Prozess automatisiert..."

**Sektion 8: CTA + Footer** -- Wiederverwendet

---

### Technische Umsetzung

**Neue Dateien (12):**
- `src/pages/Automations.tsx`
- `src/components/automations/AutomationsHero.tsx`
- `src/components/automations/AutomationsProblem.tsx`
- `src/components/automations/AutomationsSpectrum.tsx`
- `src/components/automations/AutomationsHowItWorks.tsx`
- `src/components/automations/AutomationsFeatures.tsx`
- `src/components/automations/IntegrationNodesAnimation.tsx`
- `src/components/automations/BlueprintAnimation.tsx`
- `src/components/automations/MetricsAnimation.tsx`
- `src/components/automations/ScaleUpAnimation.tsx`
- `src/components/automations/TrustSection.tsx`
- `src/components/automations/AutomationsTestimonial.tsx`

**Geaenderte Dateien (6):**
- `index.html` -- Author-Meta umbenennen
- `src/App.tsx` -- Route `/automatisierungen` hinzufuegen
- `src/components/Navigation.tsx` -- Logo-Alt umbenannt, "Automatisierungen" Link zu `/automatisierungen`
- `src/components/Footer.tsx` -- Name, E-Mail, Copyright umbenannt, Automatisierungen-Link
- `src/components/FeaturesSection.tsx` -- Dritte Karte href zu `/automatisierungen`
- `src/pages/AboutUs.tsx` -- Alle "Setrex"-Vorkommen zu "MTM Studios"

