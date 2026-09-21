REVOKE ALL ON public.admin_users FROM anon, authenticated;
GRANT ALL ON public.admin_users TO service_role;

COMMENT ON TABLE public.admin_users IS
  'Admin credential store. No anon/authenticated privileges: password hashes are read only by service-role edge functions (admin-verify, admin-leads, client-review-admin, admin-self-test) for bcrypt comparison. Seed accounts out-of-band; never commit hashes to version control.';

COMMENT ON COLUMN public.admin_users.password_hash IS
  'bcrypt hash. Never selected by client-facing roles; service role only.';