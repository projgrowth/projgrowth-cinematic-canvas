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
    // Apply RGC background to body while on this page
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#ede7d6";
    document.title = "A Letter, Not a Résumé — ProjGrowth × RGC";
    return () => {
      document.body.style.backgroundColor = prev;
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
