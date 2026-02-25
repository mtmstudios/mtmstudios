

# Apple Touch Icon erstellen

## Was passiert

1. Das hochgeladene MTM-Logo (`public/favicon.png`) wird per AI-Image-Generation auf 180×180px mit schwarzem Hintergrund und ausreichend Padding gerendert
2. Ergebnis wird als `public/apple-touch-icon.png` gespeichert
3. `index.html` bekommt eine neue Zeile: `<link rel="apple-touch-icon" href="/apple-touch-icon.png">`

## Betroffene Dateien

| Datei | Aenderung |
|-------|-----------|
| `public/apple-touch-icon.png` | Neues 180×180px Icon |
| `index.html` | Apple Touch Icon Link hinzufuegen |

## Technisches Detail

Da wir kein serverseitiges Image-Resizing haben, kopieren wir das vorhandene `favicon.png` als `apple-touch-icon.png`. Browser skalieren es automatisch auf 180×180. Alternativ kann die AI-Bildgenerierung ein exakt 180×180px Bild erzeugen.

