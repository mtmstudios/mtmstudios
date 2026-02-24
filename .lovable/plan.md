

# Regionale SEO-Sektion: "Auch in deiner Region"

## Konzept

Eine dezente, wiederverwendbare Komponente wird erstellt und auf 4 Seiten direkt oberhalb des Footers platziert. Sie zeigt regionale Staedte als Pill-Chips an -- einige aktiv (verlinkt auf zukuenftige SEO-Unterseiten), andere mit einem "Bald"-Badge (noch nicht live). Die Sektion soll sich visuell zuruecknehmen und nicht vom Hauptinhalt ablenken.

## Design (angelehnt an Referenzbild)

- Kleine zentrierte Headline mit MapPin-Icon: "Auch in deiner Region"
- Darunter Chips in einer `flex-wrap` Zeile, zentriert
- Aktive Chips: `rounded-full border border-white/10 bg-white/[0.03] text-foreground/70 text-sm px-5 py-2.5`
- "Bald"-Chips: Gleicher Stil, aber mit kleinem `Bald`-Badge rechts (`text-xs bg-white/[0.06] rounded-full px-2 py-0.5 text-foreground/30`)
- Hover auf aktiven Chips: `border-white/20 bg-white/[0.06]` -- subtiler Lift
- Kein Tuerkis, kein Accent -- komplett neutral/grau gehalten
- Dezenter `py-16` Abstand, keine grosse Headline -- bewusst zurueckhaltend
- `text-foreground/40` fuer die Headline (sehr gedimmt)

## Staedte (Initial)

Kontextbezogen pro Seite die gleiche Liste (kann spaeter pro Seite variiert werden):

| Stadt | Status |
|-------|--------|
| Stuttgart | aktiv (Link zu `/ki-telefonassistent-stuttgart` etc.) |
| Ulm | aktiv |
| Muenchen | bald |
| Augsburg | bald |
| Reutlingen | bald |

Die Links werden vorerst auf `#` gesetzt (Seiten existieren noch nicht). Spaeter werden die regionalen Unterseiten erstellt und die Links aktualisiert.

## Technische Umsetzung

### Neue Datei: `src/components/RegionalSection.tsx`

- Wiederverwendbare Komponente mit Props:
  - `contextPath?: string` (z.B. "ki-telefonassistent") -- wird fuer die Link-Generierung genutzt
- Staedte-Array intern definiert mit `{ name, slug, available }`
- Aktive Staedte rendern als `<Link>`, "Bald"-Staedte als `<span>`
- Subtle fade-in Animation mit `motion`

### Geaenderte Dateien (jeweils 1 Import + 1 Zeile einfuegen):

| Datei | Position | contextPath |
|-------|----------|-------------|
| `src/pages/Index.tsx` | Vor `<Footer />` | keiner (allgemein) |
| `src/pages/PhoneAssistant.tsx` | Vor `<Footer />` | "ki-telefonassistent" |
| `src/pages/Chatbots.tsx` | Vor `<Footer />` | "ki-chatbot" |
| `src/pages/Automations.tsx` | Vor `<Footer />` | "automatisierungen" |

