import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 z-50 p-2.5 rounded-full
        border border-line/50 bg-surface/60 backdrop-blur-sm text-mute
        transition-all duration-md ease-smooth min-h-[40px] min-w-[40px]
        ${isVisible ? "opacity-60 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
        hover:opacity-100 hover:border-accent/50 hover:text-accent
      `}
      aria-label="Back to top"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
};

export default BackToTop;
