

# Karriere-Seite -- Aktualisierter Plan

## Aenderung gegenueber vorherigem Plan

Der Hero-Bereich bekommt einen staerkeren Einstieg, der das innovative Umfeld betont. Statt nur "kleines Team" wird direkt kommuniziert, dass man mit den neusten Tools und Technologien arbeitet.

## Neuer Hero-Text

**Headline:** "Bock auf Zukunft?" (BlurText, wie gehabt)

**Subtext (neu):**
"Arbeite mit den neusten KI-Tools und Technologien in einem Team, das Unternehmen in die Zukunft bringt. Kein Konzern, keine starren Strukturen -- dafuer echte Innovation, jeden Tag."

Das trifft den Ton: zukunftsorientiert und innovativ, aber ohne Corporate-Buzzword-Overkill. Es ist ehrlich und passt zum Agentur-Stil.

## Rest bleibt identisch

Alles andere aus dem bereits genehmigten Plan bleibt bestehen:

- Benefits-Chips (Wellpass, Remote, etc.)
- 6-Step Bewerbungsfunnel mit Verzweigung (Minijob/Werkstudent vs. Teilzeit/Vollzeit)
- Tool-Auswahl (N8N, Zapier, Claude, ChatGPT, Gemini)
- Glassmorphism-Design, BlurText-Animationen, appleEase-Transitions

## Technische Umsetzung

### Neue Dateien

**`src/pages/Karriere.tsx`**
- Navigation + Footer
- Hero: BlurText "Bock auf Zukunft?", neuer Subtext (siehe oben), CTA-Button
- Benefits-Bereich mit animierten Glassmorphism-Chips
- Zweiter CTA am Ende
- Lokaler State fuer CareerFunnel Dialog

**`src/components/career/CareerFunnel.tsx`**
- 6-Step Dialog-Funnel im ContactFunnel-Design
- Step 1: Beschaeftigungsart (Minijob, Werkstudent, Teilzeit, Vollzeit)
- Step 2: Rolle (Sales, Automatisierungsspezialist)
- Step 3: Verzweigung -- Studenten-Pfad (Studiengang, Stunden, Start) vs. Erfahrungs-Pfad (Einsteiger/Erfahren/Senior)
- Step 4: Tool-Kenntnisse (Multi-Select Chips)
- Step 5: Kontaktdaten
- Step 6: Erfolg

**`src/App.tsx`**
- Neue Route `/karriere` hinzufuegen

