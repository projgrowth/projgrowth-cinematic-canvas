/**
 * Web Design Service Page
 */

import { Section } from "@/components/ui/section";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Monitor, Smartphone, Zap, Shield } from "lucide-react";
import QuickContactForm from "@/components/QuickContactForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const WebDesign = () => {
  const process = [
    {
      step: "01",
      title: "Discovery",
      description: "We dive deep into your business goals, target audience, and competitive landscape to create a strategic foundation."
    },
    {
      step: "02",
      title: "Design",
      description: "Our designers craft beautiful, user-centered interfaces that align with your brand and convert visitors."
    },
    {
      step: "03",
      title: "Development",
      description: "We build your site using modern technologies ensuring fast load times, security, and scalability."
    },
    {
      step: "04",
      title: "Launch",
      description: "After thorough testing, we launch your site and provide training so you can manage content with confidence."
    }
  ];

  const features = [
    "Custom responsive design",
    "Mobile-first approach",
    "SEO-optimized structure",
    "Fast loading speeds",
    "CMS integration",
    "Security best practices",
    "Accessibility compliance",
    "Analytics setup",
    "Performance optimization",
    "Cross-browser compatibility"
  ];

  const faqs = [
    {
      question: "How much does web design cost in Orlando?",
      answer: "Web design costs vary based on project scope. Basic websites start around $3,000-$5,000, while custom websites with advanced functionality range from $8,000-$25,000+. Contact us for a personalized quote based on your specific needs."
    },
    {
      question: "How long does it take to build a website?",
      answer: "Most websites take 4-8 weeks from kickoff to launch. Simple sites may be faster, while complex projects with custom functionality can take 10-12 weeks. We'll provide a detailed timeline during our initial consultation."
    },
    {
      question: "Do you work with businesses outside Orlando?",
      answer: "Yes! While we're based in Orlando and love working with Central Florida businesses, we serve clients throughout Florida and nationwide. Our process works seamlessly for remote collaboration."
    },
    {
      question: "Will my website work on mobile devices?",
      answer: "Absolutely. Every website we build is fully responsive and optimized for all devices—phones, tablets, laptops, and desktops. We use a mobile-first approach to ensure the best experience for all users."
    },
    {
      question: "Can I update the website myself after launch?",
      answer: "Yes! We build sites with user-friendly content management systems (CMS) and provide training so you can easily update text, images, and add new pages without technical knowledge."
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
      seoTitle="Web Design Orlando | Custom Websites | ProjGrowth"
      seoDescription="Professional web design services in Orlando. We create custom, mobile-responsive websites that look stunning and convert visitors into customers. Free consultation available."
      seoKeywords="web design Orlando, custom website Orlando, responsive web design, Orlando web developer, website design Central Florida"
      canonicalUrl="/services/web-design"
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
              Web Design Services in Orlando
            </h1>
            <p className="text-xl text-mute max-w-3xl">
              We create stunning, high-performance websites that help Orlando businesses 
              stand out, engage visitors, and drive conversions. From small business sites 
              to complex web applications, we deliver digital experiences that work.
            </p>
          </div>
        </ScrollReveal>

        {/* Key Benefits */}
        <ScrollReveal variant="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 section border-t border-line">
            {[
              { icon: Monitor, title: "Custom Design", desc: "Unique to your brand" },
              { icon: Smartphone, title: "Mobile-First", desc: "Perfect on every device" },
              { icon: Zap, title: "Lightning Fast", desc: "Optimized performance" },
              { icon: Shield, title: "Secure & Reliable", desc: "Built to last" }
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-surface rounded-lg border border-line text-center">
                <item.icon className="w-10 h-10 text-accent mx-auto mb-4" />
                <h3 className="font-display text-text mb-2">{item.title}</h3>
                <p className="text-sm text-mute">{item.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Process */}
        <ScrollReveal variant="fade-up">
          <div className="section border-t border-line">
            <h2 className="font-display text-text mb-12">
              Our Web Design Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, idx) => (
                <div key={idx} className="relative">
                  <span className="text-6xl font-display text-accent-faint absolute -top-4 -left-2">
                    {step.step}
                  </span>
                  <div className="pt-8">
                    <h3 className="font-display text-text mb-3">{step.title}</h3>
                    <p className="text-mute text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* What's Included */}
        <ScrollReveal variant="fade-up">
          <div className="section border-t border-line">
            <h2 className="font-display text-text mb-12">
              What's Included
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-surface rounded-lg border border-line">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-text">{feature}</span>
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

        {/* Quick Contact */}
        <ScrollReveal variant="fade-up">
          <div className="section border-t border-line">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="font-display text-text mb-2">Interested in Web Design?</h2>
              <p className="text-mute mb-6">Drop us a quick message and we'll get back to you within 24 hours.</p>
              <QuickContactForm />
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal variant="fade-up">
          <div className="section border-t border-line text-center">
            <h2 className="font-display text-text mb-6">
              Ready to Build Your Website?
            </h2>
            <p className="text-xl text-mute max-w-2xl mx-auto mb-8">
              Let's discuss your project and create a website that helps your Orlando business grow.
            </p>
            <Link
              to="/contact?service=web-design"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary-foreground rounded-md font-medium transition-all duration-sm hover:bg-accent/90"
            >
              Get Your Free Consultation
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </Section>
    </Layout>
  );
};

export default WebDesign;
