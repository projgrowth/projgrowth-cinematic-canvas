/**
 * About Page
 */

import { Section } from "@/components/ui/section";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import PageHero from "@/components/PageHero";
import SectionChapter from "@/components/SectionChapter";
import { SurfaceCard } from "@/components/ui/card-surface";
import LeafDivider from "@/components/LeafDivider";
import ClientLogos from "@/components/ClientLogos";

const About = () => {
  // PLACEHOLDER — replace with verified numbers
  const stats = [
    { value: "9", label: "Client Partners" },
    { value: "5", label: "Services Offered" },
    { value: "3+", label: "Years in Business" },
  ];

  const values = [
    {
      title: "Craft",
      description: "Good work takes precision and a refusal to settle. We'd rather ship one exceptional thing than three forgettable ones."
    },
    {
      title: "Clarity",
      description: "Most brands say too much and mean too little. We cut to what's true, what's different, and what will actually land."
    },
    {
      title: "Compounding",
      description: "We build things that get better over time — brand systems, content engines, and digital infrastructure that grow with you."
    }
  ];

  return (
    <Layout
      seoTitle="About ProjGrowth | Orlando Digital Marketing Agency"
      seoDescription="Meet ProjGrowth — strategists, designers, and developers creating digital experiences that help businesses grow."
      seoKeywords="about ProjGrowth, creative team, design studio, company values, digital agency team, web design company"
      canonicalUrl="/about"
    >
      <Section>
        <PageHero
          chapter={{ number: 1, label: "Studio" }}
          title={<>We Build What Lasts.</>}
          lede="ProjGrowth is a boutique digital studio based in Orlando, FL. We work with founders and marketing leaders who know that design is a competitive advantage — and are ready to act like it."
          className="mb-12 md:mb-16"
        />

        {/* Stats Row */}
        <ScrollReveal variant="fade-up" delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-cards py-10 md:py-12 border-t border-b border-line mb-16">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="font-display text-accent mb-2">
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
              <SectionChapter number={2} label="Mission" />
              <h2 className="font-display text-text">Our Mission</h2>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <p className="text-xl md:text-2xl text-text max-w-readable">
                Most brands are under-designed and over-explained. We're here to change that — with work that's precise, intentional, and built to outlast the trend cycle.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Values */}
        <LeafDivider />
        <ScrollReveal variant="fade-up">
          <div className="section">
            <SectionChapter number={3} label="Values" />
            <h2 className="font-display text-text mb-12 md:mb-16">Our Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-cards">
              {values.map((value, idx) => (
                <ScrollReveal key={idx} variant="scale" delay={idx * 0.1}>
                  <SurfaceCard pad="lg" interactive className="h-full">
                    <h3 className="font-display text-accent mb-3">{value.title}</h3>
                    <p className="text-mute">{value.description}</p>
                  </SurfaceCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

      </Section>
      <ClientLogos />
    </Layout>
  );
};

export default About;
