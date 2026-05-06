// Brand mockup system — derives a BrandSpec from form, renders SVG surfaces.
import React from "react";

export const NM_BLUE = "#0E497B";
export const EMERALD = "#44A078";

export type BrandSpec = {
  dba: string;          // "Ramos Wealth"
  word: string;         // "RAMOS" (first word, upper)
  short: string;        // "Ramos"
  typo: "serif" | "sans";
  density: "minimal" | "rich";
  tone: "established" | "forward";
  mood: string | null;
  mark: "wordmark" | "icon";
  accent: string;       // hex
  nmLean: "nm_lead" | "equal";
};

const wm = (n: string) => (n?.trim().split(/\s+/)[0] || "YOUR DBA").toUpperCase();
const sn = (n: string) => n?.trim().split(/\s+/)[0] || "Your DBA";

export function deriveSpec(form: any, fallbackName: string): BrandSpec {
  const dba = (form?.dbaName || fallbackName || "Your DBA").trim();
  return {
    dba,
    word: wm(dba),
    short: sn(dba),
    typo: form?.typo || "serif",
    density: form?.density || "minimal",
    tone: form?.tone || "established",
    mood: form?.mood || null,
    mark: form?.mark || "wordmark",
    accent: form?.accent || "#FFB81C",
    nmLean: form?.nmLean || "equal",
  };
}

export function fontFor(s: BrandSpec) {
  return s.typo === "serif" ? "'Cormorant Garamond', Georgia, serif" : "'Outfit', system-ui, sans-serif";
}
export function weightFor(s: BrandSpec) {
  return s.tone === "established" ? 700 : 300;
}
export function letterFor(s: BrandSpec) {
  return s.typo === "sans" ? "0.18em" : "0.04em";
}

// ============================================================
// Lockup — used inside every mockup
// ============================================================
export function Lockup({ s, color = "#fff", size = 1, hideNM = false }: { s: BrandSpec; color?: string; size?: number; hideNM?: boolean }) {
  const fs = 18 * size;
  const showIcon = s.mark === "icon";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 * size }}>
      {showIcon && (
        <div style={{ width: 22 * size, height: 22 * size, position: "relative", flexShrink: 0 }}>
          <div style={{ position: "absolute", inset: 0, background: s.accent, borderRadius: 3 * size, opacity: .25 }} />
          <div style={{ position: "absolute", inset: 4 * size, background: s.accent, borderRadius: 2 * size, opacity: .55 }} />
          <div style={{ position: "absolute", inset: 9 * size, background: s.accent, borderRadius: 1 }} />
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
        <div style={{ fontFamily: fontFor(s), fontWeight: weightFor(s), fontSize: fs, color, letterSpacing: letterFor(s) }}>
          {s.typo === "sans" ? s.word : s.short}
        </div>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: fs * 0.42, color, opacity: 0.55, letterSpacing: "0.22em", marginTop: 3 * size }}>
          FINANCIAL ADVISORS
        </div>
      </div>
      {!hideNM && (
        <>
          <div style={{ width: 1, height: 26 * size, background: color, opacity: 0.18, marginLeft: 4 * size }} />
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: fs * 0.36, color, opacity: 0.55, letterSpacing: "0.12em", lineHeight: 1.25 }}>
            NORTHWESTERN<br />MUTUAL
          </div>
        </>
      )}
    </div>
  );
}

// ============================================================
// Business Card
// ============================================================
export function BusinessCard({ s, size = 1, name = "" }: { s: BrandSpec; size?: number; name?: string }) {
  const W = 360 * size, H = 210 * size;
  const dark = s.tone === "established";
  const bg = dark ? NM_BLUE : "#f7f5f0";
  const fg = dark ? "#f5f0e8" : "#1a1a1a";
  return (
    <div style={{
      width: W, height: H, background: bg, borderRadius: 10 * size,
      padding: 24 * size, position: "relative", overflow: "hidden",
      boxShadow: "0 30px 60px -20px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.04)",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      fontFamily: fontFor(s),
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3 * size, background: s.accent, opacity: .9 }} />
      <Lockup s={s} color={fg} size={size * 0.85} />
      <div>
        {name && <div style={{ fontSize: 13 * size, color: fg, fontWeight: weightFor(s), fontFamily: fontFor(s) }}>{name}</div>}
        <div style={{ fontSize: 9 * size, color: fg, opacity: 0.55, fontFamily: "'Outfit',sans-serif", letterSpacing: "0.12em", marginTop: 4 * size }}>
          FINANCIAL ADVISOR · NORTHWESTERN MUTUAL
        </div>
        <div style={{ height: 1, background: s.accent, opacity: 0.3, margin: `${10 * size}px 0 ${8 * size}px`, width: "30%" }} />
        <div style={{ fontSize: 9 * size, color: fg, opacity: 0.7, fontFamily: "'Outfit',sans-serif", letterSpacing: "0.05em" }}>
          407 555 0100 · {s.short.toLowerCase()}@nm.com
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Laptop Browser
// ============================================================
export function LaptopBrowser({ s, size = 1, vision = "" }: { s: BrandSpec; size?: number; vision?: string }) {
  const W = 480 * size;
  const H = 300 * size;
  return (
    <div style={{ width: W, position: "relative", filter: "drop-shadow(0 30px 50px rgba(0,0,0,.5))" }}>
      <div style={{ background: "#1a1d22", borderRadius: `${10 * size}px ${10 * size}px 4px 4px`, padding: 6 * size, paddingBottom: 0 }}>
        <div style={{ background: "#0f1115", borderRadius: 6 * size, overflow: "hidden", height: H }}>
          {/* chrome */}
          <div style={{ height: 22 * size, background: "#16191e", display: "flex", alignItems: "center", padding: `0 ${10 * size}px`, gap: 5 * size }}>
            {["#ff5f56","#ffbd2e","#27c93f"].map(c => <div key={c} style={{ width: 8 * size, height: 8 * size, borderRadius: "50%", background: c, opacity: .85 }} />)}
            <div style={{ flex: 1, marginLeft: 12 * size, background: "#0a0c0f", borderRadius: 4 * size, height: 14 * size, fontSize: 8 * size, color: "#666", display: "flex", alignItems: "center", padding: `0 ${8 * size}px`, fontFamily: "'Outfit',sans-serif" }}>
              {s.short.toLowerCase().replace(/\s+/g,"")}.nm.com
            </div>
          </div>
          {/* page */}
          <div style={{ background: "linear-gradient(180deg, #0a0d11, #050709)", height: H - 22 * size, padding: 18 * size, position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 26 * size }}>
              <Lockup s={s} color="#f5f0e8" size={size * 0.55} />
              <div style={{ display: "flex", gap: 14 * size, fontFamily: "'Outfit',sans-serif", fontSize: 8 * size, color: "rgba(245,240,232,.55)", letterSpacing: "0.1em" }}>
                <span>ABOUT</span><span>APPROACH</span><span>CONNECT</span>
              </div>
            </div>
            <div style={{ fontFamily: fontFor(s), fontSize: 28 * size, color: "#f5f0e8", fontWeight: weightFor(s), lineHeight: 1.1, marginBottom: 10 * size, maxWidth: "78%" }}>
              {s.tone === "established" ? `Wealth, planned with ${s.short}.` : `Plan forward with ${s.short}.`}
            </div>
            <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10 * size, color: "rgba(245,240,232,.6)", maxWidth: "65%", lineHeight: 1.5 }}>
              {vision ? `"${vision.slice(0, 100)}"` : "A boutique practice of Northwestern Mutual, built on relationships that last decades."}
            </div>
            <div style={{ display: "inline-block", marginTop: 16 * size, padding: `${7 * size}px ${14 * size}px`, background: s.accent, borderRadius: 4 * size, fontFamily: "'Outfit',sans-serif", fontSize: 9 * size, color: "#0a0d11", fontWeight: 600, letterSpacing: "0.1em" }}>
              SCHEDULE A CONVERSATION →
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: 8 * size, background: "linear-gradient(180deg,#1a1d22,#0a0c0f)", borderRadius: `0 0 ${20 * size}px ${20 * size}px`, marginLeft: -10 * size, marginRight: -10 * size }} />
    </div>
  );
}

// ============================================================
// Phone (LinkedIn-style profile)
// ============================================================
export function Phone({ s, size = 1, name = "" }: { s: BrandSpec; size?: number; name?: string }) {
  const W = 200 * size, H = 400 * size;
  return (
    <div style={{ width: W, height: H, background: "#1a1d22", borderRadius: 28 * size, padding: 10 * size, position: "relative", boxShadow: "0 30px 60px -20px rgba(0,0,0,.55)" }}>
      <div style={{ position: "absolute", top: 16 * size, left: "50%", transform: "translateX(-50%)", width: 50 * size, height: 5 * size, background: "#0a0c0f", borderRadius: 100, zIndex: 2 }} />
      <div style={{ background: "#0f1115", borderRadius: 22 * size, height: "100%", overflow: "hidden", position: "relative" }}>
        {/* cover */}
        <div style={{ height: 80 * size, background: `linear-gradient(135deg, ${NM_BLUE}, ${s.accent}55)` }} />
        {/* avatar */}
        <div style={{ position: "absolute", top: 50 * size, left: "50%", transform: "translateX(-50%)", width: 60 * size, height: 60 * size, borderRadius: "50%", background: NM_BLUE, border: `3px solid #0f1115`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fontFor(s), fontSize: 22 * size, color: "#fff", fontWeight: weightFor(s) }}>
          {s.short.charAt(0)}
        </div>
        <div style={{ padding: `${36 * size}px ${14 * size}px ${14 * size}px`, textAlign: "center" }}>
          <div style={{ fontFamily: fontFor(s), fontSize: 14 * size, color: "#f5f0e8", fontWeight: weightFor(s), marginBottom: 2 }}>{name || `${s.short} Advisor`}</div>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9 * size, color: "rgba(245,240,232,.6)", marginBottom: 3 * size }}>Financial Advisor at {s.short}</div>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 8 * size, color: "rgba(245,240,232,.4)", letterSpacing: "0.08em" }}>Northwestern Mutual · Orlando, FL</div>
          <div style={{ background: s.accent, color: "#0a0d11", fontFamily: "'Outfit',sans-serif", fontSize: 9 * size, padding: `${6 * size}px`, borderRadius: 100, marginTop: 12 * size, fontWeight: 600, letterSpacing: "0.05em" }}>
            Connect
          </div>
          <div style={{ marginTop: 16 * size, padding: 10 * size, background: "rgba(255,255,255,.03)", borderRadius: 8 * size, textAlign: "left", fontFamily: "'Outfit',sans-serif", fontSize: 8 * size, color: "rgba(245,240,232,.55)", lineHeight: 1.5 }}>
            Helping professionals build the kind of plan their future selves will thank them for.
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Office Signage
// ============================================================
export function Signage({ s, size = 1 }: { s: BrandSpec; size?: number }) {
  const W = 480 * size, H = 240 * size;
  return (
    <div style={{
      width: W, height: H, borderRadius: 8 * size, position: "relative", overflow: "hidden",
      background: "linear-gradient(135deg, #2a2f36 0%, #15181d 50%, #0a0d11 100%)",
      boxShadow: "0 30px 60px -20px rgba(0,0,0,.5)"
    }}>
      {/* concrete texture */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,.04), transparent 60%)" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,.02) 1px, transparent 0)", backgroundSize: "8px 8px" }} />
      {/* dimensional letters */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
        <div style={{
          fontFamily: fontFor(s),
          fontWeight: weightFor(s),
          fontSize: 56 * size,
          color: "#f5f0e8",
          letterSpacing: s.typo === "sans" ? "0.12em" : "0.02em",
          textShadow: `2px 2px 0 ${s.accent}88, 4px 4px 12px rgba(0,0,0,.6)`,
          lineHeight: 1,
        }}>
          {s.typo === "sans" ? s.word : s.short}
        </div>
        <div style={{ width: 80 * size, height: 1, background: s.accent, margin: `${10 * size}px auto`, opacity: .8 }} />
        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11 * size, color: "rgba(245,240,232,.55)", letterSpacing: "0.3em" }}>
          NORTHWESTERN MUTUAL
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Mini card — used inside option tiles
// ============================================================
export function MiniCard({ s, label, sub, accentOverride, fontOverride, weightOverride }: {
  s: BrandSpec; label?: string; sub?: string;
  accentOverride?: string; fontOverride?: string; weightOverride?: number;
}) {
  const dark = s.tone === "established";
  const bg = dark ? NM_BLUE : "#f7f5f0";
  const fg = dark ? "#f5f0e8" : "#1a1a1a";
  const accent = accentOverride || s.accent;
  return (
    <div style={{
      background: bg, borderRadius: 8, padding: "14px 16px", height: 92,
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: accent }} />
      <div style={{
        fontFamily: fontOverride || fontFor(s),
        fontWeight: weightOverride || weightFor(s),
        fontSize: 17, color: fg, letterSpacing: s.typo === "sans" ? "0.18em" : "0.02em",
      }}>
        {s.typo === "sans" ? s.word : s.short}
      </div>
      <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 8, color: fg, opacity: .55, letterSpacing: "0.2em" }}>
        FINANCIAL ADVISORS · NM
      </div>
    </div>
  );
}

// ============================================================
// Storefront — exterior building signage with realistic depth
// ============================================================
export function Storefront({ s, size = 1 }: { s: BrandSpec; size?: number }) {
  const W = 480 * size, H = 280 * size;
  return (
    <div style={{
      width: W, height: H, borderRadius: 8 * size, position: "relative", overflow: "hidden",
      boxShadow: "0 30px 60px -20px rgba(0,0,0,.55)",
    }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #1a2330 0%, #2a3442 35%, #3a4452 60%, #1a1d22 100%)" }} />
      <div style={{ position: "absolute", right: 0, top: "55%", bottom: 0, left: "55%", background: "linear-gradient(180deg, rgba(255,184,28,0.12), rgba(255,184,28,0.04))", filter: "blur(2px)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "55%", background: "linear-gradient(180deg, #1c2128 0%, #14181d 100%)" }} />
      {[0.15, 0.4, 0.65, 0.9].map((x, i) => (
        <div key={i} style={{ position: "absolute", left: `${x * 100}%`, bottom: 0, top: "45%", width: 1, background: "rgba(255,255,255,0.04)" }} />
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: "38%", height: 64 * size, background: "linear-gradient(180deg, #0d1015, #060709)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 6px 20px rgba(0,0,0,0.6)" }}>
        <div style={{
          fontFamily: fontFor(s),
          fontWeight: weightFor(s),
          fontSize: 30 * size,
          color: "#f5f0e8",
          letterSpacing: s.typo === "sans" ? "0.18em" : "0.03em",
          textShadow: `0 0 12px ${s.accent}66, 0 0 30px ${s.accent}33, 1px 1px 0 rgba(0,0,0,0.8), 2px 2px 4px rgba(0,0,0,0.6)`,
          display: "flex", alignItems: "center", gap: 14 * size,
        }}>
          <span>{s.typo === "sans" ? s.word : s.short}</span>
          <span style={{ width: 1, height: 28 * size, background: "rgba(245,240,232,0.25)" }} />
          <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9 * size, color: "rgba(245,240,232,0.65)", letterSpacing: "0.28em", lineHeight: 1.2, textShadow: "none" }}>NORTHWESTERN<br />MUTUAL</span>
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 24 * size, background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.5))" }} />
    </div>
  );
}

// ============================================================
// Disclaimer banner — used above all mockups
// ============================================================
export function MockupDisclaimer({ compact = false, style = {} }: { compact?: boolean; style?: React.CSSProperties }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: compact ? "6px 10px" : "8px 14px",
      borderRadius: 100,
      background: "rgba(255,184,28,0.06)",
      border: "1px solid rgba(255,184,28,0.18)",
      fontFamily: "'Outfit',sans-serif",
      fontSize: compact ? 9.5 : 10.5,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "rgba(255,184,28,0.85)",
      ...style,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,184,28,0.7)" }} />
      Visual reference · not your final logo
    </div>
  );
}
