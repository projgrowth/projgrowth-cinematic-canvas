/**
 * About Page
 * 
 * PLACEHOLDER CONTENT sections are marked below.
 * Replace with real data before going live.
 */

import Layout from "@/components/Layout";
// Hidden for launch - uncomment when real content is ready:
// import TeamSection from "@/components/TeamSection";
// import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import ScrollReveal from "@/components/ScrollReveal";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useCounterAnimation } from "@/hooks/use-counter-animation";

const AnimatedStat = ({ number, label }: { number: string; label: string }) => {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.5 });
  const match = number.match(/(\d+)([+%]*)/);
  const numericValue = match ? parseInt(match[1]) : 0;
  const suffix = match ? match[2] : '';
  const count = useCounterAnimation(numericValue, 2000, isVisible);

  return (
    <div ref={elementRef} className="text-center">
      <div className="font-display text-5xl text-accent mb-2">
        {count}{suffix}
      </div>
      <div className="text-mute">{label}</div>
    </div>
  );
};

const About = () => {
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

  // TODO: Replace with real company statistics
  // PLACEHOLDER STATS - Update these numbers with actual metrics
  const stats = [
    { number: "50+", label: "Projects Delivered" }, // PLACEHOLDER
    { number: "8+", label: "Years Experience" }, // PLACEHOLDER
    { number: "30+", label: "Happy Clients" }, // PLACEHOLDER
    { number: "15", label: "Team Members" } // PLACEHOLDER
  ];

  return (
    <Layout
      seoTitle="About Us - ProjGrowth | Meet Our Creative Team"
      seoDescription="Learn about our mission, values, and the talented team behind ProjGrowth. 15+ team members dedicated to creating exceptional digital experiences."
      seoKeywords="about us, creative team, design studio team, company values, mission statement"
      canonicalUrl="/about"
    >
      <section className="container-site py-16 md:py-24">
        <ScrollReveal variant="fade-up">
          <div className="mb-16">
            <h1 className="font-display text-5xl lg:text-7xl text-text mb-6">
              About Us
            </h1>
            <p className="text-xl text-mute max-w-3xl leading-relaxed">
              We're a team of strategists, designers, and developers who believe in the power 
              of great design and thoughtful technology to transform businesses.
            </p>
          </div>
        </ScrollReveal>

        {/* Mission */}
        <ScrollReveal variant="fade-up">
          <div className="grid-12 gap-y-12 py-16 md:py-24 border-t border-line">
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
        <ScrollReveal variant="fade-up">
          <div className="py-16 md:py-24 border-t border-line">
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

        {/* Stats - PLACEHOLDER DATA */}
        <ScrollReveal variant="fade-up">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-16 md:py-24 border-t border-line">
            {stats.map((stat) => (
              <AnimatedStat key={stat.label} number={stat.number} label={stat.label} />
            ))}
          </div>
        </ScrollReveal>

        {/* Hidden for launch - uncomment when real content is ready:
        <ScrollReveal variant="fade-up">
          <TeamSection />
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <TestimonialsCarousel />
        </ScrollReveal>
        */}
      </section>
    </Layout>
  );
};

export default About;
