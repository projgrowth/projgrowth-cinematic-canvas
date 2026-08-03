# Site-Wide Polish: One Design System, Every Page

Audit of every route, component, and the token layer. `/rgc` and `/pitch` are excluded from all changes.

## What the audit found

The token layer is in good shape (HSL color ladder, fluid spacing scale, radii, and motion durations are all centralized in `index.css`). The drift is at the *page* level: newer pages use the shared editorial shells, older ones don't.

**Pages already on the shared system:** Home, Work, Services, About, Contact, Blog (PageHero / SectionChapter / Section / GlobalCTA).

**Pages that bypass it:**

| Page | Problem |
|---|---|
| `/work/:slug` (CaseStudyDetail) | Bespoke hero with its own parallax scroll math, no PageHero, no breadcrumbs, hand-rolled chapter marks |
| `/blog/:slug` (BlogPost) | No PageHero, no Section wrapper; prose headings hardcode `text-2xl md:text-3xl` instead of the display scale |
| `/privacy`, `/terms` | Bare `Section` plus a one-off "Back to Home" link instead of a page hero; Privacy still carries a PLACEHOLDER CONTENT disclaimer in the file |
| `/404` | Fully bespoke: icon-in-a-circle badge, raw `text-7xl` / `text-2xl` / `text-lg` sizes, no shell |

**Other findings:**
- `Breadcrumbs` renders on only 2 of 12 public routes, so breadcrumb structured data is inconsistent site-wide.
- `MultiStepContactForm` repeats the same `text-2xl md:text-3xl font-display` step heading five times inline.
- `CardTitle` hardcodes `text-2xl`, competing with the global `h3` rule.
- `AnimatedCounter.tsx` is orphaned (zero imports) — dead code.
- Motion is inconsistent: some pages use `ScrollReveal`, others import framer-motion directly with ad-hoc variants.
- Heading drift: 11 uses of `text-3xl` sit alongside the global `h2`/`h3` rules, so identical-looking headings come from two different sources.

## The plan

### 1. Bring the four stragglers onto the shell
- **CaseStudyDetail**: swap the bespoke hero for `PageHero` (chapter mark, title, lede, status row); keep the parallax as an opt-in prop on the hero instead of page-local scroll math. Wrap body sections in `Section`.
- **BlogPost**: adopt `PageHero` for the article header, `Section` for body and related blocks, and route prose headings through the global `h2`/`h3` scale.
- **Privacy / Terms**: `PageHero` header, `prose-measure` body, breadcrumbs in place of the one-off back link. Remove the PLACEHOLDER comment so the legal copy isn't shipped labeled as filler.
- **NotFound**: rebuild on `Section` + `PageHero` using the numeral treatment already used for chapter marks, and the standard `btn-solid` / `btn-outline-cta` pair.

### 2. Breadcrumbs everywhere
Move `Breadcrumbs` into `Layout` so every route except Home renders them, with a `hideBreadcrumbs` escape hatch. Breadcrumb structured data becomes uniform and the per-page wiring disappears.

### 3. Collapse the remaining typography drift
- Remove `text-2xl` from `CardTitle` and let the global `h3` rule own it.
- Add one `step-heading` utility for the contact form's five repeated step titles.
- Replace page-level `text-3xl` overrides with `h2`/`h3` plus the existing `section-header` block, giving the display scale a single source of truth.

### 4. Unify motion
Standardize on `ScrollReveal` for enter animations across the pages in scope. Keep direct framer-motion only where the effect is genuinely custom (page transitions, hero parallax, timeline draw), all driven by the existing `--duration-*` and `--ease` tokens.

### 5. Cleanup
Delete the orphaned `AnimatedCounter.tsx`. Confirm `check-tokens.mjs` stays clean and no hardcoded colors or radii are introduced.

## Technical notes

- `PageHero` gains two optional props: `parallax?: boolean` and `media?: ReactNode`, so CaseStudyDetail and BlogPost can adopt it without losing their visuals.
- `Layout` gains `hideBreadcrumbs?: boolean`; Home passes it.
- No token values change — this pass routes every page through tokens that already exist.
- No backend or SEO metadata changes. Titles, descriptions, canonicals, and existing JSON-LD stay as-is; only breadcrumb schema coverage expands.
- `/rgc`, `/pitch`, `/discovery`, and `/admin/*` are untouched.