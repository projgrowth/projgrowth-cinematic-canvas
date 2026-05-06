import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

const NM = "#0E497B";
const NMbg = "#e8f0f8";

// ============================================================
// Constants
// ============================================================
const ACC = [
  { name: "Gold", hex: "#FFB81C", vibe: "Confident & Warm" },
  { name: "Teal", hex: "#24A097", vibe: "Modern & Fresh" },
  { name: "Orange", hex: "#F36F35", vibe: "Bold & Dynamic" },
  { name: "Sky blue", hex: "#83D4F1", vibe: "Approachable & Open" },
  { name: "Blue only", hex: "#0E497B", vibe: "Classic & Authoritative" }
];

// Tile previews now key on the DBA name (falls back to person's first name, then placeholder).
const wm = (n: string) => (n?.trim().split(/\s+/)[0] || "YOUR DBA").toUpperCase();
const sn = (n: string) => n?.trim().split(/\s+/)[0] || "Your DBA";

const MOODS = [
  { id: "classic", name: "Classic authority", desc: "Established, commanding, trusted",
    Preview: ({ n }: { n: string }) => (
      <div style={{ background: "#0E497B", borderRadius: 6, padding: "10px 12px", height: 72, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: 7 }}>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 11, fontWeight: 700, color: "#F5F0E8", letterSpacing: "1.5px" }}>{wm(n)}</div>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 7, color: "rgba(245,240,232,.5)", letterSpacing: "2px", marginTop: 2 }}>FINANCIAL</div>
        </div>
      </div>
    ) },
  { id: "modern", name: "Modern precision", desc: "Clean, geometric, sophisticated",
    Preview: ({ n }: { n: string }) => (
      <div style={{ background: "#f8f9fb", border: "0.5px solid #dde3ea", borderRadius: 6, padding: "10px 12px", height: 72, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ width: 16, height: 1.5, background: "#0E497B", marginBottom: 7 }} />
        <div style={{ fontFamily: "system-ui,sans-serif", fontSize: 10, fontWeight: 300, color: "#111", letterSpacing: "4px" }}>{wm(n)}</div>
        <div style={{ fontFamily: "system-ui,sans-serif", fontSize: 6.5, color: "#999", letterSpacing: "2px", marginTop: 2 }}>FINANCIAL</div>
      </div>
    ) },
  { id: "warm", name: "Warm advisor", desc: "Approachable, human, partner-first",
    Preview: ({ n }: { n: string }) => (
      <div style={{ background: "#FDF8F0", border: "0.5px solid #E8D5B0", borderRadius: 6, padding: "10px 12px", height: 72, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontFamily: "Georgia,serif", fontSize: 14, color: "#2C4A6E", marginBottom: 2 }}>{sn(n)}</div>
        <div style={{ fontFamily: "system-ui,sans-serif", fontSize: 7, color: "#FFB81C", letterSpacing: "2px", fontWeight: 600 }}>FINANCIAL</div>
      </div>
    ) },
  { id: "luxury", name: "Understated luxury", desc: "Quiet, refined, deliberately restrained",
    Preview: ({ n }: { n: string }) => (
      <div style={{ background: "#FAFAF8", border: "0.5px solid #DDDDD8", borderRadius: 6, padding: "10px 12px", height: 72, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <div style={{ fontFamily: "Georgia,serif", fontSize: 9, color: "#3a3a3a", letterSpacing: "5px", fontWeight: 300 }}>{wm(n)}</div>
        <div style={{ width: 22, height: 0.5, background: "#bbb", margin: "4px 0" }} />
        <div style={{ fontFamily: "system-ui,sans-serif", fontSize: 6.5, color: "#bbb", letterSpacing: "3px" }}>FINANCIAL</div>
      </div>
    ) },
  { id: "bold", name: "Bold statement", desc: "Confident, forward, impossible to ignore",
    Preview: ({ n }: { n: string }) => (
      <div style={{ background: "#141824", borderRadius: 6, padding: "10px 12px", height: 72, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontFamily: "system-ui,sans-serif", fontSize: 16, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" }}>{wm(n)}</div>
        <div style={{ fontFamily: "system-ui,sans-serif", fontSize: 7, color: "#FFB81C", letterSpacing: "3px", marginTop: 4 }}>FINANCIAL</div>
      </div>
    ) },
  { id: "heritage", name: "Trusted heritage", desc: "Balanced, enduring, credentialed",
    Preview: ({ n }: { n: string }) => (
      <div style={{ background: "#F5F5F2", border: "0.5px solid #C8C8C4", borderRadius: 6, padding: "10px 12px", height: 72, display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
        <div style={{ fontFamily: "Georgia,serif", fontSize: 12, fontWeight: 700, color: "#1a3a5c" }}>{sn(n)}</div>
        <div style={{ width: "100%", height: 0.5, background: "#1a3a5c", opacity: .2, margin: "3px 0" }} />
        <div style={{ fontFamily: "Georgia,serif", fontSize: 7, color: "#1a3a5c", letterSpacing: "2px", opacity: .55 }}>FINANCIAL ADVISORS</div>
      </div>
    ) }
];

// NM-compliant lockup options. Per NM brand guidelines the NM lockup must remain primary;
// these two control your DBA's relative visual weight inside that constraint.
const NM_LEAN = [
  { v: "nm_lead", l: "NM-led lockup", d: "Northwestern Mutual primary, your DBA presented as a named sub-brand.",
    Preview: ({ n }: { n: string }) => (
      <div style={{ background: "#f8f9fb", border: "0.5px solid #dde3ea", borderRadius: 6, padding: "8px 10px", height: 56, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: "#0E497B", lineHeight: 1.3 }}>Northwestern<br />Mutual</div>
        <div style={{ width: 0.5, height: 28, background: "#ccc" }} />
        <div style={{ fontSize: 7.5, color: "#aaa", lineHeight: 1.3 }}>{sn(n)}<br />Financial</div>
      </div>
    ) },
  { v: "equal", l: "Equal-weight lockup", d: "Both identities carry similar visual weight inside the NM-approved system.",
    Preview: ({ n }: { n: string }) => (
      <div style={{ background: "#f8f9fb", border: "0.5px solid #dde3ea", borderRadius: 6, padding: "8px 10px", height: 56, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <div style={{ fontSize: 8.5, fontWeight: 600, color: "#0E497B", textAlign: "center", lineHeight: 1.3 }}>Northwestern<br />Mutual</div>
        <div style={{ width: 0.5, height: 28, background: "#ccc" }} />
        <div style={{ fontSize: 8.5, fontWeight: 600, color: "#0E497B", textAlign: "center", lineHeight: 1.3 }}>{sn(n)}<br />Financial</div>
      </div>
    ) }
];

const DIFF = ["Depth of planning","Long-term relationships","Niche expertise","Proactive communication","Multi-discipline approach","Community presence","Team-based service","Technology-forward","White-glove experience","Speed & responsiveness"];
const AUD = ["Business owners","Pre-retirees & retirees","Young professionals","High-net-worth families","Medical professionals","All of the above"];
const ADJ = ["Knowledgeable","Responsive","Trustworthy","Proactive","Detail-oriented","Calm under pressure","Easy to talk to","Strategic","Consistent","Forward-thinking","Thorough","Personable"];
const TOUCH = ["Email signature","Website / digital","Print stationery","Office signage","Social media profile","Presentations & decks"];
const AXES: [string,string,string,string,string,string,string][] = [
  ["Head","head","heart","Heart","pHH","Analytical, data-driven","Relational, empathy-led"],
  ["Legacy","legacy","momentum","Momentum","pLM","Established heritage","Growth, forward-looking"],
  ["Quiet","quiet","bold","Bold","pQB","Understated, restrained","Confident, assertive"],
  ["Individual","individual","institution","Firm","pII","Boutique, personal feel","Professional, institutional"],
  ["Local","local","national","National","pLN","Community-rooted","National-caliber positioning"]
];
const AVOIDS = ["Generic / clip art","Overly complex","Cold / corporate","Too casual","Trendy (dates quickly)","Religious imagery","Political imagery","Too abstract","Overcrowded"];
const TRUTH = ["Must feel premium","Must feel approachable","Must feel timeless","Must feel distinctive","Must work at any size","Must be bold","Must be subtle","Must age gracefully","Must stand alone from NM"];

// Curated reference logos prospects can react to.
const REFS = [
  { id: "goldman", label: "Goldman Sachs", style: { fontFamily: "Georgia,serif", color: "#7A6A4F", fontWeight: 700, letterSpacing: "1px" } },
  { id: "vanguard", label: "VANGUARD", style: { fontFamily: "system-ui", color: "#96151D", fontWeight: 700, letterSpacing: "2px" } },
  { id: "fidelity", label: "Fidelity", style: { fontFamily: "Georgia,serif", color: "#3F8C2F", fontWeight: 600 } },
  { id: "morgan", label: "J.P. MORGAN", style: { fontFamily: "Georgia,serif", color: "#0E1F3D", fontWeight: 700, letterSpacing: "1.5px" } },
  { id: "apple", label: "", style: { fontFamily: "system-ui", color: "#000", fontWeight: 500 }, glyph: "" },
  { id: "rolex", label: "ROLEX", style: { fontFamily: "Georgia,serif", color: "#127749", fontWeight: 700, letterSpacing: "3px" } },
  { id: "edward", label: "Edward Jones", style: { fontFamily: "system-ui", color: "#005DAA", fontWeight: 600 } },
  { id: "blackrock", label: "BlackRock", style: { fontFamily: "system-ui", color: "#000", fontWeight: 700 } },
  { id: "ms", label: "Morgan Stanley", style: { fontFamily: "Georgia,serif", color: "#0066B2", fontWeight: 600, letterSpacing: ".5px" } },
  { id: "raymond", label: "RAYMOND JAMES", style: { fontFamily: "Georgia,serif", color: "#FFB81C", fontWeight: 700, letterSpacing: "1.5px" } },
  { id: "patek", label: "PATEK PHILIPPE", style: { fontFamily: "Georgia,serif", color: "#1a1a1a", fontWeight: 400, letterSpacing: "2px", fontSize: 10 } },
  { id: "stripe", label: "stripe", style: { fontFamily: "system-ui", color: "#635BFF", fontWeight: 700, letterSpacing: "-1px" } }
];

const SERVICES = [
  { v: "logo", l: "Logo & brand identity" },
  { v: "website", l: "Website" },
  { v: "content", l: "Content (video / photo)" },
  { v: "ads", l: "Paid ads & social" },
  { v: "print", l: "Print collateral / signage" },
  { v: "unsure", l: "Not sure yet — let's talk" }
];

const CONFIDENCE = [
  { v: "clear", l: "I know exactly what I want", d: "Just need someone to build it. Short path." },
  { v: "guided", l: "I have a direction but want guidance", d: "Medium path with the key strategic questions." },
  { v: "discovery", l: "I'm starting from scratch", d: "Walk me through the full discovery." }
];

// ============================================================
// Form
// ============================================================
type Form = {
  dbaStatus: string | null; dbaName: string; pitch: string; diff: string[]; diffCustom: string;
  audience: string[]; adjectives: string[]; nmLean: string | null; touchpoints: string[];
  pHH: string | null; pLM: string | null; pQB: string | null; pII: string | null; pLN: string | null;
  typo: string | null; density: string | null; tone: string | null; mood: string | null;
  mark: string | null; accent: string | null;
  inspiration: string; refLikes: string[]; refUploads: string[];
  avoid: string[]; vision: string; truth: string[];
  // service-specific
  websiteCurrent: string; websiteGoals: string;
  contentNeeds: string;
  adsBudget: string;
  printNeeds: string;
  timeline: string;
};
const blank = (): Form => ({
  dbaStatus: null, dbaName: "", pitch: "", diff: [], diffCustom: "",
  audience: [], adjectives: [], nmLean: null, touchpoints: [],
  pHH: null, pLM: null, pQB: null, pII: null, pLN: null,
  typo: null, density: null, tone: null, mood: null,
  mark: null, accent: null,
  inspiration: "", refLikes: [], refUploads: [],
  avoid: [], vision: "", truth: [],
  websiteCurrent: "", websiteGoals: "", contentNeeds: "", adsBudget: "", printNeeds: "", timeline: ""
});

// ============================================================
// Step plan based on confidence + services
// Each step is a string id; we render a switch on the id below.
// ============================================================
const LOGO_STEPS_FULL = [
  "dbaName", "pitch", "diff", "audience", "adjectives", "nmLean", "touchpoints",
  "personality", "typo", "density", "tone", "mood", "mark", "accent",
  "references", "avoid", "vision", "truth"
];
const LOGO_STEPS_GUIDED = [
  "dbaName", "diff", "audience", "adjectives", "nmLean", "touchpoints",
  "mood", "mark", "accent", "references", "vision", "truth"
];
const LOGO_STEPS_CLEAR = [
  "dbaName", "nmLean", "mark", "accent", "touchpoints", "references", "vision", "truth"
];

function buildPlan(confidence: string, services: string[]): string[] {
  const wantsLogo = services.includes("logo") || services.includes("unsure");
  let steps: string[] = [];
  if (wantsLogo) {
    steps = confidence === "clear" ? LOGO_STEPS_CLEAR
          : confidence === "guided" ? LOGO_STEPS_GUIDED
          : LOGO_STEPS_FULL;
  }
  if (services.includes("website")) steps.push("svc_website");
  if (services.includes("content")) steps.push("svc_content");
  if (services.includes("ads")) steps.push("svc_ads");
  if (services.includes("print")) steps.push("svc_print");
  steps.push("svc_timeline");
  return steps;
}

function engagementTier(confidence: string, services: string[]): string {
  const n = services.filter(s => s !== "unsure").length;
  if (confidence === "clear" && n <= 1) return "Light";
  if (confidence === "discovery" || n >= 3) return "Full Studio";
  return "Standard";
}

function genBrief(personName: string, f: Form, services: string[], confidence: string) {
  const dba = f.dbaName || `${sn(personName)} Financial`;
  const mood1 = MOODS.find(x => x.id === f.mood);
  const moodStr = mood1 ? mood1.name.toLowerCase() : "distinctive";
  const typoStr = f.typo === "serif" ? "serif typography" : f.typo === "sans" ? "sans-serif typography" : "typographic direction TBD";
  const markStr = f.mark === "icon" ? "an icon-plus-wordmark system" : f.mark === "wordmark" ? "a clean wordmark" : "mark structure TBD";
  const acStr = f.accent ? (ACC.find(a => a.hex === f.accent)?.name.toLowerCase() || "NM blue") + " accent on top of NM blue primary" : "secondary accent TBD";
  const toneStr = f.tone === "established" ? "established and authoritative" : f.tone === "forward" ? "contemporary and forward-looking" : "tonally balanced";
  const adjStr = f.adjectives.length ? f.adjectives.join(", ") : "professional and trustworthy";
  const audStr = f.audience.length ? f.audience.join(" and ") : "a broad client base";
  const nmStr = f.nmLean === "nm_lead" ? "an NM-led lockup with the DBA presented as a named sub-brand"
    : f.nmLean === "equal" ? "an equal-weight lockup co-branded with Northwestern Mutual"
    : "an NM-compliant lockup TBD";
  const truthStr = f.truth[0] || "feel timeless and credible";
  const svcStr = services.length ? services.join(", ") : "logo";
  return `${dba} — ${confidence.toUpperCase()} confidence · scope: ${svcStr}. Identity should feel ${moodStr}, ${toneStr} in character, built on ${typoStr} using ${markStr} with ${acStr}. Practice serves ${audStr} and is described as ${adjStr}. Lockup approach: ${nmStr}. Above all, this brand must ${truthStr.toLowerCase()}.`;
}

// ============================================================
// UI primitives
// ============================================================
function OCard({ sel, onClick, children, style = {} }: any) {
  return (
    <button onClick={onClick} style={{
      background: sel ? NMbg : "#f7f8fa",
      border: `${sel ? "1.5px" : "0.5px"} solid ${sel ? NM : "#d0d5dd"}`,
      borderRadius: 10, padding: "12px 16px", cursor: "pointer",
      width: "100%", textAlign: "left", fontFamily: "inherit",
      color: "#111", marginBottom: 8, display: "block", ...style
    }}>{children}</button>
  );
}
function Chip({ on, onClick, children, danger = false }: any) {
  return (
    <button onClick={onClick} style={{
      display: "inline-block", padding: "6px 12px", borderRadius: 100,
      border: `0.5px solid ${on ? (danger ? "#7a1f1f" : NM) : "#d0d5dd"}`,
      cursor: "pointer", fontSize: 13, margin: 3, fontFamily: "inherit",
      color: on ? "#fff" : "#666",
      background: on ? (danger ? "#7a1f1f" : NM) : "transparent"
    }}>{children}</button>
  );
}
function Q({ label, sub, why, children }: any) {
  return (
    <div>
      <h2 style={{ fontSize: 19, fontWeight: 400, color: "#111", marginBottom: 7, lineHeight: 1.35 }}>{label}</h2>
      {sub && <p style={{ fontSize: 13, color: "#666", marginBottom: why ? 5 : 20, lineHeight: 1.6 }}>{sub}</p>}
      {why && <p style={{ fontSize: 11, color: "#888", marginBottom: 18, fontStyle: "italic" }}>Why we ask: {why}</p>}
      {children}
    </div>
  );
}
const TA = (props: any) => (
  <textarea {...props} style={{ width: "100%", background: "#f7f8fa", border: "0.5px solid #d0d5dd", borderRadius: 8, padding: "12px 14px", fontSize: 14, fontFamily: "inherit", color: "#111", resize: "none", outline: "none", lineHeight: 1.6, ...props.style }} />
);
const TxtInput = (props: any) => (
  <input {...props} style={{ width: "100%", background: "#f7f8fa", border: "0.5px solid #d0d5dd", borderRadius: 8, padding: "10px 13px", fontSize: 14, fontFamily: "inherit", color: "#111", outline: "none", ...props.style }} />
);
function TotCard({ sel, onClick, Preview, label, n, recommended }: any) {
  return (
    <button onClick={onClick} style={{ borderRadius: 10, cursor: "pointer", border: `${sel ? "2px" : "1.5px"} solid ${sel ? NM : "#e0e4ea"}`, background: "#f7f8fa", padding: 13, textAlign: "left", fontFamily: "inherit", flex: 1, position: "relative" }}>
      {recommended && <div style={{ position: "absolute", top: 6, right: 6, background: NM, color: "#fff", fontSize: 9, padding: "2px 6px", borderRadius: 4, letterSpacing: ".05em" }}>RECOMMENDED</div>}
      <Preview n={n} />
      <div style={{ fontSize: 13, fontWeight: 500, color: "#111", marginTop: 9 }}>{label}</div>
    </button>
  );
}

// Tile previews for typo/density/tone/mark
const TypoSerif = ({ n }: { n: string }) => (
  <div style={{ background: "#f8f9fb", border: "0.5px solid #dde3ea", borderRadius: 6, padding: "13px 15px", height: 68, display: "flex", flexDirection: "column", justifyContent: "center" }}>
    <div style={{ fontFamily: "Georgia,serif", fontSize: 17, color: NM, fontWeight: 700 }}>{sn(n)}</div>
    <div style={{ fontFamily: "Georgia,serif", fontSize: 9, color: "#777", letterSpacing: "2px", marginTop: 3 }}>FINANCIAL ADVISORS</div>
  </div>
);
const TypoSans = ({ n }: { n: string }) => (
  <div style={{ background: "#f8f9fb", border: "0.5px solid #dde3ea", borderRadius: 6, padding: "13px 15px", height: 68, display: "flex", flexDirection: "column", justifyContent: "center" }}>
    <div style={{ fontFamily: "system-ui,sans-serif", fontSize: 14, color: NM, fontWeight: 300, letterSpacing: "4px" }}>{wm(n)}</div>
    <div style={{ fontFamily: "system-ui,sans-serif", fontSize: 8, color: "#aaa", letterSpacing: "3px", marginTop: 4 }}>FINANCIAL</div>
  </div>
);
const DensMin = ({ n }: { n: string }) => (
  <div style={{ background: "#f8f9fb", border: "0.5px solid #dde3ea", borderRadius: 6, padding: "13px 15px", height: 68, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ fontFamily: "system-ui,sans-serif", fontSize: 13, fontWeight: 300, color: NM, letterSpacing: "5px" }}>{wm(n)}</div>
  </div>
);
const DensRich = ({ n }: { n: string }) => (
  <div style={{ background: "#f8f9fb", border: "0.5px solid #dde3ea", borderRadius: 6, padding: "13px 15px", height: 68, display: "flex", flexDirection: "column", justifyContent: "center" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
      <div style={{ width: 13, height: 13, background: NM, borderRadius: 2, opacity: .7 }} />
      <div style={{ fontFamily: "Georgia,serif", fontSize: 11, fontWeight: 700, color: NM }}>{wm(n)} FINANCIAL</div>
    </div>
    <div style={{ fontSize: 8, color: "#999", letterSpacing: "1px", paddingLeft: 20 }}>Wealth Management & Advisory</div>
    <div style={{ height: 0.5, background: "#ccc", marginTop: 5 }} />
  </div>
);
const ToneEst = ({ n }: { n: string }) => (
  <div style={{ background: NM, borderRadius: 6, padding: "13px 15px", height: 68, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: 7 }}>
      <div style={{ fontFamily: "Georgia,serif", fontSize: 11, fontWeight: 700, color: "#F5F0E8", letterSpacing: "1px" }}>{wm(n)} FINANCIAL</div>
    </div>
  </div>
);
const ToneFwd = ({ n }: { n: string }) => (
  <div style={{ background: "#f8f9fb", border: "0.5px solid #dde3ea", borderRadius: 6, padding: "13px 15px", height: 68, display: "flex", alignItems: "center", gap: 10 }}>
    <div style={{ width: 3, height: 32, background: NM, borderRadius: 2, flexShrink: 0 }} />
    <div>
      <div style={{ fontFamily: "system-ui,sans-serif", fontSize: 13, fontWeight: 300, color: NM, letterSpacing: "3px" }}>{wm(n)}</div>
      <div style={{ fontFamily: "system-ui,sans-serif", fontSize: 7.5, color: "#aaa", letterSpacing: "2px", marginTop: 3 }}>FINANCIAL</div>
    </div>
  </div>
);
const MarkWord = ({ n }: { n: string }) => (
  <div style={{ background: "#f8f9fb", border: "0.5px solid #dde3ea", borderRadius: 6, padding: "13px 15px", height: 68, display: "flex", flexDirection: "column", justifyContent: "center" }}>
    <div style={{ fontFamily: "Georgia,serif", fontSize: 16, fontWeight: 700, color: NM }}>{wm(n)}</div>
    <div style={{ fontFamily: "system-ui,sans-serif", fontSize: 8, letterSpacing: "2.5px", color: "#aaa", marginTop: 3 }}>FINANCIAL</div>
  </div>
);
const MarkIcon = ({ n }: { n: string }) => (
  <div style={{ background: "#f8f9fb", border: "0.5px solid #dde3ea", borderRadius: 6, padding: "13px 15px", height: 68, display: "flex", alignItems: "center", gap: 10 }}>
    <div style={{ width: 28, height: 28, position: "relative", flexShrink: 0 }}>
      <div style={{ position: "absolute", inset: 0, background: NM, borderRadius: 3, opacity: .12 }} />
      <div style={{ position: "absolute", inset: 4, background: NM, borderRadius: 2, opacity: .4 }} />
      <div style={{ position: "absolute", inset: 9, background: NM, borderRadius: 1 }} />
    </div>
    <div>
      <div style={{ fontFamily: "Georgia,serif", fontSize: 13, fontWeight: 700, color: NM }}>{wm(n)}</div>
      <div style={{ fontFamily: "system-ui,sans-serif", fontSize: 7.5, letterSpacing: "2px", color: "#aaa", marginTop: 2 }}>FINANCIAL</div>
    </div>
  </div>
);

// NM Guidelines tooltip
function NMBadge() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button onClick={() => setOpen(o => !o)} style={{ background: NMbg, border: `0.5px solid ${NM}`, color: NM, fontSize: 10, padding: "3px 8px", borderRadius: 100, cursor: "pointer", fontFamily: "inherit", letterSpacing: ".05em" }}>
        NM GUIDELINES ✓
      </button>
      {open && (
        <div style={{ position: "absolute", top: "100%", left: 0, marginTop: 6, background: "#fff", border: `0.5px solid ${NM}`, borderRadius: 8, padding: 12, fontSize: 11, color: "#333", width: 260, zIndex: 10, boxShadow: "0 4px 16px rgba(0,0,0,.06)", lineHeight: 1.5 }}>
          <strong style={{ color: NM }}>What this tool enforces:</strong>
          <ul style={{ paddingLeft: 16, margin: "6px 0 0", listStyle: "disc" }}>
            <li>NM lockup is always primary — never replaced.</li>
            <li>NM Blue is the primary color; you choose a secondary accent only.</li>
            <li>Mark structure must work co-branded with NM at small sizes.</li>
            <li>Final logo files require NM compliance review before use.</li>
          </ul>
        </div>
      )}
    </div>
  );
}

// ============================================================
// Reference upload step
// ============================================================
function ReferenceStep({ form, set, tog }: any) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const onUpload = async (e: any) => {
    const files = Array.from(e.target.files as FileList).slice(0, 3 - form.refUploads.length);
    if (!files.length) return;
    setBusy(true); setErr("");
    try {
      const urls: string[] = [];
      for (const f of files) {
        if (f.size > 5 * 1024 * 1024) { setErr("Max 5MB per file."); continue; }
        const path = `${crypto.randomUUID()}-${f.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
        const { error } = await supabase.storage.from("discovery-uploads").upload(path, f, { contentType: f.type });
        if (error) { setErr(error.message); continue; }
        urls.push(path);
      }
      if (urls.length) set("refUploads", [...form.refUploads, ...urls]);
    } finally { setBusy(false); if (fileRef.current) fileRef.current.value = ""; }
  };

  return (
    <Q label="Logos that resonate with you." sub="Tap any below that catch your eye, upload references, or describe brands you admire." why="Your gut reaction to existing brands tells us more than any description.">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 16 }}>
        {REFS.map(r => {
          const on = form.refLikes.includes(r.id);
          return (
            <button key={r.id} onClick={() => tog("refLikes", r.id)} style={{ background: on ? NMbg : "#f7f8fa", border: `${on ? "1.5px" : "0.5px"} solid ${on ? NM : "#d0d5dd"}`, borderRadius: 8, padding: "16px 8px", height: 64, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontFamily: "inherit", fontSize: 13, ...r.style }}>
              {(r as any).glyph || r.label}
            </button>
          );
        })}
      </div>

      <div style={{ background: "#f7f8fa", border: "0.5px dashed #c0c8d2", borderRadius: 8, padding: 14, marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>Or upload up to 3 reference images (PNG/JPG, &lt; 5MB each)</div>
        <input ref={fileRef} type="file" accept="image/*" multiple onChange={onUpload} disabled={busy || form.refUploads.length >= 3} style={{ fontSize: 12 }} />
        {form.refUploads.length > 0 && (
          <div style={{ marginTop: 10, fontSize: 11, color: "#444" }}>
            ✓ {form.refUploads.length} file{form.refUploads.length === 1 ? "" : "s"} attached
          </div>
        )}
        {err && <div style={{ marginTop: 6, fontSize: 11, color: "#c0392b" }}>{err}</div>}
      </div>

      <TA value={form.inspiration} onChange={(e: any) => set("inspiration", e.target.value)} rows={3} placeholder="Optional: anything else worth noting? e.g. 'Apple's restraint, Vanguard's clarity'..." />
    </Q>
  );
}

// ============================================================
// Step renderer
// ============================================================
function StepRender({ id, form, set, tog, name }: any) {
  const dbaPreview = form.dbaName || sn(name);
  // Recommendation logic for mark structure
  const rec = form.density === "rich" || form.tone === "established" || form.mood === "heritage";

  switch (id) {
    case "dbaName":
      return (
        <Q label="Your DBA name" sub="The name your practice will operate under. We'll use this in every preview going forward." why="Different exercises if we're naming vs. just designing.">
          <div style={{ marginBottom: 12 }}>
            {[["approved","✓","It's been approved"],["considering","◎","Still deciding / in progress"],["none","○","Not yet — help me think about it"]].map(([v, ic, l]: any) => (
              <OCard key={v} sel={form.dbaStatus === v} onClick={() => set("dbaStatus", v)}>
                <span style={{ marginRight: 10, color: form.dbaStatus === v ? NM : "#aaa" }}>{ic}</span>{l}
              </OCard>
            ))}
          </div>
          <TxtInput value={form.dbaName} onChange={(e: any) => set("dbaName", e.target.value)} placeholder={form.dbaStatus === "none" ? "Type a working name (we'll refine it)" : "Enter your DBA name..."} />
          {form.dbaName && <div style={{ marginTop: 14, fontSize: 11, color: "#888" }}>↓ Live preview · all design tiles will use this name</div>}
          {form.dbaName && (
            <div style={{ marginTop: 8, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <MOODS[0].Preview n={form.dbaName} />
              <MOODS[1].Preview n={form.dbaName} />
            </div>
          )}
        </Q>
      );
    case "pitch":
      return (
        <Q label="Describe your practice in 1–2 sentences." sub="Not your elevator pitch. The raw truth about what you do." why="Your language often surfaces the emotional core of the brand.">
          <TA value={form.pitch} onChange={(e: any) => set("pitch", e.target.value)} rows={4} maxLength={300} placeholder="e.g. We work with business owners who need a financial partner, not a product salesperson..." />
          <div style={{ textAlign: "right", fontSize: 11, color: "#aaa", marginTop: 4 }}>{form.pitch.length}/300</div>
        </Q>
      );
    case "diff":
      return (
        <Q label="What makes your practice different?" sub="Select all that apply." why="Differentiators often become the emotional anchor of the brand.">
          <div style={{ marginBottom: 10 }}>{DIFF.map(d => <Chip key={d} on={form.diff.includes(d)} onClick={() => tog("diff", d)}>{d}</Chip>)}</div>
          <TxtInput value={form.diffCustom} onChange={(e: any) => set("diffCustom", e.target.value)} placeholder="Anything not listed..." />
        </Q>
      );
    case "audience":
      return (
        <Q label="Who is your primary client?" why="Shapes how approachable or authoritative the identity needs to feel.">
          <div>{AUD.map(a => <Chip key={a} on={form.audience.includes(a)} onClick={() => tog("audience", a)}>{a}</Chip>)}</div>
        </Q>
      );
    case "adjectives":
      return (
        <Q label="How do clients describe working with you?" sub="Pick up to 3. Should feel true — not aspirational." why="These become the vocabulary we test every logo decision against.">
          <div style={{ marginBottom: 10 }}>{ADJ.map(a => <Chip key={a} on={form.adjectives.includes(a)} onClick={() => { if (form.adjectives.includes(a) || form.adjectives.length < 3) tog("adjectives", a); }}>{a}</Chip>)}</div>
          <div style={{ fontSize: 12, color: "#aaa" }}>{form.adjectives.length}/3 selected</div>
        </Q>
      );
    case "nmLean":
      return (
        <Q label="Choose your NM-compliant lockup approach." sub="Per NM brand guidelines, the Northwestern Mutual lockup must remain primary. These options control your DBA's relative visual weight inside that constraint." why="Sets the visual hierarchy we'll design within.">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {NM_LEAN.map(o => (
              <button key={o.v} onClick={() => set("nmLean", o.v)} style={{ background: form.nmLean === o.v ? NMbg : "#f7f8fa", border: `${form.nmLean === o.v ? "1.5px" : "0.5px"} solid ${form.nmLean === o.v ? NM : "#d0d5dd"}`, borderRadius: 10, padding: 10, cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}>
                <o.Preview n={dbaPreview} />
                <div style={{ fontSize: 12, fontWeight: 500, color: "#111", marginTop: 8 }}>{o.l}</div>
                <div style={{ fontSize: 11, color: "#888", marginTop: 3, lineHeight: 1.4 }}>{o.d}</div>
              </button>
            ))}
          </div>
        </Q>
      );
    case "touchpoints":
      return (
        <Q label="Where will this logo primarily live?" sub="Select all that apply." why="A logo for a 40px social avatar is designed differently than one built for letterhead.">
          <div>{TOUCH.map(t => <Chip key={t} on={form.touchpoints.includes(t)} onClick={() => tog("touchpoints", t)}>{t}</Chip>)}</div>
        </Q>
      );
    case "personality": {
      const answered = [form.pHH, form.pLM, form.pQB, form.pII, form.pLN].filter(Boolean).length;
      return (
        <Q label="Brand personality — pick one from each pair." sub="Five axes that define your brand's emotional fingerprint." why="The most important screen in the intake.">
          <div style={{ display: "grid", gap: 8 }}>
            {AXES.map(([l, lv, rv, r, field, ld, rd]) => (
              <div key={field} style={{ background: "#f7f8fa", borderRadius: 8, padding: "10px 12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
                  {[[l, lv, ld], [r, rv, rd]].map(([label, val, desc]) => (
                    <button key={val} onClick={() => set(field, val)} style={{ background: (form as any)[field] === val ? NMbg : "#fff", border: `${(form as any)[field] === val ? "1.5px" : "0.5px"} solid ${(form as any)[field] === val ? NM : "#d0d5dd"}`, borderRadius: 8, padding: "9px 12px", cursor: "pointer", fontFamily: "inherit", textAlign: "center" }}>
                      <div style={{ fontSize: 12, fontWeight: 500, color: "#111", marginBottom: 2 }}>{label}</div>
                      <div style={{ fontSize: 10, color: "#888" }}>{desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "#aaa", textAlign: "right", marginTop: 6 }}>{answered}/5 answered</div>
        </Q>
      );
    }
    case "typo":
      return (
        <Q label="Typography — this or that." sub="Which feels more like you?" why="Serif feels authoritative; sans feels modern.">
          <div style={{ display: "flex", gap: 12 }}>
            <TotCard n={dbaPreview} sel={form.typo === "serif"} onClick={() => set("typo", "serif")} Preview={TypoSerif} label="Serif / classic" />
            <TotCard n={dbaPreview} sel={form.typo === "sans"} onClick={() => set("typo", "sans")} Preview={TypoSans} label="Sans / modern" />
          </div>
        </Q>
      );
    case "density":
      return (
        <Q label="Design density — this or that." sub="How should your brand use space?" why="Minimal feels confident; layered feels comprehensive.">
          <div style={{ display: "flex", gap: 12 }}>
            <TotCard n={dbaPreview} sel={form.density === "minimal"} onClick={() => set("density", "minimal")} Preview={DensMin} label="Minimal / open" />
            <TotCard n={dbaPreview} sel={form.density === "rich"} onClick={() => set("density", "rich")} Preview={DensRich} label="Layered / rich" />
          </div>
        </Q>
      );
    case "tone":
      return (
        <Q label="Overall tone — this or that." sub="If your brand walked into a room, how would it carry itself?" why="Both are professional — they project differently.">
          <div style={{ display: "flex", gap: 12 }}>
            <TotCard n={dbaPreview} sel={form.tone === "established"} onClick={() => set("tone", "established")} Preview={ToneEst} label="Established / traditional" />
            <TotCard n={dbaPreview} sel={form.tone === "forward"} onClick={() => set("tone", "forward")} Preview={ToneFwd} label="Forward / contemporary" />
          </div>
        </Q>
      );
    case "mood":
      return (
        <Q label="Which aesthetic direction resonates most?" sub="Pick the one that feels closest. Directions, not final logos." why="Your gut reaction is more honest than any description.">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {MOODS.map(m => (
              <button key={m.id} onClick={() => set("mood", m.id)} style={{ background: form.mood === m.id ? NMbg : "#f7f8fa", border: `${form.mood === m.id ? "1.5px" : "0.5px"} solid ${form.mood === m.id ? NM : "#d0d5dd"}`, borderRadius: 10, padding: 10, cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}>
                <m.Preview n={dbaPreview} />
                <div style={{ fontSize: 12, fontWeight: 500, color: "#111", marginTop: 7 }}>{m.name}</div>
                <div style={{ fontSize: 10, color: "#888", marginTop: 2, lineHeight: 1.4 }}>{m.desc}</div>
              </button>
            ))}
          </div>
        </Q>
      );
    case "mark":
      return (
        <Q label="Mark structure — this or that." sub="Wordmark only or icon + wordmark?" why="An icon adds versatility; a wordmark is timeless.">
          <div style={{ display: "flex", gap: 12 }}>
            <TotCard n={dbaPreview} sel={form.mark === "wordmark"} onClick={() => set("mark", "wordmark")} Preview={MarkWord} label="Wordmark only" />
            <TotCard n={dbaPreview} sel={form.mark === "icon"} onClick={() => set("mark", "icon")} Preview={MarkIcon} label="Icon + wordmark" recommended={rec} />
          </div>
          {rec && <div style={{ fontSize: 11, color: NM, marginTop: 10, fontStyle: "italic" }}>Based on your other answers, an icon + wordmark will give your brand the depth it needs.</div>}
        </Q>
      );
    case "accent":
      return (
        <Q label="Choose your secondary accent color." sub="NM Blue is locked as your primary — these are NM-approved secondary accents that personalize your identity." why="Differentiates you from other NM advisors within compliance.">
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: NMbg, border: `1px solid ${NM}`, borderRadius: 10, marginBottom: 14 }}>
            <div style={{ width: 26, height: 26, borderRadius: 5, background: NM, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: NM, fontWeight: 600 }}>NM Blue · Primary (locked)</div>
              <div style={{ fontSize: 11, color: "#666" }}>Required by NM brand guidelines</div>
            </div>
            <span style={{ fontSize: 10, color: NM, background: "#fff", padding: "2px 6px", borderRadius: 4, border: `0.5px solid ${NM}` }}>FIXED</span>
          </div>
          {ACC.filter(a => a.hex !== NM).map(a => (
            <OCard key={a.hex} sel={form.accent === a.hex} onClick={() => set("accent", a.hex)} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 26, height: 26, borderRadius: 5, background: a.hex, flexShrink: 0, border: "0.5px solid #ccc" }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: "#111" }}>{a.name}</div>
                <div style={{ fontSize: 11, color: "#888" }}>{a.vibe}</div>
              </div>
              {form.accent === a.hex && <span style={{ color: NM }}>✓</span>}
            </OCard>
          ))}
        </Q>
      );
    case "references":
      return <ReferenceStep form={form} set={set} tog={tog} />;
    case "avoid":
      return (
        <Q label="What should your logo never be?" sub="Optional, but directionally useful.">
          <div>{AVOIDS.map(a => <Chip key={a} on={form.avoid.includes(a)} onClick={() => tog("avoid", a)} danger>{a}</Chip>)}</div>
        </Q>
      );
    case "vision":
      return (
        <Q label="Five years from now — what do you want people to say when they see your logo?" sub="One sentence. Future tense. Be ambitious." why="Reveals what the brand needs to grow into.">
          <TA value={form.vision} onChange={(e: any) => set("vision", e.target.value)} rows={4} maxLength={200} placeholder={`"That logo tells you everything — serious, local, and built to last."`} />
          <div style={{ textAlign: "right", fontSize: 11, color: "#aaa", marginTop: 4 }}>{form.vision.length}/200</div>
        </Q>
      );
    case "truth":
      return (
        <Q label="One thing that is non-negotiable." sub="This logo must ___. Choose your absolute floor.">
          <div>{TRUTH.map(t => <Chip key={t} on={form.truth.includes(t)} onClick={() => tog("truth", t)}>{t}</Chip>)}</div>
        </Q>
      );

    case "svc_website":
      return (
        <Q label="Tell us about your website needs." sub="Even a few sentences gives us a real starting point.">
          <label style={{ fontSize: 11, color: "#888", letterSpacing: ".08em", textTransform: "uppercase" }}>Current site (URL or "none")</label>
          <TxtInput value={form.websiteCurrent} onChange={(e: any) => set("websiteCurrent", e.target.value)} placeholder="https://..." style={{ marginTop: 6, marginBottom: 14 }} />
          <label style={{ fontSize: 11, color: "#888", letterSpacing: ".08em", textTransform: "uppercase" }}>Goals & must-haves</label>
          <TA value={form.websiteGoals} onChange={(e: any) => set("websiteGoals", e.target.value)} rows={4} placeholder="e.g. Lead capture, team bios, scheduling, content hub..." style={{ marginTop: 6 }} />
        </Q>
      );
    case "svc_content":
      return (
        <Q label="What kind of content do you need?" sub="Photo, video, social, website copy — anything you're already thinking about.">
          <TA value={form.contentNeeds} onChange={(e: any) => set("contentNeeds", e.target.value)} rows={5} placeholder="e.g. Quarterly brand video, headshots for the team, weekly LinkedIn post copy..." />
        </Q>
      );
    case "svc_ads":
      return (
        <Q label="Paid ads & social — what's the goal?" sub="Approximate monthly budget range and what you'd want it to drive.">
          <TA value={form.adsBudget} onChange={(e: any) => set("adsBudget", e.target.value)} rows={5} placeholder="e.g. ~$2k/mo, primarily Meta + LinkedIn, goal is qualified leads from business owners 40+..." />
        </Q>
      );
    case "svc_print":
      return (
        <Q label="Print & physical collateral?" sub="Stationery, signage, presentation decks, event materials.">
          <TA value={form.printNeeds} onChange={(e: any) => set("printNeeds", e.target.value)} rows={5} placeholder="e.g. New office signage, refreshed business cards, client-meeting folders..." />
        </Q>
      );
    case "svc_timeline":
      return (
        <Q label="When are you hoping to launch?" sub="Honest timeline helps us scope the engagement properly.">
          <TxtInput value={form.timeline} onChange={(e: any) => set("timeline", e.target.value)} placeholder="e.g. End of Q1, no rush, ASAP for an event on..." />
        </Q>
      );

    default: return null;
  }
}

// ============================================================
// Validation per step id
// ============================================================
function canAdvance(id: string, f: Form): boolean {
  switch (id) {
    case "dbaName": return f.dbaStatus !== null && f.dbaName.trim().length > 1;
    case "pitch": return f.pitch.trim().length > 10;
    case "diff": return f.diff.length > 0 || f.diffCustom.trim().length > 2;
    case "audience": return f.audience.length > 0;
    case "adjectives": return f.adjectives.length > 0;
    case "nmLean": return f.nmLean !== null;
    case "touchpoints": return f.touchpoints.length > 0;
    case "personality": return [f.pHH, f.pLM, f.pQB, f.pII, f.pLN].every(Boolean);
    case "typo": return f.typo !== null;
    case "density": return f.density !== null;
    case "tone": return f.tone !== null;
    case "mood": return f.mood !== null;
    case "mark": return f.mark !== null;
    case "accent": return f.accent !== null;
    case "references": return true; // optional
    case "avoid": return true;
    case "vision": return f.vision.trim().length > 5;
    case "truth": return f.truth.length > 0;
    case "svc_website": return f.websiteGoals.trim().length > 5 || f.websiteCurrent.trim().length > 3;
    case "svc_content": return f.contentNeeds.trim().length > 5;
    case "svc_ads": return f.adsBudget.trim().length > 5;
    case "svc_print": return f.printNeeds.trim().length > 5;
    case "svc_timeline": return f.timeline.trim().length > 1;
    default: return true;
  }
}

// ============================================================
// Landing — name → services → confidence
// ============================================================
function Landing({ onStart }: { onStart: (n: string, e: string, p: string, services: string[], confidence: string) => void }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [practice, setPractice] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [confidence, setConfidence] = useState<string>("");

  const tog = (v: string) => setServices(s => s.includes(v) ? s.filter(x => x !== v) : [...s, v]);
  const wantsLogo = services.includes("logo") || services.includes("unsure");
  const ok0 = name.trim().length > 1 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim());
  const ok1 = services.length > 0;

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "52px 24px 40px", background: "#fff", minHeight: "100vh" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: 10, letterSpacing: ".18em", color: "#888", textTransform: "uppercase", marginBottom: 14 }}>NM ADVISOR DISCOVERY</div>
        <div style={{ fontSize: 24, fontWeight: 400, color: "#111", marginBottom: 6 }}>Northwestern Mutual</div>
        <div style={{ fontSize: 13, color: "#666" }}>Brand & marketing intake · 3–8 minutes</div>
      </div>

      {step === 0 && (
        <>
          <div style={{ background: "#f7f8fa", borderRadius: 10, padding: "14px 18px", fontSize: 13, color: "#666", lineHeight: 1.7, marginBottom: 20 }}>
            Before we recommend anything, we need a real picture of you and what you're trying to build. Your answers shape the proposal directly.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 11, color: "#888", letterSpacing: ".08em", textTransform: "uppercase" }}>Your full name</label>
              <TxtInput value={name} onChange={(e: any) => setName(e.target.value)} placeholder="Jane Doe" style={{ marginTop: 6 }} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: "#888", letterSpacing: ".08em", textTransform: "uppercase" }}>Email</label>
              <TxtInput type="email" value={email} onChange={(e: any) => setEmail(e.target.value)} placeholder="jane@nm.com" style={{ marginTop: 6 }} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: "#888", letterSpacing: ".08em", textTransform: "uppercase" }}>Practice or DBA name (optional)</label>
              <TxtInput value={practice} onChange={(e: any) => setPractice(e.target.value)} placeholder="Doe Wealth Strategies" style={{ marginTop: 6 }} />
            </div>
          </div>
          <button disabled={!ok0} onClick={() => setStep(1)} style={{ width: "100%", background: ok0 ? NM : "#ccc", color: "#fff", border: "none", padding: "14px", borderRadius: 8, fontSize: 14, fontFamily: "inherit", fontWeight: 500, cursor: ok0 ? "pointer" : "default" }}>Continue →</button>
        </>
      )}

      {step === 1 && (
        <>
          <div style={{ marginBottom: 18 }}>
            <h2 style={{ fontSize: 19, color: "#111", marginBottom: 6 }}>What can we help with?</h2>
            <p style={{ fontSize: 13, color: "#666", marginBottom: 4 }}>Pick everything you're considering — even loosely.</p>
            <p style={{ fontSize: 11, color: "#888", fontStyle: "italic" }}>Most NM advisors who refresh a logo find they need 1–2 other pieces within 6 months. Better to map it now.</p>
          </div>
          <div style={{ marginBottom: 24 }}>
            {SERVICES.map(s => (
              <OCard key={s.v} sel={services.includes(s.v)} onClick={() => tog(s.v)}>
                <span style={{ marginRight: 10, color: services.includes(s.v) ? NM : "#aaa" }}>{services.includes(s.v) ? "✓" : "○"}</span>{s.l}
              </OCard>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setStep(0)} style={{ flex: "0 0 auto", background: "transparent", border: "0.5px solid #ccc", color: "#666", padding: "12px 18px", borderRadius: 8, fontFamily: "inherit", fontSize: 13, cursor: "pointer" }}>← Back</button>
            <button disabled={!ok1} onClick={() => wantsLogo ? setStep(2) : onStart(name.trim(), email.trim(), practice.trim(), services, "guided")} style={{ flex: 1, background: ok1 ? NM : "#ccc", color: "#fff", border: "none", padding: "14px", borderRadius: 8, fontSize: 14, fontFamily: "inherit", fontWeight: 500, cursor: ok1 ? "pointer" : "default" }}>
              {wantsLogo ? "Continue →" : "Begin →"}
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div style={{ marginBottom: 18 }}>
            <h2 style={{ fontSize: 19, color: "#111", marginBottom: 6 }}>How clear is your vision for the logo?</h2>
            <p style={{ fontSize: 13, color: "#666" }}>Honest answers shorten or lengthen what comes next.</p>
          </div>
          <div style={{ marginBottom: 24 }}>
            {CONFIDENCE.map(c => (
              <OCard key={c.v} sel={confidence === c.v} onClick={() => setConfidence(c.v)}>
                <div style={{ fontSize: 14, color: "#111", fontWeight: 500 }}>{c.l}</div>
                <div style={{ fontSize: 12, color: "#888", marginTop: 3 }}>{c.d}</div>
              </OCard>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setStep(1)} style={{ flex: "0 0 auto", background: "transparent", border: "0.5px solid #ccc", color: "#666", padding: "12px 18px", borderRadius: 8, fontFamily: "inherit", fontSize: 13, cursor: "pointer" }}>← Back</button>
            <button disabled={!confidence} onClick={() => onStart(name.trim(), email.trim(), practice.trim(), services, confidence)} style={{ flex: 1, background: confidence ? NM : "#ccc", color: "#fff", border: "none", padding: "14px", borderRadius: 8, fontSize: 14, fontFamily: "inherit", fontWeight: 500, cursor: confidence ? "pointer" : "default" }}>Begin discovery →</button>
          </div>
        </>
      )}

      <div style={{ textAlign: "center", marginTop: 32, fontSize: 10, color: "#aaa", letterSpacing: ".12em", textTransform: "uppercase" }}>Prepared by ProjGrowth</div>
    </div>
  );
}

function Thanks({ name, form, services }: { name: string; form: Form; services: string[] }) {
  const mood = MOODS.find(x => x.id === form.mood);
  const traits: string[] = [];
  if (form.pHH) traits.push(form.pHH === "head" ? "analytical" : "relational");
  if (form.pQB) traits.push(form.pQB === "bold" ? "boldly confident" : "quietly authoritative");
  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "60px 24px", textAlign: "center", background: "#fff", minHeight: "100vh" }}>
      <div style={{ fontSize: 28, color: "#2d7a2d", marginBottom: 14 }}>✓</div>
      <div style={{ fontSize: 22, fontWeight: 400, color: "#111", marginBottom: 8 }}>Thank you, {sn(name)}.</div>
      <p style={{ color: "#666", fontSize: 13, lineHeight: 1.7, marginBottom: 24 }}>Your submission is in. Here's what your answers are already telling us.</p>
      <div style={{ background: "#f7f8fa", borderRadius: 10, padding: "18px 22px", marginBottom: 24, textAlign: "left" }}>
        {services.length > 0 && <div style={{ marginBottom: 9, fontSize: 13, color: "#666" }}>→ Scope: <strong>{services.join(", ")}</strong></div>}
        {mood && <div style={{ marginBottom: 9, fontSize: 13, color: "#666" }}>→ Aesthetic direction: <strong>{mood.name}</strong></div>}
        {form.adjectives.length > 0 && <div style={{ marginBottom: 9, fontSize: 13, color: "#666" }}>→ Clients describe you as: <strong>{form.adjectives.join(", ")}</strong></div>}
        {traits.length > 0 && <div style={{ marginBottom: 9, fontSize: 13, color: "#666" }}>→ Brand personality: <strong>{traits.join(", ")}</strong></div>}
        {form.truth[0] && <div style={{ marginBottom: 9, fontSize: 13, color: "#666" }}>→ Non-negotiable: <strong>{form.truth[0]}</strong></div>}
        {form.vision && <div style={{ borderTop: "0.5px solid #e0e4ea", paddingTop: 10, marginTop: 4, fontSize: 13, color: "#666", fontStyle: "italic" }}>"{form.vision}"</div>}
      </div>
      <p style={{ color: "#666", fontSize: 13, lineHeight: 1.7 }}>We'll review your responses and reach out within 24–48 hours.</p>
    </div>
  );
}

const STORE = "nm_discovery_v2";

export default function Discovery() {
  const [phase, setPhase] = useState<"landing" | "form" | "submitting" | "done">("landing");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [practice, setPractice] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [confidence, setConfidence] = useState("guided");
  const [plan, setPlan] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(blank());
  const [err, setErr] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE);
      if (raw) {
        const s = JSON.parse(raw);
        if (s.email && s.form && s.plan) {
          setName(s.name || ""); setEmail(s.email); setPractice(s.practice || "");
          setServices(s.services || []); setConfidence(s.confidence || "guided");
          setPlan(s.plan); setStep(s.step || 0); setForm(s.form); setPhase(s.phase || "landing");
        }
      }
    } catch {}
  }, []);
  useEffect(() => {
    if (phase === "form") {
      try { localStorage.setItem(STORE, JSON.stringify({ name, email, practice, services, confidence, plan, step, form, phase })); } catch {}
    }
  }, [name, email, practice, services, confidence, plan, step, form, phase]);

  const set = (k: keyof Form, v: any) => setForm(f => ({ ...f, [k]: v }));
  const tog = (k: keyof Form, v: any) => setForm(f => {
    const a = (f[k] as string[]) || [];
    return { ...f, [k]: a.includes(v) ? a.filter(x => x !== v) : [...a, v] };
  });

  const startForm = (n: string, e: string, p: string, svcs: string[], conf: string) => {
    setName(n); setEmail(e); setPractice(p); setServices(svcs); setConfidence(conf);
    const newPlan = buildPlan(conf, svcs);
    setPlan(newPlan);
    // Pre-fill DBA name from practice if provided
    setForm({ ...blank(), dbaName: p });
    setStep(0); setPhase("form");
  };

  const submit = async () => {
    setPhase("submitting"); setErr("");
    try {
      const brief = genBrief(name, form, services, confidence);
      const tier = engagementTier(confidence, services);
      const { error } = await supabase.functions.invoke("submit-discovery", {
        body: {
          full_name: name, email, practice_name: practice,
          responses: form, generated_brief: brief,
          confidence, services, engagement_tier: tier,
          reference_image_urls: form.refUploads
        },
      });
      if (error) throw error;
      try { localStorage.removeItem(STORE); } catch {}
      setPhase("done");
    } catch (e: any) {
      setErr(e?.message || "Submission failed. Please try again.");
      setPhase("form");
    }
  };

  const onNext = () => {
    if (!canAdvance(plan[step], form)) return;
    if (step < plan.length - 1) { setStep(s => s + 1); return; }
    submit();
  };

  if (phase === "landing") return <Landing onStart={startForm} />;
  if (phase === "done") return <Thanks name={name} form={form} services={services} />;
  if (phase === "submitting") {
    return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", color: "#666", fontFamily: "system-ui" }}>Submitting your responses…</div>;
  }

  const TOTAL = plan.length;
  const pct = ((step + 1) / TOTAL) * 100;
  const cn = canAdvance(plan[step], form);
  return (
    <div style={{ background: "#fff", minHeight: "100vh", paddingTop: 24 }}>
      <div style={{ maxWidth: 540, margin: "0 auto", padding: "0 24px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <NMBadge />
          <span style={{ fontSize: 11, color: "#888" }}>Step {step + 1} / {TOTAL}</span>
        </div>
        <div style={{ height: 2, background: "#e0e4ea", marginBottom: 24, borderRadius: 2 }}>
          <div style={{ height: "100%", width: `${pct}%`, background: NM, borderRadius: 2, transition: "width .3s ease" }} />
        </div>
        <StepRender id={plan[step]} form={form} set={set} tog={tog} name={name} />
        {err && <p style={{ color: "#c0392b", fontSize: 13, marginTop: 16 }}>{err}</p>}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 32 }}>
          <button onClick={() => step > 0 && setStep(s => s - 1)} style={{ background: "transparent", border: "none", color: "#888", fontSize: 14, fontFamily: "inherit", cursor: "pointer", padding: "10px 0", opacity: step === 0 ? 0 : 1, pointerEvents: step === 0 ? "none" : "auto" }}>← Back</button>
          <button onClick={onNext} disabled={!cn} style={{ background: cn ? NM : "#ccc", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 8, fontSize: 14, fontFamily: "inherit", fontWeight: 500, cursor: cn ? "pointer" : "default" }}>
            {step === TOTAL - 1 ? "Submit →" : "Continue →"}
          </button>
        </div>
      </div>
    </div>
  );
}
