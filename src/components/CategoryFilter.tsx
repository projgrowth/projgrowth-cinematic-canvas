interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`
            px-4 py-2 md:px-6 md:py-3 rounded-md font-medium text-xs md:text-sm transition-all duration-sm ease-smooth border
            ${
              activeCategory === category
                ? "border-accent text-accent bg-accent/10"
                : "border-line text-mute hover:border-accent hover:text-accent"
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;