# Visual Polish Pass — Look Like a Firm Worth Hiring

Verified against the live home page render and current components. Four fixes, in priority order. `/rgc` stays untouched.

## 1. Show the work (biggest credibility gap)

Right now the home page contains zero imagery of actual work. The three featured cards are colored gradient tiles with generic icons — the same pattern a template would ship. For a studio selling design, the proof has to be visible.

- Rebuild featured work cards around the real case-study images already in `caseStudies` (`image`, `heroMedia`, `logo`): 16:10 image plate on top, metadata below, quiet hover zoom.
- Make the first card a wide feature (2 columns) with the two others stacked beside it — an asymmetric editorial layout instead of three identical boxes.
- Client logo strip: currently uneven sizes with the last logo clipped off the right edge. Fix to a uniform-height, evenly-gapped, centered row that wraps on mobile.

## 2. Remove off-system color

The featured cards use blue, purple, and amber gradients that fight the emerald system and read as arbitrary. Category color goes back to one accent scale (emerald at varying strengths); category is communicated with the label, not a hue.

## 3. Tighten hero rhythm

- Large dead band between the hero CTAs and the first section — pull hero bottom spacing in so the fold ends with intent and a hint of the next section is visible.
- Hero right-hand Now/Recent/Next panel gets tighter type scale and a real baseline grid alignment with the headline, so the two columns feel composed rather than stacked next to each other.
- Reduce body line-height slightly (`lede` and card copy currently run loose at wide measures) and cap paragraph measure so lines break in a designed place.

## 4. Consistency across the other pages

- Apply the same image-forward card treatment to `/work`, `/about` related work, and service-page related work so the shell reads as one system.
- Standardize the closing CTA block: left-aligned editorial framing with a rule above it instead of a centered stack, matched on every page that uses `GlobalCTA`.
- Normalize section-header alignment: home currently mixes left-aligned chapter headers with one centered one. Pick left-aligned everywhere except the closing CTA.
- Sweep for remaining one-off spacing values so every section lands on the standard `py-24` / `mb-16` / `gap-8` rhythm.

## Technical notes

- Files touched: `src/pages/Home.tsx`, `src/components/ClientLogos.tsx`, `src/components/CaseStudyCard.tsx`, `src/components/RelatedCaseStudies.tsx`, `src/components/GlobalCTA.tsx`, `src/components/PageHero.tsx`, `src/pages/Work.tsx`, `src/index.css` (type/measure tokens only).
- All new values go through existing semantic tokens — no hardcoded hex/HSL, so `scripts/check-tokens.mjs` keeps passing.
- Case-study images get explicit dimensions plus `loading="lazy"` / `decoding="async"` below the fold; the hero stays text-first so LCP is unaffected.
- No copy rewrites, no content invention, no routing or backend changes. SEO markup, schema, and metadata untouched.
