import { useId, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import pgLogo from "@/assets/logos/pg-logo.png";
import golinowskiLogo from "@/assets/logos/golinowski-law.png";
import type { GatewayCopy } from "./gateways";

type State = "idle" | "checking" | "granted" | "pending";

const MESSAGES = {
  invalid: "Access code not recognized.",
  throttled: "Too many attempts. Please try again shortly.",
  unavailable: "Access is temporarily unavailable. Please try again shortly.",
};

/** Minimal loading state: pulsing client logo and a single quiet line. */
const LoadingScreen = ({ client, reduceMotion }: { client: string; reduceMotion: boolean }) => (
  <div className="flex flex-col items-center text-center" role="status" aria-live="polite">
    <div className="relative">
      {reduceMotion ? null : (
        <motion.span
          className="absolute inset-0 -m-6 rounded-full bg-accent/15 blur-2xl"
          initial={{ opacity: 0.35, scale: 0.9 }}
          animate={{ opacity: [0.35, 0.65, 0.35], scale: [0.9, 1.08, 0.9] }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
        />
      )}
      <motion.img
        src={golinowskiLogo}
        alt={`${client} logo`}
        width={915}
        height={621}
        className="relative w-52 sm:w-64 md:w-72 h-auto"
        animate={reduceMotion ? undefined : { opacity: [0.85, 1, 0.85], scale: [0.985, 1, 0.985] }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
      />
    </div>
    <p className="mt-10 text-mute">Loading your review…</p>
  </div>
);


/**
 * Private, unlinked gateway for a single client review. The access code and
 * the review destination are validated and returned server-side only; nothing
 * protected is present in this bundle or in the unauthenticated payload.
 */
const ReviewGateway = ({ gateway }: { gateway: GatewayCopy }) => {
  const [code, setCode] = useState("");
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const reduceMotion = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "checking" || !code.trim()) return;
    setState("checking");
    setError("");

    try {
      const { data, error: fnError } = await supabase.functions.invoke(
        "client-review-access",
        { body: { slug: gateway.slug, code } },
      );

      if (fnError || !data) {
        const status = (fnError as { context?: { status?: number } })?.context?.status;
        setError(status === 429 ? MESSAGES.throttled : status === 401 ? MESSAGES.invalid : MESSAGES.unavailable);
        setState("idle");
        setCode("");
        return;
      }

      if (data.status === "ready" && typeof data.url === "string") {
        setState("granted");
        window.setTimeout(
          () => window.location.replace(data.url),
          reduceMotion ? 0 : 220,
        );
        return;
      }

      if (data.status === "pending") {
        setState("pending");
        return;
      }

      setError(MESSAGES.unavailable);
      setState("idle");
    } catch {
      setError(MESSAGES.unavailable);
      setState("idle");
      setCode("");
    }
  };

  const busy = state === "checking" || state === "granted";

  return (
    <div className="page-canvas dot-grid min-h-screen flex flex-col">
      <Helmet>
        <title>Private Client Review</title>
        <meta name="robots" content="noindex, nofollow, noarchive" />
        <meta name="googlebot" content="noindex, nofollow" />
      </Helmet>

      {/* Masthead */}
      <header className="container-site pt-8 md:pt-12">
        <div className="flex items-center gap-3">
          <img src={pgLogo} alt="" aria-hidden="true" className="h-6 w-auto opacity-90" />
          <span className="eyebrow text-text">Project Growth</span>
        </div>
      </header>

      <main className="container-site flex-1 flex items-center justify-center py-12 md:py-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          {state === "pending" ? (
            <LoadingScreen client={gateway.client} reduceMotion={!!reduceMotion} />
          ) : state === "granted" ? (
            <div className="flex items-center justify-center gap-3 text-mute">
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              <span role="status">Opening your review…</span>
            </div>
          ) : (
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Identity column */}
              <div className="lg:col-span-6">
                <p className="eyebrow-mute">Private Client Review</p>
                <div className="mt-6 border-t border-line pt-6">
                  <h1 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight text-text">
                    {gateway.client}
                  </h1>
                  <p className="font-display text-xl md:text-2xl text-mute mt-2">
                    {gateway.project}
                  </p>
                </div>
              </div>

              {/* Action column */}
              <div className="lg:col-span-5 lg:col-start-8 w-full">
                <form onSubmit={handleSubmit} noValidate className="border-t border-line pt-6">
                  <p className="text-mute leading-relaxed mb-8 max-w-md">
                    Enter your private access code to continue.
                  </p>

                  <label htmlFor={inputId} className="eyebrow-mute block mb-3">
                    Access Code
                  </label>
                  <input
                    id={inputId}
                    name="access-code"
                    type="password"
                    autoComplete="current-password"
                    autoCapitalize="off"
                    spellCheck={false}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    disabled={busy}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : undefined}
                    className={`w-full min-h-[48px] bg-transparent border-b text-text text-[16px] tracking-[0.25em] py-3 outline-none transition-colors duration-200 focus:border-accent disabled:opacity-50 ${
                      error ? "border-destructive" : "border-line hover:border-mute"
                    }`}
                  />

                  <div aria-live="polite" className="min-h-[1.5rem] mt-3">
                    {error && (
                      <p id={errorId} role="alert" className="text-sm text-destructive">
                        {error}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={busy || !code.trim()}
                    className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-3 min-h-[48px] px-7 border border-line text-text eyebrow hover:border-accent hover:text-accent focus-ring transition-colors duration-200 disabled:opacity-40 disabled:hover:border-line disabled:hover:text-text"
                  >
                    {state === "checking" ? (
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    ) : (
                      <>
                        Enter Review
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}
        </motion.div>
      </main>

      <footer className="container-site pb-8 md:pb-12">
        <div className="border-t border-line pt-6">
          <p className="eyebrow-faint">Project Growth / Client Experience</p>
        </div>
      </footer>
    </div>
  );
};

export default ReviewGateway;
