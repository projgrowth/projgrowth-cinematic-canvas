CREATE TABLE public.review_comments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_slug text NOT NULL,
  page_path text NOT NULL DEFAULT '/',
  page_label text,
  device text NOT NULL DEFAULT 'desktop',
  x_pct numeric NOT NULL DEFAULT 50,
  y_pct numeric NOT NULL DEFAULT 50,
  body text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT ALL ON public.review_comments TO service_role;

ALTER TABLE public.review_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "no public select on review_comments" ON public.review_comments FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY "no public insert on review_comments" ON public.review_comments AS RESTRICTIVE FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "no public update on review_comments" ON public.review_comments AS RESTRICTIVE FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "no public delete on review_comments" ON public.review_comments AS RESTRICTIVE FOR DELETE TO anon, authenticated USING (false);

CREATE INDEX review_comments_slug_created_idx ON public.review_comments (client_slug, created_at DESC);

CREATE TRIGGER review_comments_updated_at BEFORE UPDATE ON public.review_comments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();