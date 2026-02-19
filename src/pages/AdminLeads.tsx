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

const AdminLeads = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
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
            <h1 className="font-display text-3xl text-text">Lead Submissions</h1>
            <p className="text-sm text-mute mt-1">{submissions.length} total submissions</p>
          </div>
        </div>

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
      </div>
    </div>
  );
};

export default AdminLeads;
