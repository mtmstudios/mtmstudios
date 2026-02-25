

# Redesign: "Das sind wir" Seite -- Werte, Warum wir, Zahlen entfernen

## Aenderungen

### 1. "Wofuer wir stehen" -- Karten umgestalten

**Aktuell:** Grosse Zahl ("01", "02"...) im Hintergrund, Text linksbuendig.

**Neu:** Das Wort des Werts selbst (z.B. "Klarheit", "Vertrauen") als grosser Hintergrundtext statt der Nummer. Alle Inhalte zentriert (Text, Akzentlinie). Die Akzentlinie wird `mx-auto` zentriert.

```
Vorher:                          Nachher:
┌─────────────────┐              ┌─────────────────┐
│            01   │              │    Klarheit      │  <-- gross, subtle
│ ──                             │       ──         │  <-- zentriert
│ Klarheit        │              │    Klarheit      │
│ Wir machen...   │              │  Wir machen...   │  <-- text-center
└─────────────────┘              └─────────────────┘
```

### 2. "Warum wir" -- Komplett neues Layout

**Aktuell:** Nummerierte Liste (01, 02, 03) mit border-top Trennlinien -- wirkt wie eine zweite Aufzaehlung nach den Werte-Karten.

**Neu:** Ein grosser, zentrierter Textblock im Editorial-Stil. Kein Grid, keine Nummern. Stattdessen ein paar kraftvolle Saetze die folgende Inhalte vereinen:
- Persoenlich statt anonym (bestehend)
- Vor Ort oder remote (neu)
- Ergebnisorientiert (bestehend)
- Miteinander wachsen (neu)
- Langfristig gedacht (bestehend)

Format: 3-4 kurze, zentrierte Absaetze mit unterschiedlicher Textgroesse fuer visuellen Rhythmus. Dazwischen eine dezente Akzentlinie. Kein Grid, keine Karten, keine Nummern.

```
         Warum wir

   Wir arbeiten direkt mit euch —
   persoenlich, vor Ort oder remote.

            ──

   Wir zaehlen keine Features.
   Wir messen, wie viel Zeit
   ihr zurueckbekommt.

            ──

   Unsere Loesungen wachsen mit euch.
   Weil wir miteinander wachsen wollen.
```

### 3. "In Zahlen" Section -- Komplett entfernen

Die gesamte Trust-Stats-Section (Zeilen 260-290) wird entfernt, inklusive der `trustStats`-Daten, `CountUp`-Komponente, `trustRef` und `trustInView`. Passt nicht zum persoenlichen Charakter der Seite.

## Betroffene Datei

Nur `src/pages/AboutUs.tsx` -- alles in einer Datei.

