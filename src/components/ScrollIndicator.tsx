import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight * 0.8,
      behavior: "smooth"
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToContent}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 text-mute/50 hover:text-mute transition-colors duration-sm"
      aria-label="Scroll to content"
    >
      <span className="text-xs uppercase tracking-widest">Scroll</span>
      <ChevronDown className="w-5 h-5" />
    </button>
  );
};

export default ScrollIndicator;
