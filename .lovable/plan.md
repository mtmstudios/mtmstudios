

# Konzept: SEO, Performance, Barrierefreiheit & Cookie-Banner

Nach Analyse der gesamten Codebase identifiziere ich folgende Luecken und schlage konkrete Loesungen vor.

---

## Bestandsaufnahme — Was fehlt

| Bereich | Status |
|---------|--------|
| `<html lang="en">` | **Falsch** — muss `de` sein |
| Sitemap | **Fehlt komplett** |
| robots.txt | Vorhanden, aber ohne Sitemap-Verweis |
| Canonical URLs | Nur teilweise (via SEOHead, nicht auf allen Seiten) |
| Structured Data (JSON-LD) | **Fehlt komplett** |
| OG-Image | Zeigt auf lovable.dev Placeholder |
| Twitter-Site | Zeigt auf @Lovable statt @MTMStudios |
| Cookie-Banner | **Fehlt komplett** |
| Barrierefreiheitserklaerung | **Fehlt komplett** |
| Accessibility-Widget | **Fehlt komplett** |
| Skip-to-content Link | **Fehlt** |
| `preload` fuer kritische Assets | **Fehlt** |

---

## 1. index.html — Grundlegende Fixes

**Datei:** `index.html`

- `<html lang="en">` aendern zu `<html lang="de">`
- OG-Image und Twitter-Image auf eigenes Bild aendern (oder entfernen falls kein eigenes vorhanden)
- `twitter:site` von `@Lovable` auf eigenen Handle oder entfernen
- `<link rel="preload">` fuer Hero-Video hinzufuegen (Performance)

---

## 2. Sitemap — Neue statische Datei

**Neue Datei:** `public/sitemap.xml`

Alle Routen explizit auflisten mit korrekter Priority und Changefreq:

```text
Startseite                    /                              priority 1.0
KI-Telefonassistent           /ki-telefonassistent           priority 0.9
KI-Chatbot                    /ki-chatbot                    priority 0.9
Automatisierungen              /automatisierungen             priority 0.9
Das sind Wir                  /dassindwir                    priority 0.7
Partner werden                /partnerwerden                 priority 0.6
Karriere                      /karriere                      priority 0.6
Impressum                     /impressum                     priority 0.3
Datenschutz                   /datenschutz                   priority 0.3
AGB                           /agb                           priority 0.3
Barrierefreiheit (NEU)        /barrierefreiheit              priority 0.3
Regionale Seiten (alle)       /ki-agentur/stuttgart etc.     priority 0.7
```

---

## 3. robots.txt — Erweitern

**Datei:** `public/robots.txt`

Sitemap-Verweis hinzufuegen und vereinfachen:

```text
User-agent: *
Allow: /
Sitemap: https://mtmstudios.de/sitemap.xml
```

(Die Domain muss spaeter angepasst werden sobald die finale Domain bekannt ist.)

---

## 4. SEOHead — Erweitern um Structured Data

**Datei:** `src/components/SEOHead.tsx`

Erweitern um:
- Automatische Canonical-URL basierend auf `window.location.pathname` (Fallback)
- JSON-LD Structured Data fuer Organization (auf jeder Seite)
- `og:url` Meta-Tag

Neue Komponente oder Erweiterung: `StructuredData` — gibt ein `<script type="application/ld+json">` aus mit:
- `@type: Organization` (Name, Logo, URL, Kontakt)
- `@type: LocalBusiness` auf der Startseite
- `@type: FAQPage` auf den regionalen Seiten (die haben bereits FAQs)

---

## 5. Cookie-Banner — Neue Komponente

**Neue Dateien:**
- `src/components/CookieBanner.tsx`
- `src/contexts/CookieConsentContext.tsx`

### Design (Apple-Stil)
- Schmaler Banner am unteren Bildschirmrand
- Glassmorphism: `bg-black/80 backdrop-blur-xl border-t border-white/[0.06]`
- Zwei Buttons: "Alle akzeptieren" (filled accent) und "Nur notwendige" (ghost/outline)
- Link zu "Einstellungen" oeffnet ein Modal mit Kategorie-Toggles
- Link zur Datenschutzerklaerung

### Kategorien
- **Notwendig** (immer aktiv, nicht abwaehlbar) — Session, Consent-Cookie
- **Analyse** (optional) — falls spaeter Analytics hinzugefuegt wird
- **Marketing** (optional) — falls spaeter Tracking hinzugefuegt wird

### Technik
- Consent wird in `localStorage` gespeichert (kein externer Service noetig)
- Context-Provider stellt `hasConsent(category)` bereit
- Banner erscheint nur wenn noch kein Consent gespeichert ist
- Cookie-Einstellungen jederzeit aenderbar ueber Footer-Link und Accessibility-Widget

### DSGVO/TTDSG-Konformitaet
- Opt-in fuer nicht-notwendige Cookies (kein Pre-Check)
- Granulare Auswahl moeglich
- "Ablehnen" genauso prominent wie "Akzeptieren"
- Consent-Nachweis mit Timestamp in localStorage

---

## 6. Barrierefreiheitserklaerung — Neue Seite

**Neue Dateien:**
- `src/pages/Barrierefreiheit.tsx`
- Route in `App.tsx`: `/barrierefreiheit`

### Inhalt (nach deutschem Recht — BFSG/BITV 2.0)
Gleicher Seitenstil wie Impressum/Datenschutz/AGB (Glassmorphism-Karten):

1. **Stand der Barrierefreiheit** — "Diese Website ist teilweise barrierefrei."
2. **Geltungsbereich** — mtmstudios.de
3. **Nicht barrierefreie Inhalte** — Ehrliche Auflistung (z.B. Videos ohne Untertitel, komplexe Animationen)
4. **Erstellungsdatum und Methodik** — Selbstbewertung
5. **Feedback-Kontakt** — E-Mail und Telefon fuer Barriere-Meldungen
6. **Durchsetzungsverfahren** — Verweis auf zustaendige Schlichtungsstelle (Bundesfachstelle Barrierefreiheit)

---

## 7. Accessibility-Widget — Neuer Floating Button

**Neue Datei:** `src/components/AccessibilityWidget.tsx`

### Design (Apple-Stil)
- Kleiner runder Button unten links: Accessibility-Icon (Mensch-im-Kreis)
- `bg-white/[0.06] backdrop-blur-xl border border-white/[0.08]`
- Klick oeffnet ein Panel mit Einstellungen

### Einstellungen im Panel
- **Schriftgroesse**: Klein / Normal / Gross / Sehr gross (aendert `font-size` auf `<html>`)
- **Kontrast**: Normal / Hoch (aendert CSS-Variablen fuer bessere Kontraste)
- **Animationen reduzieren**: Toggle (setzt `prefers-reduced-motion` manuell + deaktiviert Framer Motion Animationen)
- **Link zur Barrierefreiheitserklaerung**
- **Cookie-Einstellungen aendern** (oeffnet Cookie-Modal)

### Technik
- Einstellungen in `localStorage` persistiert
- Context-Provider: `AccessibilityContext` mit `fontSize`, `highContrast`, `reducedMotion`
- CSS-Variablen werden auf `document.documentElement` gesetzt
- `reducedMotion` setzt global `--motion-duration: 0s` und kann von Framer Motion Animationen abgefragt werden

---

## 8. Footer — Links ergaenzen

**Datei:** `src/components/Footer.tsx`

Im Legal-Bereich unten hinzufuegen:
- Link zu `/barrierefreiheit` ("Barrierefreiheit")
- Der Cookie-Einstellungen-Link ("Cookie-Einstellungen") triggert das Cookie-Modal

---

## 9. Skip-to-Content Link

**Datei:** `src/App.tsx` oder `index.html`

Unsichtbarer Link am Anfang des DOM, der bei Tab-Fokus sichtbar wird:
```text
<a href="#main" class="sr-only focus:not-sr-only ...">Zum Inhalt springen</a>
```
Alle Seiten brauchen ein `<main id="main">` (die meisten haben bereits `<main>`).

---

## 10. Performance-Optimierungen

- **Font-Display**: `&display=swap` ist bereits gesetzt — gut
- **Preconnect**: Bereits vorhanden fuer Google Fonts — gut
- **Hero-Video**: `preload="metadata"` statt volles Preload (falls nicht schon gesetzt)
- **Lazy Loading**: Bilder unterhalb des Folds sollten `loading="lazy"` haben

---

## Zusammenfassung — Neue Dateien und Aenderungen

| Typ | Datei | Aenderung |
|-----|-------|-----------|
| Aendern | `index.html` | `lang="de"`, OG/Twitter Cleanup |
| Neu | `public/sitemap.xml` | Komplette Sitemap |
| Aendern | `public/robots.txt` | Sitemap-Verweis |
| Aendern | `src/components/SEOHead.tsx` | Canonical auto, JSON-LD |
| Neu | `src/contexts/CookieConsentContext.tsx` | Cookie-State |
| Neu | `src/components/CookieBanner.tsx` | Banner + Modal |
| Neu | `src/pages/Barrierefreiheit.tsx` | Erklaerung nach BFSG |
| Neu | `src/components/AccessibilityWidget.tsx` | Floating Widget |
| Neu | `src/contexts/AccessibilityContext.tsx` | A11y-State |
| Aendern | `src/components/Footer.tsx` | Links ergaenzen |
| Aendern | `src/App.tsx` | Route + Skip-Link + Provider |

Insgesamt 5 neue Dateien, 5 geaenderte Dateien. Alle visuellen Elemente im bestehenden Apple-Design (Glassmorphism, tuerkise Akzente, Inter-Font).

