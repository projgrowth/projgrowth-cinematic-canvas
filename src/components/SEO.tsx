import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  ogImage?: string;
  twitterImage?: string;
  canonicalUrl?: string;
  type?: "website" | "article";
  /** If true, uses the dynamic OG image endpoint instead of a static image */
  dynamicOg?: boolean;
  /** Additional params for dynamic OG (author, date, price, ogType) */
  ogParams?: {
    ogType?: "default" | "article" | "product";
    author?: string;
    date?: string;
    price?: string;
    image?: string;
  };
  noindex?: boolean;
}

const SITE_URL = "https://projgrowth.com";
const OG_ENDPOINT = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/og`;

/**
 * Builds a dynamic OG image URL from the edge function.
 */
function buildOgUrl(
  title: string,
  description?: string,
  params?: SEOProps["ogParams"]
): string {
  const url = new URL(OG_ENDPOINT);
  url.searchParams.set("title", title);
  if (description) url.searchParams.set("description", description);
  if (params?.ogType) url.searchParams.set("type", params.ogType);
  if (params?.author) url.searchParams.set("author", params.author);
  if (params?.date) url.searchParams.set("date", params.date);
  if (params?.price) url.searchParams.set("price", params.price);
  if (params?.image) url.searchParams.set("image", params.image);
  return url.toString();
}

const SEO = ({
  title = "ProjGrowth - Digital Experiences That Grow Businesses",
  description = "Modern creative studio specializing in brand strategy, digital design, and web development. We create meaningful digital experiences that drive business growth.",
  ogImage,
  twitterImage,
  canonicalUrl,
  type = "website",
  dynamicOg = false,
  ogParams,
  noindex = false,
}: SEOProps) => {
  const location = useLocation();
  const fullUrl = canonicalUrl ? `${SITE_URL}${canonicalUrl}` : `${SITE_URL}${location.pathname}`;

  // Determine the OG image URL
  let resolvedOgImage: string;
  if (ogImage) {
    // Explicit image provided — use it directly
    resolvedOgImage = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;
  } else if (dynamicOg && OG_ENDPOINT) {
    // Generate a dynamic OG image from the edge function
    resolvedOgImage = buildOgUrl(title, description, ogParams);
  } else {
    // Fallback to static default
    resolvedOgImage = `${SITE_URL}/og-image.jpg`;
  }

  const resolvedTwitterImage = twitterImage
    ? (twitterImage.startsWith("http") ? twitterImage : `${SITE_URL}${twitterImage}`)
    : resolvedOgImage;

  const robotsContent = noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  // Breadcrumb schema (skip on home)
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL
      },
      ...pathSegments.map((segment, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: segment.charAt(0).toUpperCase() + segment.slice(1),
        item: `${SITE_URL}/${pathSegments.slice(0, index + 1).join('/')}`
      }))
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Robots */}
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={noindex ? "noindex, nofollow" : "index, follow"} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="ProjGrowth" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedTwitterImage} />
      <meta name="twitter:site" content="@projgrowth" />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="author" content="ProjGrowth" />
      
      {pathSegments.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
