# Home Page Upgrade Plan

Goal: tighten conversion, raise craft, sharpen narrative — without breaking the cinematic dark/emerald system or inventing stats. Hero structure stays; everything else gets a deliberate pass.

---

## 1. Hero refinement (keep structure)

Left column (headline + CTAs) — unchanged copy, sharper execution:
- Add a thin animated emerald underline that draws under "and keep it." after the headline finishes staggering in.
- Tighten CTA row: primary `Start a Project` keeps solid emerald; secondary becomes a quieter ghost link with arrow so the primary CTA visually wins.
- Add a small "Currently booking Q1 2026 · 2 spots" availability chip above the eyebrow (real scarcity signal, editable in one constant).

Right column (credential panel):
- Replace the static stat list with a **vertical "Now / Recent / Next" panel**:
  - **Now** — currently working with (1 client name or category, rotating from caseStudies)
  - **Recent** — one most-recent case study title, links to /work/<slug>
  - **Next** — "Currently accepting 2 engagements for Q1"
- Same column width, same typography rhythm — replaces fabricated-looking "9 active partners" with something verifiable and dynamic.
- Subtle border-left accent line stays; remove the italic pull-quote (already implied by the panel).

Ambient layer:
- Add a slow-drifting noise/grain overlay (already have AmbientGlow + GrowthLines) at ~3% opacity for cinematic depth. Respects `prefers-reduced-motion`.

---

## 2. NEW: Results strip (between Services and How We Work)

A single full-width band, dark surface, 3–4 qualitative outcome statements pulled from real engagements. Because the `work` table and `caseStudies.ts` have **no numeric metrics today**, this strip uses **outcome statements**, not invented percentages:

```text
"Rebuilt a wealth firm's identity end-to-end."
"Shipped a legaltech SaaS marketing site in 6 weeks."
"Built a content engine producing 30+ assets/month from one shoot day."
"Took a financial advisory practice from zero to full digital presence."
```

Format: large display type, one statement per row, divided by hairlines, emerald accent on the verb. Each row is a quiet link to the related case study where one exists.

If you later provide real numbers (traffic lift, conversion lift, revenue), we swap statements for a metric grid in a follow-up — no rework of surrounding sections needed.

---

## 3. Services section — sharper hierarchy

- Keep 4-card grid; add a subtle hover state: card lifts 2px, emerald hairline runs along the bottom edge.
- Add a one-line outcome under each service title (e.g. Web Design → "Sites that convert, not just look good").
- Replace the numeric `01 / 02 / 03 / 04` label with a small service icon already used elsewhere on the site for visual continuity with the work cards.

---

## 4. How We Work — minor polish

- Currently strong. Single change: animate the leading number on scroll-into-view (counts from 00 → 0N with a 200ms tick) to add life without noise.
- Tighten right-column copy alignment on lg breakpoint (currently floats slightly low).

---

## 5. Featured Work — make cards earn their space

- Cards currently link to `/work` (list page) instead of the specific case study. Fix: link each to `/work/<slug>`.
- Add a thin metadata row at the bottom of each card: `Industry · Year` (data already on `caseStudies`).
- Replace the generic category-gradient backgrounds with a low-opacity hero image from each case study where available, falling back to current gradient.

---

## 6. NEW: Pre-footer CTA band

Already exists globally per the "Premium Visual Refinements" memory — verify it's mounted on Home and not duplicated. No new component.

---

## Out of scope (explicitly not touching)

- Testimonials (removed; not re-adding until real quotes exist)
- Pricing (per memory: never public)
- Client logo wall (keeps current treatment)
- Navigation, footer, route structure
- Any backend / schema changes

---

## Technical notes

- All edits land in `src/pages/Home.tsx` plus one new `src/components/home/ResultsStrip.tsx`.
- New availability chip and Now/Recent/Next data live as a small constant at top of `Home.tsx` so you can edit copy without touching JSX.
- Featured Work card link fix uses existing `caseStudies[i].slug`.
- Uses existing tokens only: `--accent`, `--surface`, `--line`, `--mute`, `--text`. No new colors.
- Respects `useReducedMotion()` for the count-up and grain overlay.
- No new dependencies.

---

## Open question (won't block)

The Results strip ships with **qualitative** outcomes because no numeric metrics exist in `caseStudies.ts` or the `work` table. If you want a numeric version later, send 3–4 real numbers per project and we'll upgrade the strip in a small follow-up.
