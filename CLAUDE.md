# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```
npm run dev       # Vite dev server (http://localhost:5173, HMR)
npm run build     # production build -> dist/index.html (single self-contained file)
npm run preview   # serve the production build locally
npm run lint      # oxlint (rules: react/rules-of-hooks, react/only-export-components)
```

There is no test suite configured in this project.

## Architecture

React 19 + Vite SPA, single page (`src/App.jsx`), no router, no backend/API — all content
(city counts, donation base amount, credits, event schedule) is hardcoded in source.

**Single-file build.** `vite.config.js` uses `vite-plugin-singlefile` with `cssCodeSplit: false`,
so `npm run build` inlines all JS and CSS into one `dist/index.html` with no separate asset
files. This is what lets the site be deployed as-is to GitHub Pages *and* published directly as
a Claude Artifact (extract the `<style>`/`<script>` from `dist/index.html`) — don't reintroduce
code-splitting or external asset references without checking both deployment paths still work.

**Deployment.** `.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages via
`actions/deploy-pages` on every push to `main`/`master`. Live at
https://lucassrmt24.github.io/la-france-applaudit/. GitHub Pages source must be set to
"GitHub Actions" in the repo settings (already done) for the workflow to succeed.

**Hover-overlay system.** Three overlays share one pattern (see `App.jsx`):
- The full-screen intro splash (`CountdownBanner` with `intro`), dismissed by clicking anywhere.
- The Bordeaux map-pin hover banner (`CountdownBanner` with `intro location="Bordeaux"`).
- The "Sponsors" nav-link hover banner (`SponsorsBanner`).

Hover-triggered overlays use the `useHoverDelay` hook (debounced show/hide, ~150ms) and a
two-layer CSS structure: the full-screen `.hover-overlay` backdrop has `pointer-events: none`,
while the inner `.hover-zone` wrapping the actual banner has `pointer-events: auto`. This is
required — without it, the backdrop rendering on top of the trigger element steals the mouse and
the banner closes itself the instant it appears. Any new hover-triggered banner should follow the
same two-layer structure, and any element meant to trigger one needs real pointer events (watch
for descendants with `pointer-events: none`, e.g. `.pin-label`, which otherwise silently eat hovers).

**Countdown.** `useCountdown` computes time remaining until the next Sunday 20:00 (hardcoded target,
resets automatically once passed). `CountdownBanner` renders it and is reused across all three
overlays above via props (`intro`, `location`, `hint`, `applaudMessage`) rather than being
duplicated per use site.

**Live donation counter.** `useLiveDonations` does not call a backend — it deterministically
simulates donations using a seeded PRNG (mulberry32, seeded from the current hour) that
pre-generates a list of donation events (amount + timestamp offset) for the hour, then advances
a pointer through them as real time passes. This means the counter shows the same sequence of
values for every visitor within a given hour and resets to the base amount at the top of each
hour — it's intentional, not a bug, and any change to amounts/timing should preserve that
determinism (don't switch to `Math.random()` per render).

**AmountTicker** (`src/components/AmountTicker.jsx`) is a generic odometer-style rolling-digit
display driven purely by the `text` prop (digits animate, other characters render statically). It
is reused for both the donation counter and every countdown digit — extend it rather than writing
a second digit-rolling implementation.

**FranceMap.** The France outline is real vector path data (traced via potrace, sourced from the
`mapsicon` project), embedded as raw SVG path strings with a `translate/scale` transform — treat
those path constants as opaque. City pins are positioned with hand-calibrated percentage `x`/`y`
coordinates (derived from real lon/lat, see conversation history if these ever need recalculating)
rather than a projection library. The `eventCity` prop (currently `"Bordeaux"`) picks which pin
gets the gold highlight styling and fires the hover callback into `App.jsx`.
