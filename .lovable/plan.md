

## WhatsApp-Icons vereinheitlichen: SVG statt PNG

Beide verbleibenden Stellen (`HeroSection.tsx` und `CTASection.tsx`) verwenden noch das alte `whatsapp-logo.png` als `<img>`-Tag. Diese werden auf das gleiche scharfe Inline-SVG umgestellt -- ohne Container/Rand, nur das reine Icon neben dem Text.

### Aenderungen

| Datei | Was passiert |
|---|---|
| `src/components/HeroSection.tsx` | `import whatsappLogo` entfernen, `<img>` durch Inline-SVG ersetzen (`w-4 h-4 fill="#25D366"`) |
| `src/components/CTASection.tsx` | Identische Aenderung |

### Ergebnis

Alle WhatsApp-Icons auf der gesamten Website nutzen dasselbe Inline-SVG in `#25D366` -- scharf auf allen Auflösungen, ohne Rand/Hintergrund, einheitlicher Look.

