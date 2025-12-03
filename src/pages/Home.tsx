import Layout from "@/components/Layout";
import ScrollIndicator from "@/components/ScrollIndicator";
import FeaturedWorkSlider from "@/components/FeaturedWorkSlider";
import NavigationGuide from "@/components/NavigationGuide";
import SocialProof from "@/components/SocialProof";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Layout
      seoTitle="ProjGrowth - Digital Design Studio | Brand Strategy & Web Development"
      seoDescription="Modern creative studio specializing in brand strategy, digital design, and web development. We create meaningful digital experiences that drive business growth."
      seoKeywords="digital design studio, brand strategy, web development, UI/UX design, creative agency, digital experiences"
      canonicalUrl="/"
    >
      {/* Hero Section */}
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
              <Link
                key={idx}
                to={service.path}
                className="group p-8 bg-surface rounded-lg border border-line transition-all duration-sm hover:border-accent/30 animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms`, animationFillMode: "both" }}
              >
                <h3 className="font-display text-2xl text-text mb-3 transition-colors duration-sm group-hover:text-accent">
                  {service.title}
                </h3>
                <p className="text-mute">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="container-site py-24 border-t border-line">
        <div className="mb-16">
          <h2 className="font-display text-3xl lg:text-4xl text-text mb-4">
            Featured Work
          </h2>
          <p className="text-xl text-mute">
            Recent projects we're proud of
          </p>
        </div>

        <FeaturedWorkSlider
          projects={[
            {
              title: "TechFlow",
              category: "SaaS Platform",
              description: "End-to-end platform redesign for B2B workflow automation"
            },
            {
              title: "Urban Nest",
              category: "Real Estate",
              description: "Modern property marketplace with immersive 3D experiences"
            },
            {
              title: "FitCore",
              category: "Health & Wellness",
              description: "Mobile-first fitness platform connecting trainers and clients"
            }
          ]}
        />
      </section>

      {/* Navigation Guide Section */}
      <NavigationGuide />

      {/* Social Proof */}
      <SocialProof />

      <ScrollIndicator />
    </Layout>
  );
};

export default Home;
