export function ChapterMark({
  n,
  label,
  onForest = false,
}: {
  n: string;
  label: string;
  onForest?: boolean;
}) {
  return (
    <p className={`eyebrow ${onForest ? "eyebrow-onforest" : "text-[#2a2a1e]"}`}>
      {n} / {label}
    </p>
  );
}
