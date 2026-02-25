

# Standbild an Video-Look anpassen

## Problem

Das aktuell generierte Standbild (`hero-background-still.jpg`) basiert auf dem farbigen `earth-hero.jpg`. Obwohl die CSS-Filter `brightness(0.7) contrast(2)` und `mixBlendMode: hard-light` draufliegen, sieht es auf Mobile immer noch zu bunt aus — vor allem die blaue Erde sticht heraus.

Das Desktop-Video hingegen wirkt fast monochrom: dunkel, hochkontrastig, mit einer dezenten grauen/weissen Erde und Sternen im Hintergrund.

## Loesung

Das Standbild mit der Bildgenerierung neu erstellen. Dabei wird das bestehende `earth-hero.jpg` als Basis genommen, aber mit klaren Anweisungen:

- **Komplett entsaettigt / monochrom** — keine Blautöne, keine Farbe
- **Sehr dunkel** mit hohem Kontrast
- **Gleiche Komposition**: Erde von oben, Weltraum, Sterne
- Das Ergebnis soll so aussehen, als hätte man einen Frame aus dem Video genommen

Das neue Bild wird als `/public/videos/hero-background-still.jpg` gespeichert und ersetzt das aktuelle.

## Betroffene Dateien

Nur eine Datei wird ersetzt — kein Code muss geaendert werden:

| Datei | Aenderung |
|-------|-----------|
| `public/videos/hero-background-still.jpg` | Neues, monochromes Standbild |

## Technischer Hinweis

Die CSS-Filter (`brightness(0.7) contrast(2)` + `hard-light` Blend-Mode) werden weiterhin auf das Bild angewandt. Das neue Quellbild muss also bereits dunkel und entsaettigt sein, damit das Endergebnis dem Video-Look auf Desktop entspricht.

