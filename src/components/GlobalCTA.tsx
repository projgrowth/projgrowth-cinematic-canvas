import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const GlobalCTA = () => {
  return (
    <section className="border-t border-line">
      <div className="container-site section-lg">
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
              className="group inline-flex items-center gap-2 h-12 px-8 bg-accent text-primary-foreground rounded-md font-medium transition-all duration-sm hover:bg-accent/90 hover:shadow-glow-accent"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default GlobalCTA;
