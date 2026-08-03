# Premium Menu + Design System Unification

Goal: make the header feel like a firm you'd hire, and make every page draw from the same locked recipes instead of hand-rolled classes. `/rgc` stays untouched. Navigation stays flat — no dropdowns.

## 1. Header / menu polish

Desktop (`Navigation.tsx`):
- Replace the transparent-to-solid jump with a single refined treatment: a floating rail that keeps a hairline border and a real frosted layer (`bg-base/70`, `backdrop-blur-xl`, saturate), plus a subtle top inner highlight so it reads as glass rather than a gray bar.
- Nav labels: switch to a tighter, uppercase-free 14px scale with `tracking-tight`, mute at `text-text/55`, active/hover at full text. Replace the abrupt `after:` bar with an underline that grows from center on hover and stays fixed for the active route.
- Naming consistency: label the work route "Work" in the header (matches `/work`, the page H1, and the mobile sheet — currently "Portfolio").
- CTA: keep one solid "Start a project" but reduce it to a compact 40px pill so it sits inside the rail rhythm instead of dominating it.
- Shrink-on-scroll: padding tightens from `py-6` to `py-3.5` after 20px so the page gains vertical room without the hide/show feeling jumpy.

Mobile (`MobileNav.tsx`):
- Rebuild the sheet as an editorial menu: full-width panel, numbered/large display-font links (not 18px body text), hairline dividers, and a `Get in touch` block at the bottom with the email and the CTA button.
- Replace the six hand-written duplicate `<Link>` blocks with one array map (removes the drift that already lost the Blog/Services consistency), keeping the Services group as an inline expandable list.
- Active state uses the same accent + underline vocabulary as desktop.

## 2. Design system audit fixes

Findings from the codebase scan:
- The `.eyebrow` recipe exists but only 5 files use it, while 11 files hand-roll `text-xs uppercase tracking-widest ...` with differing sizes, colors, and letter-spacing.
- The `.surface-card` recipe exists but 15 files hand-roll `bg-surface border border-line rounded-*` with inconsistent shadows and hover behavior.
- Heading scale has a gap: `h3` maxes at 20px while card titles need something between `h2` (38px) and `h3`.

Fixes:
- Migrate every hand-rolled eyebrow to `.eyebrow` (add an `.eyebrow-mute` variant for the neutral-gray cases so the accent version stays meaningful).
- Migrate hand-rolled card shells to `.surface-card` (+ `.hover-lift` where interactive), keeping bespoke internals. Skips: `WorkPlate` (intentional plate), `rgc.css`.
- Add `--radius-pill`, an `h4` scale token, and a `.rule` hairline recipe so dividers stop being ad-hoc `border-t border-line/50` variants.
- Tighten the premium details in `index.css`: raise `--line` contrast slightly for crisper hairlines, add `--shadow-rail` for the header, and standardize the accent underline into a `.nav-underline` recipe reused by desktop and mobile nav.

## 3. Cross-page sweep

Apply the migrated recipes on: Home, Work, Services (+ 4 service pages via `ServiceTemplate`), About, Contact, Blog, BlogPost, CaseStudyDetail, Privacy, Terms, NotFound, plus `Footer`, `GlobalCTA`, `SectionChapter`, `PageHero`, `CaseStudyCard`, `ClientLogos`, `ResultsStrip`, `RelatedCaseStudies`. Verify each route renders and section rhythm (`section` / `section-lg` / `section-header`) is used everywhere instead of arbitrary padding.

## Technical notes

- Files touched: `src/components/Navigation.tsx`, `src/components/MobileNav.tsx`, `src/index.css`, `tailwind.config.ts`, and the page/component files listed above.
- No backend, routing, or content changes. Route paths stay the same; only the header's visible label changes to "Work".
- Guardrails: `scripts/check-tokens.mjs` must stay clean, and Playwright screenshots of Home, Work, Services, About, Contact, Blog at desktop + mobile widths confirm no regressions.
- `src/pages/RGC.tsx` and `src/pages/rgc.css` are explicitly excluded.
