import type { ReactNode } from "react";

export function PullQuote({
  children,
  onForest = false,
}: {
  children: ReactNode;
  onForest?: boolean;
}) {
  return (
    <blockquote className={`pull-quote ${onForest ? "pull-quote-onforest" : ""}`}>
      {children}
    </blockquote>
  );
}
