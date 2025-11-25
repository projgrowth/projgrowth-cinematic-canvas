import { Link, useLocation } from "react-router-dom";
import MobileNav from "./MobileNav";

const Navigation = () => {
  const location = useLocation();

  const links = [
    { path: "/", label: "Home" },
    { path: "/work", label: "Work" },
    { path: "/services", label: "Services" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-line bg-base/80 backdrop-blur-md transition-all duration-sm ease-smooth">
      <div className="container-site">
        <div className="flex items-center justify-between py-6">
          <Link 
            to="/" 
            className="text-2xl font-display font-medium text-text hover:text-accent transition-colors duration-sm ease-smooth"
          >
            ProjGrowth
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  relative text-sm font-medium transition-all duration-sm ease-smooth
                  ${location.pathname === link.path ? 'text-accent' : 'text-mute hover:text-text'}
                  after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-full 
                  after:bg-accent after:scale-x-0 after:transition-transform after:duration-md after:ease-smooth
                  ${location.pathname === link.path ? 'after:scale-x-100' : 'hover:after:scale-x-100'}
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
