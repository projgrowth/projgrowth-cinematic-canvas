/**
 * About Page
 */

import { Section } from "@/components/ui/section";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import PageHeader from "@/components/PageHeader";
import LeafDivider from "@/components/LeafDivider";

const About = () => {
  // PLACEHOLDER — replace with verified numbers
  const stats = [
    { value: "9", label: "Client Partners" },
    { value: "5", label: "Service Areas" },
    { value: "Orlando", label: "Based In" },
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
      <Section>
        <ScrollReveal variant="fade-up">
          <PageHeader className="mb-12 md:mb-16">
            <h1 className="font-display text-text mb-5">
              About Us
            </h1>
            <p className="lede max-w-3xl">
              We're a team of strategists, designers, and developers who believe in the power 
              of great design and thoughtful technology to transform businesses.
            </p>
          </PageHeader>
        </ScrollReveal>

        {/* Stats Row */}
        <ScrollReveal variant="fade-up" delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-cards py-10 md:py-12 border-t border-b border-line mb-16">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="font-display text-3xl md:text-4xl text-accent mb-2">
                  <AnimatedCounter value={stat.value} />
                </div>
                <p className="text-sm text-mute">{stat.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Mission */}
        <ScrollReveal variant="fade-up">
          <div className="grid-12 gap-y-10 section">
            <div className="col-span-12 lg:col-span-4">
              <h2 className="font-display text-text">Our Mission</h2>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <p className="text-xl md:text-2xl text-text leading-relaxed max-w-readable">
                To empower businesses with digital solutions that are not only visually stunning 
                but also strategically sound and technically excellent.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Values */}
        <LeafDivider />
        <ScrollReveal variant="fade-up">
          <div className="section">
            <h2 className="font-display text-text mb-12 md:mb-16">Our Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-cards">
              {values.map((value, idx) => (
                <ScrollReveal key={idx} variant="scale" delay={idx * 0.1}>
                  <div className="p-7 md:p-8 bg-surface rounded-lg border border-line transition-all duration-md ease-smooth hover:border-accent/40 hover:shadow-elegant h-full">
                    <h3 className="font-display text-accent mb-3">
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
