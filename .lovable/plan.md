## Discovery Tool Audit & Improvement Plan

### What's working today
- 18-question intake at `/discovery` with autosave, generated brief, admin tab.
- Visual mood/typography/density tiles already exist.
- Submissions land in `discovery_submissions` + email notification.

### Honest gaps vs. your goals
1. **It assumes everyone needs the full discovery.** A prospect with a clear vision is forced through 18 steps; a prospect with no vision gets the same treatment as one with strong opinions. You can't tell who needs hand-holding vs. who needs execution.
2. **Tiles preview a generic "RAMOS" name** instead of the prospect's actual DBA. The big payoff — "see your name in this style" — never happens.
3. **NM guideline rules aren't enforced.** It treats NM Lean as a free choice when, per NM guidelines, NM must always be in primary lockup position. Same for color (NM blue must be primary), and for mark structure when paired with the NM logo block.
4. **No reference-logo capture.** You explicitly want to see logos that inspire them — today it's one free-text box. No image uploads, no curated gallery to react to.
5. **Logo-only scope.** You also want this usable for any NM advisor wanting *any* marketing service (web, content, ads, social) — today the entire flow is logo-only.
6. **Landing screen still feels Claude-artifact-ish.** It says "Northwestern Mutual / DBA logo discovery" with no project branding and no service routing.

---

### Proposed improvements

#### 1. Add a "Confidence Gate" at the top
After name/email, ask one question: **"How clear is your vision for this logo?"**
- *I know exactly what I want — I just need it built* → short path (8 questions: DBA name, NM lean confirmation, mark structure, accent, references, touchpoints, non-negotiable, vision)
- *I have a direction but want guidance* → medium path (12 questions)
- *I'm starting from scratch — walk me through it* → full 18-question path (current flow)

This immediately tells you on the admin side **how much creative lift** the engagement needs, and respects the prospect's time.

#### 2. Make every preview tile show *their* DBA name live
- DBA name input moves to step 1 (right after confidence gate).
- All mood/typography/density/tone/mark/NM-lean tiles render with the prospect's actual DBA name (function `wm()` / `sn()` already supports this — just wire `name` through consistently, currently it falls back to "RAMOS").
- Adds a real "wow" moment: they see their name in 6 aesthetic directions on one screen.

#### 3. Enforce NM guideline rules in the UI
- **NM Lean question**: Remove "Your brand leads" if it implies NM is secondary. Replace with two compliant options + an explainer footnote: *"Per NM guidelines, the Northwestern Mutual lockup is always primary. These options control your DBA's visual weight within that constraint."*
- **Accent color**: Lock NM Blue as a non-removable primary swatch; the user picks a *secondary* accent. Make it visually obvious.
- **Mark structure conditional**: If they pick "Layered/rich" density + "Established" tone + "Heritage" mood, gently nudge that an icon+wordmark is recommended (don't force, but show a "Recommended for your direction" tag on the icon option).
- Add a small persistent "NM Guidelines" badge in the header that opens a tooltip summarizing the rules they're working within.

#### 4. Reference logos: gallery + uploads
Replace the single "name a brand you admire" textarea with:
- **Curated reaction gallery**: 12 logo thumbnails (mix of finance, lifestyle, tech, luxury) → tap any that resonate. We learn faster from reactions than descriptions.
- **Upload up to 3 reference images** (Lovable Cloud Storage → new `discovery-uploads` bucket, RLS: insert by anyone, read by service role only).
- Keep the textarea as optional "anything else."

#### 5. Broaden scope: service router on landing
Landing becomes a 2-step entry:
1. Name / email / practice name (no preset list — free text, as you requested)
2. **"What can we help with?"** — multi-select chips:
   - Logo & brand identity (current full flow)
   - Website
   - Content creation (video/photo)
   - Paid ads & social
   - Print collateral / signage
   - Not sure yet — let's talk

If they pick *only* logo → current improved flow.
If they pick logo + others → logo flow followed by short service-specific add-on sections (3–5 questions each: goals, current state, timeline, budget range).
If they pick non-logo only → skip the brand-discovery section entirely, go straight to the service questions.

This makes the tool reusable for any NM advisor across all your services without forcing them through logo questions they don't need.

#### 6. Smarter "you need more than you think" moments
Today this is implicit. Make it visible:
- After they pick services, show a one-line system message like *"Most advisors who start with a logo end up needing a website refresh within 6 months — we've added 3 quick questions about your current site."* (only shown if they didn't already check website).
- After the personality axes step, surface: *"Your answers point to a brand that needs more than just a logo — it needs a voice. Want us to include messaging in the proposal?"* with a yes/no toggle.

#### 7. Admin upgrades
- New "Service mix" badge per submission (Logo, Website, Content…).
- New "Confidence" badge (Clear / Guided / Discovery) so you can triage at a glance.
- Recommended-engagement-size auto-tag based on confidence + service mix (Light / Standard / Full Studio) — not shown to prospect, just a helper for your proposal.
- Reference uploads gallery in detail view.

---

### Technical changes

**Database**
- Add columns to `discovery_submissions`: `confidence text`, `services text[]`, `engagement_tier text` (auto-computed), `reference_image_urls text[]`.
- New storage bucket `discovery-uploads` (private; RLS: public insert, service-role read; signed URLs for admin view).

**Files**
- Refactor `src/pages/Discovery.tsx` into:
  - `src/pages/Discovery.tsx` (phase controller + landing)
  - `src/components/discovery/ConfidenceGate.tsx`
  - `src/components/discovery/ServicePicker.tsx`
  - `src/components/discovery/LogoFlow.tsx` (current 18 steps, branched by confidence)
  - `src/components/discovery/ServiceFlow.tsx` (per-service question packs)
  - `src/components/discovery/ReferenceGallery.tsx` + upload component
  - `src/components/discovery/constants.ts` (MOODS, NM_LEAN, ACC, etc. — already inline, just extract)
  - `src/components/discovery/genBrief.ts` (extend with confidence + service awareness)
- Update `src/pages/AdminLeads.tsx`: badges, reference image gallery, engagement tier.
- Update `supabase/functions/submit-discovery/index.ts`: accept new fields, validate, include in notification email.
- New migration for new columns + bucket + policies.

**Step count by path**
- Logo · Clear: 8 steps (~3 min)
- Logo · Guided: 12 steps (~5 min)
- Logo · Discovery: 18 steps (~8 min)
- Each additional service: +3–5 steps

**Out of scope for this round** (mention so you can decide later)
- Passphrase gate on `/discovery`
- Custom branded domain for transactional email (still using `onboarding@resend.dev`)
- Ability for the prospect to download their own PDF brief at the end
