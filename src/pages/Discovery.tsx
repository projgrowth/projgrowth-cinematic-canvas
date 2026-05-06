import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { DiscoveryShell } from "./discovery/Shell";
import { BusinessCard, MockupDisclaimer, MiniCard, deriveSpec, NM_BLUE, EMERALD, fontFor, weightFor } from "./discovery/mockups";
import { downloadBrandBriefPdf } from "./discovery/brandBriefPdf";

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

const sn = (n: string) => n?.trim().split(/\s+/)[0] || "you";

const MOODS = [
  { id: "classic", name: "Classic authority", desc: "Established, commanding, trusted", patch: { typo: "serif", tone: "established", density: "minimal" } },
  { id: "modern", name: "Modern precision", desc: "Clean, geometric, sophisticated", patch: { typo: "sans", tone: "forward", density: "minimal" } },
  { id: "warm", name: "Warm advisor", desc: "Approachable, human, partner-first", patch: { typo: "serif", tone: "forward", density: "minimal" } },
  { id: "luxury", name: "Understated luxury", desc: "Quiet, refined, deliberately restrained", patch: { typo: "serif", tone: "established", density: "minimal" } },
  { id: "bold", name: "Bold statement", desc: "Confident, forward, impossible to ignore", patch: { typo: "sans", tone: "established", density: "rich" } },
  { id: "heritage", name: "Trusted heritage", desc: "Balanced, enduring, credentialed", patch: { typo: "serif", tone: "established", density: "rich" } },
];

const NM_LEAN = [
  { v: "nm_lead", l: "NM-led lockup", d: "Northwestern Mutual primary, your DBA presented as a named sub-brand." },
  { v: "equal",   l: "Equal-weight lockup", d: "Both identities carry similar visual weight inside the NM-approved system." },
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

const BRAND_VALUES = ["Trust","Growth","Legacy","Independence","Discipline","Clarity","Optimism","Community","Craft","Innovation"];
const ICON_CONCEPTS = [
  { v: "geometric",  l: "Geometric / architectural", d: "Structured shapes, clear lines." },
  { v: "natural",    l: "Natural / organic",          d: "Botanical, leaf, growth motifs." },
  { v: "abstract",   l: "Abstract symbol",            d: "Distilled, conceptual mark." },
  { v: "monogram",   l: "Initials / monogram",        d: "Your initials as the icon." },
  { v: "heritage",   l: "Heritage emblem",            d: "Crest, seal, badge feel." },
  { v: "open",       l: "Not sure — surprise me",     d: "We'll explore based on your other answers." },
];

const REFS = [
  { id: "goldman",  label: "Goldman Sachs",   takeaway: "Restrained serif authority — luxury without shouting." },
  { id: "vanguard", label: "VANGUARD",        takeaway: "Single bold word, blood-red gravitas, zero ornament." },
  { id: "fidelity", label: "Fidelity",        takeaway: "Friendly serif + green — trustworthy without being cold." },
  { id: "blackrock",label: "BlackRock",       takeaway: "Heavy modern sans. Pure institutional weight." },
  { id: "edward",   label: "Edward Jones",    takeaway: "Approachable sans, bright blue — 'your neighbor advisor'." },
  { id: "raymond",  label: "RAYMOND JAMES",   takeaway: "Wide spacing + amber accent — premium financial heritage." },
  { id: "patek",    label: "PATEK PHILIPPE",  takeaway: "Hairline serif, generous whitespace — old wealth, quiet." },
  { id: "stripe",   label: "stripe",          takeaway: "Lowercase + indigo — modern, fast, builder-friendly." },
  { id: "monocle",  label: "MONOCLE",         takeaway: "Editorial slab + tight tracking — curated and considered." },
  { id: "aesop",    label: "Aesop.",          takeaway: "All-lowercase sans on cream — quiet craftsmanship." },
  { id: "muji",     label: "MUJI",            takeaway: "Brick-red box + sans — radical simplicity as identity." },
  { id: "hermes",   label: "Hermès",          takeaway: "Italic script + orange — heritage with personality." },
  { id: "nike",     label: "✓",               takeaway: "Pure symbol — earned through decades of consistency." },
  { id: "carter",   label: "Carter Signature", takeaway: "Handwritten script — bespoke, founder-led, personal." },
];
const REF_STYLE: Record<string, React.CSSProperties> = {
  goldman:   { fontFamily: "Georgia,serif", color: "#c9b27d", fontWeight: 700, letterSpacing: "1px" },
  vanguard:  { fontFamily: "system-ui",     color: "#d8474f", fontWeight: 700, letterSpacing: "2px" },
  fidelity:  { fontFamily: "Georgia,serif", color: "#5fb74e", fontWeight: 600 },
  edward:    { fontFamily: "system-ui",     color: "#4d9ce8", fontWeight: 600 },
  blackrock: { fontFamily: "system-ui",     color: "#f5f0e8", fontWeight: 800, letterSpacing: "-0.5px" },
  raymond:   { fontFamily: "Georgia,serif", color: "#FFB81C", fontWeight: 700, letterSpacing: "1.5px" },
  patek:     { fontFamily: "Georgia,serif", color: "#e8e0d0", fontWeight: 300, letterSpacing: "3px", fontSize: 11 },
  stripe:    { fontFamily: "system-ui",     color: "#a896ff", fontWeight: 700, letterSpacing: "-1px", textTransform: "lowercase" },
  monocle:   { fontFamily: "'Courier New',monospace", color: "#e8e0d0", fontWeight: 700, letterSpacing: "2px", fontSize: 13 },
  aesop:     { fontFamily: "'Helvetica Neue',sans-serif", color: "#3a3a3a", fontWeight: 400, background: "#efe9dc", padding: "6px 10px", borderRadius: 4 },
  muji:      { fontFamily: "system-ui", color: "#f5f0e8", fontWeight: 700, background: "#a8362c", padding: "6px 12px", letterSpacing: "1px" },
  hermes:    { fontFamily: "Georgia,serif", color: "#e87421", fontWeight: 400, fontStyle: "italic", fontSize: 18 },
  nike:      { fontFamily: "system-ui", color: "#f5f0e8", fontWeight: 900, fontSize: 28 },
  carter:    { fontFamily: "'Brush Script MT', cursive", color: "#cfdfee", fontWeight: 400, fontSize: 20 },
};

const SERVICES = [
  { v: "logo", l: "Logo & brand identity", d: "The wordmark, lockup, color, type system." },
  { v: "website", l: "Website", d: "A site that converts, not a brochure." },
  { v: "content", l: "Content (video / photo)", d: "Brand video, headshots, story-driven media." },
  { v: "ads", l: "Paid ads & social", d: "Meta + LinkedIn that fills your calendar." },
  { v: "print", l: "Print collateral / signage", d: "Stationery, decks, office presence." },
  { v: "unsure", l: "Not sure yet — let's talk", d: "We'll help you map it." }
];

const CONFIDENCE = [
  { v: "clear", l: "I know exactly what I want", d: "Just need someone to build it. Short path (~3 min)." },
  { v: "guided", l: "I have a direction but want guidance", d: "Medium path with the key strategic questions (~5 min)." },
  { v: "discovery", l: "I'm starting from scratch", d: "Walk me through the full discovery (~8 min)." }
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
  websiteCurrent: string; websiteGoals: string;
  contentNeeds: string; adsBudget: string; printNeeds: string; timeline: string;
  brandValues: string[]; brandValuesCustom: string;
  brandPromise: string; brandStory: string;
  iconConcept: string | null;
};
const blank = (): Form => ({
  dbaStatus: null, dbaName: "", pitch: "", diff: [], diffCustom: "",
  audience: [], adjectives: [], nmLean: null, touchpoints: [],
  pHH: null, pLM: null, pQB: null, pII: null, pLN: null,
  typo: null, density: null, tone: null, mood: null,
  mark: null, accent: null,
  inspiration: "", refLikes: [], refUploads: [],
  avoid: [], vision: "", truth: [],
  websiteCurrent: "", websiteGoals: "", contentNeeds: "", adsBudget: "", printNeeds: "", timeline: "",
  brandValues: [], brandValuesCustom: "",
  brandPromise: "", brandStory: "",
  iconConcept: null,
});

// step plan
const LOGO_STEPS_FULL = ["dbaName","pitch","diff","audience","adjectives","brandValues","brandPromise","brandStory","nmLean","touchpoints","personality","typo","density","tone","mood","mark","iconConcept","accent","references","avoid","vision","truth"];
const LOGO_STEPS_GUIDED = ["dbaName","diff","audience","adjectives","brandValues","brandPromise","nmLean","touchpoints","mood","mark","iconConcept","accent","references","vision","truth"];
const LOGO_STEPS_CLEAR = ["dbaName","brandPromise","nmLean","mark","iconConcept","accent","touchpoints","references","vision","truth"];

// chapter assignment per step id
const CHAPTER: Record<string, number> = {
  dbaName: 0, pitch: 0, diff: 0, audience: 0, adjectives: 0,
  brandValues: 1, brandPromise: 1, brandStory: 1,
  personality: 2, mood: 2, tone: 2, vision: 2, truth: 2,
  nmLean: 3, typo: 3, density: 3, mark: 3, iconConcept: 3, accent: 3, references: 3, avoid: 3,
  touchpoints: 4, svc_website: 4, svc_content: 4, svc_ads: 4, svc_print: 4, svc_timeline: 4,
};
const CHAPTERS = [
  { n: "01", t: "Who you are" },
  { n: "02", t: "What you stand for" },
  { n: "03", t: "How it should feel" },
  { n: "04", t: "What it looks like" },
  { n: "05", t: "Where it lives" },
];

// host notes — appear after answering certain steps
const HOST_NOTES: Record<string, (f: Form) => string | null> = {
  adjectives: (f) => f.adjectives.length >= 2 ? `Got it — ${f.adjectives.slice(0,3).join(", ").toLowerCase()}. That already rules out half the directions.` : null,
  mood: (f) => {
    const m = MOODS.find(x => x.id === f.mood);
    return m ? `${m.name} it is. We'll keep checking every choice against that.` : null;
  },
  vision: (f) => f.vision.length > 20 ? `That's the line we'll design against.` : null,
  personality: (f) => {
    const t = [f.pHH, f.pQB, f.pLN].filter(Boolean);
    return t.length === 3 ? `That's a clear fingerprint. Onto the visuals.` : null;
  },
};

function buildPlan(confidence: string, services: string[]): string[] {
  const wantsLogo = services.includes("logo") || services.includes("unsure");
  let steps: string[] = [];
  if (wantsLogo) {
    steps = confidence === "clear" ? [...LOGO_STEPS_CLEAR]
          : confidence === "guided" ? [...LOGO_STEPS_GUIDED]
          : [...LOGO_STEPS_FULL];
  }
  if (services.includes("website")) steps.push("svc_website");
  if (services.includes("content")) steps.push("svc_content");
  if (services.includes("ads")) steps.push("svc_ads");
  if (services.includes("print")) steps.push("svc_print");
  steps.push("svc_timeline");
  return steps;
}
function engagementTier(c: string, s: string[]) {
  const n = s.filter(x => x !== "unsure").length;
  if (c === "clear" && n <= 1) return "Light";
  if (c === "discovery" || n >= 3) return "Full Studio";
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
  const adjStr = f.adjectives.length ? f.adjectives.join(", ").toLowerCase() : "professional and trustworthy";
  const audStr = f.audience.length ? f.audience.join(" and ").toLowerCase() : "a broad client base";
  const nmStr = f.nmLean === "nm_lead" ? "an NM-led lockup with the DBA presented as a named sub-brand"
    : f.nmLean === "equal" ? "an equal-weight lockup co-branded with Northwestern Mutual"
    : "an NM-compliant lockup TBD";
  const truthStr = f.truth[0] || "feel timeless and credible";
  const valuesStr = (f.brandValues.length || f.brandValuesCustom)
    ? `Stands for ${[...f.brandValues, f.brandValuesCustom].filter(Boolean).join(", ").toLowerCase()}.`
    : "";
  const promiseStr = f.brandPromise ? ` Promise to clients: "${f.brandPromise.trim()}".` : "";
  return `${dba} — ${confidence.toUpperCase()} confidence · scope: ${services.join(", ") || "logo"}. ${valuesStr}${promiseStr} Identity should feel ${moodStr}, ${toneStr} in character, built on ${typoStr} using ${markStr} with ${acStr}. Practice serves ${audStr} and is described as ${adjStr}. Lockup approach: ${nmStr}. Above all, this brand must ${truthStr.toLowerCase()}.`;
}
function visionSummary(name: string, f: Form): string {
  const dba = f.dbaName || `${sn(name)} Financial`;
  const mood = MOODS.find(x => x.id === f.mood)?.name.toLowerCase() || "distinctive";
  const tone = f.tone === "established" ? "established but" : "forward and";
  const typo = f.typo === "serif" ? "classic serif typography" : "modern sans-serif typography";
  const mark = f.mark === "icon" ? "a paired icon and wordmark"
    : f.mark === "monogram" ? "a monogram + wordmark lockup"
    : "a confident wordmark";
  const ac = ACC.find(a => a.hex === f.accent)?.name.toLowerCase() || "a secondary";
  const truth = (f.truth[0] || "Must feel timeless").replace(/^Must /,"").toLowerCase();
  const promise = f.brandPromise ? ` Clients walk away with ${f.brandPromise.trim().replace(/[.!]$/,"").toLowerCase()}.` : "";
  return `You want a brand that feels ${mood} — ${tone} ${f.tone === "established" ? "deliberately restrained" : "personal"}. It's built on ${typo}, ${mark}, and ${ac} accent that lives on top of NM blue. It serves ${(f.audience[0] || "your clients").toLowerCase()} and, above all, it has to ${truth}.${promise} That's ${dba}.`;
}

// ============================================================
// UI primitives — dark theme
// ============================================================
const C = {
  surface: "rgba(255,255,255,0.025)",
  surfaceHi: "rgba(255,255,255,0.05)",
  border: "rgba(255,255,255,0.08)",
  borderHi: "rgba(255,255,255,0.18)",
  ring: "rgba(255,184,28,0.35)",
  text: "hsl(40 10% 94%)",
  mute: "hsl(240 4% 60%)",
  faint: "hsl(240 4% 40%)",
};

function OCard({ sel, onClick, children, style = {} }: any) {
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
function Chip({ on, onClick, children, danger = false }: any) {
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
function Q({ label, sub, why, host, children }: any) {
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
const TA = (props: any) => (
  <textarea {...props} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 16px", fontSize: 14, fontFamily: "inherit", color: C.text, resize: "none", outline: "none", lineHeight: 1.6, ...props.style }} />
);
const TxtInput = (props: any) => (
  <input {...props} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 15px", fontSize: 14, fontFamily: "inherit", color: C.text, outline: "none", ...props.style }} />
);

// Mockup-tile button — used everywhere a choice has a visual
function MockTile({ sel, onClick, label, sub, children, recommended }: any) {
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

// ============================================================
// Reference step
// ============================================================
function ReferenceStep({ form, set, tog }: any) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [flipped, setFlipped] = useState<string | null>(null);

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
    <Q label="Logos that resonate with you." sub="Tap any below that catch your eye, or upload references. Tap a second time to see what we'd take from each." why="Your gut reaction tells us more than any description." host="No wrong answers — just what you can't look away from.">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 18 }}>
        {REFS.map(r => {
          const on = form.refLikes.includes(r.id);
          const flip = flipped === r.id;
          return (
            <button key={r.id} onClick={() => { if (!on) tog("refLikes", r.id); else setFlipped(flip ? null : r.id); }} style={{
              background: on ? "rgba(14,73,123,0.18)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${on ? NM_BLUE : C.border}`,
              borderRadius: 10, padding: 12, height: 80,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontFamily: "inherit", fontSize: 14,
              transition: "all .2s ease", textAlign: "center", lineHeight: 1.3,
              ...(flip ? { fontFamily: "'Outfit',sans-serif", color: EMERALD, fontSize: 11, fontWeight: 400 } : REF_STYLE[r.id] || {}),
            }}>
              {flip ? r.takeaway : r.label}
            </button>
          );
        })}
      </div>
      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
        <div style={{ fontSize: 11, color: C.mute, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 8 }}>Or upload your own references</div>
        <div onClick={() => fileRef.current?.click()} style={{
          border: `1.5px dashed ${C.border}`, borderRadius: 10, padding: "20px", textAlign: "center",
          cursor: "pointer", color: C.mute, fontSize: 13, background: C.surface,
        }}>
          {busy ? "Uploading…" : `Drop or click to upload (max 3 · 5MB each) — ${form.refUploads.length}/3 used`}
        </div>
        <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={onUpload} />
        {err && <div style={{ color: "#e8a4a4", fontSize: 12, marginTop: 6 }}>{err}</div>}
        {form.refUploads.length > 0 && (
          <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
            {form.refUploads.map((p: string) => (
              <div key={p} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 10px", fontSize: 11, color: C.mute, display: "flex", alignItems: "center", gap: 8 }}>
                {p.split("-").slice(1).join("-").slice(0, 24)}…
                <button onClick={() => set("refUploads", form.refUploads.filter((x: string) => x !== p))} style={{ background: "transparent", border: "none", color: C.faint, cursor: "pointer", fontSize: 14 }}>×</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Q>
  );
}

// ============================================================
// Personality slider axis
// ============================================================
function AxisSlider({ axis, value, onSet }: { axis: typeof AXES[number]; value: string | null; onSet: (v: string) => void }) {
  const [l, lv, rv, r, , ld, rd] = axis;
  const sel = (v: string, on: boolean) => ({
    flex: 1, padding: "14px 16px", fontFamily: "inherit", cursor: "pointer",
    border: "none", textAlign: v === lv ? "left" as const : "right" as const,
    background: on ? "rgba(68,160,120,0.18)" : "transparent",
    color: on ? EMERALD : C.mute,
    fontWeight: on ? 600 : 400, transition: "all .18s ease",
  });
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", display: "flex", alignItems: "stretch" }}>
      <button onClick={() => onSet(lv)} style={sel(lv, value === lv)}>
        <div style={{ fontSize: 13 }}>{value === lv ? "✓ " : ""}{l}</div>
        <div style={{ fontSize: 10, color: C.faint, marginTop: 2 }}>{ld}</div>
      </button>
      <div style={{ width: 1, background: C.border }} />
      <button onClick={() => onSet(rv)} style={sel(rv, value === rv)}>
        <div style={{ fontSize: 13 }}>{r}{value === rv ? " ✓" : ""}</div>
        <div style={{ fontSize: 10, color: C.faint, marginTop: 2 }}>{rd}</div>
      </button>
    </div>
  );
}


// "Not sure yet" pill for service detail steps — lets prospects move on without writing copy.
function SvcSkip({ field, value, set }: { field: string; value: string; set: (k: any, v: any) => void }) {
  const skipped = value === "__exploring__";
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
      <button onClick={() => set(field, skipped ? "" : "__exploring__")} style={{
        padding: "8px 14px", borderRadius: 100, fontSize: 12, fontFamily: "inherit",
        border: `1px solid ${skipped ? EMERALD : C.border}`,
        background: skipped ? "rgba(68,160,120,0.15)" : "transparent",
        color: skipped ? EMERALD : C.mute, cursor: "pointer",
      }}>
        {skipped ? "✓ Just exploring — skip details" : "Not sure yet — just put me on your radar"}
      </button>
    </div>
  );
}

// ============================================================
// Step renderer
// ============================================================
function StepRender({ id, form, set, tog, name }: any) {
  const dbaPreview = form.dbaName || sn(name);
  const rec = (form.audience.includes("Business owners") || form.audience.includes("High-net-worth families")) && form.touchpoints.length >= 3;
  const spec = deriveSpec(form, dbaPreview);

  switch (id) {
    case "dbaName":
      return (
        <Q label="What's your DBA?" sub="Your practice name as it should appear in the lockup." host="Most important answer — everything renders against this in real time." why="Anchors all preview tiles to your real brand.">
          <div style={{ marginBottom: 16 }}>
            {[{ v: "have", l: "I have a name" }, { v: "few", l: "I have a few I'm considering" }, { v: "none", l: "Help me name it" }].map(o => (
              <OCard key={o.v} sel={form.dbaStatus === o.v} onClick={() => set("dbaStatus", o.v)}>{o.l}</OCard>
            ))}
          </div>
          {form.dbaStatus && (
            <TxtInput value={form.dbaName} onChange={(e: any) => set("dbaName", e.target.value)} placeholder={form.dbaStatus === "none" ? "Working name (we'll refine it)" : "Doe Wealth Strategies"} />
          )}
        </Q>
      );
    case "pitch":
      return (
        <Q label="In one sentence — what do you actually do?" sub="No NM script. Talk like you'd talk to a friend at a dinner." why="Tells us the voice, not just the offering." host="Imagine someone asks at a dinner party. That answer.">
          <TA value={form.pitch} onChange={(e: any) => set("pitch", e.target.value)} rows={4} maxLength={240} placeholder="I help business owners in Central Florida design the second half of their financial life so it actually feels intentional." />
          <div style={{ textAlign: "right", fontSize: 11, color: C.faint, marginTop: 4 }}>{form.pitch.length}/240</div>
        </Q>
      );
    case "diff":
      return (
        <Q label="What makes your practice different?" sub="Select all that apply." why="Differentiators often become the emotional anchor of the brand.">
          <div style={{ marginBottom: 12 }}>{DIFF.map(d => <Chip key={d} on={form.diff.includes(d)} onClick={() => tog("diff", d)}>{d}</Chip>)}</div>
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
          <div style={{ fontSize: 12, color: C.faint }}>{form.adjectives.length}/3 selected</div>
        </Q>
      );
    case "nmLean":
      return (
        <Q label="Choose your NM-compliant lockup approach." sub="Per NM brand guidelines, the Northwestern Mutual lockup must remain primary." why="Sets the visual hierarchy.">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {NM_LEAN.map(o => (
              <MockTile key={o.v} sel={form.nmLean === o.v} onClick={() => set("nmLean", o.v)} label={o.l} sub={o.d}>
                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "14px 12px", height: 86, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: o.v === "nm_lead" ? 11 : 9, fontWeight: 600, color: "#f5f0e8", letterSpacing: ".05em", lineHeight: 1.2 }}>NORTHWESTERN<br/>MUTUAL</div>
                  <div style={{ width: 1, height: 30, background: "rgba(255,255,255,.18)" }} />
                  <div style={{ fontFamily: fontFor(spec), fontSize: o.v === "equal" ? 11 : 9, color: o.v === "equal" ? "#f5f0e8" : "rgba(245,240,232,.5)", fontWeight: weightFor(spec), letterSpacing: spec.typo === "sans" ? ".15em" : "0" }}>{spec.typo === "sans" ? spec.word : spec.short}</div>
                </div>
              </MockTile>
            ))}
          </div>
        </Q>
      );
    case "touchpoints":
      return (
        <Q label="Where will this primarily live?" sub="Select all that apply." why="A logo for a 40px social avatar is designed differently than one built for letterhead.">
          <div>{TOUCH.map(t => <Chip key={t} on={form.touchpoints.includes(t)} onClick={() => tog("touchpoints", t)}>{t}</Chip>)}</div>
        </Q>
      );
    case "personality":
      return (
        <Q label="Brand personality — pick a side." sub="Five axes. Tap the side that feels closer — no middle ground." why="Forced choice reveals more than a slider ever does." host="Don't overthink. First instinct wins.">
          <div style={{ display: "grid", gap: 10 }}>
            {AXES.map(axis => (
              <AxisSlider key={axis[4]} axis={axis} value={(form as any)[axis[4]]} onSet={(v) => set(axis[4] as keyof Form, v)} />
            ))}
          </div>
        </Q>
      );
    case "typo":
      return (
        <Q label="Typography — this or that." sub="Which feels more like you?" why="Serif feels authoritative; sans feels modern.">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <MockTile sel={form.typo === "serif"} onClick={() => set("typo", "serif")} label="Serif / classic" sub="Heritage, weight, considered.">
              <MiniCard s={{ ...spec, typo: "serif" }} />
            </MockTile>
            <MockTile sel={form.typo === "sans"} onClick={() => set("typo", "sans")} label="Sans / modern" sub="Open, contemporary, geometric.">
              <MiniCard s={{ ...spec, typo: "sans" }} />
            </MockTile>
          </div>
        </Q>
      );
    case "density":
      return (
        <Q label="Design density — this or that." sub="How should your brand use space?" why="Minimal feels confident; layered feels comprehensive.">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <MockTile sel={form.density === "minimal"} onClick={() => set("density", "minimal")} label="Minimal / open" sub="Confident silence around the mark.">
              <MiniCard s={{ ...spec, density: "minimal" }} />
            </MockTile>
            <MockTile sel={form.density === "rich"} onClick={() => set("density", "rich")} label="Layered / rich" sub="More information, more presence.">
              <MiniCard s={{ ...spec, density: "rich" }} />
            </MockTile>
          </div>
        </Q>
      );
    case "tone":
      return (
        <Q label="Overall tone — this or that." sub="If your brand walked into a room, how would it carry itself?" why="Both are professional — they project differently.">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <MockTile sel={form.tone === "established"} onClick={() => set("tone", "established")} label="Established / traditional">
              <MiniCard s={{ ...spec, tone: "established" }} />
            </MockTile>
            <MockTile sel={form.tone === "forward"} onClick={() => set("tone", "forward")} label="Forward / contemporary">
              <MiniCard s={{ ...spec, tone: "forward" }} />
            </MockTile>
          </div>
        </Q>
      );
    case "mood":
      return (
        <Q label="Which aesthetic resonates most?" sub="Pick the one that feels closest. Each shows your name on a real card." why="Your gut reaction is more honest than any description.">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {MOODS.map(m => {
              const moodSpec = { ...spec, ...m.patch as any };
              return (
                <MockTile key={m.id} sel={form.mood === m.id} onClick={() => set("mood", m.id)} label={m.name} sub={m.desc}>
                  <MiniCard s={moodSpec} />
                </MockTile>
              );
            })}
          </div>
        </Q>
      );
    case "mark":
      return (
        <Q label="Mark structure — pick a direction." sub="Three approaches. Each renders your real DBA so you can see the difference." why="An icon adds versatility, a monogram adds personality, a wordmark is timeless.">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            <MockTile sel={form.mark === "wordmark"} onClick={() => set("mark", "wordmark")} label="Wordmark only">
              <MiniCard s={{ ...spec, mark: "wordmark" }} />
            </MockTile>
            <MockTile sel={form.mark === "icon"} onClick={() => set("mark", "icon")} label="Icon + wordmark" recommended={rec}>
              <MiniCard s={{ ...spec, mark: "icon" }} />
            </MockTile>
            <MockTile sel={form.mark === "monogram"} onClick={() => set("mark", "monogram")} label="Monogram + wordmark" sub="Your initials as the mark.">
              <MiniCard s={{ ...spec, mark: "monogram" as any }} />
            </MockTile>
          </div>
          <div style={{ fontSize: 11, color: C.faint, marginTop: 12, fontStyle: "italic" }}>This guides direction — your final icon is hand-crafted.</div>
          {rec && <div style={{ fontSize: 11, color: EMERALD, marginTop: 6, fontStyle: "italic" }}>Based on your other answers, an icon + wordmark gives the depth you need.</div>}
        </Q>
      );
    case "iconConcept":
      return (
        <Q label="What should the icon evoke?" sub="Pick a direction. We'll explore inside it." why="A short list of references for the design phase.">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {ICON_CONCEPTS.map(o => (
              <OCard key={o.v} sel={form.iconConcept === o.v} onClick={() => set("iconConcept", o.v)}>
                <div style={{ fontSize: 14, color: C.text, fontWeight: 500 }}>{o.l}</div>
                <div style={{ fontSize: 11, color: C.mute, marginTop: 3 }}>{o.d}</div>
              </OCard>
            ))}
          </div>
        </Q>
      );
    case "brandValues":
      return (
        <Q label="What does your brand stand for?" sub="Pick up to 3. These become the moral compass for every design choice." why="Visual decisions need values to test against." host="Pick what's true today — not aspirational.">
          <div style={{ marginBottom: 12 }}>
            {BRAND_VALUES.map(v => (
              <Chip key={v} on={form.brandValues.includes(v)} onClick={() => { if (form.brandValues.includes(v) || form.brandValues.length < 3) tog("brandValues", v); }}>{v}</Chip>
            ))}
          </div>
          <TxtInput value={form.brandValuesCustom} onChange={(e: any) => set("brandValuesCustom", e.target.value)} placeholder="Anything not listed..." />
          <div style={{ fontSize: 12, color: C.faint, marginTop: 8 }}>{form.brandValues.length}/3 selected</div>
        </Q>
      );
    case "brandPromise":
      return (
        <Q label="Finish the sentence." sub={`"When a client works with us, they walk away with ___."`} why="One line. We'll quote it back to you in the brief." host="Concrete is better than poetic.">
          <TA value={form.brandPromise} onChange={(e: any) => set("brandPromise", e.target.value)} rows={3} maxLength={140} placeholder="...a plan they actually understand and a partner who picks up the phone." />
          <div style={{ textAlign: "right", fontSize: 11, color: C.faint, marginTop: 4 }}>{form.brandPromise.length}/140</div>
        </Q>
      );
    case "brandStory":
      return (
        <Q label="What's the one belief that drives your practice?" sub="Optional. The conviction underneath the work." why="Often becomes the heart of the brand voice.">
          <TA value={form.brandStory} onChange={(e: any) => set("brandStory", e.target.value)} rows={4} maxLength={240} placeholder="Most advisors sell products. I think planning is closer to therapy — you can't shortcut the trust." />
          <div style={{ textAlign: "right", fontSize: 11, color: C.faint, marginTop: 4 }}>{form.brandStory.length}/240</div>
        </Q>
      );
    case "accent":
      return (
        <Q label="Choose your secondary accent." sub="NM Blue is locked as primary — these are NM-approved secondary accents that personalize you." why="Differentiates you from other NM advisors within compliance." host="Watch the card update live as you tap.">
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "rgba(14,73,123,0.18)", border: `1px solid ${NM_BLUE}`, borderRadius: 10, marginBottom: 16 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: NM_BLUE, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: "#cfdfee", fontWeight: 600 }}>NM Blue · Primary (locked)</div>
              <div style={{ fontSize: 11, color: C.mute }}>Required by NM brand guidelines</div>
            </div>
            <span style={{ fontSize: 10, color: "#cfdfee", background: "rgba(0,0,0,.3)", padding: "3px 8px", borderRadius: 4, letterSpacing: ".05em" }}>FIXED</span>
          </div>
          {ACC.filter(a => a.hex !== NM_BLUE).map(a => (
            <OCard key={a.hex} sel={form.accent === a.hex} onClick={() => set("accent", a.hex)} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: a.hex, flexShrink: 0, border: "0.5px solid rgba(255,255,255,.1)" }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: C.text }}>{a.name}</div>
                <div style={{ fontSize: 11, color: C.mute }}>{a.vibe}</div>
              </div>
              {form.accent === a.hex && <span style={{ color: EMERALD }}>✓</span>}
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
        <Q label="Five years from now — what do you want people to say when they see this logo?" sub="One sentence. Future tense. Be ambitious." why="Reveals what the brand needs to grow into." host="This is the line we'll design against.">
          <TA value={form.vision} onChange={(e: any) => set("vision", e.target.value)} rows={4} maxLength={200} placeholder={`"That logo tells you everything — serious, local, and built to last."`} />
          <div style={{ textAlign: "right", fontSize: 11, color: C.faint, marginTop: 4 }}>{form.vision.length}/200</div>
        </Q>
      );
    case "truth":
      return (
        <Q label="One thing that is non-negotiable." sub="This logo must ___. Choose your absolute floor.">
          <div>{TRUTH.map(t => <Chip key={t} on={form.truth.includes(t)} onClick={() => tog("truth", t)}>{t}</Chip>)}</div>
        </Q>
      );
    case "svc_website": {
      const sk = form.websiteGoals === "__exploring__";
      return (
        <Q label="Tell us about the website." sub="A few sentences is enough — or skip it if you're just exploring." host="No need to have it figured out. We can shape it together later.">
          <SvcSkip field="websiteGoals" value={form.websiteGoals} set={set} />
          {!sk && (<>
            <label style={{ fontSize: 11, color: C.mute, letterSpacing: ".08em", textTransform: "uppercase" }}>Current site (URL or "none")</label>
            <TxtInput value={form.websiteCurrent} onChange={(e: any) => set("websiteCurrent", e.target.value)} placeholder="https://..." style={{ marginTop: 6, marginBottom: 14 }} />
            <label style={{ fontSize: 11, color: C.mute, letterSpacing: ".08em", textTransform: "uppercase" }}>Goals & must-haves</label>
            <TA value={form.websiteGoals} onChange={(e: any) => set("websiteGoals", e.target.value)} rows={4} placeholder="Lead capture, team bios, scheduling, content hub..." style={{ marginTop: 6 }} />
          </>)}
        </Q>
      );
    }
    case "svc_content": {
      const sk = form.contentNeeds === "__exploring__";
      return (
        <Q label="What kind of content?" sub="Photo, video, social, website copy — or skip if you're not sure." host="Even 'I don't know yet' is a useful answer here.">
          <SvcSkip field="contentNeeds" value={form.contentNeeds} set={set} />
          {!sk && <TA value={form.contentNeeds} onChange={(e: any) => set("contentNeeds", e.target.value)} rows={5} placeholder="Quarterly brand video, headshots, weekly LinkedIn..." />}
        </Q>
      );
    }
    case "svc_ads": {
      const sk = form.adsBudget === "__exploring__";
      return (
        <Q label="Paid ads & social — what's the goal?" sub="Approximate budget and what it should drive — or skip and we'll discuss." host="Numbers can come later. Just flag if it's on your mind.">
          <SvcSkip field="adsBudget" value={form.adsBudget} set={set} />
          {!sk && <TA value={form.adsBudget} onChange={(e: any) => set("adsBudget", e.target.value)} rows={5} placeholder="~$2k/mo, Meta + LinkedIn, qualified business-owner leads..." />}
        </Q>
      );
    }
    case "svc_print": {
      const sk = form.printNeeds === "__exploring__";
      return (
        <Q label="Print & physical collateral?" sub="Stationery, signage, decks, events — or skip if it's just on your radar." host="Plenty of advisors don't think about print until the brand lands. That's fine.">
          <SvcSkip field="printNeeds" value={form.printNeeds} set={set} />
          {!sk && <TA value={form.printNeeds} onChange={(e: any) => set("printNeeds", e.target.value)} rows={5} placeholder="Office signage, business cards, client folders..." />}
        </Q>
      );
    }
    case "svc_timeline": {
      const sk = form.timeline === "__exploring__";
      return (
        <Q label="When are you hoping to launch?" sub="Approximate is fine. Or tell us you're still figuring it out.">
          <SvcSkip field="timeline" value={form.timeline} set={set} />
          {!sk && <TxtInput value={form.timeline} onChange={(e: any) => set("timeline", e.target.value)} placeholder="End of Q1, no rush, ASAP for an event on..." />}
        </Q>
      );
    }
    default: return null;
  }
}

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
    case "iconConcept": return f.iconConcept !== null;
    case "brandValues": return f.brandValues.length > 0 || f.brandValuesCustom.trim().length > 1;
    case "brandPromise": return f.brandPromise.trim().length > 8;
    case "brandStory": return true;
    case "accent": return f.accent !== null;
    case "references": return true;
    case "avoid": return true;
    case "vision": return f.vision.trim().length > 5;
    case "truth": return f.truth.length > 0;
    case "svc_website": return f.websiteGoals === "__exploring__" || f.websiteGoals.trim().length > 5 || f.websiteCurrent.trim().length > 3;
    case "svc_content": return f.contentNeeds === "__exploring__" || f.contentNeeds.trim().length > 5;
    case "svc_ads": return f.adsBudget === "__exploring__" || f.adsBudget.trim().length > 5;
    case "svc_print": return f.printNeeds === "__exploring__" || f.printNeeds.trim().length > 5;
    case "svc_timeline": return f.timeline === "__exploring__" || f.timeline.trim().length > 1;
    default: return true;
  }
}

// ============================================================
// Vision Board (right rail, desktop only)
// ============================================================
function VisionBoard({ spec, name }: { spec: ReturnType<typeof deriveSpec>; name: string }) {
  return (
    <div style={{ position: "sticky", top: 40 }}>
      <div style={{ fontSize: 10, color: C.faint, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 12 }}>Live preview · business card</div>
      <div style={{ marginBottom: 16 }}><MockupDisclaimer compact /></div>
      <motion.div key={`bc-${spec.dba}-${spec.tone}-${spec.typo}-${spec.accent}-${spec.mark}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <BusinessCard s={spec} size={1.0} name={name} />
      </motion.div>
      <div style={{ fontSize: 11, color: C.faint, marginTop: 18, lineHeight: 1.5, fontStyle: "italic", textAlign: "center" }}>
        Directional preview using your real DBA. Your final identity is hand-crafted in design phase.
      </div>
    </div>
  );
}

// ============================================================
// Landing
// ============================================================
function Landing({ host, onStart }: { host: string; onStart: (n: string, e: string, p: string, s: string[], c: string) => void }) {
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
  const first = sn(name);

  return (
    <DiscoveryShell>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 11, letterSpacing: ".22em", color: EMERALD, textTransform: "uppercase", marginBottom: 18 }}>NM Advisor · Brand Discovery</div>
          <h1 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 42, fontWeight: 200, color: C.text, marginBottom: 14, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            {step === 0 && first ? <>Hi {first}.</> : "A short session about your brand."}
          </h1>
          <p style={{ fontSize: 15, color: C.mute, lineHeight: 1.6, maxWidth: 460, margin: "0 auto" }}>
            {step === 0
              ? <>{host} sent you here because you're thinking about your brand. The next 6 minutes are about <em>you</em> — not a form. You'll watch your brand take shape as you answer.</>
              : "Your answers shape what we recommend — and what we don't."}
          </p>
        </div>

        {step === 0 && (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
              <div>
                <label style={{ fontSize: 11, color: C.mute, letterSpacing: ".08em", textTransform: "uppercase" }}>Your full name</label>
                <TxtInput value={name} onChange={(e: any) => setName(e.target.value)} placeholder="Jane Doe" style={{ marginTop: 6 }} />
              </div>
              <div>
                <label style={{ fontSize: 11, color: C.mute, letterSpacing: ".08em", textTransform: "uppercase" }}>Email</label>
                <TxtInput type="email" value={email} onChange={(e: any) => setEmail(e.target.value)} placeholder="jane@nm.com" style={{ marginTop: 6 }} />
              </div>
              <div>
                <label style={{ fontSize: 11, color: C.mute, letterSpacing: ".08em", textTransform: "uppercase" }}>Practice or DBA name (optional)</label>
                <TxtInput value={practice} onChange={(e: any) => setPractice(e.target.value)} placeholder="Doe Wealth Strategies" style={{ marginTop: 6 }} />
              </div>
            </div>
            <PrimaryButton disabled={!ok0} onClick={() => setStep(1)}>Continue →</PrimaryButton>
          </>
        )}

        {step === 1 && (
          <>
            <h2 style={{ fontSize: 22, color: C.text, marginBottom: 6, fontWeight: 300 }}>What can we help with?</h2>
            <p style={{ fontSize: 13, color: C.mute, marginBottom: 4 }}>Pick everything you're considering — even loosely.</p>
            <p style={{ fontSize: 11, color: EMERALD, fontStyle: "italic", marginBottom: 20 }}>Most NM advisors who refresh a logo find they need 1–2 other pieces within 6 months. Better to map it now.</p>
            <div style={{ marginBottom: 24 }}>
              {SERVICES.map(s => (
                <OCard key={s.v} sel={services.includes(s.v)} onClick={() => tog(s.v)}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ color: services.includes(s.v) ? EMERALD : C.faint, fontSize: 16 }}>{services.includes(s.v) ? "●" : "○"}</span>
                    <div>
                      <div style={{ color: C.text, fontSize: 14 }}>{s.l}</div>
                      <div style={{ color: C.mute, fontSize: 12, marginTop: 2 }}>{s.d}</div>
                    </div>
                  </div>
                </OCard>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <BackButton onClick={() => setStep(0)} />
              <PrimaryButton disabled={!ok1} onClick={() => wantsLogo ? setStep(2) : onStart(name.trim(), email.trim(), practice.trim(), services, "guided")}>{wantsLogo ? "Continue →" : "Begin →"}</PrimaryButton>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 style={{ fontSize: 22, color: C.text, marginBottom: 6, fontWeight: 300 }}>How clear is your vision for the logo?</h2>
            <p style={{ fontSize: 13, color: C.mute, marginBottom: 24 }}>Honest answers shorten or lengthen what comes next.</p>
            <div style={{ marginBottom: 24 }}>
              {CONFIDENCE.map(c => (
                <OCard key={c.v} sel={confidence === c.v} onClick={() => setConfidence(c.v)}>
                  <div style={{ fontSize: 14, color: C.text, fontWeight: 500 }}>{c.l}</div>
                  <div style={{ fontSize: 12, color: C.mute, marginTop: 3 }}>{c.d}</div>
                </OCard>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <BackButton onClick={() => setStep(1)} />
              <PrimaryButton disabled={!confidence} onClick={() => onStart(name.trim(), email.trim(), practice.trim(), services, confidence)}>Begin discovery →</PrimaryButton>
            </div>
          </>
        )}

        <div style={{ textAlign: "center", marginTop: 40, fontSize: 10, color: C.faint, letterSpacing: ".18em", textTransform: "uppercase" }}>
          A ProjGrowth × Northwestern Mutual session
        </div>
      </motion.div>
    </DiscoveryShell>
  );
}

function PrimaryButton({ children, disabled, onClick }: any) {
  return (
    <button disabled={disabled} onClick={onClick} style={{
      width: "100%", background: disabled ? "rgba(255,255,255,.06)" : EMERALD,
      color: disabled ? C.faint : "#0a0d11",
      border: "none", padding: "16px", borderRadius: 10,
      fontSize: 14, fontFamily: "'Outfit',sans-serif", fontWeight: 600, letterSpacing: ".02em",
      cursor: disabled ? "default" : "pointer",
      boxShadow: disabled ? "none" : "0 12px 30px -10px rgba(68,160,120,0.5)",
      transition: "all .2s ease",
    }}>{children}</button>
  );
}
function BackButton({ onClick }: any) {
  return (
    <button onClick={onClick} style={{ flex: "0 0 auto", background: "transparent", border: `1px solid ${C.border}`, color: C.mute, padding: "14px 20px", borderRadius: 10, fontFamily: "inherit", fontSize: 13, cursor: "pointer" }}>← Back</button>
  );
}

// ============================================================
// Reveal screen
// ============================================================
function Reveal({ name, form, services, host, onRefine, onSubmit }: any) {
  const dba = form.dbaName || `${sn(name)} Financial`;
  const spec = deriveSpec(form, dba);
  const summary = visionSummary(name, form);

  return (
    <DiscoveryShell wide>
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 11, letterSpacing: ".22em", color: EMERALD, textTransform: "uppercase", marginBottom: 14 }}>The Reveal · Chapter 05</div>
          <h1 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 56, fontWeight: 200, letterSpacing: "-0.025em", lineHeight: 1.05, marginBottom: 18 }}>
            This is <span style={{ fontStyle: "italic", color: EMERALD }}>{dba}</span>.
          </h1>
          <p style={{ fontSize: 15, color: C.mute, maxWidth: 640, margin: "0 auto", lineHeight: 1.7 }}>
            {summary}
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
          <MockupDisclaimer />
        </div>

        {/* Hero card */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 50 }}>
          <motion.div whileHover={{ rotateX: 4, rotateY: -4, scale: 1.02 }} transition={{ type: "spring", stiffness: 200, damping: 18 }} style={{ transformStyle: "preserve-3d", perspective: 1200 }}>
            <BusinessCard s={spec} size={1.3} name={name} />
          </motion.div>
        </div>

        {/* surfaces this extends to */}
        <div style={{ textAlign: "center", marginBottom: 50, fontSize: 12, color: C.faint, letterSpacing: ".15em", textTransform: "uppercase" }}>
          This system extends to · website · signage · social · stationery
        </div>

        <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`, borderRadius: 16, padding: "26px 28px", marginBottom: 30, maxWidth: 720, margin: "0 auto 30px" }}>
          <div style={{ fontSize: 11, color: EMERALD, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 10 }}>{host}'s read</div>
          <p style={{ fontSize: 15, color: C.text, lineHeight: 1.7, fontStyle: "italic" }}>
            "{form.adjectives.length ? form.adjectives.slice(0,3).join(", ").toLowerCase() : "thoughtful"}, {form.tone === "established" ? "established" : "forward"}, and {form.audience[0] ? `built for ${form.audience[0].toLowerCase()}` : "specific"}. That's a brand we can actually build — and one most NM advisors don't earn the right to wear."
          </p>
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", maxWidth: 520, margin: "0 auto" }}>
          <button onClick={onRefine} style={{ flex: 1, background: "transparent", border: `1px solid ${C.borderHi}`, color: C.text, padding: "16px", borderRadius: 10, fontSize: 14, fontFamily: "'Outfit',sans-serif", fontWeight: 500, cursor: "pointer" }}>
            ← Refine an answer
          </button>
          <button onClick={onSubmit} style={{ flex: 1.4, background: EMERALD, color: "#0a0d11", border: "none", padding: "16px", borderRadius: 10, fontSize: 14, fontFamily: "'Outfit',sans-serif", fontWeight: 600, cursor: "pointer", boxShadow: "0 12px 30px -10px rgba(68,160,120,0.5)" }}>
            Send this to {host} →
          </button>
        </div>
      </motion.div>
    </DiscoveryShell>
  );
}



// ============================================================
// Thanks
// ============================================================
function Thanks({ name, email, practice, form, services, confidence, host }: any) {
  const dba = form.dbaName || `${sn(name)} Financial`;
  const spec = deriveSpec(form, dba);
  const summary = visionSummary(name, form);
  const brief = genBrief(name, form, services, confidence);
  const tier = engagementTier(confidence, services);

  const onDownload = () => {
    downloadBrandBriefPdf({
      name, email, practice: practice || dba, dba,
      visionSummary: summary, brief, responses: form,
      services, confidence, tier,
    });
  };

  return (
    <DiscoveryShell>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ textAlign: "center", paddingTop: 12 }}>
        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: "50%", background: "rgba(68,160,120,0.15)", border: `1px solid ${EMERALD}`, color: EMERALD, fontSize: 24, marginBottom: 22 }}>✓</div>
        <div style={{ fontSize: 11, letterSpacing: ".22em", color: EMERALD, textTransform: "uppercase", marginBottom: 12 }}>Brief received</div>
        <h1 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 36, fontWeight: 200, marginBottom: 14, letterSpacing: "-0.02em" }}>
          Thank you, {sn(name)}.
        </h1>
        <p style={{ color: C.mute, fontSize: 15, lineHeight: 1.7, marginBottom: 14, maxWidth: 520, margin: "0 auto 14px" }}>
          We'll be in touch within <strong style={{ color: C.text, fontWeight: 500 }}>24–48 hours</strong> with a short, written read on what we heard — plus the smallest version of the engagement that gets you what you actually need.
        </p>
        <p style={{ color: C.faint, fontSize: 13, lineHeight: 1.6, marginBottom: 28, maxWidth: 460, margin: "0 auto 28px", fontStyle: "italic" }}>
          In the meantime, here's your brand brief — in your own words.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 36, flexWrap: "wrap" }}>
          <button onClick={onDownload} style={{ background: EMERALD, color: "#0a0d11", border: "none", padding: "14px 26px", borderRadius: 10, fontSize: 14, fontFamily: "'Outfit',sans-serif", fontWeight: 600, cursor: "pointer", boxShadow: "0 12px 30px -10px rgba(68,160,120,0.5)", display: "inline-flex", alignItems: "center", gap: 8 }}>
            ↓ Download your brief (PDF)
          </button>
          <a href="/" style={{ background: "transparent", border: `1px solid ${C.borderHi}`, color: C.text, padding: "14px 26px", borderRadius: 10, fontSize: 14, fontFamily: "'Outfit',sans-serif", fontWeight: 500, textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
            Back to ProjGrowth
          </a>
        </div>

        <div style={{ marginBottom: 14 }}><MockupDisclaimer compact /></div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <BusinessCard s={spec} size={0.9} name={name} />
        </div>
        <div style={{ fontSize: 11, color: C.faint, letterSpacing: ".18em", textTransform: "uppercase" }}>A keepsake from your session</div>
      </motion.div>
    </DiscoveryShell>
  );
}

// ============================================================
// Main
// ============================================================
const STORE = "nm_discovery_v3";

export default function Discovery() {
  const url = new URL(typeof window !== "undefined" ? window.location.href : "https://x");
  const hostSlug = url.searchParams.get("host") || "";
  const host = hostSlug === "cole" ? "Cole" : hostSlug ? hostSlug.charAt(0).toUpperCase() + hostSlug.slice(1) : "the ProjGrowth team";

  const [phase, setPhase] = useState<"landing" | "form" | "reveal" | "submitting" | "done">("landing");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [practice, setPractice] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [confidence, setConfidence] = useState("guided");
  const [plan, setPlan] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(blank());
  const [err, setErr] = useState("");
  const [hostNote, setHostNote] = useState<string | null>(null);

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

  // auto-skip iconConcept when user picked wordmark
  useEffect(() => {
    if (phase !== "form") return;
    if (plan[step] === "iconConcept" && form.mark === "wordmark") {
      setStep(s => Math.min(s + 1, plan.length - 1));
    }
  }, [step, plan, form.mark, phase]);

  const set = (k: keyof Form, v: any) => setForm(f => ({ ...f, [k]: v }));
  const tog = (k: keyof Form, v: any) => setForm(f => {
    const a = (f[k] as string[]) || [];
    return { ...f, [k]: a.includes(v) ? a.filter(x => x !== v) : [...a, v] };
  });

  const startForm = (n: string, e: string, p: string, svcs: string[], conf: string) => {
    setName(n); setEmail(e); setPractice(p); setServices(svcs); setConfidence(conf);
    const newPlan = buildPlan(conf, svcs);
    setPlan(newPlan);
    setForm({ ...blank(), dbaName: p });
    setStep(0); setPhase("form");
  };

  const submit = async () => {
    setPhase("submitting"); setErr("");
    try {
      const brief = genBrief(name, form, services, confidence);
      const tier = engagementTier(confidence, services);
      const summary = visionSummary(name, form);
      const { error } = await supabase.functions.invoke("submit-discovery", {
        body: {
          full_name: name, email, practice_name: practice,
          responses: { ...form, vision_summary: summary, host: host },
          generated_brief: brief,
          confidence, services, engagement_tier: tier,
          reference_image_urls: form.refUploads
        },
      });
      if (error) throw error;
      try { localStorage.removeItem(STORE); } catch {}
      setPhase("done");
    } catch (e: any) {
      setErr(e?.message || "Submission failed. Please try again.");
      setPhase("reveal");
    }
  };

  const onNext = () => {
    const id = plan[step];
    if (!canAdvance(id, form)) return;
    const note = HOST_NOTES[id]?.(form);
    if (note && note !== hostNote) setHostNote(note);
    // skip iconConcept if user picked wordmark-only
    let next = step + 1;
    while (next < plan.length && plan[next] === "iconConcept" && form.mark === "wordmark") next++;
    if (next < plan.length) { setStep(next); return; }
    setPhase("reveal");
  };

  // ⌨️ Keyboard nav: Enter = next, ← / → = back / next
  useEffect(() => {
    if (phase !== "form") return;
    const handler = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      const inField = t && (t.tagName === "TEXTAREA" || (t.tagName === "INPUT" && (t as HTMLInputElement).type !== "button"));
      if (e.key === "Enter" && !e.shiftKey && !inField) { e.preventDefault(); onNext(); }
      else if (e.key === "ArrowRight" && !inField) { e.preventDefault(); onNext(); }
      else if (e.key === "ArrowLeft" && !inField && step > 0) {
        e.preventDefault();
        let prev = step - 1;
        while (prev >= 0 && plan[prev] === "iconConcept" && form.mark === "wordmark") prev--;
        if (prev >= 0) setStep(prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, step, plan, form, hostNote]);

  const dbaPreview = form.dbaName || sn(name);
  const spec = useMemo(() => deriveSpec(form, dbaPreview), [form, dbaPreview]);

  if (phase === "landing") return <Landing host={host} onStart={startForm} />;
  if (phase === "done") return <Thanks name={name} email={email} practice={practice} form={form} services={services} confidence={confidence} host={host} />;
  if (phase === "submitting") {
    return <DiscoveryShell><div style={{ textAlign: "center", padding: 80, color: C.mute }}>Sending your vision to {host}…</div></DiscoveryShell>;
  }
  if (phase === "reveal") {
    return <Reveal name={name} form={form} services={services} host={host} onRefine={() => { setPhase("form"); setStep(plan.length - 1); }} onSubmit={submit} />;
  }

  const TOTAL = plan.length;
  const cn = canAdvance(plan[step], form);
  const chapter = CHAPTER[plan[step]] ?? 0;
  const showVisionBoard = ["mood","mark","iconConcept","accent","tone","typo","density","nmLean","references"].includes(plan[step]);

  return (
    <DiscoveryShell wide={showVisionBoard}>
      <div style={{ display: "grid", gridTemplateColumns: showVisionBoard ? "minmax(0,1fr) 360px" : "1fr", gap: 60, alignItems: "start" }}>
        <div style={{ maxWidth: 600, width: "100%" }}>
          {/* chapter + progress */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 10, color: EMERALD, letterSpacing: ".22em", textTransform: "uppercase" }}>
                Chapter {CHAPTERS[chapter].n} · {CHAPTERS[chapter].t}
              </div>
              <span style={{ fontSize: 11, color: C.faint, letterSpacing: ".05em" }}>Step {step + 1} / {TOTAL}</span>
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              {CHAPTERS.map((c, i) => {
                const stepsInCh = plan.filter(s => CHAPTER[s] === i).length;
                const completedInCh = plan.slice(0, step + 1).filter(s => CHAPTER[s] === i).length;
                const w = stepsInCh / plan.length;
                const fill = stepsInCh > 0 ? (completedInCh / stepsInCh) * 100 : 0;
                return (
                  <div key={i} style={{ flex: w, height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${fill}%`, background: i === chapter ? EMERALD : NM_BLUE, transition: "width .35s ease" }} />
                  </div>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={plan[step]} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
              <StepRender id={plan[step]} form={form} set={set} tog={tog} name={name} />
            </motion.div>
          </AnimatePresence>

          {hostNote && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 24, padding: "12px 16px", background: "rgba(68,160,120,0.08)", border: `1px solid rgba(68,160,120,0.25)`, borderRadius: 10, fontSize: 13, color: EMERALD, fontStyle: "italic", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span>{host}: {hostNote}</span>
              <button onClick={() => setHostNote(null)} style={{ background: "transparent", border: "none", color: EMERALD, cursor: "pointer", fontSize: 16, opacity: 0.6 }}>×</button>
            </motion.div>
          )}

          {err && <p style={{ color: "#e8a4a4", fontSize: 13, marginTop: 16 }}>{err}</p>}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 36 }}>
            <button onClick={() => {
              let prev = step - 1;
              while (prev >= 0 && plan[prev] === "iconConcept" && form.mark === "wordmark") prev--;
              if (prev >= 0) setStep(prev);
            }} style={{ background: "transparent", border: "none", color: C.mute, fontSize: 14, fontFamily: "inherit", cursor: "pointer", padding: "10px 0", opacity: step === 0 ? 0 : 1, pointerEvents: step === 0 ? "none" : "auto" }}>← Back</button>
            <button onClick={onNext} disabled={!cn} style={{
              background: cn ? EMERALD : "rgba(255,255,255,0.06)",
              color: cn ? "#0a0d11" : C.faint, border: "none",
              padding: "13px 28px", borderRadius: 10, fontSize: 14, fontFamily: "'Outfit',sans-serif",
              fontWeight: 600, letterSpacing: ".02em",
              cursor: cn ? "pointer" : "default",
              boxShadow: cn ? "0 12px 30px -10px rgba(68,160,120,0.5)" : "none",
              transition: "all .2s ease",
            }}>
              {step === TOTAL - 1 ? "See the reveal →" : "Continue →"}
            </button>
          </div>
        </div>

        {showVisionBoard && (
          <div style={{ display: "none" }} className="vision-board-rail">
            <VisionBoard spec={spec} name={name} />
          </div>
        )}
      </div>
      <style>{`@media (min-width: 1100px){ .vision-board-rail{ display:block !important; } }`}</style>
    </DiscoveryShell>
  );
}
