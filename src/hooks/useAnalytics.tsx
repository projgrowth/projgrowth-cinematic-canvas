import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void;
  }
}

const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";
const GA_ENABLED = GA_MEASUREMENT_ID !== "G-XXXXXXXXXX";

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (GA_ENABLED && typeof window.gtag === "function") {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }
  }, [location]);
};

export default useAnalytics;
