// Type-safe interfaces matching Supabase schema

export interface Metric {
  label: string;
  value: string;
}

export interface HeroMedia {
  type: 'image' | 'video';
  url: string;
  alt?: string;
}

export interface GalleryItem {
  type: 'image' | 'video';
  url: string;
  alt?: string;
}

export interface WorkItem {
  id: string;
  slug: string;
  title: string;
  industry: string;
  type: string;
  summary: string | null;
  body: string | null;
  tech: string[];
  metrics: Metric[];
  hero_media: HeroMedia | null;
  gallery: GalleryItem[];
  featured: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  problem: string | null;
  solution: string | null;
  result: string | null;
  inclusions: string[];
  cta_label: string | null;
  created_at: string | null;
  updated_at: string | null;
}
