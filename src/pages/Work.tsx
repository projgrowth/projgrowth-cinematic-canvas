import Layout from "@/components/Layout";
import CategoryFilter from "@/components/CategoryFilter";
import SearchBar from "@/components/SearchBar";
import { useState, useMemo } from "react";
import { ArrowUpRight } from "lucide-react";

const Work = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const projects = [
    {
      title: "TechFlow",
      category: "SaaS",
      description: "End-to-end platform redesign for B2B workflow automation",
      tags: ["Strategy", "Design", "Development"],
      details: "Redesigned the entire platform from ground up, focusing on user workflows and modern design patterns. Achieved 40% increase in user engagement."
    },
    {
      title: "Urban Nest",
      category: "Real Estate",
      description: "Modern property marketplace with immersive 3D experiences",
      tags: ["Branding", "Web Design", "3D"],
      details: "Created an innovative property viewing experience with 3D walkthroughs and AR features. Reduced time-to-sale by 25%."
    },
    {
      title: "FitCore",
      category: "Health",
      description: "Mobile-first fitness platform connecting trainers and clients",
      tags: ["Mobile App", "UX/UI", "API"],
      details: "Built a comprehensive fitness ecosystem with real-time tracking, video streaming, and payment integration. 50K+ active users."
    }
  ];

  const categories = ["All", "SaaS", "Real Estate", "Health"];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = activeCategory === "All" || project.category === activeCategory;
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <Layout
      seoTitle="Our Work - ProjGrowth Portfolio | Featured Projects"
      seoDescription="Explore our portfolio of digital design and development projects. See how we've helped brands create impactful digital experiences."
      seoKeywords="portfolio, case studies, web design projects, digital projects, UX design work"
      canonicalUrl="/work"
    >
      <section className="container-site py-24">
        <div className="mb-12 animate-fade-in">
          <h1 className="font-display text-5xl lg:text-7xl text-text mb-6">
            Featured Projects
          </h1>
          <p className="text-xl text-mute max-w-2xl mb-8">
            A showcase of our recent projects and collaborations with forward-thinking brands.
          </p>
        </div>

        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search projects..."
        />

        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {filteredProjects.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-xl text-mute">No projects found matching your criteria.</p>
          </div>
        ) : (
          <div className="stack gap-12">
            {filteredProjects.map((project, idx) => {
              const isExpanded = expandedProject === idx;
              return (
              <div 
                className="group border-t border-line transition-all duration-md ease-smooth hover:border-accent/50 animate-slide-up"
                style={{ animationDelay: `${idx * 150}ms`, animationFillMode: "both" }}
              >
                <div 
                  className="grid-12 gap-y-6 py-12 cursor-pointer"
                  onClick={() => setExpandedProject(isExpanded ? null : idx)}
                >
                  <div className="col-span-12 lg:col-span-4">
                    <span className="text-sm text-mute mb-2 block">{project.category}</span>
                    <h2 className="font-display text-4xl text-text transition-colors duration-sm ease-smooth group-hover:text-accent">
                      {project.title}
                    </h2>
                  </div>
                  
                  <div className="col-span-12 lg:col-span-5">
                    <p className="text-lg text-mute mb-6">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span 
                          key={i}
                          className="px-4 py-2 bg-surface border border-line rounded-md text-sm text-text transition-all duration-sm ease-smooth hover:border-accent hover:text-accent"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-12 lg:col-span-3 flex items-center justify-end gap-3">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedProject(isExpanded ? null : idx);
                      }}
                      className="px-6 py-3 border border-line rounded-md text-text font-medium transition-all duration-sm ease-smooth hover:border-accent hover:text-accent"
                    >
                      {isExpanded ? "Show Less" : "Learn More"}
                    </button>
                    <button className="p-3 border border-line rounded-md text-text transition-all duration-sm ease-smooth hover:border-accent hover:text-accent hover:shadow-elegant">
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="grid-12 pb-12 animate-fade-in">
                    <div className="col-span-12 lg:col-span-8 lg:col-start-5">
                      <div className="p-8 bg-surface rounded-lg border border-line">
                        <h3 className="font-display text-2xl text-text mb-4">Project Details</h3>
                        <p className="text-mute mb-6">{project.details}</p>
                        <button className="px-8 py-3 bg-accent text-base rounded-md font-medium hover:bg-accent/90 transition-all duration-sm ease-smooth">
                          View Full Case Study
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Work;
