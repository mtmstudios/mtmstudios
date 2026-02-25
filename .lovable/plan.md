

# Fix: Hintergrundbild auf regionalen Seiten — Positionierung an Karriere-Seite angleichen

## Analyse

Ich habe beide Seiten auf Desktop (1920x1080) verglichen:

- **Karriere-Seite**: Erde gut sichtbar, Kurve prominent in der unteren Hälfte. Verwendet **kein** `objectPosition` (Standard: `center center`).
- **Regionale Seite**: Erde fast unsichtbar durch `objectPosition: "center 85%"` — viel zu aggressiv nach unten verschoben.

Auf Tablet (820x1180) ist das Problem noch deutlicher — die Erde verschwindet fast komplett.

## Lösung

`objectPosition: "center 85%"` aus dem `<img>`-Style in `RegionalPage.tsx` **entfernen**. Dann verhält sich das Bild identisch wie auf der Karriere-Seite (Standard `object-cover` ohne Versatz).

## Änderung

**Datei:** `src/components/regional/RegionalPage.tsx` (Zeile 65)

Vorher:
```
style={{ mixBlendMode: "hard-light", filter: "brightness(0.7) contrast(2)", pointerEvents: "none", objectPosition: "center 85%" }}
```

Nachher:
```
style={{ mixBlendMode: "hard-light", filter: "brightness(0.7) contrast(2)", pointerEvents: "none" }}
```

Eine einzeilige Änderung in einer Datei.

