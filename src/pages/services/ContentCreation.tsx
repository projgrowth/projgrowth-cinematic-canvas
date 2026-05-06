/**
 * Content Creation Service Page
 */

import { Section } from "@/components/ui/section";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Link } from "react-router-dom";
import { ArrowRight, Check, PenTool, Video, Camera, Share2 } from "lucide-react";
import QuickContactForm from "@/components/QuickContactForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ContentCreation = () => {
  const services = [
    {
      icon: PenTool,
      title: "Copywriting",
      description: "Compelling website copy, blog posts, email campaigns, and marketing materials that connect with your audience."
    },
    {
      icon: Video,
      title: "Video Production",
      description: "From concept to final cut—promotional videos, social content, testimonials, and brand films."
    },
    {
      icon: Camera,
      title: "Photography",
      description: "Professional product photography, headshots, lifestyle images, and event coverage for your brand."
    },
    {
      icon: Share2,
      title: "Social Media Content",
      description: "Scroll-stopping graphics, reels, stories, and content calendars that grow your following."
    }
  ];

  const deliverables = [
    "Website copywriting",
    "Blog post creation",
    "Email marketing content",
    "Social media graphics",
    "Video scripts",
    "Promotional videos",
    "Product photography",
    "Brand lifestyle imagery",
    "Content calendars",
    "SEO-optimized articles"
  ];

  const faqs = [
    {
      question: "How do you ensure content matches our brand voice?",
      answer: "We start every project with a brand immersion session to understand your voice, tone, and messaging. We'll review existing materials, interview key stakeholders, and create a style guide if needed. All content is reviewed and refined based on your feedback before finalization."
    },
    {
      question: "Do you offer ongoing content services?",
      answer: "Yes! Many clients work with us on monthly retainers for consistent content creation—blog posts, social media management, video series, and more. We'll create a content calendar and maintain a steady flow of quality content."
    },
    {
      question: "What video equipment and style do you use?",
      answer: "We use professional cinema cameras and lighting equipment. Our style ranges from polished corporate to authentic documentary—we'll match the approach to your brand and goals. All videos are delivered in formats optimized for your intended platforms."
    },
    {
      question: "Can you help with content strategy, not just creation?",
      answer: "Absolutely. We often start with content strategy—identifying your audience, mapping the customer journey, and developing a content plan that supports your business goals. Great content starts with great strategy."
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
      seoTitle="Content Creation Orlando | Content Marketing | ProjGrowth"
      seoDescription="Orlando content creation agency delivering strategic content that connects with your audience. Video production, copywriting, social media content, photography services."
      seoKeywords="content creation Orlando, video production Orlando, copywriting services Florida, social media content, photography Orlando"
      canonicalUrl="/services/content-creation"
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <Section>
        <Breadcrumbs />
        
        <ScrollReveal variant="fade-up">
          <div className="mb-16">
            <h1 className="font-display text-text mb-6">
              Content Creation Services in Orlando
            </h1>
            <p className="text-xl text-mute max-w-3xl">
              Great content tells your story, builds trust, and drives action. We create compelling 
              content—from words to video to imagery—that helps Orlando businesses connect with 
              their audience and achieve their goals.
            </p>
          </div>
        </ScrollReveal>

        {/* Services */}
        <ScrollReveal variant="fade-up">
          <div className="section border-t border-line">
            <h2 className="font-display text-text mb-12">
              Content Services We Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, idx) => (
                <div key={idx} className="p-8 bg-surface rounded-lg border border-line transition-all duration-sm hover:border-accent/30">
                  <service.icon className="w-10 h-10 text-accent mb-4" />
                  <h3 className="font-display text-text mb-3">{service.title}</h3>
                  <p className="text-mute">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Deliverables */}
        <ScrollReveal variant="fade-up">
          <div className="section border-t border-line">
            <h2 className="font-display text-text mb-12">
              What We Create
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
          <div className="section border-t border-line">
            <h2 className="font-display text-text mb-12">
              Our Content Creation Process
            </h2>
            <div className="space-y-8">
              {[
                { step: "01", title: "Strategy & Planning", desc: "We define goals, identify your audience, and create a content strategy that supports your business objectives." },
                { step: "02", title: "Creative Development", desc: "Our team develops concepts, scripts, and outlines. You'll approve the direction before we move to production." },
                { step: "03", title: "Production", desc: "Whether it's writing, filming, or photography—we execute with attention to detail and brand consistency." },
                { step: "04", title: "Review & Refinement", desc: "You review drafts and provide feedback. We refine until it's exactly right." },
                { step: "05", title: "Delivery & Distribution", desc: "Receive final assets optimized for all platforms, plus guidance on best practices for publishing." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  <span className="text-3xl font-display text-accent-faint flex-shrink-0 w-12">{item.step}</span>
                  <div>
                    <h3 className="font-display text-text mb-2">{item.title}</h3>
                    <p className="text-mute">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* FAQs */}
        <ScrollReveal variant="fade-up">
          <div className="section border-t border-line">
            <h2 className="font-display text-text mb-12">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, idx) => (
                <AccordionItem 
                  key={idx} 
                  value={`faq-${idx}`}
                  className="surface-card px-6"
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

        {/* Quick Contact */}
        <ScrollReveal variant="fade-up">
          <div className="section border-t border-line">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="font-display text-text mb-2">Interested in Content Creation?</h2>
              <p className="text-mute mb-6">Drop us a quick message and we'll get back to you within 24 hours.</p>
              <QuickContactForm />
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal variant="fade-up">
          <div className="section border-t border-line text-center">
            <h2 className="font-display text-text mb-6">
              Ready to Create Amazing Content?
            </h2>
            <p className="text-xl text-mute max-w-2xl mx-auto mb-8">
              Let's discuss your content needs and create something your audience will love.
            </p>
            <Link
              to="/contact?service=content-creation"
              className="btn-solid group "
            >
              Start Your Content Project
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </Section>
    </Layout>
  );
};

export default ContentCreation;
