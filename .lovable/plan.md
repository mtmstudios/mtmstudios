

## Apple-Style Redesign: Loesungskarten und Prozess-Sektion

### Ueberblick

Zwei Komponenten werden grundlegend ueberarbeitet: Die drei Loesungskarten werden zu grossen, ruhigen Apple-style Showcase-Karten, und die 5 Prozess-Schritte werden auf 3 verdichtet. Dazu werden alle Section-Badges entfernt, Spacing erhoeht und Animationen verlangsamt. Die Integrationen-Sektion bleibt unveraendert.

---

### 1. Loesungskarten: Von 3 Spalten zu vertikalen Showcase-Karten

**Aktuell:** Drei kleine Karten nebeneinander mit Demo-Area oben und Text unten. Wirkt gedraengt.

**Neu:** Jede Loesung bekommt eine eigene, breite Karte die fast die volle Breite einnimmt. Zwei Spalten pro Karte: eine Seite fuer die Animation, die andere fuer den Text. Ungerade und gerade Karten werden gespiegelt (Animation links/rechts wechselnd).

- Grid wird von `grid-cols-3` zu `flex flex-col gap-24` (vertikal gestapelt, grosser Abstand)
- Jede Karte: `grid grid-cols-1 md:grid-cols-2` mit grosszuegigem inneren Padding
- Animation-Bereich wird hoeher (`h-[300px]` statt `h-[220px]`)
- Textbereich: kein Icon-Badge, groesserer Titel (`text-2xl md:text-3xl`), linksbuendig auf Desktop
- Kein sichtbarer Border, kein hover-translate, nur ein sehr dezenter Glow
- Badge "Unsere Loesungen" wird entfernt
- Headline groesser: `text-4xl md:text-5xl`

**Animationen bleiben, werden ruhiger:**
- PhoneDemo: Pulse-Ringe langsamer (3s statt 2s), nur 2 statt 3 Ringe
- ChatDemo: Bleibt wie es ist (bereits gut)
- WorkflowDemo: Bleibt wie implementiert (3-Step linear)

---

### 2. Prozess-Sektion: Von 5 auf 3 Schritte

Die 5 Schritte werden auf 3 verdichtet, wobei "Partnerschaft" als Finale herausgestellt wird:

| Schritt | Titel | Beschreibung |
|---------|-------|-------------|
| 01 | Analyse und Strategie | Wir verstehen euer Business, identifizieren Potenziale und entwickeln einen klaren Plan. |
| 02 | Entwicklung und Launch | Von der Umsetzung bis zum Go-Live -- wir bauen und testen eure massgeschneiderte KI-Loesung. |
| 03 | Langfristige Partnerschaft | Keine Einmal-Projekte. Wir optimieren, skalieren und wachsen mit euch -- als euer KI-Partner. |

**Warum Partnerschaft so staerker wirkt:** Bei 5 Schritten war "Partnerschaft" einer von fuenf -- leicht ueberlesbar. Bei 3 Schritten ist es das grosse Finale, das ein Drittel der visuellen Flaeche einnimmt. Es sticht heraus.

**Layout:**
- Zig-Zag-Layout wird ersetzt durch drei Karten nebeneinander (`grid grid-cols-1 md:grid-cols-3`)
- Grosse Schrittnummer, Icon, Titel und ein Satz
- Schritt 3 behaelt den Neon-Highlight und den "Euer langfristiger KI-Partner"-Badge
- Badge "So funktioniert's" wird entfernt

---

### 3. Globale Apple-Touches

- **Alle Section-Badges/Pills entfernen:** "Unsere Loesungen", "So funktioniert's", "Kundenstimmen" -- weg damit
- **Mehr vertikaler Raum:** `py-20` wird zu `py-32` bei Features und Process
- **Langsamere Scroll-Animationen:** `duration: 0.8` statt `0.5`, Apple-typisches Ease `[0.16, 1, 0.3, 1]`
- **Testimonials Badge entfernen** (in TestimonialsSection.tsx)

---

### Technische Aenderungen

**Dateien die geaendert werden:**

1. **`src/components/FeaturesSection.tsx`** (Hauptaenderung)
   - Section-Padding von `py-20` auf `py-32`
   - Badge-Span entfernen
   - Headline auf `text-4xl md:text-5xl`
   - Grid von 3-spaltig zu `flex flex-col gap-24`
   - Jede Karte wird ein 2-spaltiges Grid mit gespiegelter Anordnung
   - Demo-Area hoeher, Text-Bereich linksbuendig mit groesserem Titel
   - Border und hover-translate entfernen
   - PhoneDemo: Pulse langsamher (duration 3s, 2 Ringe)
   - Animationen auf `duration: 0.8` und `ease: [0.16, 1, 0.3, 1]`

2. **`src/components/ProcessSection.tsx`**
   - Steps-Array von 5 auf 3 mit neuen Texten
   - Layout: vertikale Liste zu `grid grid-cols-1 md:grid-cols-3`
   - Zig-Zag-Animation entfernen, einfaches Fade-Up
   - Badge entfernen
   - Section-Padding auf `py-32`

3. **`src/components/TestimonialsSection.tsx`**
   - Badge "Kundenstimmen" entfernen
   - Headline auf `text-4xl md:text-5xl`

