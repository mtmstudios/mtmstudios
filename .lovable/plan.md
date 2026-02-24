

## "Jetzt anfragen" Button als echten CTA stylen

Der Button sieht aktuell identisch wie die Menue-Links aus (gleiche Farbe, Groesse, kein Hintergrund). Er soll sich klar als Call-to-Action abheben.

### Aenderungen

**1. Tablet-Header (Zeile 102):**
Aktuell: `text-sm text-foreground/80 hover:text-foreground` -- sieht aus wie ein Link.
Neu: Accent-Button mit Glassmorphism-Stil:
- `px-4 py-2 rounded-xl bg-accent/10 border border-accent/20 text-accent text-sm font-medium hover:bg-accent/20 backdrop-blur-sm transition-all duration-300`

**2. Mobile Slide-out-Menue (Zeile 70-75):**
Aktuell: `text-lg text-foreground/80` -- identisch mit den anderen Menue-Eintraegen.
Neu: Visuell abgesetzter Button am Ende der Liste mit Separator:
- `mt-2 pt-6 border-t border-border/10` als Trennlinie
- `w-full py-3 rounded-xl bg-accent/10 border border-accent/20 text-accent text-base font-medium text-center hover:bg-accent/20 transition-all duration-300`

### Ergebnis

Der CTA hebt sich auf Tablet (Header) und Mobile (Slide-out) klar von den normalen Navigationspunkten ab -- gleicher Glassmorphism-Stil wie der WhatsApp-Button, aber in Accent-Farbe.

### Betroffene Datei

| Datei | Aenderung |
|---|---|
| `src/components/Navigation.tsx` | Styling fuer "Jetzt anfragen" auf Zeile 70-75 (Mobile-Menue) und Zeile 102 (Tablet-Header) |

