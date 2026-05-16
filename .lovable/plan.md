## Swap `rounded-xl` for `rounded-lg` (token radius)

Tailwind's `xl` radius is not in our design tokens; `rounded-lg` maps to `--radius-lg` (1.5rem). Replace all 3 occurrences:

- `src/pages/CaseStudyDetail.tsx:239` — outer "What changed" gradient card
- `src/components/BentoCaseStudyCard.tsx:52` — card root
- `src/components/BentoCaseStudyCard.tsx:196` — inner glow overlay

Single string replacement `rounded-xl` → `rounded-lg` in those two files. No other changes.