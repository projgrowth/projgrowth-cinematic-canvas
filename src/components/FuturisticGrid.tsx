import { motion } from "framer-motion";

const FuturisticGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated grid lines */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--accent)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--accent)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Horizontal scanline */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"
        initial={{ top: '0%' }}
        animate={{ top: '100%' }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Vertical scanline */}
      <motion.div
        className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/15 to-transparent"
        initial={{ left: '0%' }}
        animate={{ left: '100%' }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-accent/10" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r border-t border-accent/10" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l border-b border-accent/10" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-accent/10" />
    </div>
  );
};

export default FuturisticGrid;
