## NM DBA Brand Discovery Portal

A private, link-shareable discovery tool you send to NM advisor prospects. They enter their own name (no preset list), walk through an 18-question intake across 9 sections, and on submit you get the full structured response in your existing `/admin/leads` area — plus an auto-generated creative brief.

### Where it lives

- New route: **`/discovery`** (unlinked from nav/footer — only people with the link find it)
- Admin view: extend **`/admin/leads`** with a "Discovery Submissions" tab

No login for the prospect. The URL itself is the gate. (We can add a passphrase later if you want.)

### Flow

```text
/discovery
  ├─ Landing  → "Enter your name to begin"  (single text input, not a list)
  ├─ Form     → 18 steps, progress rail, back/next, autosave to localStorage
  └─ Thanks   → "We'll be in touch. Here's what your answers tell us."
                 (shows the same lightweight bullet recap from the artifact)
```

The "feels like more than they thought" effect is built into the questions themselves — personality axes, NM lean, touchpoints, non-negotiables, vision statement, mood boards, etc. By question 8 they realize this is a real strategic exercise, not a form.

### Adapted from the artifact

Keeping all 18 questions, all visual previews (mood tiles, NM lean tiles, typo/density/tone tiles, accent swatches, personality axes), the auto-generated creative brief, and the progress rail.

**Removed from the artifact:**
- The two-advisor flow (Michael Ramos / Richard Nese landing tiles)
- The "Between" reconciliation screen and "Summary" comparison view (those compare two advisors — not relevant for one prospect)
- "Dan's session notes" textarea

**Added:**
- Free-text name + email + practice name on the landing screen (so submissions are attributable)
- Single-prospect submit → posts to backend
- Per-step localStorage autosave keyed by email so a refresh doesn't lose progress

### Backend

New table **`discovery_submissions`** (separate from `contact_submissions` so the leads table stays clean):

```sql
create table discovery_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  full_name text not null,
  email text not null,
  practice_name text,
  responses jsonb not null,        -- the full form object
  generated_brief text,            -- output of genBrief()
  email_sent boolean default false
);
-- RLS: deny all SELECT (service role only, same pattern as contact_submissions)
-- Public INSERT allowed via edge function only (no direct client insert)
```

New edge function **`submit-discovery`**:
- Validates name/email/responses with zod
- Inserts row
- Sends you a notification email via existing Resend setup (subject: "New discovery: {name} — {practice}")
- Returns success even if email fails (mirrors the hardened pattern already in `send-contact-email`)

Extend **`admin-leads`** edge function (or add `admin-discovery`) to also return discovery rows for the `/admin/leads` page.

### Admin view changes

`/admin/leads` gets a tab switcher: **Quick Leads** | **Discovery Submissions**

Discovery tab shows a list; clicking a row opens a detail panel with:
- Contact info
- The auto-generated creative brief (copy button)
- Full structured responses grouped by the 9 sections (Foundation, Your client, Positioning, Personality, Direction, Aesthetic, Your mark, Reference, Vision)
- Visual recap: chosen mood tile, accent swatch, NM lean tile, personality axes positions

### Files

**New**
- `src/pages/Discovery.tsx` — landing + step controller + thanks screen
- `src/components/discovery/` — `Steps.tsx`, `Tiles.tsx` (MOODS/NM_LEAN/TOTCard previews), `constants.ts` (ACC, DIFF, AUD, ADJ, AXES, etc.), `genBrief.ts`
- `src/pages/DiscoveryDetail.tsx` (or inline panel inside AdminLeads)
- `supabase/functions/submit-discovery/index.ts`
- Migration: `discovery_submissions` table + RLS

**Modified**
- `src/App.tsx` — add `/discovery` route
- `src/pages/AdminLeads.tsx` — add tab + discovery list/detail
- `supabase/functions/admin-leads/index.ts` — also fetch discovery rows (or add sibling function)

### Styling

The artifact uses inline NM-blue styling. We'll port it to the project's Tailwind tokens so it matches your site's design system (still NM-blue accented since it's NM-targeted, but using your fonts and component primitives — Button, Input, Textarea, Card).

### Open questions (proceeding with defaults unless you object)

1. **Gate**: shareable URL only (no passphrase). Add a passphrase later if needed.
2. **Notification**: email to the same address your contact form uses.
3. **Prospect name entry**: free text — `full_name`, `email`, `practice_name` on the landing screen before question 1.
