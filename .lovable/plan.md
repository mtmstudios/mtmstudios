

# Tool-Logos im Karriere-Funnel + Witzige Platzhalter in allen Funnels

## Aenderung 1: Tool-Logos statt Text (CareerFunnel Step 4)

Die Text-Chips "N8N", "Zapier", "Claude", "ChatGPT", "Gemini" werden durch klickbare Logo-Karten ersetzt. Jedes Tool bekommt sein offizielles Logo als Bild (`<img>`), angezeigt in einem Glassmorphism-Button mit dem gleichen Select-Stil (Accent-Border + Check-Badge bei Auswahl).

Die Logos werden als SVGs von offiziellen CDN-Quellen geladen (simpleicons.org oder aehnlich), mit `filter: brightness(0) invert(1)` fuer den Dark-Mode-Look. Darunter steht der Tool-Name klein als Text.

**Datei:** `src/components/career/CareerFunnel.tsx`
- `tools` Array wird erweitert zu Objekten mit `id`, `label` und `logo` (URL)
- Die Chip-Komponente in Step 4 wird durch eine Logo-Card ersetzt (aehnlich wie SelectCard, aber mit Bild statt Icon)
- "Keins davon" bleibt als Text-Chip

## Aenderung 2: Witzige Platzhalter in beiden Funnels

In beiden Funnels werden die Placeholder-Texte geaendert:

| Feld | Alt | Neu |
|------|-----|-----|
| Name | Max Mustermann | MTM Studios |
| E-Mail | max@firma.de / max@email.de | hallo@mtmstudios.de |

**Dateien:**
- `src/components/ContactFunnel.tsx` -- Zeile 192: Placeholder aendern
- `src/components/career/CareerFunnel.tsx` -- Zeile 336: Placeholder aendern

## Technische Details

### Tool-Logos (SVG URLs)

Die Logos werden ueber Simple Icons CDN (`cdn.simpleicons.org`) geladen:
- N8N: `https://cdn.simpleicons.org/n8n/white`
- Zapier: `https://cdn.simpleicons.org/zapier/white`
- Claude (Anthropic): `https://cdn.simpleicons.org/anthropic/white`
- ChatGPT (OpenAI): `https://cdn.simpleicons.org/openai/white`
- Gemini (Google): `https://cdn.simpleicons.org/googlegemini/white`

### Logo-Card Komponente

Jede Logo-Card ist ein `motion.button` mit:
- 80x80px oder aehnlich, `rounded-2xl`
- Logo zentriert (ca. 32px)
- Tool-Name darunter als `text-xs`
- Gleicher Accent-Border/Glow und Check-Badge bei Selektion wie die anderen Cards
- Flex-Wrap Layout statt Grid fuer lockere Anordnung

