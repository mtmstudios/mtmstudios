

# Karriere-Seite: Hero, Benefits & CTA Upgrade

## 1. Hero-Text -- Cooler & lockerer

**Aktuell:** "Bock auf Zukunft?" + generischer Subtext

**Neu:**
- Headline: **"Mach KI. Nicht Meetings."**
- Subtext: **"Wir bauen KI-Loesungen, die Unternehmen veraendern. Kein Corporate-Bullshit, keine endlosen Abstimmungsrunden -- einfach bauen."**

Frech, direkt, bleibt haengen.

---

## 2. Benefits-Section -- Gleichmaessig & visuell ansprechend

### Problem
- 7 Benefits = ungleichmaessiges Grid (4+3 auf Desktop)
- Kleine Icons, kein Subtext -- langweilig

### Loesung
- **8 Benefits** (neues: "Startup-Vibes" mit Rocket-Icon) fuer ein perfekt gleichmaessiges Grid
- Jede Karte bekommt einen **kurzen Subtext** in `text-xs text-foreground/40`
- Groessere Icon-Container: `w-14 h-14 rounded-2xl`
- Icons: `w-7 h-7 text-foreground/60` (neutraler statt Tuerkis)
- Mehr Padding pro Karte: `p-8`
- Desktop: 4x2 Grid, Tablet: 2x4, Mobile: 2x4

**Benefits mit Subtexten:**

| Benefit | Subtext |
|---------|---------|
| Wellpass | Fitness & Wellness |
| 100% Remote | Arbeite von ueberall |
| Vertrauensarbeitszeit | Keine Stechuhr |
| Teamausfluege | Zusammen unterwegs |
| Weiterbildungsbudget | Lerne was du willst |
| Neuste Tools & Hardware | Top-Setup ab Tag 1 |
| Flache Hierarchien | Deine Meinung zaehlt |
| Startup-Vibes | Klein, schnell, direkt |

---

## 3. Bottom CTA -- Persoenlicher & einladender

**Aktuell:** "Bereit fuer was Neues?"

**Neu:**
- Headline: **"Ueberzeugt? Dann melde dich."**
- Subtext darunter: **"Kein Anschreiben noetig. Erzaehl uns einfach, worauf du Lust hast."** in `text-lg text-muted-foreground`
- Button-Text bleibt "Jetzt bewerben"

---

## Technische Umsetzung

### Datei: `src/pages/Karriere.tsx`

**Imports (Zeile 7):** `Rocket` hinzufuegen

**Benefits-Array (Zeilen 29-37):** 8 Eintraege mit `{ label, icon, sub }` Struktur

**Hero (Zeilen 53-64):**
- BlurText text: "Mach KI. Nicht Meetings."
- Subtext: Neue freche Copy

**Benefits-Grid (Zeilen 117-142):**
- Grid: `grid-cols-2 lg:grid-cols-4 gap-5`
- Karten: `p-8`, groessere Icons (`w-14 h-14`), Subtext-Zeile
- Icon-Farbe: `text-foreground/60` statt `text-accent`

**Bottom CTA (Zeilen 148-170):**
- Headline: "Ueberzeugt? Dann melde dich."
- Neuer Subtext-Paragraph darunter

