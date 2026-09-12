# Homepage premium polish and token cleanup

## Audit findings

The homepage is structurally strong, but several systems currently compete with each other:

- The shared 12-column grid changes to 8, 4, and then 1 column while homepage children still request 12-column spans. This can create implicit columns and unpredictable alignment between phone, tablet, and smaller desktop widths.
- The page repeats the same visual pattern too often: chapter label, split heading, emerald accent, divider rows, and fade-up reveal. The Outcomes and How We Work sections therefore feel more templated than editorial.
- Service cards combine the shared card recipe with page-level hover transforms, glow gradients, borders, icon boxes, and animated rules. Those overlapping effects make the section busier and allow competing hover/shadow rules.
- The global card primitive contains forced `!bg-transparent` variants and overlapping hover/shadow definitions. These are likely sources of styles that override local intent.
- Typography uses several independent tracking values in global headings, eyebrows, navigation, buttons, and section labels. This weakens consistency and can make small uppercase text feel overly spaced.
- The hero layers a dot-grid page background, radial glow, animated growth lines, three separate headline entrances, and a side status panel. Each element is restrained alone, but together they dilute the focal point.
- The featured work area uses a very tall lead plate beside two smaller plates. It is visually strong, but its aspect ratios and metadata density should be normalized so the composition does not feel bottom-heavy.
- Navigation and mobile navigation override shared button radius with pill styling, while the rest of the system uses architectural radii. Footer structure is functional but visually more generic than the homepage above it.
- Several shared utilities use `transition: all`, raw shadow colors, inline visual styles, and Tailwind force modifiers. These make future changes less predictable even where the current page looks correct.

## Implementation plan

### 1. Stabilize the layout system

- Keep `.grid-12` as a true 12-column grid at every breakpoint; adjust only gaps by viewport.
- Audit every homepage span against the stable grid, especially the hero, section introductions, and work layout.
- Preserve existing content order and ensure intentional compositions at 1440, 1024, 768, and 390 widths.

### 2. Simplify the hero

- Keep the current headline, supporting copy, calls to action, and availability information.
- Remove one competing decorative layer and reduce entrance choreography so the headline remains the first visual event.
- Refine the availability panel into quieter editorial metadata with stronger alignment and less accent repetition.
- Keep the hero height controlled so the next section remains visible without crowding mobile screens.

### 3. Reduce repeated section treatments

- Retain the shared chapter marker, but vary composition rather than repeating the same split-heading template in every section.
- Differentiate Outcomes from How We Work: keep Outcomes as concise proof statements and make How We Work a calmer numbered editorial sequence.
- Tighten long headings and descriptions to improve scanability without rewriting the underlying claims.

### 4. Rebuild services around one card recipe

- Remove overlapping page-level glow, border, lift, and rule effects from the service cards.
- Use the established numbered editorial treatment instead of decorative icon boxes, matching the project’s service-card direction.
- Keep one restrained hover cue, one border treatment, and one radius source from the shared primitive.

### 5. Refine featured work and client proof

- Normalize work-tile image framing, metadata spacing, and arrow alignment through the shared `WorkTile`/`WorkPlate` primitives.
- Confirm each featured project resolves directly to a real image or deliberate logo plate without a broken-image flash.
- Make the client-logo field quieter and more consistent while retaining original brand colors and accessible labels.

### 6. Remove token conflicts and forced styling

- Replace `!bg-transparent` and duplicated hover definitions in the shared card primitive with explicit variants.
- Replace `transition: all` with property-specific transitions for buttons, cards, navigation, and icons.
- Move remaining raw shadow and decorative visual values into semantic tokens; keep `/rgc` tokens and styles untouched.
- Consolidate typography tracking into a small semantic set for display headings, body copy, navigation, and metadata.
- Preserve the existing `on-accent` alias that avoids the `text-base` color/font-size collision.

### 7. Align navigation and footer with the quieter system

- Remove radius overrides that conflict with shared controls and use one consistent CTA treatment across desktop and mobile navigation.
- Keep navigation behavior and links unchanged while reducing visual weight.
- Simplify footer hierarchy and spacing so it closes the page like an editorial colophon rather than a generic link grid.

### 8. Validate before completion

- Compare screenshots at 1440, 1024, 768, and 390 pixels for overflow, alignment, text wrapping, and visible next-section content.
- Verify keyboard focus, reduced motion, touch targets, image loading, and all homepage links.
- Run the token checker and build validation, then inspect browser console and network failures.
- Confirm `/rgc` and its stylesheet remain byte-for-byte untouched.

## Scope

This pass changes the homepage and the shared primitives visibly used by it. It does not change copy claims, routes, backend behavior, SEO metadata, or `/rgc`.