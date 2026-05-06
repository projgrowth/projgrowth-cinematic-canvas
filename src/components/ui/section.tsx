import * as React from "react";
import { cn } from "@/lib/utils";

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
        {glow && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-0"
            style={{
              background:
                "radial-gradient(ellipse at 15% 30%, hsl(var(--accent) / 0.05), transparent 55%), radial-gradient(ellipse at 85% 70%, hsl(var(--accent) / 0.025), transparent 50%)",
            }}
          />
        )}
        <div className="relative z-10">{children}</div>
      </Tag>
    );
  },
);
Section.displayName = "Section";

export default Section;