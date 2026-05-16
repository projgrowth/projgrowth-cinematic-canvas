## Replace hardcoded glow shadow with accent token

In `src/index.css`, update the `--shadow-glow-accent` token to use the design system's accent variable instead of a hardcoded RGBA value.

**Change (single line in `:root`):**

```css
/* before */
--shadow-glow-accent: 0 8px 40px -10px rgba(68, 160, 120, 0.15);

/* after */
--shadow-glow-accent: 0 8px 40px -10px hsl(var(--accent) / 0.15);
```

No other files or tokens are touched.