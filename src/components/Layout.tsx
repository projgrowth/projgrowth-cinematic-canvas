import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import GlobalCTA from "./GlobalCTA";
import BackToTop from "./BackToTop";
import SEO from "./SEO";

interface LayoutProps {
  children: ReactNode;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  canonicalUrl?: string;
  hideGlobalCTA?: boolean;
  ogImage?: string;
  ogType?: "website" | "article";
  noindex?: boolean;
  ogParams?: {
    ogType?: "default" | "article" | "product";
    author?: string;
    date?: string;
    price?: string;
    image?: string;
  };
}

const Layout = ({ 
  children, 
  seoTitle, 
  seoDescription, 
  seoKeywords,
  canonicalUrl,
  hideGlobalCTA = false,
  ogImage,
  ogType,
  noindex,
  ogParams,
}: LayoutProps) => {
  const location = useLocation();
  
  // Hide global CTA on Contact page (already has its own) and legal pages
  const suppressCTA = hideGlobalCTA || ["/contact", "/privacy", "/terms"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-base flex flex-col">
      <SEO 
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonicalUrl={canonicalUrl}
        ogImage={ogImage}
        type={ogType}
        noindex={noindex}
        dynamicOg={false}
        ogParams={ogParams}
      />
      
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-accent focus:text-base focus:rounded-md focus:font-medium focus:shadow-glow-accent"
      >
        Skip to main content
      </a>
      
      <Navigation />
      <main id="main-content" className="flex-1" style={{ paddingTop: "var(--nav-height)" }}>
        {children}
      </main>
      {!suppressCTA && <GlobalCTA />}
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout;
