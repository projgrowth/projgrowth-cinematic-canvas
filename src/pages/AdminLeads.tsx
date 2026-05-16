import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Check, X, Loader2, Lock, Download } from "lucide-react";

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
  polished_brief?: string | null;
  quality_score?: number | null;
  quality_flags?: string[] | null;
  email_sent: boolean | null;
  confidence?: string | null;
  services?: string[] | null;
  engagement_tier?: string | null;
  reference_signed_urls?: string[];
}

const AdminLeads = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [discovery, setDiscovery] = useState<Discovery[]>([]);
  const [tab, setTab] = useState<"leads" | "discovery">("leads");
  const [openId, setOpenId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selfTestRunning, setSelfTestRunning] = useState(false);
  const [selfTestResult, setSelfTestResult] = useState<
    | { ok: boolean; steps: { step: string; ok: boolean; detail?: string }[]; error?: string }
    | null
  >(null);

  const runSelfTest = async () => {
    setSelfTestRunning(true);
    setSelfTestResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("admin-self-test", {
        body: { email, password },
      });
      if (error) {
        setSelfTestResult({ ok: false, steps: [], error: error.message });
      } else {
        setSelfTestResult(data);
      }
    } catch (e: any) {
      setSelfTestResult({ ok: false, steps: [], error: e?.message || "Failed" });
    }
    setSelfTestRunning(false);
  };

  const csvEscape = (v: any) => {
    if (v === null || v === undefined) return "";
    const s = Array.isArray(v) ? v.join("; ") : typeof v === "object" ? JSON.stringify(v) : String(v);
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };

  const downloadCsv = (filename: string, header: string[], rows: any[][]) => {
    const csv = [header, ...rows].map((r) => r.map(csvEscape).join(",")).join("\r\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const today = () => new Date().toISOString().slice(0, 10);

  const RESPONSE_LABELS: Record<string, string> = {
    pitch: "Elevator pitch",
    vision: "Vision",
    brandPromise: "Brand promise",
    brandStory: "Core belief / story",
    brandValues: "Brand values",
    adjectives: "Brand adjectives",
    tone: "Tone",
    mood: "Mood",
    pQB: "Personality vs polish",
    dbaName: "DBA / practice name",
    audience: "Target audience",
    idealClient: "Ideal client",
    differentiators: "Differentiators",
    competitors: "Competitors / inspiration",
    services: "Services interested in",
    websiteGoals: "Website goals",
    contentNeeds: "Content needs",
    adsBudget: "Ads budget",
    printNeeds: "Print needs",
    timeline: "Timeline",
    budget: "Budget",
    currentSite: "Current site",
    referenceNotes: "Reference notes",
    additionalNotes: "Additional notes",
    location: "Location",
    phone: "Phone",
    role: "Role / title",
  };

  const prettifyKey = (k: string) =>
    RESPONSE_LABELS[k] ||
    k.replace(/([A-Z])/g, " $1").replace(/[_-]+/g, " ").replace(/^./, (c) => c.toUpperCase()).trim();

  const formatValue = (v: any): string => {
    if (v === null || v === undefined || v === "") return "—";
    if (v === "__exploring__") return "(still exploring)";
    if (Array.isArray(v)) return v.length ? v.join(", ") : "—";
    if (typeof v === "object") return JSON.stringify(v);
    return String(v);
  };

  const buildDiscoveryProfile = (d: Discovery): string => {
    const lines: string[] = [];
    lines.push(`=== ${d.full_name}${d.practice_name ? ` — ${d.practice_name}` : ""} ===`);
    lines.push(`Email: ${d.email}`);
    lines.push(`Submitted: ${new Date(d.created_at).toLocaleString()}`);
    if (d.engagement_tier) lines.push(`Engagement tier: ${d.engagement_tier}`);
    if (d.confidence) lines.push(`Confidence: ${d.confidence}`);
    if (d.services?.length) lines.push(`Services: ${d.services.join(", ")}`);
    if (typeof d.quality_score === "number") lines.push(`Quality score: ${d.quality_score}/100`);
    if (d.quality_flags?.length) lines.push(`Flags: ${d.quality_flags.join(", ")}`);
    lines.push("");
    lines.push("--- Discovery answers ---");
    const r = d.responses || {};
    for (const [k, v] of Object.entries(r)) {
      lines.push(`${prettifyKey(k)}: ${formatValue(v)}`);
    }
    if (d.polished_brief) {
      lines.push("");
      lines.push("--- Polished brief (AI) ---");
      lines.push(d.polished_brief);
    }
    if (d.generated_brief) {
      lines.push("");
      lines.push("--- Generated brief ---");
      lines.push(d.generated_brief);
    }
    if (d.reference_signed_urls?.length) {
      lines.push("");
      lines.push("--- Reference uploads (signed URLs, 1h) ---");
      d.reference_signed_urls.forEach((u, i) => lines.push(`${i + 1}. ${u}`));
    }
    return lines.join("\n");
  };

  const buildLeadProfile = (s: Submission): string => {
    return [
      `=== ${s.name} ===`,
      `Email: ${s.email}`,
      `Submitted: ${new Date(s.created_at).toLocaleString()}`,
      `Source: ${s.source || "—"}`,
      `Service interest: ${s.service_interest || "—"}`,
      `Budget: ${s.budget || "—"}`,
      `Timeline: ${s.timeline || "—"}`,
      "",
      "--- Message ---",
      s.message || "—",
    ].join("\n");
  };

  const exportLeads = () => {
    const header = [
      "id", "date", "name", "email", "source", "service_interest", "budget", "timeline",
      "email_sent", "message", "profile_text",
    ];
    const rows = submissions.map((s) => [
      s.id, s.created_at, s.name, s.email, s.source, s.service_interest, s.budget, s.timeline,
      s.email_sent, s.message, buildLeadProfile(s),
    ]);
    downloadCsv(`projgrowth-leads-${today()}.csv`, header, rows);
  };

  const exportDiscovery = () => {
    const clean = discovery.filter((d) => d.full_name !== "_TEST_VERIFY");
    const responseKeys = Array.from(
      new Set(clean.flatMap((d) => Object.keys(d.responses || {})))
    ).sort();
    const baseHeader = [
      "id", "date", "full_name", "email", "practice_name", "services", "engagement_tier",
      "confidence", "quality_score", "quality_flags", "email_sent",
      "polished_brief", "generated_brief",
      "reference_image_count", "reference_signed_urls",
      "profile_text", "responses_json",
    ];
    const header = [...baseHeader, ...responseKeys.map((k) => `q_${k}`)];
    const rows = clean.map((d) => [
      d.id, d.created_at, d.full_name, d.email, d.practice_name, d.services, d.engagement_tier,
      d.confidence, d.quality_score, d.quality_flags, d.email_sent,
      d.polished_brief, d.generated_brief,
      d.reference_signed_urls?.length || 0,
      (d.reference_signed_urls || []).join(" | "),
      buildDiscoveryProfile(d),
      JSON.stringify(d.responses || {}),
      ...responseKeys.map((k) => (d.responses || {})[k]),
    ]);
    downloadCsv(`projgrowth-discovery-${today()}.csv`, header, rows);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Verify password via edge function
      const { data, error: fnError } = await supabase.functions.invoke("admin-verify", {
        body: { email, password },
      });

      if (fnError || !data?.authenticated) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      setAuthenticated(true);
      // Fetch submissions via edge function (service role)
      const { data: leadsData, error: leadsError } = await supabase.functions.invoke("admin-leads", {
        body: { email, password },
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
        <Helmet><meta name="robots" content="noindex,nofollow" /></Helmet>
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <div className="text-center mb-8">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-surface border border-line flex items-center justify-center">
              <Lock className="w-5 h-5 text-mute" />
            </div>
            <h1 className="font-display text-text">Admin Access</h1>
            <p className="text-sm text-mute mt-1">Sign in to view leads</p>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            autoComplete="email"
            className="w-full px-4 py-3 bg-surface border border-line rounded-lg text-text placeholder:text-mute focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            className="w-full px-4 py-3 bg-surface border border-line rounded-lg text-text placeholder:text-mute focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            required
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
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
            <h1 className="font-display text-text">Submissions</h1>
            <p className="text-sm text-mute mt-1">
              {submissions.length} contact · {discovery.length} discovery
            </p>
          </div>
          <button
            onClick={runSelfTest}
            disabled={selfTestRunning}
            className="text-xs px-3 py-2 border border-line rounded-lg text-mute hover:text-text hover:border-accent/40 transition-colors disabled:opacity-50 flex items-center gap-2"
            title="Insert a synthetic _TEST_VERIFY row, check the new columns are present, and clean it up."
          >
            {selfTestRunning ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
            {selfTestRunning ? "Running self-test…" : "Run submission self-test"}
          </button>
        </div>

        {selfTestResult && (
          <div
            className={`mb-6 p-4 rounded-lg border text-sm ${
              selfTestResult.ok
                ? "border-success/40 bg-success/5"
                : "border-destructive/40 bg-destructive/5"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium text-text">
                {selfTestResult.ok ? "✓ Self-test passed" : "✗ Self-test failed"}
              </div>
              <button
                onClick={() => setSelfTestResult(null)}
                className="text-xs text-mute hover:text-text"
              >
                Dismiss
              </button>
            </div>
            {selfTestResult.error && (
              <div className="text-destructive text-xs mb-2">{selfTestResult.error}</div>
            )}
            <ul className="space-y-1 text-xs">
              {selfTestResult.steps.map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  {s.ok ? (
                    <Check className="w-3 h-3 text-success mt-0.5 flex-shrink-0" />
                  ) : (
                    <X className="w-3 h-3 text-destructive mt-0.5 flex-shrink-0" />
                  )}
                  <span className={s.ok ? "text-mute" : "text-destructive"}>
                    {s.step}
                    {s.detail ? <span className="text-mute/60"> — {s.detail}</span> : null}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

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
          <div className="ml-auto pb-2">
            <button
              onClick={tab === "leads" ? exportLeads : exportDiscovery}
              disabled={tab === "leads" ? submissions.length === 0 : discovery.length === 0}
              className="text-xs px-3 py-2 border border-line rounded-lg text-mute hover:text-text hover:border-accent/40 transition-colors disabled:opacity-30 flex items-center gap-2"
              title={`Download ${tab === "leads" ? "quick leads" : "discovery"} as CSV`}
            >
              <Download className="w-3 h-3" />
              Export CSV
            </button>
          </div>
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
                      <Check className="w-4 h-4 text-success" />
                    ) : (
                      <X className="w-4 h-4 text-destructive" />
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
                      {d.engagement_tier && <span className="pill-accent">{d.engagement_tier}</span>}
                      {d.confidence && <span className="pill-neutral">{d.confidence}</span>}
                      {typeof d.quality_score === "number" && (
                        <span className={`text-xs px-2 py-0.5 rounded border ${d.quality_score >= 75 ? "border-success/40 text-success" : d.quality_score >= 50 ? "border-warning/40 text-warning" : "border-destructive/40 text-destructive"}`}>
                          {d.quality_score}/100
                        </span>
                      )}
                      {d.quality_flags && d.quality_flags.length > 0 && (
                        <span className="text-xs text-mute">⚑ {d.quality_flags.join(", ")}</span>
                      )}
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
                      {d.email_sent ? <Check className="w-4 h-4 text-success" /> : <X className="w-4 h-4 text-destructive" />}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="border-t border-line bg-surface/30 p-5 space-y-4 text-sm">
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => navigator.clipboard.writeText(buildDiscoveryProfile(d))}
                          className="text-xs px-3 py-1.5 border border-accent/40 rounded text-accent hover:bg-accent/10 transition-colors"
                        >
                          Copy full profile (AI-ready)
                        </button>
                        <button
                          onClick={() => {
                            const blob = new Blob([buildDiscoveryProfile(d)], { type: "text/plain;charset=utf-8" });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = `${(d.full_name || "submission").replace(/\W+/g, "-").toLowerCase()}-profile.txt`;
                            a.click();
                            URL.revokeObjectURL(url);
                          }}
                          className="text-xs px-3 py-1.5 border border-line rounded text-mute hover:text-text hover:border-accent/40 transition-colors"
                        >
                          Download profile (.txt)
                        </button>
                      </div>
                      {d.polished_brief && (
                        <div>
                          <div className="text-xs uppercase tracking-wide text-accent mb-2">Polished brief (AI)</div>
                          <div className="text-text bg-base p-4 rounded border border-accent/30 whitespace-pre-wrap">{d.polished_brief}</div>
                          <button
                            onClick={() => navigator.clipboard.writeText(d.polished_brief || "")}
                            className="text-xs text-accent hover:underline mt-2"
                          >
                            Copy polished brief
                          </button>
                        </div>
                      )}
                      {d.generated_brief && (
                        <div>
                          <div className="text-xs uppercase tracking-wide text-mute mb-2">Generated brief</div>
                          <div className="text-text bg-base p-4 rounded border border-line">{d.generated_brief}</div>
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
