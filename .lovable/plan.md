
## What a senior designer/engineer would flag

After auditing `src/index.css`, all 14 pages, and 35+ components, the foundation is genuinely solid (fluid type scale, section primitives, semantic tokens). The issues that read as "almost-premium" rather than premium are:

1. **Heading scale is inconsistent.** The global clamp gives every `h2`/`h3` a tasteful size, but ~20 components still hard-override with `text-2xl md:text-3xl`, `text-4xl md:text-5xl`, `text-5xl md:text-8xl`. CaseStudyCard, BentoCaseStudyCard, FeaturedWorkSlider, TestimonialsCarousel, ProcessTimeline, CaseStudySheet, ErrorBoundary, two service pages — they all fight the design system.
2. **Two competing card styles.** `SurfaceCard` exists, but Home/About/Services still hand-roll `bg-surface rounded-lg border border-line p-6 md:p-8 hover:border-accent/30`. Cards have ~3 different border-radii (`rounded-md`, `rounded-lg`, `rounded-2xl`) and 4 different hover treatments across the site.
3. **Hero CTA pattern is duplicated raw.** Home, Services, Contact, service sub-pages each inline the same `h-12 px-8 border border-accent ...` link instead of using the new `<Button variant="cta">`. Visual drift is guaranteed.
4. **Atmospheric glow is copy-pasted ~6 times** with slightly different stops/opacity. It should be one `<AmbientGlow variant="..." />` so the lighting reads consistent across pages.
5. **Discovery.tsx is 1,113 lines.** It's a single monolithic file holding state machine, copy, mockup composition, PDF trigger, and UI for every step. Hard to evolve. Needs a light split, not a rewrite.
6. **MultiStepContactForm.tsx is 582 lines** with inline validation, step UI, and submit logic mixed together. Same problem, smaller scope.
7. **Spacing micro-inconsistencies.** A handful of pages still use `mb-12`, `mb-16`, `mt-12`, `gap-y-10` instead of the `--header-mb`/`--gap-cards` tokens — small but visible at 1440px+.
8. **Color polish.** Accent is used at 5+ opacities (`/5`, `/10`, `/20`, `/30`, `/40`) ad-hoc. A senior would lock to 3 (`/10` surface tint, `/20` border, `/30` hover-border) and remove the rest.
9. **Borders read flat.** `--line` at `240 5% 16%` against `--surface` at `240 5% 10%` is only 6% delta. On a 4K display the cards look like floating rectangles with no edge. A 1px inner highlight (`box-shadow: inset 0 1px 0 hsl(var(--text)/0.04)`) would add the "expensive" glass quality the rest of the site is reaching for.
10. **No real motion language.** Components mix `duration-200`, `duration-300`, `duration-sm`, `duration-md`, custom `framer-motion` easings. Should be one easing curve, three durations, used everywhere.

Given a ~10-call budget, I'm proposing three surgical passes, not a refactor.

---

## Pass 1 — Visual polish (1 call, global)

Edit `src/index.css` only:

- Add `--line` lift: bump from `240 5% 16%` to `240 5% 18%` and add a global `.surface-card` recipe with the 1px inner highlight + standardized hover state (border to accent/25, subtle accent glow).
- Tighten accent opacity scale: define `--accent-tint`, `--accent-border`, `--accent-border-hover` CSS vars so future code references one token.
- Lock motion: redefine `--duration-sm`/`--duration-md` values, ensure `--ease` is the single curve. Add `.hover-lift` utility used by all interactive cards.
- Standardize radii usage by aliasing `.card { border-radius: var(--radius-lg); }`.
- Fix the heading override problem at the source: add `.font-display` resets so a heading inside `.font-display` inherits the global clamp instead of being shrunk by sibling text-* classes (use `:where()` to keep specificity low, then we strip the overrides in Pass 2).

## Pass 2 — Strip overrides + adopt primitives (1 call, sed + targeted edits)

- One `sed` sweep across `src/components` and `src/pages` to remove the 20 remaining `text-2xl md:text-3xl`, `text-3xl md:text-4xl`, `text-4xl md:text-5xl`, `text-5xl md:text-8xl`, `text-6xl` overrides from elements that already carry `font-display` or are `<h1>`–`<h3>`. (Decorative giant numerals on CaseStudyCard/BentoCard keep their size — those are graphic, not text.)
- Replace the inline hero CTA pattern in `Home.tsx`, `Services.tsx`, `Contact.tsx`, and the four service pages with `<Button variant="cta">`. ~7 small edits.
- Convert remaining hand-rolled card divs in `Home.tsx` (services + differentiators), `About.tsx`, `Services.tsx` to `<SurfaceCard>`.
- Replace ad-hoc `mb-12`/`mb-16`/`gap-y-10` instances with `section-header` / `gap-cards` tokens.

## Pass 3 — Structural tidy (1 call)

- Extract one tiny `<AmbientGlow />` component and swap the 6 inline radial-gradient `<div>`s for it (Home hero, About, Services, Contact, Work, Discovery shell).
- Split `Discovery.tsx` minimally: pull the step copy/data array into `src/pages/discovery/steps.ts` and the success/thanks screen into `src/pages/discovery/ThanksScreen.tsx`. Don't touch state logic. Drops the file from 1,113 to ~500 lines without behavior change.

Skipping in this budget (call out for a future sweep): MultiStepContactForm split, NavigationGuide consolidation, removing the lingering `Portfolio.tsx`/`NavigationGuide.tsx`/`ScrollProgress.tsx` deprecated components flagged in `mem://design/minimalist-refinement-and-noise-reduction`.

---

## Technical notes

- Token additions to `index.css`:
  ```css
  --accent-tint: hsl(var(--accent) / 0.08);
  --accent-border: hsl(var(--accent) / 0.20);
  --accent-border-hover: hsl(var(--accent) / 0.35);
  --inner-highlight: inset 0 1px 0 hsl(var(--text) / 0.04);
  ```
- `.surface-card` recipe centralizes: `bg-surface`, `border border-line`, `rounded-[var(--radius-lg)]`, `shadow-[var(--inner-highlight)]`, hover transitions to accent border + soft glow.
- `:where(h1,h2,h3).font-display` reset uses `:where()` for 0 specificity so we don't have to ! override anything.
- AmbientGlow takes `position` (`hero` | `top-right` | `center`) and `intensity` props mapping to the existing gradient stops.

## Files touched (estimated)

- Pass 1: `src/index.css`
- Pass 2: ~12 files via sed + ~8 small manual edits (Home, About, Services, Contact, 4 service pages)
- Pass 3: `src/components/AmbientGlow.tsx` (new), `src/pages/discovery/steps.ts` (new), `src/pages/discovery/ThanksScreen.tsx` (new), `src/pages/Discovery.tsx` (slim), 6 pages updated to use AmbientGlow

## Outcome

Cards feel embossed and consistent, headings finally trust the fluid scale, accent color reads intentional rather than scattered, motion is unified, and Discovery becomes maintainable — all within the remaining token budget, with no behavioral regressions.
