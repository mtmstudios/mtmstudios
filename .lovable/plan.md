

## "Das sind Wir" Seite ueberarbeiten

### Ueberblick
Die Seite wird laenger, vertrauensvoller und persoenlicher -- ohne Team-Fotos. Der gewuenschte Leitsatz wird prominent eingebunden. Die Team-Section mit Platzhalter-Kreisen faellt weg.

### Aenderungen in `src/pages/AboutUs.tsx`

**1. Hero -- Untertitel erweitern**
Der kurze Subtitle wird ersetzt durch den gewuenschten Leitsatz:
> "Technologie schafft Moeglichkeiten, Vertrauen entscheidet. Wir sorgen dafuer, dass KI dir vor allem eines bringt: Zeit fuer deine Kunden."

**2. Mission-Section -- ausfuehrlicher**
Der bestehende Missions-Text bleibt, wird aber ergaenzt um einen zweiten Absatz der mehr Tiefe gibt:
> "Unser Versprechen: Keine Black-Box-Loesungen, keine leeren Buzzwords. Sondern Technologie, die ihr versteht, der ihr vertraut — und die ab Tag eins Ergebnisse liefert."

**3. Werte-Section -- vierter Wert hinzufuegen**
Zu den drei bestehenden Werten (Klarheit, Geschwindigkeit, Partnerschaft) kommt ein vierter:
- **04 — Vertrauen**: "Transparenz in jedem Schritt. Ihr wisst immer, was wir tun, warum wir es tun — und was es euch bringt."
- Grid aendert sich von `md:grid-cols-3` auf `md:grid-cols-2` fuer bessere Balance mit 4 Karten
- Die `md:divide-x` Trenner werden entfernt, stattdessen bekommt jede Karte einen subtilen Border (`border border-border/10 rounded-2xl p-8`)

**4. Team-Section komplett ersetzen**
Die Team-Section mit Platzhalter-Bildern und Dummy-Namen wird entfernt. Stattdessen kommt eine neue "Warum wir"-Section mit drei kurzen Statements als horizontale Karten:
- "Persoenlich statt anonym" — "Ihr arbeitet direkt mit uns — nicht mit einem Support-Ticket."
- "Ergebnisorientiert" — "Wir messen Erfolg nicht in Features, sondern in eingesparter Zeit."
- "Langfristig gedacht" — "Unsere Loesungen wachsen mit eurem Unternehmen — ohne Vendor Lock-in."

Diese werden als schlichte Text-Blocks mit Nummer und Divider dargestellt, kein Foto noetig.

**5. Neue Trust-Zahlen-Section (optional, vor CTA)**
Einfache Statistik-Zeile aehnlich der TrustSection von Automations, aber schlichter:
- "50+ automatisierte Prozesse"
- "12h+ eingesparte Zeit pro Woche"  
- "100% Transparenz"

Drei Zahlen nebeneinander mit CountUp-Animation.

### Technische Details

- Datei: `src/pages/AboutUs.tsx` — einzige Datei die geaendert wird
- `team`-Array und `teamRef`/`teamInView` werden entfernt
- Neues `reasons`-Array fuer die "Warum wir"-Section
- Neues `trustStats`-Array fuer die Zahlen-Section
- Einfacher CountUp wie in `TrustSection.tsx` bereits implementiert (inline, kein Import noetig)
- Neue refs: `reasonsRef` mit `useInView`, `trustRef` mit `useInView`
- Alle Animationen nutzen weiterhin `appleEase` und `blur`-Transitions

### Seitenstruktur (neu)

1. **Hero** — "Wir sind MTM Studios." + neuer Leitsatz
2. **Mission** — Bestehender Text + neuer Vertrauens-Absatz
3. **Werte** — 4 Karten im 2x2 Grid (Klarheit, Geschwindigkeit, Partnerschaft, Vertrauen)
4. **Warum wir** — 3 Statements ohne Bilder
5. **Trust-Zahlen** — 3 Statistiken mit CountUp
6. **CTA + Footer**

