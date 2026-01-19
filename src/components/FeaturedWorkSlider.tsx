import { useState } from "react";
import { ChevronLeft, ChevronRight, FileText, Globe, Sparkles, Film, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import type { CaseStudy } from "@/data/caseStudies";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Content Systems": FileText,
  "Web & Product": Globe,
  "Brand & Messaging": Sparkles,
  "Cinematic Production": Film,
  "AI & Tools": Cpu,
};

const categoryGradients: Record<string, string> = {
  "Content Systems": "from-accent/10 to-accent/5",
  "Web & Product": "from-blue-500/10 to-blue-500/5",
  "Brand & Messaging": "from-purple-500/10 to-purple-500/5",
  "Cinematic Production": "from-amber-500/10 to-amber-500/5",
  "AI & Tools": "from-emerald-500/10 to-emerald-500/5",
};

interface FeaturedWorkSliderProps {
  projects: CaseStudy[];
}

const FeaturedWorkSlider = ({ projects }: FeaturedWorkSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const currentProject = projects[currentIndex];
  const IconComponent = categoryIcons[currentProject.category] || FileText;
  const gradientClass = categoryGradients[currentProject.category] || "from-accent/10 to-accent/5";

  return (
    <div className="relative">
      {/* Main Card */}
      <div className={`bg-gradient-to-br ${gradientClass} border border-line rounded-lg p-6 md:p-8 lg:p-12 transition-all duration-md`}>
        {/* Icon */}
        <div className="mb-6">
          <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-accent/60" />
        </div>

        {/* Content */}
        <div className="mb-8 md:mb-10">
          <span className="text-sm text-accent mb-2 block">{currentProject.category}</span>
          <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-text mb-3 md:mb-4">
            {currentProject.title}
          </h3>
          <p className="text-base md:text-lg text-mute max-w-2xl">
            {currentProject.subtitle}
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="p-3 border border-line rounded-md text-mute hover:border-accent hover:text-accent transition-all duration-sm min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="p-3 border border-line rounded-md text-mute hover:border-accent hover:text-accent transition-all duration-sm min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <Link
            to="/work"
            className="px-6 py-3 border border-accent text-accent rounded-md font-medium hover:bg-accent hover:text-base transition-all duration-sm min-h-[44px] flex items-center justify-center w-full sm:w-auto"
          >
            View All Work
          </Link>
        </div>

        {/* Dots */}
        <div className="flex gap-3 mt-6" role="tablist" aria-label="Featured projects">
          {projects.map((project, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-sm ${
                idx === currentIndex ? "w-10 bg-accent" : "w-5 bg-line hover:bg-muted-foreground"
              }`}
              role="tab"
              aria-selected={idx === currentIndex}
              aria-label={`View ${project.title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedWorkSlider;
