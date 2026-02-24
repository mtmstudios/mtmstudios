

# Karriere-Seite: Apple-Style Statement-Sektionen

## Konzept

Zwischen Hero und Benefits werden 2-3 grosse, zentrierte Statement-Sektionen eingefuegt -- jeweils eine provokante Frage als fette Headline, darunter ein kurzer erklarender Text in `muted-foreground`. Genau wie im Referenzbild: Grosser weisser Text, darunter grauer Subtext, zentriert, viel Freiraum.

Der Besucher scrollt durch und nickt bei jeder Frage: "Ja, das will ich."

## Die 3 Statements

**Statement 1:**
- Headline: "Du willst mit den neusten KI-Tools arbeiten?"
- Subtext: "Wir setzen auf Claude, ChatGPT, N8N und alles, was morgen Standard ist -- heute schon."

**Statement 2:**
- Headline: "Du willst KI wirklich verstehen?"
- Subtext: "Nicht nur anwenden, sondern durchdringen. Bei uns baust du Loesungen, die Unternehmen transformieren."

**Statement 3:**
- Headline: "Du willst kein Konzern-Hamsterrad?"
- Subtext: "Flache Hierarchien, echte Verantwortung, Remote-first. Dein Impact zaehlt ab Tag eins."

## Layout pro Statement

Jede Sektion bekommt:
- `py-[20vh]` fuer massiven Freiraum (wie Apple)
- Headline: `text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-center`
- Subtext: `text-lg sm:text-xl text-muted-foreground text-center max-w-lg mx-auto mt-6`
- BlurText-Animation fuer die Headline (Signature-Effekt)
- Fade+Blur fuer den Subtext

## Seitenstruktur (neu)

```text
+---------------------------+
|       Navigation          |
+---------------------------+
|                           |
|    Hero (bestehend)       |
|    "Bock auf Zukunft?"    |
|                           |
+---------------------------+
|                           |
|                           |
|  Statement 1 (neu)       |
|  "Du willst mit den      |
|   neusten KI-Tools..."   |
|                           |
|                           |
+---------------------------+
|                           |
|                           |
|  Statement 2 (neu)       |
|  "Du willst KI wirklich  |
|   verstehen?"            |
|                           |
|                           |
+---------------------------+
|                           |
|                           |
|  Statement 3 (neu)       |
|  "Du willst kein         |
|   Konzern-Hamsterrad?"   |
|                           |
|                           |
+---------------------------+
|                           |
|    Benefits (bestehend,   |
|    mit groesseren Icons)  |
|                           |
+---------------------------+
|                           |
|    Bottom CTA             |
|                           |
+---------------------------+
|       Footer              |
+---------------------------+
```

## Zusaetzliche Verbesserungen

- **Benefits-Icons**: Von `w-4 h-4` auf `w-6 h-6` vergroessert, Icon-Container `w-12 h-12 rounded-xl bg-white/[0.04]`
- **Benefits-Layout**: Von Chips zu `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4` Karten mit `p-6 rounded-2xl`
- **Benefits-Headline**: Von `text-2xl` auf `text-3xl md:text-4xl`, `mb-16` statt `mb-8`
- **Hero**: Mehr Padding `pt-[18vh] pb-[12vh]`, Headline auf `text-5xl sm:text-6xl md:text-7xl`
- **Bottom CTA**: `py-32`, groesserer Text `text-2xl md:text-3xl`

## Technische Umsetzung

### Datei: `src/pages/Karriere.tsx`

- `statements` Array mit 3 Objekten (headline, subtext)
- Mapping ueber statements mit `motion.section` und BlurText fuer Headlines
- Benefits-Bereich: Grid-Layout mit Icon-Karten statt Chips
- Hero/CTA: Mehr Whitespace und groessere Typo

