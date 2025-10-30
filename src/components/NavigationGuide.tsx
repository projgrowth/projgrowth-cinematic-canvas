import { Link } from "react-router-dom";

/**
 * NavigationGuide - Minimal, intent-based navigation component
 * Guides users to primary destinations with clear hierarchy
 * 
 * Design: Matches ProjGrowth cinematic dark aesthetic
 * Layout: Centered vertical with horizontal button group
 * Animations: Staggered scale-in with fade
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
    <div className="flex flex-col items-center text-center">
      <h3 className="text-xl text-mute mb-8">
        {guide.question}
      </h3>
      
      {/* Primary Navigation Paths */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {guide.primaryPaths.map((path, idx) => (
          <Link
            key={path.path}
            to={path.path}
            state={path.intent ? { intent: path.intent } : undefined}
            className="group px-8 py-3 bg-surface border border-line rounded-full text-base font-medium text-text hover:border-accent/50 transition-all duration-sm ease-smooth hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base animate-scale-in"
            style={{ animationDelay: `${idx * 100}ms` }}
            aria-label={`Navigate to ${path.label}`}
          >
            {path.label}
          </Link>
        ))}
      </div>

      {/* Secondary Navigation Path */}
      {guide.secondaryPath && (
        <Link
          to={guide.secondaryPath.path}
          className="text-sm text-mute hover:text-text transition-colors duration-sm ease-smooth underline underline-offset-4 hover:no-underline animate-fade-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base rounded-sm"
          style={{ animationDelay: "300ms" }}
          aria-label={`Navigate to ${guide.secondaryPath.label}`}
        >
          {guide.secondaryPath.label}
        </Link>
      )}
    </div>
  );
};

export default NavigationGuide;
