import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, Palette, FileText, HelpCircle, 
  Zap, Clock, Calendar, MessageSquare,
  Check, ArrowRight, ArrowLeft, Loader2,
  Sparkles
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";


interface FormData {
  service: string;
  serviceDetail: string;
  timeline: string;
  budget: string;
  name: string;
  email: string;
  company: string;
  website: string; // Honeypot
}

const services = [
  { id: "website", label: "New Website", icon: Globe, description: "Build a stunning, high-converting website" },
  { id: "rebrand", label: "Rebrand", icon: Palette, description: "Refresh your brand identity" },
  { id: "content", label: "Content Strategy", icon: FileText, description: "Develop engaging content that connects" },
  { id: "explore", label: "Not Sure Yet", icon: HelpCircle, description: "Let's figure it out together" },
];

const timelines = [
  { id: "asap", label: "ASAP", icon: Zap, description: "We need this yesterday" },
  { id: "1-3months", label: "1-3 Months", icon: Clock, description: "Ready to get started soon" },
  { id: "3-6months", label: "3-6 Months", icon: Calendar, description: "Planning ahead" },
  { id: "exploring", label: "Just Exploring", icon: MessageSquare, description: "Still in discovery mode" },
];

const budgets = [
  { id: "starter", label: "Starter", range: "$3-5k", description: "Perfect for small projects" },
  { id: "growth", label: "Growth", range: "$5-15k", description: "For established businesses" },
  { id: "scale", label: "Scale", range: "$15k+", description: "Enterprise-level solutions" },
  { id: "discuss", label: "Let's Discuss", range: "TBD", description: "Budget is flexible" },
];

const serviceQuestions: Record<string, { question: string; placeholder: string }> = {
  website: { question: "Tell us about your current website situation", placeholder: "Do you have an existing site? What's working and what isn't?" },
  rebrand: { question: "What's driving your rebrand?", placeholder: "Describe your current brand challenges and vision for the future..." },
  content: { question: "What content goals do you have?", placeholder: "Are you looking for blog content, social media, video, or something else?" },
  explore: { question: "What's on your mind?", placeholder: "Tell us about your business and what you're hoping to achieve..." },
};

// Track GA4 event
const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
};

const MultiStepContactForm = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    service: "",
    serviceDetail: "",
    timeline: "",
    budget: "",
    name: "",
    email: "",
    company: "",
    website: "", // Honeypot
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const handleSelect = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    trackEvent("form_step_interaction", { step, field, value });
  }, [step]);

  const nextStep = useCallback(() => {
    trackEvent("form_step_complete", { step, stepName: getStepName(step) });
    setStep(prev => Math.min(prev + 1, totalSteps));
  }, [step]);

  const prevStep = useCallback(() => {
    setStep(prev => Math.max(prev - 1, 1));
  }, []);

  const getStepName = (s: number) => {
    const names = ["service", "details", "timeline", "budget", "contact"];
    return names[s - 1] || "unknown";
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async () => {
    const newErrors = { name: "", email: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) return;

    setIsSubmitting(true);
    trackEvent("form_submit_attempt", { service: formData.service, timeline: formData.timeline, budget: formData.budget });

    try {
      // Build comprehensive message
      const message = `
Service: ${services.find(s => s.id === formData.service)?.label || formData.service}
Details: ${formData.serviceDetail || "Not provided"}
Timeline: ${timelines.find(t => t.id === formData.timeline)?.label || formData.timeline}
Budget: ${budgets.find(b => b.id === formData.budget)?.label || formData.budget} (${budgets.find(b => b.id === formData.budget)?.range || ""})
Company: ${formData.company || "Not provided"}
      `.trim();

      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: formData.name,
          email: formData.email,
          message,
          website: formData.website, // Honeypot
        },
      });

      if (error) {
        if (error.message?.includes("429")) {
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

      trackEvent("form_submit_success", { service: formData.service });
      setIsSubmitting(false);
      setShowConfetti(true);
      setIsComplete(true);
      
      setTimeout(() => setShowConfetti(false), 3000);
    } catch (error) {
      setIsSubmitting(false);
      trackEvent("form_submit_error", { error: String(error) });
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return !!formData.service;
      case 2: return true; // Detail is optional
      case 3: return !!formData.timeline;
      case 4: return !!formData.budget;
      case 5: return !!formData.name && !!formData.email && validateEmail(formData.email);
      default: return false;
    }
  };

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative py-16 text-center"
      >
        {/* Confetti */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: i % 3 === 0 ? "hsl(var(--accent))" : i % 3 === 1 ? "#fff" : "hsl(var(--accent) / 0.5)",
                  left: `${Math.random() * 100}%`,
                  top: -10,
                }}
                initial={{ y: 0, opacity: 1, rotate: 0 }}
                animate={{
                  y: 400 + Math.random() * 200,
                  opacity: 0,
                  rotate: Math.random() * 360,
                  x: (Math.random() - 0.5) * 200,
                }}
                transition={{
                  duration: 2 + Math.random(),
                  delay: Math.random() * 0.5,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        )}

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 10, delay: 0.2 }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10, delay: 0.4 }}
          >
            <Check className="w-10 h-10 text-accent" />
          </motion.div>
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-display text-foreground mb-4">
          You're in!
        </h2>
        <p className="text-lg text-muted mb-8 max-w-md mx-auto">
          We'll be in touch within 24 hours. In the meantime, feel free to explore our work.
        </p>

        <p className="text-sm text-muted">
          Can't wait? Email us directly at{" "}
          <a href="mailto:info@projgrowth.com" className="text-accent hover:underline">
            info@projgrowth.com
          </a>
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between text-sm text-muted mb-2">
          <span>Step {step} of {totalSteps}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-1 bg-surface rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Form Steps */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl md:text-3xl font-display text-foreground mb-2">
              What brings you here today?
            </h2>
            <p className="text-muted mb-8">Select the option that best describes your needs</p>

            <div className="grid md:grid-cols-2 gap-4">
              {services.map((service) => (
                <motion.button
                  key={service.id}
                  onClick={() => handleSelect("service", service.id)}
                  className={`group p-6 text-left rounded-lg border-2 transition-all duration-300 ${
                    formData.service === service.id
                      ? "border-accent bg-accent/10"
                      : "border-line bg-surface hover:border-accent/50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <service.icon className={`w-8 h-8 mb-4 transition-colors ${
                    formData.service === service.id ? "text-accent" : "text-muted group-hover:text-accent"
                  }`} />
                  <h3 className="font-medium text-foreground mb-1">{service.label}</h3>
                  <p className="text-sm text-muted">{service.description}</p>
                  {formData.service === service.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4 w-6 h-6 bg-accent rounded-full flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 text-base" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl md:text-3xl font-display text-foreground mb-2">
              {serviceQuestions[formData.service]?.question || "Tell us more"}
            </h2>
            <p className="text-muted mb-8">This helps us prepare for our conversation (optional)</p>

            <textarea
              value={formData.serviceDetail}
              onChange={(e) => setFormData(prev => ({ ...prev, serviceDetail: e.target.value }))}
              placeholder={serviceQuestions[formData.service]?.placeholder || "Share any details..."}
              rows={5}
              className="w-full px-4 py-3 bg-surface border border-line rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 resize-none"
            />
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl md:text-3xl font-display text-foreground mb-2">
              What's your timeline?
            </h2>
            <p className="text-muted mb-8">When do you need this completed?</p>

            <div className="grid md:grid-cols-2 gap-4">
              {timelines.map((timeline) => (
                <motion.button
                  key={timeline.id}
                  onClick={() => handleSelect("timeline", timeline.id)}
                  className={`group p-6 text-left rounded-lg border-2 transition-all duration-300 relative ${
                    formData.timeline === timeline.id
                      ? "border-accent bg-accent/10"
                      : "border-line bg-surface hover:border-accent/50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <timeline.icon className={`w-6 h-6 mb-3 transition-colors ${
                    formData.timeline === timeline.id ? "text-accent" : "text-muted group-hover:text-accent"
                  }`} />
                  <h3 className="font-medium text-foreground mb-1">{timeline.label}</h3>
                  <p className="text-sm text-muted">{timeline.description}</p>
                  {formData.timeline === timeline.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4 w-6 h-6 bg-accent rounded-full flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 text-base" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl md:text-3xl font-display text-foreground mb-2">
              Investment range
            </h2>
            <p className="text-muted mb-8">This helps us tailor our recommendations</p>

            <div className="grid md:grid-cols-2 gap-4">
              {budgets.map((budget) => (
                <motion.button
                  key={budget.id}
                  onClick={() => handleSelect("budget", budget.id)}
                  className={`group p-6 text-left rounded-lg border-2 transition-all duration-300 relative ${
                    formData.budget === budget.id
                      ? "border-accent bg-accent/10"
                      : "border-line bg-surface hover:border-accent/50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-foreground">{budget.label}</h3>
                    <span className={`text-sm font-medium ${
                      formData.budget === budget.id ? "text-accent" : "text-muted"
                    }`}>
                      {budget.range}
                    </span>
                  </div>
                  <p className="text-sm text-muted">{budget.description}</p>
                  {formData.budget === budget.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4 w-6 h-6 bg-accent rounded-full flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 text-base" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl md:text-3xl font-display text-foreground mb-2">
              Almost there!
            </h2>
            <p className="text-muted mb-8">How can we reach you?</p>

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted mb-2">
                  Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, name: e.target.value }));
                    if (errors.name) setErrors(prev => ({ ...prev, name: "" }));
                  }}
                  className={`w-full px-4 py-3 bg-surface border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 ${
                    errors.name ? "border-red-500" : "border-line"
                  }`}
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted mb-2">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, email: e.target.value }));
                    if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                  }}
                  className={`w-full px-4 py-3 bg-surface border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 ${
                    errors.email ? "border-red-500" : "border-line"
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-muted mb-2">
                  Company (optional)
                </label>
                <input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full px-4 py-3 bg-surface border border-line rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                  placeholder="Your company"
                />
              </div>

              {/* Honeypot */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-10">
        <button
          onClick={prevStep}
          disabled={step === 1}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all duration-300 ${
            step === 1
              ? "opacity-0 pointer-events-none"
              : "text-muted hover:text-foreground"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {step < totalSteps ? (
          <button
            onClick={nextStep}
            disabled={!canProceed()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-base rounded-md font-medium transition-all duration-300 hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !canProceed()}
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-base rounded-md font-medium transition-all duration-300 hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Submit
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepContactForm;
