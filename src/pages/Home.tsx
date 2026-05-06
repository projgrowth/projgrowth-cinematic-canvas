import { Section } from "@/components/ui/section";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import FeaturedWorkSlider from "@/components/FeaturedWorkSlider";
import FeaturedWorkSkeleton from "@/components/FeaturedWorkSkeleton";
import ClientLogos from "@/components/ClientLogos";
import GrowthLines from "@/components/GrowthLines";
import LeafDivider from "@/components/LeafDivider";
import AmbientGlow from "@/components/AmbientGlow";
import { Helmet } from "react-helmet-async";

import { caseStudies } from "@/data/caseStudies";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/card-surface";

// Select featured projects from real case studies
const featuredProjects = caseStudies.slice(0, 3);

const heroWords = [
  { text: "Orlando Digital Marketing", accent: false },
  { text: "Agency That Delivers", accent: false },
  { text: "Results", accent: true },
];

const Home = () => {
  const [isLoadingWork, setIsLoadingWork] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoadingWork(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://projgrowth.com",
    "name": "ProjGrowth",
    "description": "Orlando digital marketing agency specializing in web design, branding, content creation, and digital marketing for growing businesses.",
    "url": "https://projgrowth.com",
    "telephone": "",
    "email": "info@projgrowth.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Orlando",
      "addressRegion": "FL",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.5383,
      "longitude": -81.3792
    },
    "areaServed": ["Orlando", "Central Florida", "Winter Park", "Kissimmee", "Lake Mary", "Sanford", "Altamonte Springs"],
    "serviceType": ["Web Design", "Branding", "Content Creation", "Digital Marketing", "Graphic Design", "SEO Services"],
    "priceRange": "$$",
    "openingHours": "Mo-Fr 09:00-17:00",
    "sameAs": [
      "https://www.instagram.com/projgrowth/",
      "https://www.linkedin.com/company/projgrowth",
      "https://twitter.com/projgrowth"
    ]
  };

  const services = [
    { title: "Web Design", description: "Custom websites that convert visitors into customers", path: "/services/web-design" },
    { title: "Branding", description: "Strategic brand identity that sets you apart", path: "/services/branding" },
    { title: "Content Creation", description: "Compelling content that tells your story", path: "/services/content-creation" },
    { title: "Digital Marketing", description: "Data-driven strategies that drive growth", path: "/services/digital-marketing" },
  ];

  const differentiators = [
    { title: "Boutique Agency Attention", description: "Personal service—you're never just a number. Direct access to our team." },
    { title: "Results-Driven Approach", description: "We measure what matters and optimize for real business outcomes." },
    { title: "Orlando Market Expertise", description: "We know Central Florida businesses and what makes them thrive." },
    { title: "Full-Service Capabilities", description: "Strategy through execution—everything under one roof." },
  ];

  return (
    <Layout
      seoTitle="ProjGrowth | Orlando Digital Marketing Agency | Web Design & Branding"
      seoDescription="Orlando's boutique digital marketing agency. We create stunning websites, powerful brands, and strategic content that helps businesses grow. Get a free consultation today."
      seoKeywords="digital marketing agency Orlando, web design Orlando, branding agency Orlando, content creation Orlando, Orlando marketing company, SEO Orlando"
      canonicalUrl="/"
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      {/* Hero Section — Staggered text reveal */}
      <Section size="hero">
        <AmbientGlow variant="hero" />
        <GrowthLines />
        <div className="grid-12 relative z-10">
          <div className="col-span-12 lg:col-span-10 stack gap-6 md:gap-8">
            <h1 className="font-display text-text">
              {heroWords.map((word, i) => (
                <motion.span
                  key={i}
                  className={`block ${word.accent ? "text-accent" : ""}`}
                  initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  {word.text}
                </motion.span>
              ))}
            </h1>
            
            <motion.p
              className="lede max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
            >
              We create websites, brands, and content that help Orlando businesses 
              stand out and grow. Your success is our mission.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-2 md:mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Button asChild variant="cta" size="lg" className="group">
                <Link to="/contact">
                  Get Your Free Consultation
                  <ArrowRight className="w-5 h-5 transition-transform duration-sm group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="ghost-link" size="lg">
                <Link to="/work">View Our Work</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <Section>
        <ScrollReveal variant="fade-up">
          <div className="grid-12 gap-y-10">
            <div className="col-span-12 lg:col-span-4">
              <h2 className="font-display text-text mb-3">
                Digital Marketing Services in Orlando
              </h2>
              <p className="lede">
                Comprehensive solutions for Central Florida businesses
              </p>
            </div>

            <div className="col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-cards">
              {services.map((service, idx) => (
                <ScrollReveal key={idx} variant="fade-up" delay={idx * 0.1}>
                  <Link to={service.path} className="group block h-full">
                    <SurfaceCard pad="md" interactive className={`relative overflow-hidden h-full ${idx === 0 ? "border-t-2 border-t-accent" : ""}`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-sm" />
                      <span className="relative font-display text-2xl md:text-3xl text-accent/30 mb-4 block">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h3 className="relative font-display text-text mb-2 transition-colors duration-sm group-hover:text-accent">
                        {service.title}
                      </h3>
                      <p className="relative text-mute">{service.description}</p>
                    </SurfaceCard>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Why Choose Us */}
      <LeafDivider />
      <Section>
        <ScrollReveal variant="fade-up">
          <div className="section-header">
            <h2 className="font-display text-text mb-3">
              Why Orlando Businesses Choose ProjGrowth
            </h2>
            <p className="lede">
              We're not just another agency. We're your partners in growth.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-cards">
          {differentiators.map((item, idx) => (
            <ScrollReveal key={idx} variant="fade-up" delay={idx * 0.1}>
              <SurfaceCard pad="md" interactive className="h-full">
                <h3 className="font-display text-accent mb-2">{item.title}</h3>
                <p className="text-mute text-sm leading-relaxed">{item.description}</p>
              </SurfaceCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Featured Work Section */}
      <Section>
        <ScrollReveal variant="fade-up">
          <div className="section-header">
            <h2 className="font-display text-text mb-3">Our Recent Work</h2>
            <p className="lede">Projects we're proud of from Orlando and beyond</p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.2}>
          {isLoadingWork ? <FeaturedWorkSkeleton /> : <FeaturedWorkSlider projects={featuredProjects} />}
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.3}>
          <div className="mt-12 text-center">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors duration-sm font-medium"
            >
              View All Projects
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Client Logos Section */}
      <ClientLogos />
    </Layout>
  );
};

export default Home;
