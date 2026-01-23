/**
 * Breadcrumbs Component with Schema.org structured data
 */

import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { Helmet } from "react-helmet-async";

interface BreadcrumbItem {
  name: string;
  path: string;
}

const routeLabels: Record<string, string> = {
  "": "Home",
  "services": "Services",
  "web-design": "Web Design",
  "branding": "Branding",
  "content-creation": "Content Creation",
  "digital-marketing": "Digital Marketing",
  "portfolio": "Portfolio",
  "work": "Portfolio",
  "blog": "Blog",
  "about": "About",
  "contact": "Contact",
  "privacy": "Privacy Policy",
  "terms": "Terms of Service",
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  
  // Don't show breadcrumbs on homepage
  if (pathSegments.length === 0) return null;

  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Home", path: "/" }
  ];

  let currentPath = "";
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    breadcrumbs.push({
      name: routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
      path: currentPath,
    });
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://projgrowth.com${item.path === "/" ? "" : item.path}`
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-mute">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            
            return (
              <li key={item.path} className="flex items-center gap-2">
                {index === 0 ? (
                  <Link
                    to={item.path}
                    className="hover:text-accent transition-colors duration-sm flex items-center gap-1"
                    aria-label="Home"
                  >
                    <Home className="w-4 h-4" />
                  </Link>
                ) : isLast ? (
                  <span className="text-text" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className="hover:text-accent transition-colors duration-sm"
                  >
                    {item.name}
                  </Link>
                )}
                
                {!isLast && (
                  <ChevronRight className="w-4 h-4 text-line" aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
