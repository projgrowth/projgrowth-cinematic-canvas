import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import MultiStepContactForm from "@/components/MultiStepContactForm";
import AIChatbotPlaceholder from "@/components/AIChatbotPlaceholder";
import { Mail, MessageSquare } from "lucide-react";
import QuickContactForm from "@/components/QuickContactForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Contact = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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

      {/* Hero with Parallax */}
      <section ref={heroRef} className="relative overflow-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-20 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/3 rounded-full blur-3xl" />
        </motion.div>

        <div className="container-site relative z-10 py-16 md:py-24">
          <div className="grid-12 gap-y-8 items-end">
            {/* Header */}
            <ScrollReveal variant="fade-up" className="col-span-12 lg:col-span-8">
              <motion.h1 
                className="font-display text-3xl md:text-5xl lg:text-7xl text-foreground mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Let's Build
                <br />
                <span className="text-accent">Something Great</span>
              </motion.h1>
              <motion.p 
                className="text-lg text-muted leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Tell us about your project and we'll craft a tailored approach 
                to bring your vision to life.
              </motion.p>
            </ScrollReveal>

            {/* Compact info row */}
            <div className="col-span-12 lg:col-span-4 flex flex-row lg:flex-col gap-4">
              <ScrollReveal variant="scale" delay={0.2}>
                <a
                  href="mailto:info@projgrowth.com"
                  className="flex items-center gap-3 p-4 bg-surface/80 rounded-lg border border-line hover:border-accent/50 transition-all duration-300 group"
                >
                  <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">Email Us</p>
                    <p className="text-xs text-muted">info@projgrowth.com</p>
                  </div>
                </a>
              </ScrollReveal>
              <ScrollReveal variant="scale" delay={0.3}>
                <div className="flex items-center gap-3 p-4 bg-surface/80 rounded-lg border border-line">
                  <MessageSquare className="w-5 h-5 text-accent flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Response Time</p>
                    <p className="text-xs text-muted">Within 24 hours, Mon-Fri</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="container-site py-12 border-t border-line">
        <ScrollReveal>
          <div className="max-w-xl mx-auto">
            <h2 className="font-display text-xl text-foreground mb-2 text-center">Quick Message</h2>
            <p className="text-sm text-muted mb-6 text-center">Don't need the full rundown? Just drop us a line.</p>
            <QuickContactForm />
          </div>
        </ScrollReveal>
      </section>

      {/* Multi-Step Form Section */}
      <section className="container-site py-16 md:py-24 border-t border-line">
        <ScrollReveal>
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-2">Start a Project</h2>
            <p className="text-muted">Want to tell us more? Walk through our guided form.</p>
          </div>
          <MultiStepContactForm />
        </ScrollReveal>
      </section>

      {/* FAQ Section */}
      <section className="container-site py-16 md:py-24 border-t border-line">
        <ScrollReveal variant="fade-up">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl lg:text-4xl text-foreground mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-foreground hover:text-accent text-left">
                  What is your typical project timeline?
                </AccordionTrigger>
                <AccordionContent className="text-muted">
                  Project timelines vary based on scope and complexity. A typical website project takes 6-12 weeks from discovery to launch, 
                  while larger applications may take 3-6 months. We'll provide a detailed timeline during our initial consultation.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-foreground hover:text-accent text-left">
                  How do you structure pricing?
                </AccordionTrigger>
                <AccordionContent className="text-muted">
                  We offer both project-based and retainer pricing models. Project fees are determined by scope, complexity, and timeline. 
                  We provide detailed proposals with transparent pricing before starting any work.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-foreground hover:text-accent text-left">
                  Do you work with startups?
                </AccordionTrigger>
                <AccordionContent className="text-muted">
                  Yes! We love working with startups and have flexible engagement models to fit different stages and budgets. 
                  We can help with MVPs, product design, brand identity, and growth strategy.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-foreground hover:text-accent text-left">
                  What happens after the project launches?
                </AccordionTrigger>
                <AccordionContent className="text-muted">
                  We provide post-launch support and maintenance packages to ensure your project continues to perform optimally. 
                  We also offer ongoing partnerships for clients who need continuous development, design, or marketing support.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-foreground hover:text-accent text-left">
                  What industries do you specialize in?
                </AccordionTrigger>
                <AccordionContent className="text-muted">
                  We've worked across SaaS, fintech, healthcare, real estate, e-commerce, and more. Our process is adaptable to any industry, 
                  and we bring fresh perspectives while respecting industry-specific requirements and regulations.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollReveal>
      </section>

      {/* AI Chatbot Placeholder */}
      <AIChatbotPlaceholder />
    </Layout>
  );
};

export default Contact;
