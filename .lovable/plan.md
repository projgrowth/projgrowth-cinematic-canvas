# Home Page Visual Upgrade — High-Impact Bundle

Four coordinated refinements that sharpen editorial rhythm and replace generic visuals with real ones. All token-based, no new dependencies.

## 1. Section rhythm — editorial cadence

Add a consistent eyebrow pattern to every major section header on Home:

```text
01 / Craft          ──────────
02 / Outcomes       ──────────
03 / How We Work    ──────────
04 / Selected Work  ──────────
```

- Prepend a numbered chapter mark (`01 /`, `02 /`…) to each existing `eyebrow` line.
- Add a 24px emerald hairline (`bg-accent/40`) under each section header.
- Alternate background tone subtly between sections so they read as distinct chapters (Services = `bg-bg`, Results = `bg-surface/40`, How We Work already `bg-surface/70`, Featured Work = `bg-bg`).

## 2. Services — icons instead of numeric labels

Replace the `01 / 02 / 03 / 04` numeric tags on service cards with the real service icons (using existing `lucide-react` set):

- Web Design → `Globe`
- Branding → `Sparkles`
- Content Creation → `Film`
- Digital Marketing → `LineChart`

Icon sits top-left in a 40px square with a subtle emerald hairline border. The italic outcome line stays. Number cadence is preserved at the section level (chapter mark "01 / Craft").

## 3. Featured Work — real imagery, not category gradients

Replace the generic category-gradient backgrounds with the actual hero image from each case study:

- Pull `hero` / `coverImage` from `caseStudies.ts` (verify field name during build).
- Render at low opacity (~30%) with a dark gradient overlay bottom-up so text stays legible.
- Keep the category icon as a small chip in the top-right.
- Card still links to `/work/:slug`.

If a case study lacks a real image, fall back to the current gradient for that one card only.

## 4. Promote the Results Strip visually

Right now it reads as a flat list. Lift it so it feels like the "proof" moment:

- Add a `bg-surface/40` band so it visually separates from Services and How-We-Work.
- Add chapter mark `02 / Outcomes` to its header.
- Add a hover state on each row: subtle left-edge emerald hairline that grows from 0 → 4px on hover, plus row bg shifts to `bg-surface/60`.
- Add a small client/category tag (e.g., "Smart Financial · Wealth") under each outcome line in `text-mute text-xs`.

## Technical notes

Files touched:
- `src/pages/Home.tsx` — chapter marks on each section header, service icons + new `icon` field on services array, featured work card rewrite to use real imagery.
- `src/components/home/ResultsStrip.tsx` — band background, chapter mark, row hover state, sub-label tags.
- New small primitive `src/components/home/SectionChapter.tsx` — renders `01 / Craft` with emerald hairline. Reused across all four sections for consistency.

No changes to:
- Data layer / case study schema (read-only consumption; just verifying image field name).
- Navigation, footer, hero (hero stays as-is per earlier decision).
- Global tokens — uses existing `--accent`, `--surface`, `--line`, `--mute`.

## Out of scope

- Hero animated underline / grain overlay (deferred; user can request later).
- Logo wall redesign.
- New sections (testimonials, pricing).
- Any backend, routing, or data-model changes.
