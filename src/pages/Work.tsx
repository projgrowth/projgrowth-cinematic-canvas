import Layout from "@/components/Layout";

const Work = () => {
  const projects = [
    {
      title: "TechFlow",
      category: "SaaS Platform",
      description: "End-to-end platform redesign for B2B workflow automation",
      tags: ["Strategy", "Design", "Development"]
    },
    {
      title: "Urban Nest",
      category: "Real Estate",
      description: "Modern property marketplace with immersive 3D experiences",
      tags: ["Branding", "Web Design", "3D"]
    },
    {
      title: "FitCore",
      category: "Health & Wellness",
      description: "Mobile-first fitness platform connecting trainers and clients",
      tags: ["Mobile App", "UX/UI", "API"]
    }
  ];

  return (
    <Layout>
      <section className="container-site py-24">
        <div className="mb-16 animate-fade-in">
          <h1 className="font-display text-5xl lg:text-7xl text-text mb-6">
            Featured Projects
          </h1>
          <p className="text-xl text-mute max-w-2xl">
            A showcase of our recent projects and collaborations with forward-thinking brands.
          </p>
        </div>

        <div className="stack gap-12">
          {projects.map((project, idx) => (
            <div 
              key={idx}
              className="group grid-12 gap-y-6 py-12 border-t border-line transition-all duration-md ease-smooth hover:border-accent/50 animate-slide-up"
              style={{ animationDelay: `${idx * 150}ms`, animationFillMode: "both" }}
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

              <div className="col-span-12 lg:col-span-3 flex items-center justify-end">
                <button className="px-6 py-3 border border-line rounded-md text-text font-medium transition-all duration-sm ease-smooth hover:border-accent hover:text-accent hover:shadow-elegant">
                  View Case Study
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Work;
