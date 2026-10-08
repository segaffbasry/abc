# ABC London Property Group homepage (private prospect demo)

abclondonproperty.co.uk's homepage in a new skin. Look and layout follow rioproperty.co.za; motion follows lagom-development.com. It is one page, built with ABC's own lock-up, brand fonts, copy and photography. Stack: Next.js App Router, TypeScript, GSAP + ScrollTrigger and Lenis, with no UI kits or CSS frameworks.

## Run locally

Run `npm install`, then `npm run dev` (http://127.0.0.1:3052). Use `npm run build` and `npm start` for production, and `npm run typecheck` to check TypeScript.

| Script | What it does |
| --- | --- |
| `npm run media` | Downloads every photograph on the live homepage from GoDaddy's image CDN (`scripts/media.sh`), then makes the WebP copies in `public/media` (`scripts/images.py`) |
| `npm run logo` | Turns the live lock-up into vector outlines from Bitter 700 and writes `lib/logo.ts`, plus the favicon `app/icon.svg` (`scripts/logo.py`) |
| `npm run links` | Click-tests every link on the running page against the live sitemap and the live page's own tel:/mailto: links (`scripts/check-links.mjs`) |
| `npm run shots -- <width> <dir> [url] [--reduced]` | Scrolls the page in headless Chrome and saves screenshots. Reports height, horizontal overflow, broken images and console errors |
| `node scripts/intro.mjs` | Screenshots the preloader at fixed times and checks the scroll lock and the handover |

Downloads land in `_scrape/`, which is gitignored. Only the web copies in `public/` are committed.

## The route

| Route | What it is |
| --- | --- |
| `/` | The homepage. The build also emits the framework's `/_not-found` and the `/icon.svg` favicon route, so 3 static routes in total. |

There are no other pages. The live site has none either: its sitemap lists `/` and `/privacy-policy`. Every outbound link goes to its real destination.

## Recon (Phase 1)

**The live homepage**, a GoDaddy Website Builder page, from top to bottom with counts:
- **Banner:** the heading "ABC LONDON PROPERTY GROUP CREATE OPPORTUNITY", 2 lines of copy, and a phone call to action ("For Development Opportunities call Patrick on 07981872685", +44 and 07 numbers). It sits over 1 photograph.
- **About ABC London Property / Why Choose Us?:** 1 paragraph of 22 sentences and 1 photograph.
- **Building Your Vision:** 4 services, each with a title and a paragraph.
- **Expert Construction Management Services:** 6 services.
- **Contact Us:** address, phone, 2 emails, hours, "Get directions", a Google map and the "Drop us a line!" form (name, email, phone, attachments).
- **Connect With Us on linkedin:** 1 link.
- **WHAT CUSTOMERS SAY:** 5 reviews. 3 show and "Show More" opens the rest.
- **Gallery:** 8 photographs.
- **Footer:** copyright and Privacy Policy.

**Brand:**
- There is no logo file. The logo is live text: "ABC LONDON PROPERTY GROUP" set in Bitter 700, #FF6900, in two centred lines.
- Fonts in the live CSS: Abril Fatface (headings, letter-spacing 2px), Open Sans (body and buttons), and Bitter (the logo).
- Colours in use:
  - #161616 (dark ground)
  - #FF6900 (logo, buttons)
  - #F76600 (headings, a near-duplicate of the orange)
  - white
  - the GoDaddy theme's #4D4AFF button blue and #B0C4DE body text, both left out because they are template defaults, not brand colours
- No brand film.

**Structure:** the live site has no navigation menu, just the logo. Its only socials link is LinkedIn (Patrick Butler's profile).

**Look reference (rioproperty.co.za, Webflow), measured at 1440:**
- Type: Blauer Nue 600 in caps for h1 (74px, line-height .966) and h2 (52px). Rubik 16px caps for labels, 16px/1.5 for body.
- Sections have 80px block padding and a 30px page margin.
- Layout: a full-bleed hero photo with a stacked headline low on the left, its last line stepped in, and small caps notes along the top. Then image tiles, a "done deals" row, the "laws" text grid, a brand-colour "Let's talk" panel, and a footer led by a large email address.
- Motion: Lenis `{ wheelMultiplier: .75, duration: 1.25 }`. Every reveal is `expo.out` (34 tweens): lines rise from yPercent 125 over 1.5s, 0.05s apart. The load scale runs 1.25 to 1 over 3s with power3.out. Wipes are `expo.inOut`.

**Motion reference (lagom-development.com, WordPress "bamboo" theme):**
- Images open from their centre line with `clipPath: "inset(50% 0% 50% 0%)"`.
- The management-company accordion swaps its image and auto-advances.
- Large headlines are set in a faint grey.
- The `.btn` hover is the interaction copied below.
- Ground #F2EFE9, accent #FB7339. No smooth scroll.

## Palette

| Token | Hex | Source | Use |
| --- | --- | --- | --- |
| Ink | #161616 | abclondonproperty.co.uk dark ground | Hero, footer, text, the menu |
| Orange | #FF6900 | The live logo and buttons | Lock-up, buttons, figures, rules, contact panel |
| Paper | #F4F1EC | Warm off-white in Lagom's ground family | The light page |
| White | #FFFFFF | | Alternate bands |

The page uses no other hues; tints are these colours with transparency. Orange is 2.9:1 on white, so it never carries small text on a light ground. Ink on Orange is 6.6:1, so the contact panel and the buttons use Ink text.

**Decision (no confirmation step):** the brief asks to confirm the palette before building. The user said not to ask, so the four colours above come straight from the live site, plus one warm neutral.

## Typography

- **UI/body:** Open Sans (the live body face), self-hosted variable font.
- **Display:** Abril Fatface (the live heading face), self-hosted. It sets the hero, h2s, the menu, the large figures and the footer email.
- **Logo:** Bitter 700, converted to outlines. The live logo font isn't used as running text anywhere.

Abril is heavier than Rio's Blauer Nue, so it sits a step below Rio's sizes: h1 80px and h2 48px at 1440.

## Homepage sections and content counts

Page height (`npm run shots`):

| Width | Height | Viewports |
| --- | --- | --- |
| 1440 | 5,939 px | 6.6 of 900 |
| 768 | 7,846 px | 7.7 of 1024 |
| 375 | 8,032 px | 9.9 of 812 |

Seven sections plus the footer. Section padding is 56 to 88px.

| # | Section | Ground | Live homepage | This build | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Hero | Ink + photo | Heading, 2 lines, call to action, 1 photo | All of it | The live hero photograph (rooftop at sunrise). "London, Ireland, Europe" comes from the About paragraph |
| 2 | Why Choose Us? | Paper | 1 paragraph, 1 photo | The paragraph in full, 2 photos, 3 figures | Figures (30+ years, 1951, 4 generations) are the paragraph's own facts |
| 3 | Building Your Vision | White | 4 services | 4 services with photos | Accordion with an image swap (Lagom) |
| 4 | Projects | Paper | 8 gallery photos | 4 photos + 2 lines from the paragraph | The other 4 gallery photos lead section 3, so all 8 are on the page and none repeats |
| 5 | Construction Management | White | 6 services | 6 services | Text only, between two photo-led sections |
| 6 | What Customers Say | Paper | 5 reviews (3 shown) | 5 reviews | Reviewer tabs; all 5 reachable without "Show More" |
| 7 | Contact Us | White, Orange panel | Address, phone, 2 emails, hours, directions, map, form, LinkedIn | All except the map and form | See gaps |
| - | Footer | Ink | Copyright, Privacy Policy | Same, plus the email, details, section links and LinkedIn | No scroll reveals in the footer |

**Gaps, explained:**
- **The enquiry form is not rebuilt.** A form that cannot send would mislead the prospect. "Drop us a line!" is a button that opens an email to Patrick.
- **The Google map is not embedded.** A full-width map would be a section that is mostly a visual with no text. "Get directions" goes to Google Maps directions for the address, which is what the live button does.
- **No visible "About ABC London Property" label.** Earlier clients asked for no pre-heading labels, so it is the section's accessible name instead. The visible heading is "Why Choose Us?".
- **Review dates show as month and year.** The live widget stores them inconsistently: some are MM/DD and one is DD/MM.
- **The cookie banner is not rebuilt.** The demo sets no cookies of its own and adds no visible UI.

## Client review 1 (8 October 2026)

Feedback: "cant really see this" (the logo and the locations over the hero photo) and "sort the logo in the top and locations because its not looking super good".
- **Logo:** the lock-up now sits in a solid Ink tab, flush in the top-left corner. Rio sets its own logo in a dark box there. The orange reads on every ground, and the tab fades in at the handover while the preloader's lock-up still lands on it.
- **Locations and the top note:** moved off the busy sky into the lower part of the hero, on an Ink panel (86%, no backdrop-filter) beside the headline. Place names are white with orange separators; the note, lead, call line and button sit under them.

## How it works

### Smooth scroll

Lives in `components/Motion.tsx` and `lib/scroll.ts`. Lenis runs on the GSAP ticker, synced with ScrollTrigger, with `lerp: 0.12` and `wheelMultiplier: 0.9`. Rio uses a fixed `duration`, which read as a jump at the bottom of the page on an earlier demo. Anchor links go through Lenis. The preloader and the menu stop it. `overscroll-behavior-y: none` is set on html and body.

### Link guard

Also in `Motion.tsx`. Because this is a private demo, every link keeps its real href (for checking and for the hover URL) but never navigates. A capture-phase click/auxclick guard prevents it. `#` links scroll through Lenis instead.

### Grounds

Each section has one fixed ground: one dark opening, then Paper and White bands, then an Ink footer. Nothing recolours on scroll, because clients have rejected the page "jumping" through colours.

### Header

Lives in `components/Header.tsx` and follows Rio: the lock-up in an Ink tab in the top-left corner, the phone number and Menu on the right, with no bar or box. Its text follows the `data-tone` of the section under it. The logo stays orange throughout. It hides on scroll down and returns on scroll up.

### Menu

A full-screen Ink panel that wipes down from the top (clip-path, 0.8s, Lagom's curve). The section names, in Abril caps after Rio's bold nav, then rise out of line masks 0.05s apart.

It is one GSAP timeline, reversed out at 1.5x. Focus is trapped, with the "Close" toggle part of the trap. Esc closes the menu and focus returns to the toggle.

Links:
- six homepage sections
- phone
- both emails
- the office (directions)
- LinkedIn
- Privacy Policy

### Hero

Lives in `components/home/Hero.tsx`. Its entrance waits for `intro:done` and reuses Rio's load moves:
- the photograph scales from 1.25 to 1 over 3s (power3.out)
- "Create / Opportunity" rise line by line from yPercent 125 (1.5s expo.out, 0.05s apart)
- the notes rise from yPercent 50 and fade in (2s, 0.125s apart)

On the way out, the photograph is scrubbed to a framed inset and drifts, while the copy lifts away. This and the preloader are the only places with heavier motion.

### Vision accordion

Lives in `components/home/Vision.tsx` and follows Lagom.
- Picking a service swaps the photograph. The new one opens from its centre line (1.1s, Lagom's curve).
- While the section is in view, the list advances every 7s, with an orange hairline filling under the open item.
- It stops for good on any hover, focus or pick.
- It never auto-advances with reduced motion.
- Buttons carry `aria-expanded` and `aria-controls`.

### Reviews

Lives in `components/home/Reviews.tsx` and follows the WAI-ARIA tabs pattern: the reviewers are tabs, and arrow keys, Home and End move between them. A new quote fades and lifts in.

### Photography

ABC's own photographs, in natural colour (saturate .9). There is no tint or duotone, because clients rejected filtered photography. One crop: the Limerick photo is a phone screenshot of Street View, so its status bar and title strip are cut away.

### Motion vocabulary

Each move is declared in markup with `data-reveal` and plays once, except `fill`, which is scrubbed. Everything inside `[data-late]` (sections 5 to 7) runs at 0.75 of the duration.

| Move | Applied to | What happens | Timing | Source |
| --- | --- | --- | --- | --- |
| `head` | Headings | The whole phrase fades and rises 28px | 1.2s, expo.out, at 88% | Rio's slide-up-fade |
| `text` | Paragraphs | Words rise out of a line mask | 1.1s, expo.out, 0.006s apart | Rio's `[data-split]` lines |
| `fill` | The About lead | Words go from 20% to full opacity as it crosses the screen | Scrubbed, top 82% to bottom 52% | Lagom's faint headline |
| `label` | Labels, buttons, short lines | Fade and rise 14px | 0.9s, expo.out, at 94% | |
| `cards` | Lists (figures, services, reviewers, details) | Children rise 36px in batches | 1.1s, expo.out, 0.08s apart | |
| `image` | Photographs | Frame opens from its centre line; the image inside drifts about 10% (`data-parallax`) | 1.4s, Lagom's in-out | Lagom's `inset(50% 0 50% 0)` |
| `data-count` | Figures | Count up (1951 from 1900) | 1.8s, expo.out | |

There is no per-letter motion outside the preloader and the copied button.

### The curves

| Name | Curve | Source | Use |
| --- | --- | --- | --- |
| `abc-out` | expo.out, cubic-bezier(.16,1,.3,1) | Rio's reveal curve | Anything that settles |
| `abc-io` | cubic-bezier(.625,.05,0,1) | Lagom's `--button-transition` | Wipes, frames, the button |

Both are CSS variables (`--ease-out`, `--ease-io`) and GSAP CustomEases.

### Copied interaction: Lagom's `.btn` hover

Lives in `components/ui.tsx` (`RollButton`), rebuilt from lagom-development.com's `assets/css/index.css`.
- Each letter is an inline-block span with `--i`. The label casts a copy of itself 1.5em below with `text-shadow: 0 1.5em`, and overflow hides it.
- On hover, each letter moves up by its own height (`translateY(-100%)`). The transition is `transform .8s cubic-bezier(.625,.05,0,1)` with `transition-delay: calc(var(--i) * 6.6ms)`, so the copy rolls up left to right.
- Measurements copied as is:
  - padding: `clamp(9px,1.042vw,20px) clamp(12px,1.667vw,32px)`
  - type: 600, `clamp(14px,.833vw,16px)`, line-height 150%, letter-spacing .02em
  - corner: Lagom's `icon-line.svg` (a 24px diagonal sliver, top right)
- Compared side by side in headless Chrome at 0, 150, 300 and 900ms: same letter roll, same timing.
- Two changes:
  - The label is Ink, not white: white on #FF6900 is 2.9:1, and the live ABC buttons are dark on orange too.
  - The roll also plays on `:focus-visible`.
- The full label is the link's `aria-label`; the letters are `aria-hidden`.

### Preloader

Lives in `components/Preloader.tsx` and `components/Logo.tsx`.

**Why letters:** ABC's logo is pure lettering, so the build is letters. `scripts/logo.py` turns the live lock-up into outlines from Bitter 700, one path per letter.

**The build:**
- The initials A, B and C rise one after another as the mark.
- "LONDON" wipes in beside them.
- "PROPERTY GROUP" wipes in below.
- A 00 to 100 counter and an orange hairline show progress. Clients asked for a loader they notice.

**Background:** Ink, the colour the hero opens on.

**The timeline** (one GSAP timeline, about 2.55s):

| Time (s) | What happens |
| --- | --- |
| 0.10 to 0.86 | A, B and C rise (expo.out, 0.13s apart) |
| 0.70 to 1.25 | "LONDON" wipes in (Lagom's in-out) |
| 0.95 to 1.55 | "PROPERTY GROUP" wipes in |
| 0.00 to 1.85 | Counter and progress hairline |
| 1.90 | Handover: removes `is-loading`, sets `data-intro="done"`, dispatches `intro:done`, starts Lenis |
| 1.90 to 2.55 | The curtain lifts off the hero (bottom edge up, Rio's mask wipe) while the lock-up flies into the header logo's position |

The hero entrance starts at the handover, so the exit and the entrance are one moment. The header logo is hidden until the lock-up lands on it.

**Measured** (`scripts/intro.mjs` and a frame probe):
- The handover fires 2.28s after navigation in dev: 1.90s of timeline plus page start.
- Scrolling stays at 0 during the intro.
- The lock-up ends at the header logo's exact box: x 30, y 30, width 158.

**Rules:**
- It plays on every load. It runs longer than the brief's 1.5 to 2.0s on purpose: a short intro went unseen on an earlier demo.
- A 3.4s failsafe completes it if the tab is throttled.
- It is skipped with reduced motion and hidden without JavaScript.

### Reduced motion and no-JS

- **Reduced motion:** no preloader, no Lenis, no reveals, no accordion auto-advance. Everything is visible.
- **No JavaScript:** nothing is hidden, because hidden starts only apply under `.js`. The preloader never shows (`<noscript>` style).

## Private-demo settings

- `robots: noindex, nofollow` (plus `nocache`) in `app/layout.tsx`. There is no sitemap.
- PostHog EU lives in `lib/posthog.ts`:
  - key from `NEXT_PUBLIC_POSTHOG_KEY`, with a fallback literal
  - pageview, pageleave, autocapture and session recording on; surveys off
  - `site` registered, plus UTM tags when present
  - `scroll_depth` fires once each at 25/50/75/100%
- No visible tracking UI, no cookie banner, no credit.

## Images

Every photograph is ABC's own, downloaded from the live homepage via GoDaddy's CDN (`img1.wsimg.com/isteam/ip/a47b546b-…`) by `scripts/media.sh`, then resized to WebP by `scripts/images.py`.

| File | Live file | Used in |
| --- | --- | --- |
| `hero.webp`, `hero-m.webp` | `sunset image LINKEDIN POST 1 (1).jpeg` | Hero (the live hero) |
| `about-tower.webp` | `IMG_7597` | About (the live About image) |
| `about-roof.webp` | `IMG_9262` | About |
| `g-portico.webp` | `IMG_6841` | Gallery, Building Your Vision |
| `g-house.webp` | `IMG_6552` | Gallery, Building Your Vision |
| `g-scaffold.webp` | `IMG_2318` | Gallery, Building Your Vision |
| `g-view.webp` | `IMG_7367` | Gallery, Building Your Vision |
| `g-castle.webp` | `IMG_6852` | Gallery, Projects |
| `g-wrap.webp` | `IMG_2617` | Gallery, Projects |
| `g-brick.webp` | `IMG_6835` | Gallery, Projects |
| `g-limerick.webp` | `IMG_6737` | Gallery, Projects |

Fonts come from Fontsource (OFL): Abril Fatface, Open Sans (variable) and Bitter (variable; outlines only).

## Verification

- `npm run typecheck` passes. `npm run build` passes with 3 static routes: `/`, `/_not-found` and `/icon.svg`.
- `npm run shots` at 375, 768 and 1440 showed no horizontal scroll, no broken images and no console errors. The same holds with `--reduced`.
- `npm run links` found 35 links and 6 destinations, all OK. LinkedIn refuses bots, so it was checked by hand.
- No em or en dashes in the rendered text.
- The menu was tested with the keyboard only: Enter opens it, focus goes to the first item, Tab and Shift+Tab wrap, Esc closes it and focus returns.
