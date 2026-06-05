interface SectionChapterProps {
  number: number;
  label: string;
}

const SectionChapter = ({ number, label }: SectionChapterProps) => (
  <div className="flex items-center gap-3 mb-3">
    <span className="font-display text-xs tracking-widest text-accent">
      {String(number).padStart(2, "0")} /
    </span>
    <span className="eyebrow !mb-0">{label}</span>
    <span className="h-px w-12 bg-accent/40" />
  </div>
);

export default SectionChapter;