import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Home, Search, FileQuestion } from "lucide-react";

const NotFound = () => {
  return (
    <Layout>
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="text-center max-w-2xl px-6">
          <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-surface border border-line">
            <FileQuestion className="w-12 h-12 text-accent" />
          </div>
          
          <h1 className="mb-4 font-display text-7xl text-text">404</h1>
          <p className="mb-8 text-2xl text-text">Page Not Found</p>
          <p className="mb-12 text-lg text-mute">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-base rounded-md font-medium transition-all duration-sm hover:bg-accent/90"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
            <Link 
              to="/work"
              className="inline-flex items-center gap-2 px-8 py-4 border border-line text-text rounded-md font-medium transition-all duration-sm hover:border-accent hover:text-accent"
            >
              <Search className="w-5 h-5" />
              View Our Work
            </Link>
          </div>

          <div className="mt-16 pt-8 border-t border-line">
            <p className="text-sm text-mute mb-4">Quick Links</p>
            <div className="flex flex-wrap gap-4 justify-center">
              {[
                { path: "/services", label: "Services" },
                { path: "/about", label: "About" },
                { path: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-mute hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
