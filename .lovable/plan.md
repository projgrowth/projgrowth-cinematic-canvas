
## Context

Every scanner finding is currently **passing or fixed** — no failing rows to chase. This plan takes the SEO surface from "meets checks" to "structurally clean and locally optimized" via five targeted upgrades. All changes stay in `index.html`, `src/components/SEO.tsx`, `src/components/Layout.tsx`, service/blog/case-study pages, and `scripts/generate-sitemap.ts`.

## 1. Deduplicate head metadata (index.html vs Helmet)

Right now `index.html` and `SEO.tsx` both emit `<title>`, description, `og:*`, `twitter:*`, and `<link rel="canonical">`. `<meta>` tags dedupe by name — fine — but **`<link rel="canonical">` does not**, so every route ships two canonicals (one hardcoded to `https://projgrowth.com`, one from Helmet). Fix:

- Remove `<link rel="canonical">` from `index.html` — Helmet owns it per route.
- Keep the sitewide `og:*` / `twitter:*` in `index.html` as fallbacks for non-JS crawlers (LinkedIn, Slack, Facebook).
- Remove the `<meta name="keywords">` tag from `SEO.tsx` — Google ignores it and it just adds noise.
- Fix `og-image.jpg` vs `og-image.png` mismatch: the ProfessionalService schema uses `.png` while everything else uses `.jpg`; standardize on the one that actually renders.

## 2. Split JSON-LD by page type

`SEO.tsx` today injects `Organization` + `ProfessionalService` on **every** page, which duplicates schema Google only wants once. Restructure:

- **`Organization`** — move to a single `<script>` in `index.html`. Ships once, sitewide, for crawlers that don't execute JS.
- **`LocalBusiness` / `ProfessionalService`** — render only on `/` and `/about`. Add Orlando specifics: `address.addressLocality: "Orlando"`, `addressRegion: "FL"`, `geo` block with lat/long, `areaServed: "Orlando, FL"`. Aligns with the Orlando local-SEO memory.
- **`Service` schema** — add per-service `Service` JSON-LD inside `ServiceTemplate.tsx` (name, description, provider → ProjGrowth, areaServed → Orlando).
- **`Article` schema** — verify `BlogPost.tsx` emits `Article` with `headline`, `datePublished`, `author`; add if missing.
- **`BreadcrumbList`** — already emitted; keep but suppress on `/`.
- **`FAQPage`** — services already have FAQ arrays; wrap them in `FAQPage` JSON-LD in `ServiceTemplate.tsx`.

## 3. Dynamic sitemap for blog + case studies

`public/sitemap.xml` is hand-edited and lists only the 12 static routes. Blog posts and case studies (dynamic content under `/blog/:slug` and `/work/:slug`) are invisible to search engines via the sitemap.

- Create `scripts/generate-sitemap.ts` that fetches published rows from the blog + case-study tables via the Supabase anon client (mirroring the loaders on those pages) and merges them with the static route list.
- Wire it as `predev` and `prebuild` in `package.json`.
- Keep `BASE_URL = "https://projgrowth.com"`.

## 4. Orlando local SEO signals

Memory says target Orlando local SEO. Current tags say `geo.region: "US"`, `geo.placename: "United States"`. Sharpen:

- `<meta name="geo.region" content="US-FL">`, `<meta name="geo.placename" content="Orlando">`, `<meta name="geo.position">` and `<meta name="ICBM">` with Orlando coordinates in `index.html`.
- LocalBusiness schema (item 2) already covers the structured half.

## 5. Cleanup + minor fixes

- Delete the placeholder GA4 block (`G-XXXXXXXXXX`) in `index.html` — it's guarded in JS but still ships two script requests. Replace with a real ID or remove entirely (ask on approval).
- Set `Layout`'s default `dynamicOg` to `false`. Right now every page without an explicit `ogImage` hits the OG edge function on every crawl — fragile and slow. Fall back to the static `/og-image.jpg`; opt in to `dynamicOg` per-page (BlogPost, case studies).
- Remove `"@type": "PostalAddress"` stub with only `addressCountry` — replace with the full Orlando address above.

## Technical file map

```text
index.html                              → remove canonical, add Organization JSON-LD, sharpen geo tags, resolve GA4 placeholder
src/components/SEO.tsx                  → drop keywords meta, drop per-page Organization+ProfessionalService, keep only Breadcrumb
src/components/Layout.tsx               → default dynamicOg=false
src/pages/Home.tsx                      → mount LocalBusiness JSON-LD (Orlando)
src/pages/About.tsx                     → mount LocalBusiness JSON-LD (Orlando)
src/components/services/ServiceTemplate → add Service + FAQPage JSON-LD
src/pages/BlogPost.tsx                  → verify/add Article JSON-LD, keep dynamicOg=true
src/pages/CaseStudy.tsx (if exists)     → verify/add Article JSON-LD, keep dynamicOg=true
scripts/generate-sitemap.ts             → NEW: dynamic sitemap generator
package.json                            → add predev/prebuild hooks
public/sitemap.xml                      → becomes generated output
```

## Out of scope

- Content rewrites, copy changes, new pages.
- Anything under `/rgc` (per memory).
- The Google Search Console connector flow — already fixed and awaiting rescan.

## Question before I build

Do you want me to **remove the placeholder GA4 block entirely** (cleanest), or leave the tag in and swap in a real Measurement ID you'll paste? If you have a real GA4 ID handy, share it and I'll drop it in.
