

## Footer einbauen (ohne Ladebildschirm)

### Neue Datei: `src/components/Footer.tsx`

Ein 4-Spalten-Footer passend zum Setrex-Design mit folgender Struktur:

| Spalte 1 (Brand) | Spalte 2 (Leistungen) | Spalte 3 (Unternehmen) | Spalte 4 (Kontakt) |
|---|---|---|---|
| Logo (`logo.png`) + Kurzbeschreibung + Social Icons (Instagram, LinkedIn, Mail) | KI-Telefonassistent, Chatbot, Automatisierungen, Beratung | Ueber uns, Karriere, Blog | E-Mail, Telefon, Standort |

**Design-Details:**
- Hintergrund: `bg-background` mit `border-t border-border/20` oben
- Ueberschriften: `text-foreground font-semibold`
- Links: `text-muted-foreground` mit `hover:text-neon` (Neongruen-Uebergang)
- Social Icons: Lucide-Icons in `text-muted-foreground` mit `hover:text-neon`
- Copyright-Zeile unten, getrennt durch `border-t border-border/10`
- Responsive: 1 Spalte Mobile, 2 Spalten Tablet, 4 Spalten Desktop
- Logo: Nutzt das bestehende `src/assets/logo.png` (wie in der Navigation)
- Links mit `react-router-dom` fuer interne Navigation, `<a>` fuer externe

**Kein Next.js**: `Link` von `react-router-dom` statt `next/link`. Keine neue Dependency noetig.

### Aenderung: `src/pages/Index.tsx`

- `Footer` importieren
- `<Footer />` nach `<CTASection />` einfuegen (Zeile 65-66)

### Technische Details

- Keine neuen Dependencies -- `lucide-react` und `react-router-dom` sind bereits installiert
- Social Icons: `Instagram`, `Linkedin`, `Mail` aus `lucide-react`
- Kontakt-Icons: `Mail`, `Phone`, `MapPin` aus `lucide-react`
- Das uploaded Logo (`LOGO-5-TRANSPARENT.png`) wird nicht separat kopiert -- stattdessen wird das bereits vorhandene `src/assets/logo.png` wiederverwendet (Konsistenz mit Navigation)

