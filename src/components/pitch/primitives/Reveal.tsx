import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  const revealStyle = {
    ["--reveal-delay" as string]: `${delay}ms`,
    ...style,
  } as CSSProperties;

  return (
    <Tag
      ref={ref as never}
      className={`in-view-fade ${inView ? "is-visible" : ""} ${className}`}
      style={revealStyle}
    >
      {children}
    </Tag>
  );
}
