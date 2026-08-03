import { Section } from "@/components/ui/section";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import CategoryFilter from "@/components/CategoryFilter";
import SearchBar from "@/components/SearchBar";
import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/PageHero";
import WorkTile from "@/components/WorkTile";
import { caseStudies, categories } from "@/data/caseStudies";
import GlobalCTA from "@/components/GlobalCTA";

const Work = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeCategory, setActiveCategory] = useState(() => 
    searchParams.get("category") || "All"
  );
  const [searchQuery, setSearchQuery] = useState(() => 
    searchParams.get("q") || ""
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (activeCategory !== "All") params.set("category", activeCategory);
    if (searchQuery) params.set("q", searchQuery);

    setSearchParams(params, { replace: true });
  }, [activeCategory, searchQuery, setSearchParams]);

  const filteredCaseStudies = useMemo(
    () =>
      caseStudies.filter((study) => {
      const matchesCategory = activeCategory === "All" || study.categories.includes(activeCategory);
      const matchesSearch = 
        study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
      }),
    [activeCategory, searchQuery]
  );

  const handleClearFilters = () => {
    setActiveCategory("All");
    setSearchQuery("");
  };

  const hasActiveFilters = activeCategory !== "All" || Boolean(searchQuery);
  const [lead, ...rest] = filteredCaseStudies;

  return (
    <Layout
      seoTitle="Our Work - ProjGrowth | Portfolio & Case Studies"
      seoDescription="Explore our portfolio of brand strategy, web design, and content projects helping businesses like GFG Solutions and Smart Financial grow."
      seoKeywords="portfolio, case studies, brand strategy examples, web design portfolio, content systems, cinematic production, digital projects"
      canonicalUrl="/work"
    >
      <Section>
        <PageHero
          chapter={{ number: 1, label: "Selected Work" }}
          title="Work"
          lede="A curated selection of systems, content engines, and digital builds designed to increase clarity, output, and long-term brand equity."
          className="mb-12 md:mb-16 relative z-10"
        />

        {/* Filter Bar */}
        <ScrollReveal variant="fade-up" delay={0.1}>
          <div className="space-y-4 mb-10 relative z-10">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search case studies..."
            />

            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            {hasActiveFilters && (
              <p className="text-sm text-mute">
                Showing {filteredCaseStudies.length} of {caseStudies.length} projects
              </p>
            )}
          </div>
        </ScrollReveal>

        {filteredCaseStudies.length === 0 ? (
          <ScrollReveal variant="fade-up">
            <div className="text-center section space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-surface border border-line flex items-center justify-center">
                <span className="text-2xl text-mute">∅</span>
              </div>
              <div>
                <p className="text-xl text-text mb-2">No projects found</p>
                <p className="text-mute">Try adjusting your filters or search terms</p>
              </div>
              <button
                onClick={handleClearFilters}
                className="btn-outline-cta"
              >
                Clear filters
              </button>
            </div>
          </ScrollReveal>
        ) : (
          <div className="relative z-10 stack gap-cards">
            {/* Lead project — full-width plate */}
            <ScrollReveal variant="fade-up">
              <WorkTile
                caseStudy={lead}
                aspect="aspect-[4/3] md:aspect-[2/1]"
                priority
                size="lead"
              />
            </ScrollReveal>

            {/* Remaining projects — two-up editorial rhythm */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-cards">
                {rest.map((study, idx) => (
                  <ScrollReveal
                    key={study.id}
                    variant="fade-up"
                    delay={Math.min(idx, 4) * 0.08}
                  >
                    <WorkTile
                      caseStudy={study}
                      aspect="aspect-[4/3]"
                    />
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        )}
      </Section>

      <GlobalCTA />
    </Layout>
  );
};

export default Work;
