import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import PageTransition from "@/components/PageTransition";
import PageLoader from "@/components/PageLoader";
import useAnalytics from "@/hooks/useAnalytics";

const Home = lazy(() => import("./pages/Home"));
const Work = lazy(() => import("./pages/Work"));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail"));
const Services = lazy(() => import("./pages/Services"));
const WebDesign = lazy(() => import("./pages/services/WebDesign"));
const Branding = lazy(() => import("./pages/services/Branding"));
const ContentCreation = lazy(() => import("./pages/services/ContentCreation"));
const DigitalMarketing = lazy(() => import("./pages/services/DigitalMarketing"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLeads = lazy(() => import("./pages/AdminLeads"));
const Discovery = lazy(() => import("./pages/Discovery"));
const RGC = lazy(() => import("./pages/RGC"));

const routes: { path: string; element: React.ReactNode; raw?: boolean }[] = [
  { path: "/", element: <Home /> },
  { path: "/work", element: <Work /> },
  { path: "/work/:slug", element: <CaseStudyDetail /> },
  { path: "/portfolio", element: <Navigate to="/work" replace />, raw: true },
  { path: "/services", element: <Services /> },
  { path: "/services/web-design", element: <WebDesign /> },
  { path: "/services/branding", element: <Branding /> },
  { path: "/services/content-creation", element: <ContentCreation /> },
  { path: "/services/digital-marketing", element: <DigitalMarketing /> },
  { path: "/about", element: <About /> },
  { path: "/blog", element: <Blog /> },
  { path: "/blog/:slug", element: <BlogPost /> },
  { path: "/contact", element: <Contact /> },
  { path: "/privacy", element: <Privacy /> },
  { path: "/terms", element: <Terms /> },
  { path: "/admin/leads", element: <AdminLeads /> },
  { path: "/discovery", element: <Discovery />, raw: true },
  { path: "/rgc", element: <RGC />, raw: true },
  { path: "/random-golf-club", element: <Navigate to="/rgc" replace />, raw: true },
  { path: "*", element: <NotFound /> },
];

const AnimatedRoutes = () => {
  const location = useLocation();
  useAnalytics();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader isLoading={true} />}>
        <Routes location={location} key={location.pathname}>
          {routes.map(({ path, element, raw }) => (
            <Route
              key={path}
              path={path}
              element={raw ? element : <PageTransition>{element}</PageTransition>}
            />
          ))}
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
