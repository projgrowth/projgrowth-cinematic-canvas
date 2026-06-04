## Context

The `/rgc` pitch page is a long-scroll editorial built from `src/pages/RGC.tsx` + seven sections under `src/components/pitch/sections/*` and a 1,865-line scoped stylesheet at `src/pages/rgc.css`. It already has its own design system (Pirata One blackletter, Lora body, Space Mono meta, bone/oxblood palette, 12-col `pitch-grid`).

The live site currently shows a clear regression in the Hero — the prose paragraphs render **on top of** the headline "A Letter, Not a Résumé." because the Pirata One blackletter has unusually long descenders and the spacing override that compensates wasn't on production (the build was failing on a merge-conflict in `rgc.css` until this session). Beyond that, the page has accumulated small inconsistencies in spacing, type scale, and mobile layout that are worth one focused cleanup pass.

## Goals

- Fix obvious layout bugs (hero overlap first).
- Tighten rhythm: consistent section spacing, headline → body gaps, and rule placement.
- Mobile pass: type scale, padding, GhostNumber sizing, route-pill wrap behavior.
- Keep the editorial voice — no restyle, no new components, no palette changes.

## What I'd change

### 1. Hero overlap (highest priority)

`src/components/pitch/sections/Hero.tsx` + `src/pages/rgc.css` (the `[data-section="hero"] .body-prose` rule).

- Replace the current single `margin-top: clamp(72px, 10vw, 140px) !important` override with a stronger, descender-aware spacer that scales with the actual headline font-size (the headline uses `clamp(56px, 11vw, 120px)` so descender overhang scales with viewport).
- Move spacing off `BodyProse` (which today carries an inline `marginTop` that ships everywhere) and onto a hero-only wrapper, so the rest of the page keeps its existing `--space-headline-body` rhythm.
- Add `line-height: 1.05` + a small bottom padding on the headline block so the underline beneath "Résumé" no longer collides with the next block on narrow viewports.
- Reduce `.type-display-xl` lower clamp from 56px → 44px on <380px screens so the headline stops forcing 2 lines per word on small phones.

### 2. Page-wide spacing pass

`src/pages/rgc.css` only — no JSX changes.

- Consolidate the three near-duplicate stacking utilities (`section-stack-sm/md/lg`, `artifact-stack`) so adjacent sections share predictable rhythm. Today some sections double-stack and others don't.
- Standardize `--space-headline-body` and the `.section-intro` top-margin so every chapter has the same eyebrow → H2 → intro cadence.
- Make `.hero-route` and similar bordered rails use `--hairline` (not `--hairline-soft`) consistently — right now some are barely visible on bone.

### 3. GhostNumber + chapter marks

- Cap `GhostNumber` font-size on mobile (currently it bleeds past the viewport edge and creates phantom horizontal scroll on some sections).
- Pin it inside the section (not the page) so it stops drifting on long sections.

### 4. Mobile-only refinements (`@media (max-width: 640px)`)

- Tighten container padding from 1.5rem → 1.25rem to give body prose more line length.
- Reduce eyebrow letter-spacing 0.28em → 0.18em on mobile (currently wraps awkwardly).
- Stack the hero footer (`DAN RODRIGUEZ · …` + handwritten line) with tighter gap.
- Force `.hero-route` arrows to wrap as a single column once <420px so the pill row stops overflowing.

### 5. Desktop refinements

- Raise `--content-width` from 720 → 760px so Lora at 17px lands closer to a 60–66ch ideal measure on 1440+ screens.
- Pull GhostNumber tighter to the right gutter (currently the 00/04 marks sit too far into the safe area on 1920w).
- Add a faint top hairline under the meta-label row of each section so chapter starts feel intentional.

### 6. Cleanup

- Remove the dead `:root` block left over from the merge conflict (the `.rgc-scope` block is the source of truth).
- Audit `!important` overrides — keep only the hero one, drop the rest in favor of specificity.

## What I would NOT touch

- Copy, tone, structure, or section order.
- The palette, fonts, or any imagery.
- Animation primitives (`HeroArrival`, `Reveal`) — they work; only the spacing around them is wrong.
- Any non-RGC page or shared component.

## Verification

After build:
1. Capture `/rgc` at 1920w, 1440w, 768w, and 390w.
2. Confirm hero headline and first body paragraph no longer collide on any width.
3. Scroll the full page on each viewport to check rhythm and confirm no horizontal scroll from GhostNumbers.

## Open question

Want me to also touch the **section transitions** (e.g. add a subtle hairline or page-break ornament between chapters), or strictly leave structure alone and only fix bugs + tighten rhythm? My default is the conservative path — bugs and rhythm only.
