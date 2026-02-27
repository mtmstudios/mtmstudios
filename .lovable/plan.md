

## Problem

Der "Lösungen"-Button im mobilen Menü bekommt beim Öffnen des Sheets automatisch den Browser-Fokus, was den Standard-Fokus-Ring (blauen Kasten) anzeigt. Das passiert, weil Radix Dialog den Fokus beim Öffnen auf das erste interaktive Element setzt — und das ist der "Lösungen"-Button.

## Fix

**Datei:** `src/components/Navigation.tsx` (Zeile 99)

Den `className` des "Lösungen"-Buttons um `focus:outline-none` erweitern, damit der Browser-Fokusrahmen nicht sichtbar ist:

```
className="flex items-center gap-2 text-lg text-foreground/80 hover:text-foreground transition-opacity duration-200 w-full focus:outline-none"
```

Eine einzeilige Änderung, keine weiteren Dateien betroffen.

