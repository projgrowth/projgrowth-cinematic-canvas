import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ScrollIndicator from "@/components/ScrollIndicator";
import FeaturedWorkSlider from "@/components/FeaturedWorkSlider";
import FeaturedWorkSkeleton from "@/components/FeaturedWorkSkeleton";
import NavigationGuide from "@/components/NavigationGuide";
import ScrollReveal from "@/components/ScrollReveal";
import { caseStudies } from "@/data/caseStudies";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Select featured projects from real case studies
const featuredProjects = caseStudies.slice(0, 3);

const Home = () => {
  const [isLoadingWork, setIsLoadingWork] = useState(true);

  useEffect(() => {
    // Simulate content loading for skeleton demo
    const timer = setTimeout(() => setIsLoadingWork(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout
      seoTitle="ProjGrowth - Digital Design Studio | Brand Strategy & Web Development"
      seoDescription="Modern creative studio specializing in brand strategy, digital design, and web development. We create meaningful digital experiences that drive business growth."
      seoKeywords="digital design studio, brand strategy, web development, UI/UX design, creative agency, digital experiences"
      canonicalUrl="/"
    >
      {/* Hero Section - No reveal, it's above the fold */}
      <section className="container-site py-16 md:py-24 lg:py-32 min-h-[80vh] lg:min-h-[90vh] flex items-center">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-10 stack gap-6 md:gap-8">
            <h1 className="font-display text-4xl md:text-6xl lg:text-8xl leading-tight text-text animate-fade-in">
              We design digital
              <br />
              <span className="text-accent">experiences</span> that
              <br />
              grow businesses
            </h1>
            
            <p className="text-base md:text-xl text-mute max-w-2xl leading-relaxed animate-fade-in" style={{ animationDelay: "100ms", animationFillMode: "both" }}>
              A modern creative studio focused on brand strategy, product design, and web development.
              We partner with ambitious brands to create meaningful impact.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2 md:mt-4 animate-fade-in" style={{ animationDelay: "200ms", animationFillMode: "both" }}>
              <Link 
                to="/work"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-accent text-accent rounded-md font-medium transition-all duration-sm hover:bg-accent hover:text-base min-h-[44px]"
              >
                View Our Work
                <ArrowRight className="w-5 h-5 transition-transform duration-sm group-hover:translate-x-1" />
              </Link>
              
              <Link 
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-line text-mute rounded-md font-medium transition-all duration-sm hover:border-muted-foreground hover:text-text min-h-[44px]"
              >
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="container-site py-24 border-t border-line">
        <ScrollReveal variant="fade-up">
          <div className="grid-12 gap-y-12">
            <div className="col-span-12 lg:col-span-4">
              <h2 className="font-display text-3xl lg:text-4xl text-text mb-4">What We Do</h2>
              <p className="text-xl text-mute">Comprehensive digital solutions for modern challenges</p>
            </div>

            <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Brand Strategy",
                  description: "Building authentic brand identities that resonate with your audience and stand the test of time.",
                  path: "/services#brand-strategy"
                },
                {
                  title: "Digital Design",
                  description: "Creating beautiful, functional interfaces that deliver exceptional user experiences.",
                  path: "/services#digital-design"
                },
                {
                  title: "Development",
                  description: "Engineering robust, scalable solutions using cutting-edge technologies.",
                  path: "/services#development"
                },
                {
                  title: "Growth Marketing",
                  description: "Data-driven strategies to accelerate your business growth and market presence.",
                  path: "/services#growth-marketing"
                }
              ].map((service, idx) => (
                <ScrollReveal key={idx} variant="fade-up" delay={idx * 0.1}>
                  <Link
                    to={service.path}
                    className="group block p-8 bg-surface rounded-lg border border-line transition-all duration-sm hover:border-accent/30"
                  >
                    <h3 className="font-display text-2xl text-text mb-3 transition-colors duration-sm group-hover:text-accent">
                      {service.title}
                    </h3>
                    <p className="text-mute">
                      {service.description}
                    </p>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Featured Work Section */}
      <section className="container-site py-24 border-t border-line">
        <ScrollReveal variant="fade-up">
          <div className="mb-16">
            <h2 className="font-display text-3xl lg:text-4xl text-text mb-4">
              Featured Work
            </h2>
            <p className="text-xl text-mute">
              Recent projects we're proud of
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.2}>
          {isLoadingWork ? (
            <FeaturedWorkSkeleton />
          ) : (
            <FeaturedWorkSlider projects={featuredProjects} />
          )}
        </ScrollReveal>
      </section>

      {/* Navigation Guide Section */}
      <ScrollReveal variant="fade-up">
        <NavigationGuide />
      </ScrollReveal>

      <ScrollIndicator />
    </Layout>
  );
};

export default Home;
