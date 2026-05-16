## Add Blog to MobileNav `mainLinks`

In `src/components/MobileNav.tsx`, insert a Blog entry into the flat `mainLinks` array (the one currently holding Home / Portfolio / About / Contact — Services is handled separately as an expandable submenu, so "between Portfolio and Services" maps to "right after Portfolio" here).

Use the existing `path` key (not `href`) to match the array's schema.

```tsx
const mainLinks = [
  { path: "/", label: "Home" },
  { path: "/work", label: "Portfolio" },
  { path: "/blog", label: "Blog" },   // new
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];
```

No other changes. The desktop `Navigation.tsx` already has Blog and is untouched.