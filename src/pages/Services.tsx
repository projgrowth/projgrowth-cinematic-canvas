import Layout from "@/components/Layout";

const Services = () => {
  const services = [
    {
      number: "01",
      title: "Brand Strategy",
      description: "We help you define your unique position in the market and build a brand that truly resonates.",
      capabilities: ["Brand Identity", "Positioning", "Messaging", "Guidelines"]
    },
    {
      number: "02",
      title: "Digital Design",
      description: "Beautiful, functional interfaces crafted with attention to detail and user experience at the core.",
      capabilities: ["UI/UX Design", "Product Design", "Prototyping", "Design Systems"]
    },
    {
      number: "03",
      title: "Development",
      description: "Modern, scalable web applications built with best practices and cutting-edge technologies.",
      capabilities: ["Web Development", "Mobile Apps", "API Integration", "Performance"]
    },
    {
      number: "04",
      title: "Growth",
      description: "Data-driven strategies to accelerate your growth and maximize your digital presence.",
      capabilities: ["SEO", "Content Strategy", "Analytics", "Conversion Optimization"]
    }
  ];

  return (
    <Layout>
      <section className="container-site py-24">
        <div className="mb-20">
          <h1 className="font-display text-5xl lg:text-7xl text-text mb-6">
            Our Services
          </h1>
          <p className="text-xl text-mute max-w-2xl">
            Comprehensive digital solutions tailored to your business goals and user needs.
          </p>
        </div>

        <div className="stack gap-1">
          {services.map((service, idx) => (
            <div 
              key={idx}
              className="group border-t border-line py-12 transition-all duration-md ease-smooth hover:bg-surface/30"
            >
              <div className="grid-12 gap-y-8">
                <div className="col-span-12 lg:col-span-2">
                  <span className="font-display text-5xl text-accent/30 transition-colors duration-sm ease-smooth group-hover:text-accent">
                    {service.number}
                  </span>
                </div>

                <div className="col-span-12 lg:col-span-6">
                  <h2 className="font-display text-4xl text-text mb-4 transition-colors duration-sm ease-smooth group-hover:text-accent">
                    {service.title}
                  </h2>
                  <p className="text-lg text-mute">
                    {service.description}
                  </p>
                </div>

                <div className="col-span-12 lg:col-span-4">
                  <h3 className="text-sm font-medium text-mute mb-4">Capabilities</h3>
                  <ul className="stack gap-3">
                    {service.capabilities.map((cap, i) => (
                      <li key={i} className="text-text">
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Services;
