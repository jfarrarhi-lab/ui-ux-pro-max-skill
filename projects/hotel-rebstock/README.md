# Hotel Rebstock Würzburg – website

A single-file website (`index.html`): all HTML, CSS and JavaScript are in that file. The images sit next to it:

```
index.html
assets/frames/f001.jpg … f300.jpg   hero sequence: the 300 frames from the supplied ZIP, unmodified (720×1280)
assets/offers/offer-genuss.png      transparent arch cut-out (dining room, frame 290)
assets/offers/offer-golf.png        transparent arch cut-out (portal, frame 95)
assets/photos/                      put your own photographs here
```

## Running it

Upload the folder to any web server, or test it locally:

```bash
cd projects/hotel-rebstock
python3 -m http.server 8000      # then open http://localhost:8000
```

Opening `index.html` straight from disk also works. No build step and no libraries are needed, and the page loads no external fonts.

## Before going live

| What | Where | Why |
|---|---|---|
| **Impressum, Datenschutz, AGB** | `<section id="impressum">`, `#datenschutz` and `#agb` near the end of `index.html` (search for `PASTE VERBATIM`) | The build environment could not reach rebstock.com, so the original texts could not be copied. Each page currently shows a clearly marked slot that links to the current original page. Paste the German text unchanged. |
| **Enquiry submission** | `SITE_CONFIG.enquiryEndpoint` in the script | Empty by default. While it is empty, the planner tells the guest that nothing was sent and offers a pre-filled e-mail to reservierung@rebstock.com. |
| **Consent sentence** | Step "Ihr Einverständnis" (search for `REPLACE WITH ORIGINAL WORDING`) | It should match the wording of the "Einverständnis" checkbox on the old contact form exactly. |
| **Offer details** | `#angebote` (search for `PLACEHOLDER`) | Inclusions and prices of the Genuss and Golf packages. |
| **Meeting rooms** | `#tagungen` | The old site gave different room counts and capacities on different pages (5, 6 and 8 rooms), so no number is shown. |
| **Meeting links** | `SITE_CONFIG.miceExpressUrl`, `SITE_CONFIG.meetingBookingUrl` | Express request and online meeting booking (`rebstock.com/tagung-online-buchen.html` on the old site). |

### Connecting the enquiry form

Set `enquiryEndpoint` to any HTTPS URL that accepts `multipart/form-data` POSTs, such as your own backend or a form service (Formspree, Basin, a mail relay). It receives:

- the field names of the old contact form: `firma, anrede, vorname, nachname, strasse, plz_ort, telefon, email, anliegen, einverstaendnis`
- the stay details: `anreise, abreise, naechte, zimmer, zimmeranzahl, erwachsene, kinder, kinderalter, sprache, _subject`

`anliegen` is a German summary of the whole stay, ready to paste into the reservation system. A 2xx response shows "Ihre Anfrage ist bei uns angekommen". Any other response, a network error or a 20-second timeout shows a failure message with a retry button and the e-mail fallback. The form never reports success unless the endpoint accepted the enquiry. A hidden honeypot field (`website`) filters simple bots.

## Replacing photos

Each placeholder is a `<figure class="photo is-placeholder">` with a comment above it, for example `<!-- REPLACE WITH HOTEL TEAM PHOTO -->`. The suggested file name is printed inside the placeholder. To replace one:

```html
<!-- before -->
<figure class="photo is-placeholder" data-reveal><div class="ph">…</div></figure>
<!-- after -->
<figure class="photo" data-reveal><img src="assets/photos/team.jpg" alt="Das Rebstock-Team am Empfang" loading="lazy"></figure>
```

The frame sets the aspect ratio and the image fills it (`object-fit: cover`). Placeholders exist for the team, reception, host, breakfast, service, Würzburg, rooms, the suite, the Junior Suite terrace, KUNO dishes, the kitchen team and the SALON bar. The house and restaurant sections currently use stills from the hero sequence (`assets/frames/f070.jpg`, `f175.jpg`, `f270.jpg`); swap them for high-resolution photos when you have them.

## How the hero works

- **Sequence:** frames 1–120 show the façade and portal, 121–215 the doors, steps and stone arch, and 216–300 the dining room under the glass dome. The frames are used in their original order.
- **One progress value drives everything:** `p = (scrollY − heroTop) / (heroHeight − viewportHeight)`, computed from the hero's real document position. The frame is `1 + round(p × 299)`, and the three text passages read the same `p` from `HERO_TIMELINE`. Because `p` depends only on scroll position, fast scrolling, scrolling back, reloading or jumping straight to a position all produce the same picture and text.
- **Narrative intervals:**
  - Portal: visible at load, fades out over frames 52–81.
  - Foyer: builds up over frames 133–165 and fades out over 201–227.
  - Restaurant: builds up over frames 243–279 and stays to the last frame.
  - Each passage builds up line by line through opacity and a 16px rise, and reverses when you scroll back. The intervals never overlap.
- **Loading:** frame 1 loads first. The preloader then counts a spread of frames across the whole sequence plus the three narrative frames (33 on desktop) and shows real percentages. The other frames stream in afterwards, and the canvas always draws the nearest decoded frame, so scrolling never waits on the network. Phones load every second frame (150), which halves memory use. A failed frame counts as done, and a 15-second safety limit stops the preloader from hanging. If no frame loads at all, the page switches to the static hero.
- **Desktop:** the portrait footage is shown as a tall arched panel, with the same frame blurred to fill the stage. **Mobile:** the footage fills the screen.
- **No JavaScript or reduced motion:** the hero becomes three stacked chapters (frames 1, 185 and 290), each with its text visible. All other scroll effects are skipped, so every element is shown in its final state.

## Scroll triggers

All scroll effects use one small engine in the script. Each trigger works out its start and end positions from `getBoundingClientRect().top + pageYOffset`, with the element's own transform removed while it is measured.

- **Offers:** start when the card's slot reaches the bottom of the viewport and end when the slot's centre reaches 55% of the viewport height. Card 1 comes in from the left, card 2 from the right.
- **Reveals:** start when the element's top is at 95% of the viewport height and end at 72%.

To inspect them, open `index.html?debug=triggers`. This prints a table to the console and draws the start and end lines. You can also run `window.__rebstockTriggers()` in the console.

## Content sources

The facts come from rebstock.com pages (rooms, history, restaurants, parking, directions, offers, meetings, partners, contact), read through web-search excerpts because direct access was blocked. Please check these against the live site:

- **KUNO 1408 star:** the site calls it "Sternerestaurant" and says it holds a Michelin star, but one of those statements comes from a 2015 press release.
- **Room names:** the German room names are used. The English page names the categories slightly differently.
- **Partners:** the German and English partner pages list slightly different partners.
- **Google rating:** no star rating or review count is shown, because it could not be verified. The page links to the reviews on Google instead.
