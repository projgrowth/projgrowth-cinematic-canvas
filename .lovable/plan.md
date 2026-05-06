
# Discovery v3 — "Vision Session"

Reimagine `/discovery` so it stops feeling like a form and starts feeling like a guided creative session. Three goals:

1. **Match the site aesthetic** — cinematic dark canvas, dot-grid texture, soft radial glows, Outfit headings, emerald + NM-blue dual-accent system.
2. **Cast the vision with high-fidelity mockups** — every aesthetic choice shown rendered onto realistic surfaces (business card, laptop browser, phone, signage, social avatar) with their actual DBA name, in real time.
3. **Feel personal & interactive** — conversational copy, a named "host," progressive reveals, micro-animations, a running "Vision Board" the prospect builds for themselves, and a closing reveal that sells them on their own answers.

---

## 1. Aesthetic overhaul (whole `Discovery.tsx`)

Replace the white/system-ui look with the site's language:

- Background: `#0a0f14` base + repeating dot grid + two soft radial emerald glows (top-left) and NM-blue glow (bottom-right). Same texture system used elsewhere on the site.
- Typography: `Outfit` for all headings (already loaded), `Inter` for body. Numbered step labels in muted emerald (`hsl(155 42% 49%)`), question headlines large (text-3xl/4xl on desktop).
- Surface cards: `rgba(255,255,255,0.03)` with `0.5px` border `rgba(255,255,255,0.08)`, soft inner highlight on selection (NM blue 1.5px ring + faint emerald glow).
- Accents: NM Blue for "selected / locked / compliance," emerald for "your progress / your vision." Two-color system reinforces *NM-compliant + ProjGrowth-crafted*.
- Motion: framer-motion route + step transitions (fade + 8px y-rise, 250ms), tile selection scale 0.98→1, progress bar gradient sweep.
- Mobile: collapse to single column, larger 44px touch targets, sticky bottom Continue button.

A new `DiscoveryShell` wraps every screen with the dot-grid + glow + max-w container, so the experience reads as one continuous canvas instead of a stack of forms.

---

## 2. Hi-fi mockup system (new `src/pages/discovery/mockups/`)

Replace the small inline 68px tiles with a reusable `<Mockup variant="…" form={form} name={dba} />` component family rendered in **SVG** (crisp, fast, no images needed). Variants:

- `BusinessCard` — front + back, NM lockup top-left, DBA lockup centered, accent rule.
- `LaptopBrowser` — Mac-style chrome, hero with DBA wordmark + tagline, NM compliance footer.
- `Phone` — IG/LinkedIn profile with circular avatar derived from mark + accent, bio uses their pitch.
- `OfficeSignage` — exterior wall sign on dark concrete photo gradient, dimensional letters.
- `EmailSignature` — realistic Gmail thread mock with their lockup at the bottom.
- `SocialPost` — square card with emerald accent bar + DBA wordmark + their actual `vision` line.

All mockups read from a single `BrandSpec` derived from the form (mood + typo + density + tone + mark + accent + nmLean + dbaName). One source of truth, six surfaces.

These mockups appear in three places:

a. **Inside choice tiles** (mood/typo/tone/mark/density/accent/nmLean) — instead of the abstract 68px boxes, show a *miniature business card* per option so the user sees their own name on each option immediately. ~140px tall, still grid-3.

b. **A persistent right-rail "Vision Board"** (desktop only, ≥1024px) that lives next to the form and updates live as they answer — showing card → laptop → phone → signage. They literally watch their brand assemble.

c. **A full-bleed "Reveal" screen** between the form and Submit (see §5).

---

## 3. Conversational personalization

Make it feel like Cole (or whoever sent the link) is in the room.

- Landing screen: "Hi {firstName} — I'm Cole at ProjGrowth. Northwestern Mutual sent you here because you're thinking about your brand. Next 6 minutes are about *you*, not a form." Animated typewriter on the headline.
- Each question gets a short, human one-liner from the host above the question label, e.g. *"Quick gut check — no wrong answer here."* Stored as a `host:` field on each step config so it's easy to tune.
- Replace the "Step 3 / 14" with a chapter system: **Chapter 01 — Who you are · Chapter 02 — How it should feel · Chapter 03 — What it should look like · Chapter 04 — What it has to do.** Tiny chapter title sits above the progress bar; the bar segments by chapter.
- A subtle "Cole's note" callout appears 2–3 times during the flow (after big inputs) reflecting back what they said: *"Got it — analytical, local, built to last. That already rules out half the directions."* Pure pattern-matched strings, no AI call needed, but they feel seen.

---

## 4. Interaction polish

- **"This or that" steps** become full-width split panels with the two mockups side-by-side at large size; clicking one slides it forward and dims the other.
- **Mood step**: 6 mockups in a 2×3 hi-fi grid, each a real business-card render, hover lifts 4px with emerald underglow.
- **Personality axes**: replace 5 stacked cards with a single **interactive slider per axis** (Head ←→ Heart, etc.) with live label morphing. Faster, more playful, still captures the same data.
- **Reference logos**: replace the colored text buttons with proper SVG-rendered approximations of each brand mark in a dark gallery; tapping flips the card to show *what we'd take from it*.
- **Upload references**: drag-and-drop zone styled to match site, thumbnail previews, remove button.
- **Accent color**: live-updates the right-rail Vision Board the instant they pick.
- **Keyboard**: Enter to advance, ←/→ to navigate, 1–9 to pick options. Tiny hint shown once.
- **Save & resume**: keep existing localStorage but add a "We saved your progress — pick up where you left off?" prompt if they return.

---

## 5. The Reveal (new screen, before Submit)

After the last question and before the Submit button, insert a cinematic **"Here's what you just told us"** screen. Single page, full bleed:

- Big Outfit headline: *"This is {DBA}."*
- Their **business card** mockup centered, large (≈420px wide), with subtle parallax tilt on mouse-move.
- Below it, three more surfaces in a row (laptop / phone / signage), each labeled.
- A short generated paragraph using `genBrief()` rewritten into 2nd person: *"You want a brand that feels established but forward, with quiet authority. It lives on serif typography, an icon + wordmark system, and a gold accent on top of NM Blue. Above all, it has to feel timeless."*
- Two buttons: **"Refine an answer"** (jumps back into the flow at a chosen step) and **"Send this to Cole →"** (Submit).

This is the "sold on their own vision" moment.

---

## 6. File structure

```text
src/pages/Discovery.tsx                 (slim shell + state, ~200 lines)
src/pages/discovery/
  DiscoveryShell.tsx                    (bg, glows, dot grid, max-w wrapper)
  Landing.tsx
  Reveal.tsx                            (new)
  Thanks.tsx
  steps/                                (one file per step id, exports a Step component + canAdvance)
    DbaName.tsx, Pitch.tsx, Diff.tsx, Audience.tsx, Adjectives.tsx,
    NmLean.tsx, Touchpoints.tsx, Personality.tsx, Typo.tsx, Density.tsx,
    Tone.tsx, Mood.tsx, Mark.tsx, Accent.tsx, References.tsx, Avoid.tsx,
    Vision.tsx, Truth.tsx, SvcWebsite.tsx, SvcContent.tsx, SvcAds.tsx,
    SvcPrint.tsx, SvcTimeline.tsx
  mockups/
    types.ts                            (BrandSpec)
    deriveSpec.ts                       (Form → BrandSpec)
    BusinessCard.tsx, LaptopBrowser.tsx, Phone.tsx, OfficeSignage.tsx,
    EmailSignature.tsx, SocialPost.tsx
  VisionBoard.tsx                       (right-rail live preview)
  ChapterBar.tsx                        (chapter-segmented progress)
  HostNote.tsx                          (Cole callout)
  ui.tsx                                (OCard, Chip, Q, TA, TxtInput restyled dark)
```

The current 905-line `Discovery.tsx` is broken up so each step is independently editable and the mockup system is reusable.

---

## 7. Backend / data

No schema changes required — the existing `discovery_submissions` table and `submit-discovery` edge function already capture everything. Two small additions:

- Send the rendered Reveal copy (the 2nd-person paragraph) as a new `vision_summary` field in the submission payload so it appears verbatim in the admin email and `/admin/leads`.
- Add an optional `host_slug` query param (`/discovery?host=cole`) so the landing screen can address the prospect from a specific ProjGrowth contact. Defaults to "the ProjGrowth team."

These two are stored inside the existing `responses` JSONB — no migration.

---

## 8. Out of scope (intentionally)

- No new dependencies beyond `framer-motion` (already in the project — confirmed during exploration).
- No image assets to ship — every mockup is SVG/CSS so it stays crisp and the prospect's name renders in real time on any device.
- No changes to admin dashboard rendering beyond the new `vision_summary` line.

---

## Acceptance

- `/discovery` matches the dark cinematic aesthetic of the rest of the site.
- Every aesthetic choice shows the prospect's actual DBA name on a realistic surface.
- Desktop ≥1024px shows a live Vision Board that updates as they answer.
- A Reveal screen appears before Submit, showing 4 hi-fi mockups + a personalized paragraph.
- Flow still respects the Confidence Gate (Clear / Guided / Discovery) and service router.
- All NM compliance constraints (NM Blue locked, NM lockup primary, NM_LEAN options) preserved.
