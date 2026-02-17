

## Testimonials-Section unter der Prozess-Section

Eine horizontal scrollende Bewertungs-Section mit Marquee-Animation, die Vertrauen schafft und zum bestehenden dunklen Neon-Design passt.

### Neue Dateien

**1. `src/components/ui/testimonial-card.tsx`**
- Karten-Komponente fuer einzelne Bewertungen
- Styling: `bg-white/5 backdrop-blur-md border-border/30` (wie Feature-Karten)
- Hover: `hover:border-neon/40` mit Neon-Glow
- Avatar: Initialen-basiert via `AvatarFallback` mit `bg-neon/10 text-neon`
- Felder: Name, Rolle, Firma, Bewertungstext
- Kein Foto, kein Social-Handle -- stattdessen Rolle + Firmenname (B2B-passend)

**2. `src/components/TestimonialsSection.tsx`**
- Section mit Badge ("Kundenstimmen"), Headline und Marquee-Slider
- Marquee via CSS-Animation (`animate-marquee`) -- kein zusaetzliches JS
- Fade-Effekt an den Raendern via CSS `mask-image` (wie beim Logo-Slider)
- Vier vorgefuellte Bewertungen:
  - Thomas Mueller, Vertriebsleiter, Schmidt Versicherungen -- Sales-Automatisierung
  - Dr. Lisa Weber, Praxismanagerin, Zahnarztpraxis Weber -- KI-Telefonassistent
  - Marco Hoffmann, Geschaeftsfuehrer, Hoffmann Malerbetrieb -- Chatbot
  - Stefan Krause, Projektleiter, Krause Bau GmbH -- WhatsApp-Bot

### Aenderungen

**`tailwind.config.ts`**
- Neue Keyframe `marquee`: `from { translateX(0) } to { translateX(calc(-100% - var(--gap))) }`
- Neue Animation `marquee`: `marquee var(--duration) linear infinite`

**`src/pages/Index.tsx`**
- Import und Einbindung von `TestimonialsSection` nach `ProcessSection`

### Keine neuen Dependencies noetig
- `@radix-ui/react-avatar` ist bereits installiert
- `Avatar` und `AvatarFallback` existieren bereits in `src/components/ui/avatar.tsx`

### Technische Details
- Die Marquee-Animation ist rein CSS-basiert (performanter als JS-basierte Loesung)
- Testimonials werden 4x dupliziert im DOM fuer nahtloses Looping
- `--duration` und `--gap` als CSS Custom Properties fuer einfache Anpassung
- Responsive: Karten haben feste Breite (`w-[350px]`), Marquee passt sich automatisch an
- Der Glassmorphism-Stil (`bg-white/5 backdrop-blur-md`) ist konsistent mit FeaturesSection und ProcessSection

