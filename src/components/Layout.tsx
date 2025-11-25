import { ReactNode } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import BackToTop from "./BackToTop";
import ScrollProgress from "./ScrollProgress";
import SEO from "./SEO";

interface LayoutProps {
  children: ReactNode;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  canonicalUrl?: string;
}

const Layout = ({ 
  children, 
  seoTitle, 
  seoDescription, 
  seoKeywords,
  canonicalUrl 
}: LayoutProps) => {
  return (
    <div className="min-h-screen bg-base flex flex-col">
      <SEO 
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonicalUrl={canonicalUrl}
      />
      
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-accent focus:text-base focus:rounded-md focus:font-medium focus:shadow-glow-accent"
      >
        Skip to main content
      </a>
      
      <ScrollProgress />
      <Navigation />
      <main id="main-content" className="pt-20 flex-1">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout;
