

## WhatsApp-Button: Gruen nur als Akzent

### Aenderung

**`src/components/HeroSection.tsx`** (Zeile 101)

Der Button bekommt ein dezenteres Styling:

- **Rand**: Weiss/grau (`border-foreground/20`) statt komplett gruen -- wie ein normaler Outline-Button
- **Text**: Weiss (`text-foreground`) statt gruen -- passt zum restlichen Design
- **WhatsApp-Icon**: Bleibt gruen -- das Logo selbst ist schon gruen und dient als Akzent
- **Hover**: Dezenter gruener Schimmer (`hover:border-[#25D366]/50 hover:bg-[#25D366]/5`) -- nur beim Hover kommt das Gruen leicht durch

### Vorher vs. Nachher

| Eigenschaft | Vorher | Nachher |
|---|---|---|
| Rand | Gruen (#25D366) | Weiss/grau, hover leicht gruen |
| Text | Gruen | Weiss |
| Icon | Gruen | Gruen (unveraendert) |
| Hover | Gruener Hintergrund | Dezent gruener Rand + leichter Hintergrund |

### Ergebnis

Der Button wirkt zurueckhaltender und professioneller. Das WhatsApp-Logo allein reicht als gruener Akzent, damit sofort klar ist, worum es geht -- ohne dass der ganze Button in Gruen schreit.

