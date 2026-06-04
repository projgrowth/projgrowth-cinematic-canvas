import { useEffect } from "react";
import "./rgc.css";

import { Hero } from "@/components/pitch/sections/Hero";
import { GapSection } from "@/components/pitch/sections/GapSection";
import { ThousandTestSection } from "@/components/pitch/sections/ThousandTestSection";
import { NinetyDaysSection } from "@/components/pitch/sections/NinetyDaysSection";
import { WorkSection } from "@/components/pitch/sections/WorkSection";
import { CommunitySection } from "@/components/pitch/sections/CommunitySection";
import { CloseSection } from "@/components/pitch/sections/CloseSection";

export default function RGC() {
  useEffect(() => {
    // Override both <html> and <body> backgrounds while on this page.
    // index.css explicitly sets html { background-color: hsl(var(--base)) } which
    // takes the viewport canvas — body-only override leaves the dark projgrowth
    // dot-grid visible anywhere the body doesn't fully cover it.
    const prevBody = document.body.style.backgroundColor;
    const prevHtml = document.documentElement.style.backgroundColor;
    const prevHtmlBgImage = document.documentElement.style.backgroundImage;
    const prevTitle = document.title;

    const previousRobots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const previousRobotsContent = previousRobots?.getAttribute("content") ?? null;
    const robotsMeta = previousRobots ?? document.createElement("meta");
    robotsMeta.setAttribute("name", "robots");
    robotsMeta.setAttribute("content", "noindex, nofollow, noarchive");
    if (!previousRobots) document.head.appendChild(robotsMeta);

    const preloadHrefs = [
      "/artifacts/yearbook-primary.png",
      "/artifacts/rgc-field-film-poster.jpg?v=3",
    ];
    const preloadLinks = preloadHrefs.map((href) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = href;
      link.dataset.rgcPreload = "true";
      document.head.appendChild(link);
      return link;
    });

    document.body.style.backgroundColor = "#ede7d6";
    document.documentElement.style.backgroundColor = "#ede7d6";
    document.documentElement.style.backgroundImage = "none";
    document.title = "A Letter, Not a Résumé — ProjGrowth × RGC";

    return () => {
      document.body.style.backgroundColor = prevBody;
      document.documentElement.style.backgroundColor = prevHtml;
      document.documentElement.style.backgroundImage = prevHtmlBgImage;
      document.title = prevTitle;
      preloadLinks.forEach((link) => link.remove());
      if (previousRobots) {
        if (previousRobotsContent) {
          previousRobots.setAttribute("content", previousRobotsContent);
        } else {
          previousRobots.removeAttribute("content");
        }
      } else {
        robotsMeta.remove();
      }
    };
  }, []);

  return (
    <div className="rgc-scope">
      <main className="relative overflow-x-hidden bg-bone text-pencil">
        <Hero />
        <GapSection />
        <ThousandTestSection />
        <NinetyDaysSection />
        <WorkSection />
        <CommunitySection />
        <CloseSection />
      </main>
    </div>
  );
}
