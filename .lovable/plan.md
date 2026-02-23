

## Footer-Erweiterung und rechtliche Seiten

### 1. Footer-Aenderungen (`src/components/Footer.tsx`)

**Copyright-Bereich erweitern:**
- "Mit ❤️ fuer den Mittelstand." als eigene Zeile unter dem Copyright, mit einem Lucide `Heart`-Icon in Accent-Farbe (tuerkis, gefuellt)
- Darunter eine Zeile mit Links zu Impressum, Datenschutz und AGB, getrennt durch dezente Punkte oder Separatoren
- Layout: Alles zentriert, dezent in `text-muted-foreground text-xs`

**Ergebnis im Copyright-Bereich:**
```
© 2025 MTM Studios
Mit [Heart] fuer den Mittelstand.
Impressum  ·  Datenschutz  ·  AGB
```

### 2. Drei neue Seiten (Platzhalter-Inhalte)

Alle drei Seiten folgen dem gleichen Layout-Pattern: Navigation oben, Content zentriert, Footer unten. Dunkler Hintergrund passend zum Rest der Seite. Prose-artiges Layout mit max-w-3xl.

**`src/pages/Impressum.tsx`**
- Titel: "Impressum"
- Standard-Platzhalter mit typischen Impressum-Feldern (Firmenname, Adresse, Kontakt, Vertretungsberechtigter, Handelsregister, USt-IdNr.)
- Alle Werte als Platzhalter markiert zum spaeteren Ausfuellen

**`src/pages/Datenschutz.tsx`**
- Titel: "Datenschutzerklarung"
- Platzhalter-Sections: Verantwortlicher, Erhebung und Speicherung, Weitergabe, Cookies, Rechte der Betroffenen, etc.

**`src/pages/AGB.tsx`**
- Titel: "Allgemeine Geschaeftsbedingungen"
- Platzhalter-Sections: Geltungsbereich, Vertragsschluss, Leistungen, Zahlung, Haftung, etc.

### 3. Routing (`src/App.tsx`)

Drei neue Routes hinzufuegen:
- `/impressum` -> Impressum
- `/datenschutz` -> Datenschutz
- `/agb` -> AGB

### Dateien-Uebersicht

| Datei | Aktion |
|---|---|
| `src/components/Footer.tsx` | Aendern -- Heart-Zeile + Legal-Links |
| `src/pages/Impressum.tsx` | Neu -- Impressum-Platzhalter |
| `src/pages/Datenschutz.tsx` | Neu -- Datenschutz-Platzhalter |
| `src/pages/AGB.tsx` | Neu -- AGB-Platzhalter |
| `src/App.tsx` | Aendern -- 3 neue Routes |

