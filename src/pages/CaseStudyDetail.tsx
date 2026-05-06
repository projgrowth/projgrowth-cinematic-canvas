import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Lightbulb, Share2, Linkedin, Twitter } from "lucide-react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { caseStudies } from "@/data/caseStudies";
import { useRef } from "react";

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const caseStudy = caseStudies.find(cs => cs.id === slug);
  
  if (!caseStudy) {
    return <Navigate to="/work" replace />;
  }

  // Get adjacent case studies for navigation
  const currentIndex = caseStudies.findIndex(cs => cs.id === slug);
  const prevStudy = caseStudies[currentIndex - 1];
  const nextStudy = caseStudies[currentIndex + 1];

  const shareUrl = `${window.location.origin}/work/${caseStudy.id}`;
  const shareText = `Check out this case study: ${caseStudy.title} by ProjGrowth`;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: caseStudy.title, text: shareText, url: shareUrl });
    }
  };

  return (
    <Layout
      seoTitle={`${caseStudy.title} Case Study | ProjGrowth`}
      seoDescription={`${caseStudy.subtitle}. Learn how we helped ${caseStudy.title} overcome their challenges with ${caseStudy.category.toLowerCase()}.`}
      seoKeywords={`${caseStudy.title}, ${caseStudy.category}, case study, Orlando agency`}
      canonicalUrl={`/work/${caseStudy.id}`}
    >
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[60vh] md:min-h-[70vh] flex items-end overflow-hidden">
        {/* Background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-accent/10 via-base to-base"
          style={{ y: heroY }}
        />
        
        {/* Hero media */}
        {caseStudy.heroMedia && (
          <motion.div 
            className="absolute inset-0"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            {caseStudy.heroMedia.type === "video" ? (
              <video
                src={caseStudy.heroMedia.url}
                poster={caseStudy.heroMedia.poster}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-30"
              />
            ) : (
              <img
                src={caseStudy.heroMedia.url}
                alt={caseStudy.title}
                className="w-full h-full object-cover opacity-30"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-base via-base/80 to-transparent" />
          </motion.div>
        )}

        {/* Content */}
        <div className="container-site relative z-10 pb-12 md:pb-20">
          <Link 
            to="/work" 
            className="inline-flex items-center gap-2 text-mute hover:text-accent transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Work
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {caseStudy.categories.map((cat) => (
                <span 
                  key={cat}
                  className="px-3 py-1 text-xs uppercase tracking-wider text-accent bg-accent/10 rounded-full border border-accent/20"
                >
                  {cat}
                </span>
              ))}
            </div>

            <h1 className="font-display text-text mb-4">
              {caseStudy.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-mute max-w-3xl">
              {caseStudy.subtitle}
            </p>
          </motion.div>
        </div>
      </section>


      {/* Main Content */}
      <section className="container-site section">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          {/* Sidebar */}
          <aside className="md:col-span-4 lg:col-span-3">
            <ScrollReveal variant="fade-up">
              <div className="sticky top-24 space-y-8">
                {/* Logo */}
                {caseStudy.logo && (
                  <div className="p-6 bg-surface rounded-lg border border-line">
                    <img 
                      src={caseStudy.logo} 
                      alt={`${caseStudy.title} logo`}
                      className="h-12 max-w-full object-contain opacity-80"
                    />
                  </div>
                )}

                {/* What They Do */}
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-accent mb-3">About</h3>
                  <p className="text-mute">{caseStudy.whatTheyDo}</p>
                </div>

                {/* Share */}
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-accent mb-3">Share</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleShare}
                      className="p-2 rounded-md border border-line hover:border-accent hover:text-accent transition-colors"
                      aria-label="Share"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-md border border-line hover:border-accent hover:text-accent transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-md border border-line hover:border-accent hover:text-accent transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </aside>

          {/* Main Content */}
          <div className="md:col-span-8 lg:col-span-9 space-y-16">
            {/* The Challenge */}
            <ScrollReveal variant="fade-up">
              <div className="space-y-6">
                  <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-destructive" />
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl text-text">The Challenge</h2>
                </div>
                <ul className="space-y-4 pl-2">
                  {caseStudy.theirIssues.map((issue, idx) => (
                    <motion.li 
                      key={idx}
                      className="flex items-start gap-4 text-mute"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <span className="text-destructive/60 mt-1.5">—</span>
                      <span className="text-base md:text-lg">{issue}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* The Solution */}
            <ScrollReveal variant="fade-up" delay={0.1}>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl text-text">The Solution</h2>
                </div>
                <ul className="space-y-4 pl-2">
                  {caseStudy.howWeHelped.map((help, idx) => (
                    <motion.li 
                      key={idx}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <span className="text-base md:text-lg text-text">{help}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* The Impact */}
            <ScrollReveal variant="fade-up" delay={0.2}>
              <div className="p-8 md:p-10 bg-gradient-to-br from-accent/5 via-surface to-accent/10 rounded-xl border border-accent/20">
                <h2 className="font-display text-2xl md:text-3xl text-text mb-4">Why It Matters</h2>
                <p className="text-lg md:text-xl text-mute leading-relaxed">
                  {caseStudy.whyItMatters}
                </p>
              </div>
            </ScrollReveal>

            {/* Process Steps */}
            {caseStudy.processSteps && caseStudy.processSteps.length > 0 && (
              <ScrollReveal variant="fade-up" delay={0.3}>
                <div className="space-y-6">
                  <h2 className="font-display text-2xl md:text-3xl text-text">Our Process</h2>
                  <div className="grid gap-4">
                    {caseStudy.processSteps.map((step, idx) => (
                      <motion.div
                        key={idx}
                        className="flex gap-6 p-5 bg-surface rounded-lg border border-line group hover:border-accent/30 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <span className="font-display text-3xl text-accent/40 group-hover:text-accent transition-colors">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <h3 className="text-text font-medium mb-1">{step.title}</h3>
                          <p className="text-mute text-sm">{step.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Gallery */}
            {caseStudy.gallery && caseStudy.gallery.length > 0 && (
              <ScrollReveal variant="fade-up" delay={0.4}>
                <div className="space-y-6">
                  <h2 className="font-display text-2xl md:text-3xl text-text">The Work</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {caseStudy.gallery.map((item, idx) => (
                      <motion.div
                        key={idx}
                        className="relative aspect-video rounded-lg overflow-hidden border border-line group"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        {item.type === "video" ? (
                          <video
                            src={item.url}
                            className="w-full h-full object-cover"
                            muted
                            loop
                            playsInline
                            onMouseEnter={(e) => e.currentTarget.play()}
                            onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                          />
                        ) : (
                          <img
                            src={item.url}
                            alt={item.caption || `Project gallery ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                        {item.caption && (
                          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-base/90 to-transparent">
                            <p className="text-sm text-text">{item.caption}</p>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-line">
        <div className="container-site section">
          <ScrollReveal variant="fade-up">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl text-text mb-4">
                Ready for similar results?
              </h2>
              <p className="text-mute mb-8">
                Let's discuss how we can help transform your brand, content, or digital presence.
              </p>
              <Link
                to="/contact"
                state={{ service: caseStudy.category }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary-foreground rounded-md font-medium hover:bg-accent/90 transition-colors group"
              >
                Start a Conversation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Navigation */}
      <section className="border-t border-line">
        <div className="container-site py-8">
          <div className="flex justify-between items-center">
            {prevStudy ? (
              <Link
                to={`/work/${prevStudy.id}`}
                className="flex items-center gap-3 text-mute hover:text-accent transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <div className="text-left">
                  <span className="text-xs uppercase tracking-wider block">Previous</span>
                  <span className="text-text group-hover:text-accent transition-colors">{prevStudy.title}</span>
                </div>
              </Link>
            ) : (
              <div />
            )}
            
            {nextStudy ? (
              <Link
                to={`/work/${nextStudy.id}`}
                className="flex items-center gap-3 text-mute hover:text-accent transition-colors group text-right"
              >
                <div>
                  <span className="text-xs uppercase tracking-wider block">Next</span>
                  <span className="text-text group-hover:text-accent transition-colors">{nextStudy.title}</span>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CaseStudyDetail;
