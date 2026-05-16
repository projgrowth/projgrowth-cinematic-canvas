import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";

export function DiscoveryShell({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <>
    <Helmet><meta name="robots" content="noindex,nofollow" /></Helmet>
    <div style={{
      minHeight: "100vh",
      background: "hsl(240 6% 5%)",
      color: "hsl(40 10% 94%)",
      fontFamily: "'Outfit', system-ui, sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* dot grid */}
      <div style={{
        position: "fixed", inset: 0,
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
        backgroundSize: "24px 24px", pointerEvents: "none",
      }} />
      {/* emerald glow top-left */}
      <div style={{
        position: "fixed", top: "-20%", left: "-10%", width: "60vw", height: "60vw",
        background: "radial-gradient(circle, hsla(155, 42%, 49%, 0.12), transparent 60%)",
        pointerEvents: "none", filter: "blur(40px)",
      }} />
      {/* nm blue glow bottom-right */}
      <div style={{
        position: "fixed", bottom: "-30%", right: "-10%", width: "70vw", height: "70vw",
        background: "radial-gradient(circle, rgba(14,73,123,0.18), transparent 60%)",
        pointerEvents: "none", filter: "blur(40px)",
      }} />
      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: wide ? 1240 : 640,
        margin: "0 auto",
        padding: "48px 24px 80px",
      }}>
        {children}
      </div>
    </div>
  );
}
