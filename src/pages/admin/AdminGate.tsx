import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Loader2, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Discovery, Submission } from "./types";

type Props = {
  onAuthenticated: (creds: { email: string; password: string }, data: { submissions: Submission[]; discovery: Discovery[] }) => void;
};

const AdminGate = ({ onAuthenticated }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error: fnError } = await supabase.functions.invoke("admin-verify", {
        body: { email, password },
      });
      if (fnError || !data?.authenticated) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }
      const { data: leadsData, error: leadsError } = await supabase.functions.invoke("admin-leads", {
        body: { email, password },
      });
      if (leadsError) {
        setError("Failed to fetch leads");
        setLoading(false);
        return;
      }
      onAuthenticated(
        { email, password },
        { submissions: leadsData?.submissions || [], discovery: leadsData?.discovery || [] }
      );
    } catch {
      setError("Something went wrong");
    }
    setLoading(false);
  };

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
};

export default AdminGate;