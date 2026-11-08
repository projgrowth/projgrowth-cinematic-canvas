import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Loader2, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useMachine } from "@/lib/useMachine";
import {
  ADMIN_GATE_ERRORS,
  adminGateBusy,
  adminGateTransition,
  initialAdminGate,
} from "@/lib/machines/adminGate";
import type { Discovery, Submission } from "./types";

type Props = {
  onAuthenticated: (creds: { email: string; password: string }, data: { submissions: Submission[]; discovery: Discovery[] }) => void;
};

const AdminGate = ({ onAuthenticated }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gate, send] = useMachine(initialAdminGate, adminGateTransition);
  const busy = adminGateBusy(gate);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const attempt = send({ type: "submit" });
    if (attempt.previous.status === "verifying" || attempt.previous.status === "loadingLeads") return;
    if (attempt.state.status !== "verifying") return;

    try {
      const { data, error: fnError } = await supabase.functions.invoke("admin-verify", {
        body: { email, password },
      });
      if (fnError || !data?.authenticated) {
        send({ type: "rejected", message: ADMIN_GATE_ERRORS.invalid });
        return;
      }
      const verified = send({ type: "verified" });
      if (verified.state.status !== "loadingLeads") return;
      const { data: leadsData, error: leadsError } = await supabase.functions.invoke("admin-leads", {
        body: { email, password },
      });
      if (leadsError) {
        send({ type: "rejected", message: ADMIN_GATE_ERRORS.leads });
        return;
      }
      onAuthenticated(
        { email, password },
        { submissions: leadsData?.submissions || [], discovery: leadsData?.discovery || [] }
      );
    } catch {
      send({ type: "rejected", message: ADMIN_GATE_ERRORS.unexpected });
    }
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
          disabled={busy}
          className="input-field"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="current-password"
          disabled={busy}
          className="input-field"
          required
        />
        {gate.status === "rejected" && <p className="text-sm text-destructive">{gate.message}</p>}
        <button
          type="submit"
          disabled={busy}
          aria-busy={busy}
          className="w-full px-4 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "View Leads"}
          {gate.status === "verifying" && <span className="sr-only">Checking access</span>}
          {gate.status === "loadingLeads" && <span className="sr-only">Loading leads</span>}
        </button>
      </form>
    </div>
  );
};

export default AdminGate;