

## Zusammenfassung: Navigation updaten und FeaturesSection entfernen

### 1. FeaturesSection entfernen

**`src/pages/Index.tsx`**
- Import von `FeaturesSection` entfernen
- `<FeaturesSection />` aus dem JSX entfernen

**`src/components/FeaturesSection.tsx`**
- Datei komplett loeschen

---

### 2. Navigation-Links aktualisieren

**`src/components/Navigation.tsx`**

Die drei bestehenden Links (Gallery, Download, Twitter) und der "Access Gallery"-Button werden ersetzt durch:

| Link | Ziel | Typ |
|------|------|-----|
| KI-Telefonassistent | `#telefonassistent` | Anker-Link |
| Chatbot | `#chatbot` | Anker-Link |
| Automatisierungen | `#automatisierungen` | Anker-Link |
| Das sind Wir | `/about` | React Router Link |
| Kontakt | `#kontakt` | Anker-Link |

- Der "Access Gallery"-Button wird durch einen **"Kontakt"**-Button ersetzt, der zu `#kontakt` scrollt
- Alle Anker-Links verwenden `<a href="#...">` fuer sanftes Scrollen
- "Das sind Wir" verwendet `<Link to="/about">` (React Router)
- Gleiches Styling wie bisher: `text-foreground hover:text-neon transition-colors`

---

### Hinweis

Die Anker-Ziele (`#telefonassistent`, `#chatbot`, `#automatisierungen`, `#kontakt`) existieren noch nicht als Sections auf der Seite. Diese koennen in einem naechsten Schritt als eigene Sektionen angelegt werden.

