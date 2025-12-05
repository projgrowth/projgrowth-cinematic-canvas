import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * NavigationGuide - Minimal, intent-based navigation component
 * Guides users to primary destinations with clear hierarchy
 * 
 * Design: Matches ProjGrowth cinematic dark aesthetic
 * Layout: Inline section style with horizontal buttons
 * Animations: Subtle hover effects with arrow animations
 */

interface NavigationPath {
  label: string;
  path: string;
  intent?: string;
}

interface NavigationGuideData {
  question: string;
  primaryPaths: NavigationPath[];
  secondaryPath?: NavigationPath;
}

const NavigationGuide = () => {
  const guide: NavigationGuideData = {
    question: "What brings you here today?",
    primaryPaths: [
      { label: "Explore our work", path: "/work", intent: "portfolio" },
      { label: "Learn what we do", path: "/services", intent: "services" },
      { label: "Start a conversation", path: "/contact", intent: "contact" }
    ],
    secondaryPath: { label: "Meet the team", path: "/about" }
  };

  return (
    <section className="border-t border-line py-16 md:py-20">
      <div className="container-site">
        <h3 className="text-xl text-mute mb-8">
          {guide.question}
        </h3>
        
        {/* Primary Navigation Paths */}
        <div className="flex flex-wrap gap-6 mb-4">
        {guide.primaryPaths.map((path) => (
          <Link
            key={path.path}
            to={path.path}
            state={path.intent ? { intent: path.intent } : undefined}
            className="group inline-flex items-center gap-2 text-base font-medium text-text hover:text-accent transition-colors duration-sm ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base rounded-sm"
            aria-label={`Navigate to ${path.label}`}
          >
            {path.label}
            <ArrowRight 
              className="w-4 h-4 transition-transform duration-sm ease-smooth group-hover:translate-x-1" 
              aria-hidden="true"
            />
          </Link>
        ))}
        </div>

        {/* Secondary Navigation Path */}
        {guide.secondaryPath && (
          <Link
            to={guide.secondaryPath.path}
            className="inline-block text-sm text-mute hover:text-text transition-colors duration-sm ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base rounded-sm"
            aria-label={`Navigate to ${guide.secondaryPath.label}`}
          >
            {guide.secondaryPath.label}
          </Link>
        )}
      </div>
    </section>
  );
};

export default NavigationGuide;
