

## Integrations-Section auf der Startseite

### Platzierung

Zwischen `FeaturesSection` und `ProcessSection` auf der Startseite (`src/pages/Index.tsx`).

### Design-Konzept

Ein statisches Logo-Grid mit Glassmorphism-Kacheln -- bewusst anders als die laufende Kunden-Logo-Leiste.

### Neue Datei: `src/components/IntegrationsSection.tsx`

**Aufbau:**
- Badge oben: "Integrationen" (gleicher Stil wie andere Sections)
- Ueberschrift: "Ueber 100+ Integrationen"
- Untertitel: kurzer Satz wie "Wir verbinden eure bestehenden Tools nahtlos mit KI."
- Darunter ein responsives Grid mit 12-16 Logo-Kacheln
- Am Ende ein dezenter Hinweis: "...und viele mehr"

**Logo-Kacheln:**
- Glassmorphism-Stil: `bg-white/5 backdrop-blur border border-white/10 rounded-xl`
- Hover-Effekt: `hover:border-neon/30` mit sanftem Neon-Glow
- Inhalt: SVG/PNG Logo + Tool-Name darunter in kleiner Schrift
- Logos werden als externe URLs eingebunden (wie bei der bestehenden Kunden-Leiste)

**Geplante Logos (Auswahl):**
WhatsApp, Google Calendar, HubSpot, Slack, n8n, Make (Integromat), OpenAI, Salesforce, Zapier, Microsoft Teams, Notion, Calendly, Pipedrive, Zendesk, Mailchimp, Stripe

**Responsive Grid:**
- Desktop: 4-6 Spalten
- Tablet: 3 Spalten
- Mobile: 2 Spalten

### Aenderung: `src/pages/Index.tsx`

- Import von `IntegrationsSection` hinzufuegen
- `<IntegrationsSection />` zwischen `<FeaturesSection />` und `<ProcessSection />` einfuegen

### Technische Details

- Keine neuen Dependencies noetig
- Logos als externe SVGs (z.B. von cdn.simpleicons.org oder svgl.app) oder als lokale Assets
- Kein Slider/Marquee -- bewusst statisch als Kontrast zur Kunden-Leiste
- Motion/Framer Motion fuer subtile Einblend-Animationen (staggered fade-in beim Scrollen)
- Glassmorphism und Neon-Hover passend zum bestehenden Design-System

