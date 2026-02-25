

# Animations-Angleichung: Alle Unterseiten auf Premium-Niveau

## Analyse — Qualitaetsgefaelle

| Seite | Animation | Qualitaet | Problem |
|-------|-----------|-----------|---------|
| **Chatbot** | MessageBurst | Premium | Loops, Typing-Indicator, Chat-UI — perfekt |
| **Chatbot** | BrainNetwork | Premium | Traveling Particles, aktive Nodes, Glow — perfekt |
| **Chatbot** | Handoff | Premium | 4-Phasen State Machine, Progress Bar — perfekt |
| **Chatbot** | ChannelIcons | Premium | Orbit, Badges, Notifications — perfekt |
| **Telefon** | Waveform | Mittel | `once: true`, kein Loop, nur einfache Bars |
| **Telefon** | FlowDots | Premium | Phasen, Partikel, Loop — perfekt |
| **Telefon** | Calendar | Schwach | `once: true`, kein Loop, statisches Grid mit Checkmark |
| **Telefon** | Typewriter | Schwach | `once: true`, kein Loop, spielt einmal ab und fertig |
| **Automations** | IntegrationNodes | Schwach | Statisches Hub-Spoke SVG, `once: true`, keine Story |
| **Automations** | Blueprint | Schwach | 3x3 Punkt-Gitter, `once: true`, keine Story |
| **Automations** | Metrics | Schwach | Einfache Bars, `once: true`, keine Story |
| **Automations** | ScaleUp | Schwach | Drei Quadrate, `once: true`, keine Story |

**Chatbot-Seite ist das Referenz-Niveau.** Alle anderen muessen dort hinkommen.

---

## Massnahmen

### A. Automations-Seite — 4 Animationen komplett neu

#### 1. IntegrationNodesAnimation → Live-Sync Dashboard

Statt Hub-Spoke SVG: ein Mini-Dashboard mit drei Tool-Karten (CRM, Mail, Kalender) als `div`-Elemente mit Lucide-Icons. Animierte Daten-Dots wandern zwischen den Karten. Status wechselt phasenweise: "Sync..." → "Aktuell ✓". Loops alle 6 Sekunden. `useInView({ once: false })`.

#### 2. BlueprintAnimation → Workflow-Builder

Statt 3x3 Punkt-Gitter: Workflow-Nodes ("Eingang" → "Pruefen" → "Verarbeiten" → "Ausgabe") erscheinen nacheinander als Glassmorphism-Karten. Verbindungslinien zeichnen sich mit animiertem Dash-Offset. Letzter Node bekommt Check-Icon. "Konfiguriert fuer: Ihr Unternehmen" fadet ein. Loops.

#### 3. MetricsAnimation → KPI Dashboard

Statt einfacher Bars: Zwei grosse KPI-Zahlen mit CountUp ("847h gespart", "94% schneller"), ein animierter Sparkline (SVG Path zeichnet sich), und eine Status-Zeile "↑ 23% vs. Vorquartal" in Gruen. Pulsierender "Live"-Dot oben rechts. Zahlen aktualisieren sich periodisch.

#### 4. ScaleUpAnimation → Scale-Up Pulse

Statt drei Quadrate: Zentrale Zahl zaehlt "1x → 10x → 100x" hoch. Konzentrische Pulse-Ringe breiten sich aus. Badges erscheinen nacheinander: "+Region", "+Team", "+Prozesse". Kreisfoermiger Fortschrittsring (SVG) fuellt sich von 0% auf 100%. Loops.

---

### B. Telefon-Seite — 3 Animationen upgraden

#### 5. WaveformAnimation — Loop hinzufuegen

Aktuell: `once: true`, Bars animieren einmal. Aenderung: `once: false` setzen, und bei jedem In-View-Wechsel die Hoehen zuruecksetzen und neu starten. Dadurch spielt die Animation jedes Mal wenn man reinscrollt.

#### 6. CalendarAnimation — Loop + Scanning-Effekt

Aktuell: Grid erscheint einmal, Checkmark einmal. Aenderung: `once: false`, Multi-Phasen-Zyklus: Zuerst erscheint das Grid → ein "Scanning"-Highlight wandert ueber verfuegbare Slots → Slot wird ausgewaehlt → Checkmark + Glow → Pause → Reset und Neustart. Aenlich wie Handoff-Animation mit State Machine.

#### 7. TypewriterAnimation — Loop + Reset

Aktuell: Text tippt einmal und bleibt stehen. Aenderung: `once: false`, nach dem letzten Satz kurze Pause → alle Zeilen faden aus → Neustart. Alternierend verschiedene Zusammenfassungen fuer Abwechslung.

---

## Technische Standards (gleich fuer alle)

- `useInView({ once: false, margin: "-50px" })` — Animation startet und resettet
- Mehrstufige State Machines mit `useEffect` und Timeouts (wie Handoff/FlowDots)
- `AnimatePresence` fuer Text-/Status-Wechsel
- Glassmorphism fuer UI-Elemente: `bg-white/[0.03] border border-white/[0.06]`
- Apple-Easing: `[0.16, 1, 0.3, 1]`
- Lucide-Icons statt SVG-Text-Labels
- Glow-Effekte: `shadow-[0_0_14px_hsl(var(--accent)/0.2)]` bei aktiven Elementen
- Zykluslaenge: 5-8 Sekunden

## Betroffene Dateien

| Datei | Aenderung |
|-------|-----------|
| `src/components/automations/IntegrationNodesAnimation.tsx` | Komplett neu |
| `src/components/automations/BlueprintAnimation.tsx` | Komplett neu |
| `src/components/automations/MetricsAnimation.tsx` | Komplett neu |
| `src/components/automations/ScaleUpAnimation.tsx` | Komplett neu |
| `src/components/phone-assistant/WaveformAnimation.tsx` | Loop-Upgrade |
| `src/components/phone-assistant/CalendarAnimation.tsx` | Komplett neu (State Machine + Loop) |
| `src/components/phone-assistant/TypewriterAnimation.tsx` | Loop-Upgrade |

7 Dateien. Keine neuen Abhaengigkeiten. Chatbot-Animationen bleiben unveraendert.

