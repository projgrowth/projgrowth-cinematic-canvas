import { Link, useLocation } from "react-router-dom";
import { Menu, ChevronDown, ArrowUpRight } from "lucide-react";
import pgLogo from "@/assets/logos/pg-logo.png";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

const serviceLinks = [
  { path: "/services/web-design", label: "Web Design" },
  { path: "/services/branding", label: "Branding" },
  { path: "/services/content-creation", label: "Content Creation" },
  { path: "/services/digital-marketing", label: "Digital Marketing" },
];

const mainLinks = [
  { path: "/", label: "Home" },
  { path: "/work", label: "Work" },
  { path: "/services", label: "Services", group: true },
  { path: "/blog", label: "Blog" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

const MobileNav = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-text hover:text-accent transition-colors duration-sm focus-ring rounded-sm"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[380px] bg-base border-line flex flex-col"
      >
        <SheetHeader>
          <SheetTitle className="text-left font-display text-lg font-medium tracking-tight text-text flex items-center gap-2.5">
            <img src={pgLogo} alt="" className="h-6 w-auto brightness-0 invert" />
            ProjGrowth
          </SheetTitle>
        </SheetHeader>

        <nav
          className="flex flex-col mt-8 flex-1 overflow-y-auto"
          aria-label="Mobile navigation"
        >
          {mainLinks.map((link, i) => (
            <div key={link.path} className="border-b border-line/60">
              {link.group ? (
                <>
                  <button
                    onClick={() => setServicesExpanded((v) => !v)}
                    aria-expanded={servicesExpanded}
                    className="w-full text-left py-4 min-h-[56px] flex items-baseline gap-4 group"
                  >
                    <span className="eyebrow-faint w-6 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display text-2xl tracking-tight transition-colors duration-sm ${
                        isActive(link.path) ? "text-accent" : "text-text"
                      }`}
                    >
                      {link.label}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 ml-auto self-center text-mute transition-transform duration-sm ${
                        servicesExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-md ease-smooth ${
                      servicesExpanded ? "max-h-64 pb-4" : "max-h-0"
                    }`}
                  >
                    <div className="ml-10 pl-4 flex flex-col gap-3 border-l border-line">
                      {serviceLinks.map((s) => (
                        <Link
                          key={s.path}
                          to={s.path}
                          onClick={close}
                          className={`text-base min-h-[44px] flex items-center transition-colors duration-sm ${
                            location.pathname === s.path
                              ? "text-accent"
                              : "text-mute hover:text-text"
                          }`}
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  to={link.path}
                  onClick={close}
                  aria-current={isActive(link.path) ? "page" : undefined}
                  className="py-4 min-h-[56px] flex items-baseline gap-4"
                >
                  <span className="eyebrow-faint w-6 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-display text-2xl tracking-tight transition-colors duration-sm ${
                      isActive(link.path) ? "text-accent" : "text-text"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="pt-6 pb-2 shrink-0 border-t border-line/60">
          <p className="eyebrow-mute mb-3">Get in touch</p>
          <a
            href="mailto:info@projgrowth.com"
            className="link-underline text-sm block mb-5"
          >
            info@projgrowth.com
          </a>
          <Link
            to="/contact"
            onClick={close}
            className="btn-solid w-full rounded-full text-sm"
          >
            Start a project
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
