import { Link } from "react-router-dom";
import { Mail, Linkedin, Twitter, Github } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface/50 backdrop-blur-sm mt-24">
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link 
              to="/" 
              className="text-2xl font-display font-medium text-text hover:text-accent transition-colors duration-sm"
            >
              ProjGrowth
            </Link>
            <p className="text-sm text-mute leading-relaxed">
              A modern creative studio focused on digital experiences that drive growth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg text-text mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { path: "/work", label: "Work" },
                { path: "/services", label: "Services" },
                { path: "/about", label: "About" },
                { path: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-mute hover:text-accent transition-colors duration-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-lg text-text mb-4">Services</h3>
            <ul className="space-y-2">
              {[
                "Brand Strategy",
                "Digital Design",
                "Development",
                "Growth Marketing",
              ].map((service) => (
                <li key={service}>
                  <span className="text-sm text-mute">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg text-text mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <a
                href="mailto:hello@projgrowth.com"
                className="flex items-center gap-2 text-sm text-mute hover:text-accent transition-colors duration-sm"
              >
                <Mail className="w-4 h-4" />
                hello@projgrowth.com
              </a>
              <div className="flex gap-3 pt-2">
                {[
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Github, href: "#", label: "GitHub" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 rounded-md border border-line text-mute hover:text-accent hover:border-accent transition-all duration-sm"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-line flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-mute">
            © {currentYear} ProjGrowth. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="text-sm text-mute hover:text-accent transition-colors duration-sm"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-mute hover:text-accent transition-colors duration-sm"
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