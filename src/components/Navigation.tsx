import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import MobileNav from "./MobileNav";

const Navigation = () => {
  const location = useLocation();
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only hide after scrolling down 100px
      if (currentScrollY > 100) {
        // Scrolling down - hide nav
        if (currentScrollY > lastScrollY) {
          setIsHidden(true);
        } 
        // Scrolling up - show nav
        else {
          setIsHidden(false);
        }
      } else {
        // Always show at top
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
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav 
      className={`
        fixed top-0 left-0 right-0 z-50 bg-base border-b border-line/50 
        transition-transform duration-md ease-smooth
        ${isHidden ? "-translate-y-full" : "translate-y-0"}
      `}
    >
      <div className="container-site">
        <div className="flex items-center justify-between py-6">
          <Link 
            to="/" 
            className="text-2xl font-display font-normal text-text hover:text-accent transition-colors duration-sm"
          >
            ProjGrowth
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-10">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  text-sm transition-colors duration-sm
                  ${location.pathname === link.path ? 'text-text' : 'text-mute hover:text-text'}
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base rounded-sm
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
