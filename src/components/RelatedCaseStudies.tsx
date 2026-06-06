import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";
import SectionChapter from "@/components/SectionChapter";
import ScrollReveal from "@/components/ScrollReveal";

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
              className="group relative block rounded-lg border border-line bg-surface/40 p-6 md:p-7 transition-all duration-sm hover:border-accent/40 hover:bg-surface/70 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <span className="pill-accent text-[10px] tracking-widest uppercase">
                  {cs.category}
                </span>
                <ArrowUpRight className="w-5 h-5 text-mute group-hover:text-accent transition-colors flex-shrink-0" />
              </div>
              {cs.logo && (
                <div className="h-10 mb-5 flex items-center">
                  <img
                    src={cs.logo}
                    alt={`${cs.title} logo`}
                    loading="lazy"
                    className="h-full max-w-[140px] object-contain object-left opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              )}
              <h3 className="font-display text-text mb-2 group-hover:text-accent transition-colors">
                {cs.title}
              </h3>
              <p className="text-sm text-mute line-clamp-2">{cs.subtitle}</p>
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