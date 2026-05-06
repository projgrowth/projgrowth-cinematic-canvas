
## Root cause of the visual chaos

I found the smoking gun. Look at `tailwind.config.ts` lines 67–80:

```ts
spacing: {
  '2xs': 'var(--space-2xs)',
  '2': 'var(--space-2)',   // clamp(16px → 24px)
  '3': 'var(--space-3)',   // clamp(24px → 36px)
  '4': 'var(--space-4)',   // clamp(32px → 48px)
  '6': 'var(--space-6)',   // clamp(48px → 80px)  ← !!!
  '8': 'var(--space-8)',   // clamp(64px → 128px) ← !!!
}
```

Tailwind's default scale has `p-6 = 1.5rem (24px)`, `gap-8 = 2rem (32px)`, `mb-3 = 0.75rem (12px)`. **We overrode those numeric keys to point at our fluid section-scale tokens.** That means every single `p-6`, `mb-8`, `gap-4`, `mb-3` written across the codebase is rendering at 2–4× the intended size.

Concrete example from your screenshot (Home services row):
- `<div className="stack gap-6 md:gap-8">` — author wanted 24px / 32px gap. Actually rendering **48–80px / 64–128px**.
- `mb-3` on the H2 — author wanted 12px. Actually **24–36px**.
- `p-6 md:p-8` on cards — author wanted 24/32px padding. Actually **48–80px / 64–128px** padding.

That is why the cards look like they're floating in voids, the section header has a giant gap below it, and the right column starts so far down the page. Every page is affected; you just notice it most where there are dense card grids.

Other systemic interference I confirmed:

1. **Pill/badge styles invented 6 times** with different paddings, opacities, borders. Locations: `Blog.tsx:139`, `BlogPost.tsx:253`, `CaseStudyDetail.tsx:102`, `BentoCaseStudyCard.tsx:131`, `AdminLeads.tsx:202–203`, `Blog.tsx:93` (filter chips). `src/components/ui/badge.tsx` exists but nobody uses it.
2. **Three competing radii**: `rounded-md` (12px from `--radius-md`), `rounded-lg` (24px from `--radius-lg`), `rounded-2xl`/`rounded-xl` (Tailwind defaults — 16px/12px) used interchangeably. Cards on Home use `rounded-lg`, contact tiles use `rounded-lg` but at totally different sizes than CaseStudyDetail.
3. **Two duration vocabularies**: `duration-sm/md` (custom) and `duration-200/300/500` (Tailwind defaults) coexist in the same files. Same for easing — `ease-smooth` vs framer-motion bezier vs default `ease`.
4. **BackToTop arrow** is floating over content in your screenshot (bottom-right). It's appearing too eagerly and overlapping cards.
5. **Container double-payload**: `tailwind.config.ts` defines a `container` plugin (lines 8–25) we don't use, but its presence pollutes IDE autocomplete and risks a future page using `container` instead of `container-site` and getting different padding.
6. **Hero CTA on Home** uses `gap-4` between buttons → renders at 32–48px instead of the expected 16px, making the two CTAs feel disconnected.

---

## The fix — three surgical changes

### 1. Untangle the spacing scale (the big one)

In `tailwind.config.ts`, **remove the numeric overrides** (`'2'`–`'8'`, `'3xl'`, `'4xl'`) and only expose the fluid tokens under unambiguous semantic names:

```ts
spacing: {
  // Restore Tailwind defaults for p-1..p-8, gap-1..gap-8, mb-1..mb-8, etc.
  // Fluid section/layout tokens — accessed via dedicated names only:
  'section-sm': 'var(--space-5)',
  'section':    'var(--space-6)',
  'section-lg': 'var(--space-8)',
  'gutter':     'var(--gutter-fluid)',
  'cards':      'var(--gap-cards)',
  'header':     'var(--header-mb)',
}
```

That single change restores `p-6 = 24px`, `mb-3 = 12px`, `gap-8 = 32px` everywhere — instantly fixing the "floating in a void" look without touching a single page file. The fluid tokens stay reachable as `gap-cards`, `mb-header`, `py-section`, etc., which is how `index.css` already uses them via the `.section` recipes.

### 2. One pill, one badge, one chip

Add three locked recipes to `index.css`:

```css
.pill-accent  { /* px-3 py-1 text-xs uppercase tracking-wider accent on tint border accent/20 rounded-full */ }
.pill-neutral { /* same metrics, surface bg, mute text, line border */ }
.chip-filter  { /* px-4 py-2 text-sm rounded-full, active=accent fill, idle=line border */ }
```

Then sweep the 6 hand-rolled pill instances to use these classes. Result: every category tag, every "Featured" badge, every engagement-tier label is pixel-identical across pages.

### 3. Lock radius and motion vocabularies

- In `index.css` add `--radius-card: var(--radius-lg)` and update the `.surface-card` recipe (already added in the previous pass) to use it. Standardize all card-like components on `rounded-card` (add as a Tailwind alias).
- Sweep all `duration-200|300|500` → `duration-sm|md` (custom tokens) and `ease-out|in-out` → `ease-smooth` via `sed` so motion timing reads as one language.
- Remove the unused `container` plugin block from `tailwind.config.ts` to prevent regression.

### Per-page container/spacing rules (codified)

After the spacing fix, the rules every page already sort-of follows become enforceable:

| Surface | Token / class | Value |
|---|---|---|
| Page outer | `container-site` | max 1320px / 92vw, fluid gutter |
| Section vertical rhythm | `.section` / `.section-sm` / `.section-lg` | fluid clamps |
| Hero | `.section-hero` | min(86vh, 880px) |
| Section header bottom margin | `mb-header` | clamp(32→64px) |
| Card grid gap | `gap-cards` | clamp(24→40px) |
| Card padding | `p-6 md:p-8` | **24/32px** (after fix) |
| Card radius | `rounded-card` | 24px |
| Pills | `.pill-accent` / `.pill-neutral` | one definition |
| Filter chips | `.chip-filter` | one definition |
| Buttons | `<Button variant=…>` only | no inline anchors |
| Heading sizes | global clamp on `h1/h2/h3` | no `text-Xxl` overrides |
| Motion | `duration-sm|md`, `ease-smooth` | the only allowed values |

### Misc cleanup in same pass
- BackToTop: add `bottom-8 right-8` and only show after 600px scroll (currently appears too early and overlaps content).
- Remove dead `tailwind.config` `container` plugin block.
- Audit `Home.tsx` hero CTA gap `gap-4` → after spacing fix this becomes 16px naturally.

---

## Files touched (estimated 4–6 calls)

1. `tailwind.config.ts` — remove numeric spacing overrides, add semantic names, remove container block, add `rounded-card`.
2. `src/index.css` — add `.pill-accent`, `.pill-neutral`, `.chip-filter` recipes; add `--radius-card`.
3. One `sed` sweep — replace 6 hand-rolled pills with `.pill-accent`/`.pill-neutral`; normalize `duration-200|300` → `duration-sm|md`.
4. `src/components/BackToTop.tsx` — adjust offset + threshold.
5. Spot-check & manual fix: the ~20 places that currently *intentionally* use `p-6` / `gap-8` expecting fluid behavior (mostly the new `Section` primitive and `index.css` itself — already use the CSS vars directly, so they're unaffected).

## Risk

The spacing change will cause a brief "things look tighter" moment site-wide — but that's the correct rendering authors intended when they wrote `p-6`. The pages with sections that actually need the giant fluid padding already use `.section` / `--space-*` vars directly in CSS, so they don't regress.

## Outcome

One spacing scale (Tailwind defaults), one fluid section scale (CSS tokens with semantic names), one pill, one badge, one chip, one card radius, one motion vocabulary. The "everything looks like it's stranded on a giant black void" effect goes away because card padding and section gaps stop being 3× larger than written.
