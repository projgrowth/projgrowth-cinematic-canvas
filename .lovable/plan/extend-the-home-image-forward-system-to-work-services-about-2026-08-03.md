# Extend the Home image-forward system to Work, Services, About, and Contact

Home now leads with photographic/logo "plates" (`WorkPlate`), an asymmetric editorial grid, chapter marks, and hairline-divided lists. The four other marketing pages still use older patterns: a triple view-switcher on Work, text-only service rows, placeholder counters on About, and two stacked forms on Contact. This pass puts all four on the same visual language and removes what the new system makes redundant.

`/rgc` is untouched.

## Shared piece first

Extract Home's featured-project tile into `src/components/WorkTile.tsx` (plate + category eyebrow + title + subtitle + arrow, with an `aspect` prop). Home, Work, Services proof, and Contact all render this one component, so a plate change lands everywhere at once.

## Work

Becomes a single image-forward editorial index.

- One asymmetric plate grid: first project lead-size, the rest in a two-up rhythm — same composition family as the Home featured block.
- Keep the search field and category filter (both already on the new `.input-field` / pill recipes). Remove the bento/grid/list switcher and the sort dropdown.
- Cards link straight to `/work/:id` instead of opening a slide-over preview, so there is one canonical place a project lives.
- Keep the empty state and the "showing X of Y" count.

## Services

Keeps the numbered hairline rows (that pattern already matches Home's "How We Work") and gains proof imagery.

- Each discipline row gets a plate in its right-hand column showing a real client from that discipline, so the page reads visually instead of as four blocks of text.
- Add the existing `RelatedCaseStudies` proof block above the process timeline.
- Drop the `LeafDivider` here so the page keeps to one divider rule.

## About

- Replace the placeholder counter row (9 / 5 / 3+, flagged as unverified in the code) with a client plate row built from real logos — no invented numbers.
- Convert the three "Values" cards into the hairline numbered list Home uses for "How We Work", so About and Home share one rhythm.
- Add a two-up plate block linking to two case studies under the mission statement.

## Contact

- Give the hero a right-hand column mirroring Home's editorial panel: response time, email, and one linked recent project.
- Collapse the two stacked forms into one guided form. The quick-message form is removed; the email link stays in the hero for people who just want to write.
- Keep the FAQ accordion, restyled to the hairline rule so it matches the rest of the system.

## Cleanup

With the Work page simplified, these become unused and get deleted: `BentoGrid.tsx`, `BentoCaseStudyCard.tsx`, `CaseStudyCard.tsx`, `CaseStudyCardSkeleton.tsx`, `CaseStudySheet.tsx`, and `QuickContactForm.tsx`. Any leftover CSS in `index.css` tied only to those components is removed with them.

## Notes

- The case-study `image` fields point at `/case-*.jpg` files that are not present in `public/`, so `WorkPlate` currently renders its logo-plate fallback. The plan relies on that fallback path rather than assuming photography exists; if real project photos get added later, the same tiles pick them up with no code change.
- SEO is preserved: titles, descriptions, canonicals, and the FAQ/LocalBusiness/ContactPage JSON-LD all stay as they are. Every project remains reachable through a crawlable `/work/:id` link, which is stronger than the current sheet-only preview.
- After the edits: run the token guard, typecheck, and screenshot all four routes at desktop and mobile to confirm no layout regressions or console errors.