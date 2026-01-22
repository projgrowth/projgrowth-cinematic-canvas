/**
 * Portfolio Page - Redirects to /work for SEO purposes
 * This ensures both /portfolio and /work URLs work
 */

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Portfolio = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    // Preserve any query params when redirecting
    const queryString = searchParams.toString();
    const destination = queryString ? `/work?${queryString}` : "/work";
    navigate(destination, { replace: true });
  }, [navigate, searchParams]);

  return null;
};

export default Portfolio;
