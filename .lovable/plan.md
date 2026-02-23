

## Logo im Avatar-Kreis des PhoneHero

### Was passiert

Das Telefon-Emoji im runden Avatar-Kreis (oberhalb von "KI-Telefonassistent") wird durch euer Logo ersetzt.

### Umsetzung

**1. Logo-Datei kopieren**
- Das hochgeladene Logo (`LOGO-5-TRANSPARENT-2.png`) wird nach `src/assets/logo-phone-avatar.png` kopiert

**2. PhoneHero.tsx anpassen**

- Logo als ES6-Modul importieren: `import logoAvatar from "@/assets/logo-phone-avatar.png"`
- Das Telefon-Emoji (Zeilen 56-63) entfernen
- Stattdessen ein `<image>` Element im SVG einfuegen, das innerhalb des bestehenden Kreises (cx=160, cy=130, r=28) angezeigt wird
- Per `clipPath` mit einem Kreis beschneiden, damit das Logo rund bleibt und sauber in den Avatar passt
- Gleiche fade-in Animation wie das Emoji (delay 1.8s)

### Technisch

```text
Vorher:  motion.text mit Emoji "📞"
Nachher: motion.image mit clipPath (Kreis r=28) + Logo-Import
```

Keine anderen Dateien betroffen.
