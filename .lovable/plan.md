## Goal
Simplify the codebase so less breaks, tone down anything that reads as "cheesy," and keep the design polished + SEO intact. No functional regressions, `/rgc` untouched.

## 1. Cut surface area (less code = less to break)

**Delete unused/redundant components:**
- `GrowthLines.tsx`, `LeafDivider.tsx`, `AnimatedCounter.tsx` if no live imports
- `QuickContactForm.tsx` (already removed from footer)
- `BentoCaseStudyCard.tsx` if `CaseStudyCard` covers Work grid
- `CaseStudySheet.tsx` if detail page replaces it
- `Portfolio.tsx` page (App.tsx already redirects `/portfolio` → `/work` via `<Navigate>`; the file is dead)
- `MultiStepContactForm.tsx` if Contact uses single-step
- Duplicate `SectionChapter` vs `pitch/primitives/ChapterMark`

Verify each with a grep before deleting; only remove if zero non-self imports.

## 2. Collapse component variants

- One `SurfaceCard` (`card-surface.tsx`) with `default | ghost | feature` variants. Retire `BentoCaseStudyCard` and any one-off card wrappers.
- One `PageHero` shell — already exists; sweep remaining pages still doing custom heros.
- One CTA voice everywhere: "Start a project" (already standardized in `GlobalCTA`, confirm `Navigation`, `Home`, service pages).

## 3. Tone down the "cheesy" signals

- **Home hero**: remove the glowing-dot "availability" status line (reads as marketing theater). Replace with a single quiet eyebrow line like "Orlando · Available for Q3 projects" — no pulse animation.
- **FooterStatus** indicator: remove (same reason).
- **ResultsStrip**: keep but rewrite copy to be specific + understated, no superlatives ("transformed", "skyrocketed", "10x", etc.). If we can't say something concrete, cut the line.
- **Service card "outcome lines"** & hover hairlines: keep hairlines, audit outcome copy for marketing-speak.
- **PageHero halo / radial glows**: reduce opacity on inner pages so only Home + Work feel "lit." About/Contact/Blog get flat surfaces.
- **Blackletter/handwritten accents**: scoped to `/rgc` only — confirm none have leaked into main site.
- **PageTransition**: keep, but shorten duration; long fades read as filler.

## 4. Design-system hygiene

- Audit for any remaining hardcoded hex/rgb/hsl literals outside `index.css` and `rgc.css`; replace with tokens.
- Confirm every heading uses `font-medium` (per existing rule) — sweep service pages, Blog, CaseStudyDetail.
- Standardize section spacing on the existing `section`/`section-lg` utilities; remove ad-hoc `py-24`/`py-32` where it drifts.
- Remove unused tokens from `index.css` (deferred utilities no component uses).

## 5. SEO — preserve, don't expand

- Keep `SEO.tsx`, JSON-LD, sitemap, robots, llms.txt as-is.
- Verify after deletions: every remaining route still passes `seoTitle`/`seoDescription` to `Layout`. Add to any page missing it.
- Sweep for orphan internal links to deleted pages (404 risk).
- Leave `useAnalytics` placeholder GA ID alone (already noted).

## 6. Stability fixes

- `index.html`: two near-duplicate Google Fonts `<link rel="stylesheet">` (fixed-weight + variable-axis). Keep only the variable-axis one; saves a render-blocking request.
- `App.tsx`: `useAnalytics` runs every route change but `G-XXXXXXXXXX` is a placeholder — guard so it no-ops until a real ID is set, preventing console noise.
- Wrap heavier route components (`Discovery`, `AdminLeads`, `RGC`) in their own error boundary so a runtime error there doesn't blank the site.

## 7. Out of scope (explicit)
- `/rgc` page and `src/pages/rgc.css` — untouched
- Backend / edge functions / RLS — untouched
- No new features, no copy rewrites beyond the cheesy-line audit above
- No visual redesign — this is a subtraction pass

## Deliverable
A single PR-style pass: deletions + consolidations + the hero/footer status removal + the duplicate font link fix. Build verified, all routes load, SEO tags intact on every remaining page.
