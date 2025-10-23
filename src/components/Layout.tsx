import { ReactNode } from "react";
import Navigation from "./Navigation";
import BackToTop from "./BackToTop";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-base">
      <Navigation />
      <main className="pt-20">
        {children}
      </main>
      <BackToTop />
    </div>
  );
};

export default Layout;
