import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

interface Props {
  pageLabel: string;
  /** Stable key used to keep an unsent note safe on this device. */
  draftKey: string;
  onCancel: () => void;
  /** Resolves true when the note was stored, false when it failed to send. */
  onSubmit: (body: string) => Promise<boolean>;
}

const readDraft = (key: string) => {
  try {
    return window.localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
};

const NoteComposer = ({ pageLabel, draftKey, onCancel, onSubmit }: Props) => {
  const [body, setBody] = useState(() => readDraft(draftKey));
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);
  const wrapRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
    wrapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  // Keep whatever has been typed, even if the tab closes mid-sentence.
  useEffect(() => {
    try {
      if (body) window.localStorage.setItem(draftKey, body);
      else window.localStorage.removeItem(draftKey);
    } catch {
      /* storage unavailable — the note simply is not held locally */
    }
  }, [body, draftKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = body.trim();
    if (!text || sending) return;
    setSending(true);
    setFailed(false);
    const ok = await onSubmit(text);
    setSending(false);
    if (ok) {
      try {
        window.localStorage.removeItem(draftKey);
      } catch {
        /* nothing to clear */
      }
    } else {
      setFailed(true);
    }
  };

  const handleCancel = () => {
    try {
      window.localStorage.removeItem(draftKey);
    } catch {
      /* nothing to clear */
    }
    onCancel();
  };

  return (
    <form ref={wrapRef} onSubmit={handleSubmit} className="mt-8 border-t border-line pt-6">
      <p className="eyebrow-mute">Note on {pageLabel}</p>
      <label htmlFor="review-note" className="sr-only">
        Your note about {pageLabel}
      </label>
      <textarea
        id="review-note"
        ref={ref}
        value={body}
        maxLength={1000}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
        placeholder="What would you like changed here?"
        className="mt-4 w-full bg-transparent border-b border-line text-text text-[16px] leading-relaxed py-3 outline-none transition-colors duration-200 focus:border-accent resize-none"
      />
      <div className="mt-2 flex items-center justify-between gap-4">
        <p className="text-sm text-mute" aria-live="polite">
          {failed
            ? "Not sent. Your note is saved here — try again."
            : body
              ? "Saved on this device until you send it."
              : "\u00A0"}
        </p>
        <span className="text-sm text-mute tabular-nums">{body.length}/1000</span>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={!body.trim() || sending}
          className="inline-flex items-center justify-center gap-3 min-h-[48px] px-7 border border-line text-text eyebrow hover:border-accent hover:text-accent focus-ring transition-colors duration-200 disabled:opacity-40"
        >
          {sending ? (
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          ) : failed ? (
            "Retry"
          ) : (
            "Send Note"
          )}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="inline-flex items-center min-h-[48px] px-5 text-mute eyebrow hover:text-text focus-ring transition-colors duration-200"
        >
          Discard
        </button>
      </div>
    </form>
  );
};

export default NoteComposer;
