import { Section } from "@/components/ui/section";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/PageHero";
import WorkTile from "@/components/WorkTile";
import { platedCaseStudies, platedCategories } from "@/data/caseStudies";

const Work = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const availableCategories = platedCategories();

  const [activeCategory, setActiveCategory] = useState(() => {
    const fromUrl = searchParams.get("category") || "All";
    return availableCategories.includes(fromUrl) ? fromUrl : "All";
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (activeCategory !== "All") params.set("category", activeCategory);
    setSearchParams(params, { replace: true });
  }, [activeCategory, setSearchParams]);

  const filteredCaseStudies = useMemo(
    () =>
      platedCaseStudies().filter(
        (study) => activeCategory === "All" || study.categories.includes(activeCategory)
      ),
    [activeCategory]
  );

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
          kicker="Selected Work"
          quiet
          title="Work"
          lede="A curated selection of systems, content engines, and digital builds designed to increase clarity, output, and long-term brand equity."
          className="mb-10 md:mb-12 relative z-10"
        />

        <nav aria-label="Filter work" className="relative z-10 mb-10 flex flex-wrap gap-x-6 gap-y-1">
          {availableCategories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`min-h-11 bg-transparent px-0 text-sm ${
                  isActive
                    ? "text-[rgb(241,240,238)] underline decoration-[rgb(241,240,238)] underline-offset-[6px]"
                    : "text-[rgba(241,240,238,0.45)] hover:text-[rgb(241,240,238)]"
                }`}
                aria-current={isActive ? "true" : undefined}
              >
                {category}
              </button>
            );
          })}
        </nav>

        {filteredCaseStudies.length === 0 || !lead ? (
          <div className="relative z-10 section space-y-4">
            <p className="text-xl text-[rgb(241,240,238)]">No projects in this discipline</p>
            <button type="button" onClick={() => setActiveCategory("All")} className="btn-outline-cta">
              Show all work
            </button>
          </div>
        ) : (
          <div className="relative z-10 stack gap-cards">
            <ScrollReveal variant="fade-up">
              <WorkTile
                caseStudy={lead}
                aspect="aspect-[16/10]"
                priority
                size="lead"
              />
            </ScrollReveal>

            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-cards">
                {rest.map((study, idx) => (
                  <ScrollReveal
                    key={study.id}
                    variant="fade-up"
                    delay={Math.min(idx, 4) * 0.08}
                  >
                    <WorkTile caseStudy={study} aspect="aspect-[16/10]" />
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        )}
      </Section>
    </Layout>
  );
};

export default Work;
