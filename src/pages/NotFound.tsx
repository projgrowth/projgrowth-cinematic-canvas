import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 font-display text-7xl text-text">404</h1>
          <p className="mb-8 text-xl text-mute">Oops! Page not found</p>
          <Link to="/" className="text-accent underline hover:text-accent/80 transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
