import type { CSSProperties } from "react";

export const ACC = [
  { name: "Gold", hex: "#FFB81C", vibe: "Confident & Warm" },
  { name: "Teal", hex: "#24A097", vibe: "Modern & Fresh" },
  { name: "Orange", hex: "#F36F35", vibe: "Bold & Dynamic" },
  { name: "Sky blue", hex: "#83D4F1", vibe: "Approachable & Open" },
  { name: "Blue only", hex: "#0E497B", vibe: "Classic & Authoritative" }
];

export const sn = (n: string) => n?.trim().split(/\s+/)[0] || "you";

export const MOODS = [
  { id: "classic", name: "Classic authority", desc: "Established, commanding, trusted", patch: { typo: "serif", tone: "established", density: "minimal" } },
  { id: "modern", name: "Modern precision", desc: "Clean, geometric, sophisticated", patch: { typo: "sans", tone: "forward", density: "minimal" } },
  { id: "warm", name: "Warm advisor", desc: "Approachable, human, partner-first", patch: { typo: "serif", tone: "forward", density: "minimal" } },
  { id: "luxury", name: "Understated luxury", desc: "Quiet, refined, deliberately restrained", patch: { typo: "serif", tone: "established", density: "minimal" } },
  { id: "bold", name: "Bold statement", desc: "Confident, forward, impossible to ignore", patch: { typo: "sans", tone: "established", density: "rich" } },
  { id: "heritage", name: "Trusted heritage", desc: "Balanced, enduring, credentialed", patch: { typo: "serif", tone: "established", density: "rich" } },
];

export const NM_LEAN = [
  { v: "nm_lead", l: "NM-led lockup", d: "Northwestern Mutual primary, your DBA presented as a named sub-brand." },
  { v: "equal",   l: "Equal-weight lockup", d: "Both identities carry similar visual weight inside the NM-approved system." },
];

export const DIFF = ["Depth of planning","Long-term relationships","Niche expertise","Proactive communication","Multi-discipline approach","Community presence","Team-based service","Technology-forward","White-glove experience","Speed & responsiveness"];
export const AUD = ["Business owners","Pre-retirees & retirees","Young professionals","High-net-worth families","Medical professionals","All of the above"];
export const ADJ = ["Knowledgeable","Responsive","Trustworthy","Proactive","Detail-oriented","Calm under pressure","Easy to talk to","Strategic","Consistent","Forward-thinking","Thorough","Personable"];
export const TOUCH = ["Email signature","Website / digital","Print stationery","Office signage","Social media profile","Presentations & decks"];
export const AXES: [string,string,string,string,string,string,string][] = [
  ["Head","head","heart","Heart","pHH","Analytical, data-driven","Relational, empathy-led"],
  ["Legacy","legacy","momentum","Momentum","pLM","Established heritage","Growth, forward-looking"],
  ["Quiet","quiet","bold","Bold","pQB","Understated, restrained","Confident, assertive"],
  ["Individual","individual","institution","Firm","pII","Boutique, personal feel","Professional, institutional"],
  ["Local","local","national","National","pLN","Community-rooted","National-caliber positioning"]
];
export const AVOIDS = ["Generic / clip art","Overly complex","Cold / corporate","Too casual","Trendy (dates quickly)","Religious imagery","Political imagery","Too abstract","Overcrowded"];
export const TRUTH = ["Must feel premium","Must feel approachable","Must feel timeless","Must feel distinctive","Must work at any size","Must be bold","Must be subtle","Must age gracefully","Must stand alone from NM"];

export const BRAND_VALUES = ["Trust","Growth","Legacy","Independence","Discipline","Clarity","Optimism","Community","Craft","Innovation"];
export const ICON_CONCEPTS = [
  { v: "geometric",  l: "Geometric / architectural", d: "Structured shapes, clear lines." },
  { v: "natural",    l: "Natural / organic",          d: "Botanical, leaf, growth motifs." },
  { v: "abstract",   l: "Abstract symbol",            d: "Distilled, conceptual mark." },
  { v: "monogram",   l: "Initials / monogram",        d: "Your initials as the icon." },
  { v: "heritage",   l: "Heritage emblem",            d: "Crest, seal, badge feel." },
  { v: "open",       l: "Not sure — surprise me",     d: "We'll explore based on your other answers." },
];

export const REFS = [
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
export const REF_STYLE: Record<string, CSSProperties> = {
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

export const SERVICES = [
  { v: "logo", l: "Logo & brand identity", d: "The wordmark, lockup, color, type system." },
  { v: "website", l: "Website", d: "A site that converts, not a brochure." },
  { v: "content", l: "Content (video / photo)", d: "Brand video, headshots, story-driven media." },
  { v: "ads", l: "Paid ads & social", d: "Meta + LinkedIn that fills your calendar." },
  { v: "print", l: "Print collateral / signage", d: "Stationery, decks, office presence." },
  { v: "unsure", l: "Not sure yet — let's talk", d: "We'll help you map it." }
];

export const CONFIDENCE = [
  { v: "clear", l: "I know exactly what I want", d: "Just need someone to build it. Short path (~3 min)." },
  { v: "guided", l: "I have a direction but want guidance", d: "Medium path with the key strategic questions (~5 min)." },
  { v: "discovery", l: "I'm starting from scratch", d: "Walk me through the full discovery (~8 min)." }
];

// ============================================================
// Form
// ============================================================
export type Form = {
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
export const blank = (): Form => ({
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
export const LOGO_STEPS_FULL = ["dbaName","pitch","diff","audience","adjectives","brandValues","brandPromise","brandStory","nmLean","touchpoints","personality","typo","density","tone","mood","mark","iconConcept","accent","references","avoid","vision","truth"];
export const LOGO_STEPS_GUIDED = ["dbaName","diff","audience","adjectives","brandValues","brandPromise","nmLean","touchpoints","mood","mark","iconConcept","accent","references","vision","truth"];
export const LOGO_STEPS_CLEAR = ["dbaName","brandPromise","nmLean","mark","iconConcept","accent","touchpoints","references","vision","truth"];

// chapter assignment per step id
export const CHAPTER: Record<string, number> = {
  dbaName: 0, pitch: 0, diff: 0, audience: 0, adjectives: 0,
  brandValues: 1, brandPromise: 1, brandStory: 1,
  personality: 2, mood: 2, tone: 2, vision: 2, truth: 2,
  nmLean: 3, typo: 3, density: 3, mark: 3, iconConcept: 3, accent: 3, references: 3, avoid: 3,
  touchpoints: 4, svc_website: 4, svc_content: 4, svc_ads: 4, svc_print: 4, svc_timeline: 4,
};
export const CHAPTERS = [
  { n: "01", t: "Who you are" },
  { n: "02", t: "What you stand for" },
  { n: "03", t: "How it should feel" },
  { n: "04", t: "What it looks like" },
  { n: "05", t: "Where it lives" },
];

// host notes — appear after answering certain steps
export const HOST_NOTES: Record<string, (f: Form) => string | null> = {
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
