import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Project {
  title: string;
  category: string;
  description: string;
}

interface FeaturedWorkSliderProps {
  projects: Project[];
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

  return (
    <div className="relative bg-surface border border-line rounded-lg p-8 lg:p-12">
      <div className="mb-8">
        <span className="text-sm text-accent mb-2 block">{currentProject.category}</span>
        <h3 className="font-display text-3xl lg:text-4xl text-text mb-4">
          {currentProject.title}
        </h3>
        <p className="text-lg text-mute max-w-2xl">
          {currentProject.description}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={prev}
            className="p-3 border border-line rounded-md text-mute hover:border-accent hover:text-accent transition-all duration-sm ease-smooth"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="p-3 border border-line rounded-md text-mute hover:border-accent hover:text-accent transition-all duration-sm ease-smooth"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <Link
          to="/work"
          className="px-6 py-3 bg-accent text-base rounded-md font-medium hover:bg-accent/90 transition-all duration-sm ease-smooth"
        >
          View All Work
        </Link>
      </div>

      <div className="flex gap-2 mt-6">
        {projects.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1 rounded-full transition-all duration-sm ease-smooth ${
              idx === currentIndex ? "w-8 bg-accent" : "w-4 bg-line"
            }`}
            aria-label={`Go to project ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedWorkSlider;
