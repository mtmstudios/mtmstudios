

## ChatbotHero Smartphone-Visual Optimierung

### Probleme (festgestellt via Screenshot)
- Header-Hintergrund hat `rx=40` und ueberlappt mit den abgerundeten Ecken des Phone-Frames -- sieht unsauber aus
- Kein solider Hintergrund im Phone-Inneren -- das Hintergrundvideo scheint durch
- Zu viel leerer Platz unterhalb der letzten Nachricht
- Nachrichten sitzen zu hoch, Chat wirkt nicht zentriert

### Loesung

**Datei:** `src/components/chatbot/ChatbotHero.tsx`

**1. Soliden Hintergrund ins Handy einfuegen**
- Neues `rect` direkt nach dem Phone-Frame mit `fill="hsl(var(--background))"` (oder einem sehr dunklen Ton)
- Gleiche Position/Groesse wie der Frame (x=20, y=10, 280x560, rx=40), aber als Fill statt Stroke
- Damit scheint das Video nicht mehr durch

**2. Header-Bereich korrigieren**
- Header-Hintergrund: `rx=0` statt `rx=40` -- keine eigenen abgerundeten Ecken
- Nur ein einfaches Rechteck von y=40 bis y=80 (unterhalb der Phone-Rundung)
- Den zweiten "Clip"-Rect (Zeile 70-76) entfernen -- nicht mehr noetig

**3. Chat-Bereich vergroessern und Nachrichten nach unten verteilen**
- `foreignObject` y von 90 auf 85 aendern, Hoehe von 460 auf 470
- Nachrichten-Container: `gap` von 6px auf 8px erhoehen fuer bessere Lesbarkeit
- `padding` von "8px 4px" auf "12px 6px" -- mehr vertikaler Raum nutzen
- `fontSize` von 10px auf 11px -- besser lesbar

**4. Typing-Dots Position anpassen**
- Die festen yPos-Berechnungen (100 + i * 58) passen nicht zu den tatsaechlichen Nachrichten-Positionen via foreignObject
- Typing-Dots komplett entfernen da sie ohnehin nicht synchron mit den foreignObject-Nachrichten liegen -- stattdessen innerhalb des foreignObject als eigene animierte Div-Elemente vor den Bot-Nachrichten rendern

**5. Glow-Ellipse nach unten verschieben**
- cy von 480 auf 510 -- naeher am unteren Rand des Phones, passend zur letzten Nachricht

### Ergebnis
- Sauberer, solider Phone-Hintergrund ohne Video-Durchscheinen
- Kein Header-Ueberlappungs-Problem mehr
- Nachrichten fuellen den gesamten Chat-Bereich aus
- Typing-Dots erscheinen inline direkt vor den Bot-Antworten
- Professionelleres, Apple-like Erscheinungsbild

