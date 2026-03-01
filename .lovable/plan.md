

## Problem

In der `index.html` fehlt ein expliziter `<link rel="icon">` Tag. Ohne diesen Tag zeigt der Browser entweder das Standard-Favicon (von Lovable/Vite) oder sucht automatisch nach `/favicon.ico`. Das MTM-Favicon (`public/favicon.png` bzw. `public/favicon.ico`) wird nicht korrekt eingebunden.

## Lösung

In `index.html` im `<head>`-Bereich explizite Favicon-Links hinzufügen:

```html
<link rel="icon" type="image/png" href="/favicon.png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

Das sind zwei Zeilen im `<head>` von `index.html`, direkt nach dem `<meta charset>` Tag. Damit wird das eigene MTM-Favicon korrekt im Browser-Tab angezeigt.

