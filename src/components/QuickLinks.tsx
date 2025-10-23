import { Link } from "react-router-dom";
import { Sparkles, Rocket, Users, Zap } from "lucide-react";

const QuickLinks = () => {
  const links = [
    {
      icon: Sparkles,
      title: "Need a new brand identity?",
      description: "Explore our branding services",
      path: "/services",
      color: "accent"
    },
    {
      icon: Rocket,
      title: "Launching a product?",
      description: "See our product design work",
      path: "/work",
      color: "accent-alt"
    },
    {
      icon: Users,
      title: "Want to learn about us?",
      description: "Meet the team",
      path: "/about",
      color: "accent"
    },
    {
      icon: Zap,
      title: "Ready to start?",
      description: "Get in touch today",
      path: "/contact",
      color: "accent-alt"
    }
  ];

  return (
    <div>
      <h3 className="font-display text-2xl text-text mb-6 text-center">
        Not sure where to start?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.map((link, idx) => {
          const Icon = link.icon;
          return (
            <Link
              key={idx}
              to={link.path}
              className="group p-6 bg-surface border border-line rounded-lg hover:border-accent/50 transition-all duration-sm ease-smooth hover:shadow-elegant"
            >
              <Icon className="w-8 h-8 text-accent mb-3" />
              <h4 className="font-medium text-text mb-1 group-hover:text-accent transition-colors duration-sm ease-smooth">
                {link.title}
              </h4>
              <p className="text-sm text-mute">{link.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickLinks;
