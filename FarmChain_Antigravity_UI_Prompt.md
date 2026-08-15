# FarmChain — Antigravity UI/UX Foundation Prompt (Diff-Gated)

## How to use this
Paste the sections below into Antigravity **in order** — Step 0 (images) is manual work you do yourself first, Steps 1-4 are Antigravity prompts. Every Antigravity step ends with "show me the diff before applying" — review each one before accepting, same as your Jankalyan workflow.

---

## STEP 0 — Real Images (do this yourself, before touching Antigravity)

**Why:** No AI image generator output — no matter how good — will read as "real" the way an actual photograph does. Skin texture, imperfect soil, real light, slightly awkward crop framing — these are exactly the things that signal "not AI" to a viewer, and generators smooth all of them away. This step cannot be delegated to Antigravity.

**Where to get real, free-to-use photos:**
- [Unsplash](https://unsplash.com) and [Pexels](https://pexels.com) — both free for commercial use, no attribution legally required (but crediting is good practice)
- Search terms to use (avoid generic "farmer smiling at camera" stock — pick candid, working shots):
  - `indian farmer field morning`
  - `wheat field hand close up`
  - `soil texture hand`
  - `rural india agriculture`
  - `irrigation field india`
  - `mandi vegetable market india`
  - `monsoon crop field`
  - `farmer hands soil`

**What to avoid picking:**
- Anything that looks like a stock-photo cliché (posed handshake, forced smile directly at camera, overly polished "corporate agriculture" shots)
- Anything with visible watermarks or unclear licensing
- Over-saturated/HDR-processed images — pick natural, slightly muted tones so they match an earthy palette instead of fighting it

**What to download (minimum set for the MVP screens):**
| Use | Suggested shot type | Approx count |
|---|---|---|
| Landing hero | Wide field/farmer-at-work shot, natural light | 1-2 |
| Dashboard empty states | Close-up texture shots (soil, seedling, crop) | 3-4 |
| "How it works" section | Candid working shots — sowing, checking crop, market | 3-4 |
| Crop detail pages | Per-crop close-ups (wheat, rice, etc. as needed) | 1 per crop |

Save them into `frontend/src/assets/images/` with descriptive names (`hero-field-morning.jpg`, `soil-hand-closeup.jpg`) — you'll reference these exact filenames in the prompts below. Compress them first (TinyPNG or Squoosh, free) so they don't kill your Lighthouse score.

---

## STEP 1 — Typography & Color Foundation (Antigravity prompt)

```
Set up the design token foundation for FarmChain in this React + TypeScript + Tailwind project.

TYPOGRAPHY:
Do NOT use Inter, Poppins, Roboto, or any default Tailwind/shadcn font — these read as generic AI-generated SaaS. Instead:

- Headings: "Fraunces" (Google Fonts) — a warm, slightly editorial serif with real character, weight 400-600 for headings, italic variant available for emphasis/quotes
- Body: "Public Sans" (Google Fonts) — a humanist sans-serif, weight 400-500, designed for readability at small sizes (good for mobile/outdoor use)
- Numerals/data (prices, measurements): "IBM Plex Mono" (Google Fonts), weight 400 — use ONLY for numbers/units so data reads as precise, not for full sentences

Import via @fontsource packages, not a CDN <link> tag, so it's bundled and works offline-cache-friendly:
  npm install @fontsource/fraunces @fontsource/public-sans @fontsource/ibm-plex-mono

Configure in tailwind.config.js under theme.extend.fontFamily:
  heading: ['Fraunces', 'serif']
  body: ['"Public Sans"', 'sans-serif']
  mono: ['"IBM Plex Mono"', 'monospace']

COLOR PALETTE (earthy, agricultural, NOT "eco-app bright green" and NOT purple/blue SaaS gradient):

  --color-cream: #F7F3EA        /* base background - warm off-white, not pure white */
  --color-soil-900: #3A2E22     /* darkest text/headings - warm dark brown, not pure black */
  --color-soil-700: #5C4A38     /* secondary text */
  --color-leaf-700: #3F5C3A     /* primary brand green - muted, deep, not bright */
  --color-leaf-500: #6B8C5F     /* interactive/accent green */
  --color-wheat-400: #D9A441    /* warm accent - sparingly, for highlights/badges only */
  --color-terracotta-500: #C1613C  /* alert/warning accent - warm, not corporate red */
  --color-sky-300: #A8C5D6     /* weather/water-related accents only */
  --color-border: #E3DACB       /* borders - warm, not cool gray */

Add these as CSS custom properties in a global stylesheet AND as Tailwind theme.extend.colors so both `bg-leaf-700` and `var(--color-leaf-700)` work.

Set the base body background to --color-cream, base text to --color-soil-900. Do not use pure white (#FFFFFF) or pure black (#000000) anywhere in the design.

Show me the diff before applying.
```

---

## STEP 2 — Anti-"AI Generic" Component Rules (Antigravity prompt)

```
Apply these component styling rules across the FarmChain frontend. These are deliberate constraints to avoid the "generic AI-generated SaaS" look:

FORBIDDEN patterns — do not use these anywhere:
- No glassmorphism (no backdrop-blur + translucent white panels)
- No gradient backgrounds on cards, buttons, or hero sections (solid colors only, from the palette in Step 1)
- No large rounded-full icon badges in colored circles as the default way to present features (this is the #1 "AI dashboard" tell)
- No drop shadows heavier than a subtle 1-2px offset — use border-color changes or background-color shifts for elevation instead of heavy box-shadow
- No stock "AI-powered ✨" badges, sparkle icons, or robot/circuit iconography anywhere
- No decorative charts with fake/placeholder data — if a chart has no real data yet, show an explicit empty state, never a plausible-looking fake graph
- Corner radius: use a small, consistent radius (6-8px) throughout, never the oversized 24px+ "bubble card" radius common in AI-generated templates

REQUIRED patterns instead:
- Cards: solid --color-cream or white background, 1px --color-border border, no shadow OR a single subtle shadow (0 1px 2px rgba(58,46,34,0.06))
- Buttons: solid fill (--color-leaf-700 primary, --color-soil-900 text on outline/secondary), no gradient, no glow on hover — just a slightly darker shade on hover
- Icons: use lucide-react, but sparingly and never inside a colored circle badge by default — icons sit inline with text at the same visual weight, not as decorative centerpieces
- Photography over illustration: wherever a section would typically get an AI-generated illustration or 3D render, use one of the real photos from Step 0 instead, treated with a subtle warm-toned overlay (--color-soil-900 at 10-15% opacity) for text legibility if needed, never a flat color overlay that looks like a filter preset
- Typography hierarchy should feel editorial (like a well-set print publication) rather than "dashboard" — generous line-height on body text (1.6+), tighter on headings, real visual hierarchy through size/weight contrast rather than color alone

Show me the diff before applying.
```

---

## STEP 3 — Landing Page Hero (Antigravity prompt, using your real images)

```
Build the FarmChain landing page hero section using the design tokens from Step 1 and component rules from Step 2.

Use the real photo at frontend/src/assets/images/hero-field-morning.jpg (or whichever filename you saved) as the hero background — NOT a generated or stock illustration. Apply a subtle warm gradient overlay ONLY at the bottom third of the image (from transparent to --color-soil-900 at 40% opacity) purely for text legibility of the heading placed there — this is a legibility technique, not a decorative gradient, so keep it subtle.

Headline in Fraunces, large (48-64px desktop, 32px mobile), --color-cream text (since it sits over the darkened part of the photo).
Subheading in Public Sans, --color-cream at 90% opacity.
Primary CTA button: solid --color-wheat-400 background, --color-soil-900 text — this is the one place a warm accent color as a solid fill works well against the photo.

Below the hero, add a "How it works" section using 3 of the candid working-shot photos from Step 0, each in a simple bordered card (per Step 2 rules) with a short caption — not icon-in-circle graphics, actual photos illustrating each step (Farm Profile → Recommendation → Market).

Show me the diff before applying.
```

---

## STEP 4 — Dashboard "Today" View (Antigravity prompt)

```
Build the farmer dashboard's main "Today" view per the hierarchy: critical action (if any) → weather snapshot → crop risk flag (if any) → next task → market snapshot → economics snapshot.

Use design tokens from Step 1, component rules from Step 2. Each section is a bordered card (not shadow-heavy), stacked vertically on mobile (this is the primary viewport — design mobile-first, desktop is a wider version of the same stack, not a different layout).

Numbers (prices, measurements, percentages) use the IBM Plex Mono font class to visually distinguish data from prose.

Empty states (e.g. no active crop plan yet): use one of the texture photos (soil-hand-closeup.jpg or similar) at reduced size with a short, plainly-worded prompt ("No active crop plan yet — start by adding your farm details") — not a generic empty-state illustration.

Do not add any card, badge, or element that isn't driven by real (or explicitly labeled "Demo data") content — if a data source isn't wired up yet, the card should say "Coming soon" in plain text rather than showing plausible-looking placeholder numbers.

Show me the diff before applying.
```

---

## Notes on keeping this "humanized" as you build more screens

- Every time you add a new screen, ask: "would a generic AI SaaS template produce this exact layout?" If yes, that's the signal to change something — usually by swapping an icon-badge for a real photo, or a gradient for a solid color from the palette.
- Reuse the same 8-10 real photos across the app deliberately (hero, empty states, section breaks) rather than hunting for a new photo per screen — a small, consistent, recognizable set of images reads as more intentional/human-curated than a different stock photo everywhere.
- Keep the Fraunces/Public Sans/Plex Mono combination locked across the entire app — font-mixing per section is another common AI-generated tell.
