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
    <div className="mt-5 flex items-start justify-between gap-6">
      <div className="min-w-0">
        <span className="eyebrow mb-1.5 block">{caseStudy.category}</span>
        {size === "lead" ? (
          <h2 className="font-display text-[rgb(241,240,238)]">
            {caseStudy.title}
          </h2>
        ) : (
          <h3 className="font-display text-[rgb(241,240,238)]">
            {caseStudy.title}
          </h3>
        )}
        <p className="mt-1.5 max-w-md text-sm text-[rgba(241,240,238,0.72)]">
          {caseStudy.outcome}
        </p>
      </div>
      <ArrowRight className="mt-1 h-5 w-5 flex-shrink-0 text-[rgba(241,240,238,0.45)] transition-transform duration-sm group-hover:translate-x-1 group-hover:text-[rgb(241,240,238)]" />
    </div>
  </Link>
);

export default WorkTile;