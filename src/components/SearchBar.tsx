import { Search, X } from "lucide-react";
import { useId } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder = "Search..." }: SearchBarProps) => {
  const inputId = useId();
  
  return (
    <div className="relative">
      <label htmlFor={inputId} className="sr-only">Search case studies</label>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-mute pointer-events-none" aria-hidden="true" />
      <input
        id={inputId}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-11 py-3 md:py-4 bg-surface border border-line rounded-md text-text placeholder:text-mute focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-sm ease-smooth min-h-[48px]"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-mute hover:text-text transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Clear search"
          type="button"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;