

## KI-Telefonassistent Unterseite -- Ueberarbeiteter Premium-Plan

### Kritik am vorherigen Plan

Der vorherige Plan hatte zwei schwerwiegende Fehler:

1. **"Bild folgt"-Platzhalter sind kein Apple-Design** -- sie sind Baukasten. Apple zeigt nie leere Flaechen. Wenn kein Bild da ist, muessen hochwertige Animationen die Rolle uebernehmen. Die bestehenden Demos auf der Startseite (PhoneDemo, ChatDemo, WorkflowDemo) sind bereits gut -- sie bleiben.

2. **Die Unterseite braucht eigene, massgeschneiderte Animationen** -- keine kopierten Demos von der Startseite. Jedes Feature auf der Unterseite bekommt eine einzigartige, subtile Animation die das Feature visuell erklaert.

---

### Seitenstruktur (8 Sektionen)

```text
1. Hero -- Grosser Titel + Subline + animiertes Visual
2. Problem -- Warum braucht man das?
3. So funktioniert's -- 3 Schritte mit Termin + CRM
4. Features -- 4 Features mit eigenen Animationen
5. Anwendungsfaelle -- Branchen-Grid
6. Testimonial -- Ein grosses Zitat
7. CTA -- Wiederverwendet
8. Footer -- Wiederverwendet
```

---

### Sektion 1: Hero

**Konzept:** Volle Viewport-Hoehe. Zentrierter Text oben, darunter eine grosse, animierte Visualisierung -- keine PhoneDemo-Kopie, sondern ein neues, groesseres Visual.

- Headline: `Euer KI-Telefonassistent` -- `text-5xl md:text-7xl font-bold`, BlurText-Animation wie auf der Startseite
- Subline: `Nimmt Anrufe entgegen, beantwortet Fragen, bucht Termine -- rund um die Uhr.` -- `text-lg text-muted-foreground`
- Darunter: **Animiertes Phone-Visual** -- ein stilisiertes Smartphone-Outline (nur Linien, kein Fill) mit einer animierten Wellenform darin, die "spricht". Gebaut aus SVG-Pfaden + motion/react. Groesse: `max-w-[320px] h-[500px]` auf Desktop. Die Wellenform pulsiert dezent, wie ein aktiver Anruf.
- Kein CTA-Button im Hero

**Animation:**
- BlurText fuer Headline (bestehendes Pattern)
- Smartphone-Outline zeichnet sich mit `pathLength` Animation (0 zu 1, duration 1.5s)
- Wellenform startet nach dem Outline-Draw

---

### Sektion 2: Problem

**Konzept:** Zentriert, nur Text, maximale Wirkung durch Groesse und Weissraum.

- Headline: `Verpasste Anrufe kosten Kunden.` -- `text-3xl md:text-5xl font-bold`
- Zwei kurze Saetze darunter: "Warteschleifen, volle Mailboxen, ueberlastetest Team. Jeder verpasste Anruf ist eine verpasste Chance."
- Eine statische Zahl: `62% aller Anrufer legen auf, wenn niemand abhebt.` -- `text-muted-foreground`, klein, als Fussnote
- **Animation:** `whileInView` fade-up mit blur, `duration: 0.8`, `appleEase`

---

### Sektion 3: So funktioniert's (mit Termin + CRM)

**Konzept:** 3 horizontale Karten, identischer Stil wie ProcessSection auf Startseite.

| Schritt | Titel | Beschreibung |
|---------|-------|-------------|
| 01 | Anruf kommt rein | Euer KI-Assistent nimmt ab -- sofort, ohne Wartezeit, 24/7. |
| 02 | KI versteht und handelt | Beantwortet Fragen, vereinbart Termine und leitet bei Bedarf an euer Team weiter. |
| 03 | Alles im CRM | Zusammenfassung, Transkript und gebuchte Termine -- automatisch in eurem System. |

- Gleicher Kartenstil: `bg-white/[0.03] backdrop-blur-md rounded-2xl`
- Letzter Schritt mit Neon-Highlight wie auf Startseite
- `grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8`
- **Animation:** Gestaggertes fade-up, `delay: index * 0.15`

---

### Sektion 4: Features (4 Features mit eigenen Animationen)

**Konzept:** Jedes Feature im grossen Zweispalter (Text + Animation), alternierend wie auf der Startseite. Aber mit **einzigartigen, massgeschneiderten Animationen** fuer jedes Feature.

**Feature 1: Natuerliche Gespraeche**
- Text: "Der Assistent spricht wie ein Mensch -- nicht wie ein Roboter. Natuerliche Sprache, anpassbarer Tonfall, mehrsprachig."
- Animation: **Audio-Waveform** -- 5-7 vertikale Balken die in unterschiedlichen Hoehen pulsieren, wie ein Audio-Equalizer. Gebaut mit motion.div-Elementen, `animate={{ height }}`, random Hoehen, langsam und smooth. Farbe: `bg-accent/60`.

**Feature 2: Intelligente Weiterleitung**
- Text: "Erkennt, wann ein Mensch uebernehmen muss, und leitet nahtlos an die richtige Person weiter."
- Animation: **Flow-Dots** -- Drei Kreise (KI, Entscheidung, Mensch) verbunden durch eine Linie. Ein leuchtender Punkt wandert von links nach rechts, pausiert beim mittleren Kreis (Entscheidung), waehlt dann den Weg zum dritten Kreis. Aehnlich wie WorkflowDemo, aber mit Entscheidungslogik.

**Feature 3: Terminbuchung**
- Text: "Bucht Termine direkt waehrend des Anrufs -- synchronisiert mit eurem Kalender."
- Animation: **Kalender-Slot** -- Ein minimaler 3x3 Grid aus Zellen (Mo-Fr). Eine Zelle faerbt sich mit einem sanften Glow ein (der gebuchte Termin), dann erscheint ein kleiner Checkmark. Alles in `text-accent`.

**Feature 4: Echtzeit-Zusammenfassung**
- Text: "Nach jedem Anruf: automatische Zusammenfassung, Transkript und Action Items."
- Animation: **Typewriter** -- 3-4 kurze Zeilen die Buchstabe fuer Buchstabe erscheinen, wie eine KI die tippt. Zeilen: "Anrufer: Herr Schmidt", "Anliegen: Terminbuchung", "Status: Erledigt". Monospace-Schrift, `text-accent/70`.

Jedes Feature: `grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16`, Animation-Bereich `h-[280px] md:h-[340px] rounded-2xl bg-white/[0.03]`. Alle Animationen starten `onInView` mit `once: true`.

---

### Sektion 5: Anwendungsfaelle

**Konzept:** Minimales Grid, nur Text, kein visueller Overhead.

- Headline: `Fuer jede Branche.` -- `text-3xl md:text-5xl font-bold`
- Grid `grid-cols-1 md:grid-cols-2 gap-8`, 4 Eintraege:
  - **Arztpraxen** -- Terminvergabe und Rezeptanfragen automatisieren
  - **Handwerk** -- Auftraege annehmen, auch wenn das Team auf der Baustelle ist
  - **Kanzleien** -- Erstgespraeche vorqualifizieren und Rueckrufbitten aufnehmen
  - **E-Commerce** -- Bestellstatus und Retouren telefonisch abwickeln
- Jeder Eintrag: Branchenname fett (`text-foreground font-semibold`) + ein Satz (`text-muted-foreground`)
- Keine Icons, keine Karten, keine Borders -- nur Text mit Weissraum
- **Animation:** Gestaggertes fade-up, `delay: index * 0.1`

---

### Sektion 6: Testimonial

- Ein einziges, grosses Zitat: Dr. Lisa Weber (das Telefonassistent-Testimonial)
- Gleicher Stil wie Startseite: `text-xl md:text-2xl lg:text-3xl font-light italic`
- Kein Auto-Wechsel (nur ein Zitat), statisch
- **Animation:** Fade-up mit blur, `whileInView`

---

### Sektion 7 + 8: CTA + Footer

Bestehende Komponenten direkt importieren. Keine Aenderungen.

---

### Startseite: Demos bleiben!

Die bestehenden PhoneDemo, ChatDemo und WorkflowDemo auf der Startseite sind hochwertig und bleiben unveraendert. Es werden KEINE Platzhalter eingefuegt. Der einzige "Mehr erfahren"-Link der ersten Karte wird auf `/telefonassistent` geaendert.

---

### Globale Seiten-Details

- Video-Hintergrund wie auf Startseite (Index.tsx Pattern mit `<video>` und Scroll-Opacity)
- Scroll-to-top beim Navigieren zur Unterseite
- Navigation oben: "KI-Telefonassistent" Link wird zu `/telefonassistent` (React Router Link statt Anchor)
- Footer: Link "KI-Telefonassistent" wird zu `/telefonassistent`

---

### Technische Umsetzung

**Neue Dateien:**
- `src/pages/PhoneAssistant.tsx` -- Hauptseite mit Video-Hintergrund, importiert Navigation, CTASection, Footer
- `src/components/phone-assistant/PhoneHero.tsx` -- Hero mit SVG-Phone-Outline + Wellenform
- `src/components/phone-assistant/ProblemSection.tsx` -- Zentrierter Text
- `src/components/phone-assistant/HowItWorks.tsx` -- 3-Schritt-Grid
- `src/components/phone-assistant/PhoneFeatures.tsx` -- 4 Features mit Animationen
- `src/components/phone-assistant/WaveformAnimation.tsx` -- Audio-Equalizer Animation
- `src/components/phone-assistant/FlowDotsAnimation.tsx` -- Weiterleitungs-Flow
- `src/components/phone-assistant/CalendarAnimation.tsx` -- Kalender-Slot Animation
- `src/components/phone-assistant/TypewriterAnimation.tsx` -- Typewriter-Effekt
- `src/components/phone-assistant/UseCases.tsx` -- Branchen-Grid
- `src/components/phone-assistant/PhoneTestimonial.tsx` -- Einzelnes Zitat

**Aenderungen an bestehenden Dateien:**
- `src/App.tsx` -- Route `/telefonassistent` hinzufuegen
- `src/components/Navigation.tsx` -- navLinks: `href: "#telefonassistent"` wird zu `href: "/telefonassistent"` (mit React Router Link)
- `src/components/FeaturesSection.tsx` -- Erste Karte `href` von `#telefonassistent` zu `/telefonassistent`
- `src/components/Footer.tsx` -- Link von `#telefonassistent` zu `/telefonassistent`

**Animations-Patterns (alle mit motion/react):**
- `appleEase: [0.16, 1, 0.3, 1]`
- `duration: 0.8` fuer alle whileInView
- `useInView` mit `once: true` fuer alle Demo-Animationen
- BlurText-Komponente fuer den Hero-Titel (bestehendes Pattern)
- SVG `pathLength` fuer Phone-Outline Draw
- `motion.div` mit `animate={{ height }}` fuer Waveform-Balken

