

## Spectrum-Sektion zentrieren

**Datei:** `src/components/automations/AutomationsSpectrum.tsx`

### Änderungen

Alle Card-Inhalte (Icon, Titel, Beschreibung, Badge) werden zentriert — konsistent auf Mobile und Desktop:

1. **Cards** (Zeile 150): `text-center` hinzufügen + Icon-Container mit `mx-auto` zentrieren
2. **Icon-Container** (Zeile 158-161): `mx-auto` ergänzen
3. **Badge** (Zeile 189): `inline-flex` → `inline-flex` bleibt, aber wrapping `div` mit `flex justify-center` hinzufügen oder `mx-auto` auf dem Badge

Konkret:
- Zeile 150: `p-8 md:p-10` → `p-8 md:p-10 text-center`
- Zeile 159: `w-12 h-12 rounded-xl flex items-center justify-center mb-6` → `w-12 h-12 rounded-xl flex items-center justify-center mb-6 mx-auto`
- Zeile 180-205: Badge-Block in `<div className="flex justify-center">` wrappen

