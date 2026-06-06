interface SectionChapterProps {
  number: number;
  label: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * Editorial section chapter mark — "01 / Label" with emerald hairline.
 * Used site-wide above section headers and page heroes for cohesion.
 */
const SectionChapter = ({ number, label, align = "left", className = "" }: SectionChapterProps) => (
  <div
    className={`flex items-center gap-3 mb-4 ${align === "center" ? "justify-center" : ""} ${className}`}
  >
    <span className="font-display text-xs tracking-widest text-accent tabular-nums">
      {String(number).padStart(2, "0")} /
    </span>
    <span className="eyebrow !mb-0">{label}</span>
    <span className="h-px w-12 bg-accent/40" aria-hidden="true" />
  </div>
);

export default SectionChapter;