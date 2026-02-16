
# Mobile Optimization for Contact Page

## Issues Found

1. **"Let's Build" heading is cut off** -- On mobile (390px), the hero h1 "Let's Build / Something Great" only shows "Something Great" because the first line scrolls above the viewport or is clipped by the nav bar.

2. **AI Chatbot FAB overlaps the "Response Time" card** -- The fixed-position bot button (bottom-6 right-6) sits directly on top of the contact info cards on small screens.

3. **Back-to-Top button overlaps footer copyright text** -- Both the BackToTop and AI Chatbot FABs are positioned at bottom-6 right-6, causing them to stack on top of each other and cover footer content.

## Changes

### 1. Contact Page Hero -- Tighter Mobile Spacing (`src/pages/Contact.tsx`)
- Reduce the mobile hero min-height from `min-h-[60vh]` to `min-h-[50vh]` so the heading isn't pushed out of view.
- Reduce mobile heading size slightly (text-3xl instead of text-4xl on smallest screens) to ensure "Let's Build" fits.

### 2. Stagger the Two Fixed Buttons (`src/components/AIChatbotPlaceholder.tsx` + `src/components/BackToTop.tsx`)
- Move the AI Chatbot FAB to `bottom-20 right-6` on mobile so it doesn't overlap the Back-to-Top button or footer content.
- Keep BackToTop at `bottom-6 right-6` as-is (it's the primary action).
- This gives ~56px vertical separation between the two buttons.

### 3. Quick Contact Form Touch Target Polish (`src/components/QuickContactForm.tsx`)
- Ensure the send button has a minimum 44px touch target (currently `px-4 py-3` which is close but the icon-only button may render small). Add `min-h-[44px] min-w-[44px]` for accessibility compliance.

## Technical Details

| File | Change |
|------|--------|
| `src/pages/Contact.tsx` | Hero: `min-h-[50vh]`, heading: `text-3xl md:text-5xl lg:text-7xl` |
| `src/components/AIChatbotPlaceholder.tsx` | FAB position: `bottom-20 right-6 md:bottom-6 md:right-6` |
| `src/components/BackToTop.tsx` | No change needed (already well-positioned) |
| `src/components/QuickContactForm.tsx` | Add `min-h-[44px] min-w-[44px]` to send button |

Total: 3 files modified, minimal changes focused on mobile layout spacing.
