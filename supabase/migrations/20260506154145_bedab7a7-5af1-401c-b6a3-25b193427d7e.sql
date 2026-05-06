
ALTER TABLE public.discovery_submissions
  ADD COLUMN IF NOT EXISTS confidence text,
  ADD COLUMN IF NOT EXISTS services text[] DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS engagement_tier text,
  ADD COLUMN IF NOT EXISTS reference_image_urls text[] DEFAULT '{}'::text[];

INSERT INTO storage.buckets (id, name, public)
VALUES ('discovery-uploads', 'discovery-uploads', false)
ON CONFLICT (id) DO NOTHING;

-- Anyone may upload reference images into this bucket
CREATE POLICY "Public can upload discovery references"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'discovery-uploads');

-- No public read; service role bypasses RLS so admin can sign URLs
