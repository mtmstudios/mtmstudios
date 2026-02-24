

# Plan: Regionale SEO-Seiten mit deutlich mehr Content

## Problem

Die aktuellen regionalen Seiten haben ca. 400-500 Woerter. Fuer wettbewerbsfaehige regionale Rankings (z.B. "KI Agentur Stuttgart") braucht es 800-1.500 Woerter pro Seite.

---

## Loesung: Content-Erweiterung in 3 Bereichen

### 1. Neuer Fliesstext-Abschnitt pro Seite

Jede Seite bekommt einen neuen Abschnitt zwischen "Lokaler Kontext" und "Pain Points" mit dem Arbeitstitel **"So profitieren Unternehmen in [Stadt]"**. Dieser Abschnitt enthaelt:

- 200-400 Woerter Fliesstext
- Natuerliche Keyword-Integration (Haupt-Keyword 2-3x erwaehnt)
- Konkrete Branchen-Beispiele der jeweiligen Stadt
- Lokale Bezuege (Stadtteile, Wirtschaftsstruktur, regionale Besonderheiten)

Beispiel Stuttgart/KI-Agentur: Bezug auf Automobilzulieferer, Handwerk im Kessel, Agenturen in der Innenstadt, B2B-Dienstleister im Neckartal.

Beispiel Ulm: Bezug auf Wissenschaftsstadt, Innovationsregion Ulm/Neu-Ulm, Handwerk, mittelstaendische Fertigung, Donau-Region.

### 2. FAQ-Antworten verlaengern

Jede FAQ-Antwort wird von 1-2 Saetzen auf 3-5 Saetze erweitert. Das verbessert:
- Chance auf Google Featured Snippets
- Gesamtwoerteranzahl pro Seite
- Nutzwert fuer Besucher

### 3. Lokaler Kontext erweitern

Der kurze Absatz "localContext" wird von 3 auf 5-7 Saetze erweitert mit:
- Konkreten Stadtteilen und Branchen
- Regionalen Wirtschaftsdaten/Bezuegen
- Staerkerer Verknuepfung von Stadt + Service

---

## Technische Umsetzung

### Datei: `src/data/regionalContent.ts`

- Neues Feld `detailedContent: string` im Interface `RegionalContentData` hinzufuegen
- Alle 8 Kombinationen (4 Services x 2 Staedte) mit ausfuehrlichem, einzigartigem Fliesstext befuellen
- Bestehende `localContext`-Texte verlaengern
- Alle `faqs[].answer`-Texte auf 3-5 Saetze erweitern

### Datei: `src/components/regional/RegionalPage.tsx`

- Neuen Abschnitt `<section>` fuer den Fliesstext einfuegen (nach dem lokalen Kontext, vor den Pain Points)
- Styling: `max-w-3xl mx-auto`, normaler Fliesstext mit Absaetzen, H2-Ueberschrift mit Keyword

---

## Erwartetes Ergebnis pro Seite

| Bereich | Vorher | Nachher |
|---------|--------|---------|
| Lokaler Kontext | ~50 Woerter | ~120 Woerter |
| Neuer Fliesstext | 0 | 250-350 Woerter |
| FAQ-Antworten (gesamt) | ~120 Woerter | ~300 Woerter |
| **Gesamt pro Seite** | **~450 Woerter** | **~900-1.200 Woerter** |

---

## Dateien

| Datei | Aktion |
|-------|--------|
| `src/data/regionalContent.ts` | AENDERN -- neues Feld + erweiterte Texte fuer alle 8 Seiten |
| `src/components/regional/RegionalPage.tsx` | AENDERN -- neue Fliesstext-Section einfuegen |

**2 Dateien aendern, keine neuen Dateien**

