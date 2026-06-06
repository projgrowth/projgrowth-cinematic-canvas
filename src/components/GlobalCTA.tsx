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
            <p className="text-xs uppercase tracking-[0.18em] text-mute mb-5">
              Have something in mind?
            </p>
            <h2 className="font-display text-text mb-5">
              Let's start a project.
            </h2>
            <p className="lede mx-auto mb-8">
              We take on a handful of engagements at a time so every one gets our full focus. Tell us where you are and where you want to go — we'll tell you honestly if we're the right fit.
            </p>
            <Link to="/contact" className="btn-solid group">
              Start a project
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
    </Section>
  );
};

export default GlobalCTA;
