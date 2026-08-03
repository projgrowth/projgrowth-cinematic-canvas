import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import AmbientGlow from "@/components/AmbientGlow";

/**
 * Discovery flow canvas. Uses the shared page canvas, dot grid, and ambient
 * glow primitives so the guided flow matches the rest of the design system.
 */
export function DiscoveryShell({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className="page-canvas font-sans">
        <div className="dot-grid fixed inset-0 pointer-events-none" aria-hidden="true" />
        <AmbientGlow variant="page" className="fixed inset-0 -z-0" />
        <div
          className="relative z-10 mx-auto w-full section-sm px-6"
          style={{ maxWidth: wide ? "var(--container-max)" : "40rem" }}
        >
          {children}
        </div>
      </div>
    </>
  );
}
