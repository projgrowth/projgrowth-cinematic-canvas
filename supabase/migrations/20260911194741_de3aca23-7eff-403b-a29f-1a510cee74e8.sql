CREATE TABLE public.client_access_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_slug TEXT NOT NULL,
  ip_hash TEXT NOT NULL,
  succeeded BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX client_access_attempts_lookup_idx
  ON public.client_access_attempts (client_slug, ip_hash, created_at DESC);

GRANT ALL ON public.client_access_attempts TO service_role;

ALTER TABLE public.client_access_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "no public select on client_access_attempts"
  ON public.client_access_attempts FOR SELECT USING (false);
CREATE POLICY "no public insert on client_access_attempts"
  ON public.client_access_attempts AS RESTRICTIVE FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "no public update on client_access_attempts"
  ON public.client_access_attempts AS RESTRICTIVE FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "no public delete on client_access_attempts"
  ON public.client_access_attempts AS RESTRICTIVE FOR DELETE TO anon, authenticated USING (false);