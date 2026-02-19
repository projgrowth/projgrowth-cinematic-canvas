ALTER TABLE public.contact_submissions
  ADD COLUMN email_sent boolean DEFAULT false,
  ADD COLUMN source text DEFAULT 'quick',
  ADD COLUMN service_interest text,
  ADD COLUMN budget text,
  ADD COLUMN timeline text;