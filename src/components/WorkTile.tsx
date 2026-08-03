import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import WorkPlate from "@/components/WorkPlate";
import type { CaseStudy } from "@/data/caseStudies";

interface WorkTileProps {
  caseStudy: CaseStudy;
  /** Tailwind aspect-ratio class for the plate. */
  aspect?: string;
  priority?: boolean;
  /** Render the title at heading-2 scale for lead tiles. */
  size?: "default" | "lead";
  className?: string;
}

/**
 * Canonical image-forward case study tile: plate + category eyebrow +
 * title + subtitle + arrow. Shared by Home, Work, service proof blocks,
 * and Contact so plate treatment stays identical site-wide.
 */
const WorkTile = ({
  caseStudy,
  aspect = "aspect-[16/10]",
  priority = false,
  size = "default",
  className = "",
}: WorkTileProps) => (
  <Link to={`/work/${caseStudy.id}`} className={`group block ${className}`}>
    <WorkPlate caseStudy={caseStudy} aspect={aspect} priority={priority} />
    <div className="mt-4 flex items-start justify-between gap-6">
      <div>
        <span className="eyebrow mb-1.5 block">{caseStudy.category}</span>
        {size === "lead" ? (
          <h2 className="font-display text-text transition-colors duration-sm group-hover:text-accent">
            {caseStudy.title}
          </h2>
        ) : (
          <h3 className="font-display text-text transition-colors duration-sm group-hover:text-accent">
            {caseStudy.title}
          </h3>
        )}
        <p className="text-mute text-sm mt-1.5 max-w-md">{caseStudy.subtitle}</p>
      </div>
      <ArrowRight className="w-5 h-5 mt-1 flex-shrink-0 text-mute transition-all duration-sm group-hover:text-accent group-hover:translate-x-1" />
    </div>
  </Link>
);

export default WorkTile;