# Clean Mockup — No Sign of How the Site Was Built

Jordan should experience the review room as a finished website presentation. Nothing in the frame should reveal the build platform, and no click should take him anywhere that does.

## What changes

**A plain browser bar on the desktop frame**
A thin bar across the top of the desktop frame: three small dots on the left and a blank rounded field, no text, no icons. Hairline rule below it, same tones as the rest of the portal. Nothing to read, nothing to click.

**The mobile frame gets a quiet status strip**
A slim top strip inside the phone bezel with a neutral time and signal/battery marks, so the phone reads as a phone rather than a cropped window. No text that names anything.

**The badge corner is masked**
The bottom-right corner of the frame — where the "Edit with Lovable" badge sits — is covered by a small panel in the portal's own layer, matched to the frame edge so it reads as bezel, not as a patch. It sits above the site and swallows clicks, so the badge cannot be seen or pressed. Applied on both desktop and mobile frames.

**Plus the badge switched off at the source**
The mask is a backstop; the badge should also be turned off in the Golinowski project itself so it never renders. That setting lives in the Golinowski project, not this one, so it can't be flipped from here — either switch it off in that project's publish settings, or ask me in that project and I'll do it. Note it requires a Pro plan or higher.

**No escaping the frame**
The embedded site is locked so it can't open new tabs, pop up windows, or replace the portal page. Clicks stay inside the frame. Links that would leave the site — a phone number, an external profile — simply do nothing rather than opening something unexpected.

## What stays the same

Browse mode, comment mode, pins, the notes list, the access code gate, the email alerts, and `/admin/reviews` all behave exactly as they do now. Public pages and `/rgc` are untouched.

## Technical notes

- `DeviceFrame.tsx`: add a `chrome` header row for desktop (dots + empty field) and a status strip for mobile, both outside the scaled iframe layer so they stay crisp; frame height math adjusts for the chrome so the site still fits.
- Corner mask: absolutely positioned element in the annotation layer's stacking context, sized ~180x56 desktop / ~130x44 mobile at the bottom-right inset, `pointer-events: auto` so it intercepts clicks, background from the existing surface token.
- Iframe hardening: `sandbox="allow-scripts allow-same-origin allow-forms"` — omitting `allow-popups` and `allow-top-navigation` blocks new windows and any attempt to navigate the portal itself. `referrerPolicy="no-referrer"`.
- No change to the edge functions, the database, or the gateway logic.

## QA before done

Desktop and mobile frames at 1440 / 1024 / 768 / 390; badge corner not visible and not clickable; clicking inside the site navigates only within the frame; no new tab opens from any link; comment mode still places a pin at the clicked point and it reloads in the same place; build, type, and token checks clean.
