import * as React from "react";
import { cn } from "@/lib/utils";
import AmbientGlow from "@/components/AmbientGlow";

type SectionSize = "sm" | "md" | "lg" | "hero";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: SectionSize;
  bleed?: boolean; // skip container-site
  glow?: boolean; // add a soft accent radial backdrop
  as?: keyof JSX.IntrinsicElements;
}

const sizeClass: Record<SectionSize, string> = {
  sm: "section-sm",
  md: "section",
  lg: "section-lg",
  hero: "section-hero",
};

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ size = "md", bleed = false, glow = false, as = "section", className, children, ...rest }, ref) => {
    const Tag = as as any;
    return (
      <Tag
        ref={ref as any}
        className={cn(
          "relative",
          sizeClass[size],
          !bleed && "container-site",
          className,
        )}
        {...rest}
      >
        {glow && <AmbientGlow variant={size === "hero" ? "hero" : "page"} className="-z-0" />}
        <div className="relative z-10">{children}</div>
      </Tag>
    );
  },
);
Section.displayName = "Section";

export default Section;