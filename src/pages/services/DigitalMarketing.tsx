/**
 * Digital Marketing Service Page
 */

import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Search, Users, Mail, BarChart3 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const DigitalMarketing = () => {
  const services = [
    {
      icon: Search,
      title: "SEO Services",
      description: "Improve your search rankings and drive organic traffic with technical SEO, content optimization, and link building."
    },
    {
      icon: Users,
      title: "Social Media Marketing",
      description: "Build your community and engage audiences across platforms with strategic content and community management."
    },
    {
      icon: Mail,
      title: "Email Marketing",
      description: "Nurture leads and drive conversions with targeted email campaigns, automations, and newsletter strategies."
    },
    {
      icon: BarChart3,
      title: "Paid Advertising",
      description: "Reach your ideal customers through Google Ads, Meta Ads, and other paid channels with data-driven campaigns."
    }
  ];

  const deliverables = [
    "Marketing strategy & roadmap",
    "SEO audit & optimization",
    "Google Ads management",
    "Social media advertising",
    "Email campaign creation",
    "Marketing automation setup",
    "Analytics & reporting",
    "Conversion rate optimization",
    "Competitor analysis",
    "Monthly performance reviews"
  ];

  const faqs = [
    {
      question: "How long until I see results from digital marketing?",
      answer: "Results timelines vary by channel. Paid advertising can show results within days-weeks. SEO typically takes 3-6 months to see significant organic traffic gains. Email marketing results depend on list size and engagement. We set realistic expectations and track progress monthly."
    },
    {
      question: "What's your approach to measuring ROI?",
      answer: "We establish clear KPIs at project start—traffic, leads, conversions, revenue. We implement proper tracking, create dashboards for real-time visibility, and provide monthly reports showing performance against goals and ROI calculations."
    },
    {
      question: "Do you offer marketing retainer packages?",
      answer: "Yes! Most clients work with us on monthly retainers that include strategy, execution, and optimization across channels. Packages are customized based on your goals, budget, and needed services. We can also do project-based work for specific campaigns."
    },
    {
      question: "Can you work with our existing marketing team?",
      answer: "Absolutely. We often collaborate with in-house teams, filling gaps in expertise or capacity. We can handle specific channels, provide strategic guidance, or take over full execution—whatever configuration works best for your organization."
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
      seoTitle="Digital Marketing Orlando | Marketing Strategy | ProjGrowth"
      seoDescription="Full-service digital marketing agency in Orlando. SEO, social media marketing, email campaigns, and paid advertising strategies that deliver measurable ROI."
      seoKeywords="digital marketing Orlando, SEO Orlando, social media marketing Florida, email marketing, PPC advertising Orlando"
      canonicalUrl="/services/digital-marketing"
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <section className="container-site py-16 md:py-24">
        <Breadcrumbs />
        
        <ScrollReveal variant="fade-up">
          <div className="mb-16">
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl text-text mb-6">
              Digital Marketing Services in Orlando
            </h1>
            <p className="text-xl text-mute max-w-3xl leading-relaxed">
              Drive growth with data-driven digital marketing strategies. We help Orlando businesses 
              reach their ideal customers, generate leads, and increase revenue through SEO, 
              paid advertising, social media, and email marketing.
            </p>
          </div>
        </ScrollReveal>

        {/* Services */}
        <ScrollReveal variant="fade-up">
          <div className="py-16 border-t border-line">
            <h2 className="font-display text-3xl lg:text-4xl text-text mb-12">
              Our Digital Marketing Services
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

        {/* Our Approach */}
        <ScrollReveal variant="fade-up">
          <div className="py-16 border-t border-line">
            <h2 className="font-display text-3xl lg:text-4xl text-text mb-12">
              Our Approach
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Data-Driven", desc: "Every decision backed by analytics. We track, measure, and optimize based on real performance data." },
                { title: "Results-Focused", desc: "We're obsessed with ROI. Our strategies are designed to deliver measurable business outcomes." },
                { title: "Transparent", desc: "Clear reporting, honest communication, and full visibility into what's working and what's not." }
              ].map((item, idx) => (
                <div key={idx} className="p-8 bg-surface rounded-lg border border-line text-center">
                  <h3 className="font-display text-xl text-accent mb-4">{item.title}</h3>
                  <p className="text-mute">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Deliverables */}
        <ScrollReveal variant="fade-up">
          <div className="py-16 border-t border-line">
            <h2 className="font-display text-3xl lg:text-4xl text-text mb-12">
              What's Included
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
              Ready to Grow Your Business?
            </h2>
            <p className="text-xl text-mute max-w-2xl mx-auto mb-8">
              Let's create a digital marketing strategy that drives real results for your Orlando business.
            </p>
            <Link
              to="/contact?service=digital-marketing"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-base rounded-md font-medium transition-all duration-sm hover:bg-accent/90"
            >
              Get Your Free Marketing Audit
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </Layout>
  );
};

export default DigitalMarketing;
