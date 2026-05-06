import { Section } from "@/components/ui/section";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const GlobalCTA = () => {
  return (
    <Section size="lg" className="border-t border-line">
        <ScrollReveal variant="fade-up">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-display text-text mb-5">
              Ready to Grow Your Business?
            </h2>
            <p className="lede mx-auto mb-8">
              Let's discuss how we can help your Orlando business stand out,
              attract more customers, and achieve your goals.
            </p>
            <Link
              to="/contact"
              className="btn-solid group"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
    </Section>
  );
};

export default GlobalCTA;
