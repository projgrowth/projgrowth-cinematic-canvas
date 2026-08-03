import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";
import SectionChapter from "@/components/SectionChapter";
import ScrollReveal from "@/components/ScrollReveal";
import WorkPlate from "@/components/WorkPlate";

interface RelatedCaseStudiesProps {
  ids: string[];
  chapterNumber?: number;
  chapterLabel?: string;
  heading?: string;
  eyebrow?: string;
}

/**
 * Inline case study proof block for service pages.
 * Renders 1–3 minimal cards linking out to /work/:id.
 */
const RelatedCaseStudies = ({
  ids,
  chapterNumber = 5,
  chapterLabel = "Proof",
  heading = "Recent Work",
  eyebrow = "Selected projects in this discipline.",
}: RelatedCaseStudiesProps) => {
  const items = ids
    .map((id) => caseStudies.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  if (items.length === 0) return null;

  return (
    <ScrollReveal variant="fade-up">
      <div className="section border-t border-line">
        <SectionChapter number={chapterNumber} label={chapterLabel} />
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-10 md:mb-12">
          <h2 className="font-display text-text">{heading}</h2>
          <p className="text-mute max-w-md">{eyebrow}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-cards">
          {items.map((cs) => (
            <Link
              key={cs.id}
              to={`/work/${cs.id}`}
              className="group relative block"
            >
              <WorkPlate caseStudy={cs} aspect="aspect-[16/9]" />
              <div className="mt-4 flex items-start justify-between gap-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-accent/80 mb-1.5 block">
                    {cs.category}
                  </span>
                  <h3 className="font-display text-text group-hover:text-accent transition-colors">
                    {cs.title}
                  </h3>
                  <p className="text-sm text-mute mt-1.5 line-clamp-2 max-w-md">{cs.subtitle}</p>
                </div>
                <ArrowUpRight className="w-5 h-5 mt-1 text-mute group-hover:text-accent transition-colors flex-shrink-0" />
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm font-medium text-mute hover:text-accent transition-colors"
          >
            See all work
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default RelatedCaseStudies;