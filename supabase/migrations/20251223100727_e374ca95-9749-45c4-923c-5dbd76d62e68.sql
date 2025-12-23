-- Remove the public INSERT policy that allows anyone to spam the contact_submissions table
-- All inserts will now go through the rate-limited edge function using service role
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;