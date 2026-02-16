/**
 * Branding Service Page
 */

import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Palette, Target, BookOpen, Eye } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Branding = () => {
  const services = [
    {
      icon: Target,
      title: "Brand Strategy",
      description: "Define your brand positioning, values, voice, and messaging framework that guides all communications."
    },
    {
      icon: Palette,
      title: "Logo Design",
      description: "Create a distinctive, memorable logo that captures your brand essence and works across all applications."
    },
    {
      icon: Eye,
      title: "Visual Identity",
      description: "Develop a complete visual system including colors, typography, imagery style, and design elements."
    },
    {
      icon: BookOpen,
      title: "Brand Guidelines",
      description: "Document your brand standards in a comprehensive guide ensuring consistent application."
    }
  ];

  const deliverables = [
    "Brand strategy document",
    "Primary & secondary logos",
    "Color palette (digital & print)",
    "Typography system",
    "Business card design",
    "Social media templates",
    "Email signature",
    "Letterhead & stationery",
    "Brand guidelines PDF",
    "Asset files (all formats)"
  ];

  const faqs = [
    {
      question: "How long does a branding project take?",
      answer: "A complete brand identity project typically takes 6-10 weeks. This includes discovery, strategy development, design exploration, refinements, and final deliverables. Rush timelines are available for an additional fee."
    },
    {
      question: "What's included in brand guidelines?",
      answer: "Our brand guidelines document covers logo usage rules, color specifications (RGB, CMYK, HEX), typography hierarchy, spacing requirements, do's and don'ts, imagery style, and application examples. It's everything your team needs to maintain brand consistency."
    },
    {
      question: "Can you rebrand an existing business?",
      answer: "Absolutely! We work with businesses on both new brand creation and rebrands. For rebrands, we'll assess what's working, what needs evolution, and develop a strategy that honors your history while positioning you for future growth."
    },
    {
      question: "Do you offer logo design only?",
      answer: "While we can create standalone logos, we recommend a strategic approach that includes at minimum a brand strategy session. This ensures your logo is meaningful, differentiated, and built on solid positioning rather than just aesthetics."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Layout
      seoTitle="Branding Agency Orlando | Brand Identity Design | ProjGrowth"
      seoDescription="Orlando branding agency creating powerful brand identities. Logo design, brand strategy, visual identity systems that make your business memorable. Schedule a discovery call."
      seoKeywords="branding agency Orlando, logo design Orlando, brand identity Orlando, brand strategy Florida, visual identity design"
      canonicalUrl="/services/branding"
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <section className="container-site py-24">
        <Breadcrumbs />
        
        <ScrollReveal variant="fade-up">
          <div className="mb-16">
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl text-text mb-6">
              Orlando Branding & Identity Design
            </h1>
            <p className="text-xl text-mute max-w-3xl leading-relaxed">
              Your brand is more than a logo—it's the complete experience people have with your business. 
              We create strategic brand identities that differentiate Orlando businesses and build lasting 
              connections with customers.
            </p>
          </div>
        </ScrollReveal>

        {/* Services */}
        <ScrollReveal variant="fade-up">
          <div className="py-16 border-t border-line">
            <h2 className="font-display text-3xl lg:text-4xl text-text mb-12">
              Our Branding Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, idx) => (
                <div key={idx} className="p-8 bg-surface rounded-lg border border-line transition-all duration-sm hover:border-accent/30">
                  <service.icon className="w-10 h-10 text-accent mb-4" />
                  <h3 className="font-display text-xl text-text mb-3">{service.title}</h3>
                  <p className="text-mute leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Deliverables */}
        <ScrollReveal variant="fade-up">
          <div className="py-16 border-t border-line">
            <h2 className="font-display text-3xl lg:text-4xl text-text mb-12">
              What You'll Receive
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deliverables.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-surface rounded-lg border border-line">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-text">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Process */}
        <ScrollReveal variant="fade-up">
          <div className="py-16 border-t border-line">
            <h2 className="font-display text-3xl lg:text-4xl text-text mb-12">
              Our Branding Process
            </h2>
            <div className="space-y-8">
              {[
                { step: "01", title: "Discovery & Research", desc: "We immerse ourselves in your business, audience, competitors, and market to uncover insights that inform strategy." },
                { step: "02", title: "Strategy Development", desc: "Define your brand positioning, personality, values, and messaging framework that guides all creative decisions." },
                { step: "03", title: "Creative Exploration", desc: "Our designers develop multiple visual directions, exploring concepts that bring your brand strategy to life." },
                { step: "04", title: "Refinement", desc: "Based on your feedback, we refine the chosen direction, perfecting every detail of your brand identity." },
                { step: "05", title: "Delivery", desc: "Receive your complete brand package with all files, guidelines, and templates ready for implementation." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  <span className="text-3xl font-display text-accent/50 flex-shrink-0 w-12">{item.step}</span>
                  <div>
                    <h3 className="font-display text-xl text-text mb-2">{item.title}</h3>
                    <p className="text-mute">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* FAQs */}
        <ScrollReveal variant="fade-up">
          <div className="py-16 border-t border-line">
            <h2 className="font-display text-3xl lg:text-4xl text-text mb-12">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, idx) => (
                <AccordionItem 
                  key={idx} 
                  value={`faq-${idx}`}
                  className="bg-surface border border-line rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left text-text hover:text-accent">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-mute">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal variant="fade-up">
          <div className="py-16 border-t border-line text-center">
            <h2 className="font-display text-3xl lg:text-4xl text-text mb-6">
              Ready to Build Your Brand?
            </h2>
            <p className="text-xl text-mute max-w-2xl mx-auto mb-8">
              Let's create a brand identity that sets your Orlando business apart from the competition.
            </p>
            <Link
              to="/contact?service=branding"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-base rounded-md font-medium transition-all duration-sm hover:bg-accent/90"
            >
              Schedule a Discovery Call
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </Layout>
  );
};

export default Branding;
