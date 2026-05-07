
CREATE TABLE public.admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  name text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "no public access to admin_users"
ON public.admin_users FOR SELECT
USING (false);

CREATE TRIGGER admin_users_updated_at
BEFORE UPDATE ON public.admin_users
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.admin_users (email, password_hash, name)
VALUES ('dan@projgrowth.com', '$2b$10$KuY9IRQ5lmjNNU19CPQMdein4ChebXSMljS.FcDoEbsstJhOedQPK', 'Dan');
