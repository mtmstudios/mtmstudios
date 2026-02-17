

## Footer Logo-Ausrichtung fixen

### Problem
Das Logo-Bild (`logo.png`) hat intern viel Whitespace/Padding. Die bisherigen negativen Margins (`-mt-6`, `-mb-6`) reichen nicht, um den sichtbaren Logo-Text auf die gleiche Hoehe wie die Spalten-Ueberschriften ("Leistungen", "Unternehmen", "Kontakt") zu bringen.

### Loesung
Den Logo-Container mit `overflow-hidden` und einer festen Hoehe beschneiden, sodass nur der sichtbare Logo-Text angezeigt wird. Zusaetzlich die erste Spalte so ausrichten, dass der Logo-Text auf der gleichen Baseline wie die h4-Ueberschriften der anderen Spalten liegt.

### Aenderungen in `src/components/Footer.tsx`

**1. Logo-Container clippen**
- Den Link-Container um das Logo mit einer festen Hoehe und `overflow-hidden` versehen
- Das Logo-Bild mit groesseren negativen Margins nach oben schieben, damit der sichtbare Text in den sichtbaren Bereich rutscht
- Beispiel: Container `h-7 overflow-hidden` mit Logo `h-28 -mt-8 object-contain`

**2. Space-y entfernen, manuelle Abstände**
- `space-y-4` durch individuelle Margins ersetzen, damit der Abstand zwischen Logo und Beschreibung stimmt

### Technische Details
- Keine neuen Dependencies
- Nur CSS-Anpassungen in der Brand-Spalte des Footers
- Die mobile Zentrierung bleibt erhalten

