import Layout from "@/components/Layout";
import { ArrowRight, Target, Rocket, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Home = () => {
  const frameworkSteps = [
    {
      icon: Target,
      title: "Discover",
      description: "We audit your market position and map untapped growth opportunities."
    },
    {
      icon: Rocket,
      title: "Build",
      description: "Custom systems and content built to convert your ideal clients."
    },
    {
      icon: Zap,
      title: "Automate",
      description: "Scale your reach with smart automation and strategic workflows."
    },
    {
      icon: TrendingUp,
      title: "Scale",
      description: "Compound results through data-driven optimization and iteration."
    }
  ];

  // Fetch featured work from database
  const { data: featuredWork, isLoading } = useQuery({
    queryKey: ['featured-work'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('work')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data;
    }
  });

  const stats = [
    "100+ projects shipped",
    "2–5x revenue lift potential",
    "98% client satisfaction"
  ];

  return (
    <Layout>
      {/* Section A: Hero */}
      <section className="relative container-site py-32 min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] animate-[pan_60s_linear_infinite]"></div>
        </div>
        
        {/* Gradient lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-accent-alt to-transparent opacity-20 animate-[slide_8s_ease-in-out_infinite]"></div>
          <div className="absolute top-2/3 -right-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-accent-alt to-transparent opacity-20 animate-[slide_10s_ease-in-out_infinite_reverse]"></div>
        </div>

        <div className="grid-12 relative z-10">
          <div className="col-span-12 lg:col-span-10 stack gap-8 animate-fade-in">
            <h1 className="font-display text-5xl lg:text-7xl leading-tight text-text">
              Growth engine for
              <br />
              <span className="text-accent">financial and legal</span> brands
            </h1>
            
            <p className="text-xl lg:text-2xl text-mute max-w-2xl">
              We build the systems, content, and automation that compound results.
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <Link 
                to="/work"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-base rounded-md font-medium transition-all duration-sm ease-smooth hover:scale-[1.02]"
              >
                View Work
                <ArrowRight className="w-5 h-5 transition-transform duration-sm ease-smooth group-hover:translate-x-1" />
              </Link>
              
              <Link 
                to="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-line text-text rounded-md font-medium transition-all duration-sm ease-smooth hover:border-accent relative overflow-hidden"
              >
                <span className="relative z-10">Start a Strategy</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent scale-x-0 transition-transform duration-sm ease-smooth group-hover:scale-x-100 origin-left"></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section B: Proof Strip */}
      <section className="container-site py-16 border-t border-line">
        <div className="flex flex-wrap justify-center gap-8 lg:gap-16 mb-16">
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              className="px-6 py-3 bg-surface border border-line rounded-lg text-text font-medium transition-all duration-sm ease-smooth hover:border-accent/50"
            >
              {stat}
            </div>
          ))}
        </div>
        
        {/* Client logos placeholder */}
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-30">
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i}
              className="w-32 h-12 bg-mute/20 rounded transition-opacity duration-sm ease-smooth hover:opacity-100"
            />
          ))}
        </div>
      </section>

      {/* Section C: The Framework */}
      <section className="container-site py-24 border-t border-line">
        <div className="mb-16">
          <h2 className="font-display text-4xl lg:text-5xl text-text mb-4">The Framework</h2>
          <p className="text-xl text-mute">Four steps to predictable growth</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {frameworkSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="group p-8 bg-surface rounded-lg border border-line transition-all duration-md ease-smooth hover:border-accent/50 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="w-12 h-12 mb-6 rounded-md bg-accent/10 flex items-center justify-center transition-colors duration-sm ease-smooth group-hover:bg-accent/20">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-2xl text-text mb-3 transition-colors duration-sm ease-smooth group-hover:text-accent">
                  {step.title}
                </h3>
                <p className="text-mute">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section D: Featured Work */}
      <section className="container-site py-24 border-t border-line">
        <div className="mb-16">
          <h2 className="font-display text-4xl lg:text-5xl text-text mb-4">Featured Work</h2>
          <p className="text-xl text-mute">Real results for ambitious brands</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeleton
            Array(3).fill(0).map((_, idx) => (
              <div key={idx} className="bg-surface rounded-lg border border-line overflow-hidden animate-pulse">
                <div className="aspect-video bg-mute/10"></div>
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-mute/10 rounded w-3/4"></div>
                  <div className="h-4 bg-mute/10 rounded w-1/2"></div>
                </div>
              </div>
            ))
          ) : featuredWork && featuredWork.length > 0 ? (
            featuredWork.map((work) => {
              const metrics = work.metrics as Array<{label: string; value: string}> | null;
              const heroMedia = work.hero_media as {type: string; url: string} | null;
              const primaryMetric = metrics && metrics.length > 0 
                ? `${metrics[0].value} ${metrics[0].label}`
                : work.summary;
              
              return (
                <Link
                  key={work.id}
                  to={`/work/${work.slug}`}
                  className="group relative bg-surface rounded-lg border border-line overflow-hidden transition-all duration-md ease-smooth hover:border-accent-alt/50 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(134,168,231,0.3)]"
                >
                  <div className="aspect-video bg-mute/10 overflow-hidden">
                    <img 
                      src={heroMedia?.url || '/placeholder.svg'} 
                      alt={work.title}
                      className="w-full h-full object-cover transition-transform duration-md ease-smooth group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl text-text mb-2 transition-colors duration-sm ease-smooth group-hover:text-accent">
                      {work.title}
                    </h3>
                    <p className="text-accent-alt font-medium">
                      {primaryMetric}
                    </p>
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="col-span-3 text-center text-mute">No featured work available</p>
          )}
        </div>
      </section>

      {/* Section E: Convert */}
      <section className="container-site py-24 border-t border-line">
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-6 flex flex-col justify-center">
            <h2 className="font-display text-4xl lg:text-5xl text-text mb-6">
              Ready to move faster
            </h2>
            <p className="text-xl text-mute mb-8">
              Let's build a growth system tailored to your market and goals.
            </p>
          </div>
          
          <div className="col-span-12 lg:col-span-6 flex items-center justify-center lg:justify-end">
            <Link 
              to="/contact"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-accent text-base text-lg rounded-md font-medium transition-all duration-sm ease-smooth hover:scale-[1.02] hover:shadow-[0_10px_40px_-10px_rgba(201,243,29,0.4)]"
            >
              Start a Strategy
              <ArrowRight className="w-6 h-6 transition-transform duration-sm ease-smooth group-hover:translate-x-2" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
