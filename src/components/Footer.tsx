/**
 * Footer Component
 */

import { Link } from "react-router-dom";
import { Mail, Instagram, Linkedin, Twitter } from "lucide-react";
import pgLogo from "@/assets/logos/pg-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/projgrowth", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/projgrowth", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/projgrowth", label: "Twitter" },
  ];

  const contactEmail = "info@projgrowth.com";

  return (
    <footer className="border-t border-line bg-base">
      <div className="container-site py-section">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-cards mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link 
              to="/" 
              className="text-2xl font-display font-medium tracking-tight text-text hover:text-accent transition-colors duration-sm flex items-center gap-2 group"
            >
              <img src={pgLogo} alt="" className="h-6 w-auto logo-accent-hover" />
              ProjGrowth
            </Link>
            <p className="text-sm text-mute">
              Boutique digital studio — based in Orlando, FL. Serving ambitious brands across the US.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-xs uppercase tracking-[0.18em] text-text mb-5">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { path: "/work", label: "Work" },
                { path: "/services", label: "Services" },
                { path: "/about", label: "About" },
                { path: "/blog", label: "Blog" },
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

          {/* Services — now linked */}
          <div>
            <h3 className="font-display text-xs uppercase tracking-[0.18em] text-text mb-5">Services</h3>
            <ul className="space-y-2">
              {[
                { path: "/services/branding", label: "Brand Strategy" },
                { path: "/services/web-design", label: "Web Design" },
                { path: "/services/content-creation", label: "Content Creation" },
                { path: "/services/digital-marketing", label: "Digital Marketing" },
              ].map((service) => (
                <li key={service.path}>
                  <Link
                    to={service.path}
                    className="text-sm text-mute hover:text-accent transition-colors duration-sm"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-xs uppercase tracking-[0.18em] text-text mb-5">Get in Touch</h3>
            <div className="space-y-4">
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center gap-2 text-sm text-text hover:text-accent transition-colors duration-sm"
              >
                <Mail className="w-4 h-4 text-accent" />
                {contactEmail}
              </a>
              <p className="text-sm text-mute">
                Tell us where you are and where you want to go.
              </p>
              <div className="flex gap-3 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-md border border-line bg-surface text-mute hover:text-accent hover:border-accent hover:bg-accent/10 transition-colors duration-sm"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 md:pt-8 border-t border-line flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
          <p className="text-xs md:text-sm text-mute text-center md:text-left">
            © {currentYear} ProjGrowth. All rights reserved.
          </p>
          <div className="flex gap-4 md:gap-6">
            <Link
              to="/privacy"
              className="text-xs md:text-sm text-mute hover:text-accent transition-colors duration-sm"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-xs md:text-sm text-mute hover:text-accent transition-colors duration-sm"
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
