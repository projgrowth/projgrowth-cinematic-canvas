import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { Grid, LayoutGrid } from "lucide-react";

const Work = () => {
  const [industryFilter, setIndustryFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'masonry'>('grid');

  const { data: workItems, isLoading } = useQuery({
    queryKey: ['work'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('work')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Get unique industries and types for filters
  const industries = ['All', ...new Set(workItems?.map(w => w.industry) || [])];
  const types = ['All', ...new Set(workItems?.map(w => w.type) || [])];

  // Filter items
  const filteredItems = workItems?.filter(item => {
    const matchesIndustry = industryFilter === 'All' || item.industry === industryFilter;
    const matchesType = typeFilter === 'All' || item.type === typeFilter;
    return matchesIndustry && matchesType;
  });

  return (
    <Layout>
      <section className="container-site py-24">
        <div className="mb-16">
          <h1 className="font-display text-5xl lg:text-6xl text-text mb-6">Our Work</h1>
          <p className="text-xl text-mute max-w-2xl">
            Real results for ambitious financial and legal brands
          </p>
        </div>

        {/* Filters and Layout Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-12 pb-8 border-b border-line">
          <div className="flex flex-wrap items-center gap-4">
            {/* Industry Filter */}
            <div>
              <label className="text-sm text-mute mb-2 block">Industry</label>
              <select 
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="px-4 py-2 bg-surface border border-line rounded-md text-text focus:outline-none focus:border-accent transition-colors"
              >
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="text-sm text-mute mb-2 block">Type</label>
              <select 
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 bg-surface border border-line rounded-md text-text focus:outline-none focus:border-accent transition-colors"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Layout Toggle */}
          <div className="flex gap-2 bg-surface border border-line rounded-md p-1">
            <button
              onClick={() => setLayoutMode('grid')}
              className={`p-2 rounded transition-colors ${
                layoutMode === 'grid' ? 'bg-accent text-base' : 'text-mute hover:text-text'
              }`}
              aria-label="Grid layout"
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setLayoutMode('masonry')}
              className={`p-2 rounded transition-colors ${
                layoutMode === 'masonry' ? 'bg-accent text-base' : 'text-mute hover:text-text'
              }`}
              aria-label="Masonry layout"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Work Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6).fill(0).map((_, idx) => (
              <div key={idx} className="bg-surface rounded-lg border border-line overflow-hidden animate-pulse">
                <div className="aspect-video bg-mute/10"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-mute/10 rounded w-3/4"></div>
                  <div className="h-4 bg-mute/10 rounded w-1/2"></div>
                  <div className="h-4 bg-mute/10 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredItems && filteredItems.length > 0 ? (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${
            layoutMode === 'masonry' ? 'auto-rows-auto' : ''
          }`}>
            {filteredItems.map((item) => {
              const metrics = item.metrics as Array<{label: string; value: string}> | null;
              const heroMedia = item.hero_media as {type: string; url: string} | null;
              const primaryMetric = metrics && metrics.length > 0
                ? metrics[0]
                : null;

              return (
                <Link
                  key={item.id}
                  to={`/work/${item.slug}`}
                  className="group bg-surface rounded-lg border border-line overflow-hidden transition-all duration-md ease-smooth hover:border-accent/50 hover:-translate-y-2"
                >
                  <div className="aspect-video bg-mute/10 overflow-hidden relative">
                    <img 
                      src={heroMedia?.url || '/placeholder.svg'} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-md ease-smooth group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-accent">{item.industry}</span>
                      <span className="text-mute">•</span>
                      <span className="text-mute">{item.type}</span>
                    </div>
                    
                    <h3 className="font-display text-2xl text-text transition-colors duration-sm group-hover:text-accent">
                      {item.title}
                    </h3>
                    
                    {primaryMetric && (
                      <p className="text-accent-alt font-medium">
                        {primaryMetric.value} {primaryMetric.label}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-xl text-mute">No projects match your filters</p>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Work;
