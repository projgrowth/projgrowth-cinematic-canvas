import Layout from "@/components/Layout";
import ScrollIndicator from "@/components/ScrollIndicator";
import FeaturedWorkSlider from "@/components/FeaturedWorkSlider";
import NavigationGuide from "@/components/NavigationGuide";
import SocialProof from "@/components/SocialProof";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="container-site py-32 min-h-[90vh] flex items-center relative">
        <div className="absolute inset-0 bg-gradient-radial from-base via-base to-base/50 pointer-events-none" />
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />
        <div className="grid-12 relative z-10">
          <div className="col-span-12 lg:col-span-10 stack gap-8">
            <h1 className="font-display text-6xl lg:text-8xl leading-tight text-text animate-fade-in">
              We design digital
              <br />
              <span className="text-accent relative inline-block">
                experiences
                <span className="absolute inset-0 blur-xl bg-accent/20 -z-10" />
              </span> that
              <br />
              grow businesses
            </h1>
            
            <p className="text-xl text-mute max-w-2xl leading-relaxed animate-slide-up" style={{ animationDelay: "100ms", animationFillMode: "both" }}>
              A modern creative studio focused on brand strategy, product design, and web development.
              We partner with ambitious brands to create meaningful impact.
            </p>

            <div className="flex gap-4 mt-4 animate-slide-up" style={{ animationDelay: "200ms", animationFillMode: "both" }}>
              <Link 
                to="/work"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-base rounded-md font-medium transition-all duration-sm ease-smooth hover:bg-accent/90 hover:gap-3 hover:shadow-glow-accent"
              >
                View Our Work
                <ArrowRight className="w-5 h-5 transition-transform duration-sm ease-smooth group-hover:translate-x-2" />
              </Link>
              
              <Link 
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-line text-text rounded-md font-medium transition-all duration-sm ease-smooth hover:border-accent hover:text-accent hover:shadow-elegant"
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
            <h2 className="font-display text-4xl text-text mb-4">What We Do</h2>
            <p className="text-mute">Comprehensive digital solutions for modern challenges</p>
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
                className="group p-8 bg-surface rounded-lg border border-line transition-all duration-md ease-smooth hover:border-accent/50 hover:bg-surface/80 hover:shadow-elegant hover:scale-[1.02] animate-scale-in"
                style={{ animationDelay: `${idx * 100}ms`, animationFillMode: "both" }}
              >
                <h3 className="font-display text-2xl text-text mb-3 transition-colors duration-sm ease-smooth group-hover:text-accent">
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
        <div className="mb-12">
          <h2 className="font-display text-4xl lg:text-5xl text-text mb-4">
            Featured Work
          </h2>
          <p className="text-lg text-mute">
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
      <section className="container-site py-24 border-t border-line">
        <NavigationGuide />
      </section>

      {/* Social Proof */}
      <section className="container-site">
        <SocialProof />
      </section>

      <ScrollIndicator />
    </Layout>
  );
};

export default Home;
