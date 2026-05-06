ALTER TABLE public.discovery_submissions
  ADD COLUMN IF NOT EXISTS polished_brief text,
  ADD COLUMN IF NOT EXISTS quality_score integer,
  ADD COLUMN IF NOT EXISTS quality_flags text[] DEFAULT '{}'::text[];
