

## CTA-Section vor dem Footer -- 3 Design-Vorschlaege

Hier sind drei Varianten, die zum dunklen Setrex-Design mit Neon-Akzenten passen. Alle nutzen `motion` fuer dezente Scroll-Animationen (fade + blur, wie im Hero). Du suchst dir eine aus, und ich baue sie.

---

### Variante 1: "Spotlight Card"

Eine einzelne, grosse Karte mit Glassmorphism-Effekt, zentriertem Text und einem subtilen Neon-Glow am Rand, der beim Scrollen einblendet.

```text
+----------------------------------------------------------+
|                                                          |
|  ╔══════════════════════════════════════════════════════╗ |
|  ║  (neon border-glow, glass background)               ║ |
|  ║                                                      ║ |
|  ║     Bereit, euer Unternehmen zu entlasten?           ║ |
|  ║     Beschreibungstext...                             ║ |
|  ║                                                      ║ |
|  ║     [ Jetzt beraten lassen ]  [ WhatsApp ]           ║ |
|  ║                                                      ║ |
|  ╚══════════════════════════════════════════════════════╝ |
|                                                          |
+----------------------------------------------------------+
```

- Glassmorphism-Karte (`bg-white/5 backdrop-blur-md`)
- Neon-Border-Glow (`border-neon/30`, `shadow-[0_0_40px_hsl(72_100%_60%/0.15)]`)
- Scroll-Animation: Karte faded rein mit leichtem Scale-Effekt
- Elegant, minimalistisch, passt perfekt zum Feature-Karten-Stil

---

### Variante 2: "Split Layout mit Zahlen"

Links eine grosse Headline mit animierten Zahlen (z.B. "15h gespart/Woche", "80% Anfragen automatisiert"), rechts der CTA-Bereich. Die Zahlen zaehlen beim Scrollen hoch.

```text
+----------------------------------------------------------+
|                                                          |
|   15h+              |   Bereit fuer den naechsten        |
|   gespart/Woche     |   Schritt?                         |
|                      |                                    |
|   80%               |   Lass uns gemeinsam herausfinden,  |
|   automatisiert     |   wie KI euer Business entlastet.   |
|                      |                                    |
|   24/7              |   [ Jetzt beraten lassen ]          |
|   erreichbar        |   [ WhatsApp schreiben ]            |
|                      |                                    |
+----------------------------------------------------------+
```

- Zahlen in `text-neon` mit Count-Up-Animation beim Scroll
- Trennlinie in der Mitte (`border-l border-border/20`)
- Scroll-Animation: Zahlen von links, Text von rechts (staggered blur-in)
- Datengetrieben, ueberzeugend, zeigt konkreten Mehrwert

---

### Variante 3: "Minimalistischer Full-Width Banner"

Ein schlichter, breiter Streifen mit einer grossen Headline, einem kurzen Satz und den beiden Buttons. Oben eine feine Neon-Linie, die beim Scrollen von der Mitte nach aussen waechst.

```text
+----------------------------------------------------------+
|  ════════════════════════════════════════ (neon line)     |
|                                                          |
|          Lass uns reden.                                 |
|          Kostenlos und unverbindlich.                     |
|                                                          |
|     [ Jetzt beraten lassen ]     [ WhatsApp schreiben ]  |
|                                                          |
+----------------------------------------------------------+
```

- Animierte Neon-Linie oben (waechst von 0 auf volle Breite beim Scrollen)
- Grosse, bold Headline (`text-5xl font-bold`)
- Maximal reduziert -- wirkt durch Weissraum und Typografie
- Scroll-Animation: Text blur-in, Linie expand, Buttons fade-in mit Delay

---

### Meine Empfehlung

**Variante 2 (Split Layout mit Zahlen)** -- die animierten Zahlen sind ein echter Hingucker, wirken professionell und liefern gleichzeitig Social Proof. In Kombination mit dem staggered Blur-Effekt, den ihr schon im Hero nutzt, fuegt sich das nahtlos ein, ohne uebertrieben zu wirken.

Aber Variante 1 waere die sicherere Wahl, wenn ihr es eher clean halten wollt. Variante 3 ist am minimalistischsten.

### Technische Umsetzung (gilt fuer alle)

- **Neue Datei**: `src/components/CTASection.tsx`
- **Einbindung**: In `src/pages/Index.tsx` zwischen TestimonialsSection und Footer
- **Animationen**: `motion` (bereits installiert) mit IntersectionObserver fuer Scroll-Trigger
- **Keine neuen Dependencies** noetig

Welche Variante soll ich bauen?

