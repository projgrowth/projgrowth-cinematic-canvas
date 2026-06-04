import { Section } from "@/components/ui/section";
import { motion, useReducedMotion } from "framer-motion";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import ClientLogos from "@/components/ClientLogos";
import GrowthLines from "@/components/GrowthLines";
import AmbientGlow from "@/components/AmbientGlow";
import { Helmet } from "react-helmet-async";
import { caseStudies } from "@/data/caseStudies";
import { ArrowRight, FileText, Globe, Sparkles, Film, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import { SurfaceCard } from "@/components/ui/card-surface";

const featuredProjects = caseStudies.slice(0, 3);

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Content Systems": FileText,
  "Web & Product": Globe,
  "Brand & Messaging": Sparkles,
  "Cinematic Production": Film,
  "AI & Tools": Cpu,
};

const categoryGradients: Record<string, string> = {
  "Content Systems": "from-accent/10 to-accent/5",
  "Web & Product": "from-blue-500/10 to-blue-500/5",
  "Brand & Messaging": "from-purple-500/10 to-purple-500/5",
  "Cinematic Production": "from-amber-500/10 to-amber-500/5",
  "AI & Tools": "from-emerald-500/10 to-emerald-500/5",
};

const heroWords = [
  { text: "We design brands", accent: false },
  { text: "that earn attention", accent: false },
  { text: "and keep it.", accent: true },
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
    { title: "Web Design", description: "Precision-engineered sites on modern stacks. Fast, conversion-focused, and built to reflect a brand worth paying attention to.", path: "/services/web-design" },
    { title: "Branding", description: "Identity systems rooted in positioning. Logo, language, and visual direction that make you the obvious choice in the room.", path: "/services/branding" },
    { title: "Content Creation", description: "Cinematic short-form, editorial copy, and social content — built in systems so one shoot becomes months of output.", path: "/services/content-creation" },
    { title: "Digital Marketing", description: "Full-funnel strategy tied to revenue, not reports. SEO, paid, and email that compounds over time.", path: "/services/digital-marketing" },
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

      {/* Hero */}
      <Section size="hero" className="-mt-[var(--nav-height)]">
        <AmbientGlow variant="hero" />
        <GrowthLines />
        <div className="grid-12 relative z-10 items-center">
          {/* Left — headline and CTAs */}
          <div className="col-span-12 lg:col-span-7 stack gap-6 md:gap-8">
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              Digital Studio · Orlando, FL
            </motion.p>
            <h1 className="font-display text-text">
              {heroWords.map((word, i) => (
                <motion.span
                  key={i}
                  className={`block ${word.accent ? "text-accent" : ""}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 30, filter: "blur(4px)" }}
                  animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
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
              Sharp design. Clear strategy. Work that actually moves the business. We partner with founders and marketing leaders who are done settling for mediocre.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-2 md:mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Link to="/contact" className="btn-solid group">
                Start a Project
                <ArrowRight className="w-5 h-5 transition-transform duration-sm group-hover:translate-x-1" />
              </Link>
              <Link to="/work" className="btn-outline-cta">
                View Our Work
              </Link>
            </motion.div>
          </div>

          {/* Right — credential panel (desktop only) */}
          <motion.div
            className="hidden lg:flex col-span-5 justify-end items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="w-full max-w-[300px] space-y-7">
              {[
                { value: "9", label: "Active Client Partners", accent: true },
                { value: "3+", label: "Years Building Brands" },
                { value: "100%", label: "Senior Talent, Every Engagement" },
              ].map((stat, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-px self-stretch bg-accent/30 flex-shrink-0 mt-1" />
                  <div>
                    <p className={`font-display text-4xl leading-none mb-1.5 tracking-tight ${stat.accent ? "text-accent" : "text-text"}`}>
                      {stat.value}
                    </p>
                    <p className="text-xs text-mute uppercase tracking-widest">{stat.label}</p>
                  </div>
                </div>
              ))}
              <div className="pl-5 pt-2 border-t border-line">
                <p className="text-xs text-mute/70 italic leading-relaxed">
                  "You work directly with us — no account managers, no handoffs."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Services Overview */}
      <Section>
        <ScrollReveal variant="fade-up">
          <div className="grid-12 gap-y-10">
            <div className="col-span-12 lg:col-span-4">
              <p className="eyebrow mb-3">Our Craft</p>
              <h2 className="font-display text-text mb-3">
                The Full Stack of Brand-Building
              </h2>
              <p className="lede">
                Four disciplines. One team. Every engagement built around what your brand actually needs.
              </p>
            </div>

            <div className="col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-cards">
              {services.map((service, idx) => (
                <ScrollReveal key={idx} variant="fade-up" delay={idx * 0.1}>
                  <Link to={service.path} className="group block h-full">
                    <SurfaceCard pad="md" interactive className="relative overflow-hidden h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-sm" />
                      <span className="relative font-display text-xs tracking-widest mb-4 block" style={{ color: "hsl(var(--accent) / 0.4)" }}>
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
      </Section>

      {/* How We Work — editorial numbered list */}
      <section className="relative bg-surface/70 border-y border-line">
        <div className="container-site section">
          <ScrollReveal variant="fade-up">
            <div className="grid-12 gap-y-10 mb-12 md:mb-16">
              <div className="col-span-12 lg:col-span-4">
                <p className="eyebrow mb-3">How We Work</p>
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
                  <span className="font-display text-xs text-accent-faint w-6 flex-shrink-0 pt-1">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 md:flex md:items-start md:gap-12">
                    <h3 className="font-display text-text mb-2 md:mb-0 md:w-64 flex-shrink-0 group-hover:text-accent transition-colors duration-sm">
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
          <div className="section-header">
            <p className="eyebrow mb-3">Selected Work</p>
            <h2 className="font-display text-text mb-3">Work That Moves the Needle</h2>
            <p className="lede">A tight selection of what we've built — and what happened after.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-cards">
            {featuredProjects.map((project, idx) => {
              const gradient = categoryGradients[project.category] || "from-accent/10 to-accent/5";
              const Icon = categoryIcons[project.category] || FileText;
              return (
                <Link key={idx} to="/work" className="group block">
                  <div className={`bg-gradient-to-br ${gradient} border border-line rounded-lg p-6 md:p-8 h-full flex flex-col transition-all duration-md hover:border-accent/40 hover:shadow-elegant`}>
                    <Icon className="w-7 h-7 text-accent-strong mb-6" />
                    <span className="text-xs text-accent mb-2 block">{project.category}</span>
                    <h3 className="font-display text-text mb-2 group-hover:text-accent transition-colors duration-sm">
                      {project.title}
                    </h3>
                    <p className="text-mute text-sm flex-1">{project.subtitle}</p>
                    <div className="mt-6 flex items-center gap-1 text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-sm">
                      View Case Study <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.3}>
          <div className="mt-12 text-center">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-strong transition-colors duration-sm font-medium"
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
