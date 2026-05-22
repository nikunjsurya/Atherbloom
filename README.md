# Atherbloom

> *Venture Past Our Sky* — a cinematic, single-page landing site for a fictional deep-space exploration brand.

Atherbloom is a self-contained marketing landing page built around a still hero photograph brought to life with layered, GPU-friendly CSS animations: drifting cherry-blossom petals, swaying blossom washes, wandering mist, a breathing sun glow, and floating dust. A frosted-glass navbar and headline sit on top, with a live **Tweaks** panel for editing copy and atmosphere in the browser.

## Preview

Open [`Atherbloom.html`](Atherbloom.html) directly in a browser — there is no build step.

```
# from the project root
python -m http.server 8000
# then visit http://localhost:8000/Atherbloom.html
```

> A local server is recommended over `file://` so the browser can fetch `app.jsx` and `tweaks-panel.jsx` and load `assets/hero.png`.

## How it works

The page is a no-bundler React app. Everything is loaded straight from CDNs and compiled in the browser:

- **React 18** + **ReactDOM** (UMD builds from unpkg)
- **Babel Standalone** to transpile the JSX `<script type="text/babel">` tags at runtime
- **Tailwind CSS** via the CDN `<script>`, with a small inline config (Cormorant Garamond + Manrope fonts)
- Hand-written CSS in [`Atherbloom.html`](Atherbloom.html) drives all the animation layers

## Project structure

| File / folder | Purpose |
| --- | --- |
| [`Atherbloom.html`](Atherbloom.html) | Entry point. Tailwind config, all animation CSS, and the CDN script tags. |
| [`app.jsx`](app.jsx) | The landing page itself — `Navbar`, `Hero`, animated `Petals`, `PartnerRow`, and the `App` root. |
| [`tweaks-panel.jsx`](tweaks-panel.jsx) | Reusable Tweaks panel shell + form controls (`TweakText`, `TweakSelect`, `TweakSlider`, `TweakToggle`, …) and the `useTweaks` hook. |
| [`assets/`](assets/) | Static assets, including the hero background (`hero.png`). |
| [`uploads/`](uploads/) | Source/working images. |

## Editing content

Default copy and look live in the `TWEAK_DEFAULTS` block at the top of [`app.jsx`](app.jsx):

```js
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headlineLine1": "Venture Past Our Sky",
  "headlineLine2": "Across the Universe",
  "subhead": "Discover the universe in ways once unimaginable. ...",
  "primaryCta": "Start Your Voyage",
  "secondaryCta": "View Liftoff",
  "brand": "Atherbloom",
  "tint": "warm",        // warm | cool | neutral | twilight
  "vignette": 55,         // 0–100
  "showPartners": true,
  "showScrollCue": true
}/*EDITMODE-END*/;
```

You can also adjust these live in the browser via the **Tweaks** panel — copy, hero tint, vignette strength, and section toggles all update in place.

## Tech notes

- **No build / no install.** It's plain HTML + JSX served statically.
- The CDN React and Babel builds are development builds — fine for prototyping, but for production you'd want to pre-compile the JSX and pin/minify dependencies.
- Animations use `transform`/`opacity` with `will-change` to stay smooth.
