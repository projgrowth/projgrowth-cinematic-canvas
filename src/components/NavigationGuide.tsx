import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * NavigationGuide - Grid-based navigation component
 * Guides users to primary destinations with minimal styling
 * 
 * Design: Matches ProjGrowth cinematic dark aesthetic
 * Layout: Left-aligned grid with question on left, links on right
 * Animations: Staggered fade-in with arrow slide on hover
 */

interface NavigationPath {
  label: string;
  path: string;
  intent?: string;
}

interface NavigationGuideData {
  question: string;
  subtext: string;
  primaryPaths: NavigationPath[];
  secondaryPath?: NavigationPath;
}

const NavigationGuide = () => {
  const guide: NavigationGuideData = {
    question: "Not sure where to start?",
    subtext: "We can help you find your path.",
    primaryPaths: [
      { label: "Explore our work", path: "/work", intent: "portfolio" },
      { label: "Learn what we do", path: "/services", intent: "services" },
      { label: "Start a conversation", path: "/contact", intent: "contact" }
    ],
    secondaryPath: { label: "About the team", path: "/about" }
  };

  return (
    <nav className="grid-12 gap-y-8">
      {/* Left Column: Question + Context */}
      <div className="col-span-12 lg:col-span-4 stack gap-4">
        <h3 className="text-base font-medium text-mute">
          {guide.question}
        </h3>
        <p className="text-sm text-mute/70">
          {guide.subtext}
        </p>
        
        {/* Secondary Navigation Path */}
        {guide.secondaryPath && (
          <Link
            to={guide.secondaryPath.path}
            className="group inline-flex items-center gap-2 text-sm text-mute hover:text-text transition-colors duration-sm ease-smooth animate-fade-in"
            style={{ animationDelay: "300ms" }}
            aria-label={`Navigate to ${guide.secondaryPath.label}`}
          >
            {guide.secondaryPath.label}
            <ArrowRight className="w-3 h-3 transition-transform duration-sm ease-smooth group-hover:translate-x-1" />
          </Link>
        )}
      </div>

      {/* Right Column: Primary Navigation Paths */}
      <div className="col-span-12 lg:col-span-8 flex flex-wrap gap-6 lg:gap-8">
        {guide.primaryPaths.map((path, idx) => (
          <Link
            key={path.path}
            to={path.path}
            state={path.intent ? { intent: path.intent } : undefined}
            className="group inline-flex items-center gap-2 text-base font-medium text-text hover:text-accent transition-colors duration-sm ease-smooth animate-fade-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base rounded-sm"
            style={{ animationDelay: `${idx * 100}ms` }}
            aria-label={`Navigate to ${path.label}`}
          >
            {path.label}
            <ArrowRight className="w-4 h-4 transition-transform duration-sm ease-smooth group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavigationGuide;
