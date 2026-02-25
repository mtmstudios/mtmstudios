

# Design-Audit: Automatisierungen, Das sind Wir, Karriere, Partner

Nach Durchsicht aller vier Seiten mit dem gleichen Premium-Standard.

---

## 1. AutomationsTestimonial: doppeltes Anfuehrungszeichen

**Betrifft:** `src/components/automations/AutomationsTestimonial.tsx` (Zeile 20)

Identisches Problem wie bei Phone/Chatbot: dekoratives „ als absolutes Element + nochmal „ im Text.

**Aenderung:** Fuehrendes „ im blockquote-Text entfernen.

---

## 2. AboutUs -- Werte-Karten: `whileHover={{ scale: 1.02, y: -4 }}` + Glow auf nicht-klickbaren Elementen

**Betrifft:** `src/pages/AboutUs.tsx` (Zeile 201-205)

Die 4 Werte-Karten (Klarheit, Geschwindigkeit etc.) haben `whileHover={{ scale: 1.02, y: -4 }}` plus manuellen JS-basiertem Glow (`onMouseEnter/onMouseLeave` mit boxShadow). Sie sind nicht klickbar. Widerspricht unserem Standard: nur interaktive Elemente bewegen sich.

**Aenderung:** `whileHover`, `onMouseEnter`, `onMouseLeave` und `style={{ boxShadow }}` entfernen. `hover:border-accent/30` kann bleiben (subtil genug).

---

## 3. AboutUs -- Trust-Zahlen-Karten: `whileHover={{ scale: 1.03, y: -4 }}` + Glow

**Betrifft:** `src/pages/AboutUs.tsx` (Zeile 283-286)

Gleiche Situation bei den 3 Statistik-Karten: `whileHover={{ scale: 1.03, y: -4 }}` plus JS-Glow. Nicht klickbar.

**Aenderung:** `whileHover`, `onMouseEnter`, `onMouseLeave` und `style={{ boxShadow }}` entfernen.

---

## 4. AboutUs -- "Warum wir" Steps: `whileHover={{ x: 8 }}`

**Betrifft:** `src/pages/AboutUs.tsx` (Zeile 242)

Die 3 "Warum wir"-Eintraege haben `whileHover={{ x: 8 }}` -- sie verschieben sich nach rechts beim Hover. Sie sind nicht klickbar. Der horizontale Shift ist ausserdem inkonsistent mit dem Rest der Seite.

**Aenderung:** `whileHover={{ x: 8 }}` entfernen.

---

## 5. Partner -- Pain Points: `whileHover={{ x: 8 }}` + Titel-Hover-Farbe

**Betrifft:** `src/pages/Partner.tsx` (Zeile 192, 200)

Die Pain-Point-Eintraege haben `whileHover={{ x: 8 }}` und der h3-Titel hat `group-hover:text-destructive/80`. Nicht klickbar -- gleicher Fix wie ueberall.

**Aenderung:** `whileHover={{ x: 8 }}` entfernen. `group-hover:text-destructive/80 group-active:text-destructive/80` aus h3 entfernen.

---

## 6. Partner -- Steps: `whileHover={{ y: -4 }}`

**Betrifft:** `src/pages/Partner.tsx` (Zeile 243)

Die 3 "Wir uebernehmen"-Schritte haben `whileHover={{ y: -4 }}`. Nicht klickbar.

**Aenderung:** `whileHover={{ y: -4 }}` entfernen.

---

## 7. Partner -- Benefits-Karten: `whileHover={{ scale: 1.02, y: -6 }}` + Glow + Titel-Hover

**Betrifft:** `src/pages/Partner.tsx` (Zeile 305-308, 318)

Die 4 Benefits-Karten haben `whileHover={{ scale: 1.02, y: -6 }}`, JS-Glow, und `group-hover:text-accent` auf dem Titel. Nicht klickbar.

**Aenderung:** `whileHover`, `onMouseEnter`, `onMouseLeave`, `style={{ boxShadow }}` entfernen. `group-hover:text-accent` aus h3 entfernen. `hover:border-accent/30` kann bleiben.

---

## 8. Partner -- Trust-Zahlen: `whileHover={{ scale: 1.03, y: -4, rotateX: 2 }}` + Glow

**Betrifft:** `src/pages/Partner.tsx` (Zeile 349-352)

Die 3 Statistik-Karten haben `whileHover` mit scale, y UND rotateX plus JS-Glow. Nicht klickbar.

**Aenderung:** `whileHover`, `onMouseEnter`, `onMouseLeave`, `style={{ boxShadow, perspective }}` entfernen.

---

## 9. Karriere -- Benefits-Karten: `hover:scale-[1.02]`

**Betrifft:** `src/pages/Karriere.tsx` (Zeile 126)

Die 8 Benefits-Karten haben `hover:scale-[1.02]`. Subtiler als die anderen, aber nach unserem Standard trotzdem inkonsistent -- nicht klickbar, sollte sich nicht bewegen.

**Aenderung:** `hover:scale-[1.02]` entfernen.

---

## Zusammenfassung

| # | Datei | Aenderung |
|---|-------|-----------|
| 1 | `automations/AutomationsTestimonial.tsx` | Doppeltes „ fixen |
| 2 | `AboutUs.tsx` | Werte-Karten: whileHover + Glow entfernen |
| 3 | `AboutUs.tsx` | Trust-Karten: whileHover + Glow entfernen |
| 4 | `AboutUs.tsx` | "Warum wir": whileHover x:8 entfernen |
| 5 | `Partner.tsx` | Pain Points: whileHover x:8 + Titel-Hover entfernen |
| 6 | `Partner.tsx` | Steps: whileHover y:-4 entfernen |
| 7 | `Partner.tsx` | Benefits: whileHover + Glow + Titel-Hover entfernen |
| 8 | `Partner.tsx` | Trust-Zahlen: whileHover + Glow entfernen |
| 9 | `Karriere.tsx` | Benefits: hover:scale entfernen |

3 Dateien, 9 Einzelaenderungen. Alles konsistente Anwendung der Regel: nicht-klickbare Elemente bewegen sich nicht.

