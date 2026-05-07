## Goal
Add a clean, one-click CSV export of submission data from `/admin/leads` so you can download the current dataset whenever you want.

## What you'll get
Two "Export CSV" buttons in the admin header — one per tab:
- **Quick Leads CSV** — date, name, email, message, source, service interest, budget, timeline, email_sent
- **NM Discovery CSV** — date, name, email, practice, services, engagement tier, confidence, quality score, quality flags, email_sent, polished_brief, generated_brief, plus each response field flattened into its own column

Files download instantly in the browser as `projgrowth-leads-YYYY-MM-DD.csv` and `projgrowth-discovery-YYYY-MM-DD.csv`. No new edge function needed — uses data already loaded in the table.

## Implementation
**`src/pages/AdminLeads.tsx`**
- Add a small `toCsv(rows, columns)` helper that escapes quotes/commas/newlines properly (RFC 4180).
- Add `exportLeads()` and `exportDiscovery()` functions that build a blob and trigger download via a hidden `<a>`.
- Render an "Export CSV" button next to the tab header that calls the right exporter based on active tab.
- For Discovery: union all `responses` keys across rows so every answer gets its own column, even sparse ones.

No DB or edge function changes. No schema changes. Existing self-test row is filtered out of exports (rows where `full_name === '_TEST_VERIFY'`).
