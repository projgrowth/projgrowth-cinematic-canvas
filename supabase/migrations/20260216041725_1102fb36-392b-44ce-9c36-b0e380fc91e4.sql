
-- Drop and recreate industry check constraint with expanded values
ALTER TABLE public.work DROP CONSTRAINT work_industry_check;
ALTER TABLE public.work ADD CONSTRAINT work_industry_check CHECK (industry = ANY (ARRAY['Financial'::text, 'Legal'::text, 'Ecommerce'::text, 'SaaS'::text, 'Other'::text, 'Tax & Planning'::text, 'Apparel'::text, 'Luxury Retail'::text, 'E-Commerce'::text, 'Construction'::text]));

-- Drop and recreate type check constraint with expanded values  
ALTER TABLE public.work DROP CONSTRAINT work_type_check;
ALTER TABLE public.work ADD CONSTRAINT work_type_check CHECK (type = ANY (ARRAY['Strategy'::text, 'Content'::text, 'Web'::text, 'Automation'::text, 'Content Systems'::text, 'Brand & Messaging'::text, 'Cinematic Production'::text, 'Web & Product'::text, 'AI & Tools'::text]));
