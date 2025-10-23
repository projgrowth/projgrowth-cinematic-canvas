import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Services = () => {
  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <Layout>
      <section className="container-site py-32">
        <div className="mb-20 animate-fade-in">
          <h1 className="font-display text-5xl lg:text-6xl text-text mb-6">Services</h1>
          <p className="text-xl text-mute max-w-2xl">
            Comprehensive solutions to grow your business
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-24">
            <LoadingSkeleton variant="list" count={4} />
          </div>
        ) : services && services.length > 0 ? (
          <div className="space-y-32">
            {services.map((service, idx) => (
              <div 
                key={service.id}
                className="group animate-fade-in"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="mb-16">
                  <div className="text-sm text-accent font-bold mb-3 tracking-wider">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <h2 className="font-display text-4xl lg:text-5xl text-text mb-6 transition-colors duration-sm group-hover:text-accent">
                    {service.title}
                  </h2>
                  <p className="text-xl text-mute max-w-3xl leading-relaxed">
                    {service.summary}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                  {/* Problem */}
                  <div className="bg-surface rounded-lg border border-line p-8 transition-all duration-md ease-smooth hover:border-accent/50 hover:-translate-y-1 hover:shadow-elegant">
                    <h3 className="font-display text-xl text-text mb-4">Problem</h3>
                    <p className="text-mute leading-relaxed">{service.problem}</p>
                  </div>

                  {/* Solution */}
                  <div className="bg-surface rounded-lg border border-line p-8 transition-all duration-md ease-smooth hover:border-accent/50 hover:-translate-y-1 hover:shadow-elegant">
                    <h3 className="font-display text-xl text-text mb-4">Solution</h3>
                    <p className="text-mute leading-relaxed">{service.solution}</p>
                  </div>

                  {/* Result */}
                  <div className="bg-surface rounded-lg border border-line p-8 transition-all duration-md ease-smooth hover:border-accent/50 hover:-translate-y-1 hover:shadow-elegant">
                    <h3 className="font-display text-xl text-text mb-4">Result</h3>
                    <p className="text-mute leading-relaxed">{service.result}</p>
                  </div>
                </div>

                {/* Inclusions */}
                {service.inclusions && service.inclusions.length > 0 && (
                  <div className="bg-surface rounded-lg border border-line p-10 mb-10 transition-all duration-md ease-smooth hover:border-accent/30">
                    <h3 className="font-display text-xl text-text mb-8">What's Included</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {service.inclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-mute group/item">
                          <span className="text-accent mt-1 transition-transform duration-sm ease-smooth group-hover/item:translate-x-1">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA */}
                <div className="flex justify-end">
                  <Link 
                    to="/contact"
                    className="group/btn inline-flex items-center gap-3 px-10 py-5 bg-accent text-base rounded-md font-medium transition-all duration-sm ease-smooth hover:scale-[1.02] hover:shadow-[0_10px_40px_-10px_rgba(201,243,29,0.4)]"
                  >
                    {service.cta_label || 'Get Started'}
                    <ArrowRight className="w-5 h-5 transition-transform duration-sm ease-smooth group-hover/btn:translate-x-2" />
                  </Link>
                </div>

                {idx < services.length - 1 && (
                  <div className="mt-32 border-t border-line"></div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-xl text-mute">No services available</p>
        )}
      </section>
    </Layout>
  );
};

export default Services;
