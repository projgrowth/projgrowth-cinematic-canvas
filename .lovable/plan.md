
# Bundle A — Site-Wide Cohesion Pass

Goal: every page (except `/rgc`) reads like it was designed by the same hand as the new Home. Three coordinated moves: a shared hero shell, chapter marks on every section, and a consolidated card system.

Scope rule: do not touch `/rgc`, `src/pages/RGC.tsx`, `src/pages/rgc.css`, or anything under `src/components/pitch/**`.

---

## 1. Shared PageHero shell

Promote `SectionChapter` and the Home hero pattern into a reusable hero used by every inner page.

New: `src/components/PageHero.tsx`
- Props: `chapter?: { number: number; label: string }`, `title: ReactNode`, `lede?: ReactNode`, `status?: ReactNode` (for the new inline booking line on Home), `align?: "left" | "center"`, `children?` (slot for extras like the Contact email card).
- Composition:
  - Chapter mark (uses existing `SectionChapter`)
  - H1: `font-display text-text` with `text-wrap: balance`
  - Lede: `.lede` class, `max-w-[62ch]`
  - Optional status row directly below lede
- Wraps content in the existing `PageHeader` glow halo so the radial accent stays consistent.
- Built-in fade-up reveal via `ScrollReveal` so pages stop hand-rolling `motion.h1`.

Migration:
- `About.tsx`, `Services.tsx`, `Blog.tsx`, `Contact.tsx`, `Work.tsx`, `Portfolio.tsx`, `CaseStudyDetail.tsx`, `BlogPost.tsx`, all 4 `services/*` pages → replace their bespoke `PageHeader + h1 + lede` blocks with `<PageHero>`.
- Home keeps its custom hero (it has the word-by-word reveal and the booking status line), but adopts the same chapter mark format above the headline for parity.

Chapter labels (assigned per page):
- Home — already uses chapters mid-page
- Work — `01 / Selected Work`
- Services — `01 / Disciplines`
- About — `01 / Studio`
- Blog — `01 / Field Notes`
- Contact — `01 / Begin`
- Case study detail — `0X / Case Study` where X = index in the lineup

## 2. Chapter marks across every section

Today only Home uses `SectionChapter`. Roll it out so every major section on every page is labeled with `0N / Section Name`. This is the single biggest cohesion win.

- About: `01 / Studio` (hero), `02 / Mission`, `03 / Values`
- Services: `01 / Disciplines`, `02 / Process` (above `ProcessTimeline`)
- Work: `01 / Selected Work` (hero), `02 / Index` (above the grid)
- Blog: `01 / Field Notes`, `02 / Latest`
- Contact: `01 / Begin`, `02 / Quick Message`, `03 / Start a Project`, `04 / Questions` (FAQ)
- Service subpages (4): `01 / Overview`, `02 / Capabilities`, `03 / Deliverables`, `04 / Process`
- Case study detail: `01 / Challenge`, `02 / Approach`, `03 / What Changed`

Standardize spacing: chapter mark `mb-4`, then H2 `mb-6`, body content below. This matches existing `mb-16` headers rule from memory by keeping the section header block compact.

## 3. Card system consolidation

Today there are 4 overlapping card patterns: `SurfaceCard` (CVA), `BentoCaseStudyCard`, `CaseStudyCard` (with 3D tilt), and ad-hoc `bg-surface rounded-lg border border-line` divs in About/Services/Contact/Blog.

Consolidate to **two** sanctioned variants:

**A. `SurfaceCard` (the "content card")** — used for values, FAQ items, contact info cards, blog post cards, service capability cards. Extend its CVA:
- Add `variant: "ghost"` (transparent bg, line border only) for lower-emphasis grids
- Standardize hover: every interactive `SurfaceCard` uses `hover:border-accent/40 hover:shadow-elegant hover:-translate-y-0.5`
- Standardize radius: all `rounded-lg` (drop the occasional `rounded-md`/`rounded-xl`)

Refactor targets:
- `About.tsx` value cards → `<SurfaceCard variant="surface" pad="lg" interactive>`
- `Contact.tsx` Email/Response cards → `<SurfaceCard variant="ghost" pad="sm" interactive>`
- `Blog.tsx` `BlogCardSkeleton` and the post card markup → `<SurfaceCard>` wrapper
- Services capability tiles in `services/*` → `<SurfaceCard variant="ghost">`

**B. `BentoCaseStudyCard` (the "work card")** — single owner for showing case studies anywhere (Home featured, Work bento, related case studies on detail pages). 

- Deprecate `CaseStudyCard.tsx`: Work page's "grid" and "list" view modes both re-render through `BentoCaseStudyCard` with a new `layout?: "bento" | "grid" | "list"` prop. The 3D tilt logic in `CaseStudyCard` is removed (per Mobile/Touch memory and to reduce noise per Minimalist memory).
- File deletion: `src/components/CaseStudyCard.tsx` removed; imports in `Work.tsx` updated.

This gets us from 4 card patterns → 2 owned, documented components.

---

## Files touched

Created:
- `src/components/PageHero.tsx`

Edited:
- `src/components/home/SectionChapter.tsx` — move into `src/components/SectionChapter.tsx` (used site-wide now, not Home-only)
- `src/components/ui/card-surface.tsx` — add `ghost` variant, standardize hover
- `src/pages/Home.tsx` — chapter mark above hero headline; update SectionChapter import path
- `src/pages/About.tsx` — PageHero + chapter marks + SurfaceCard for values
- `src/pages/Services.tsx` — PageHero + chapter marks
- `src/pages/Work.tsx` — PageHero + chapter marks; swap CaseStudyCard → BentoCaseStudyCard with `layout` prop
- `src/pages/Portfolio.tsx` — PageHero + chapter marks
- `src/pages/Blog.tsx` — PageHero + chapter marks + SurfaceCard for post cards
- `src/pages/BlogPost.tsx` — PageHero
- `src/pages/Contact.tsx` — PageHero + chapter marks + SurfaceCard for info row
- `src/pages/CaseStudyDetail.tsx` — chapter marks per narrative section
- `src/pages/services/WebDesign.tsx`, `Branding.tsx`, `ContentCreation.tsx`, `DigitalMarketing.tsx` — PageHero + chapter marks + SurfaceCard for tiles
- `src/components/BentoCaseStudyCard.tsx` — add `layout` prop (bento | grid | list), inline old list-view markup
- `src/components/home/ResultsStrip.tsx` — update SectionChapter import path

Deleted:
- `src/components/CaseStudyCard.tsx`
- `src/components/home/SectionChapter.tsx` (replaced by site-wide path)

Untouched:
- `src/pages/RGC.tsx`, `src/pages/rgc.css`, anything under `src/components/pitch/**`, `src/pages/Discovery.tsx`, `src/pages/discovery/**`, navigation, footer, color tokens, typography rules, motion system.

---

## Out of scope (saved for later bundles)

- Motion unification, link hover system, font preloading (Bundle B)
- CTA voice, logos on Services/About, footer status (Bundle C)
- Focus rings, reduced-motion sweep, image pipeline (Bundle D)
