

# Navigation umbauen: "Loesungen" Dropdown statt "Mehr"

## Aktuelle Struktur

```text
Desktop:  Logo | Telefonassistent | Chatbot | Automatisierungen | Das sind Wir | [Mehr ▼] | Jetzt anfragen
                                                                                   Karriere
                                                                                   Partner werden

Mobile:   [☰]  Logo  [WhatsApp]
          → Telefonassistent
          → Chatbot & WhatsApp
          → Automatisierungen
          → Das sind Wir
          → Karriere
          → Partner werden
          → Jetzt anfragen
```

## Neue Struktur

```text
Desktop:  Logo | [Loesungen ▼] | Das sind Wir | Karriere | Partner werden | Jetzt anfragen
                  Telefonassistent
                  Chatbot & WhatsApp
                  Automatisierungen

Mobile:   [☰]  Logo  [WhatsApp/Anfragen]
          → [Loesungen ▼]
              Telefonassistent
              Chatbot & WhatsApp
              Automatisierungen
          → Das sind Wir
          → Karriere
          → Partner werden
          → Jetzt anfragen
```

## Technische Aenderungen

**Datei:** `src/components/Navigation.tsx`

### 1. `MoreDropdown` wird zu `SolutionsDropdown`

- Rename + neuer Inhalt: die drei Produkt-Links (Telefonassistent, Chatbot, Automatisierungen)
- Trigger-Text: "Loesungen" statt "Mehr"
- Dropdown-Panel: gleicher Glassmorphism-Stil (`bg-background/95 backdrop-blur-md border-border/20`), aber mit Breite angepasst
- Jeder Eintrag mit kurzem Untertitel fuer Kontext

### 2. Desktop-Leiste

- Entfernt: die drei einzelnen navLinks als Top-Level-Items
- Entfernt: `<MoreDropdown />`
- Neu: `<SolutionsDropdown />` | Das sind Wir | Karriere | Partner werden
- Karriere und Partner werden ruecken als direkte Links hoch

### 3. Mobile/Tablet Sheet

- Statt die drei Links einzeln aufzulisten: ein aufklappbarer "Loesungen"-Bereich
- Tap auf "Loesungen" toggled einen `useState<boolean>` der die Sub-Links eingeblendet/ausblendet
- Sub-Links sind leicht eingerueckt (`pl-4`) mit kleinerem Text
- Das sind Wir, Karriere, Partner werden bleiben als direkte Links

### 4. Design-Details

- Dropdown-Background: `bg-background/95 backdrop-blur-md` (nicht transparent — solid genug)
- z-index: `z-[110]` damit es ueber der Nav liegt
- Chevron-Animation: 180° Rotation bei open
- Desktop: Click-Toggle (konsistent mit bisherigem Verhalten)
- Keine neuen Abhaengigkeiten noetig

## Betroffene Datei

| Datei | Aenderung |
|-------|-----------|
| `src/components/Navigation.tsx` | `MoreDropdown` → `SolutionsDropdown`, Desktop-Links umstrukturieren, Mobile Sheet mit aufklappbarem Loesungen-Bereich |

Eine Datei, keine neuen Abhaengigkeiten.

