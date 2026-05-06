import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Check, X, Loader2, Lock } from "lucide-react";

interface Submission {
  id: string;
  created_at: string;
  name: string;
  email: string;
  message: string;
  email_sent: boolean | null;
  source: string | null;
  service_interest: string | null;
  budget: string | null;
  timeline: string | null;
}

interface Discovery {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  practice_name: string | null;
  responses: Record<string, any>;
  generated_brief: string | null;
  email_sent: boolean | null;
  confidence?: string | null;
  services?: string[] | null;
  engagement_tier?: string | null;
  reference_signed_urls?: string[];
}

const AdminLeads = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [discovery, setDiscovery] = useState<Discovery[]>([]);
  const [tab, setTab] = useState<"leads" | "discovery">("leads");
  const [openId, setOpenId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Verify password via edge function
      const { data, error: fnError } = await supabase.functions.invoke("admin-verify", {
        body: { password },
      });

      if (fnError || !data?.authenticated) {
        setError("Invalid password");
        setLoading(false);
        return;
      }

      setAuthenticated(true);
      // Fetch submissions via edge function (service role)
      const { data: leadsData, error: leadsError } = await supabase.functions.invoke("admin-leads", {
        body: { password },
      });

      if (leadsError) {
        setError("Failed to fetch leads");
      } else {
        setSubmissions(leadsData?.submissions || []);
        setDiscovery(leadsData?.discovery || []);
      }
    } catch {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <div className="text-center mb-8">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-surface border border-line flex items-center justify-center">
              <Lock className="w-5 h-5 text-mute" />
            </div>
            <h1 className="font-display text-2xl text-text">Admin Access</h1>
            <p className="text-sm text-mute mt-1">Enter your admin password to view leads</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 bg-surface border border-line rounded-lg text-text placeholder:text-mute focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            required
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "View Leads"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl text-text">Submissions</h1>
            <p className="text-sm text-mute mt-1">
              {submissions.length} contact · {discovery.length} discovery
            </p>
          </div>
        </div>

        <div className="flex gap-2 mb-6 border-b border-line">
          <button
            onClick={() => setTab("leads")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab === "leads" ? "border-accent text-text" : "border-transparent text-mute hover:text-text"}`}
          >
            Quick Leads ({submissions.length})
          </button>
          <button
            onClick={() => setTab("discovery")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab === "discovery" ? "border-accent text-text" : "border-transparent text-mute hover:text-text"}`}
          >
            NM Discovery ({discovery.length})
          </button>
        </div>

        {tab === "leads" && (
        <div className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface border-b border-line">
                <th className="text-left p-3 text-mute font-medium">Date</th>
                <th className="text-left p-3 text-mute font-medium">Name</th>
                <th className="text-left p-3 text-mute font-medium">Email</th>
                <th className="text-left p-3 text-mute font-medium">Message</th>
                <th className="text-left p-3 text-mute font-medium">Source</th>
                <th className="text-left p-3 text-mute font-medium">Email Sent</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr key={sub.id} className="border-b border-line hover:bg-surface/50 transition-colors">
                  <td className="p-3 text-mute whitespace-nowrap">
                    {new Date(sub.created_at).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric",
                      hour: "numeric", minute: "2-digit",
                    })}
                  </td>
                  <td className="p-3 text-text font-medium">{sub.name}</td>
                  <td className="p-3">
                    <a href={`mailto:${sub.email}`} className="text-accent hover:underline">{sub.email}</a>
                  </td>
                  <td className="p-3 text-mute max-w-xs truncate">{sub.message}</td>
                  <td className="p-3 text-mute">{sub.source || "—"}</td>
                  <td className="p-3">
                    {sub.email_sent ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <X className="w-4 h-4 text-red-400" />
                    )}
                  </td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-mute">No submissions yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        )}

        {tab === "discovery" && (
          <div className="space-y-3">
            {discovery.length === 0 && (
              <div className="p-8 text-center text-mute border border-line rounded-lg">No discovery submissions yet. Share <code className="text-accent">/discovery</code> with prospects.</div>
            )}
            {discovery.map((d) => {
              const isOpen = openId === d.id;
              const r = d.responses || {};
              return (
                <div key={d.id} className="border border-line rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenId(isOpen ? null : d.id)}
                    className="w-full flex items-center justify-between p-4 hover:bg-surface/50 transition-colors text-left"
                  >
                    <div>
                    <div className="text-text font-medium flex items-center gap-2 flex-wrap">
                      {d.full_name}
                      {d.engagement_tier && <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30">{d.engagement_tier}</span>}
                      {d.confidence && <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-surface text-mute border border-line">{d.confidence}</span>}
                    </div>
                      <div className="text-mute text-xs mt-1">
                        {d.practice_name || "—"} · <a href={`mailto:${d.email}`} className="text-accent hover:underline">{d.email}</a>
                        {d.services && d.services.length > 0 && <span className="ml-2">· {d.services.join(", ")}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-mute text-xs">
                        {new Date(d.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                      {d.email_sent ? <Check className="w-4 h-4 text-green-400" /> : <X className="w-4 h-4 text-red-400" />}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="border-t border-line bg-surface/30 p-5 space-y-4 text-sm">
                      {d.generated_brief && (
                        <div>
                          <div className="text-xs uppercase tracking-wide text-mute mb-2">Generated brief</div>
                          <div className="text-text leading-relaxed bg-base p-4 rounded border border-line">{d.generated_brief}</div>
                          <button
                            onClick={() => navigator.clipboard.writeText(d.generated_brief || "")}
                            className="text-xs text-accent hover:underline mt-2"
                          >
                            Copy brief
                          </button>
                        </div>
                      )}
                      {d.reference_signed_urls && d.reference_signed_urls.length > 0 && (
                        <div>
                          <div className="text-xs uppercase tracking-wide text-mute mb-2">Reference uploads</div>
                          <div className="grid grid-cols-3 gap-2">
                            {d.reference_signed_urls.map((u, i) => (
                              <a key={i} href={u} target="_blank" rel="noreferrer" className="block aspect-square overflow-hidden rounded border border-line bg-base">
                                <img src={u} alt={`Reference ${i + 1}`} className="w-full h-full object-cover" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                        {Object.entries(r).map(([k, v]) => (
                          <div key={k} className="flex gap-3">
                            <span className="text-mute text-xs uppercase tracking-wide min-w-[110px]">{k}</span>
                            <span className="text-text text-xs flex-1 break-words">
                              {Array.isArray(v) ? (v.length ? v.join(", ") : "—") : String(v ?? "—")}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLeads;
