

## Gefundene Fehler

### 1. Integrations-Icons zeigen "?" auf Mobile
Die Slugs `microsoftoutlook` und `microsoftazure` existieren nicht als SVG-Dateien unter `simple-icons@14.0.0/icons/`. Die korrekten Dateinamen sind anders formatiert. Loesung: Diese durch zuverlaessig existierende Slugs ersetzen (z.B. `microsoft` fuer Azure entfernen und durch `airtable` oder einen anderen validen Slug ersetzen, oder die URL-Struktur auf die korrekte simple-icons API umstellen).

**Datei:** `src/components/IntegrationsSection.tsx`
- `microsoftoutlook` ersetzen durch einen funktionierenden Slug oder die Icon-URL auf die korrekte CDN-Struktur umstellen (simple-icons nutzt lowercase slugs wie `microsoftoutlook` — muss geprueft werden ob v14 diese hat)
- Alternative: Fallback-Handling mit `onError` auf dem `<img>` Tag hinzufuegen, damit fehlende Icons ausgeblendet statt als "?" angezeigt werden

### 2. Tuerkise Linie auf der Automatisierungsseite (AutomationsSpectrum)
**Datei:** `src/components/automations/AutomationsSpectrum.tsx`
- Zeile 140: Das mobile Timeline-Element nutzt `absolute` Positionierung (`absolute left-8 top-0 bottom-0`), aber der uebergeordnete Grid-Container (Zeile 138) hat **kein** `relative`. Dadurch positioniert sich die Linie relativ zur gesamten Section und erzeugt die sichtbare tuerkise Linie am Rand.
- Fix: Entweder `relative` zum Grid hinzufuegen, oder die mobile Timeline komplett entfernen da sie auf Mobile stoerend wirkt und die Karten nicht zentriert erscheinen laesst.
- Empfehlung: Mobile Timeline entfernen — die Karten selbst zeigen den Fortschritt bereits durch aktive/inaktive Zustaende. Das vereinfacht das Layout und entfernt die stoerende Linie.

### 3. Karriere-Seite: Alte Mobile-Bugs nicht gefixt
**Datei:** `src/pages/Karriere.tsx`
- Zeile 69: `willChange: "opacity"` ist noch vorhanden (wurde bei den anderen Seiten entfernt)
- Zeile 70: Mobile-Bild nutzt noch `mixBlendMode: "hard-light"` und `brightness(0.5)` — macht den Hintergrund unsichtbar
- Fix: Gleiche Korrekturen wie bei den anderen Seiten anwenden

---

## Umsetzungsschritte

1. **IntegrationsSection.tsx**: `onError`-Handler auf mobile Icons hinzufuegen der fehlende Icons ausblendet (`e.currentTarget.style.display = 'none'`), damit keine "?" mehr erscheinen
2. **AutomationsSpectrum.tsx**: Mobile Timeline (`md:hidden absolute left-8...`) komplett entfernen (Zeilen 140-145), da die Karten selbst den Fortschritt anzeigen
3. **Karriere.tsx**: `willChange: "opacity"` entfernen, Mobile-Bild-Filter auf `brightness(0.7) contrast(1.5)` aendern und `mixBlendMode` entfernen

