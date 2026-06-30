import { Section } from "@/components/ui/section";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ProcessTimeline from "@/components/ProcessTimeline";
import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/PageHero";
import SectionChapter from "@/components/SectionChapter";
import LeafDivider from "@/components/LeafDivider";
import ClientLogos from "@/components/ClientLogos";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

const Services = () => {
  const navigate = useNavigate();
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const services = [
    {
      number: "01",
      title: "Web Design",
      path: "/services/web-design",
      description: "Custom, mobile-responsive websites that look stunning and turn Orlando visitors into customers.",
      capabilities: [
        { name: "Custom Design", tooltip: "Tailored to your brand — never a template" },
        { name: "Mobile Responsive", tooltip: "Flawless on every screen size, from phone to desktop" },
        { name: "Conversion Focused", tooltip: "Layouts, copy, and CTAs engineered to convert visitors" },
        { name: "SEO Foundations", tooltip: "Fast loads, clean markup, structured data baked in" },
      ],
      details: "We design and build websites end-to-end — discovery, UX, visual design, development, and launch. Every site is built on a modern stack, optimized for Core Web Vitals, and handed off with documentation so your team can update content with confidence.",
      deliverables: ["Discovery & sitemap", "Wireframes & visual design", "Responsive build", "SEO foundation", "Analytics setup", "Launch & training"],
    },
    {
      number: "02",
      title: "Branding",
      path: "/services/branding",
      description: "Strategic brand identity systems that make your Orlando business memorable and distinctive.",
      capabilities: [
        { name: "Logo & Identity", tooltip: "Primary logo, marks, lockups, and supporting elements" },
        { name: "Positioning", tooltip: "Define what makes you different and who you're for" },
        { name: "Visual System", tooltip: "Color, typography, and imagery direction" },
        { name: "Brand Guidelines", tooltip: "A clear playbook so your brand stays consistent everywhere" },
      ],
      details: "From founders rebranding to new ventures launching, we develop brand identities rooted in strategy. We start with positioning, then translate it into a visual system you can apply across digital, print, and environment.",
      deliverables: ["Brand strategy workshop", "Positioning statement", "Logo system", "Color & typography", "Brand guidelines PDF"],
    },
    {
      number: "03",
      title: "Content Creation",
      path: "/services/content-creation",
      description: "Story-driven content — copy, photo, and video — that connects with your audience.",
      capabilities: [
        { name: "Copywriting", tooltip: "Website copy, campaigns, and editorial that sells without selling" },
        { name: "Photography", tooltip: "Brand and product photography for web and social" },
        { name: "Video Production", tooltip: "Brand films, social cutdowns, and testimonial reels" },
        { name: "Social Content", tooltip: "Platform-native content built to perform organically" },
      ],
      details: "We produce content the way modern brands actually use it — efficiently, in batches, designed to be cut down for multiple channels. One shoot day, weeks of content.",
      deliverables: ["Content strategy", "Photo & video shoot", "Edited deliverables", "Social-ready cutdowns", "Copy & captions"],
    },
    {
      number: "04",
      title: "Digital Marketing",
      path: "/services/digital-marketing",
      description: "Full-funnel digital marketing — SEO, paid, email, and social — measured against real ROI.",
      capabilities: [
        { name: "SEO", tooltip: "Local + organic search optimization for Orlando and Central Florida" },
        { name: "Paid Advertising", tooltip: "Google Ads and Meta campaigns that hit a target CPA" },
        { name: "Email Marketing", tooltip: "Lifecycle, nurture, and broadcast campaigns" },
        { name: "Analytics & Reporting", tooltip: "Honest, channel-by-channel reporting tied to revenue" },
      ],
      details: "We run digital marketing as a system, not a checklist. Each channel reports into a shared dashboard so you can see what's working and reinvest in what's actually moving the business.",
      deliverables: ["Channel audit", "Keyword + audience research", "Campaign build & launch", "Monthly optimization", "Performance dashboard"],
    },
  ];

  const toggleService = (idx: number) => {
    setExpandedService(expandedService === idx ? null : idx);
  };

  const handleRequestService = (serviceTitle: string) => {
    navigate('/contact', { state: { selectedService: serviceTitle } });
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: services.map(service => ({
      "@type": "Question",
      name: `What does ${service.title} include?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${service.description} Our ${service.title.toLowerCase()} service includes: ${service.deliverables.join(', ')}.`
      }
    }))
  };

  return (
    <Layout
      seoTitle="Services | Web Design, Branding & Marketing — Orlando, FL | ProjGrowth"
      seoDescription="Web design, brand identity, content creation, and digital marketing for ambitious businesses. Based in Orlando, FL. Working nationwide."
      seoKeywords="web design Orlando, branding Orlando, content creation Orlando, digital marketing Orlando, creative agency Orlando"
      canonicalUrl="/services"
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      
      <TooltipProvider>
        <Section>
          <PageHero
            chapter={{ number: 1, label: "Disciplines" }}
            title={<>The Work We Do Best.</>}
            lede="We're not a full-service agency that does everything passably. We've built four disciplines to an exceptionally high standard — and we only take on work that fits."
            className="mb-12 md:mb-16"
          />

          <div className="stack gap-0">
            {services.map((service, idx) => (
              <ScrollReveal key={idx} variant="fade-up" delay={idx * 0.1}>
                <div className="group border-t border-line py-8 lg:py-12 transition-all duration-md ease-smooth hover:bg-surface/30 relative before:absolute before:left-0 before:top-8 before:bottom-8 before:w-[2px] before:bg-accent before:scale-y-0 before:transition-transform before:duration-sm hover:before:scale-y-100 before:origin-top">
                  <div className="grid-12 gap-y-4 lg:gap-y-8">
                    <div className="hidden lg:block col-span-12 lg:col-span-2">
                      <button
                        onClick={() => toggleService(idx)}
                        className="font-display text-accent-faint transition-colors duration-sm ease-smooth group-hover:text-accent cursor-pointer hover:scale-110 transform min-h-[44px]"
                        aria-label={`Expand ${service.title}`}
                      >
                        {service.number}
                      </button>
                    </div>

                    <div className="col-span-12 lg:col-span-6">
                      <h2 className="font-display text-text mb-3 md:mb-4 transition-colors duration-sm ease-smooth group-hover:text-accent flex items-baseline gap-3">
                        <span className="lg:hidden text-accent-faint text-base font-display">{service.number}</span>
                        <Link to={service.path} className="hover:text-accent flex-1">{service.title}</Link>
                      </h2>
                      <p className="text-base md:text-lg text-mute mb-4 md:mb-6">
                        {service.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4">
                        <button
                          onClick={() => toggleService(idx)}
                          className="inline-flex items-center gap-2 text-sm font-medium text-mute hover:text-accent transition-colors min-h-[44px]"
                          aria-expanded={expandedService === idx}
                        >
                          {expandedService === idx ? (
                            <><span>Show less</span><ChevronUp className="w-4 h-4" /></>
                          ) : (
                            <><span>Quick view</span><ChevronDown className="w-4 h-4" /></>
                          )}
                        </button>
                        <Link
                          to={service.path}
                          className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all duration-sm min-h-[44px]"
                        >
                          See full page
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>

                    <div className="col-span-12 lg:col-span-4">
                      {/* Pill tags on mobile/tablet, list on desktop */}
                      <div className="flex flex-wrap gap-2 lg:hidden">
                        {service.capabilities.map((cap, i) => (
                          <span key={i} className="pill-neutral text-xs">{cap.name}</span>
                        ))}
                      </div>
                      <ul className="hidden lg:flex flex-col gap-3">
                        {service.capabilities.map((cap, i) => (
                          <li key={i}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button className="text-text/80 hover:text-accent transition-colors cursor-help text-left text-sm min-h-[36px] flex items-center">
                                  {cap.name}
                                </button>
                              </TooltipTrigger>
                              <TooltipContent side="left" className="max-w-xs">
                                <p className="text-sm">{cap.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {expandedService === idx && (
                      <div className="col-span-12 animate-fade-in">
                        <div className="pt-8 border-t border-line mt-8">
                          <div className="grid lg:grid-cols-2 gap-8">
                            <div>
                              <h3 className="text-xl font-display text-text mb-4">What We Do</h3>
                              <p className="text-mute">
                                {service.details}
                              </p>
                            </div>
                            <div>
                              <h3 className="text-xl font-display text-text mb-4">Deliverables</h3>
                              <ul className="stack gap-3">
                                {service.deliverables.map((item, i) => (
                                  <li key={i} className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                                    <span className="text-mute">{item}</span>
                                  </li>
                                ))}
                              </ul>
                              <button
                                onClick={() => handleRequestService(service.title)}
                                className="btn-outline-cta mt-6 group text-sm"
                              >
                                Request {service.title}
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Process Timeline */}
          <LeafDivider />
          <ScrollReveal variant="fade-up">
            <SectionChapter number={2} label="Process" />
            <ProcessTimeline />
          </ScrollReveal>
        </Section>
        <ClientLogos />
      </TooltipProvider>
    </Layout>
  );
};

export default Services;
