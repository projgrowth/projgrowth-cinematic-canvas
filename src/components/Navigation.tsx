import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import MobileNav from "./MobileNav";
import pgLogo from "@/assets/logos/pg-logo.png";

const Navigation = () => {
  const location = useLocation();
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Track if scrolled past threshold for background shift
      setIsScrolled(currentScrollY > 20);
      
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }
      } else {
        setIsHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const links = [
    { path: "/", label: "Home" },
    { path: "/work", label: "Portfolio" },
    { path: "/services", label: "Services" },
    { path: "/blog", label: "Blog" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => 
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <header>
      <nav 
        className={`
          fixed top-0 left-0 right-0 z-50 
          transition-all duration-sm ease-smooth
          ${isHidden ? "-translate-y-full" : "translate-y-0"}
          ${isScrolled 
            ? "bg-base/95 backdrop-blur-md border-b border-line/50 shadow-[0_1px_3px_rgba(0,0,0,0.3)]" 
            : "bg-transparent border-b border-transparent"
          }
        `}
        aria-label="Main navigation"
      >
        <div className="container-site">
          <div className="flex items-center justify-between py-4 md:py-6">
            <Link 
              to="/" 
              className="text-xl md:text-2xl font-display font-medium tracking-tight text-text hover:text-accent transition-colors duration-sm focus-ring rounded-sm flex items-center gap-2 group min-h-[44px]"
              aria-label="ProjGrowth - Go to homepage"
            >
              <img src={pgLogo} alt="" className="h-5 md:h-7 w-auto logo-accent-hover" />
              <span className="hidden xs:inline">ProjGrowth</span>
            </Link>
            
            {/* Desktop Navigation */}
            <ul className="hidden md:flex gap-10" role="list">
              {links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`
                      text-sm md:text-base transition-colors duration-sm relative min-h-[44px] flex items-center px-2 focus-ring rounded-sm
                      ${isActive(link.path) ? 'text-text after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-accent after:rounded-full' : 'text-text/75 hover:text-text'}
                    `}
                    aria-current={location.pathname === link.path ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
