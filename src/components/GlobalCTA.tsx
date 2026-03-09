import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const GlobalCTA = () => {
  return (
    <section className="border-t border-line">
      <div className="container-site py-20 md:py-28">
        <ScrollReveal variant="fade-up">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-display text-3xl lg:text-4xl text-text mb-6">
              Ready to Grow Your Business?
            </h2>
            <p className="text-xl text-mute mb-8">
              Let's discuss how we can help your Orlando business stand out,
              attract more customers, and achieve your goals.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary-foreground rounded-md font-medium transition-all duration-sm hover:bg-accent/90"
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
