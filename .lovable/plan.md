

# "Von der ersten Automation zur kompletten Transformation" — Premium Upgrade

## Aktueller Zustand

Drei nebeneinander stehende Karten mit Lucide-Icons, Titeln und Aufzaehlungslisten. Eine horizontale Verbindungslinie mit einem wandernden Dot. Die dritte Karte hat einen tuerkisen Border-Glow. Das Ganze wirkt wie ein Standard-SaaS Feature-Grid — funktional, aber nicht auf Premium-Agentur-Niveau.

Hauptprobleme:
- Statische Karten ohne Interaktion oder Erzaehlung
- Aufzaehlungslisten wirken wie ein Datenblatt, nicht wie eine Story
- Die Verbindungslinie ist kaum sichtbar und erzaehlt nichts
- Kein Gefuehl von Progression oder Transformation

---

## Vorschlag: Horizontale Journey mit animiertem Fortschritt

Statt drei gleichwertiger Karten: eine visuelle Reise von links nach rechts, die eine Transformation erzaehlt.

### Layout

```text
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   Von der ersten Automation zur kompletten Transformation.      │
│                                                                 │
│   ═══════════════●══════════════●══════════════●                │
│                  │              │              │                 │
│   ┌──────────┐       ┌──────────┐       ┌──────────┐           │
│   │ Kleine   │       │ Vernetzte│       │ Komplette│           │
│   │ Helfer   │       │ Prozesse │       │ Transf.  │           │
│   │          │       │          │       │          │           │
│   │ items... │       │ items... │       │ items... │           │
│   └──────────┘       └──────────┘       └──────────┘           │
│                                                                 │
│   [ Fortschrittsbalken ════════════════════════> ]              │
│     Phase 1             Phase 2            Phase 3              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Konzept: Animated Timeline mit Phase-Wechsel

1. **Fortschrittsbalken oben**: Ein horizontaler Balken (nicht die kaum sichtbare Linie) der sich von links nach rechts fuellt. Drei Stationen als Kreise auf der Linie. Der aktive Kreis pulsiert leicht mit Glow.

2. **Karten erscheinen sequentiell**: Statt alle drei gleichzeitig zu zeigen, werden sie nacheinander "aktiviert". Die aktive Karte hat einen subtilen tuerkisen Akzent-Border und leichten Glow. Inaktive Karten sind gedimmt (`opacity-40`).

3. **Auto-Play Zyklus**: Alle 3 Sekunden wechselt die aktive Phase weiter. Der Fortschrittsbalken fuellt sich entsprechend. Bei Phase 3 kurze Pause, dann Reset.

4. **Inhalt statt Bulletpoints**: Statt trockener Listen bekommt jede Karte eine praegnante Beschreibung und einen kleinen animierten Zaehler oder Status-Badge:
   - Phase 1: "3 Workflows aktiv" (zaehlt hoch)
   - Phase 2: "12 Systeme verbunden" (zaehlt hoch)  
   - Phase 3: "100% automatisiert" (zaehlt hoch, mit Checkmark)

5. **Mobile**: Vertikal gestapelt. Der Fortschrittsbalken wird zu einer vertikalen Linie links. Karten erscheinen nacheinander darunter.

### Design-Details

- Fortschrittsbalken: `h-[2px] bg-accent/20` als Hintergrund, `bg-accent` als Fuellung, animiert mit `scaleX`
- Stationen: `w-3 h-3 rounded-full` auf der Linie, aktiv mit `bg-accent shadow-[0_0_12px_hsl(var(--accent)/0.4)]`
- Aktive Karte: `border-accent/30 shadow-[0_0_30px_hsl(var(--accent)/0.06)]`
- Inaktive Karten: `opacity-40 border-white/[0.04]`
- Uebergaenge: `AnimatePresence` fuer Badge-/Status-Wechsel
- Tuerkis nur als Akzent: Border, Dots, Status-Badges. Kein tuerkiser Titel oder Hintergrund

### Technische Umsetzung

- `useInView({ once: false })` fuer Start/Reset
- `useState` fuer `activePhase` (0, 1, 2)
- `useEffect` mit `setInterval` fuer Auto-Play (3s pro Phase, 2s Pause nach Phase 3, dann Reset)
- Fortschrittsbalken-Breite: `width: ${((activePhase + 1) / 3) * 100}%` mit `transition-all duration-700`
- CountUp-Komponente fuer die Zaehler in jeder Karte

---

## Betroffene Datei

| Datei | Aenderung |
|-------|-----------|
| `src/components/automations/AutomationsSpectrum.tsx` | Komplett neu: Timeline mit Phase-Wechsel statt statisches Karten-Grid |

Eine Datei. Keine neuen Abhaengigkeiten.

