

# Fix: Hintergrundbild auf regionalen Seiten (Tablet) nach unten verschieben

## Problem

Auf dem Tablet (820x1180) ist das Hintergrundbild auf den regionalen Seiten zu hoch angesetzt — die Erde/der Globus nimmt den oberen Bereich stark ein und wirkt deplatziert im Vergleich zu anderen Seiten.

## Loesung

In `src/components/regional/RegionalPage.tsx` wird dem `<img>` ein `objectPosition: 'center 60%'` hinzugefuegt. Das verschiebt den Fokuspunkt nach unten, sodass die Erde weiter im unteren Bereich des Viewports liegt — konsistent mit dem Eindruck auf Desktop und Mobile.

## Aenderung

**Datei:** `src/components/regional/RegionalPage.tsx` (Zeile 65)

Vorher:
```
style={{ mixBlendMode: "hard-light", filter: "brightness(0.7) contrast(2)", pointerEvents: "none" }}
```

Nachher:
```
style={{ mixBlendMode: "hard-light", filter: "brightness(0.7) contrast(2)", pointerEvents: "none", objectPosition: "center 60%" }}
```

Das ist eine einzeilige Aenderung in einer Datei.

