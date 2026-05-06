
CREATE TABLE public.discovery_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  email text NOT NULL,
  practice_name text,
  responses jsonb NOT NULL,
  generated_brief text,
  email_sent boolean DEFAULT false
);

ALTER TABLE public.discovery_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only service role can read discovery submissions"
ON public.discovery_submissions
FOR SELECT
USING (false);
