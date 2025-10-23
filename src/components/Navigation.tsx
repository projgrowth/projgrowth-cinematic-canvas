import { Link, useLocation } from "react-router-dom";

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
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-line bg-base/80 backdrop-blur-md">
      <div className="container-site">
        <div className="flex items-center justify-between py-6">
          <Link 
            to="/" 
            className="text-2xl font-display font-medium text-text hover:text-accent transition-colors duration-sm ease-smooth"
          >
            ProjGrowth
          </Link>
          
          <div className="flex gap-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  relative text-sm font-medium transition-colors duration-sm ease-smooth
                  ${location.pathname === link.path ? 'text-accent' : 'text-mute hover:text-text'}
                  after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-full 
                  after:bg-accent after:scale-x-0 after:transition-transform after:duration-md after:ease-smooth
                  ${location.pathname === link.path ? 'after:scale-x-100' : 'hover:after:scale-x-100'}
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
