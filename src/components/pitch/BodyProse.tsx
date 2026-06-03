import { type CSSProperties, type ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

/**
 * Standardized body prose block. 17px Lora (16 on mobile), line-height 1.7,
 * max-width 54ch, paragraph spacing via `body-prose > * + *`.
 * Pass `onForest` for bone-on-dark variant.
 */
export default function BodyProse({
  children,
  onForest = false,
  className = "",
  delay = 60,
}: {
  children: ReactNode;
  onForest?: boolean;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const style = {
    marginTop: "var(--space-headline-body)",
    ["--reveal-delay" as string]: `${delay}ms`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className={`body-prose ${onForest ? "body-prose-onforest" : ""} in-view-fade ${inView ? "is-visible" : ""} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
