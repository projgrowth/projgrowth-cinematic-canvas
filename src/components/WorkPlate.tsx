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
 * Shared visual plate for a case study.
 * Uses the real project image when one resolves; otherwise falls back to a
 * composed plate built from the client's own logo — never a fabricated mockup.
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
      className={`relative ${aspect} overflow-hidden rounded-lg border border-line bg-surface ${className}`}
    >
      {/* Base field */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.07] via-transparent to-accent/[0.12] transition-opacity duration-md group-hover:opacity-80" />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--text)) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
        aria-hidden="true"
      />

      {imageOk && caseStudy.image ? (
        <img
          src={caseStudy.image}
          alt={`${caseStudy.title} — ${caseStudy.subtitle}`}
          width={1280}
          height={800}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setImageOk(false)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-md ease-smooth group-hover:scale-[1.03]"
        />
      ) : caseStudy.logo ? (
        <div className="absolute inset-0 flex items-center justify-center p-10">
          <img
            src={caseStudy.logo}
            alt={`${caseStudy.title} logo`}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="max-h-[46%] max-w-[62%] object-contain opacity-75 transition-all duration-md ease-smooth group-hover:opacity-100 group-hover:scale-[1.02]"
          />
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-2xl text-text-faint">
            {caseStudy.title
              .split(" ")
              .map((w) => w[0])
              .join("")}
          </span>
        </div>
      )}

      {/* Bottom scrim for legibility over photography */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-base/70 to-transparent" />
    </div>
  );
};

export default WorkPlate;
