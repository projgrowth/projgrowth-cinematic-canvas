import { useEffect, useId, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import pgLogo from "@/assets/logos/pg-logo.png";
import type { GatewayCopy } from "./gateways";

type State = "idle" | "checking" | "granted" | "pending";

const MESSAGES = {
  invalid: "Access code not recognized.",
  throttled: "Too many attempts. Please try again shortly.",
  unavailable: "Access is temporarily unavailable. Please try again shortly.",
};

const BUILD_STEPS = [
  "Compiling site build",
  "Optimizing images and type",
  "Publishing to the network",
  "Final verification",
];

/** Presentational build sequence shown while the review destination is prepared. */
const BuildProgress = ({ body, reduceMotion }: { body: string; reduceMotion: boolean }) => {
  // Hold on the third step ("Publishing to the network") — never claim completion.
  const [active, setActive] = useState(reduceMotion ? 2 : 0);

  useEffect(() => {
    if (reduceMotion) return;
    const timers = [
      window.setTimeout(() => setActive(1), 2600),
      window.setTimeout(() => setActive(2), 6200),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [reduceMotion]);

  const progress = [24, 58, 90][Math.min(active, 2)];

  return (
    <div className="border-t border-line pt-6">
      <div className="flex items-center gap-4 mb-8">
        <span className="relative flex h-3 w-3">
          {reduceMotion ? null : (
            <motion.span
              className="absolute inline-flex h-full w-full rounded-full bg-accent"
              initial={{ opacity: 0.6, scale: 1 }}
              animate={{ opacity: 0, scale: 2.4 }}
              transition={{ duration: 2.4, ease: "easeOut", repeat: Infinity }}
            />
          )}
          <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
        </span>
        <span className="eyebrow text-text">Preparing your preview</span>
      </div>

      <ul className="max-w-md" role="status" aria-live="polite">
        {BUILD_STEPS.map((step, i) => {
          const done = i < active;
          const current = i === active;
          return (
            <li
              key={step}
              className="flex items-baseline justify-between gap-6 border-b border-line/60 py-3"
            >
              <span className={done || current ? "text-text" : "text-mute/60"}>{step}</span>
              <span
                className={`eyebrow-faint shrink-0 ${
                  current ? "text-accent" : done ? "text-mute" : "text-mute/50"
                }`}
              >
                {done ? "Done" : current ? "In progress" : "Queued"}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 h-px w-full bg-line" aria-hidden="true">
        <div
          className="h-px bg-accent"
          style={{
            width: `${progress}%`,
            transition: reduceMotion ? "none" : "width 1.8s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </div>

      <p className="text-mute leading-relaxed max-w-md mt-6">{body}</p>
    </div>
  );
};


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

      <main className="container-site flex-1 flex items-center py-12 md:py-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Identity column */}
          <div className="lg:col-span-6">
            <p className="eyebrow-mute">Private Client Review</p>
            <div className="mt-6 border-t border-line pt-6">
              <h1 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight text-text">
                {state === "pending" ? gateway.client : gateway.client}
              </h1>
              <p className="font-display text-xl md:text-2xl text-mute mt-2">
                {state === "pending" ? gateway.holdingTitle : gateway.project}
              </p>
            </div>
          </div>

          {/* Action column */}
          <div className="lg:col-span-5 lg:col-start-8 w-full">
            {state === "pending" ? (
              <BuildProgress body={gateway.holdingBody} reduceMotion={!!reduceMotion} />
            ) : state === "granted" ? (
              <div className="border-t border-line pt-6 flex items-center gap-3 text-mute">
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                <span role="status">Opening your review…</span>
              </div>
            ) : (
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
            )}
          </div>
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
