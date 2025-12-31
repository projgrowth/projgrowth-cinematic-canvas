import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Mail, MessageSquare, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "" // Honeypot field - should remain empty
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      message: ""
    };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (formData.name.length > 100) {
      newErrors.name = "Name must be less than 100 characters";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (formData.message.length > 1000) {
      newErrors.message = "Message must be less than 1000 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Call rate-limited edge function which handles both DB insert and email
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: { 
          name: formData.name, 
          email: formData.email, 
          message: formData.message,
          website: formData.website // Honeypot field
        }
      });

      if (error) {
        // Check for rate limit error
        if (error.message?.includes('429') || error.message?.includes('Too many requests')) {
          toast({
            title: "Too many requests",
            description: "Please wait a while before submitting again.",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
        throw error;
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "", website: "" });
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };
  return (
    <Layout
      seoTitle="Contact Us - ProjGrowth | Start Your Project"
      seoDescription="Ready to start your project? Get in touch with our team to discuss how we can help bring your digital vision to life."
      seoKeywords="contact, get in touch, start project, hire design agency, consultation"
      canonicalUrl="/contact"
    >
      <section className="container-site py-16 md:py-24">
        <div className="grid-12 gap-y-16">
          {/* Header */}
          <ScrollReveal variant="fade-up" className="col-span-12 lg:col-span-6">
            <h1 className="font-display text-5xl lg:text-7xl text-text mb-6">
              Start Your
              <br />
              <span className="text-accent">Project</span>
            </h1>
            <p className="text-xl text-mute leading-relaxed">
              Have a project in mind? We'd love to hear about it. 
              Drop us a line and let's start a conversation.
            </p>
          </ScrollReveal>

          {/* Contact Info */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <div className="stack gap-8">
              <ScrollReveal variant="scale" delay={0.1}>
                <div className="p-8 bg-surface rounded-lg border border-line transition-all duration-md ease-smooth hover:border-accent/40 hover:shadow-elegant">
                  <Mail className="w-8 h-8 text-accent mb-4" />
                  <h3 className="font-display text-xl text-text mb-2">Email Us</h3>
                  <a 
                    href="mailto:info@projgrowth.com" 
                    className="text-mute hover:text-accent transition-colors duration-sm ease-smooth"
                  >
                    info@projgrowth.com
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="scale" delay={0.2}>
                <div className="p-8 bg-surface rounded-lg border border-line transition-all duration-md ease-smooth hover:border-accent/40 hover:shadow-elegant">
                  <MessageSquare className="w-8 h-8 text-accent mb-4" />
                  <h3 className="font-display text-xl text-text mb-2">Start a Chat</h3>
                  <p className="text-mute">Available Mon-Fri, 9am-6pm EST</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <ScrollReveal variant="fade-up">
          <div className="py-24 border-t border-line">
            <form onSubmit={handleSubmit} className="grid-12 gap-y-6">
              <div className="col-span-12 lg:col-span-6">
                <label htmlFor="name" className="block text-sm font-medium text-mute mb-2">
                  Name
                </label>
                <input 
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-surface border rounded-md text-text placeholder:text-mute focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 shadow-inner transition-all duration-sm ease-smooth ${
                    errors.name ? 'border-red-500' : 'border-line'
                  }`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500 animate-fade-in">{errors.name}</p>
                )}
              </div>

              <div className="col-span-12 lg:col-span-6">
                <label htmlFor="email" className="block text-sm font-medium text-mute mb-2">
                  Email
                </label>
                <input 
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-surface border rounded-md text-text placeholder:text-mute focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 shadow-inner transition-all duration-sm ease-smooth ${
                    errors.email ? 'border-red-500' : 'border-line'
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500 animate-fade-in">{errors.email}</p>
                )}
              </div>

              <div className="col-span-12">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="message" className="block text-sm font-medium text-mute">
                    Project Details
                  </label>
                  <span className="text-xs text-mute">
                    {formData.message.length}/1000
                  </span>
                </div>
                <textarea 
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  maxLength={1000}
                  className={`w-full px-4 py-3 bg-surface border rounded-md text-text placeholder:text-mute focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 shadow-inner transition-all duration-sm ease-smooth resize-none ${
                    errors.message ? 'border-red-500' : 'border-line'
                  }`}
                  placeholder="Tell us about your project..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500 animate-fade-in">{errors.message}</p>
                )}
              </div>

              {/* Honeypot field - hidden from humans, visible to bots */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="col-span-12">
                <button 
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-base rounded-md font-medium transition-all duration-sm ease-smooth hover:bg-accent/90 hover:gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Sent!
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="w-5 h-5 transition-transform duration-sm ease-smooth group-hover:translate-x-2" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </ScrollReveal>

        {/* FAQ Section */}
        <ScrollReveal variant="fade-up">
          <div className="max-w-3xl mx-auto py-24 border-t border-line">
            <h2 className="font-display text-3xl lg:text-4xl text-text mb-16">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-text hover:text-accent">
                  What is your typical project timeline?
                </AccordionTrigger>
                <AccordionContent className="text-mute">
                  Project timelines vary based on scope and complexity. A typical website project takes 6-12 weeks from discovery to launch, 
                  while larger applications may take 3-6 months. We'll provide a detailed timeline during our initial consultation.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-text hover:text-accent">
                  How do you structure pricing?
                </AccordionTrigger>
                <AccordionContent className="text-mute">
                  We offer both project-based and retainer pricing models. Project fees are determined by scope, complexity, and timeline. 
                  We provide detailed proposals with transparent pricing before starting any work.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-text hover:text-accent">
                  Do you work with startups?
                </AccordionTrigger>
                <AccordionContent className="text-mute">
                  Yes! We love working with startups and have flexible engagement models to fit different stages and budgets. 
                  We can help with MVPs, product design, brand identity, and growth strategy.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-text hover:text-accent">
                  What happens after the project launches?
                </AccordionTrigger>
                <AccordionContent className="text-mute">
                  We provide post-launch support and maintenance packages to ensure your project continues to perform optimally. 
                  We also offer ongoing partnerships for clients who need continuous development, design, or marketing support.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-text hover:text-accent">
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
      </section>
    </Layout>
  );
};

export default Contact;
