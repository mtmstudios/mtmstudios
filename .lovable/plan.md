

# Fix: Hintergrundbild auf regionalen Seiten weiter nach unten

## Problem

Das Hintergrundbild auf den regionalen Seiten zeigt die Erde/den Globus zu hoch — trotz `objectPosition: "center 60%"`. Der Globus dominiert den Hero-Bereich und ueberlagert den Text. Die Erde muss deutlich weiter nach unten geschoben werden, sodass nur der obere Rand des Globus im unteren Drittel des Viewports sichtbar ist.

## Loesung

`objectPosition` von `"center 60%"` auf `"center 85%"` aendern. Das verschiebt den Fokuspunkt des Bildes stark nach unten — die Erde erscheint dann nur noch als dezenter Bogen am unteren Bildschirmrand, wie auf den anderen Seiten (dort wird das Video genutzt, das denselben Effekt erzeugt).

## Aenderung

**Datei:** `src/components/regional/RegionalPage.tsx` (Zeile 65)

Vorher:
```
objectPosition: "center 60%"
```

Nachher:
```
objectPosition: "center 85%"
```

Eine einzeilige Aenderung in einer Datei.

