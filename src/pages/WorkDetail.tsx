import { useParams, Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import MediaDisplay from "@/components/MediaDisplay";
import { HeroMedia, GalleryItem } from "@/types/database";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";

const WorkDetail = () => {
  const { slug } = useParams();

  const { data: work, isLoading, error } = useQuery({
    queryKey: ['work', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('work')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!slug
  });

  const { data: otherWork } = useQuery({
    queryKey: ['other-work', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('work')
        .select('slug, title')
        .neq('slug', slug)
        .limit(1)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!slug
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container-site py-32">
          <LoadingSkeleton variant="detail" count={1} />
        </div>
      </Layout>
    );
  }

  if (error || !work) {
    return <Navigate to="/work" replace />;
  }

  return (
    <Layout>
      {/* Back button with breadcrumb */}
      <div className="container-site pt-10 pb-6 border-b border-line">
        <Link 
          to="/work"
          className="inline-flex items-center gap-2 text-mute hover:text-accent transition-all duration-sm ease-smooth hover:gap-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Work</span>
        </Link>
      </div>

      {/* Hero */}
      <section className="container-site py-20 animate-fade-in">
        <div className="mb-10">
          <div className="flex items-center gap-3 text-sm text-mute mb-4">
            <span className="text-accent">{work.industry}</span>
            <span>•</span>
            <span>{work.type}</span>
          </div>
          <h1 className="font-display text-5xl lg:text-7xl text-text leading-tight">
            {work.title}
          </h1>
        </div>
        
        <div className="aspect-video bg-surface rounded-sm overflow-hidden border border-line shadow-elegant transition-all duration-md ease-smooth hover:shadow-[0_20px_80px_-20px_rgba(134,168,231,0.4)]">
          <MediaDisplay 
            media={work.hero_media as unknown as HeroMedia | null} 
            title={work.title}
          />
        </div>
      </section>

      {/* Content with sidebar */}
      <section className="container-site py-24 border-t border-line">
        <div className="grid-12 gap-y-16">
          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-4 lg:sticky lg:top-28 lg:self-start animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="bg-surface rounded-lg border border-line p-10 space-y-8 transition-all duration-md ease-smooth hover:border-accent/30">
              {work.tech && work.tech.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-mute mb-4 tracking-wider uppercase">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {work.tech.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-4 py-2 bg-accent/10 text-accent text-sm rounded-md border border-accent/20 font-medium transition-all duration-sm ease-smooth hover:bg-accent/20 hover:border-accent/40"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {work.metrics && Array.isArray(work.metrics) && work.metrics.length > 0 && (
                <div className="pt-8 border-t border-line">
                  <h3 className="text-sm font-bold text-mute mb-6 tracking-wider uppercase">Key Results</h3>
                  <div className="space-y-6">
                    {(work.metrics as Array<{label: string; value: string}>).map((metric, idx) => (
                      <div key={idx} className="group">
                        <div className="text-3xl font-display text-accent mb-2 transition-transform duration-sm ease-smooth group-hover:scale-105">
                          {metric.value}
                        </div>
                        <div className="text-sm text-mute leading-relaxed">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Main content */}
          <article className="col-span-12 lg:col-span-8 space-y-16 animate-fade-in" style={{ animationDelay: '200ms' }}>
            {work.summary && (
              <div className="prose prose-invert prose-xl max-w-none">
                <p className="text-xl lg:text-2xl text-mute leading-relaxed">
                  {work.summary}
                </p>
              </div>
            )}

            {work.body && (
              <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:text-text prose-p:text-mute prose-p:leading-relaxed prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-text prose-strong:font-semibold">
                <ReactMarkdown>{work.body}</ReactMarkdown>
              </div>
            )}

            {work.gallery && Array.isArray(work.gallery) && work.gallery.length > 0 && (
              <div className="pt-8 border-t border-line">
                <h2 className="font-display text-4xl text-text mb-10">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {(work.gallery as unknown as GalleryItem[]).map((item, idx) => (
                    <div 
                      key={idx} 
                      className="group aspect-video bg-surface rounded-sm overflow-hidden border border-line transition-all duration-md ease-smooth hover:border-accent/50 hover:shadow-elegant animate-fade-in"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <MediaDisplay 
                        media={item as unknown as HeroMedia}
                        title={`${work.title} gallery ${idx + 1}`}
                        className="transition-transform duration-md ease-smooth group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="container-site py-32 border-t border-line">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-10">
          <Link 
            to="/contact"
            className="group inline-flex items-center gap-3 px-12 py-6 bg-accent text-base text-lg rounded-md font-medium transition-all duration-sm ease-smooth hover:scale-[1.02] hover:shadow-[0_10px_40px_-10px_rgba(201,243,29,0.4)]"
          >
            Start a Strategy
            <ArrowRight className="w-6 h-6 transition-transform duration-sm ease-smooth group-hover:translate-x-2" />
          </Link>

          {otherWork && (
            <Link 
              to={`/work/${otherWork.slug}`}
              className="group inline-flex items-center gap-2 text-lg text-mute hover:text-accent transition-all duration-sm ease-smooth hover:gap-3"
            >
              <span>View Another Project</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default WorkDetail;
