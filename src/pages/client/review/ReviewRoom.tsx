import { useCallback, useEffect, useState } from "react";
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
}

/**
 * Private review room: a realistic phone/desktop presentation of the client
 * site with pinned notes. All note reads and writes go through an edge
 * function authorized by the short-lived session token.
 */
const ReviewRoom = ({ gateway, url, token }: Props) => {
  const [device, setDevice] = useState<Device>(() =>
    typeof window !== "undefined" && window.innerWidth < 900 ? "mobile" : "desktop",
  );
  const [page, setPage] = useState(gateway.pages[0]);
  const [commentMode, setCommentMode] = useState(false);
  const [draft, setDraft] = useState<{ x: number; y: number } | null>(null);
  const [comments, setComments] = useState<ReviewComment[]>([]);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const { data } = await supabase.functions.invoke("client-review-comments", {
      body: { action: "list", token },
    });
    if (Array.isArray(data?.comments)) setComments(data.comments as ReviewComment[]);
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  const pins = comments.filter((c) => c.page_path === page.path && c.device === device);

  const submitNote = async (body: string) => {
    if (!draft) return;
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
    if (fnError || !data?.comment) {
      setError("That note didn't send. Please try again in a moment.");
      return;
    }
    setComments((prev) => [...prev, data.comment as ReviewComment]);
    setDraft(null);
    setCommentMode(false);
  };

  const src = `${url.replace(/\/$/, "")}${page.path}`;

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

      <p className="text-sm text-mute mb-5">
        {commentMode
          ? "Click anywhere on the preview to place a note."
          : "Browse the site as your visitors will. Switch on comment mode to leave a note."}
      </p>

      <DeviceFrame
        src={src}
        device={device}
        commentMode={commentMode}
        pins={pins}
        draft={draft}
        onPlace={(x, y) => setDraft({ x, y })}
      />

      {error && (
        <p role="alert" className="mt-5 text-sm text-destructive">
          {error}
        </p>
      )}

      {draft && (
        <NoteComposer pageLabel={page.label} onCancel={() => setDraft(null)} onSubmit={submitNote} />
      )}

      <NotesList comments={comments} />
    </div>
  );
};

export default ReviewRoom;
