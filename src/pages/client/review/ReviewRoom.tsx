import { useCallback, useEffect, useMemo, useState } from "react";
import { MessageSquarePlus, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

import type { GatewayCopy } from "../gateways";
import DeviceFrame from "./DeviceFrame";
import NoteComposer from "./NoteComposer";
import NotesList from "./NotesList";
import type { Device, ReviewComment } from "./types";

interface Props {
  gateway: GatewayCopy;
  url: string;
  token: string;
  /** Called when the signed session is no longer accepted. */
  onExpired?: () => void;
}

/** True when an edge function rejected the session token. */
const isExpired = (e: unknown) =>
  (e as { context?: { status?: number } })?.context?.status === 401;

const byTime = (a: ReviewComment, b: ReviewComment) =>
  new Date(a.created_at).getTime() - new Date(b.created_at).getTime();

/**
 * Private review room: a realistic phone/desktop presentation of the client
 * site with pinned notes. All note reads and writes go through an edge
 * function authorized by the short-lived session token, so notes are only ever
 * visible to someone who entered the access code — and they are stored, so the
 * same code brings the whole history back later.
 */
const ReviewRoom = ({ gateway, url, token, onExpired }: Props) => {
  const [device, setDevice] = useState<Device>(() =>
    typeof window !== "undefined" && window.innerWidth < 900 ? "mobile" : "desktop",
  );
  const [page, setPage] = useState(gateway.pages[0]);
  const [commentMode, setCommentMode] = useState(false);
  const [draft, setDraft] = useState<{ x: number; y: number } | null>(null);
  const [comments, setComments] = useState<ReviewComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [error, setError] = useState("");
  const [highlightId, setHighlightId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoadFailed(false);
    const { data, error: fnError } = await supabase.functions.invoke("client-review-comments", {
      body: { action: "list", token },
    });
    if (fnError && isExpired(fnError)) {
      onExpired?.();
      return;
    }
    if (fnError || !Array.isArray(data?.comments)) {
      setLoadFailed(true);
    } else {
      setComments((data.comments as ReviewComment[]).slice().sort(byTime));
    }
    setLoading(false);
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!highlightId) return;
    const t = window.setTimeout(() => setHighlightId(null), 2400);
    return () => window.clearTimeout(t);
  }, [highlightId]);

  const numberOf = useMemo(() => {
    const map = new Map<string, number>();
    comments.forEach((c, i) => map.set(c.id, i + 1));
    return map;
  }, [comments]);

  const pins = comments.filter((c) => c.page_path === page.path && c.device === device);

  const submitNote = async (body: string): Promise<boolean> => {
    if (!draft) return false;
    setError("");
    const { data, error: fnError } = await supabase.functions.invoke("client-review-comments", {
      body: {
        action: "create",
        token,
        page_path: page.path,
        page_label: page.label,
        device,
        x_pct: draft.x,
        y_pct: draft.y,
        body,
      },
    });
    if (fnError && isExpired(fnError)) {
      onExpired?.();
      return false;
    }
    if (fnError || !data?.comment) {
      setError("That note didn't send. Your words are safe below — try again in a moment.");
      return false;
    }
    const created = data.comment as ReviewComment;
    setComments((prev) => [...prev, created].sort(byTime));
    setHighlightId(created.id);
    setDraft(null);
    setCommentMode(false);
    return true;
  };

  const src = `${url.replace(/\/$/, "")}${page.path}`;
  const draftKey = `pg:review:${gateway.slug}:${device}:${page.path}`;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <p className="eyebrow-mute">
          {gateway.client} / {gateway.project}
        </p>
        <div className="flex items-center gap-2">
          <div className="flex border border-line" role="group" aria-label="Device">
            {(["desktop", "mobile"] as Device[]).map((d) => (
              <button
                key={d}
                onClick={() => {
                  setDevice(d);
                  setDraft(null);
                }}
                aria-pressed={device === d}
                className={`min-h-[44px] px-4 eyebrow transition-colors duration-200 focus-ring ${
                  device === d ? "text-accent" : "text-mute hover:text-text"
                }`}
              >
                {d === "desktop" ? "Desktop" : "Mobile"}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              setCommentMode((v) => !v);
              setDraft(null);
            }}
            aria-pressed={commentMode}
            className={`inline-flex items-center gap-2 min-h-[44px] px-4 border eyebrow transition-colors duration-200 focus-ring ${
              commentMode
                ? "border-accent text-accent"
                : "border-line text-mute hover:text-text hover:border-accent/40"
            }`}
          >
            {commentMode ? (
              <X className="w-4 h-4" aria-hidden="true" />
            ) : (
              <MessageSquarePlus className="w-4 h-4" aria-hidden="true" />
            )}
            {commentMode ? "Exit Comment Mode" : "Comment Mode"}
          </button>
        </div>
      </div>

      {/* Page picker */}
      <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 py-5" aria-label="Pages">
        {gateway.pages.map((p) => (
          <button
            key={p.path}
            onClick={() => {
              setPage(p);
              setDraft(null);
            }}
            aria-current={page.path === p.path}
            className={`min-h-[44px] eyebrow transition-colors duration-200 focus-ring ${
              page.path === p.path ? "text-text" : "text-mute hover:text-text"
            }`}
          >
            {p.label}
          </button>
        ))}
      </nav>

      <p className="text-sm text-mute mb-5" aria-live="polite">
        {commentMode
          ? "Click the spot you want to talk about, then write your note."
          : "Browse the site as your visitors will. Switch on comment mode to leave a note."}
      </p>

      <DeviceFrame
        src={src}
        device={device}
        commentMode={commentMode}
        pins={pins}
        draft={draft}
        onPlace={(x, y) => setDraft({ x, y })}
        pinNumber={(id) => numberOf.get(id) ?? 1}
      />

      {error && (
        <p role="alert" className="mt-5 text-sm text-destructive">
          {error}
        </p>
      )}

      {draft && (
        <NoteComposer
          pageLabel={page.label}
          draftKey={draftKey}
          onCancel={() => setDraft(null)}
          onSubmit={submitNote}
        />
      )}

      {loading ? (
        <p className="mt-8 border-t border-line pt-6 text-mute">Loading your notes…</p>
      ) : loadFailed ? (
        <div className="mt-8 border-t border-line pt-6">
          <p className="text-mute">Your notes couldn't be loaded just now.</p>
          <button
            onClick={() => {
              setLoading(true);
              load();
            }}
            className="mt-4 inline-flex items-center min-h-[44px] px-5 border border-line eyebrow text-text hover:border-accent hover:text-accent focus-ring transition-colors duration-200"
          >
            Try again
          </button>
        </div>
      ) : (
        <NotesList comments={comments} highlightId={highlightId} />
      )}
    </div>
  );
};

export default ReviewRoom;
