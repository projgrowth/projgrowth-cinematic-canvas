
-- Explicit deny policies on admin_users for all write ops (anon/authenticated)
CREATE POLICY "no public insert on admin_users" ON public.admin_users
  AS RESTRICTIVE FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "no public update on admin_users" ON public.admin_users
  AS RESTRICTIVE FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "no public delete on admin_users" ON public.admin_users
  AS RESTRICTIVE FOR DELETE TO anon, authenticated USING (false);

-- Explicit deny policies on contact_submissions writes (all writes happen via service role edge functions)
CREATE POLICY "no public insert on contact_submissions" ON public.contact_submissions
  AS RESTRICTIVE FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "no public update on contact_submissions" ON public.contact_submissions
  AS RESTRICTIVE FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "no public delete on contact_submissions" ON public.contact_submissions
  AS RESTRICTIVE FOR DELETE TO anon, authenticated USING (false);

-- Explicit deny policies on discovery_submissions writes (handled by service role edge function)
CREATE POLICY "no public insert on discovery_submissions" ON public.discovery_submissions
  AS RESTRICTIVE FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "no public update on discovery_submissions" ON public.discovery_submissions
  AS RESTRICTIVE FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "no public delete on discovery_submissions" ON public.discovery_submissions
  AS RESTRICTIVE FOR DELETE TO anon, authenticated USING (false);

-- Lock down storage.objects for discovery-uploads bucket: deny SELECT/UPDATE/DELETE to anon/authenticated
-- (INSERT remains for the public Discovery form. Reads go through service-role signed URLs.)
CREATE POLICY "no public read of discovery uploads" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id <> 'discovery-uploads');
CREATE POLICY "no public update of discovery uploads" ON storage.objects
  FOR UPDATE TO anon, authenticated USING (bucket_id <> 'discovery-uploads') WITH CHECK (bucket_id <> 'discovery-uploads');
CREATE POLICY "no public delete of discovery uploads" ON storage.objects
  FOR DELETE TO anon, authenticated USING (bucket_id <> 'discovery-uploads');

-- Restrict EXECUTE on SECURITY DEFINER trigger function (triggers run regardless; direct calls not needed)
REVOKE EXECUTE ON FUNCTION public.handle_updated_at() FROM PUBLIC, anon, authenticated;
