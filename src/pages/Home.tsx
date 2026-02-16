import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import ScrollIndicator from "@/components/ScrollIndicator";
import FeaturedWorkSlider from "@/components/FeaturedWorkSlider";
import FeaturedWorkSkeleton from "@/components/FeaturedWorkSkeleton";
import NavigationGuide from "@/components/NavigationGuide";
import ScrollReveal from "@/components/ScrollReveal";
import ClientLogos from "@/components/ClientLogos";
import GrowthLines from "@/components/GrowthLines";
import LeafDivider from "@/components/LeafDivider";
import { Helmet } from "react-helmet-async";

import { caseStudies } from "@/data/caseStudies";
import { ArrowRight, Monitor, Palette, PenTool, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

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
    { icon: Monitor, title: "Web Design", description: "Custom websites that convert visitors into customers", path: "/services/web-design" },
    { icon: Palette, title: "Branding", description: "Strategic brand identity that sets you apart", path: "/services/branding" },
    { icon: PenTool, title: "Content Creation", description: "Compelling content that tells your story", path: "/services/content-creation" },
    { icon: BarChart3, title: "Digital Marketing", description: "Data-driven strategies that drive growth", path: "/services/digital-marketing" },
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
      <section className="relative container-site py-16 md:py-24 lg:py-32 min-h-[80vh] lg:min-h-[90vh] flex items-center">
        {/* Atmospheric radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background: "radial-gradient(ellipse at 15% 40%, hsl(155 42% 49% / 0.04), transparent 55%), radial-gradient(ellipse at 80% 70%, hsl(155 42% 49% / 0.02), transparent 50%)",
          }}
        />
        <GrowthLines />
        <div className="grid-12 relative z-10">
          <div className="col-span-12 lg:col-span-10 stack gap-6 md:gap-8">
            <h1 className="font-display text-4xl md:text-6xl lg:text-8xl leading-tight text-text">
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
              className="text-base md:text-xl text-mute max-w-2xl leading-relaxed"
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
              <Link 
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-base rounded-md font-medium transition-all duration-sm hover:bg-accent/90 min-h-[44px]"
              >
                Get Your Free Consultation
                <ArrowRight className="w-5 h-5 transition-transform duration-sm group-hover:translate-x-1" />
              </Link>
              
              <Link 
                to="/work"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-line text-mute rounded-md font-medium transition-all duration-sm hover:border-muted-foreground hover:text-text min-h-[44px]"
              >
                View Our Work
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <LeafDivider />
      <section className="container-site py-24">
        <ScrollReveal variant="fade-up">
          <div className="grid-12 gap-y-12">
            <div className="col-span-12 lg:col-span-4">
              <h2 className="font-display text-3xl lg:text-4xl text-text mb-4">
                Digital Marketing Services in Orlando
              </h2>
              <p className="text-xl text-mute">
                Comprehensive solutions for Central Florida businesses
              </p>
            </div>

            <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, idx) => (
                <ScrollReveal key={idx} variant="fade-up" delay={idx * 0.1}>
                  <Link
                    to={service.path}
                    className={`group block p-8 bg-surface rounded-lg border border-line transition-all duration-sm hover:border-accent/30 ${
                      idx === 0 ? "border-t-2 border-t-accent" : ""
                    }`}
                  >
                    <service.icon className="w-10 h-10 text-accent mb-4" />
                    <h3 className="font-display text-2xl text-text mb-3 transition-colors duration-sm group-hover:text-accent">
                      {service.title}
                    </h3>
                    <p className="text-mute">{service.description}</p>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Why Choose Us */}
      <LeafDivider />
      <section className="container-site py-24">
        <ScrollReveal variant="fade-up">
          <div className="mb-16">
            <h2 className="font-display text-3xl lg:text-4xl text-text mb-4">
              Why Orlando Businesses Choose ProjGrowth
            </h2>
            <p className="text-xl text-mute max-w-2xl">
              We're not just another agency. We're your partners in growth.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {differentiators.map((item, idx) => (
            <ScrollReveal key={idx} variant="fade-up" delay={idx * 0.1}>
              <div className="p-6 bg-surface rounded-lg border border-line h-full">
                <h3 className="font-display text-xl text-accent mb-3">{item.title}</h3>
                <p className="text-mute text-sm leading-relaxed">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Featured Work Section */}
      <LeafDivider />
      <section className="container-site py-24">
        <ScrollReveal variant="fade-up">
          <div className="mb-16">
            <h2 className="font-display text-3xl lg:text-4xl text-text mb-4">Our Recent Work</h2>
            <p className="text-xl text-mute">Projects we're proud of from Orlando and beyond</p>
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

      {/* Navigation Guide Section */}
      <ScrollReveal variant="fade-up">
        <NavigationGuide />
      </ScrollReveal>

      <ScrollIndicator />
    </Layout>
  );
};

export default Home;
