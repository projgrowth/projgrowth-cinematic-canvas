import { motion } from "framer-motion";
import { NM_BLUE, EMERALD } from "./mockups";

export const C = {
  surface: "rgba(255,255,255,0.025)",
  surfaceHi: "rgba(255,255,255,0.05)",
  border: "rgba(255,255,255,0.08)",
  borderHi: "rgba(255,255,255,0.18)",
  ring: "rgba(255,184,28,0.35)",
  text: "hsl(40 10% 94%)",
  mute: "hsl(240 4% 60%)",
  faint: "hsl(240 4% 40%)",
};

export function OCard({ sel, onClick, children, style = {} }: any) {
  return (
    <button onClick={onClick} style={{
      background: sel ? "rgba(14,73,123,0.18)" : C.surface,
      border: `1px solid ${sel ? NM_BLUE : C.border}`,
      boxShadow: sel ? `0 0 0 4px rgba(14,73,123,0.12), 0 8px 30px -10px rgba(68,160,120,0.25)` : "none",
      borderRadius: 12, padding: "14px 18px", cursor: "pointer",
      width: "100%", textAlign: "left", fontFamily: "inherit",
      color: C.text, marginBottom: 10, display: "block", transition: "all .2s ease", ...style
    }}>{children}</button>
  );
}
export function Chip({ on, onClick, children, danger = false }: any) {
  return (
    <button onClick={onClick} style={{
      display: "inline-block", padding: "8px 14px", borderRadius: 100,
      border: `1px solid ${on ? (danger ? "#9c3e3e" : NM_BLUE) : C.border}`,
      cursor: "pointer", fontSize: 13, margin: 3, fontFamily: "inherit",
      color: on ? "#fff" : C.mute,
      background: on ? (danger ? "rgba(156,62,62,0.4)" : "rgba(14,73,123,0.5)") : "transparent",
      transition: "all .2s ease",
    }}>{children}</button>
  );
}
export function Q({ label, sub, why, host, children }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      {host && (
        <div style={{ fontSize: 12, color: EMERALD, marginBottom: 14, fontStyle: "italic", letterSpacing: ".02em", opacity: .9 }}>
          — {host}
        </div>
      )}
      <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 28, fontWeight: 300, color: C.text, marginBottom: 10, lineHeight: 1.2, letterSpacing: "-0.01em" }}>{label}</h2>
      {sub && <p style={{ fontSize: 14, color: C.mute, marginBottom: why ? 6 : 24, lineHeight: 1.6 }}>{sub}</p>}
      {why && <p style={{ fontSize: 11, color: C.faint, marginBottom: 22, fontStyle: "italic", letterSpacing: ".02em" }}>Why we ask: {why}</p>}
      {children}
    </motion.div>
  );
}
export const TA = (props: any) => (
  <textarea {...props} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 16px", fontSize: 14, fontFamily: "inherit", color: C.text, resize: "none", outline: "none", lineHeight: 1.6, ...props.style }} />
);
export const TxtInput = (props: any) => (
  <input {...props} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 15px", fontSize: 14, fontFamily: "inherit", color: C.text, outline: "none", ...props.style }} />
);

// Mockup-tile button — used everywhere a choice has a visual
export function MockTile({ sel, onClick, label, sub, children, recommended }: any) {
  return (
    <button onClick={onClick} style={{
      borderRadius: 14, cursor: "pointer",
      border: `1px solid ${sel ? NM_BLUE : C.border}`,
      background: sel ? "rgba(14,73,123,0.12)" : C.surface,
      boxShadow: sel ? `0 0 0 3px rgba(14,73,123,0.18), 0 12px 40px -12px rgba(68,160,120,0.3)` : "none",
      padding: 14, textAlign: "left", fontFamily: "inherit", flex: 1, position: "relative",
      transition: "all .2s ease", color: C.text,
    }}>
      {recommended && <div style={{ position: "absolute", top: 8, right: 8, background: EMERALD, color: "#0a0d11", fontSize: 9, padding: "3px 7px", borderRadius: 4, letterSpacing: ".06em", fontWeight: 600 }}>RECOMMENDED</div>}
      {children}
      <div style={{ fontSize: 14, fontWeight: 500, color: C.text, marginTop: 12 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: C.mute, marginTop: 3, lineHeight: 1.4 }}>{sub}</div>}
    </button>
  );
}
