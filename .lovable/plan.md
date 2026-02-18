

## Mobile/Tablet Header-Layout umbauen

### Aktuelle Situation
Auf Mobile/Tablet: Logo links, Hamburger-Menu rechts. Kein WhatsApp-Icon. Das mobile Menu hat noch keine Aufklapp-Funktion.

### Neues Layout (nur unter md-Breakpoint)

```text
+---------------------------------------+
|  [Hamburger]    [Logo]    [WhatsApp]  |
+---------------------------------------+
```

- **Links**: Hamburger-Menu-Button (oeffnet ein Sheet/Drawer mit den Navigationspunkten)
- **Mitte**: Logo zentriert
- **Rechts**: Rundes WhatsApp-Logo (verlinkt auf WhatsApp-Chat)

Desktop bleibt unveraendert.

### Technische Aenderungen

**Datei: `src/components/Navigation.tsx`**

1. Imports hinzufuegen: `Sheet`, `SheetContent`, `SheetTrigger` aus `@/components/ui/sheet` sowie das WhatsApp-Logo aus `@/assets/whatsapp-logo.png`
2. State `mobileMenuOpen` hinzufuegen
3. Mobiles Layout umstrukturieren:
   - Hamburger-Button nach links (als SheetTrigger)
   - Logo in die Mitte (mit `absolute left-1/2 -translate-x-1/2` fuer echte Zentrierung)
   - WhatsApp-Logo rechts als runder Button (ca. 8x8, `rounded-full`)
4. Sheet-Inhalt: Die 4 Navigationspunkte untereinander + "Jetzt anfragen"-Button
5. Desktop-Layout (`md:` und groesser) bleibt komplett unveraendert

### WhatsApp-Link
Der WhatsApp-Button verlinkt auf `https://wa.me/TELEFONNUMMER` - die Nummer muss noch eingesetzt werden (vorerst als Platzhalter `https://wa.me/` oder ein `#`).

