

## Leistungs-Section: "Unsere Loesungen"

Die bestehende "Premium Quality, Zero Cost"-Section (`FeaturesSection.tsx`) wird komplett durch eine neue Leistungs-Section ersetzt, die eure drei KI-Services praesentiert.

### Layout: Bento-Grid

```text
+-------------------------------+------------------+
|                               |  WhatsApp &      |
|   KI-Telefonassistent         |  Chatbots        |
|   (grosse Karte)              |                  |
|                               +------------------+
|                               |  Automatisie-    |
|                               |  rungen          |
+-------------------------------+------------------+
```

- **Linke Karte (gross)**: KI-Telefonassistent -- nimmt die volle Hoehe ein, betont als Hauptleistung
- **Rechts oben**: WhatsApp und Chatbots
- **Rechts unten**: Automatisierungen

Auf Mobile stapeln sich alle drei Karten untereinander.

### Design-Stil

Gleicher Look wie die bestehenden Karten:
- Halbtransparenter Hintergrund: `bg-card/50 backdrop-blur-sm`
- Subtiler Border: `border-border/50`
- Neon-Hover: `hover:border-neon/50 hover:shadow-neon/10`
- Neon-Icon-Container mit `bg-neon/10`

### Section-Header

- Neon-Badge: "Was wir anbieten" (gleicher Pill-Stil wie aktuell)
- Headline: "Unsere Loesungen"
- Subtext: Kurzer Satz ueber eure KI-Services

### Inhalte der drei Karten

**1. KI-Telefonassistent** (Icon: Phone)
- Titel: "KI-Telefonassistent"
- Beschreibung: Euer KI-Assistent nimmt Anrufe entgegen, beantwortet Fragen und leitet wichtige Anfragen weiter -- rund um die Uhr, ohne Wartezeit.

**2. WhatsApp und Chatbots** (Icon: MessageCircle)
- Titel: "WhatsApp und Chatbots"
- Beschreibung: Intelligente Chatbots fuer WhatsApp und eure Website, die Kundenanfragen sofort beantworten und Leads qualifizieren.

**3. Automatisierungen** (Icon: Workflow)
- Titel: "Automatisierungen"
- Beschreibung: Wiederkehrende Aufgaben automatisieren -- von E-Mail-Workflows bis zur Datenverarbeitung. Mehr Effizienz, weniger manueller Aufwand.

### Technische Umsetzung

**Datei: `src/components/FeaturesSection.tsx`**
- Kompletter Inhalt wird ersetzt
- Neues Bento-Grid Layout mit CSS Grid: `grid-cols-1 md:grid-cols-2`, linke Karte mit `md:row-span-2`
- Gleiche Card-Komponente und Styling-Patterns wie bisher
- Icons aus `lucide-react`: Phone, MessageCircle, Workflow

Keine neuen Dateien oder Dependencies noetig -- alles ist bereits vorhanden.

