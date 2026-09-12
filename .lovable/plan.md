# Golinowski Portal — Make the Waiting State Feel Like an Active Build

Right now, a correct access code shows a static message saying the preview is still being published and to come back within the hour. That reads like a dead end. Replace it with a live-feeling build sequence so Jordan sees active progress.

## What he'll see

After entering the code, the page moves straight into a working state in the same quiet editorial style:

```text
GOLINOWSKI LAW
Website Rebuild

PREPARING YOUR PREVIEW                          ● (pulsing)

  Compiling site build                          done
  Optimizing images and type                    done
  Publishing to the network                     in progress
  Final verification                            queued

A thin hairline progress line advances slowly.

Large preview loading — this can take a few minutes.
Keep this link; refreshing is safe.
```

Details:
- The step list advances on a timer (a few seconds per step) so it visibly moves while he watches, then holds on the final publishing step rather than ever claiming completion.
- Hairline progress line eases toward roughly 90% and stays there — no fake 100%.
- The existing pulsing emerald dot stays as the live indicator.
- No countdown, no "try again within the hour" language, no fake percentages or logs.
- Reduced motion: steps and progress render in their final held state with no animation.
- Mobile: single column, same rhythm, first screen shows the heading and the active step.

## Note

This is presentation only — it makes the wait feel active and credible, but it does not report real build status. The moment you give me the review link, the same code sends him straight to the site instead of this screen.

## Technical notes

- `src/pages/client/ReviewGateway.tsx`: replace the `pending` branch with a `BuildProgress` block — a small step array with staged reveal via `setTimeout`/`useEffect`, a CSS-transition hairline bar, and existing tokens only (`eyebrow`, `border-line`, `text-mute`, `bg-accent`). Respect `useReducedMotion`. Clear timers on unmount.
- `src/pages/client/gateways.ts`: update `holdingTitle`/`holdingBody` to the new preparing copy; steps live in the component so they're reusable for any client gateway.
- No backend change — the function still returns `{ status: "pending" }` until `GOLINOWSKI_REVIEW_URL` is set.
- No other page, route, or global style touched; `/rgc` untouched.
