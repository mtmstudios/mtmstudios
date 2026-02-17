

## Footer Mobile-Optimierung

### Problem
Der Footer zeigt auf Mobile alle 4 Spalten (Brand, Leistungen, Unternehmen, Kontakt) untereinander in voller Laenge -- das erzeugt einen sehr langen Scroll-Bereich.

### Loesung
Kompakteres Mobile-Layout mit folgenden Aenderungen:

### Aenderungen in `src/components/Footer.tsx`

**1. Brand-Bereich auf Mobile zentrieren**
- Logo und Beschreibung zentriert
- Social Icons zentriert
- Kleinerer Abstand (`py-10` statt `py-16` auf Mobile)

**2. Link-Spalten auf Mobile als 2-Spalten-Grid**
- "Leistungen" und "Unternehmen" nebeneinander in einem 2-Spalten-Grid auf Mobile
- Das spart eine ganze Spalte Platz vertikal
- Grid-Struktur: `grid grid-cols-2 sm:grid-cols-1`

**3. Kontakt-Bereich kompakter**
- Kontakt-Infos auf Mobile horizontal/zentriert statt als vertikale Liste
- Oder als kompakte Zeile unter den Link-Spalten

**4. Gesamtstruktur auf Mobile**
Statt 4 Spalten untereinander wird der Footer so aufgebaut:

```text
Mobile:
+---------------------------+
|     [Logo] (zentriert)    |
|   Kurzbeschreibung        |
|   [Social Icons]          |
+---------------------------+
| Leistungen | Unternehmen  |
| - Link     | - Link       |
| - Link     | - Link       |
+---------------------------+
|   Kontakt (zentriert)     |
|   Mail | Telefon | Ort    |
+---------------------------+
|      Copyright            |
+---------------------------+
```

### Technische Details

- Padding: `py-10 md:py-16` fuer kompakteren Mobile-Abstand
- Brand-Block: `text-center md:text-left`, Logo und Social Icons zentriert auf Mobile
- Mittlere Spalten: In ein eigenes `grid grid-cols-2` auf Mobile wrappen
- Kontakt: `flex flex-wrap justify-center md:justify-start` fuer horizontale Anordnung auf Mobile
- Keine neuen Dependencies noetig

