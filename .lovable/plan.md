## Polish & Cleanup Audit

A full pass through `src/` (excluding `/rgc`). Bundles A–C already covered cohesion, motion, and conversion. This plan addresses what's still rough: duplication, dead code, drift from your own tokens, and a small a11y/perf debt. Grouped by impact.

---

### 1. Fix outright inconsistencies (highest impact, lowest risk)

**CTA label drift** — Bundle C standardized on "Start a project" but `Navigation.tsx` still says "Start a Project" and Home hero says "Start a Project". Lock to one casing site-wide.

**Page hero treatment is inconsistent.**
- `Contact.tsx` wraps `PageHero` inside a custom parallax `Section` with two extra blurred orbs and a side-by-side info card row — a different visual contract than every other inner page.
- `Work.tsx` puts `SectionChapter` *after* `PageHero` (which already renders one), giving Work two chapter marks (1 and 2) stacked 40px apart.
- `About.tsx` mission section uses `max-w-readable` (undefined class) — silently no-ops.

Fix: align Contact hero to the same `PageHero` shell the other pages use (keep the email/response chips as a row *below*, not a competing column). Remove the duplicate chapter on Work — let `PageHero` own #1, start the filter bar at #2 without re-rendering a chapter. Replace `max-w-readable` with `prose-measure`.

**Footer wedges a full form into a 1/4 column.** `QuickContactForm` inside the 4-col grid crushes inputs on md. Replace with a single email CTA + social row; the global CTA section already drives form traffic.

**Services page deliverables button** uses `<Button variant="default">` while everywhere else uses `.btn-solid` / `.btn-outline-cta`. Switch to outline-cta for visual consistency with the section.

---

### 2. Delete dead/duplicate code

Confirmed unused or redundant after Bundles A–C:
- `src/components/PageHeader.tsx` (17 lines) — superseded by `PageHero`.
- `src/components/FuturisticGrid.tsx`, `src/components/ScrollIndicator.tsx`, `src/components/FeaturedWorkSlider.tsx`, `src/components/FeaturedWorkSkeleton.tsx` — verify no imports, then remove.
- `src/pages/Portfolio.tsx` — only does a `<Navigate to="/work">`; the same redirect is already declared inline in `App.tsx` for `/random-golf-club`. Move the `/portfolio` redirect inline and delete the file (saves a lazy chunk).
- `QuickContactForm` import in `Work.tsx` is unused (leftover from Bundle C).

CSS cleanup in `src/index.css`:
- `.card-interactive` duplicates `SurfaceCard interactive` variant. Pick one (keep the variant, drop the class).
- `.btn-interactive` is only used by footer social icons; inline it or rename for clarity.
- Three overlapping animation helpers (`.animate-smooth/fast/quick`) — keep, but document which to use when (currently picked arbitrarily).

---

### 3. Token discipline — stop hardcoded values

Grep flagged several files writing raw HSL or hex instead of using tokens:
- `PageHero.tsx` line 37 hardcodes `hsl(155 48% 54% / 0.06)` for the halo. Replace with `hsl(var(--accent) / 0.06)` so theme changes propagate.
- `Blog.tsx` line 130 hardcodes the same accent value in the placeholder dot pattern.
- `Home.tsx` featured project cards bypass `SurfaceCard` and re-implement border + hover styles inline. Migrate to `SurfaceCard` with the `interactive` variant + a gradient overlay child (same look, one source of truth).
- `Contact.tsx` parallax orbs use `bg-accent/5` and `bg-accent/3` — `/3` isn't a Tailwind opacity step and silently drops. Use `/5` and `/10`, or move to the `AmbientGlow` component you already have.

---

### 4. Accessibility & semantics

- **Heading order**: `Blog.tsx` cards use `<h2>` for post titles inside a list where the page already has an `<h1>` from `PageHero` and an `<h2>` would be expected for the section header (currently missing). Add a visually-hidden `<h2>Latest posts</h2>` or demote cards to `<h3>`.
- **`<select>` on Work page** has no associated `<label>` — add `aria-label="Sort projects"`.
- **Focus rings**: only `.focus-ring` utility uses `:focus-visible`. The numbered service toggle buttons, view-mode toggles, and accordion triggers fall back to browser default outlines. Apply `focus-ring` consistently to all interactive non-button elements.
- **Reduced motion**: the global rule kills all transitions, but `Home.tsx` hero already special-cases `useReducedMotion`. Other parallax sections (Contact, CaseStudyDetail) should do the same instead of relying on the global wipe, which also kills useful hover transitions.
- **Skip link** target is `#main-content`, correct — but the `<main>` uses `paddingTop: var(--nav-height)` inline. Move to a class so print styles and reduced-motion don't have to fight inline styles.

---

### 5. Performance

- **Featured project images** on Home use the SVG logo at 160×160 with `opacity-[0.06]` as decoration — fine, but mark `decoding="async"` alongside `loading="lazy"`.
- **`framer-motion`** is imported on Work, Contact, Blog, Home — fine, but `Work.tsx` wraps every card in a `motion.div` with stagger even in `list` mode. Strip motion from list mode (it fights the layout transition).
- **Lazy routes**: `Discovery` (1214 lines) and `AdminLeads` (553 lines) are already lazy ✓. Add `<link rel="prefetch">` hints for `/work` and `/contact` from Home since they're the primary CTAs.
- **Fonts**: `index.html` preloads Inter/Outfit per Bundle B. Verify `font-display: swap` is set on the @font-face declarations to avoid invisible-text flashes.

---

### 6. SEO polish

- Every page sets `seoTitle`/`seoDescription` ✓. But `BlogPost.tsx` and `CaseStudyDetail.tsx` should also pass `ogType="article"` and `ogParams.author` / `ogParams.date` — the Layout supports it, just not used.
- `sitemap.xml` is static. Confirm it includes the four service sub-routes (`/services/web-design`, etc.) and `/work/:slug` entries.
- `robots.txt` already blocks AI crawlers (per memory). No change.

---

### Execution order (when you say go)

1. **Cleanup pass** (low-risk deletions + label fixes) — Section 1 + 2.
2. **Token + component dedup** — Section 3 (Home cards → SurfaceCard, halo tokens).
3. **A11y + perf** — Sections 4 + 5.
4. **SEO touch-up** — Section 6.

Each step is independently shippable. Want me to scope it as one bundle or split into two (1+2 first, then 3+4+5+6)?
