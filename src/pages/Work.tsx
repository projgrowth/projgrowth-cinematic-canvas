import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import WorkCard from "@/components/WorkCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { WorkItem } from "@/types/database";
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
      <section className="container-site py-32">
        <div className="mb-20 animate-fade-in">
          <h1 className="font-display text-5xl lg:text-6xl text-text mb-6">Our Work</h1>
          <p className="text-xl text-mute max-w-2xl">
            Real results for ambitious financial and legal brands
          </p>
        </div>

        {/* Filters and Layout Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-16 pb-8 border-b border-line animate-fade-in">
          <div className="flex flex-wrap items-center gap-6">
            {/* Industry Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-mute">Industry</label>
              <select 
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="px-6 py-3 bg-surface border border-line rounded-md text-text focus:outline-none focus:border-accent transition-all duration-sm ease-smooth hover:border-accent/50"
              >
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-mute">Type</label>
              <select 
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-6 py-3 bg-surface border border-line rounded-md text-text focus:outline-none focus:border-accent transition-all duration-sm ease-smooth hover:border-accent/50"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Layout Toggle */}
          <div className="flex gap-2 bg-surface border border-line rounded-md p-1.5">
            <button
              onClick={() => setLayoutMode('grid')}
              className={`p-3 rounded transition-all duration-sm ease-smooth ${
                layoutMode === 'grid' ? 'bg-accent text-base shadow-sm' : 'text-mute hover:text-text hover:bg-base-light'
              }`}
              aria-label="Grid layout"
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setLayoutMode('masonry')}
              className={`p-3 rounded transition-all duration-sm ease-smooth ${
                layoutMode === 'masonry' ? 'bg-accent text-base shadow-sm' : 'text-mute hover:text-text hover:bg-base-light'
              }`}
              aria-label="Masonry layout"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Work Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <LoadingSkeleton variant="card" count={6} />
          </div>
        ) : filteredItems && filteredItems.length > 0 ? (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ${
            layoutMode === 'masonry' ? 'auto-rows-auto' : ''
          }`}>
            {filteredItems.map((item, idx) => (
              <div 
                key={item.id}
                className="animate-fade-in"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <WorkCard item={item as unknown as WorkItem} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <p className="text-xl text-mute">No projects match your filters</p>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Work;
