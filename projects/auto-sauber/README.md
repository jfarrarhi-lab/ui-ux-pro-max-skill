# Auto Sauber: Website

One-Page-Website für **Auto Sauber**, KFZ-Aufbereitung · Smart Repair · Autopflege,
Conradistraße 6, 97072 Würzburg.

Stack: React 19 · TypeScript · Vite · Tailwind CSS 4 · Phosphor Icons ·
selbst gehostete Fonts (Manrope + Inter). Keine Animations-Library: Reveals,
Parallaxe und Ken Burns laufen über CSS und IntersectionObserver.

```bash
npm install      # Node >= 20.19
npm run images   # Bilder laden + AVIF/WebP in 640/1280/1920 px erzeugen (einmalig)
npm run dev      # http://localhost:5173
npm run build    # statischer Build in dist/, auf jedem Webspace hostbar
```

`npm run images` ist für die Performance wichtig: Ohne den Schritt lädt die
Seite die Original-PNGs direkt vom Higgsfield-CDN. Mit dem Schritt liefert sie
responsive AVIF/WebP aus `public/images/` aus.

## Aufbau

| Pfad | Inhalt |
|---|---|
| `src/content/site.ts` | **Alle Unternehmensdaten**: Adresse, Telefon, Zeiten, Social, Rechtliches |
| `src/content/services.ts` | Leistungen und Aufbereitungsprogramme mit Preisen |
| `src/content/images.ts` | Bild-Manifest (Schlüssel, Quelle, Alt-Text, Seitenverhältnis) |
| `src/components/*` | Abschnitte: Nav, Hero, Usp, Services, Programs, BeforeAfter, About, Gallery, CtaBand, Contact, Footer, MobileBar |
| `src/index.css` | Design-Tokens (`@theme`) und Motion |
| `DESIGN-SYSTEM.md` | Farb-, Typo-, Spacing- und Motion-Regeln |

## Vor dem Livegang (`TODO(...)` im Code)

Die alte Website war aus der Build-Umgebung nicht direkt abrufbar. Die Inhalte
stammen aus Suchmaschinen-Auszügen der alten Seiten und aus Branchenverzeichnissen.
Bitte mit dem Inhaber prüfen:

- [ ] **Öffnungszeiten** (Mo–Fr 8–18, Sa 8–14 laut Verzeichnissen)
- [ ] **Preise** der 7 Aufbereitungsprogramme und der Verkaufshilfe (99 €)
- [ ] **Autoglas**: Bedingungen der Übernahme der Selbstbeteiligung bis 150 €
- [ ] **Instagram**: Handle fehlt, der Button zeigt aktuell auf instagram.com
- [ ] **WhatsApp**: Läuft es über 0171 3632191? Sonst anpassen oder entfernen
- [ ] **Impressum/Datenschutz**: verlinken aktuell auf die alte Domain. Texte übernehmen.
      Rechtsform klären (Register nennt auch eine „Auto Sauber Yalcin & Oehrlein OHG“)
- [ ] **Domain** in `index.html` (canonical, JSON-LD) und `site.ts`
- [ ] **Logo**: Die Wortmarke ist nach dem Brand-Board nachgebaut. Finale SVG einsetzen
- [ ] **Bilder**: Alle Bilder sind KI-generierte Symbolbilder (Higgsfield), keine
      Kundenfahrzeuge. Galerie und Vorher/Nachher sind auf der Seite als Platzhalter gekennzeichnet

## Eigene Fotos einsetzen

Foto als `.image-cache/<schlüssel>.jpg` ablegen, zum Beispiel `.image-cache/hero.jpg`.
Danach `npm run images -- --force` ausführen. Die eigene Datei hat Vorrang vor der
Remote-URL. Für echte Vorher/Nachher-Paare in `BeforeAfter.tsx` zwei Schlüssel
verwenden und den Platzhalter-Hinweis entfernen.
