

## "Das sind Wir" -- Apple-like Premium Redesign

Die aktuelle Seite ist ein generischer englischer Platzhalter mit Cards und Stats. Der Redesign macht daraus eine emotional starke, cinematische Markenseite im Apple-Stil -- minimalistisch, viel Weissraum, grosse Typografie, sanfte Blur-Animationen.

---

### Seitenstruktur (von oben nach unten)

```text
1. HERO -- Grosser Claim
   "Wir sind MTM Studios."
   Subtitle: Was euch antreibt (1-2 Saetze)
   BlurText fade-in, viel Platz

2. MISSION -- Zentrierter Textblock
   Ein grosses, kraftvolles Statement
   Kein Icon, kein Card -- nur Typografie
   Text scrollt sanft rein mit blur

3. WERTE -- 3 grosse Werte
   Minimalistisch: Zahl + Titel + kurzer Satz
   Kein Card, kein Icon, kein Hintergrund
   Horizontal auf Desktop, vertikal auf Mobile
   Getrennt durch feine Linien (border)

4. TEAM / GRUENDER -- Persoenlicher Touch
   "Die Koepfe dahinter"
   2-3 Gruendermitglieder mit Namen + Rolle
   Kreisfoermige Avatar-Platzhalter (wie Apple Leadership)
   Schlicht, keine Cards

5. CTA -- Standard CTASection (wiederverwendet)

6. FOOTER -- Standard Footer (wiederverwendet)
```

---

### Design-Prinzipien

- **Keine Cards, keine Icons, keine Badges** -- nur Typografie, Linien, Weissraum
- **BlurText** fuer die Hauptueberschrift (konsistent mit allen anderen Seiten)
- **motion/react** fuer alle Sektionen mit `useInView({ once: true })` und staggered blur+fade
- **Grosse Schrift**: Hero h1 = `text-5xl md:text-7xl`, Sektions-Ueberschriften = `text-3xl md:text-5xl`
- **Viel vertikaler Abstand**: `py-32` zwischen Sektionen
- **Gleicher Video-Hintergrund** wie alle anderen Seiten
- **Deutsche Texte** durchgehend

---

### Technische Details

**Datei:** `src/pages/AboutUs.tsx` (komplett neuschreiben)

**1. Hero-Sektion**
- `BlurText` mit "Wir sind MTM Studios." (animateBy words, direction top)
- Darunter `motion.p` mit kurzem Claim, blur fade-in (delay 0.6)
- Kein Button, kein CTA -- lasst die Message wirken
- `min-h-[70vh]` mit flex center

**2. Mission-Sektion**
- Ein einzelner grosser Paragraph, zentriert
- `text-xl md:text-2xl`, `text-muted-foreground`, `max-w-3xl`
- `whileInView` blur fade-in
- Separator-Linie oben und unten (1px, border/10)

**3. Werte-Sektion**
- Array mit 3 Werten: z.B. "Klarheit", "Geschwindigkeit", "Partnerschaft"
- Jeder Wert: grosse Nummer ("01" / "02" / "03") in accent-Farbe, Titel bold, 1 Satz Description
- `grid grid-cols-1 md:grid-cols-3` mit `divide-x` auf Desktop
- Staggered animation (delay pro Item)

**4. Team-Sektion**
- "Die Koepfe dahinter" als Ueberschrift
- 2-3 Team-Member mit:
  - Runder Platzhalter-Kreis (bg-accent/10, keine Fotos noetig erstmal)
  - Name (font-semibold)
  - Rolle (text-sm, muted)
- `flex` Layout, zentriert
- Blur fade-in staggered

**5. CTA + Footer**
- Bestehende `CTASection` und `Footer` Komponenten wiederverwenden

**Imports:**
- `Navigation`, `CTASection`, `Footer` (bestehend)
- `BlurText` (bestehend)
- `motion, useInView` aus `motion/react`
- Video-Hintergrund Pattern aus Index.tsx (identisch)

**Entfernt:**
- `Button`, `Card`, `Users`, `Target`, `Rocket`, `Award` Imports
- `stats` und `values` Arrays
- Englische Texte komplett

