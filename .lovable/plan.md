

# Erweiterter Gesamtplan: Regionale SEO-Seiten + Meta-Optimierung + Mobile-Zentrierung

Dieser Plan fasst alle genehmigten Aufgaben zusammen, inklusive der neuen Anforderung: **alle Texte, Karten, Icons und Symbole auf den regionalen Unterseiten sind zentriert und mobil vollstaendig optimiert**.

---

## 1. SEO-Infrastruktur

### Neue Datei: `src/components/SEOHead.tsx`

Wiederverwendbare Komponente, die per `useEffect` den `document.title` und `<meta>`-Tags (description, canonical) dynamisch setzt.

### `index.html` aktualisieren

Fallback-Title: `MTM Studios | KI-Agentur fuer Telefonassistenten, Chatbots & Automatisierungen`
Fallback-Description: Startseiten-Text.

---

## 2. Meta-Tags fuer alle bestehenden Seiten

`<SEOHead>` wird in jede der 10+ Seiten integriert:

| Seite | Title Tag |
|-------|-----------|
| Startseite | KI-Agentur fuer Telefonassistenten, Chatbots & Automatisierungen \| MTM Studios |
| Telefonassistent | KI-Telefonassistent \| Anrufe automatisieren \| MTM Studios |
| Chatbot | KI-Chatbot fuer WhatsApp & Website \| MTM Studios |
| Automatisierungen | KI-Automatisierung fuer Unternehmen \| MTM Studios |
| Ueber uns | Ueber MTM Studios \| KI-Agentur fuer Unternehmen |
| Partner | Partner werden \| White-Label KI-Loesungen \| MTM Studios |
| Karriere | Karriere bei MTM Studios \| Jobs in KI & Automatisierung |
| Impressum | Impressum \| MTM Studios |
| Datenschutz | Datenschutzerklaerung \| MTM Studios |
| AGB | AGB \| MTM Studios |

---

## 3. RegionalSection auf Subdirectory-URLs

### `src/components/RegionalSection.tsx`

`buildLink` aendern: `/${contextPath}-${slug}` wird zu `/${contextPath}/${slug}`

### `src/pages/Index.tsx`

`<RegionalSection contextPath="ki-agentur" />` setzen (statt ohne contextPath).

---

## 4. Acht regionale SEO-Seiten

### Neue Datei: `src/data/regionalContent.ts`

Content-Daten fuer alle 8 Kombinationen (Stuttgart/Ulm x 4 Services). Jede Kombination mit einzigartigem Content: Title, Description, H1, Subtext, lokaler Kontext, Pain Points, Features, FAQ-Fragen.

### Neue Datei: `src/components/regional/RegionalPage.tsx`

Template-Komponente, die den Content aus `regionalContent.ts` rendert:

```text
Seitenstruktur:
1. SEOHead (Title + Meta)
2. Navigation
3. Hero (H1 mit Stadt + Service, Subtext, CTA + WhatsApp)
4. Lokaler Kontext-Absatz
5. Problem-Section (3 Pain Points)
6. Features/Leistungen (3-4 Karten)
7. Lokale Vorteile (warum MTM in dieser Region)
8. FAQ-Section (4-5 Fragen, Accordion)
9. CTA-Section (Anfrage-Funnel + WhatsApp-Button)
10. RegionalSection (Links zu anderen Staedten)
11. Footer
```

### Neue Routes in `src/App.tsx`

```text
/ki-agentur/:city
/ki-telefonassistent/:city
/ki-chatbot/:city
/automatisierungen/:city
```

Ungueltige Staedte werden auf 404 umgeleitet.

---

## 5. Mobile-Zentrierung auf allen regionalen Seiten (NEU)

Alle Sections der `RegionalPage.tsx` werden von Grund auf mobile-first und zentriert gebaut:

### Grundprinzipien

- **Alle Container**: `text-center` als Standard, `px-6` fuer Mobile-Padding
- **Alle Headings (H1, H2, H3)**: `text-center` auf allen Breakpoints
- **Alle Subtexte/Paragraphen**: `text-center mx-auto max-w-...` fuer zentrierte, lesbare Breiten
- **Icon-Container**: `mx-auto` fuer horizontale Zentrierung
- **Feature-Karten**: `items-center text-center` innerhalb jeder Karte, Icons zentriert mit `mx-auto`
- **Pain-Point-Karten**: Gleicher Ansatz -- Icon oben zentriert, Text zentriert
- **FAQ-Accordion**: Volle Breite (`max-w-2xl mx-auto`), Text linksbuendig innerhalb (fuer Lesbarkeit), aber Container zentriert
- **CTA-Buttons**: `flex flex-col items-center` -- Button und WhatsApp-Link zentriert gestapelt
- **Grids**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` -- auf Mobile eine Spalte, alles zentriert

### Konkrete CSS-Klassen pro Section

| Section | Mobile-Klassen |
|---------|---------------|
| Hero | `text-center px-6`, H1: `text-3xl md:text-5xl`, Buttons: `flex flex-col items-center gap-4` |
| Lokaler Kontext | `text-center max-w-2xl mx-auto px-6`, Text: `text-base md:text-lg` |
| Problem/Pain Points | Karten: `text-center p-6 md:p-8`, Icons: `mx-auto mb-4`, Grid: `grid-cols-1 md:grid-cols-3 gap-5` |
| Features | Karten: `text-center p-6 md:p-8`, Icons: `w-12 h-12 mx-auto mb-4 rounded-xl`, Grid: `grid-cols-1 md:grid-cols-2 gap-5` |
| Lokale Vorteile | Wie Features, `grid-cols-1 md:grid-cols-3` |
| FAQ | Container: `max-w-2xl mx-auto`, Accordion volle Breite |
| CTA | `text-center`, Buttons: `flex flex-col items-center gap-4` |

### Kein horizontales Overflow

- Alle Elemente bleiben innerhalb des Viewports
- Keine festen Breiten, nur `max-w-*` mit `mx-auto`
- Padding: `px-6` auf allen Containern

---

## Zusammenfassung: Alle Dateien

| Datei | Aktion |
|-------|--------|
| `src/components/SEOHead.tsx` | NEU |
| `src/data/regionalContent.ts` | NEU |
| `src/components/regional/RegionalPage.tsx` | NEU (mobile-zentriert von Anfang an) |
| `index.html` | AENDERN |
| `src/App.tsx` | AENDERN (4 neue Routes) |
| `src/components/RegionalSection.tsx` | AENDERN (Subdirectory-URLs) |
| `src/pages/Index.tsx` | AENDERN (SEOHead + contextPath) |
| `src/pages/PhoneAssistant.tsx` | AENDERN (SEOHead) |
| `src/pages/Chatbots.tsx` | AENDERN (SEOHead) |
| `src/pages/Automations.tsx` | AENDERN (SEOHead) |
| `src/pages/AboutUs.tsx` | AENDERN (SEOHead) |
| `src/pages/Partner.tsx` | AENDERN (SEOHead) |
| `src/pages/Karriere.tsx` | AENDERN (SEOHead) |
| `src/pages/Impressum.tsx` | AENDERN (SEOHead) |
| `src/pages/Datenschutz.tsx` | AENDERN (SEOHead) |
| `src/pages/AGB.tsx` | AENDERN (SEOHead) |

**3 neue Dateien, 13 geaenderte Dateien**

