

## Handy-SVG Neustrukturierung

Das Innenleben des Smartphone-Visuals wird aufgeraeumter und Apple-like umgebaut.

### Aenderungen in `src/components/phone-assistant/PhoneHero.tsx`

**Entfernt:**
- "Anruf laeuft..." Text (Zeilen 117-129) -- redundant und stoert die Klarheit

**Neu:**
- Dezenter Text im oberen Bereich des Handys (~y=80): "KI-Telefonassistent testen"
  - Schriftgroesse: 11px, font-weight 400
  - Farbe: `hsl(var(--accent))` mit opacity 0.4
  - Animation: fade-in mit delay 2.4s (nach Notch)
  - Zentriert, `textAnchor="middle"`

**Angepasst:**
- Waveform-Bars: Mittelpunkt von y=250 auf y=210 verschoben (mehr Platz nach unten)
- Glow-Kreis: cy von 250 auf 210
- Call-Button: cy von 400 auf 360 (rueckt naeher an Waveform)
- Pulsing Ring: cy von 400 auf 360
- Phone-Icon: Pfad-Koordinaten um 40px nach oben angepasst
- "Jetzt anrufen" statt "Jetzt testen", y von 445 auf 405
- foreignObject: y von 370 auf 330

### Visueller Aufbau (von oben nach unten)

```text
+---------------------------+
|         [Notch]           |  y=24
|                           |
| KI-Telefonassistent testen|  y=80  (neu, dezent)
|                           |
|      |||||||||||          |  y=210 (Waveform)
|      |||||||||||          |
|                           |
|        ( Phone )          |  y=360 (Call-Button)
|     Jetzt anrufen         |  y=405
|                           |
+---------------------------+
```

Ergebnis: Klarere Hierarchie, weniger Rauschen, Apple-typisch reduziert.

