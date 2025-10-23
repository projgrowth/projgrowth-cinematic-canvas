import { ReactNode } from "react";
import Navigation from "./Navigation";
import BackToTop from "./BackToTop";
import ScrollProgress from "./ScrollProgress";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-base">
      <ScrollProgress />
      <Navigation />
      <main className="pt-20">
        {children}
      </main>
      <BackToTop />
    </div>
  );
};

export default Layout;
