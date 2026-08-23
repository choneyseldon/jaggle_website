# NDI NgoTag Studio — redesign workspace

The Bhutan NDI design system from `DESIGN.md`, ported to a stack-independent
foundation that the Studio's redesigned pages are built on.

```
ndi-studio/
  css/tokens.css       §1–§5 — colour, type, space, radii/elevation, motion
  css/base.css         type scale, layout containers, breakpoints, browser theming
  css/ndi-effects.css  §6 components + §7 signature effects
  js/ndi-runtime.js    the three effects that need JS, one listener each
  pages/               one redesigned Studio page per screenshot
```

Load order: `tokens.css` → `base.css` → `ndi-effects.css`, then
`ndi-runtime.js` deferred.

## What carries the brand

Restraint. A near-black cool ground, **one** mint accent, hairline mint
borders, glass surfaces that sample the page behind them. Mint appearing
anywhere means *this is live, verified, or actionable* — so it is never
spent on decoration.

Per-page checklist, from §8:

- Eyebrow → headline → lead, in that order, on every section
- Exactly one mint-gradient phrase per headline, never two
- Hairlines and negative space before filled containers
- 16px cards / 12px controls / 999px pills — no other radii
- Drawn icons at one stroke weight; no emoji standing in for an icon
- 44px touch targets, and hover displacement neutralised on coarse pointers
- Dark throughout; no section inverts

## Fonts

Host Grotesk (display), Inter (body), DM Mono (mono). The upstream token
file names Space Grotesk and JetBrains Mono; the shipping site overrode
both, so these three are correct.
