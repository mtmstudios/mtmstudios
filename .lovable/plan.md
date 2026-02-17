
## Moderne Scroll-Animationen fuer die Prozess-Section

Upgrade der bestehenden Fade-In-Animation zu einem richtungsbezogenen Staggered Slide-In, das zum versetzten Karten-Layout passt.

### Aenderung: `src/components/ProcessSection.tsx`

**Aktuelle Animation:** Alle Karten kommen von unten (`y: 30`) — wirkt etwas eintoenig.

**Neue Animation:**
- Ungerade Karten (01, 03, 05 — links positioniert) gleiten von links rein: `initial={{ opacity: 0, x: -60 }}`
- Gerade Karten (02, 04 — rechts positioniert via `md:ml-auto`) gleiten von rechts rein: `initial={{ opacity: 0, x: 60 }}`
- Auf Mobile (kein Versatz) gleiten alle von unten rein: `initial={{ opacity: 0, y: 30 }}`
- Weiterhin `whileInView` mit `viewport={{ once: true }}`
- Timing: `duration: 0.6`, stagger `delay: index * 0.12`
- Easing: `ease: [0.25, 0.1, 0.25, 1]` (cubic-bezier, smooth und premium)

**Partnerschafts-Karte (letzte Karte) Bonus:**
- Leichter Scale-Effekt: `initial={{ opacity: 0, x: -60, scale: 0.97 }}` -> `whileInView={{ opacity: 1, x: 0, scale: 1 }}`
- Etwas laengere Duration (`0.7s`) fuer einen "Landing"-Effekt

**Section-Header Animation:**
- Badge und Headline ebenfalls mit Fade-In von oben: `initial={{ opacity: 0, y: -20 }}`

### Technische Details

- Nutzung von `useMediaQuery` oder `window.matchMedia` ist nicht noetig — stattdessen wird die x-Richtung immer gesetzt, da auf Mobile die Karten ohnehin zentriert sind und der horizontale Slide minimal wirkt
- Keine neuen Dependencies
- Nur Aenderungen in `ProcessSection.tsx`
