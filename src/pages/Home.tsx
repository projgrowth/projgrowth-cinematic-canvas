import { motion, useReducedMotion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import ClientLogos from "@/components/ClientLogos";
import { caseStudies } from "@/data/caseStudies";

const services = [
  { title: "Web Design", outcome: "Sites that convert, not just look good.", description: "Precision-built digital experiences shaped around how your customers decide.", path: "/services/web-design" },
  { title: "Branding", outcome: "Become the obvious choice.", description: "Positioning, identity, and language that make the value of your business unmistakable.", path: "/services/branding" },
  { title: "Content", outcome: "One shoot. A month of output.", description: "Editorial and cinematic systems that turn expertise into consistent visibility.", path: "/services/content-creation" },
  { title: "Growth", outcome: "Pipeline, not vanity reports.", description: "Search, paid, and lifecycle strategy connected to meaningful business outcomes.", path: "/services/digital-marketing" },
];

const principles = [
  { title: "Systems over fragments.", description: "Brand, website, content, and growth work as one operating system — not disconnected deliverables." },
  { title: "Senior talent, directly.", description: "The people shaping the strategy are the same people accountable for the final detail." },
  { title: "Clarity before decoration.", description: "Positioning and structure come first. The visual work earns attention because the thinking holds up." },
];

const featured = caseStudies.find((item) => item.id === "smart-financial") ?? caseStudies[0];
const supporting = ["florida-private", "gfg-solutions"]
  .map((id) => caseStudies.find((item) => item.id === id))
  .filter((item): item is (typeof caseStudies)[number] => Boolean(item));

const Home = () => {
  const reduceMotion = useReducedMotion();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://projgrowth.com",
    name: "ProjGrowth",
    description: "Orlando digital marketing agency specializing in web design, branding, content creation, and digital marketing for growing businesses.",
    url: "https://projgrowth.com",
    email: "info@projgrowth.com",
    image: "https://projgrowth.com/favicon.png",
    address: { "@type": "PostalAddress", addressLocality: "Orlando", addressRegion: "FL", addressCountry: "US" },
    geo: { "@type": "GeoCoordinates", latitude: 28.5383, longitude: -81.3792 },
    areaServed: ["Orlando", "Central Florida", "Winter Park", "Kissimmee", "Lake Mary", "Sanford", "Altamonte Springs"],
    serviceType: ["Web Design", "Branding", "Content Creation", "Digital Marketing", "Graphic Design", "SEO Services"],
    priceRange: "$$",
    openingHours: "Mo-Fr 09:00-17:00",
    sameAs: ["https://www.instagram.com/projgrowth/", "https://www.linkedin.com/company/projgrowth", "https://twitter.com/projgrowth"],
  };

  return (
    <Layout
      seoTitle="ProjGrowth | Web Design & Digital Marketing — Orlando, FL"
      seoDescription="Boutique digital studio based in Orlando, FL. We build websites, brand identities, and content systems for ambitious businesses nationwide."
      seoKeywords="digital marketing agency Orlando, web design Orlando, branding agency Orlando, content creation Orlando, Orlando marketing company, SEO Orlando"
      canonicalUrl="/"
    >
      <Helmet><script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script></Helmet>

      <section className="home-silver home-opening hero-offset" aria-labelledby="home-title">
        <div className="container-site home-opening-inner">
          <div className="home-opening-grid">
            <div className="home-opening-copy">
              <motion.p className="home-meta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduceMotion ? 0 : 0.35 }}>
                ProjGrowth / Orlando
              </motion.p>
              <motion.h1
                id="home-title"
                className="home-display"
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.55, delay: 0.08 }}
              >
                Websites and brand systems <span>built to move business.</span>
              </motion.h1>
              <motion.p
                className="home-intro"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.45, delay: 0.2 }}
              >
                Strategy, design, content, and technology for ambitious teams ready to look sharper, sell clearer, and operate better.
              </motion.p>
              <motion.div
                className="home-actions"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.45, delay: 0.28 }}
              >
                <Link to="/contact" className="home-primary-link group">Start a project <ArrowRight aria-hidden="true" /></Link>
                <Link to="/work" className="home-text-link group">View selected work <ArrowRight aria-hidden="true" /></Link>
              </motion.div>
            </div>

            <motion.div
              className="home-artifact-wrap"
              initial={reduceMotion ? false : { opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.6, delay: 0.18 }}
            >
              <Link to="/work/florida-private" className="home-artifact group" aria-label="View Florida Private Providers case study">
                <div className="home-artifact-head">
                  <span>Selected system</span><span>01 / 03</span>
                </div>
                <div className="home-artifact-field">
                  <div className="home-artifact-orbit" aria-hidden="true"><span /><span /><span /></div>
                  <img src="/logos/florida-private-providers.svg" alt="Florida Private Providers" width="320" height="180" />
                  <div className="home-artifact-data">
                    <span>AI-assisted review</span><span>County code engine</span><span>Client workflow</span>
                  </div>
                </div>
                <div className="home-artifact-foot">
                  <span>Web & Product / AI & Tools</span><ArrowUpRight aria-hidden="true" />
                </div>
              </Link>
            </motion.div>
          </div>

          <div className="home-capability-rail" aria-label="Core capabilities">
            {services.map((service, index) => (
              <span key={service.title}><b>{String(index + 1).padStart(2, "0")}</b>{service.title}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="home-silver home-section" aria-labelledby="capabilities-title">
        <div className="container-site">
          <ScrollReveal variant="fade-up">
            <div className="home-section-heading">
              <p className="home-meta">01 / Capabilities</p>
              <h2 id="capabilities-title" className="home-section-title">One team across the full growth system.</h2>
              <p className="home-section-copy">The right disciplines, brought together around the business problem — not sold as isolated services.</p>
            </div>
          </ScrollReveal>
          <div className="home-capability-list">
            {services.map((service, index) => (
              <ScrollReveal key={service.title} variant="fade-up" delay={index * 0.05}>
                <Link to={service.path} className="home-capability-row group">
                  <span className="home-capability-number">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{service.title}</h3>
                  <p className="home-capability-outcome">{service.outcome}</p>
                  <p className="home-capability-description">{service.description}</p>
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="home-silver home-section home-proof-section" aria-labelledby="work-title">
        <div className="container-site">
          <ScrollReveal variant="fade-up">
            <div className="home-section-heading home-section-heading-compact">
              <p className="home-meta">02 / Selected work</p>
              <h2 id="work-title" className="home-section-title">The problem, then the system.</h2>
            </div>
          </ScrollReveal>

          <div className="home-work-grid">
            <ScrollReveal variant="fade-up">
              <Link to={`/work/${featured.id}`} className="home-work-lead group">
                <div className="home-work-canvas">
                  <span className="home-work-index">01</span>
                  {featured.logo && <img src={featured.logo} alt={`${featured.title} logo`} width="340" height="220" />}
                  <div className="home-work-signal"><span>Plan</span><span>Invest</span><span>Live</span></div>
                </div>
                <div className="home-work-caption">
                  <div><p className="home-meta">{featured.category}</p><h3>{featured.title}</h3></div>
                  <p>{featured.subtitle}</p>
                  <ArrowUpRight aria-hidden="true" />
                </div>
              </Link>
            </ScrollReveal>

            <div className="home-work-index-list">
              {supporting.map((project, index) => (
                <ScrollReveal key={project.id} variant="fade-up" delay={(index + 1) * 0.08}>
                  <Link to={`/work/${project.id}`} className="home-work-index-row group">
                    <span>{String(index + 2).padStart(2, "0")}</span>
                    <div className="home-work-logo-field">
                      {project.logo && <img src={project.logo} alt="" width="180" height="100" />}
                    </div>
                    <div><p className="home-meta">{project.category}</p><h3>{project.title}</h3><p>{project.subtitle}</p></div>
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                </ScrollReveal>
              ))}
              <Link to="/work" className="home-all-work group">View all projects <ArrowRight aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-silver home-section home-principles" aria-labelledby="principles-title">
        <div className="container-site">
          <ScrollReveal variant="fade-up">
            <div className="home-section-heading">
              <p className="home-meta">03 / How we work</p>
              <h2 id="principles-title" className="home-section-title">Small by design. Serious about the work.</h2>
              <p className="home-section-copy">Direct collaboration, deliberate decisions, and a standard of craft that holds from strategy through launch.</p>
            </div>
          </ScrollReveal>
          <div className="home-principle-grid">
            {principles.map((principle, index) => (
              <ScrollReveal key={principle.title} variant="fade-up" delay={index * 0.07}>
                <article><span>{String(index + 1).padStart(2, "0")}</span><h3>{principle.title}</h3><p>{principle.description}</p></article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ClientLogos />
    </Layout>
  );
};

export default Home;
