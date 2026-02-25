

# Redesign: "Was wir fuer euch tun koennen" -- Apple-like Premium Section

## Analyse: Was ist das Problem?

Die aktuelle Section hat mehrere Schwaechen:

1. **Kleine SVG-Demos wirken wie Spielzeug** -- Die Smartphone-Frames mit winziger Schrift und die SVG-Zahnraeder sehen nicht hochwertig aus. Sie sind technisch beeindruckend, aber visuell zu klein und detailreich, um auf einen Blick zu wirken.

2. **Generisches 2-Spalten-Grid** -- Die Links-Rechts-Abwechslung ist ein Standard-Agentur-Layout, kein Apple-Feeling.

3. **Glassmorphism-Cards wirken beliebig** -- Die `bg-white/[0.03]` Karten mit Border heben sich kaum vom Hintergrund ab. Es fehlt der "Wow-Moment".

4. **Kein visueller Rhythmus** -- Alle drei Karten haben dieselbe Groesse und denselben Abstand. Apple nutzt bewusst unterschiedliche Gewichtungen.

---

## Konzept: Full-Width Stacked Cards mit grossen Icons

Inspiriert von apple.com/services und apple.com/iphone -- grosse, atmende Sektionen mit einem klaren visuellen Fokus pro Loesung.

### Layout-Ansatz

Statt dem 2-Spalten-Grid: **3 gestapelte Full-Width-Karten**, jede nimmt fast die volle Breite ein. Jede Karte hat:

- Einen **grossen, abstrakten animierten Hintergrund-Effekt** (dezenter Gradient-Glow statt detaillierter SVG-Demos)
- **Grosse Typografie** fuer den Titel (text-5xl bis text-7xl)
- Kurze Description + "Mehr erfahren" Link
- **Hover-Effekt**: Die Karte hebt sich leicht an, der Glow intensiviert sich

```text
┌─────────────────────────────────────────────────┐
│                                                 │
│        ◉  Animierter Glow / Gradient            │
│                                                 │
│     KI-Telefonassistent                         │
│     Nimmt Anrufe entgegen, beantwortet ...      │
│     Mehr erfahren →                             │
│                                                 │
└─────────────────────────────────────────────────┘

        (grosszuegiger Abstand)

┌─────────────────────────────────────────────────┐
│                                                 │
│        ◉  Animierter Glow / Gradient            │
│                                                 │
│     WhatsApp & Chatbots                         │
│     Automatisierte Chatbots, die ...            │
│     Mehr erfahren →                             │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Design-Details pro Karte

**Visueller Hintergrund**: Statt der SVG-Phone/Chat/Gear-Demos nutze ich einen **animierten Radial-Gradient-Glow** in der oberen rechten Ecke jeder Karte. Jede Karte hat eine leicht andere Farbnuance (alle aus dem Accent-Spektrum), sodass man die drei Loesungen visuell unterscheiden kann.

**Karten-Styling**:
- `rounded-3xl` (groessere Rundung)
- Subtiler Border `border-white/[0.08]`
- Kein `backdrop-blur` -- stattdessen ein solider, leicht getoenter Hintergrund `bg-white/[0.04]`
- Grosszuegiges Padding (p-12 md:p-16)
- Hover: `translateY(-6px)` + Glow-Intensitaet steigt

**Typografie**:
- Titel: `text-4xl md:text-6xl font-bold` -- deutlich groesser als jetzt
- Description: `text-lg text-muted-foreground` mit `max-w-xl`
- Link: Pill-Button-Stil statt nur Text-Link

**Icon**: Lucide-Icon als grosses, akzentfarbenes Element (48-64px) oberhalb des Titels, mit sanftem Glow dahinter.

### Animationen

- Cards faden per `whileInView` mit dem bestehenden `appleEase` Curve ein
- Der Hintergrund-Gradient pulsiert sanft (opacity 0.05 bis 0.15, 6s loop)
- Beim Hover skaliert der Gradient leicht

### Technische Umsetzung

**1 Datei komplett umschreiben**: `src/components/FeaturesSection.tsx`

- Die komplexen SVG-Demo-Komponenten (PhoneDemo, ChatDemo, WorkflowDemo, Gear) werden **entfernt**
- Ersetzt durch eine deutlich schlankere Komponente mit animierten Gradient-Glows
- Icons: `Phone`, `MessageSquare`, `Zap` aus Lucide (oder aehnliche)
- Jede Karte ist ein `<Link>` zu den Detailseiten

**Keine anderen Dateien betroffen.**

---

## Zusammenfassung

| Aspekt | Aktuell | Neu |
|--------|---------|-----|
| Layout | 2-Spalten alternierend | Full-width gestapelte Cards |
| Visuals | Kleine SVG-Phones/Gears | Grosse Gradient-Glows + Lucide Icons |
| Typografie | text-3xl/4xl | text-4xl/6xl |
| Karten-Stil | 280-340px hoch, schmal | Breite Karten, grosszuegiges Padding |
| Interaktion | Keine Hover-Effekte | Lift + Glow-Intensivierung |
| Code | ~500 Zeilen (SVG-heavy) | ~150 Zeilen (clean) |

**1 Datei aendern** (`src/components/FeaturesSection.tsx`), massiv vereinfacht.

