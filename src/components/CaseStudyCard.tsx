import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { CaseStudy } from "@/data/caseStudies";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  onClick: () => void;
  index: number;
  viewMode?: "grid" | "list";
}

const CaseStudyCard = ({ caseStudy, onClick, index, viewMode = "grid" }: CaseStudyCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Subtle tilt effect - disabled on touch
    setRotateX(-mouseY / 25);
    setRotateY(mouseX / 25);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const formattedIndex = String(index + 1).padStart(2, '0');

  if (viewMode === "list") {
    return (
      <motion.div
        ref={cardRef}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="group cursor-pointer card-interactive flex gap-4 md:gap-6 p-4 md:p-6 rounded-lg border border-line bg-surface/50 hover:border-accent/50 hover:bg-surface relative overflow-hidden"
        whileHover={{ x: isTouchDevice ? 0 : 4 }}
        transition={{ duration: 0.2 }}
      >
        {/* Index number - hidden on mobile */}
        <span className="numeral-display absolute -left-2 top-1/2 -translate-y-1/2 hidden md:block select-none pointer-events-none hidden md:block">
          {formattedIndex}
        </span>

        {/* Logo */}
        <div className="relative w-20 h-20 md:w-28 md:h-28 flex-shrink-0 overflow-hidden rounded-md border border-line bg-surface flex items-center justify-center md:ml-8">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--text)) 1px, transparent 1px)', backgroundSize: '8px 8px' }} />
          {caseStudy.logo ? (
            <img 
              src={caseStudy.logo} 
              alt={`${caseStudy.title} logo`}
              loading="lazy"
              className="h-10 md:h-14 max-w-[85%] object-contain opacity-80 group-hover:opacity-100 transition-all duration-sm"
            />
          ) : (
            <span className="font-display font-medium text-text-faint group-hover:text-text-faint transition-all duration-sm">
              {caseStudy.title.split(' ').map(word => word[0]).join('')}
            </span>
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <span className="text-xs text-mute uppercase tracking-wider mb-1 block">
            {caseStudy.category}
          </span>
          <h3 className="font-display text-text mb-1 md:mb-2 transition-colors duration-sm group-hover:text-accent truncate">
            {caseStudy.title}
          </h3>
          <p className="text-sm text-mute line-clamp-2">
            {caseStudy.subtitle}
          </p>
          
          {/* Progressive disclosure - insight on hover (desktop only) */}
          {!isTouchDevice && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden hidden md:block"
            >
              <p className="text-xs text-accent mt-3 pt-3 border-t border-line/50">
                {caseStudy.howWeHelped[0]}
              </p>
            </motion.div>
          )}
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0 flex items-center">
          <div className="btn-interactive w-10 h-10 rounded-full border border-line flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10">
            <svg className="w-4 h-4 text-mute group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group cursor-pointer relative"
      style={{
        transformStyle: isTouchDevice ? 'flat' : 'preserve-3d',
        perspective: isTouchDevice ? 'none' : '1000px',
      }}
    >
      {/* Large index number behind card - smaller on mobile, hidden on very small screens */}
      <span className="numeral-display absolute -top-2 -left-1 md:-top-4 md:-left-2 z-0 transition-all duration-sm group-hover:-translate-y-1 hidden sm:block">
        {formattedIndex}
      </span>

      <motion.div 
        className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-surface mb-4 transition-all duration-sm ease-smooth z-10"
        style={isTouchDevice ? {} : {
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={isTouchDevice ? {} : {
          borderColor: isHovered ? 'hsl(var(--accent) / 0.5)' : 'hsl(var(--line))',
          boxShadow: isHovered 
            ? '0 25px 50px -12px hsl(var(--accent) / 0.15), 0 0 0 1px hsl(var(--accent) / 0.1)' 
            : '0 0 0 0 transparent',
          y: isHovered ? -4 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated gradient border overlay */}
        <motion.div 
          className="absolute inset-0 rounded-lg pointer-events-none z-20"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--accent) / 0.3) 0%, transparent 50%, hsl(var(--accent) / 0.2) 100%)',
            opacity: 0,
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 group-hover:from-accent/10 group-hover:to-accent/20 transition-all duration-sm" />
        
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-sm" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--text)) 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
        
        {/* Glow effect behind logo */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            background: isHovered 
              ? 'radial-gradient(circle at center, hsl(var(--accent) / 0.1) 0%, transparent 70%)' 
              : 'radial-gradient(circle at center, transparent 0%, transparent 70%)',
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Logo display */}
        <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8">
          {caseStudy.logo ? (
            <motion.img 
              src={caseStudy.logo} 
              alt={`${caseStudy.title} logo`}
              loading="lazy"
              className="h-12 md:h-16 max-w-[85%] object-contain opacity-80 group-hover:opacity-100 transition-all duration-sm"
              animate={{ scale: isHovered && !isTouchDevice ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <span className="font-display font-medium text-text-faint group-hover:text-text-faint transition-all duration-sm">
              {caseStudy.title.split(' ').map(word => word[0]).join('')}
            </span>
          )}
        </div>
        
        {/* Mobile: always visible arrow indicator */}
        <div className="absolute bottom-3 right-3 md:hidden">
          <div className="w-8 h-8 rounded-full bg-surface/80 border border-line flex items-center justify-center">
            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Desktop: hover overlay with morphing text */}
        <motion.div 
          className="absolute inset-0 bg-base/70 hidden md:flex items-center justify-center backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="flex items-center gap-2"
            initial={{ y: 10 }}
            animate={{ y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-text font-medium tracking-wide">View Case Study</span>
            <motion.svg 
              className="w-4 h-4 text-accent"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              animate={{ x: isHovered ? [0, 4, 0] : 0 }}
              transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0, repeatDelay: 0.5 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </motion.svg>
          </motion.div>
        </motion.div>
      </motion.div>
      
      <span className="text-xs text-mute uppercase tracking-wider mb-2 block">
        {caseStudy.category}
      </span>
      
      <h3 className="font-display text-text mb-2 transition-colors duration-sm group-hover:text-accent">
        {caseStudy.title}
      </h3>
      
      <p className="text-sm text-mute">
        {caseStudy.subtitle}
      </p>

      {/* Progressive disclosure - expand on hover (desktop only) */}
      {!isTouchDevice && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden hidden md:block"
        >
          <p className="text-xs text-accent mt-3 pt-3 border-t border-line/50">
            {caseStudy.howWeHelped[0]}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CaseStudyCard;