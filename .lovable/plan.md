## Goal
Replace the single shared `ADMIN_PASSWORD` with a proper multi-admin login (email + password), and seed `dan@projgrowth.com` with the password you provided.

## What changes for you
- Login screen at `/admin/leads` gets an **Email** field above the password field.
- Multiple admins can be added later without code changes — just insert a row.
- Existing `ADMIN_PASSWORD` secret stays as a **fallback** so you don't get locked out during the transition (can be removed later).

## Implementation

### 1. Database — new `admin_users` table
- Columns: `email` (unique, lowercase), `password_hash` (bcrypt), `name`, `active`, timestamps.
- RLS enabled, no public policies — only service role (edge functions) can read.
- Seed row: `dan@projgrowth.com` with bcrypt hash of `Rufus_0330!`.

### 2. Edge functions — `admin-verify`, `admin-leads`, `admin-self-test`
- Accept `{ email, password }` in the body (keep `{ password }` working as legacy fallback against `ADMIN_PASSWORD` env var).
- Look up `admin_users` by lowercased email, verify with bcrypt (`https://deno.land/x/bcrypt`), check `active = true`.
- Return 401 on mismatch. All three functions share the same verification helper inlined per function (Deno edge functions can't share local imports easily).

### 3. Frontend — `src/pages/AdminLeads.tsx`
- Add `email` state, render an Email input above the Password input.
- Submit `{ email, password }` to all three function invokes (`admin-verify`, `admin-leads`, `admin-self-test`).
- Persist the email/password in component state so the self-test button keeps working after login.

## Adding more admins later
Run a one-line SQL insert with a bcrypt hash (I can generate hashes on request, or we can add a tiny `admin-create` function later if you want a UI for it).

## Security notes
- Passwords hashed with bcrypt cost 10 — never stored in plaintext.
- Table is service-role only, never exposed to the client.
- `Rufus_0330!` will only exist in the DB as a hash after the seed migration runs.
