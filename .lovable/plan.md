# Premium homepage refinement

## Goal

Make the ProjGrowth homepage feel like the work of a high-end digital studio: confident, current, image-forward, and highly composed. Preserve the existing dark identity, emerald signature, real content, routes, and SEO while removing anything that reads as a template or visual gimmick.

## Design direction

- Keep the carbon-black foundation and use emerald as a precise signal, not a repeated decoration.
- Retain the current type family, but create stronger contrast through scale, width, weight, and spacing rather than introducing a fashionable serif or novelty font.
- Favor editorial asymmetry, fine rules, open space, and strong project imagery over floating cards, glow, and decorative UI.
- Make every section visually distinct while keeping one shared grid, spacing rhythm, and interaction language.

## Homepage changes

### 1. Turn the opening into a stronger first impression

- Preserve the headline and main calls to action, but give the headline more room and a more deliberate line composition.
- Simplify the right-side availability information into a compact project-status index aligned to the page grid.
- Reduce competing green text and decorative effects so the eye lands on the positioning statement first.
- Keep the next section visible at common desktop and mobile heights.

### 2. Replace the service-card grid with an editorial capability index

- Remove the four floating, similarly weighted cards.
- Present services as a ruled, numbered system with a stronger title/outcome relationship and a quiet directional interaction.
- Use one featured service treatment or controlled stagger to avoid a repetitive four-box template.
- Keep every service link obvious and keyboard accessible without adding icons or ornamental badges.

### 3. Make real work the visual centerpiece

- Move selected work earlier in the narrative so visitors see proof before extended agency messaging.
- Use one large lead project and two supporting projects with consistent image crops and aligned metadata.
- Resolve the current missing project-image paths with deliberate project visuals or branded fallback plates, avoiding broken-image flashes.
- Keep project interactions limited to image scale, rule movement, and text-color changes.

### 4. Tighten outcomes and process

- Keep only claims already supported by existing content.
- Present outcomes as concise proof lines rather than another card or statistic dashboard.
- Convert “How We Work” into a calm, compact sequence with stronger hierarchy and less explanatory density.
- Vary section composition so labels, headings, and descriptions do not repeat in the same arrangement throughout the page.

### 5. Refine client proof and closing call to action

- Give client logos more breathing room while preserving their original colors and accessible names.
- Reduce the visual weight of the logo field so it supports the work rather than competing with it.
- Recompose the final call to action as a decisive editorial close using one clear action and restrained supporting copy.

## Design-system cleanup

- Consolidate homepage colors, borders, radii, shadows, tracking, and motion around existing semantic tokens.
- Remove raw shadow colors, broad `transition: all`, unnecessary force modifiers, and overlapping hover rules from primitives used on the homepage.
- Use one architectural radius scale; avoid pills except where their shape communicates a specific control.
- Keep a true 12-column grid at every breakpoint and adjust spans, gaps, and stacking intentionally for 1440, 1024, 768, and 390 pixel widths.
- Keep emerald glow exceptionally rare; use borders, contrast, and typography for most hierarchy.
- Respect reduced-motion preferences and retain visible focus states and 44px minimum touch targets.

## Technical scope

- Refine the homepage and the shared presentation primitives it directly uses: navigation, services, work tiles/plates, client proof, global call to action, and footer.
- Preserve existing copy claims, public routes, forms, backend behavior, structured data, metadata, and sitemap behavior.
- Keep `/rgc` and its stylesheet byte-for-byte unchanged.
- Avoid new heavy dependencies and avoid adding decorative images that do not demonstrate real work.

## Validation

- Compare the finished homepage at 1440, 1024, 768, and 390 pixels for hierarchy, wrapping, overflow, and section pacing.
- Verify navigation, service links, project links, calls to action, keyboard focus, reduced motion, and image fallbacks.
- Run the project’s token checker and tests, inspect browser console/network failures, and confirm the production build is clean.
- Confirm `/rgc` remains unchanged and representative non-home pages have not regressed where shared primitives are refined.
