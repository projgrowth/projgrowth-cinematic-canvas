import { ReactNode } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionChapter from "@/components/SectionChapter";

interface PageHeroProps {
  chapter?: { number: number; label: string };
  title: ReactNode;
  lede?: ReactNode;
  status?: ReactNode;
  align?: "left" | "center";
  children?: ReactNode;
  className?: string;
}

/**
 * Shared inner-page hero. Provides the editorial chapter mark, headline,
 * lede, and an optional status row, all wrapped in the standard radial-glow
 * halo. Used by every page except Home (which keeps its bespoke hero).
 */
const PageHero = ({
  chapter,
  title,
  lede,
  status,
  align = "left",
  children,
  className = "",
}: PageHeroProps) => {
  const alignClass = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`relative ${className}`}>
      <div
        className="absolute -inset-x-8 top-0 h-64 pointer-events-none -z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, hsl(155 48% 54% / 0.06), transparent 65%)",
        }}
      />
      <ScrollReveal variant="fade-up">
        <div className={`relative z-10 ${alignClass}`}>
          {chapter && (
            <SectionChapter number={chapter.number} label={chapter.label} align={align} />
          )}
          <h1 className={`font-display text-text mb-5 ${alignClass}`}>{title}</h1>
          {lede && (
            <p className={`lede ${align === "center" ? "mx-auto" : ""} max-w-[62ch]`}>
              {lede}
            </p>
          )}
          {status && <div className="mt-6">{status}</div>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </ScrollReveal>
    </div>
  );
};

export default PageHero;