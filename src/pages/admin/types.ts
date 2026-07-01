export interface Submission {
  id: string;
  created_at: string;
  name: string;
  email: string;
  message: string;
  email_sent: boolean | null;
  source: string | null;
  service_interest: string | null;
  budget: string | null;
  timeline: string | null;
}

export interface Discovery {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  practice_name: string | null;
  responses: Record<string, any>;
  generated_brief: string | null;
  polished_brief?: string | null;
  quality_score?: number | null;
  quality_flags?: string[] | null;
  email_sent: boolean | null;
  confidence?: string | null;
  services?: string[] | null;
  engagement_tier?: string | null;
  reference_signed_urls?: string[];
}

export type SelfTestResult = {
  ok: boolean;
  steps: { step: string; ok: boolean; detail?: string }[];
  error?: string;
};