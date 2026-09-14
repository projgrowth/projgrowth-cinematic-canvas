import { STATUS_LABEL, type ReviewComment } from "./types";

interface Props {
  comments: ReviewComment[];
  highlightId?: string | null;
}

const when = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
};

const NotesList = ({ comments, highlightId }: Props) => {
  if (!comments.length) {
    return (
      <p className="mt-8 border-t border-line pt-6 text-mute">
        No notes yet. Turn on comment mode and click anywhere on the preview to leave one.
      </p>
    );
  }

  return (
    <div className="mt-8 border-t border-line pt-6">
      <p className="eyebrow-mute">Your notes ({comments.length})</p>
      <p className="mt-3 text-sm text-mute">
        Every note reaches us by email. Statuses update here as we work through them.
      </p>
      <ul className="mt-6 divide-y divide-line">
        {comments.map((c, i) => (
          <li
            key={c.id}
            className={`py-4 flex items-start gap-5 transition-colors duration-500 ${
              highlightId === c.id ? "bg-accent/5" : ""
            }`}
          >
            <span className="numeral-inline text-mute shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-text leading-relaxed break-words">{c.body}</p>
              <p className="text-sm text-mute mt-1">
                {c.page_label || c.page_path} · {c.device === "mobile" ? "Mobile" : "Desktop"}
                {when(c.created_at) ? ` · ${when(c.created_at)}` : ""}
              </p>
            </div>
            <span
              className={`eyebrow shrink-0 ${c.status === "done" ? "text-accent" : "text-mute"}`}
            >
              {STATUS_LABEL[c.status]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
