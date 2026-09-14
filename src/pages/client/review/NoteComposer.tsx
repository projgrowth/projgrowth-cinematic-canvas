import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

interface Props {
  pageLabel: string;
  onCancel: () => void;
  onSubmit: (body: string) => Promise<void>;
}

const NoteComposer = ({ pageLabel, onCancel, onSubmit }: Props) => {
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim() || sending) return;
    setSending(true);
    await onSubmit(body.trim());
    setSending(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 border-t border-line pt-6">
      <p className="eyebrow-mute">Note on {pageLabel}</p>
      <textarea
        ref={ref}
        value={body}
        maxLength={1000}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
        placeholder="What would you like changed here?"
        className="mt-4 w-full bg-transparent border-b border-line text-text text-[16px] leading-relaxed py-3 outline-none transition-colors duration-200 focus:border-accent resize-none"
      />
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={!body.trim() || sending}
          className="inline-flex items-center justify-center gap-3 min-h-[48px] px-7 border border-line text-text eyebrow hover:border-accent hover:text-accent focus-ring transition-colors duration-200 disabled:opacity-40"
        >
          {sending ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : "Send Note"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center min-h-[48px] px-5 text-mute eyebrow hover:text-text focus-ring transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteComposer;
