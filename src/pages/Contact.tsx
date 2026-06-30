import { Section } from "@/components/ui/section";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import MultiStepContactForm from "@/components/MultiStepContactForm";
import PageHero from "@/components/PageHero";
import SectionChapter from "@/components/SectionChapter";
import LeafDivider from "@/components/LeafDivider";
import AmbientGlow from "@/components/AmbientGlow";
import { Mail, MessageSquare } from "lucide-react";
import QuickContactForm from "@/components/QuickContactForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Contact = () => {
  // Schema markup
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact ProjGrowth",
    description: "Get in touch with ProjGrowth for web design, branding, and digital marketing services in Orlando.",
    url: "https://projgrowth.com/contact",
    mainEntity: {
      "@type": "Organization",
      name: "ProjGrowth",
      url: "https://projgrowth.com",
      email: "info@projgrowth.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Orlando",
        addressRegion: "FL",
        addressCountry: "US",
      },
      areaServed: {
        "@type": "Place",
        name: "Orlando, Central Florida",
      },
    },
  };

  return (
    <Layout
      seoTitle="Contact Us | Start Your Project | ProjGrowth Orlando"
      seoDescription="Ready to transform your digital presence? Contact ProjGrowth for a free consultation. Orlando's boutique digital agency - web design, branding, and content strategy."
      seoKeywords="contact ProjGrowth, free consultation, hire design agency, start project, digital agency contact, web design quote Orlando"
      canonicalUrl="/contact"
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(contactPageSchema)}
        </script>
      </Helmet>

      {/* Hero — matches PageHero shell used on every other inner page */}
      <Section className="relative overflow-hidden">
        <AmbientGlow variant="hero" />
        <PageHero
          chapter={{ number: 1, label: "Begin" }}
          title={
            <>
              Let's Build
              <br />
              <span className="text-accent">Something Great</span>
            </>
          }
          lede="Tell us about your project and we'll craft a tailored approach to bring your vision to life."
          className="mb-10 md:mb-12"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-cards max-w-2xl">
          <a
            href="mailto:info@projgrowth.com"
            className="surface-card !p-4 flex items-center gap-3 hover:border-accent/50 transition-all duration-sm group"
          >
            <Mail className="w-5 h-5 text-accent flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-text group-hover:text-accent transition-colors">Email Us</p>
              <p className="text-xs text-mute">info@projgrowth.com</p>
            </div>
          </a>
          <div className="surface-card !p-4 flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-accent flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-text">Response Time</p>
              <p className="text-xs text-mute">Within 24 hours, Mon-Fri</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Quick Contact */}
      <Section>
        <ScrollReveal>
          <div className="max-w-xl mx-auto">
            <SectionChapter number={2} label="Quick Message" align="center" />
            <h2 className="font-display text-text mb-2 text-center">Quick Message</h2>
            <p className="text-sm text-mute mb-6 text-center">Don't need the full rundown? Just drop us a line.</p>
            <QuickContactForm />
          </div>
        </ScrollReveal>
      </Section>

      {/* Multi-Step Form Section */}
      <LeafDivider />
      <Section>
        <ScrollReveal>
          <div className="text-center mb-8">
            <SectionChapter number={3} label="Start a Project" align="center" />
            <h2 className="font-display text-text mb-2">Start a Project</h2>
            <p className="text-mute">Want to tell us more? Walk through our guided form.</p>
          </div>
          <MultiStepContactForm />
        </ScrollReveal>
      </Section>

      {/* FAQ Section */}
      <Section>
        <ScrollReveal variant="fade-up">
          <div className="max-w-3xl mx-auto">
            <SectionChapter number={4} label="Questions" align="center" />
            <h2 className="font-display text-text mb-10 md:mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-text hover:text-accent text-left">
                  What is your typical project timeline?
                </AccordionTrigger>
                <AccordionContent className="text-mute">
                  Project timelines vary based on scope and complexity. A typical website project takes 6-12 weeks from discovery to launch, 
                  while larger applications may take 3-6 months. We'll provide a detailed timeline during our initial consultation.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-text hover:text-accent text-left">
                  How do you structure pricing?
                </AccordionTrigger>
                <AccordionContent className="text-mute">
                  We offer both project-based and retainer pricing models. Project fees are determined by scope, complexity, and timeline. 
                  We provide detailed proposals with transparent pricing before starting any work.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-text hover:text-accent text-left">
                  Do you work with startups?
                </AccordionTrigger>
                <AccordionContent className="text-mute">
                  Yes! We love working with startups and have flexible engagement models to fit different stages and budgets. 
                  We can help with MVPs, product design, brand identity, and growth strategy.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-text hover:text-accent text-left">
                  What happens after the project launches?
                </AccordionTrigger>
                <AccordionContent className="text-mute">
                  We provide post-launch support and maintenance packages to ensure your project continues to perform optimally. 
                  We also offer ongoing partnerships for clients who need continuous development, design, or marketing support.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-text hover:text-accent text-left">
                  What industries do you specialize in?
                </AccordionTrigger>
                <AccordionContent className="text-mute">
                  We've worked across SaaS, fintech, healthcare, real estate, e-commerce, and more. Our process is adaptable to any industry, 
                  and we bring fresh perspectives while respecting industry-specific requirements and regulations.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollReveal>
      </Section>

    </Layout>
  );
};

export default Contact;
