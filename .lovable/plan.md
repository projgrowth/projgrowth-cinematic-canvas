# Homepage premium silver redesign

## Goal
Rework the homepage into a bespoke, sleek silver studio presentation inspired by the supplied ProjGrowth 2026 reference, without copying its composition. Keep the current truthful content and SEO foundation, use Space Grotesk with DM Sans, and leave `/rgc` untouched.

## What the audit confirmed
- The current opening is clean but visually quiet: the headline, small status column, and large unused field do not demonstrate the studio’s visual capabilities.
- The services area relies on four nearly identical dark cards, while later sections repeat the same eyebrow, heading, paragraph, and divider pattern. This makes the page feel systematic rather than art-directed.
- Emerald currently carries labels, headlines, buttons, borders, and hover states. The reference uses brighter neutral contrast and sparse accenting, which gives it a more polished, object-like finish.
- The selected-work area can only show fallback logo plates for several featured projects because their configured case-study images are absent. The existing logos are usable, but they need purpose-built compositions rather than generic fallback plates.
- The homepage currently runs through six substantial sections. The repeated introductions and long vertical rhythm dilute the strongest proof.
- Global styles still contain broad heading rules, fluid viewport-scaled type, negative letter spacing, hardcoded shadow values, and duplicated background textures. These can create inconsistent typography and finish even when individual sections are tidy.

## Design direction
A dark, precision-machined presentation with silver as the dominant material language and emerald reduced to a rare signature detail.

- Near-black canvas, warm-white primary text, layered silver/graphite rules, and controlled metallic highlights.
- Space Grotesk headings and DM Sans body copy, with zero letter spacing and a fixed responsive type ladder rather than viewport-driven font scaling.
- Square-to-subtle-radius surfaces, hairline dividers, crisp alignment, restrained depth, and no repeated floating card grid.
- Real client logos and existing project material become composed editorial artifacts that show capability without inventing screenshots or results.
- Motion stays quiet: line reveals, image/plate masks, and subtle light movement only where it improves hierarchy; reduced-motion behavior remains intact.

## Homepage changes

### 1. Replace the opening composition
- Build a custom near-full-viewport opening with a stronger literal offer: ProjGrowth as the brand signal and a concise web, brand, content, and growth proposition.
- Use a large left-aligned statement, a compact capability index, and one prominent silver project artifact assembled from existing client assets.
- Keep two clear actions, but restyle them as a high-contrast primary action and restrained text action rather than competing green buttons.
- Remove the current availability/status rail and the outdated Q1 availability language.
- Let the next proof strip remain visible at the bottom of common desktop and mobile viewports.

### 2. Turn services into a capability index
- Replace the four equal cards with one continuous ruled list.
- Give each capability a number, title, concise result statement, and compact description.
- Use typography, alignment, and a subtle active line instead of raised boxes and glow shadows.
- Keep every existing service destination and its accessible hit area.

### 3. Lead with visual proof
- Consolidate the current outcomes and selected-work material into a stronger proof sequence.
- Create bespoke project plates for the featured work using the real client logos, project categories, and truthful case-study copy already in the project.
- Use one large featured project and a precise secondary index rather than three interchangeable tiles.
- Preserve links to individual case studies and the full work page.

### 4. Tighten the story
- Keep the strongest strategic-partner points, but reduce four long rows into a more concise editorial manifesto.
- Remove duplicate section introductions where the title and work already explain the section.
- Place client logos as a compact credibility rail instead of a large standalone grid.
- End with the existing global contact invitation, visually aligned with the new silver system.

### 5. Refine the shared design system
- Add semantic silver roles for primary metal, muted metal, metallic line, elevated graphite, and controlled highlight states.
- Replace hardcoded shadow values with semantic HSL-based tokens.
- Establish explicit homepage display, section-title, body, metadata, and link styles using Space Grotesk and DM Sans.
- Remove negative tracking and viewport-scaled font sizing from the homepage path.
- Replace broad transitions and decorative gradients in touched homepage components with property-specific motion and semantic tokens.
- Keep these refinements compatible with shared components, but avoid changing unrelated page composition.

## Technical scope
- Primary files: homepage composition, homepage proof/results presentation, work plates/tiles, client credibility strip, and the semantic tokens used by those pieces.
- Reuse existing routing, case-study data, logos, accessibility helpers, structured data, and metadata.
- No backend, content claims, route, sitemap, or public navigation changes.
- No generated stock imagery and no fabricated project screenshots.
- `/rgc` and its stylesheet remain byte-for-byte unchanged.

## Validation
- Compare the finished homepage against the current capture and the supplied reference at 1440, 1024, 768, and 390 widths.
- Confirm the next section is visible from the opening viewport, all text fits, no horizontal overflow exists, and controls remain at least 44px.
- Verify navigation, project links, service links, keyboard focus, reduced motion, and mobile menu behavior.
- Run the design-token check and inspect for hardcoded component colors, broad transitions, missing assets, console errors, and failed requests.
- Confirm the build succeeds, homepage SEO remains intact, and `/rgc` checksums are unchanged.
