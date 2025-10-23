-- Create work collection table
CREATE TABLE public.work (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  industry TEXT NOT NULL CHECK (industry IN ('Financial', 'Legal', 'Ecommerce', 'SaaS', 'Other')),
  type TEXT NOT NULL CHECK (type IN ('Strategy', 'Content', 'Web', 'Automation')),
  summary TEXT,
  metrics JSONB DEFAULT '[]'::jsonb,
  hero_media JSONB,
  gallery JSONB DEFAULT '[]'::jsonb,
  body TEXT,
  tech TEXT[] DEFAULT ARRAY[]::TEXT[],
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create services collection table
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT,
  problem TEXT,
  solution TEXT,
  result TEXT,
  inclusions TEXT[] DEFAULT ARRAY[]::TEXT[],
  cta_label TEXT DEFAULT 'Get Started',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.work ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Public read access for work
CREATE POLICY "Anyone can view work"
ON public.work
FOR SELECT
USING (true);

-- Public read access for services
CREATE POLICY "Anyone can view services"
ON public.services
FOR SELECT
USING (true);

-- Update triggers for timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_work_updated_at
  BEFORE UPDATE ON public.work
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Seed work items
INSERT INTO public.work (slug, title, industry, type, summary, metrics, hero_media, gallery, body, tech, featured) VALUES
(
  'legaltech-saas-platform',
  'LegalTech SaaS Platform',
  'Legal',
  'Web',
  'End-to-end platform development for a contract automation startup targeting mid-market law firms.',
  '[{"label": "Qualified Leads", "value": "+340%"}, {"label": "User Adoption", "value": "1,200+ firms"}, {"label": "Time Saved", "value": "45 hrs/week"}]'::jsonb,
  '{"type": "image", "url": "/placeholder.svg"}'::jsonb,
  '[{"type": "image", "url": "/placeholder.svg"}, {"type": "image", "url": "/placeholder.svg"}]'::jsonb,
  '## The Challenge\n\nOur client needed to enter a crowded market with a differentiated product.\n\n## Our Approach\n\nWe built a modern platform emphasizing speed and automation.\n\n## The Results\n\nThe platform achieved 340% growth in qualified leads within 6 months.',
  ARRAY['React', 'Node.js', 'PostgreSQL', 'AWS'],
  true
),
(
  'wealth-management-rebrand',
  'Wealth Management Rebrand',
  'Financial',
  'Strategy',
  'Complete brand refresh and content strategy for a $500M AUM wealth advisory firm.',
  '[{"label": "Pipeline Growth", "value": "$2.4M"}, {"label": "Brand Recognition", "value": "+85%"}, {"label": "Engagement Rate", "value": "4.2x"}]'::jsonb,
  '{"type": "image", "url": "/placeholder.svg"}'::jsonb,
  '[{"type": "image", "url": "/placeholder.svg"}]'::jsonb,
  '## The Challenge\n\nAn established firm needed to modernize their brand to attract younger high-net-worth clients.\n\n## Our Approach\n\nWe developed a comprehensive brand strategy with content marketing.\n\n## The Results\n\nGenerated $2.4M in new pipeline and 85% increase in brand recognition.',
  ARRAY['Brand Strategy', 'Content Marketing', 'SEO'],
  true
),
(
  'financial-advisory-automation',
  'Financial Advisory Automation',
  'Financial',
  'Automation',
  'Marketing automation system integrating CRM, email sequences, and client onboarding workflows.',
  '[{"label": "Time Saved", "value": "60%"}, {"label": "Client Satisfaction", "value": "98%"}, {"label": "Conversion Rate", "value": "+125%"}]'::jsonb,
  '{"type": "image", "url": "/placeholder.svg"}'::jsonb,
  '[{"type": "image", "url": "/placeholder.svg"}]'::jsonb,
  '## The Challenge\n\nManual processes were limiting the firm''s ability to scale.\n\n## Our Approach\n\nWe implemented a full marketing automation stack.\n\n## The Results\n\n60% time savings and 125% increase in conversion rates.',
  ARRAY['HubSpot', 'Zapier', 'Custom APIs'],
  true
);

-- Seed services
INSERT INTO public.services (slug, title, summary, problem, solution, result, inclusions, cta_label) VALUES
(
  'brand-strategy',
  'Brand Strategy',
  'Build an authentic identity that resonates with your ideal clients and compounds over time.',
  'Your brand feels generic or fails to communicate your unique value in a crowded market.',
  'We audit your positioning, refine messaging, and craft a cohesive brand identity that attracts the right clients.',
  'A differentiated brand that drives recognition, trust, and premium pricing power.',
  ARRAY['Market Research & Positioning', 'Messaging Framework', 'Visual Identity System', 'Brand Guidelines'],
  'Define Your Brand'
),
(
  'content-systems',
  'Content Systems',
  'Strategic content that educates, nurtures, and converts your audience at scale.',
  'You''re creating content but it''s not driving consistent pipeline or establishing authority.',
  'We build repeatable content systems aligned to buyer journeys—from thought leadership to conversion assets.',
  'Predictable lead flow and industry recognition through strategic content.',
  ARRAY['Content Strategy & Planning', 'SEO-Optimized Articles', 'Case Studies & White Papers', 'Newsletter & Email Sequences'],
  'Build Your System'
),
(
  'web-development',
  'Web Development',
  'High-performance websites engineered for conversion, scalability, and exceptional user experience.',
  'Your website doesn''t reflect your brand quality or convert visitors into qualified leads.',
  'We design and develop custom sites with modern tech stacks, optimized for performance and conversions.',
  'A digital presence that generates qualified leads and supports business growth.',
  ARRAY['Custom Web Design', 'CMS Integration', 'Performance Optimization', 'Analytics & Tracking'],
  'Start Your Project'
),
(
  'growth-automation',
  'Growth Automation',
  'Smart automation that scales your marketing, sales, and client operations without adding headcount.',
  'Manual processes are bottlenecking growth and preventing you from scaling efficiently.',
  'We map workflows, integrate tools, and automate repetitive tasks so your team focuses on high-value work.',
  'Streamlined operations that free up 40-60% of your team''s time while improving consistency.',
  ARRAY['Workflow Mapping & Optimization', 'CRM & Marketing Automation', 'Custom Integrations', 'Ongoing Support & Optimization'],
  'Automate Your Growth'
);