import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const QuickContactForm = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !validateEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (!message.trim()) {
      toast({
        title: "Message required",
        description: "Please enter a message.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: email.split("@")[0], // Use email prefix as name
          email,
          message,
          website, // Honeypot
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

      setIsComplete(true);
      setIsSubmitting(false);
    } catch {
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 p-4 bg-accent/10 border border-accent/20 rounded-lg"
      >
        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
          <Check className="w-4 h-4 text-accent" />
        </div>
        <p className="text-sm text-foreground">
          Got it! We'll reply within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Honeypot - hidden from users */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="absolute opacity-0 pointer-events-none h-0 w-0"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="flex-1 px-4 py-3 bg-surface border border-line rounded-lg text-foreground placeholder:text-mute focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-sm"
          required
          maxLength={255}
        />
      </div>

      <div className="flex gap-3">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Quick message — what do you need help with?"
          rows={2}
          className="flex-1 px-4 py-3 bg-surface border border-line rounded-lg text-foreground placeholder:text-mute focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-sm resize-none"
          required
          maxLength={5000}
        />
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="self-end px-4 h-[52px] w-[52px] bg-accent text-primary-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 flex items-center justify-center shrink-0"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </motion.button>
      </div>
    </form>
  );
};

export default QuickContactForm;
