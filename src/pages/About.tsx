/**
 * About Page
 */

import { Section } from "@/components/ui/section";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/PageHero";
import SectionChapter from "@/components/SectionChapter";
import LeafDivider from "@/components/LeafDivider";
import ClientLogos from "@/components/ClientLogos";
import WorkTile from "@/components/WorkTile";
import { caseStudies } from "@/data/caseStudies";
import { Helmet } from "react-helmet-async";

const About = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://projgrowth.com/about#localbusiness",
    "name": "ProjGrowth",
    "url": "https://projgrowth.com/about",
    "email": "info@projgrowth.com",
    "image": "https://projgrowth.com/favicon.png",
    "description": "Boutique Orlando digital studio building brands, websites, and content systems for ambitious businesses.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Orlando",
      "addressRegion": "FL",
      "addressCountry": "US"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 28.5383, "longitude": -81.3792 },
    "areaServed": ["Orlando", "Central Florida", "United States"],
    "priceRange": "$$",
    "sameAs": [
      "https://www.instagram.com/projgrowth/",
      "https://www.linkedin.com/company/projgrowth",
      "https://twitter.com/projgrowth"
    ]
  };

  // Image-forward proof instead of unverified counters.
  const proofPlates = caseStudies.slice(0, 2);

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
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>
      <Section>
        <PageHero
          chapter={{ number: 1, label: "Studio" }}
          title={<>We Build What Lasts.</>}
          lede="ProjGrowth is a boutique digital studio based in Orlando, FL. We work with founders and marketing leaders who know that design is a competitive advantage — and are ready to act like it."
          className="mb-12 md:mb-16"
        />

        {/* Mission */}
        <ScrollReveal variant="fade-up">
          <div className="grid-12 gap-y-10 section">
            <div className="col-span-12 lg:col-span-4">
              <SectionChapter number={2} label="Mission" />
              <h2 className="font-display text-text">Our Mission</h2>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <p className="text-xl md:text-2xl text-text prose-measure-wide">
                Most brands are under-designed and over-explained. We're here to change that — with work that's precise, intentional, and built to outlast the trend cycle.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Proof — image-forward, two-up */}
        <ScrollReveal variant="fade-up">
          <div className="section border-t border-line">
            <SectionChapter number={3} label="Proof" />
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-10 md:mb-12">
              <h2 className="font-display text-text">What That Looks Like</h2>
              <p className="text-mute max-w-md">
                Two engagements that show how we work in practice.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-cards">
              {proofPlates.map((cs) => (
                <WorkTile key={cs.id} caseStudy={cs} aspect="aspect-[16/10]" />
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Values — hairline numbered list, matching Home's rhythm */}
        <LeafDivider />
        <ScrollReveal variant="fade-up">
          <div className="section">
            <SectionChapter number={4} label="Values" />
            <h2 className="font-display text-text mb-10 md:mb-12">Our Values</h2>
            <div className="divide-y divide-line">
              {values.map((value, idx) => (
                <ScrollReveal key={idx} variant="fade-up" delay={idx * 0.08}>
                  <div className="flex gap-8 md:gap-12 py-7 md:py-9 group">
                    <span className="font-display text-xs text-accent-faint w-6 flex-shrink-0 pt-1">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 md:flex md:items-start md:gap-12">
                      <h3 className="font-display text-text mb-2 md:mb-0 md:w-64 flex-shrink-0 transition-colors duration-sm group-hover:text-accent">
                        {value.title}
                      </h3>
                      <p className="text-mute md:flex-1">{value.description}</p>
                    </div>
                  </div>
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
