import { motion } from "framer-motion";

const FuturisticGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated grid lines - visible on all screens but more subtle on mobile */}
      <div 
        className="absolute inset-0 opacity-[0.02] md:opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--accent)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--accent)) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Horizontal scanline - hidden on mobile for performance */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent hidden md:block"
        initial={{ top: '0%' }}
        animate={{ top: '100%' }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Vertical scanline - hidden on mobile */}
      <motion.div
        className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/15 to-transparent hidden md:block"
        initial={{ left: '0%' }}
        animate={{ left: '100%' }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Corner accents - smaller on mobile */}
      <div className="absolute top-0 left-0 w-16 h-16 md:w-32 md:h-32 border-l border-t border-accent/10" />
      <div className="absolute top-0 right-0 w-16 h-16 md:w-32 md:h-32 border-r border-t border-accent/10" />
      <div className="absolute bottom-0 left-0 w-16 h-16 md:w-32 md:h-32 border-l border-b border-accent/10" />
      <div className="absolute bottom-0 right-0 w-16 h-16 md:w-32 md:h-32 border-r border-b border-accent/10" />
    </div>
  );
};

export default FuturisticGrid;
