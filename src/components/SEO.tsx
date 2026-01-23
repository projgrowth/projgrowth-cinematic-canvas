import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  twitterImage?: string;
  canonicalUrl?: string;
  type?: "website" | "article";
}

const SEO = ({
  title = "ProjGrowth - Digital Experiences That Grow Businesses",
  description = "Modern creative studio specializing in brand strategy, digital design, and web development. We create meaningful digital experiences that drive business growth.",
  keywords = "digital design, web development, brand strategy, UI/UX design, creative studio, growth marketing",
  ogImage = "/og-image.jpg",
  twitterImage = "/twitter-card.jpg",
  canonicalUrl,
  type = "website",
}: SEOProps) => {
  const siteUrl = "https://projgrowth.com";
  const location = useLocation();
  const fullUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : `${siteUrl}${location.pathname}`;

  // JSON-LD Structured Data for Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ProjGrowth",
    url: siteUrl,
    logo: `${siteUrl}/favicon.png`,
    description: "Modern creative studio specializing in brand strategy, digital design, and web development.",
    sameAs: [
      "https://www.instagram.com/projgrowth",
      "https://www.linkedin.com/company/projgrowth",
      "https://twitter.com/projgrowth"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@projgrowth.com",
      contactType: "customer service",
      availableLanguage: "English"
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "US"
    }
  };

  // JSON-LD for ProfessionalService
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "ProjGrowth",
    url: siteUrl,
    image: `${siteUrl}/og-image.png`,
    description: "Digital design studio specializing in brand strategy, UI/UX design, and web development.",
    priceRange: "$$",
    openingHours: "Mo-Fr 09:00-18:00",
    email: "info@projgrowth.com",
    areaServed: {
      "@type": "Country",
      name: "United States"
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Brand Strategy", description: "Build authentic brand identities that resonate with your audience" }
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Digital Design", description: "Beautiful, functional interfaces with exceptional user experiences" }
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Web Development", description: "Modern, scalable web applications built with cutting-edge technologies" }
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Growth Marketing", description: "Data-driven strategies to accelerate business growth" }
        }
      ]
    }
  };

  // Breadcrumb schema
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl
      },
      ...pathSegments.map((segment, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: segment.charAt(0).toUpperCase() + segment.slice(1),
        item: `${siteUrl}/${pathSegments.slice(0, index + 1).join('/')}`
      }))
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="ProjGrowth" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${twitterImage}`} />
      <meta name="twitter:site" content="@projgrowth" />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="author" content="ProjGrowth" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Geo Tags for Local SEO */}
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      {pathSegments.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;