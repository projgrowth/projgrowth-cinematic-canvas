/**
 * About Page
 */

import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import PageHeader from "@/components/PageHeader";
import LeafDivider from "@/components/LeafDivider";

const About = () => {
  const stats = [
    { value: "50+", label: "Projects Delivered" },
    { value: "8+", label: "Years Experience" },
    { value: "30+", label: "Happy Clients" },
    { value: "98%", label: "Client Retention" },
  ];

  const values = [
    {
      title: "Craft",
      description: "We believe in the power of meticulous attention to detail and thoughtful execution."
    },
    {
      title: "Impact",
      description: "Our work is driven by creating meaningful outcomes that move businesses forward."
    },
    {
      title: "Partnership",
      description: "We work alongside our clients as true partners, invested in their success."
    }
  ];

  return (
    <Layout
      seoTitle="About Us - ProjGrowth | Digital Design Studio in the US"
      seoDescription="Meet the team behind ProjGrowth. We're strategists, designers, and developers passionate about creating digital experiences that transform businesses and drive growth."
      seoKeywords="about ProjGrowth, creative team, design studio, company values, digital agency team, web design company"
      canonicalUrl="/about"
    >
      <section className="container-site py-16 md:py-24 relative">
        <ScrollReveal variant="fade-up">
          <PageHeader className="mb-16">
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl text-text mb-6">
              About Us
            </h1>
            <p className="text-xl text-mute max-w-3xl leading-relaxed">
              We're a team of strategists, designers, and developers who believe in the power 
              of great design and thoughtful technology to transform businesses.
            </p>
          </PageHeader>
        </ScrollReveal>

        {/* Stats Row */}
        <ScrollReveal variant="fade-up" delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-12 border-t border-b border-line mb-16">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="font-display text-3xl md:text-4xl lg:text-5xl text-accent mb-2">
                  <AnimatedCounter value={stat.value} />
                </div>
                <p className="text-sm text-mute">{stat.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Mission */}
        <LeafDivider />
        <ScrollReveal variant="fade-up">
          <div className="grid-12 gap-y-12 py-16 md:py-24">
            <div className="col-span-12 lg:col-span-4">
              <h2 className="font-display text-3xl lg:text-4xl text-text">Our Mission</h2>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <p className="text-2xl text-text leading-relaxed">
                To empower businesses with digital solutions that are not only visually stunning 
                but also strategically sound and technically excellent.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Values */}
        <LeafDivider />
        <ScrollReveal variant="fade-up">
          <div className="py-16 md:py-24">
            <h2 className="font-display text-3xl lg:text-4xl text-text mb-16">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, idx) => (
                <ScrollReveal key={idx} variant="scale" delay={idx * 0.1}>
                  <div className="p-8 bg-surface rounded-lg border border-line transition-all duration-md ease-smooth hover:border-accent/40 hover:shadow-elegant">
                    <h3 className="font-display text-2xl text-accent mb-4">
                      {value.title}
                    </h3>
                    <p className="text-mute">
                      {value.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

      </section>
    </Layout>
  );
};

export default About;
