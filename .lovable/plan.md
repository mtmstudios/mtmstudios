

## Problem: Mobile Integrationen-Animation funktioniert nicht

**Ursache:** Zwei Probleme gleichzeitig:

1. **React-Deduplizierung fehlt** — In Production kann Vite mehrere React-Instanzen bundlen, wodurch `motion/react` (Framer Motion) den Kontext verliert und `whileInView`-Animationen auf Mobile nicht feuern.

2. **simple-icons Version 14** — Die CDN-URL `simple-icons@14.0.0` existiert möglicherweise nicht stabil; einige Slugs können 404 zurückgeben, wodurch `onError` die Icons komplett versteckt.

### Änderungen

**Datei: `vite.config.ts`**
- `resolve.dedupe` hinzufügen: `["react", "react-dom", "react/jsx-runtime"]` — erzwingt eine einzelne React-Instanz im Bundle, damit Framer Motion korrekt funktioniert.

**Datei: `src/components/IntegrationsSection.tsx`**
- CDN-Version von `simple-icons@14.0.0` auf stabile Version `@13.16.0` ändern (verifiziert verfügbar).
- `onError`-Handler verbessern: statt das Element komplett zu verstecken, ein Fallback-Verhalten (Opacity 0) setzen, damit das Grid-Layout nicht zerbricht.
- `whileInView` viewport-Threshold auf `amount: 0.1` setzen für zuverlässigeres Triggern auf Mobile.

