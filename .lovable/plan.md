
## What I found in this audit

Eight specific systemic noise sources, with counts:

1. **25 heading overrides remain.** Most are giant decorative numerals on cards (`text-5xl md:text-8xl`) — those are graphic intentional. But ~10 are structural h3s inside cards that should ride the global clamp: service-page step titles (`font-display text-xl`), CaseStudyCard h3 (`text-xl md:text-2xl`), ProcessTimeline (`text-xl md:text-2xl`), BentoCaseStudyCard h3 (`text-lg md:text-xl lg:text-2xl`).
2. **23 hand-rolled card divs** still write `bg-surface ... border-line ... rounded-lg` instead of `.surface-card` / `<SurfaceCard>`. Result: subtle radius/shadow differences card-to-card.
3. **12 inline anchor "buttons"** with `px-8 py-4 bg-accent text-primary-foreground rounded-md` instead of `<Button variant>`. Across Home, NotFound, CaseStudyDetail, GlobalCTA, ErrorBoundary, all 4 service pages, MultiStepContactForm, Work.
4. **15 different accent/mute opacity tokens** (`/10 /20 /30 /40 /50 /60 /80`). For decorative numerals alone we have `/10 /20 /30 /40 /50` — that single graphic device is rendered 5 different ways.
5. **`leading-relaxed`, `tracking-tight`** sprinkled in service pages — body text already has line-height baked into the global clamp. These overrides cause subtle vertical-rhythm wobble between sections.
6. **`font-medium`** added inline 9 times on buttons that already get medium from the Button variant — no-op noise.
7. **MobileNav SheetTitle** uses `text-2xl font-medium tracking-tight` — h2 in a sheet should match the global h2 clamp.
8. **Contrast risk:** `text-mute/30`, `text-mute/40` on cards. `--mute` is already 55% lightness on a 6%-lightness base; reducing it to 30% opacity means it's ~22% effective lightness on dark — well below WCAG AA for body text. Safe for graphic numerals (decorative), unsafe if used for actual content.

The previous passes locked container/section/spacing/pill vocabularies. This pass locks **typography, color, and component recipes** with the same discipline.

---

## The unified system (one source of truth)

### Type scale — three sizes only (already in `index.css`)

| Element | Token | Range |
|---|---|---|
| Display / Hero | `<h1>` | clamp(36 → 68px) |
| Section | `<h2>` | clamp(26 → 44px) |
| Card / Subhead | `<h3>` | clamp(18 → 26px) |
| Lede / Intro | `.lede` | clamp(16 → 20px) |
| Body | (default) | clamp(14 → 18px) |
| Eyebrow | `.eyebrow` | clamp(11 → 13px), uppercase, +0.18em |
| Decorative numeral | `.numeral-display` (new) | clamp(36 → 80px), accent at fixed `--accent-faint` |

**Rule:** any `<h1|h2|h3|h4>` with `font-display` MUST NOT carry `text-Xxl`. Decorative giant numbers use the new `.numeral-display` recipe — locked size, locked color, locked weight.

### Color tokens — locked opacity ladder

Add to `:root`:
```css
--accent-faint:  hsl(var(--accent) / 0.15);  /* decorative numerals, glows */
--accent-soft:   hsl(var(--accent) / 0.30);  /* hover hints */
--accent-strong: hsl(var(--accent) / 0.60);  /* secondary accent text */
--text-strong:   hsl(var(--text));            /* primary copy */
--text-muted:    hsl(var(--mute));            /* secondary copy */
--text-faint:    hsl(var(--mute) / 0.65);     /* min for non-essential meta */
```

**Rule:** never write `text-accent/27`, `text-mute/40` etc. Pick from `text-text-strong | text-text-muted | text-text-faint | text-accent | text-accent-strong`. Eight Tailwind aliases mapped to those vars.

### Weight, leading, tracking

- Weight: only `font-normal` (default body) and `font-medium` (display/UI). Drop `font-semibold`, `font-bold`, etc. except where shadcn primitives need them.
- Leading: never inline. Body and headings get correct line-height from global CSS.
- Tracking: only via `.eyebrow` recipe. No more inline `tracking-tight | tracking-wider`.

### Spacing rhythm (already locked, restating for clarity)

- Section vertical: `<Section size="sm|md|lg|hero">` only.
- Section header → next element: always `mb-header` (clamp 32→64px). No more raw `mb-12`/`mb-16`.
- Card grid gap: always `gap-cards` (clamp 24→40px).
- Inside cards: Tailwind defaults work now (`p-6`, `gap-3`, `mb-2`).

### Components — one of each

| Surface | Use only | Forbidden |
|---|---|---|
| Section frame | `<Section>` | raw `<section className="container-site …">` |
| Card | `<SurfaceCard>` or `.surface-card` | hand-rolled `bg-surface … border-line … rounded-lg` |
| Button | `<Button variant>` | inline `<a className="px-8 py-4 bg-accent …">` |
| Pill / Badge | `.pill-accent` `.pill-neutral` | hand-rolled `px-3 py-1 bg-accent/10 rounded-full …` |
| Filter chip | `.chip-filter` | hand-rolled toggle pills |
| Page header | `<PageHeader>` | hand-rolled `<div>` with `<h1>` + leaf |
| Glow | `<AmbientGlow>` | inline `radial-gradient` style attrs |

### Visual hierarchy (per-page contract)

Every content page follows the same vertical rhythm:

```text
<Section size="hero">  ← H1 + lede + CTA cluster
<Section>              ← H2 (eyebrow + title + lede via section-header)
<Section>              ← supporting band (cards, list, or media)
<LeafDivider />        ← max once per page
<Section>              ← deeper detail / proof
<GlobalCTA />          ← always last
```

H1 once per page, H2 starts every band, H3 inside cards. Decorative numerals never compete with H2 — capped at `--accent-faint`.

---

## Implementation passes (4 calls)

### Pass A — token additions (1 call: `index.css` + `tailwind.config.ts`)
- Add `--accent-faint/-soft/-strong`, `--text-strong/-muted/-faint` CSS vars.
- Add `.numeral-display` recipe (locked clamp + `--accent-faint`).
- Add Tailwind colors `accent-strong`, `accent-faint`, `accent-soft`, `text-strong`, `text-muted`, `text-faint` so they're class-accessible.

### Pass B — sed sweeps (1 call)
- `font-display text-(lg|xl|2xl)( md:text-(xl|2xl|3xl))?` on h3/h4/SheetTitle → strip the `text-*` portion (keep `font-display`).
- `text-mute/(30|40|50|60)` on **decorative numeral spans** → `text-accent-faint` or `text-mute-faint`.
- `text-accent/(10|15|20|30|40|50|60)` on **decorative numeral spans** → `text-accent-faint` (graphic) or `text-accent-strong` (content).
- Strip `font-medium` from elements that already use Button variant.
- Strip `leading-relaxed` from body paragraphs that inherit correct leading globally.

### Pass C — component adoption (1 call, hand-edit ~8 spots)
- Convert remaining hand-rolled cards on About, Services, Contact info-tiles → `<SurfaceCard>`.
- Convert the 12 inline `<a>` button impostors → `<Button variant="default" asChild>` or `variant="cta" asChild`.
- Replace `MobileNav` SheetTitle override with `<h2 className="font-display">`.

### Pass D — page hierarchy QA (1 call)
- Verify each page has exactly one `<H1>`, every `<Section>` block opens with H2 + lede via `.section-header`.
- Verify `<LeafDivider />` appears at most once per page.
- Verify `<GlobalCTA />` is the last element above `<Footer>` on Home, About, Services, Work, all service sub-pages, CaseStudyDetail.

---

## Outcome

One type scale (3 sizes), one color ladder (6 named tokens), one weight rule, one leading rule, one component for each role. Pages stop fighting the system and start trusting it — which is what makes the difference between "themed" and "designed."
