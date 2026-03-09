

## Plan: KI Statistiken in die Navigation einfuegen

In `src/components/Navigation.tsx` wird "KI Statistiken" als neuer direkter Link neben "Karriere" und "Partner werden" eingefuegt -- sowohl im Desktop- als auch im Mobile-Menue.

### Aenderungen in `src/components/Navigation.tsx`

**Desktop-Navigation** (ca. Zeile 153): Neuen Link `<Link to="/ki-im-mittelstand-zahlen">KI Statistiken</Link>` zwischen "Karriere" und "Partner werden" einfuegen.

**Mobile-Navigation** (ca. Zeile 119): Gleichen Link im mobilen Menue an derselben Stelle einfuegen mit `onClick={() => setMobileMenuOpen(false)}`.

