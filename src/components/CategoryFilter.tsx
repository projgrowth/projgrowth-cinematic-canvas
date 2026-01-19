import { motion } from "framer-motion";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        
        return (
          <motion.button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`
              relative px-4 py-2 md:px-6 md:py-3 rounded-md font-medium text-xs md:text-sm transition-all duration-sm ease-smooth border overflow-hidden
              ${
                isActive
                  ? "border-accent text-accent bg-accent/10"
                  : "border-line text-mute hover:border-accent hover:text-accent"
              }
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Glow effect for active state */}
            {isActive && (
              <motion.div
                className="absolute inset-0 bg-accent/5 rounded-md"
                layoutId="activeCategory"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            
            {/* Animated underline */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isActive ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ originX: 0 }}
            />
            
            {/* Subtle glow on active */}
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-md pointer-events-none"
                initial={{ boxShadow: '0 0 0 0 hsl(var(--accent) / 0)' }}
                animate={{ boxShadow: '0 0 20px 0 hsl(var(--accent) / 0.2)' }}
                transition={{ duration: 0.3 }}
              />
            )}
            
            <span className="relative z-10">{category}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
