# Private Client Gateway — Golinowski Law Website Rebuild

A single, quiet, editorial page at `/client/golinowskilawrebuild` where Jordan enters an access code and is sent to the review destination. Nothing else: no dashboard, no progress tracking, no comments.

## What the page looks like

One full-height composition, left-aligned editorial type, hairline rules, deep negative space, no cards or shadows.

```text
PROJECT GROWTH                        (wordmark, existing brand mark)
-------------------------------------------------------
PRIVATE CLIENT REVIEW
Golinowski Law
Website Rebuild

Enter your private access code to continue.

Access Code
[____________________]
ENTER REVIEW  ->

-------------------------------------------------------
PROJECT GROWTH / CLIENT EXPERIENCE
```

Existing brand tokens only (emerald accent, Outfit wordmark, dot-grid canvas). Uses the site's existing type and spacing tokens, no new global styles. Deliberately laid out for 1440 / 1024 / 768 / 390 — on mobile the form sits in the first screen, 16px input text, 44px+ targets.

Interaction detail: visible label, real form, keyboard submit, `autocomplete="current-password"`, focus ring from the existing token set, inline `role="alert"` error, and a restrained ~200ms fade before the redirect (skipped under reduced-motion).

## Security model

The code is never in the frontend. A backend function is the only thing that knows the code or the destination.

- Secrets stored in the backend secret store: `GOLINOWSKI_REVIEW_PASSWORD` (stored as a bcrypt hash) and `GOLINOWSKI_REVIEW_URL`.
- The page loads with no knowledge of either. Submitting posts the code to the function; the destination URL is returned **only** on a correct code, then the browser navigates there.
- Wrong code returns a bare 401 with no project detail; the page shows "Access code not recognized."
- Rate limiting: per-IP attempt counter in a backend table — after 5 failures in 10 minutes, further attempts are rejected with a neutral "Too many attempts. Please try again shortly."
- No stack traces or backend messages surface; any failure shows one clean generic line.

Session note: this stack is a static single-page app with the backend on a separate origin, so an HttpOnly session cookie cannot be read by the app and would add machinery without adding protection. Since the gateway's only job is to hand over one destination, verify-then-redirect is the smaller and stronger design — nothing protected is ever sent before authorization, and there is no client-side session to forge. If you later want a persistent session (returning without re-entering the code), that's a follow-up.

## Holding state

If `GOLINOWSKI_REVIEW_URL` isn't set yet, a correct code reveals a polished holding panel in the same visual language:

> GOLINOWSKI LAW — Website Review
> "Your private review is being prepared. Please return using this same link shortly."

No development URL is ever shown.

## Privacy

- `noindex, nofollow` on the route, outside the site's shared layout so it carries no navigation, breadcrumbs, or footer links.
- Excluded from `sitemap.xml` and the sitemap generator script; `/client/` disallowed in `robots.txt`.
- No link anywhere in public navigation. No `/client` index route — anything else under `/client` falls through to the normal 404.

## Reusability

Verification lives in one backend function keyed by a client slug, so a second client review route later means adding two secrets, not new logic.

## Technical notes

- New route `/client/golinowskilawrebuild` in `App.tsx`, rendered raw (no `Layout`, no breadcrumbs, no global CTA).
- New page `src/pages/client/ReviewGateway.tsx` plus a small `src/pages/client/gatewayCopy.ts` for the client-specific strings.
- New edge function `supabase/functions/client-review-access/index.ts`: bcrypt compare against the stored hash, per-IP throttle, returns `{ status: "ready", url }` or `{ status: "pending" }`.
- New table `client_access_attempts` (IP hash, timestamp) with RLS enabled, no anon/authenticated grants — service role only.
- Secrets requested via the secure form after the function is deployed.
- `/rgc` and all other pages untouched.

## About the destination's own privacy

Once you send the review URL I'll check whether it is publicly reachable on its own. If it is, this gateway hides the link but not the site — I'll tell you plainly and recommend the simplest protection available for that destination.

## QA before I call it done

Password absent from the built bundle; unauthenticated page payload contains no destination URL; wrong code fails; correct code works; missing URL shows the holding state; mobile 390 and desktop 1440 layouts checked in a real browser; keyboard-only pass; noindex, sitemap exclusion, and no public link confirmed.
