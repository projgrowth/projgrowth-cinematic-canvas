## Audit findings & proposed fixes

Grouped by impact. Each item is independently shippable — you can pick a subset.

---

### 1. Architecture / performance (highest impact)

**a. Code-split routes with `React.lazy`.** `src/App.tsx` statically imports all 17 route components (including the 1,214-line `Discovery.tsx` and 551-line `AdminLeads.tsx`). Wrap each route in `lazy(() => import(...))` + a single `<Suspense fallback={<PageLoader />}>`. Expected: initial JS bundle drops ~40-60%, directly addresses the recent "Page loads slowly" Lighthouse finding.

**b. Collapse `App.tsx` route boilerplate.** Every route repeats the same `motion.div` wrapper (≈200 duplicated lines). Extract `<PageTransition>` once and either wrap `<Routes>` once or wrap each `element` with a single component. Net: ~150 lines deleted, easier to add routes.

**c. Delete dead components.** `NavigationGuide.tsx` and `ScrollProgress.tsx` are still in the repo but the project memory explicitly forbids them and they're not imported anywhere. Remove the files.

**d. De-duplicate CSS tokens.** `src/index.css` defines the `--ease` / `--duration-*` block twice and re-asserts the H1/H2/H3 clamps under `:where(h1).font-display` with the same values as the global rule. Collapse to one source of truth.

---

### 2. Design system / token consistency

**a. Replace ad-hoc opacity with semantic tokens.** Many files use `text-text/70`, `text-text/75`, `border-line/50` (Footer, Navigation). Tailwind already exposes `text-text-muted` / `text-text-faint`. Pick one (`text-mute` or `text-text-muted`) project-wide and convert.

**b. Replace Tailwind palette colors with status tokens.** `src/pages/AdminLeads.tsx` and `src/components/MultiStepContactForm.tsx` use `text-red-400`, `border-green-500/40`, `text-yellow-400`, `border-red-500`. Add `--success` / `--warning` / `--destructive` HSL tokens to `index.css` + `tailwind.config.ts`, then convert to `text-destructive`, `border-success/40`, etc.

**c. Standardize the page top offset.** `Layout.tsx` uses `pt-20` magic number for the fixed nav. Promote to `--nav-height` token and apply via class so nav height changes don't desync.

---

### 3. Content / IA inconsistencies

**a. Service taxonomy mismatch.** Home advertises 4 services (Web Design, Branding, Content Creation, Digital Marketing) that map to `/services/{web-design,branding,content-creation,digital-marketing}`. But `src/pages/Services.tsx` lists a completely different set (Brand Strategy, Digital Design, Development, Growth) with generic agency boilerplate deliverables. Rewrite `Services.tsx` to match the four real service pages, or remove `Services.tsx` and link Home cards directly to the sub-pages (cleaner).

**b. Footer/nav grid spacing bug.** `Footer.tsx` uses `gap-8 md:gap-3 mb-8 md:mb-3` — the `md:gap-3` collapses spacing at desktop. Looks unintentional. Standardize on `gap-cards` token.

---

### 4. SEO / discoverability

**a. Add `noindex` to internal routes.** `Layout` accepts `noindex` but `/admin/leads`, `/discovery`, and `/portfolio` (redirect) don't set it. Add `noindex` to each so they stop appearing in `sitemap.xml` and search results.

**b. Verify static OG images exist.** `index.html` references `/og-image.jpg` and `/twitter-card.jpg` for the homepage, but the project ships a dynamic `og-image` edge function. Either commit static fallbacks to `public/` or point the meta tags at the edge function URL.

---

### 5. Accessibility / polish

**a. Form error styling uses raw red.** Same as 2b — once `destructive` tokens exist, `MultiStepContactForm` field-error states convert cleanly and respect dark/contrast modes.

**b. Hero motion.** Current hero blurs+slides three lines with no `prefers-reduced-motion` opt-out at the component level. The global CSS rule short-circuits durations but Framer Motion uses JS — add `useReducedMotion()` check.

---

### Technical details

- New tokens (in `index.css` `:root`):
  ```css
  --success: 142 65% 45%;
  --warning: 38 92% 55%;
  --destructive: 0 72% 55%;
  --nav-height: 5rem;
  ```
  Add matching `success`, `warning`, `destructive` entries in `tailwind.config.ts > colors`.
- Lazy-route pattern:
  ```ts
  const Home = lazy(() => import("./pages/Home"));
  // ...
  <Suspense fallback={<PageLoader />}><AnimatedRoutes /></Suspense>
  ```
- `PageTransition` wrapper consumes `pageVariants` once; route elements become `<PageTransition><Home /></PageTransition>`.
- Files removed: `src/components/NavigationGuide.tsx`, `src/components/ScrollProgress.tsx`.
- Services rewrite re-uses the existing `services` array from `Home.tsx` as the canonical source (move to `src/data/services.ts`).

---

### Recommended order

1. Performance pack (1a, 1b, 1c, 1d) — biggest user-visible win, low risk.
2. Token pack (2a, 2b, 2c) — foundation for future consistency.
3. Content fix (3a, 3b) — corrects a real visitor-facing inconsistency.
4. SEO/a11y polish (4a, 4b, 5a, 5b) — small individual wins.

Tell me which group(s) to ship, or "all" and I'll do them in the order above.
