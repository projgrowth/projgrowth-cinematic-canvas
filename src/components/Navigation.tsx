import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import MobileNav from "./MobileNav";

const Navigation = () => {
  const location = useLocation();
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [servicesOpen, setServicesOpen] = useState(false);

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
    { path: "/work", label: "Portfolio" },
    { 
      path: "/services", 
      label: "Services",
      dropdown: [
        { path: "/services/web-design", label: "Web Design" },
        { path: "/services/branding", label: "Branding" },
        { path: "/services/content-creation", label: "Content Creation" },
        { path: "/services/digital-marketing", label: "Digital Marketing" },
      ]
    },
    { path: "/blog", label: "Blog" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const isServicePage = location.pathname.startsWith("/services");

  return (
    <header>
      <nav 
        className={`
          fixed top-0 left-0 right-0 z-50 bg-base border-b border-line/50 
          transition-transform duration-md ease-smooth
          ${isHidden ? "-translate-y-full" : "translate-y-0"}
        `}
        aria-label="Main navigation"
      >
        <div className="container-site">
          <div className="flex items-center justify-between py-6">
            <Link 
              to="/" 
              className="text-2xl font-display font-normal text-text hover:text-accent transition-colors duration-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base rounded-sm"
              aria-label="ProjGrowth - Go to homepage"
            >
              ProjGrowth
            </Link>
            
            {/* Desktop Navigation */}
            <ul className="hidden md:flex gap-10" role="list">
              {links.map((link) => (
                <li key={link.path} className="relative">
                  {link.dropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <Link
                        to={link.path}
                        className={`
                          text-sm transition-colors duration-sm flex items-center gap-1
                          ${isServicePage ? 'text-text' : 'text-mute hover:text-text'}
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base rounded-sm
                        `}
                        aria-current={location.pathname === link.path ? "page" : undefined}
                        aria-haspopup="true"
                        aria-expanded={servicesOpen}
                      >
                        {link.label}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-sm ${servicesOpen ? 'rotate-180' : ''}`} />
                      </Link>
                      
                      {/* Dropdown */}
                      <div 
                        className={`
                          absolute top-full left-0 mt-2 w-48 bg-surface border border-line rounded-lg shadow-elegant overflow-hidden
                          transition-all duration-sm origin-top
                          ${servicesOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}
                        `}
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className={`
                              block px-4 py-3 text-sm transition-colors duration-sm
                              ${location.pathname === item.path ? 'text-accent bg-accent/10' : 'text-mute hover:text-text hover:bg-line/30'}
                            `}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={`
                        text-sm transition-colors duration-sm
                        ${location.pathname === link.path ? 'text-text' : 'text-mute hover:text-text'}
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base rounded-sm
                      `}
                      aria-current={location.pathname === link.path ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  )}
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
