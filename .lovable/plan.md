## Goal
Remove the fabricated testimonials section site-wide. No replacement for now.

## Changes

1. **`src/pages/Home.tsx`** — remove `<TestimonialsCarousel />` usage and its import.
2. **`src/pages/Services.tsx`** — same.
3. **`src/pages/services/ContentCreation.tsx`** — same.
4. **Delete** `src/components/TestimonialsCarousel.tsx`.
5. Verify no other references remain (`rg TestimonialsCarousel`).

## Out of scope
- No replacement section, no schema work, no design changes.
- A future "verified testimonials" build is a separate task when real quotes are collected.
