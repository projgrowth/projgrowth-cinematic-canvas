import { Link, useLocation } from "react-router-dom";
import { Menu, ChevronDown } from "lucide-react";
import pgLogo from "@/assets/logos/pg-logo.png";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

const MobileNav = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);

  const serviceLinks = [
    { path: "/services/web-design", label: "Web Design" },
    { path: "/services/branding", label: "Branding" },
    { path: "/services/content-creation", label: "Content Creation" },
    { path: "/services/digital-marketing", label: "Digital Marketing" },
  ];

  const mainLinks = [
    { path: "/", label: "Home" },
    { path: "/work", label: "Portfolio" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="p-2 text-text hover:text-accent transition-colors duration-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base rounded-sm"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-surface border-line">
        <SheetHeader>
          <SheetTitle className="text-left font-display text-2xl text-text flex items-center gap-2">
            <img src={pgLogo} alt="" className="h-6 w-auto" />
            ProjGrowth
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-8">
          {/* Home */}
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className={`
              text-lg font-medium transition-colors duration-sm
              ${location.pathname === "/" ? 'text-accent' : 'text-text hover:text-accent'}
            `}
          >
            Home
          </Link>

          {/* Portfolio */}
          <Link
            to="/work"
            onClick={() => setOpen(false)}
            className={`
              text-lg font-medium transition-colors duration-sm
              ${location.pathname === "/work" ? 'text-accent' : 'text-text hover:text-accent'}
            `}
          >
            Portfolio
          </Link>

          {/* Services with expandable submenu */}
          <div>
            <button
              onClick={() => setServicesExpanded(!servicesExpanded)}
              className={`
                w-full text-left text-lg font-medium transition-colors duration-sm flex items-center justify-between
                ${location.pathname.startsWith("/services") ? 'text-accent' : 'text-text hover:text-accent'}
              `}
            >
              Services
              <ChevronDown className={`w-5 h-5 transition-transform duration-sm ${servicesExpanded ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`
              overflow-hidden transition-all duration-sm
              ${servicesExpanded ? 'max-h-48 mt-2' : 'max-h-0'}
            `}>
              <div className="pl-4 flex flex-col gap-2 border-l border-line">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={`
                      text-base transition-colors duration-sm
                      ${location.pathname === link.path ? 'text-accent' : 'text-mute hover:text-accent'}
                    `}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Blog */}
          <Link
            to="/blog"
            onClick={() => setOpen(false)}
            className={`
              text-lg font-medium transition-colors duration-sm
              ${location.pathname.startsWith("/blog") ? 'text-accent' : 'text-text hover:text-accent'}
            `}
          >
            Blog
          </Link>

          {/* About */}
          <Link
            to="/about"
            onClick={() => setOpen(false)}
            className={`
              text-lg font-medium transition-colors duration-sm
              ${location.pathname === "/about" ? 'text-accent' : 'text-text hover:text-accent'}
            `}
          >
            About
          </Link>

          {/* Contact */}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className={`
              text-lg font-medium transition-colors duration-sm
              ${location.pathname === "/contact" ? 'text-accent' : 'text-text hover:text-accent'}
            `}
          >
            Contact
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
