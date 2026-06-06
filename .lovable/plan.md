## Goal
1. Replace the cheap-looking "Currently booking Q1 2026" pill in the hero with something more refined.
2. Sharpen typography sitewide and tighten the design system.
3. Do not touch `/rgc` (any file under `src/components/pitch/**`, `src/pages/RGC.tsx`, or `src/pages/rgc.css`).

## 1. Hero availability indicator — replace the pill

Current: rounded-full chip with emerald border + tint, reading "Currently booking Q1 2026 · 2 engagements open". Looks like a generic SaaS badge.

Replace with an **inline availability line** — no pill, no chip:

```
●  Booking Q1 2026   —   2 engagements open
```

- A small pulsing emerald dot (10px) with a soft halo (not a chip background).
- Type: `font-display`, `text-xs`, `uppercase`, `tracking-[0.22em]`, `text-mute`.
- "Q1 2026" rendered in `text-text` (stronger).
- A thin `h-px w-8 bg-line` rule between the label and the count, instead of a middot — more editorial.
- No border, no background fill. Sits flush left above the headline.

This reads as a status line on a serious studio site rather than a marketing badge.

## 2. Typography sharpening

Three coordinated changes — small but visible across every page.

**a. Font loading**
- Add `Outfit` weights `300, 400, 500, 600, 700` and `Inter` weights `400, 500, 600, 700` (currently only 400/500/600). Display headlines lean on 500/600 contrast; body needs 400 + 600 for proper emphasis.
- Add `display=swap` already present — keep.
- Add `font-feature-settings: "ss01", "cv11", "calt"` to `html` for Inter's stylistic alternates (sharper `a`, `g`, single-storey numerals) — this is the single biggest "sharpness" win.
- Add `text-rendering: optimizeLegibility` (already set) and add `-webkit-font-smoothing: antialiased` with `font-synthesis: none` so we never get faux-bold.

**b. Heading scale + tracking**
- Tighten `h1` letter-spacing from `-0.025em` → `-0.028em` and bump font-weight to `600` consistently (some pages render at 500 via shadcn defaults).
- `h2` letter-spacing `-0.02em` → `-0.022em`.
- Add `text-wrap: balance` to `h1, h2` for better line breaks on hero/section headers.
- Body line-height stays, but bump min size from 14px → 15px so small viewports stop looking thin.

**c. Numerals**
- Add `font-variant-numeric: tabular-nums` to `.numeral-display`, the results strip metric numbers, and the chapter mark `01 /` style. Stops digits from jittering on hover/animation.

## 3. Design system cleanup

Tighten without changing colors or layout structure:

- **Eyebrow** — currently emerald + 600 weight + 0.16em tracking. Drop weight to 500, tracking to 0.18em → more editorial, less shouty. Keep emerald color.
- **Pills** — `.pill-base` padding `0.25rem 0.75rem` is cramped at the new font weight. Bump to `0.3125rem 0.875rem` and add `font-feature-settings: "tnum"`.
- **Buttons** — `.btn-base` font-weight 500 is fine, but add `letter-spacing: -0.005em` so labels feel set, not loose.
- **Lede** — current `color: hsl(var(--mute))`. Switch to `hsl(var(--text) / 0.78)` for a touch more presence (mute is too gray under Outfit display headlines).
- **Section headers** — `.section-header` currently `max-width: 65ch`. Add `text-wrap: pretty` so orphan words drop cleanly.
- **Token consolidation** — remove the unused `--accent-alt` references in components if any, and document the locked color ladder (`--accent-faint/soft/strong`) as the only allowed accent opacity values in a short comment block at the top of `index.css`. No new tokens, just enforcing what exists.

## Files touched

- `src/pages/Home.tsx` — replace availability pill markup (lines ~115–125) with the inline availability line. Remove the `availability.chip` string usage.
- `index.html` — extend Google Fonts URL with extra weights.
- `src/index.css` — font-feature-settings on `html`, heading tracking, body min-size, `text-wrap` rules, eyebrow/pill/button/lede refinements, tabular-nums on numeral utilities.

**Not touched:** `/rgc` route and any file under `src/components/pitch/**`, `src/pages/RGC.tsx`, `src/pages/rgc.css`. The RGC palette + Söhne-style typography stays isolated under `.rgc-scope`.

## Out of scope
- No changes to nav, footer, hero layout/copy, services, results strip content, or routing.
- No new components, no new dependencies.
- No color palette changes.
