import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import GlobalCTA from "./GlobalCTA";
import BackToTop from "./BackToTop";
import SEO from "./SEO";
import Breadcrumbs from "./Breadcrumbs";

interface LayoutProps {
  children: ReactNode;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  canonicalUrl?: string;
  hideGlobalCTA?: boolean;
  hideBreadcrumbs?: boolean;
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
  hideBreadcrumbs = false,
  ogImage,
  ogType,
  noindex,
  ogParams,
}: LayoutProps) => {
  const location = useLocation();
  
  // Hide global CTA on Contact page (already has its own) and legal pages
  const suppressCTA = hideGlobalCTA || ["/contact", "/privacy", "/terms"].includes(location.pathname);

  // Breadcrumbs render on every route except Home (the component itself
  // returns null at "/"), giving uniform breadcrumb structured data.
  const showBreadcrumbs = !hideBreadcrumbs && location.pathname !== "/";

  return (
    <div className="min-h-screen bg-base flex flex-col">
      <SEO 
        title={seoTitle}
        description={seoDescription}
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
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-accent focus:text-on-accent focus:rounded-md focus:font-medium focus:shadow-glow-accent"
      >
        Skip to main content
      </a>
      
      <Navigation />
      <main id="main-content" className="flex-1" style={{ paddingTop: "var(--nav-height)" }}>
        {showBreadcrumbs && (
          <div className="container-site pt-6 md:pt-8">
            <Breadcrumbs />
          </div>
        )}
        {children}
      </main>
      {!suppressCTA && <GlobalCTA />}
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout;
