import { useParams, Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
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
        <div className="container-site py-24">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-mute/10 rounded w-3/4"></div>
            <div className="aspect-video bg-mute/10 rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-mute/10 rounded"></div>
              <div className="h-4 bg-mute/10 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !work) {
    return <Navigate to="/work" replace />;
  }

  return (
    <Layout>
      {/* Back button */}
      <div className="container-site pt-8">
        <Link 
          to="/work"
          className="inline-flex items-center gap-2 text-mute hover:text-accent transition-colors duration-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Work
        </Link>
      </div>

      {/* Hero */}
      <section className="container-site py-16">
        <h1 className="font-display text-5xl lg:text-6xl text-text mb-8">
          {work.title}
        </h1>
        
        <div className="aspect-video bg-surface rounded-lg overflow-hidden border border-line">
          {(() => {
            const heroMedia = work.hero_media as {type: string; url: string} | null;
            return (
              <img 
                src={heroMedia?.url || '/placeholder.svg'} 
                alt={work.title}
                className="w-full h-full object-cover"
              />
            );
          })()}
        </div>
      </section>

      {/* Content with sidebar */}
      <section className="container-site py-16 border-t border-line">
        <div className="grid-12 gap-y-12">
          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
            <div className="bg-surface rounded-lg border border-line p-8 space-y-6">
              <div>
                <h3 className="text-sm font-medium text-mute mb-2">Industry</h3>
                <p className="text-text font-medium">{work.industry}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-mute mb-2">Type</h3>
                <p className="text-text font-medium">{work.type}</p>
              </div>

              {work.tech && work.tech.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-mute mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {work.tech.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-md border border-accent/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {work.metrics && Array.isArray(work.metrics) && work.metrics.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-mute mb-3">Key Results</h3>
                  <div className="space-y-3">
                    {(work.metrics as Array<{label: string; value: string}>).map((metric, idx) => (
                      <div key={idx}>
                        <div className="text-2xl font-display text-accent mb-1">
                          {metric.value}
                        </div>
                        <div className="text-sm text-mute">
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
          <article className="col-span-12 lg:col-span-8 space-y-12">
            {work.summary && (
              <div>
                <p className="text-xl text-mute leading-relaxed">
                  {work.summary}
                </p>
              </div>
            )}

            {work.body && (
              <div className="prose prose-invert prose-lg max-w-none">
                <ReactMarkdown>{work.body}</ReactMarkdown>
              </div>
            )}

            {work.gallery && Array.isArray(work.gallery) && work.gallery.length > 0 && (
              <div>
                <h2 className="font-display text-3xl text-text mb-6">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(work.gallery as Array<{type: string; url: string}>).map((item, idx) => (
                    <div key={idx} className="aspect-video bg-surface rounded-lg overflow-hidden border border-line">
                      <img 
                        src={item.url || '/placeholder.svg'} 
                        alt={`Gallery image ${idx + 1}`}
                        className="w-full h-full object-cover"
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
      <section className="container-site py-24 border-t border-line">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          <Link 
            to="/contact"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-accent text-base text-lg rounded-md font-medium transition-all duration-sm ease-smooth hover:scale-[1.02]"
          >
            Start a Strategy
            <ArrowRight className="w-6 h-6 transition-transform duration-sm ease-smooth group-hover:translate-x-2" />
          </Link>

          {otherWork && (
            <Link 
              to={`/work/${otherWork.slug}`}
              className="inline-flex items-center gap-2 text-mute hover:text-accent transition-colors duration-sm"
            >
              View Another Project
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default WorkDetail;
