

## "So funktioniert's" — Gestaffelte Karten (Premium/Clean)

Neue Section unterhalb der FeaturesSection mit 5 Schritten in einem modernen, reduzierten Karten-Layout.

### Neue Datei: `src/components/ProcessSection.tsx`

**Layout:**
- Section mit `id="prozess"` und dunklem Hintergrund (`bg-muted/20`) zur Abgrenzung
- Section-Header: Neon-Badge "So funktioniert's" + Headline "Von der Idee zur Loesung"
- 5 Karten vertikal gestapelt, auf Desktop leicht versetzt (ungerade Karten links, gerade rechts via `md:ml-auto`)
- Jede Karte hat:
  - Grosse halbtransparente Nummer im Hintergrund (`text-6xl font-bold text-neon/10`)
  - `border-l-4 border-neon` als linker Akzent
  - Glassmorphism-Styling: `bg-white/5 backdrop-blur-md rounded-xl`
  - Icon (klein, dezent in `text-neon/60`), Titel und Beschreibung
  - Keine Hover-Animationen, keine Glow-Effekte — ruhig und premium

**Die 5 Schritte:**

| Nr | Titel | Icon | Beschreibung |
|----|-------|------|-------------|
| 01 | Erstgespraech und Analyse | MessageSquare | Wir lernen euer Unternehmen kennen, analysieren Prozesse und identifizieren Potenziale. |
| 02 | Konzept und Strategie | Lightbulb | Basierend auf der Analyse entwickeln wir eine massgeschneiderte Strategie und einen klaren Plan. |
| 03 | Umsetzung und Integration | Cog | Wir entwickeln die Loesung und integrieren sie nahtlos in eure bestehenden Systeme. |
| 04 | Testing und Go-Live | Rocket | Gruendliches Testen, Feinschliff und begleiteter Launch eurer neuen KI-Loesung. |
| 05 | Langfristige Partnerschaft | Handshake | Kontinuierliche Optimierung, Skalierung und persoenlicher Support als euer KI-Partner. |

**Karten-Breite:** `max-w-2xl` (nicht volle Breite, wirkt eleganter)
**Abstand zwischen Karten:** `gap-6`

### Aenderung: `src/pages/Index.tsx`

- Import `ProcessSection` hinzufuegen
- `<ProcessSection />` unterhalb von `<FeaturesSection />` einbinden

### Technische Details

- Icons aus `lucide-react`: MessageSquare, Lightbulb, Cog, Rocket, Handshake
- Keine neuen Dependencies
- Keine Scroll-Animationen — statisch und ruhig
- Responsive: Auf Mobile alle Karten zentriert ohne Versatz

