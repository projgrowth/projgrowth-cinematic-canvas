import { STATUS_LABEL, type ReviewComment } from "./types";

const NotesList = ({ comments }: { comments: ReviewComment[] }) => {
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
      <ul className="mt-6 divide-y divide-line">
        {comments.map((c, i) => (
          <li key={c.id} className="py-4 flex items-start gap-5">
            <span className="numeral-inline text-mute shrink-0">{String(i + 1).padStart(2, "0")}</span>
            <div className="min-w-0 flex-1">
              <p className="text-text leading-relaxed break-words">{c.body}</p>
              <p className="text-sm text-mute mt-1">
                {c.page_label || c.page_path} · {c.device === "mobile" ? "Mobile" : "Desktop"}
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
