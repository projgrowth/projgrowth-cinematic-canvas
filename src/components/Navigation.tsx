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
    { path: "/work", label: "Work" },
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
          transition-[transform,background-color,border-color,box-shadow] duration-sm ease-smooth
          ${isHidden ? "-translate-y-full" : "translate-y-0"}
          ${isScrolled ? "nav-rail" : "bg-transparent border-b border-transparent"}
        `}
        aria-label="Main navigation"
      >
        <div className="container-site">
          <div
            className={`flex items-center justify-between transition-[padding] duration-sm ease-smooth ${
              isScrolled ? "py-3 md:py-3.5" : "py-4 md:py-6"
            }`}
          >
            <Link 
              to="/" 
              className="text-lg md:text-xl font-display font-medium tracking-tight text-text hover:text-accent transition-colors duration-sm focus-ring rounded-sm flex items-center gap-2.5 group min-h-[44px]"
              aria-label="ProjGrowth - Go to homepage"
            >
              <img src={pgLogo} alt="" className="h-5 md:h-6 w-auto logo-accent-hover" />
              <span className="hidden sm:inline">ProjGrowth</span>
            </Link>
            
            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-8" role="list">
              {links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    data-active={isActive(link.path)}
                    className="nav-link text-sm min-h-[44px] py-2 focus-ring rounded-sm"
                    aria-current={location.pathname === link.path ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              to="/contact"
              className="hidden lg:inline-flex btn-solid text-sm px-5 min-h-[44px] whitespace-nowrap focus-ring"
            >
              Start a project
            </Link>

            {/* Mobile Navigation */}
            <div className="lg:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
