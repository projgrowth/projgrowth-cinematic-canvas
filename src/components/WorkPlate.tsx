import { useState } from "react";
import type { CaseStudy } from "@/data/caseStudies";

interface WorkPlateProps {
  caseStudy: CaseStudy;
  /** Tailwind aspect ratio class for the plate. */
  aspect?: string;
  priority?: boolean;
  className?: string;
}

/**
 * Full-bleed case plate. Real UI or film crops only — never a logo
 * centered on a dot grid. Missing files stay a quiet field.
 */
const WorkPlate = ({
  caseStudy,
  aspect = "aspect-[16/10]",
  priority = false,
  className = "",
}: WorkPlateProps) => {
  const [imageOk, setImageOk] = useState(Boolean(caseStudy.image));

  return (
    <div
      className={`relative ${aspect} overflow-hidden rounded-[4px] bg-[rgb(12,12,14)] ${className}`}
    >
      {imageOk && caseStudy.image ? (
        <img
          src={caseStudy.image}
          alt={`${caseStudy.title} — ${caseStudy.outcome}`}
          width={1280}
          height={800}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setImageOk(false)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-md ease-smooth group-hover:scale-[1.03]"
        />
      ) : null}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20"
        aria-hidden="true"
      />
    </div>
  );
};

export default WorkPlate;
