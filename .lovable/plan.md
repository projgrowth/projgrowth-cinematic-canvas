# Remove "Booking Q1 2026" from the homepage hero

## What changes

The hero eyebrow line above the headline currently reads:

```text
DIGITAL STUDIO · ORLANDO, FL · BOOKING Q1 2026
```

It becomes:

```text
DIGITAL STUDIO · ORLANDO, FL
```

Nothing else moves. The right-side panel ("Now / Recent / Next") keeps its current copy, including the "Accepting 2 new partners for Q1" line.

## Technical detail

- `src/pages/Home.tsx` (line 129): drop the trailing ` · Booking Q1 2026` from the eyebrow text. Styling, animation, and layout stay identical.