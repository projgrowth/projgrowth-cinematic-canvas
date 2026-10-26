import { Section } from "@/components/ui/section";
import { motion, useReducedMotion } from "framer-motion";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import ClientLogos from "@/components/ClientLogos";
import { Helmet } from "react-helmet-async";
import { caseStudies, platedCaseStudies } from "@/data/caseStudies";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SurfaceCard } from "@/components/ui/card-surface";
import ResultsStrip from "@/components/home/ResultsStrip";
import WorkPlate from "@/components/WorkPlate";
import WorkTile from "@/components/WorkTile";

const featuredProjects = platedCaseStudies().slice(0, 3);
const heroCase = caseStudies.find((study) => study.id === "gfg-solutions") ?? featuredProjects[0];

const heroLines = [
  "We design brands",
  "that earn attention",
  "and keep it.",
];

const Home = () => {
  const reduceMotion = useReducedMotion();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://projgrowth.com",
    "name": "ProjGrowth",
    "description": "Orlando digital marketing agency specializing in web design, branding, content creation, and digital marketing for growing businesses.",
    "url": "https://projgrowth.com",
    "email": "info@projgrowth.com",
    "image": "https://projgrowth.com/favicon.png",
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
    { title: "Web Design", outcome: "Sites that convert, not just look good.", description: "Precision-engineered sites on modern stacks. Fast, conversion-focused, and built to reflect a brand worth paying attention to.", path: "/services/web-design" },
    { title: "Branding", outcome: "The obvious choice in your category.", description: "Identity systems rooted in positioning. Logo, language, and visual direction that make you the obvious choice in the room.", path: "/services/branding" },
    { title: "Content Creation", outcome: "One shoot. A month of output.", description: "Cinematic short-form, editorial copy, and social content — built in systems so one shoot becomes months of output.", path: "/services/content-creation" },
    { title: "Digital Marketing", outcome: "Pipeline, not vanity reports.", description: "Full-funnel strategy tied to revenue, not reports. SEO, paid, and email that compounds over time.", path: "/services/digital-marketing" },
  ];

  const differentiators = [
    { title: "We think in systems.", description: "Not projects. Brand infrastructure, content engines, and design systems that compound month over month — not deliverables that gather dust." },
    { title: "Craft is non-negotiable.", description: "Every pixel, every word, every interaction is intentional. We'd rather slow down than ship something that doesn't earn its place." },
    { title: "Senior talent. Always.", description: "You work directly with us. No account managers, no juniors handed your project, no one reading from a playbook." },
    { title: "Strategy first. Every time.", description: "Positioning and messaging before we touch any tool. Better thinking at the start makes every execution sharper at the end." },
  ];

  return (
    <Layout
      seoTitle="ProjGrowth | Web Design & Digital Marketing — Orlando, FL"
      seoDescription="Boutique digital studio based in Orlando, FL. We build websites, brand identities, and content systems for ambitious businesses nationwide."
      seoKeywords="digital marketing agency Orlando, web design Orlando, branding agency Orlando, content creation Orlando, Orlando marketing company, SEO Orlando"
      canonicalUrl="/"
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      {/* Hero — headline left, real case plate right. Plate stacks under CTAs on small screens. */}
      <Section size="hero" className="hero-offset">
        <div className="grid-12 relative z-10 items-center">
          <div className="col-span-12 lg:col-span-5 stack gap-6 md:gap-8 min-w-0">
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              Digital Studio · Orlando, FL
            </motion.p>
            <h1 className="font-display">
              {heroLines.map((line, i) => (
                <motion.span
                  key={line}
                  className="block text-[rgb(241,240,238)]"
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.08 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="lede max-w-2xl"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.45, delay: 0.38 }}
            >
              Sharp design. Clear strategy. Work that actually moves the business. We partner with founders and marketing leaders who are done settling for mediocre.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-2 md:mt-4"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.45, delay: 0.46 }}
            >
              <Link to="/contact" className="btn-solid group">
                Start a project
                <ArrowRight className="w-5 h-5 transition-transform duration-sm group-hover:translate-x-1" />
              </Link>
              <Link to="/work" className="btn-outline-cta">
                View our work
              </Link>
            </motion.div>
          </div>

          {heroCase && (
            <motion.div
              className="col-span-12 lg:col-span-7 min-w-0"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Link to={`/work/${heroCase.id}`} className="group block">
                <WorkPlate caseStudy={heroCase} aspect="aspect-[16/10]" priority />
                <p className="mt-3 text-sm tracking-wide text-[rgba(241,240,238,0.45)]">
                  {heroCase.title} · {heroCase.category} · {heroCase.outcome}
                </p>
              </Link>
            </motion.div>
          )}
        </div>
      </Section>

      {/* Services Overview */}
      <Section>
        <ScrollReveal variant="fade-up">
          <div className="grid-12 section-intro-grid">
            <div className="col-span-12 lg:col-span-4">
              <p className="eyebrow mb-4">Our Craft</p>
              <h2 className="font-display text-text mb-3">
                The Full Stack of Brand-Building
              </h2>
              <p className="lede">
                Four disciplines. One team. Every engagement built around what your brand actually needs.
              </p>
            </div>

            <div className="col-span-12 lg:col-span-7 lg:col-start-6 grid grid-cols-1 sm:grid-cols-2 gap-cards">
              {services.map((service, idx) => (
                <ScrollReveal key={idx} variant="fade-up" delay={idx * 0.1}>
                  <Link to={service.path} className="group block h-full">
                    <SurfaceCard pad="md" interactive className="surface-card-quiet h-full">
                      <h3 className="font-display text-[rgb(241,240,238)] mb-1.5">
                        {service.title}
                      </h3>
                      <p className="text-sm text-[rgb(241,240,238)] mb-3">{service.outcome}</p>
                      <p className="text-mute line-clamp-2">{service.description}</p>
                    </SurfaceCard>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* Results Strip — qualitative outcomes from real engagements */}
      <ResultsStrip />

      {/* How We Work — editorial numbered list */}
      <section className="relative bg-surface/70 border-y border-line">
        <div className="container-site section">
          <ScrollReveal variant="fade-up">
            <div className="grid-12 section-intro-grid mb-12 md:mb-16">
              <div className="col-span-12 lg:col-span-4">
                <p className="eyebrow mb-4">How We Work</p>
                <h2 className="font-display text-text">
                  Not a Vendor.<br />A Strategic Partner.
                </h2>
              </div>
              <div className="col-span-12 lg:col-span-7 lg:col-start-6 flex items-end">
                <p className="lede">
                  We take on a small number of engagements at a time — so every client gets our full focus, not a fraction of it.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="divide-y divide-line">
            {differentiators.map((item, idx) => (
              <ScrollReveal key={idx} variant="fade-up" delay={idx * 0.08}>
                <div className="flex gap-8 md:gap-12 py-7 md:py-9 group">
                  <span className="font-display text-xs w-6 flex-shrink-0 pt-1 text-[rgba(241,240,238,0.45)]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 md:flex md:items-start md:gap-12">
                    <h3 className="font-display text-[rgb(241,240,238)] mb-2 md:mb-0 md:w-64 flex-shrink-0">
                      {item.title}
                    </h3>
                    <p className="text-mute md:flex-1">{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work — 3-card grid */}
      <Section>
        <ScrollReveal variant="fade-up">
          <div className="grid-12 section-intro-grid mb-12 md:mb-16">
            <div className="col-span-12 lg:col-span-4">
              <p className="eyebrow mb-4">Selected Work</p>
              <h2 className="font-display text-text">Work That Moves the Needle</h2>
            </div>
            <div className="col-span-12 lg:col-span-7 lg:col-start-6 flex items-end">
              <p className="lede">A tight selection of what we've built — and what happened after.</p>
            </div>
          </div>
        </ScrollReveal>

        {featuredProjects[0] && (
          <ScrollReveal variant="fade-up" delay={0.15}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-cards items-start">
              <div className="lg:col-span-7">
                <WorkTile
                  caseStudy={featuredProjects[0]}
                  aspect="aspect-[16/10]"
                  priority
                  size="lead"
                />
              </div>
              <div className="lg:col-span-5 stack-cards">
                {featuredProjects.slice(1).map((project) => (
                  <WorkTile key={project.id} caseStudy={project} aspect="aspect-[16/10]" />
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal variant="fade-up" delay={0.3}>
          <div className="mt-12">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 font-medium text-[rgb(241,240,238)] transition-opacity duration-sm hover:opacity-70"
            >
              View All Projects
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </ScrollReveal>
      </Section>

      {/* Client Logos */}
      <ClientLogos />
    </Layout>
  );
};

export default Home;
