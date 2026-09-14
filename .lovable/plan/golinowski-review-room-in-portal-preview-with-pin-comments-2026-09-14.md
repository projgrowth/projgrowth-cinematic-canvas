# Golinowski Review Room — in-portal preview with pin comments

Turn the existing private gateway into a review room. After Jordan enters his code, instead of being redirected away, he lands on a quiet Project Growth review screen holding a realistic phone and desktop presentation of `https://golinowskilawv1.lovable.app`, where he can browse freely, switch on comment mode to pin a spot, and leave a note. Every note emails you and appears in a private admin list you can work through.

## What Jordan sees

```text
PROJECT GROWTH                                  DESKTOP | MOBILE
GOLINOWSKI LAW / WEBSITE REVIEW                 [ COMMENT MODE ]
------------------------------------------------------------------
PAGE:  Home  Practice Areas  Attorneys  Contact

        +----------------------------------------+
        |                                        |
        |   realistic device frame with the      |
        |   live site inside                     |
        |            (2)                         |
        |                                        |
        +----------------------------------------+

YOUR NOTES (3)
1  Home — "Make the headline larger"          Sent
2  Home — "Swap this photo"                   In progress
------------------------------------------------------------------
PROJECT GROWTH / CLIENT EXPERIENCE
```

- **Desktop view**: a thin-bezel monitor frame; the site renders at full desktop width and is scaled down to fit, so it looks exactly as it will on a laptop.
- **Mobile view**: an iPhone-proportioned frame at true phone width, rounded corners, subtle hairline bezel — no cartoon glossy mockup.
- **Browse mode (default)**: he clicks and scrolls the real site normally.
- **Comment mode**: browsing pauses, the cursor becomes a crosshair, and clicking a spot opens a small note field. Saving drops a numbered pin. His own pins stay visible for that page and device.
- **His notes list** under the frame, each with your status (Sent / In progress / Done), so he can see things are moving.
- Same brand language as the gateway: dark canvas, hairline rules, Outfit wordmark, emerald accent, no cards or shadows. Designed at 1440 / 1024 / 768 / 390 — on a phone the frame fills the width and the note field sits above the keyboard.

## What you get

- An email per note to info@projgrowth.com with the page, device, position, and his words.
- A private page at `/admin/reviews`, behind the admin sign-in you already use, listing every note with page, device, timestamp, and a pin preview. You can set each to In progress or Done and delete noise. Status changes are what Jordan sees in his list.

## Honesty note on the pin position

The site being reviewed lives on its own address, so the portal can record where he clicked in the frame and which page he was on, but it cannot know how far he had scrolled inside it. Each note therefore carries the page, the device, and the click position within the visible frame — plenty to find the spot, and I'll include his own screenshot-free description. If you want pixel-perfect scroll anchoring later, that requires adding a small script to the Golinowski site itself; a follow-up, not this build.

## Preview address — your options

`golinowskilawv1.lovable.app` currently answers publicly to anyone who types it, and it allows being framed (that's why this works). Choices:

1. **Leave it public** — the portal is the only place the address is shown, and it's an unguessable-ish name. Simplest, weakest.
2. **Unpublish the Golinowski project** and use its share-preview link instead — that link requires a Lovable login, which Jordan doesn't have, so it would break this portal. Not recommended.
3. **Put the same code gate on the Golinowski site itself** — add a small access screen there reusing this gateway's logic, and have the portal pass a one-time token so Jordan never sees it twice. This genuinely protects the address. It's the right answer if privacy matters, and it's a change to the *other* project, so tell me if you want it and I'll do it as a separate pass.

This plan builds on option 1 and does not touch the Golinowski project.

## Technical notes

- `client-review-access` gains a short-lived signed session token (HMAC over slug + expiry, 8 hours, new secret `CLIENT_REVIEW_TOKEN_SECRET`) returned alongside `{ status: "ready", url }`. Held in React state only. The destination URL still never appears in the unauthenticated payload.
- `GOLINOWSKI_REVIEW_URL` set to `https://golinowskilawv1.lovable.app`; the ready branch now renders the review room instead of `window.location.replace`.
- New table `review_comments`: `id`, `client_slug`, `page_path`, `device`, `x_pct`, `y_pct`, `body`, `status` (`new` | `in_progress` | `done`), `created_at`, `updated_at`. RLS enabled, grants to `service_role` only, restrictive deny policies for anon/authenticated — all reads and writes go through edge functions.
- New edge function `client-review-comments`: `POST` (verify token, zod-validate body ≤ 1000 chars, per-IP rate limit, insert, fire Resend email) and `GET` (verify token, return that slug's notes with status). Generic errors only.
- New edge function endpoint or extension of `admin-leads` for admin list/status/delete, guarded by the existing `admin-verify` flow.
- New frontend: `src/pages/client/review/ReviewRoom.tsx`, `DeviceFrame.tsx`, `AnnotationLayer.tsx`, `NoteComposer.tsx`, `NotesList.tsx`; page list in `gateways.ts` (labels + paths for the client site). `ReviewGateway.tsx` swaps its granted branch for `ReviewRoom`. Loading state with the pulsing logo is reused while the frame boots.
- New admin view `src/pages/admin/ReviewComments.tsx` added to the existing admin shell; route `/admin/reviews`.
- Route stays raw, `noindex, nofollow`, excluded from sitemap, unlinked. `/rgc` and every public page untouched.

## Email caveat

Notification email currently sends from Resend's shared `onboarding@resend.dev` sender, which can be unreliable and may only deliver to your own address. If you'd rather have notes arrive from `projgrowth.com`, say so and I'll set up your sending domain as part of this.

## QA before I call it done

Wrong code still fails; the destination URL absent from the bundle and from any unauthenticated response; note posting rejected without a valid token; frame renders and scrolls at 1440 / 1024 / 768 / 390; comment mode places a pin at the clicked point and it reloads in the same place; email arrives with page, device, and text; admin list shows the note and status changes appear in Jordan's list; keyboard-only pass through code entry, device switch, comment mode, and note submit.
