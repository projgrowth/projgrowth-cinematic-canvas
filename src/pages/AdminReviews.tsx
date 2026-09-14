import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Loader2, Lock, Trash2 } from "lucide-react";
import Section from "@/components/ui/section";
import { supabase } from "@/integrations/supabase/client";
import { STATUS_LABEL, type ReviewStatus } from "./client/review/types";

interface AdminComment {
  id: string;
  client_slug: string;
  page_path: string;
  page_label: string | null;
  device: string;
  x_pct: number;
  y_pct: number;
  body: string;
  status: ReviewStatus;
  created_at: string;
}

const STATUSES: ReviewStatus[] = ["new", "in_progress", "done"];

const AdminReviews = () => {
  const [creds, setCreds] = useState<{ email: string; password: string } | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comments, setComments] = useState<AdminComment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const call = async (
    credentials: { email: string; password: string },
    payload: Record<string, unknown>,
  ) => {
    const { data, error: fnError } = await supabase.functions.invoke("client-review-admin", {
      body: { ...credentials, ...payload },
    });
    if (fnError || !data?.comments) throw new Error("failed");
    setComments(data.comments as AdminComment[]);
  };

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await call({ email, password }, { action: "list" });
      setCreds({ email, password });
    } catch {
      setError("Invalid email or password");
    }
    setLoading(false);
  };

  const mutate = async (payload: Record<string, unknown>) => {
    if (!creds) return;
    setError("");
    try {
      await call(creds, payload);
    } catch {
      setError("That change didn't save. Please try again.");
    }
  };

  if (!creds) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center p-4">
        <Helmet>
          <title>Review Notes</title>
          <meta name="robots" content="noindex,nofollow" />
        </Helmet>
        <form onSubmit={signIn} className="w-full max-w-sm space-y-4">
          <div className="text-center mb-8">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-surface border border-line flex items-center justify-center">
              <Lock className="w-5 h-5 text-mute" />
            </div>
            <h1 className="font-display text-text">Client Review Notes</h1>
            <p className="text-sm text-mute mt-1">Sign in to view feedback</p>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            autoComplete="email"
            className="input-field"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            className="input-field"
            required
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "View Notes"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="page-canvas">
      <Helmet>
        <title>Review Notes</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <Section size="sm">
        <h1 className="font-display text-text">Client Review Notes</h1>
        <p className="text-sm text-mute mt-1">{comments.length} total</p>
        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

        {comments.length === 0 ? (
          <p className="mt-10 text-mute">No notes yet.</p>
        ) : (
          <ul className="mt-10 divide-y divide-line">
            {comments.map((c) => (
              <li key={c.id} className="py-6">
                <p className="eyebrow-mute">
                  {c.client_slug} · {c.page_label || c.page_path} ·{" "}
                  {c.device === "mobile" ? "Mobile" : "Desktop"} · {Math.round(c.x_pct)}% /{" "}
                  {Math.round(c.y_pct)}%
                </p>
                <p className="text-text leading-relaxed mt-3 break-words">{c.body}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => mutate({ action: "status", id: c.id, status: s })}
                      className={`min-h-[40px] px-3 text-xs border rounded-lg transition-colors ${
                        c.status === s
                          ? "border-accent text-accent"
                          : "border-line text-mute hover:text-text"
                      }`}
                    >
                      {STATUS_LABEL[s]}
                    </button>
                  ))}
                  <button
                    onClick={() => mutate({ action: "delete", id: c.id })}
                    className="ml-auto min-h-[40px] px-3 text-xs border border-line rounded-lg text-mute hover:text-destructive hover:border-destructive/40 transition-colors flex items-center gap-2"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                </div>
                <p className="text-xs text-mute mt-3">
                  {new Date(c.created_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </div>
  );
};

export default AdminReviews;
