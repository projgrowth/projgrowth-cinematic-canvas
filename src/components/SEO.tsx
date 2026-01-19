import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  type?: "website" | "article";
}

const SEO = ({
  title = "ProjGrowth - Digital Experiences That Grow Businesses",
  description = "A modern creative studio focused on strategy, design, and development. We partner with ambitious brands to create meaningful digital impact.",
  keywords = "digital design, web development, brand strategy, UI/UX design, creative studio",
  ogImage = "/og-image.png",
  canonicalUrl,
  type = "website",
}: SEOProps) => {
  const siteUrl = "https://projgrowth.com";
  const fullUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;

  // JSON-LD Structured Data for Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ProjGrowth",
    url: siteUrl,
    logo: `${siteUrl}/favicon.png`,
    description: "A modern creative studio focused on brand strategy, digital design, and web development.",
    sameAs: [
      "https://www.instagram.com/projgrowth"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@projgrowth.com",
      contactType: "customer service"
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "US"
    }
  };

  // JSON-LD for LocalBusiness / ProfessionalService
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
          itemOffered: {
            "@type": "Service",
            name: "Brand Strategy"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Digital Design"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Development"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Growth Marketing"
          }
        }
      ]
    }
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

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="author" content="ProjGrowth" />
      <meta name="robots" content="index, follow" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
