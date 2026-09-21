-- Discovery uploads: replace bucket-exclusion policies (which implicitly granted
-- anon/authenticated access to every other bucket) with strict deny rules and
-- path-ownership enforcement. All legitimate access flows through the
-- upload-discovery-reference edge function / admin service role.
DROP POLICY IF EXISTS "no public read of discovery uploads" ON storage.objects;
DROP POLICY IF EXISTS "no public update of discovery uploads" ON storage.objects;
DROP POLICY IF EXISTS "no public delete of discovery uploads" ON storage.objects;

CREATE POLICY "discovery uploads: no public select"
  ON storage.objects AS RESTRICTIVE FOR SELECT TO anon, authenticated
  USING (bucket_id <> 'discovery-uploads');

CREATE POLICY "discovery uploads: no public insert"
  ON storage.objects AS RESTRICTIVE FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id <> 'discovery-uploads');

CREATE POLICY "discovery uploads: no public update"
  ON storage.objects AS RESTRICTIVE FOR UPDATE TO anon, authenticated
  USING (bucket_id <> 'discovery-uploads')
  WITH CHECK (bucket_id <> 'discovery-uploads');

CREATE POLICY "discovery uploads: no public delete"
  ON storage.objects AS RESTRICTIVE FOR DELETE TO anon, authenticated
  USING (bucket_id <> 'discovery-uploads');

-- Review comments: document and lock the single intended access path.
COMMENT ON TABLE public.review_comments IS
  'Client review notes. No anon/authenticated access: reads and writes are scoped by client_slug derived from a signed review token inside the client-review-comments edge function (service role only).';

REVOKE ALL ON public.review_comments FROM anon, authenticated;
GRANT ALL ON public.review_comments TO service_role;