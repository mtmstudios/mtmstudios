

# Funnels: "Woher kennst du uns?" + Kontaktseite Premium-Upgrade

## Aenderungen

### 1. "Woher kennst du uns?" Pflichtfeld in beiden Funnels

Neues Pflichtfeld als Select-Chips auf der Kontaktseite (Step 3 im ContactFunnel, Step 5 im CareerFunnel). Optionen:

- Google
- Instagram
- Empfehlung
- LinkedIn
- Sonstiges

Dargestellt als horizontale Chips (wie die Hour-Chips im CareerFunnel). Pflichtfeld mit Sternchen. Bei "Sonstiges" erscheint ein kleines Textfeld. Validation: muss ausgewaehlt sein vor Absenden.

### 2. Kontaktseite (Step 3) Premium-Upgrade — beide Funnels

Aktuell: Einfache gestapelte Inputs, linksbuendig, kein visuelles Highlight. Wirkt wie ein Standard-Formular.

Aenderungen:

- **Zentrierte Labels**: Labels werden `text-center` statt linksbuendig
- **Inputs zentriert**: `text-center` auf den Inputs fuer zentrierten Placeholder und Eingabetext
- **Groessere Inputs**: `py-3.5` statt `py-3`, leicht mehr Luft
- **Fokus-Animation**: Bei Fokus skaliert das Input minimal (`scale-[1.01]`) mit einer sanften Transition — Apple-like Feedback
- **Sektions-Trenner**: Ein feiner `border-t border-white/[0.06]` zwischen den Kontaktfeldern und dem "Woher kennst du uns?" Block
- **"Woher kennst du uns?" Block**: Zentrierte Chips unterhalb der Kontaktfelder, mit Label "Woher kennst du uns? *" zentriert darueber
- **Nachricht-Feld**: Bleibt optional, bekommt ebenfalls `text-center` fuer Konsistenz

### 3. Schema-Update

`contactSchema` in beiden Dateien bekommt ein neues Feld:
```
referralSource: z.string().min(1, "Bitte auswählen")
```

`formData` State erhaelt `referralSource: ""`. Validation prueft ob es gesetzt ist.

---

## Betroffene Dateien

| Datei | Aenderung |
|-------|-----------|
| `src/components/ContactFunnel.tsx` | "Woher kennst du uns?" Pflichtfeld + Kontaktseite zentrieren + Premium-Styling |
| `src/components/career/CareerFunnel.tsx` | "Woher kennst du uns?" Pflichtfeld + Kontaktseite zentrieren + Premium-Styling |

Zwei Dateien. Keine neuen Abhaengigkeiten.

