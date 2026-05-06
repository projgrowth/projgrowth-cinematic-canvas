## Discovery Tool — Refinement Plan

Goal: deeper brand-meaning capture, clearer mark vs. wordmark exploration, visually distinct references, simplified single-mockup focus (business card), and obvious tap-to-select slider UX. All new fields flow into the existing `discovery_submissions.responses` JSON and the generated brief.

---

### 1. New brand-meaning section (chapter 02 — "What it stands for")

Three new steps inserted before `mood`:

- **`brandValues`** — "What does your brand stand for?" Multi-select chips, max 3. Options: Trust · Growth · Legacy · Innovation · Independence · Community · Discipline · Optimism · Craft · Clarity. Optional custom input.
- **`brandPromise`** — "Finish this sentence: 'When a client works with us, they walk away with ___.'" Short text, 8–140 chars. Used verbatim in generated brief.
- **`brandStory`** — "What's the one belief that drives your practice?" Optional textarea, 200 char max. Feeds the host's read on the Reveal screen.

These fold into the generated brief and PDF so the deliverable to the agency is meaningful, not just visual.

### 2. Clearer mark vs. wordmark exploration

Replace single `mark` step with an upgraded two-step flow:

- **`markStrategy`** — Three-tile chooser (was two): Wordmark only · Icon + Wordmark · Monogram + Wordmark. Each tile renders the user's actual DBA in real time so the difference is visible, not abstract.
- **`iconConcept`** (conditional — only shown when `mark !== "wordmark"`) — "What should the icon evoke?" Chip list: Geometric / Architectural · Natural / Organic · Abstract symbol · Initials-based · Heritage emblem · Not sure — surprise me. Adds genuine direction the design phase can act on.

A short helper line under both: *"This guides the direction. The final icon is hand-crafted."*

### 3. Distinct visual references

Current `REF_STYLE` is good but several tiles look similar (multiple gold-on-dark serifs). Audit:
- Diversify color: ensure each reference uses a visually distinct palette.
- Diversify typography: alternate serif/sans/mono/display.
- Diversify case + tracking so no two tiles read the same at a glance.
- Add 2 more contrasting references: a sans-serif geometric mark and a script/handwritten — extending REFS to ~14 with no duplicates of feel.

### 4. Single mockup focus — Business Card only

Currently the right-rail "Vision Board" shows **BusinessCard + Storefront**, and the Reveal shows **BusinessCard + Laptop + Storefront + Phone** — too much speculation, especially when the brand isn't built yet.

- Right rail: keep **BusinessCard only**, larger (size 1.0 instead of 0.85). Remove Storefront.
- Reveal: keep the **hero BusinessCard at 1.4×** and remove the 3-up surface row. Replace with a single tasteful "What this might extend to" caption listing surfaces (website, signage, social) without rendering them.
- Disclaimer copy gets a small rewrite to match: *"This card is a directional preview using your real DBA. Your final identity is hand-crafted in design phase."*

### 5. Slider UX — make tap-to-select obvious

The current `AxisSlider` looks like a draggable slider but only responds to tapping the labels. Fixes:
- Change the visual: replace the slider track + dot with **two large segmented buttons** (left/right) joined by a thin divider. Selected side fills with emerald + bold weight.
- Add micro-instruction at top of personality step: *"Tap the side that feels closer. No middle ground — pick a lean."*
- Remove the dot/track entirely so users don't try to drag.
- Keep the same data shape (left value or right value) so backend/brief logic is unchanged.

### 6. Backend wiring

Schema is already `responses jsonb` so no migration is needed — the new fields (`brandValues`, `brandPromise`, `brandStory`, `iconConcept`) automatically persist. Updates required:

- `genBrief()` and `visionSummary()` in `Discovery.tsx` — incorporate `brandPromise` (verbatim quote) and `brandValues` (top 3) into the generated paragraph.
- `brandBriefPdf.ts` — render a new "What it stands for" section above visual choices, including the values, promise, and belief. Verify PDF still fits.
- `submit-discovery` edge function — already passes `responses` through unchanged; no edits needed. Confirm by reviewing the function body.
- Admin Leads view — `responses` JSON already renders generically, but confirm the new keys appear in the readout.

### 7. Step plan updates

Add new steps to the existing plans in `Discovery.tsx`:
- `LOGO_STEPS_FULL`: insert `brandValues, brandPromise, brandStory` after `adjectives`; insert `iconConcept` after `mark` (conditional).
- `LOGO_STEPS_GUIDED`: insert `brandValues, brandPromise` after `adjectives`; conditional `iconConcept`.
- `LOGO_STEPS_CLEAR`: insert `brandPromise` only (keeps it short).

Update `CHAPTER` map and the chapter labels:
- Chapter 01: Who you are
- Chapter 02: **What you stand for** (was "How it should feel")
- Chapter 03: How it should feel
- Chapter 04: What it looks like
- Chapter 05: Where it lives

### Files to edit

```text
src/pages/Discovery.tsx          — new steps, slider rewrite, plan/chapter map, brief/summary updates
src/pages/discovery/mockups/index.tsx  — minor tweaks if mark variants need a monogram render
src/pages/discovery/brandBriefPdf.ts   — add "What it stands for" section
```

No DB migration. No edge-function changes. No new secrets.

### Out of scope (deliberate)

- Storefront / Phone / Laptop mockups stay in code but aren't surfaced in v2 UI. Easy to re-enable later.
- No AI-generated logo previews — keeps deliverable honest.
- No new analytics events.
