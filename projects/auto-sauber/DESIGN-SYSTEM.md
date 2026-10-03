# Auto Sauber – Designsystem

Abgeleitet aus dem bereitgestellten Brand-Board (Logo, Farbpalette, Typografie,
Design-Elemente, Buttons) und verfeinert mit `ui-ux-pro-max` (Design-System-Suche,
UX-Regeln) und `taste-skill` (Anti-Template-Regeln).

**Design Read:** Lokale Premium-Automotive-Dienstleistung für Privatkunden in
Würzburg. Dunkle, ruhige Bühne, auf der ein einziger warmer Goldakzent wie
Streiflicht auf Lack wirkt. Editorial-asymmetrisch statt Kartenraster.
Dials: Variance 6 · Motion 4 · Density 3.

## 1. Bildanalyse (Brand-Board)

| Merkmal | Befund |
|---|---|
| Dominant | Tiefschwarz `#0A0A0A` und Anthrazit `#151515`. Rund 85 % der Fläche |
| Sekundär | Kartengrau `#1E1E1E`, Linien `#2A2A2A` |
| Akzent | Champagner-Gold `#C8A45D`, hell `#E0C078`. Nur für CTAs, Linien, Icons und Ziffern |
| Helligkeit | Sehr niedrig (L* < 10) mit punktuellen Spitzlichtern, also hohe Kontrastdynamik |
| Material | Klarlack, Nässe, gebürstetes Metall, Leder, Licht als Linie |
| Stimmung | Nachtstudio, ruhig, präzise, seriös, hochwertig ohne Prunk |
| Typo-Stimmung | Geometrische Grotesk (Manrope) mit großzügigem Tracking in Versalien |
| Bildsprache | Low-Key-Fotografie, schwarze Fahrzeuge, goldenes Streiflicht, Makrodetails |

## 2. Farbtokens

| Token | Wert | Verwendung | Kontrast auf `bg` |
|---|---|---|---|
| `--color-bg` | `#0A0A0A` | Seitenhintergrund | – |
| `--color-surface` | `#121212` | Sektionen im Wechsel | – |
| `--color-card` | `#1A1A1A` | Karten, Container | – |
| `--color-border` | `#2A2A2A` | Linien, Rahmen | – |
| `--color-border-strong` | `#3A3A3A` | Hover-Rahmen | – |
| `--color-text` | `#F5F5F5` | Überschriften, Fließtext | 18.1 : 1 |
| `--color-muted` | `#A7A7A7` | Sekundärtext | 8.6 : 1 |
| `--color-subtle` | `#7C7C7C` | Labels, Meta (nur ≥ 14 px) | 4.9 : 1 |
| `--color-accent` | `#C8A45D` | Primäre CTAs, Akzentlinien | 8.4 : 1 |
| `--color-accent-light` | `#E0C078` | Hover, aktive Zustände | 11.0 : 1 |
| `--color-accent-deep` | `#8A7140` | Feine Linien, Verläufe | – |
| `--color-on-accent` | `#0A0A0A` | Text auf Gold | 8.4 : 1 |

Regeln: **ein** Akzent für die ganze Seite. Gold nie als Fließtextfarbe für längere
Passagen. Keine Verläufe außer der feinen Gold-Linie (`--gradient-rule`).

## 3. Typografie

- **Manrope Variable**: Headlines, Navigation, Buttons, Ziffern (Gewicht 500–800)
- **Inter Variable**: Fließtext und UI (400–600)
- Beide selbst gehostet (`@fontsource-variable`), `font-display: swap`

| Stufe | Größe (fluid) | Gewicht | Tracking |
|---|---|---|---|
| Display (H1) | `clamp(2.6rem, 6.4vw, 5.6rem)` | 800 | −0.035em |
| H2 | `clamp(2rem, 4.2vw, 3.4rem)` | 700 | −0.03em |
| H3 | `clamp(1.25rem, 1.8vw, 1.6rem)` | 700 | −0.015em |
| Eyebrow | 0.75rem | 600 | +0.22em, Versalien |
| Body L | 1.125rem / 1.65 | 400 | 0 |
| Body | 1rem / 1.65 | 400 | 0 |
| Small | 0.875rem / 1.5 | 500 | 0 |

## 4. Spacing, Radius, Schatten, Container

- 4-px-Raster. Sektionsabstand `clamp(5rem, 11vw, 9.5rem)`
- Container: `max-width: 1320px`, Gutter `clamp(1rem, 4vw, 2.5rem)`
- Radius bewusst **nicht** einheitlich: Buttons `6px`, Karten `4px`, Bilder `2px`,
  Badges `2px`. Keine Pills außer runden Icon-Buttons
- Schatten: kaum. Tiefe entsteht über Licht (Bild) und Rahmen.
  `--shadow-glow` nur für den Fokus-/Hover-Zustand des Primär-Buttons

## 5. Komponenten

- **Button primär**: Gold-Fläche, schwarzer Text, Pfeil-Icon wandert bei Hover 3 px
- **Button sekundär**: 1 px Rahmen `#F5F5F5/30`, bei Hover Rahmen Gold
- **Button ghost**: Text + animierte Unterstreichung
- **Service-Zeile**: große nummerierte Editorial-Zeilen statt identischer Karten.
  Bild-Reveal und Zoom bei Hover
- **Gold-Rule**: 1 px Verlaufslinie mit drei schrägen Streifen (`////`) aus dem Board
- **Hex-Textur**: SVG-Wabenmuster mit 4 % Deckkraft im CTA-Band (aus dem Board)

## 6. Motion

| Token | Wert |
|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--dur-fast` | 200 ms (Hover, Farbe) |
| `--dur-base` | 400 ms (Menü, Lightbox) |
| `--dur-slow` | 800 ms (Scroll-Reveal, Bild-Reveal) |
| Ken Burns | Hero: Skalierung 1.0 auf 1.06 über 18 s, einmalig, kein Loop |

Reveal per IntersectionObserver (fade-up 16 px, gestaffelt 80 ms).
`prefers-reduced-motion: reduce` deaktiviert Ken Burns, Parallax und Reveals:
Inhalte stehen sofort sichtbar da.

## 7. Breakpoints

`sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`. Getestet bei 320, 375, 390, 430,
768, 1024, 1280, 1440 und 1920 px.
