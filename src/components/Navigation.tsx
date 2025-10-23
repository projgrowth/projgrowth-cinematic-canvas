import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { path: "/work", label: "Work" },
    { path: "/services", label: "Services" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-line bg-base/80 backdrop-blur-md">
        <div className="container-site">
          <div className="flex items-center justify-between h-20">
            {/* Left: Wordmark */}
            <Link 
              to="/" 
              className="text-xl font-display font-medium text-text hover:text-accent transition-colors duration-sm ease-smooth"
            >
              ProjGrowth
            </Link>
            
            {/* Center: Nav Items (Desktop) */}
            <div className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    text-sm font-medium transition-colors duration-sm ease-smooth
                    ${location.pathname === link.path ? 'text-accent' : 'text-mute hover:text-text'}
                  `}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right: CTA (Desktop) */}
            <div className="hidden md:block">
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-2.5 bg-accent text-base rounded-md text-sm font-medium transition-all duration-sm ease-smooth hover:bg-accent/90"
              >
                Start a Strategy
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-text hover:text-accent transition-colors duration-sm ease-smooth"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-base/95 backdrop-blur-lg md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-6">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  text-3xl font-display transition-colors duration-sm ease-smooth
                  ${location.pathname === link.path ? 'text-accent' : 'text-text hover:text-accent'}
                `}
              >
                {link.label}
              </Link>
            ))}
            
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 inline-flex items-center px-8 py-4 bg-accent text-base rounded-md text-lg font-medium transition-all duration-sm ease-smooth hover:bg-accent/90"
            >
              Start a Strategy
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
