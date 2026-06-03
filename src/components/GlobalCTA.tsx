import { Section } from "@/components/ui/section";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import AmbientGlow from "./AmbientGlow";

const GlobalCTA = () => {
  return (
    <Section size="lg" className="border-t border-line relative overflow-hidden">
        <AmbientGlow variant="center" />
        <ScrollReveal variant="fade-up">
          <div className="text-center max-w-3xl mx-auto relative z-10">
            <h2 className="font-display text-text mb-5">
              Ready to Build Something Exceptional?
            </h2>
            <p className="lede mx-auto mb-8">
              We keep our client list intentionally small so every engagement gets our full focus. If you're serious about what your brand can become — let's find out if we're the right fit.
            </p>
            <Link
              to="/contact"
              className="btn-solid group"
            >
              Start the Conversation
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
    </Section>
  );
};

export default GlobalCTA;
