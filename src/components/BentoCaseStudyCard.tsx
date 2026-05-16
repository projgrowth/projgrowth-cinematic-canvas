import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Play } from "lucide-react";
import { CaseStudy } from "@/data/caseStudies";
import AnimatedCounter from "./AnimatedCounter";

interface BentoCaseStudyCardProps {
  caseStudy: CaseStudy;
  onClick: () => void;
  size?: "standard" | "wide" | "tall";
  showMetrics?: boolean;
}

const BentoCaseStudyCard = ({ 
  caseStudy, 
  onClick, 
  size = "standard",
  showMetrics = false 
}: BentoCaseStudyCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Handle video playback on hover
  useEffect(() => {
    if (videoRef.current && caseStudy.heroMedia?.type === "video") {
      if (isHovered && !isTouchDevice) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered, isTouchDevice, caseStudy.heroMedia]);

  const aspectClass = {
    standard: "aspect-[4/3] md:aspect-auto md:h-full",
    wide: "aspect-[2/1] md:aspect-auto md:h-full",
    tall: "aspect-[3/4] md:aspect-auto md:h-full"
  }[size];

  const hasMedia = caseStudy.heroMedia?.url;
  const displayMetrics = showMetrics && caseStudy.metrics && caseStudy.metrics.length > 0;

  return (
    <motion.article
      className={`group relative overflow-hidden rounded-lg border border-line bg-surface cursor-pointer h-full w-full ${aspectClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ y: isTouchDevice ? 0 : -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 transition-all duration-md group-hover:from-accent/10 group-hover:to-accent/20" />
      
      {/* Subtle pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-md"
        style={{ 
          backgroundImage: 'radial-gradient(circle, hsl(var(--text)) 1px, transparent 1px)', 
          backgroundSize: '16px 16px' 
        }}
      />

      {/* Hero media (image/video) - revealed on hover */}
      {hasMedia && (
        <motion.div
          className="absolute inset-0 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          {caseStudy.heroMedia?.type === "video" ? (
            <>
              <video
                ref={videoRef}
                src={caseStudy.heroMedia.url}
                poster={caseStudy.heroMedia.poster}
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Video overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-base via-base/50 to-transparent" />
            </>
          ) : (
            <>
              <img
                src={caseStudy.heroMedia?.url}
                alt={caseStudy.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-base via-base/60 to-base/20" />
            </>
          )}
        </motion.div>
      )}

      {/* Default state: Logo centered */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center p-8 z-20"
        animate={{ opacity: isHovered && hasMedia ? 0 : 1, scale: isHovered && hasMedia ? 0.9 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {caseStudy.logo ? (
          <img 
            src={caseStudy.logo} 
            alt={`${caseStudy.title} logo`}
            loading="lazy"
            className="h-12 md:h-16 lg:h-20 max-w-[80%] object-contain opacity-70 group-hover:opacity-90 transition-opacity duration-sm"
          />
        ) : (
          <span className="font-display font-medium text-text-faint group-hover:text-text-faint transition-colors">
            {caseStudy.title.split(' ').map(word => word[0]).join('')}
          </span>
        )}
      </motion.div>

      {/* Content overlay - always visible at bottom */}
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 z-30">
        {/* Category pill */}
        <motion.span 
          className="pill-accent mb-2 md:mb-3"
          animate={{ y: isHovered ? 0 : 4, opacity: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
        >
          {caseStudy.category}
        </motion.span>

        <h3 className="font-display text-text mb-1 group-hover:text-accent transition-colors duration-sm">
          {caseStudy.title}
        </h3>
        
        <p className="text-xs md:text-sm text-mute line-clamp-2 mb-3">
          {caseStudy.subtitle}
        </p>

        {/* Metrics - shown on featured cards */}
        {displayMetrics && (
          <motion.div 
            className="flex gap-4 md:gap-6 pt-3 border-t border-line/50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0.7, y: isHovered ? 0 : 5 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {caseStudy.metrics?.slice(0, size === "standard" ? 2 : 3).map((metric, idx) => (
              <div key={idx} className="flex flex-col">
                <AnimatedCounter 
                  value={metric.value} 
                  className="font-display text-accent font-medium"
                  delay={idx * 0.1}
                />
                <span className="text-[10px] md:text-xs text-mute uppercase tracking-wider">
                  {metric.label}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* View case study link */}
      <Link
        to={`/work/${caseStudy.id}`}
        className="absolute top-4 right-4 z-40"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div 
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface/80 backdrop-blur-sm border border-line flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-mute group-hover:text-accent transition-colors" />
        </motion.div>
      </Link>

      {/* Video indicator */}
      {caseStudy.heroMedia?.type === "video" && !isHovered && (
        <div className="absolute top-4 left-4 z-40">
          <div className="w-8 h-8 rounded-full bg-surface/80 backdrop-blur-sm border border-line flex items-center justify-center">
            <Play className="w-3 h-3 text-mute fill-current" />
          </div>
        </div>
      )}

      {/* Hover border glow */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        animate={{
          boxShadow: isHovered 
            ? '0 0 0 1px hsl(var(--accent) / 0.5), 0 25px 50px -12px hsl(var(--accent) / 0.15)' 
            : '0 0 0 0 transparent'
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.article>
  );
};

export default BentoCaseStudyCard;
