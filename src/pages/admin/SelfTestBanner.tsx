import { useState } from "react";
import { Check, Loader2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { SelfTestResult } from "./types";

const SelfTestBanner = ({ credentials }: { credentials: { email: string; password: string } }) => {
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<SelfTestResult | null>(null);

  const run = async () => {
    setRunning(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("admin-self-test", { body: credentials });
      if (error) {
        setResult({ ok: false, steps: [], error: error.message });
      } else {
        setResult(data);
      }
    } catch (e: any) {
      setResult({ ok: false, steps: [], error: e?.message || "Failed" });
    }
    setRunning(false);
  };

  return (
    <>
      <button
        onClick={run}
        disabled={running}
        className="text-xs px-3 py-2 border border-line rounded-lg text-mute hover:text-text hover:border-accent/40 transition-colors disabled:opacity-50 flex items-center gap-2"
        title="Insert a synthetic _TEST_VERIFY row, check the new columns are present, and clean it up."
      >
        {running ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
        {running ? "Running self-test…" : "Run submission self-test"}
      </button>
      {result && (
        <div
          className={`mt-6 mb-6 p-4 rounded-lg border text-sm ${
            result.ok ? "border-success/40 bg-success/5" : "border-destructive/40 bg-destructive/5"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium text-text">
              {result.ok ? "✓ Self-test passed" : "✗ Self-test failed"}
            </div>
            <button onClick={() => setResult(null)} className="text-xs text-mute hover:text-text">
              Dismiss
            </button>
          </div>
          {result.error && <div className="text-destructive text-xs mb-2">{result.error}</div>}
          <ul className="space-y-1 text-xs">
            {result.steps.map((s, i) => (
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
    </>
  );
};

export default SelfTestBanner;