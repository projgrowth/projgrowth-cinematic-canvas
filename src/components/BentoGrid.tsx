import { motion, AnimatePresence } from "framer-motion";
import { CaseStudy } from "@/data/caseStudies";
import BentoCaseStudyCard from "./BentoCaseStudyCard";

interface BentoGridProps {
  caseStudies: CaseStudy[];
  onCardClick: (study: CaseStudy) => void;
  isLoading?: boolean;
}

const BentoGrid = ({ caseStudies, onCardClick, isLoading }: BentoGridProps) => {
  // Separate featured and regular projects
  const featuredProjects = caseStudies.filter(cs => cs.featured);
  const regularProjects = caseStudies.filter(cs => !cs.featured);
  
  // Determine grid positions - featured get larger cells
  const getGridClass = (index: number, isFeatured: boolean) => {
    if (isFeatured) {
      // First featured: wide, 1 row
      if (index === 0) return "md:col-span-2 md:row-span-1";
      // Second featured: tall, 2 rows
      if (index === 1) return "md:col-span-1 md:row-span-2";
      // Third featured: wide, 1 row
      return "md:col-span-2 md:row-span-1";
    }
    return "col-span-1 md:row-span-1";
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`animate-pulse bg-surface rounded-lg border border-line ${
              i === 0 ? "md:col-span-2 aspect-[2/1]" : 
              i === 1 ? "md:row-span-2 aspect-[1/1.5]" : 
              "aspect-[4/3]"
            }`}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 md:auto-rows-[260px] lg:auto-rows-[280px]"
      layout
    >
      <AnimatePresence mode="popLayout">
        {/* Featured projects first */}
        {featuredProjects.map((study, idx) => (
          <motion.div
            key={study.id}
            className={getGridClass(idx, true)}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <BentoCaseStudyCard
              caseStudy={study}
              onClick={() => onCardClick(study)}
              size={idx === 0 ? "wide" : idx === 1 ? "tall" : "wide"}
              showMetrics
            />
          </motion.div>
        ))}
        
        {/* Regular projects */}
        {regularProjects.map((study, idx) => (
          <motion.div
            key={study.id}
            className="col-span-1"
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, delay: (featuredProjects.length + idx) * 0.05 }}
          >
            <BentoCaseStudyCard
              caseStudy={study}
              onClick={() => onCardClick(study)}
              size="standard"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default BentoGrid;
