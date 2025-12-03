import { CaseStudy } from "@/data/caseStudies";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  onClick: () => void;
  index: number;
}

const CaseStudyCard = ({ caseStudy, onClick, index }: CaseStudyCardProps) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer animate-fade-in"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-surface mb-4">
        <img
          src={caseStudy.image}
          alt={caseStudy.title}
          className="w-full h-full object-cover transition-transform duration-md ease-smooth group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-base/60 opacity-0 group-hover:opacity-100 transition-opacity duration-md ease-smooth flex items-center justify-center">
          <span className="text-text font-medium tracking-wide">View Case Study</span>
        </div>
      </div>
      
      <span className="text-xs text-mute uppercase tracking-wider mb-2 block">
        {caseStudy.category}
      </span>
      
      <h3 className="font-display text-2xl text-text mb-2 transition-colors duration-sm group-hover:text-accent">
        {caseStudy.title}
      </h3>
      
      <p className="text-sm text-mute leading-relaxed">
        {caseStudy.subtitle}
      </p>
    </div>
  );
};

export default CaseStudyCard;
