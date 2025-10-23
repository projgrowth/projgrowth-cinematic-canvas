import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { path: "/work", label: "Work" },
    { path: "/services", label: "Services" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <footer className="border-t border-line bg-base">
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Tagline */}
          <div>
            <p className="text-lg text-text leading-relaxed">
              Systems, content, and experiences that compound results.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-medium text-mute mb-4">Quick Links</h3>
            <ul className="stack gap-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-text hover:text-accent transition-colors duration-sm ease-smooth"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-sm font-medium text-mute mb-4">Contact</h3>
            <div className="stack gap-3">
              <a
                href="mailto:info@projgrowth.com"
                className="text-text hover:text-accent transition-colors duration-sm ease-smooth"
              >
                info@projgrowth.com
              </a>
              <p className="text-text">Orlando, FL</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-line flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-mute">
            © {new Date().getFullYear()} ProjGrowth. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="text-xs text-mute hover:text-text transition-colors duration-sm ease-smooth"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-xs text-mute hover:text-text transition-colors duration-sm ease-smooth"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
