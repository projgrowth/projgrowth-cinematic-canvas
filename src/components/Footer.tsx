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
    <footer className="border-t border-line bg-base mt-24">
      <div className="container-site py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link 
              to="/" 
              className="text-2xl font-display font-medium tracking-tight text-text hover:text-accent transition-colors duration-sm flex items-center gap-2 group"
            >
              <img src={pgLogo} alt="" className="h-6 w-auto logo-accent-hover" />
              ProjGrowth
            </Link>
            <p className="text-sm text-mute leading-relaxed">
              Orlando's boutique digital marketing agency focused on web design, branding, and growth.
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
                href={`mailto:${contactEmail}`}
                className="flex items-center gap-2 text-sm text-mute hover:text-accent transition-colors duration-sm"
              >
                <Mail className="w-4 h-4" />
                {contactEmail}
              </a>
              <div className="flex gap-3 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-2 rounded-md border border-line text-mute hover:text-accent hover:border-accent hover:bg-accent/10 hover:-translate-y-0.5 transition-all duration-200"
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
