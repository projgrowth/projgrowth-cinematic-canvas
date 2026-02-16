

# Logo and Color Integration Plan

## Overview
Integrate the new PG leaf logo and shift the site's accent color from ice blue to a refined emerald green, applied consistently across the entire design system while preserving the premium dark agency aesthetic.

---

## 1. Color System Update

Update the single CSS variable `--accent` in `src/index.css` from the current ice blue to a refined emerald green:

- **Current**: `--accent: 200 45% 58%` (ice blue)
- **New**: `--accent: 155 42% 49%` (emerald green -- sophisticated, slightly cool-toned, premium on dark backgrounds)
- **Accent-alt**: shift from `220 40% 55%` to `165 35% 42%` (deeper complementary green)
- **Glow shadow**: update `--shadow-glow-accent` RGB values to match the new emerald tone
- **Gradient**: update `--gradient-accent` stops to emerald hues

Because every component already references `hsl(var(--accent))`, the entire site (buttons, hover states, links, icons, borders, CTA, scroll progress bar, page loader) will update automatically with this single CSS change. No per-component edits needed for color.

---

## 2. Logo Asset Integration

- Copy `PG_Web_Logo.png` into `src/assets/logos/pg-logo.png` for component imports
- Also copy to `public/logos/pg-logo.png` for use in meta tags, OG images, and favicon contexts

---

## 3. Navigation -- Logo Mark + Text Wordmark

Update `src/components/Navigation.tsx`:
- Import the leaf logo image
- Render a ~28px leaf icon alongside the existing "ProjGrowth" text
- Small gap between icon and text (gap-2)
- Logo gets a subtle hover opacity transition

---

## 4. Footer Branding

Update `src/components/Footer.tsx`:
- Add the leaf logo mark next to the "ProjGrowth" text in the footer brand section
- Same sizing approach as nav (~24px icon)

---

## 5. Mobile Nav

Update `src/components/MobileNav.tsx`:
- Add leaf logo in the sheet header next to "Menu" or replace with logo + "ProjGrowth"

---

## 6. Page Loader

Update `src/components/PageLoader.tsx`:
- Replace the text "PG" spinner with the actual leaf logo image
- Keep the existing pulse animation wrapping it
- Loading bar color updates automatically via accent variable

---

## 7. OG Image Edge Function

Update `supabase/functions/og-image/index.ts`:
- Change `ACCENT_RGB` from blue values to the new emerald green RGB equivalent (~`68, 160, 120`~)
- Update the "PG" text block to reference the new brand color

---

## 8. Favicon

Replace `public/favicon.png` with a version of the leaf logo optimized for small sizes (the uploaded logo works well as a favicon given its simple shape)

---

## Technical Details

### Files Modified (8 files)
1. `src/index.css` -- accent color variables (1 line change + shadow/gradient updates)
2. `src/components/Navigation.tsx` -- add logo image import + render
3. `src/components/Footer.tsx` -- add logo image
4. `src/components/MobileNav.tsx` -- add logo image in sheet header
5. `src/components/PageLoader.tsx` -- replace "PG" text with logo image
6. `supabase/functions/og-image/index.ts` -- update accent RGB constant
7. `public/favicon.png` -- replace with leaf logo

### Files Copied (2 operations)
- `user-uploads://PG_Web_Logo.png` to `src/assets/logos/pg-logo.png`
- `user-uploads://PG_Web_Logo.png` to `public/logos/pg-logo.png`

### What stays the same
- All component structure, layout, spacing, and animations remain untouched
- The dark cinematic base palette (base, surface, text, mute, line) stays identical
- Typography system unchanged
- Every existing `text-accent`, `bg-accent`, `border-accent` reference automatically picks up the new green -- zero per-component color edits needed

