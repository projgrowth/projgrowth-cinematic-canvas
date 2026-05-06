import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  lede,
  align = "left",
  as = "h2",
  className,
}) => {
  const Heading = as as any;
  return (
    <header
      className={cn(
        "section-header",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <div className={cn("eyebrow mb-3", align === "center" && "mx-auto")}>{eyebrow}</div>}
      <Heading className="text-text">{title}</Heading>
      {lede && <p className={cn("lede mt-4", align === "center" && "mx-auto")}>{lede}</p>}
    </header>
  );
};

export default SectionHeader;