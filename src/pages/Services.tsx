import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ProcessTimeline from "@/components/ProcessTimeline";
import PricingEstimator from "@/components/PricingEstimator";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

const Services = () => {
  const navigate = useNavigate();
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const services = [
    {
      number: "01",
      title: "Brand Strategy",
      description: "We help you define your unique position in the market and build a brand that truly resonates.",
      capabilities: [
        { name: "Brand Identity", tooltip: "Logo, color palette, typography, and visual language that represents your brand" },
        { name: "Positioning", tooltip: "Define your unique value proposition and market differentiation" },
        { name: "Messaging", tooltip: "Craft compelling brand voice, tone, and key messages" },
        { name: "Guidelines", tooltip: "Comprehensive brand standards to ensure consistency across all touchpoints" }
      ],
      details: "Our brand strategy service goes beyond aesthetics. We conduct deep market research, competitor analysis, and audience profiling to create a brand that not only looks great but strategically positions you for success. From workshops to deliverable guidelines, we ensure your brand tells a cohesive story.",
      deliverables: ["Brand audit", "Positioning statement", "Visual identity system", "Brand guidelines", "Messaging framework"]
    },
    {
      number: "02",
      title: "Digital Design",
      description: "Beautiful, functional interfaces crafted with attention to detail and user experience at the core.",
      capabilities: [
        { name: "UI/UX Design", tooltip: "User-centered interfaces that are both beautiful and intuitive" },
        { name: "Product Design", tooltip: "End-to-end product design from concept to high-fidelity prototypes" },
        { name: "Prototyping", tooltip: "Interactive prototypes to test and validate design decisions" },
        { name: "Design Systems", tooltip: "Scalable component libraries for consistent product experiences" }
      ],
      details: "We blend aesthetics with usability to create digital experiences that users love. Our process includes user research, wireframing, visual design, and iterative prototyping. We design with accessibility and responsiveness in mind, ensuring your product works beautifully on every device.",
      deliverables: ["User research insights", "Wireframes & user flows", "High-fidelity mockups", "Interactive prototypes", "Design system documentation"]
    },
    {
      number: "03",
      title: "Development",
      description: "Modern, scalable web applications built with best practices and cutting-edge technologies.",
      capabilities: [
        { name: "Web Development", tooltip: "Custom websites and web apps using React, Next.js, and modern frameworks" },
        { name: "Mobile Apps", tooltip: "Native and cross-platform mobile applications" },
        { name: "API Integration", tooltip: "Seamless integration with third-party services and internal systems" },
        { name: "Performance", tooltip: "Optimized code for lightning-fast load times and smooth interactions" }
      ],
      details: "Our development team builds robust, maintainable applications using the latest technologies. We follow agile methodologies, write clean code, and prioritize performance and security. Every project includes thorough testing, documentation, and post-launch support.",
      deliverables: ["Technical architecture", "Clean, documented code", "Responsive web application", "API documentation", "Deployment & hosting setup"]
    },
    {
      number: "04",
      title: "Growth",
      description: "Data-driven strategies to accelerate your growth and maximize your digital presence.",
      capabilities: [
        { name: "SEO", tooltip: "Search engine optimization to improve organic visibility and rankings" },
        { name: "Content Strategy", tooltip: "Strategic content planning to engage and convert your audience" },
        { name: "Analytics", tooltip: "Data tracking and insights to measure and optimize performance" },
        { name: "Conversion Optimization", tooltip: "A/B testing and UX improvements to maximize conversions" }
      ],
      details: "Growth isn't just about traffic—it's about the right traffic. We use data analytics, user behavior insights, and continuous optimization to drive meaningful results. From SEO to conversion rate optimization, we help you achieve sustainable growth.",
      deliverables: ["SEO audit & strategy", "Content calendar", "Analytics dashboard setup", "Conversion funnel analysis", "Monthly performance reports"]
    }
  ];

  const toggleService = (idx: number) => {
    setExpandedService(expandedService === idx ? null : idx);
  };

  const handleRequestService = (serviceTitle: string) => {
    navigate('/contact', { state: { selectedService: serviceTitle } });
  };

  return (
    <Layout
      seoTitle="Services - ProjGrowth | Brand Strategy, Design & Development"
      seoDescription="Comprehensive digital services including brand strategy, UI/UX design, web development, and growth marketing. Transform your digital presence."
      seoKeywords="brand strategy services, UI/UX design, web development, digital design, growth marketing, design agency services"
      canonicalUrl="/services"
    >
      <TooltipProvider>
        <section className="container-site py-24">
          <div className="mb-20">
            <h1 className="font-display text-5xl lg:text-7xl text-text mb-6">
              Our Services
            </h1>
            <p className="text-xl text-mute max-w-2xl">
              Comprehensive digital solutions tailored to your business goals and user needs.
            </p>
          </div>

          <div className="stack gap-1">
            {services.map((service, idx) => (
              <div 
                key={idx}
                className="group border-t border-line py-12 transition-all duration-md ease-smooth hover:bg-surface/30"
              >
                <div className="grid-12 gap-y-8">
                  {/* Service Number */}
                  <div className="col-span-12 lg:col-span-2">
                    <button
                      onClick={() => toggleService(idx)}
                      className="font-display text-5xl text-accent/30 transition-colors duration-sm ease-smooth group-hover:text-accent cursor-pointer hover:scale-110 transform transition-transform"
                      aria-label={`Expand ${service.title}`}
                    >
                      {service.number}
                    </button>
                  </div>

                  {/* Title & Description */}
                  <div className="col-span-12 lg:col-span-6">
                    <h2 className="font-display text-4xl text-text mb-4 transition-colors duration-sm ease-smooth group-hover:text-accent">
                      {service.title}
                    </h2>
                    <p className="text-lg text-mute mb-6">
                      {service.description}
                    </p>

                    {/* Expand Button */}
                    <button
                      onClick={() => toggleService(idx)}
                      className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all duration-sm"
                    >
                      {expandedService === idx ? (
                        <>
                          <span>Show less</span>
                          <ChevronUp className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <span>Learn more</span>
                          <ChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Capabilities with Tooltips */}
                  <div className="col-span-12 lg:col-span-4">
                    <h3 className="text-sm font-medium text-mute mb-4">Capabilities</h3>
                    <ul className="stack gap-3">
                      {service.capabilities.map((cap, i) => (
                        <li key={i}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="text-text hover:text-accent transition-colors cursor-help text-left">
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

                  {/* Expanded Details */}
                  {expandedService === idx && (
                    <div className="col-span-12 animate-fade-in">
                      <div className="pt-8 border-t border-line mt-8">
                        <div className="grid lg:grid-cols-2 gap-8">
                          <div>
                            <h3 className="text-xl font-display text-text mb-4">What We Do</h3>
                            <p className="text-mute leading-relaxed">
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
                            <Button
                              onClick={() => handleRequestService(service.title)}
                              className="mt-6 group"
                              variant="default"
                            >
                              Request {service.title}
                              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Process Timeline */}
          <ProcessTimeline />

          {/* Pricing Estimator */}
          <PricingEstimator />
        </section>
      </TooltipProvider>
    </Layout>
  );
};

export default Services;
