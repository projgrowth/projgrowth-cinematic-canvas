import Layout from "@/components/Layout";
import CategoryFilter from "@/components/CategoryFilter";
import SearchBar from "@/components/SearchBar";
import CaseStudyCard from "@/components/CaseStudyCard";
import CaseStudySheet from "@/components/CaseStudySheet";
import ScrollReveal from "@/components/ScrollReveal";
import { useState, useMemo } from "react";
import { caseStudies, categories, CaseStudy } from "@/data/caseStudies";

const Work = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const filteredCaseStudies = useMemo(() => {
    return caseStudies.filter((study) => {
      const matchesCategory = activeCategory === "All" || study.categories.includes(activeCategory);
      const matchesSearch = 
        study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleCardClick = (study: CaseStudy) => {
    setSelectedCaseStudy(study);
    setSheetOpen(true);
  };

  return (
    <Layout
      seoTitle="Work - ProjGrowth | Case Studies & Portfolio"
      seoDescription="A curated selection of systems, content engines, and digital builds designed to increase clarity, output, and long-term brand equity."
      seoKeywords="case studies, content systems, web design, brand strategy, cinematic production, AI tools"
      canonicalUrl="/work"
    >
      <section className="container-site py-16 md:py-24">
        <ScrollReveal variant="fade-up">
          <div className="mb-16">
            <h1 className="font-display text-5xl lg:text-7xl text-text mb-6">
              Work
            </h1>
            <p className="text-xl text-mute max-w-3xl">
              A curated selection of systems, content engines, and digital builds designed to increase clarity, output, and long-term brand equity.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter Bar */}
        <ScrollReveal variant="fade-up" delay={0.1}>
          <div className="space-y-4 mb-10">
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

            {/* Results Counter */}
            {(activeCategory !== "All" || searchQuery) && (
              <p className="text-sm text-mute">
                Showing {filteredCaseStudies.length} of {caseStudies.length} projects
              </p>
            )}
          </div>
        </ScrollReveal>

        {filteredCaseStudies.length === 0 ? (
          <ScrollReveal variant="fade-up">
            <div className="text-center py-24 space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-surface border border-line flex items-center justify-center">
                <span className="text-2xl text-mute">∅</span>
              </div>
              <div>
                <p className="text-xl text-text mb-2">No projects found</p>
                <p className="text-mute">Try adjusting your filters or search terms</p>
              </div>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="px-6 py-3 border border-accent text-accent rounded-md hover:bg-accent/10 transition-colors"
              >
                Clear filters
              </button>
            </div>
          </ScrollReveal>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredCaseStudies.map((study, idx) => (
              <ScrollReveal key={study.id} variant="fade-up" delay={idx * 0.05}>
                <CaseStudyCard
                  caseStudy={study}
                  onClick={() => handleCardClick(study)}
                  index={idx}
                />
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>

      <CaseStudySheet
        caseStudy={selectedCaseStudy}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </Layout>
  );
};

export default Work;
