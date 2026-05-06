
# Site-wide Visual & Responsive Cleanup Plan

## Audit findings

After reading `index.css`, `tailwind.config.ts`, `Home.tsx`, and scanning every page/component, the system is *almost* there but inconsistent in practice. The fluid tokens exist — they just aren't being used.

**Issues found**

1. **Token bypass.** Pages hardcode `py-16 md:py-24 lg:py-32`, `mb-16`, `gap-8`, `px-8 py-4`, `mb-12`, etc., instead of the fluid `--space-*` / `--section-py-*` tokens that already exist in `index.css`. This is why the site feels different at every breakpoint — every page invented its own scale.
2. **Heading scales duplicated 25+ times.** Variants like `text-3xl md:text-4xl lg:text-7xl`, `text-4xl md:text-6xl lg:text-8xl`, `text-5xl lg:text-7xl` are scattered across pages. Some H1s jump from 32→72→128 px (`text-4xl md:text-6xl lg:text-8xl`) which feels jarring on mid-size laptops (1024–1280). The base `h1`/`h2`/`h3` clamps are already defined but pages override them.
3. **Button styles re-implemented inline** in nearly every page (Home, Contact, Services, Work, CaseStudyDetail) with slightly different padding (`px-8 py-4` vs `px-6 py-3`) and hover behaviors. There's no shared `<Button>` primitive being used for primary/secondary CTAs even though shadcn `button` exists.
4. **Card styling repeated.** `p-6 bg-surface rounded-lg border border-line` and `p-8 bg-surface rounded-lg border border-line` are duplicated in Home, Services, About, Contact, Privacy with subtle variations.
5. **Grid column counts inconsistent.** Some sections use `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`, others `grid grid-cols-1 md:grid-cols-2 gap-8`, others the `.grid-12` system. No rule for when to use which.
6. **Container too narrow on ultra-wide.** `--container-max: min(1200px, 90vw)` caps content at 1200 except above 1800 px. Between 1400–1800 px the site looks small and floaty.
7. **Hero min-heights** (`min-h-[80vh] lg:min-h-[90vh]`) cause large empty areas on short laptops (e.g., 1280×720) — content sits awkwardly low.
8. **Section rhythm.** Long pages use `py-24` for every section, no variation between intro/dense/breather sections, so everything feels equally weighted.
9. **Discovery v3** uses its own dark token (`#0a0f14`) instead of `hsl(var(--base))` — close but not identical. Should be aligned.
10. **Mobile gutters** drop to `1rem` (16 px) via Tailwind container, but `.container-site` uses fluid `clamp(1.5rem, 4vw, 6.25rem)` — two containers, two rules.

---

## Strategy: Two-Pass Refactor

### Pass 1 — Foundation (tokens + primitives, no page edits)

**1.1 Tighten the design tokens in `index.css`**
- Add a 1440 px container tier: `--container-max: min(1320px, 92vw)` and bump to 1480 px ≥1800.
- Add semantic section presets: `.section` (default `py-[var(--section-py-md)]`), `.section-sm`, `.section-lg`, `.section-hero` (with min-height capped at `min(90vh, 880px)` to fix short-laptop hero).
- Add header rhythm helper: `.section-header { margin-bottom: var(--header-mb); max-width: 65ch; }`.
- Tighten H1 clamp range: from `clamp(2rem, 4vw + 1rem, 4.5rem)` → `clamp(2.25rem, 3.2vw + 1.25rem, 4.25rem)` (smoother mid-range, no giant jump at lg).
- Add `.eyebrow` (uppercase tracked label) and `.lede` (large intro paragraph) text recipes.

**1.2 Add primitive components**
- `src/components/ui/Section.tsx` — `<Section size="sm|md|lg|hero" bleed?>` wrapping `container-site` with consistent vertical rhythm + optional radial-glow background slot.
- `src/components/ui/SectionHeader.tsx` — `<SectionHeader eyebrow title lede align>` — replaces the 15+ duplicated `<div className="mb-16"><h2…><p…></div>` blocks.
- `src/components/ui/Card.tsx` — `<Card variant="surface|outline|elevated" interactive?>` — replaces all `p-6 bg-surface rounded-lg border border-line` repeats.
- Adopt shadcn `<Button>` with two project-specific variants: `cta` (outlined emerald, current Home style) and `ghost-link` (text+arrow). Centralize the `min-h-[44px]` touch target there.

**1.3 Tailwind config touch-ups**
- Add `maxWidth: { prose: '65ch', readable: '72ch', wide: '1480px' }`.
- Add `screens: { xs: '480px' }` so we stop using arbitrary `min-w-[480px]` checks.
- No new colors — palette is already correct.

**Deliverable of Pass 1:** all primitives compile and are usable. Site is unchanged visually.

---

### Pass 2 — Apply primitives across every page

Mechanical sweep, one page at a time, in this order: `Home → Services → Work → CaseStudyDetail → About → Contact → Blog → BlogPost → Privacy → Terms → NotFound → Discovery → AdminLeads → service detail pages`.

For each page:

| Replace | With |
|---|---|
| `<section className="container-site py-24">` | `<Section size="md">` |
| `<section className="… py-16 md:py-24 lg:py-32 min-h-[80vh] lg:min-h-[90vh]">` | `<Section size="hero">` |
| `<div className="mb-16"><h2…>Title</h2><p…>Lede</p></div>` | `<SectionHeader title="Title" lede="Lede" />` |
| `<h2 className="font-display text-3xl lg:text-4xl text-text mb-4">` | `<h2>` (let the global clamp handle it) |
| `<h1 className="font-display text-4xl md:text-6xl lg:text-8xl …">` | `<h1>` (clamp handles it) |
| `<div className="p-6 bg-surface rounded-lg border border-line">` | `<Card>` |
| Inline button `<Link className="… px-8 py-4 border border-accent …">` | `<Button asChild variant="cta">` |
| `gap-8`, `mb-16`, `mb-12`, `mt-12` | `gap-cards`, `mb-header`, etc. (utility classes mapped to tokens) |

**Specific fixes during the sweep:**
- **Home hero**: remove the `text-4xl md:text-6xl lg:text-8xl` triple-jump; rely on global H1. Cap hero min-height at 880 px so 1280×720 laptops don't show empty space.
- **Services / Work / About**: collapse to one consistent grid recipe — `grid sm:grid-cols-2 lg:grid-cols-4 gap-cards` for 4-up, `lg:grid-cols-3` for 3-up. No more bespoke breakpoints per page.
- **Discovery**: swap the hardcoded `#0a0f14` for `hsl(var(--base))` and mount inside `<Section size="lg">` so vertical rhythm matches the rest of the site.
- **Footer & Navigation**: align horizontal padding to the same `--gutter-fluid` as `container-site` (currently uses Tailwind container with different breakpoint padding).
- **CaseStudyDetail**: long page that currently feels uniform — apply `size="sm"` to the metadata band, `size="md"` to body, `size="lg"` to next-case CTA.

---

## Out of scope

- No new color palette, no logo changes, no copywriting changes.
- No animation rework beyond what falls out of using `<Section>` (which can wrap children in `ScrollReveal` optionally).
- No new dependencies.

## Acceptance criteria

1. Zero remaining occurrences of hardcoded `py-24`, `py-32`, `mb-16`, `text-4xl md:text-6xl lg:text-8xl` in pages (grep clean).
2. Every page section uses `<Section>` or `<SectionHeader>` primitives.
3. Every CTA uses the shared `<Button variant="cta">` or `<Button variant="ghost-link">`.
4. Site looks visually consistent across viewports: 360, 768, 1024, 1280, 1440, 1920 px — verified by screenshot QA after Pass 2.
5. Hero on 1280×720 no longer shows a tall empty band below the buttons.
6. Discovery tool background is identical to the rest of the site (same dot grid + base color).
7. No regressions to Discovery v3 logic, AdminLeads auth, or backend behavior.

## Risk / rollback

Pass 1 is purely additive — safe. Pass 2 is mechanical find-and-replace per page, easily reverted page-by-page if a layout breaks. Will commit logically (one page per commit-equivalent edit batch) so individual pages can be rolled back.
