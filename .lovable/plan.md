

# Lead Capture Hardening Plan

## Problem
Multiple points where leads can slip through: non-delivering emails, no visibility into submissions, dead-end UI elements, and missing capture points on high-intent pages.

## Changes

### 1. Remove dead-end elements
- **Remove AIChatbotPlaceholder** entirely from Contact page and codebase. A "coming soon" chatbot actively discourages real contact.
- **Remove fake Calendly CTA** from MultiStepContactForm success state. Replace with a simple "We'll be in touch within 24 hours" message and a mailto fallback.

### 2. Add inline QuickContactForm to Footer
- Embed the existing QuickContactForm component in the Footer's "Get in Touch" column, giving every page a persistent low-friction capture point beyond just a mailto link.

### 3. Add QuickContactForm to high-intent pages
- Embed a QuickContactForm at the bottom of each **Service subpage** (Branding, Web Design, Content Creation, Digital Marketing) and the **Work** page, just above the GlobalCTA. These are where intent is highest.

### 4. Fix the email delivery issue
- Update the edge function `from` address. The current `onboarding@resend.dev` is Resend's shared sandbox domain and likely gets filtered or blocked. Change it to use a verified domain or at minimum surface a clear log when email send fails vs succeeds, so you can diagnose delivery.
- Add a `status` and `email_sent` column to `contact_submissions` so you can see at a glance which leads got email confirmation and which didn't.

### 5. Build a simple admin submissions viewer
- Create a `/admin/leads` page (protected by a simple password or hidden route) that reads from `contact_submissions` and displays all leads in a table with name, email, message, date, and email delivery status. This gives immediate visibility without needing direct database access.

### 6. Surface contact capture errors clearly
- In the edge function, if the Resend email call fails, still return success to the user (their submission is saved) but log the failure distinctly and mark `email_sent = false` in the DB so you can follow up manually.

---

## Technical Details

### Database migration
```sql
ALTER TABLE contact_submissions
  ADD COLUMN email_sent boolean DEFAULT false,
  ADD COLUMN source text DEFAULT 'quick',
  ADD COLUMN service_interest text,
  ADD COLUMN budget text,
  ADD COLUMN timeline text;
```
This lets you track which form they used (quick vs multi-step), what they're interested in, and whether the notification email actually sent.

### Files to create
- `src/pages/AdminLeads.tsx` — simple table view of all submissions

### Files to modify
- `supabase/functions/send-contact-email/index.ts` — mark `email_sent` on success, `false` on failure; store structured multi-step data
- `src/components/Footer.tsx` — embed QuickContactForm
- `src/pages/Contact.tsx` — remove AIChatbotPlaceholder import and usage
- `src/components/MultiStepContactForm.tsx` — remove fake Calendly CTA from success state
- `src/pages/services/Branding.tsx`, `WebDesign.tsx`, `ContentCreation.tsx`, `DigitalMarketing.tsx` — add QuickContactForm above GlobalCTA
- `src/pages/Work.tsx` — add QuickContactForm section
- `src/App.tsx` — add route for `/admin/leads`
- `src/components/AIChatbotPlaceholder.tsx` — delete file

### Route protection for admin
A simple approach: the `/admin/leads` route checks for a query param or prompts for a password stored as a backend secret. No full auth system needed — just enough to keep it from being publicly browsable.

