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
      className="group cursor-pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-surface mb-4">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10" />
        
        {/* Logo display */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          {caseStudy.logo ? (
            <img 
              src={caseStudy.logo} 
              alt={`${caseStudy.title} logo`}
              className="max-w-[70%] max-h-[60%] object-contain opacity-70 group-hover:opacity-100 transition-all duration-md group-hover:scale-105 brightness-0 invert"
            />
          ) : (
            <span className="font-display text-3xl font-medium text-mute/40 group-hover:text-mute/60 transition-all duration-md">
              {caseStudy.title.split(' ').map(word => word[0]).join('')}
            </span>
          )}
        </div>
        
        {/* Mobile: always visible arrow indicator, Desktop: hover overlay */}
        <div className="absolute bottom-3 right-3 md:hidden">
          <div className="w-8 h-8 rounded-full bg-surface/80 border border-line flex items-center justify-center">
            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-0 bg-base/60 opacity-0 group-hover:opacity-100 transition-opacity duration-md ease-smooth hidden md:flex items-center justify-center">
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
