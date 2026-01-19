import { CaseStudy } from "@/data/caseStudies";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  onClick: () => void;
  index: number;
  viewMode?: "grid" | "list";
}

const CaseStudyCard = ({ caseStudy, onClick, index, viewMode = "grid" }: CaseStudyCardProps) => {
  if (viewMode === "list") {
    return (
      <div
        onClick={onClick}
        className="group cursor-pointer flex gap-6 p-6 rounded-lg border border-line bg-surface/50 hover:border-accent/50 hover:bg-surface transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
      >
        {/* Logo */}
        <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-md border border-line bg-surface flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--text)) 1px, transparent 1px)', backgroundSize: '8px 8px' }} />
          {caseStudy.logo ? (
            <img 
              src={caseStudy.logo} 
              alt={`${caseStudy.title} logo`}
              className="h-10 max-w-[80%] object-contain opacity-80 group-hover:opacity-100 transition-all duration-300"
            />
          ) : (
            <span className="font-display text-xl font-medium text-mute/40 group-hover:text-mute/60 transition-all duration-300">
              {caseStudy.title.split(' ').map(word => word[0]).join('')}
            </span>
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <span className="text-xs text-mute uppercase tracking-wider mb-1 block">
            {caseStudy.category}
          </span>
          <h3 className="font-display text-xl text-text mb-2 transition-colors duration-200 group-hover:text-accent truncate">
            {caseStudy.title}
          </h3>
          <p className="text-sm text-mute leading-relaxed line-clamp-2">
            {caseStudy.subtitle}
          </p>
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0 flex items-center">
          <div className="w-10 h-10 rounded-full border border-line flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-200">
            <svg className="w-4 h-4 text-mute group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-surface mb-4 transition-all duration-300 ease-out hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 group-hover:from-accent/10 group-hover:to-accent/20 transition-all duration-300" />
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-300" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--text)) 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
        
        {/* Logo display */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          {caseStudy.logo ? (
            <img 
              src={caseStudy.logo} 
              alt={`${caseStudy.title} logo`}
              className="h-12 max-w-[80%] object-contain opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
            />
          ) : (
            <span className="font-display text-3xl font-medium text-mute/40 group-hover:text-mute/60 transition-all duration-300">
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
        <div className="absolute inset-0 bg-base/70 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out hidden md:flex items-center justify-center backdrop-blur-sm">
          <span className="text-text font-medium tracking-wide transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">View Case Study</span>
        </div>
      </div>
      
      <span className="text-xs text-mute uppercase tracking-wider mb-2 block">
        {caseStudy.category}
      </span>
      
      <h3 className="font-display text-2xl text-text mb-2 transition-colors duration-200 group-hover:text-accent">
        {caseStudy.title}
      </h3>
      
      <p className="text-sm text-mute leading-relaxed">
        {caseStudy.subtitle}
      </p>
    </div>
  );
};

export default CaseStudyCard;
