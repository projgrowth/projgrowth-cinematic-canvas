# Next Improvement: Consolidation Pass

After the previous polish/subtraction work, the biggest remaining wins are **structural**, not visual. Four files carry most of the codebase weight and most of the duplication risk:

- `src/pages/Discovery.tsx` — **1,214 lines** (single monolith, hardest file to change safely)
- `src/pages/services/*.tsx` — **4 files × ~217 lines** that are ~90% identical scaffolding
- `src/pages/AdminLeads.tsx` — **553 lines** mixing auth, data, filters, and table UI
- Duplicate hooks and orphaned components still sitting in `src/`

None of this is user-visible. All of it makes every future change slower and more breakable — which is exactly the concern you raised. The plan below is scoped to be **zero visual regression, zero SEO regression** on `/`, `/work`, `/services/*`, `/about`, `/blog`, `/contact`. `/rgc` is not touched.

---

## Group 1 — Service pages: 4 files → 1 template + 4 data files

**Today:** `WebDesign.tsx`, `Branding.tsx`, `ContentCreation.tsx`, `DigitalMarketing.tsx` each hand-roll the same `PageHero → intro → deliverables grid → process → related work → CTA` shell. Any design tweak means editing 4 files and hoping they stay in sync (they already drift — casing, spacing, related-work logic).

**Change:**
- Add `src/components/services/ServiceTemplate.tsx` — one component that takes a typed `ServiceContent` prop and renders the full page (hero, deliverables, process, `RelatedCaseStudies`, `GlobalCTA`, SEO/JSON-LD).
- Add `src/data/services.ts` exporting a `services` record keyed by slug (`web-design`, `branding`, `content-creation`, `digital-marketing`), each with `title`, `seo`, `hero`, `intro`, `deliverables[]`, `process[]`, `relatedTags[]`.
- Each `src/pages/services/*.tsx` shrinks to ~6 lines: `export default () => <ServiceTemplate content={services["web-design"]} />`.

**Impact:** ~850 lines → ~250. Design changes now happen in one place. Copy edits happen in `data/services.ts`. SEO structure becomes uniform across all four.

## Group 2 — Discovery: split the 1,214-line page

**Today:** `Discovery.tsx` is a single file holding form state, step navigation, validation, `brandBriefPdf` invocation, upload logic, and JSX for every step. It's the file most likely to break during any edit and the slowest for the agent to safely modify.

**Change (pure refactor, no behavior change):**
- Extract each step into `src/pages/discovery/steps/{Intro,Brand,Audience,Assets,Review}.tsx`.
- Move form state + step reducer into `src/pages/discovery/useDiscoveryForm.ts`.
- Move upload/submit side-effects into `src/pages/discovery/submitDiscovery.ts`.
- `Discovery.tsx` becomes a thin shell (~120 lines) that wires the hook to the current step component.

**Impact:** Each file is <300 lines. Adding/removing a step or field becomes a local edit.

## Group 3 — AdminLeads: split concerns

**Today:** 553 lines doing password gate + Supabase fetch + filter/sort UI + table rendering + row detail sheet in one file.

**Change:**
- `src/pages/admin/AdminGate.tsx` — password-protected wrapper.
- `src/pages/admin/useLeads.ts` — fetch, filter, sort logic (React Query).
- `src/pages/admin/LeadsTable.tsx` + `LeadDetailSheet.tsx` — presentational.
- `AdminLeads.tsx` composes them (~80 lines).

**Impact:** Table styling, filters, and auth can each be modified without touching the others.

## Group 4 — Hooks & orphan cleanup

- **Duplicate hooks:** `src/hooks/use-intersection-observer.tsx` and `src/hooks/useInView.ts` do the same thing. Consolidate on `useInView`, delete the other, update the 1–2 call sites.
- **Duplicate toast:** `src/hooks/use-toast.ts` and `src/components/ui/use-toast.ts` — keep the shadcn one under `ui/`, delete the hooks/ copy, update imports.
- **Orphaned component:** `QuickContactForm.tsx` was removed from the Footer last pass and is no longer imported anywhere. Delete.
- **`AnimatedCounter`, `BentoGrid`, `LazyImage`, `CategoryFilter`, `SearchBar`:** verify each is imported somewhere; delete any that aren't.

**Impact:** Removes ~300 lines of dead or duplicated code and eliminates a real footgun (two hooks with the same name doing slightly different things).

## Group 5 — Design-system lockdown (low-risk, high-leverage)

Two small guardrails that prevent regressions the previous passes had to keep fixing:

- **Token audit script:** add `scripts/check-tokens.mjs` that greps `src/` (excluding `rgc.css`) for hardcoded hex colors, raw `hsl(...)` literals, and `rounded-xl` / `rounded-2xl`. Wire it into `npm run lint`. If a violation lands, the build surfaces it immediately instead of the next SEO/design audit finding it weeks later.
- **`Layout` prop consolidation:** `Layout` currently takes `seoTitle`, `seoDescription`, `seoKeywords`, `canonicalUrl`, `ogType`, `ogImage` as flat props. Group them under a single `seo` object so pages can `...spread` a typed SEO record from `src/data/seo.ts`. Makes it impossible to ship a page with a missing canonical or duplicate title.

---

## Technical notes

**Order of execution** (each step verifies build before moving on):

1. Group 4 cleanup first — smallest surface, unblocks the rest.
2. Group 1 service template — biggest LOC win, no runtime risk.
3. Group 5 token script + `seo` prop — enforces standards before the bigger refactor.
4. Group 3 AdminLeads split.
5. Group 2 Discovery split (largest file, done last with the most context).

**Guarantees:**
- No changes to `/rgc`, `src/pages/rgc.css`, or `src/pages/RGC.tsx`.
- No changes to Supabase schema, RLS, or edge functions.
- No visual changes on public pages — verified by loading `/`, `/services/web-design`, `/about`, `/work`, `/contact` in Playwright and screenshot-diffing hero/section regions before and after.
- SEO metadata for every migrated service page is copied verbatim from the current file into `data/services.ts` (title, description, canonical, JSON-LD).

**Deferred (not in this plan):**
- Visual redesign of any page.
- Content rewrites.
- New features, new routes, new backend tables.

---

## Deliverables

```text
src/
  components/services/ServiceTemplate.tsx        (new)
  data/services.ts                               (new)
  data/seo.ts                                    (new)
  pages/services/{WebDesign,Branding,
    ContentCreation,DigitalMarketing}.tsx        (thin re-exports)
  pages/discovery/
    steps/{Intro,Brand,Audience,Assets,Review}.tsx (new)
    useDiscoveryForm.ts                          (new)
    submitDiscovery.ts                           (new)
  pages/Discovery.tsx                            (~120 lines)
  pages/admin/{AdminGate,LeadsTable,
    LeadDetailSheet}.tsx + useLeads.ts           (new)
  pages/AdminLeads.tsx                           (~80 lines)
  hooks/use-intersection-observer.tsx            (deleted)
  hooks/use-toast.ts                             (deleted)
  components/QuickContactForm.tsx                (deleted, plus any other unused)
scripts/check-tokens.mjs                         (new)
```

Net effect: **~2,600 lines → ~1,400 lines** of application code, zero user-visible change, and every future edit lands in a file small enough to reason about in one read.
