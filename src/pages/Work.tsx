import { Section } from "@/components/ui/section";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import CategoryFilter from "@/components/CategoryFilter";
import SearchBar from "@/components/SearchBar";
import CaseStudyCard from "@/components/CaseStudyCard";
import CaseStudyCardSkeleton from "@/components/CaseStudyCardSkeleton";
import CaseStudySheet from "@/components/CaseStudySheet";
import BentoGrid from "@/components/BentoGrid";
import ScrollReveal from "@/components/ScrollReveal";
import PageHeader from "@/components/PageHeader";
import { caseStudies, categories, CaseStudy } from "@/data/caseStudies";
import { Grid3X3, List, ArrowUpDown, LayoutGrid } from "lucide-react";
import QuickContactForm from "@/components/QuickContactForm";
import GlobalCTA from "@/components/GlobalCTA";

// Define types for sort options and view mode
type SortOption = "default" | "a-z" | "z-a" | "category";
type ViewMode = "bento" | "grid" | "list";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "a-z", label: "A → Z" },
  { value: "z-a", label: "Z → A" },
  { value: "category", label: "Category" },
];

const Work = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [activeCategory, setActiveCategory] = useState(() => 
    searchParams.get("category") || "All"
  );
  const [searchQuery, setSearchQuery] = useState(() => 
    searchParams.get("q") || ""
  );
  const [sortBy, setSortBy] = useState<SortOption>(() => 
    (searchParams.get("sort") as SortOption) || "default"
  );
  const [viewMode, setViewMode] = useState<ViewMode>(() => 
    (searchParams.get("view") as ViewMode) || "bento"
  );
  
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (activeCategory !== "All") params.set("category", activeCategory);
    if (searchQuery) params.set("q", searchQuery);
    if (sortBy !== "default") params.set("sort", sortBy);
    if (viewMode !== "grid") params.set("view", viewMode);
    
    setSearchParams(params, { replace: true });
  }, [activeCategory, searchQuery, sortBy, viewMode, setSearchParams]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredAndSortedCaseStudies = useMemo(() => {
    let result = caseStudies.filter((study) => {
      const matchesCategory = activeCategory === "All" || study.categories.includes(activeCategory);
      const matchesSearch = 
        study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    switch (sortBy) {
      case "a-z":
        result = [...result].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "z-a":
        result = [...result].sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "category":
        result = [...result].sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        break;
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  const handleCardClick = (study: CaseStudy) => {
    setSelectedCaseStudy(study);
    setSheetOpen(true);
  };

  const handleClearFilters = () => {
    setActiveCategory("All");
    setSearchQuery("");
    setSortBy("default");
  };

  const hasActiveFilters = activeCategory !== "All" || searchQuery || sortBy !== "default";

  return (
    <Layout
      seoTitle="Our Work - ProjGrowth | Portfolio & Case Studies"
      seoDescription="Explore our portfolio of successful brand strategy, web design, and content system projects. See how we've helped businesses like GFG Solutions, Smart Financial, and more grow their digital presence."
      seoKeywords="portfolio, case studies, brand strategy examples, web design portfolio, content systems, cinematic production, digital projects"
      canonicalUrl="/work"
    >
      <Section>
        <ScrollReveal variant="fade-up">
          <PageHeader className="mb-12 md:mb-16 relative z-10">
            <h1 className="font-display text-text mb-5">
              Work
            </h1>
            <p className="lede max-w-3xl">
              A curated selection of systems, content engines, and digital builds designed to increase clarity, output, and long-term brand equity.
            </p>
          </PageHeader>
        </ScrollReveal>

        {/* Filter Bar */}
        <ScrollReveal variant="fade-up" delay={0.1}>
          <div className="space-y-4 mb-10 relative z-10">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search case studies..."
            />

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />

              {/* Sort & View Controls */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="appearance-none pl-9 pr-8 py-2 bg-surface border border-line rounded-md text-sm text-text cursor-pointer hover:border-accent/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mute pointer-events-none" />
                  <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-mute pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                <div className="flex border border-line rounded-md overflow-hidden">
                  <button
                    onClick={() => setViewMode("bento")}
                    className={`p-2 transition-colors ${
                      viewMode === "bento" 
                        ? "bg-accent/10 text-accent" 
                        : "text-mute hover:text-text hover:bg-surface"
                    }`}
                    aria-label="Bento view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 transition-colors ${
                      viewMode === "grid" 
                        ? "bg-accent/10 text-accent" 
                        : "text-mute hover:text-text hover:bg-surface"
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 transition-colors ${
                      viewMode === "list" 
                        ? "bg-accent/10 text-accent" 
                        : "text-mute hover:text-text hover:bg-surface"
                    }`}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {hasActiveFilters && (
              <p className="text-sm text-mute">
                Showing {filteredAndSortedCaseStudies.length} of {caseStudies.length} projects
              </p>
            )}
          </div>
        </ScrollReveal>

        {filteredAndSortedCaseStudies.length === 0 ? (
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
        ) : viewMode === "bento" ? (
          <BentoGrid
            caseStudies={filteredAndSortedCaseStudies}
            onCardClick={handleCardClick}
            isLoading={isLoading}
          />
        ) : (
          <motion.div 
            className={
              viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-cards relative z-10"
                : "flex flex-col gap-4 relative z-10"
            }
            layout
          >
            <AnimatePresence mode="popLayout">
              {isLoading ? (
                <CaseStudyCardSkeleton count={6} />
              ) : (
                filteredAndSortedCaseStudies.map((study, idx) => (
                  <motion.div
                    key={study.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                  >
                    <CaseStudyCard
                      caseStudy={study}
                      onClick={() => handleCardClick(study)}
                      index={idx}
                      viewMode={viewMode}
                    />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </Section>

      {/* Quick Contact */}
      <Section>
        <ScrollReveal variant="fade-up">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-display text-text mb-2">Like What You See?</h2>
            <p className="text-mute mb-6">Tell us about your project and let's create something great together.</p>
            <QuickContactForm />
          </div>
        </ScrollReveal>
      </Section>

      <GlobalCTA />

      <CaseStudySheet
        caseStudy={selectedCaseStudy}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </Layout>
  );
};

export default Work;
