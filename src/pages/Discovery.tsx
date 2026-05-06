import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const NM = "#0E497B";
const NMbg = "#e8f0f8";
const TOTAL = 18;
const SECS = [
  { n: "Foundation", ss: [0, 1, 2] }, { n: "Your client", ss: [3, 4] },
  { n: "Positioning", ss: [5, 6] }, { n: "Personality", ss: [7] },
  { n: "Direction", ss: [8, 9, 10] }, { n: "Aesthetic", ss: [11] },
  { n: "Your mark", ss: [12, 13] }, { n: "Reference", ss: [14, 15] },
  { n: "Vision", ss: [16, 17] }
];
const ACC = [
  { name: "Gold", hex: "#FFB81C", vibe: "Confident & Warm" },
  { name: "Teal", hex: "#24A097", vibe: "Modern & Fresh" },
  { name: "Orange", hex: "#F36F35", vibe: "Bold & Dynamic" },
  { name: "Sky blue", hex: "#83D4F1", vibe: "Approachable & Open" },
  { name: "Blue only", hex: "#0E497B", vibe: "Classic & Authoritative" }
];

const wm = (name: string) => name?.split(" ")[0]?.toUpperCase() || "RAMOS";
const sn = (name: string) => name?.split(" ")[0] || "Ramos";

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

const NM_LEAN = [
  { v: "nm_lead", l: "NM leads", d: "Your DBA as a named sub-brand.",
    Preview: ({ n }: { n: string }) => (
      <div style={{ background: "#f8f9fb", border: "0.5px solid #dde3ea", borderRadius: 6, padding: "8px 10px", height: 56, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: "#0E497B", lineHeight: 1.3 }}>Northwestern<br />Mutual</div>
        <div style={{ width: 0.5, height: 28, background: "#ccc" }} />
        <div style={{ fontSize: 7.5, color: "#aaa", lineHeight: 1.3 }}>{sn(n)}<br />Financial</div>
      </div>
    ) },
  { v: "equal", l: "Equal partners", d: "Both identities carry equal weight.",
    Preview: ({ n }: { n: string }) => (
      <div style={{ background: "#f8f9fb", border: "0.5px solid #dde3ea", borderRadius: 6, padding: "8px 10px", height: 56, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <div style={{ fontSize: 8.5, fontWeight: 600, color: "#0E497B", textAlign: "center", lineHeight: 1.3 }}>Northwestern<br />Mutual</div>
        <div style={{ width: 0.5, height: 28, background: "#ccc" }} />
        <div style={{ fontSize: 8.5, fontWeight: 600, color: "#0E497B", textAlign: "center", lineHeight: 1.3 }}>{sn(n)}<br />Financial</div>
      </div>
    ) },
  { v: "dba_lead", l: "Your brand leads", d: "NM as endorser. Your identity primary.",
    Preview: ({ n }: { n: string }) => (
      <div style={{ background: "#f8f9fb", border: "0.5px solid #dde3ea", borderRadius: 6, padding: "8px 10px", height: 56, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#0E497B", lineHeight: 1.3 }}>{sn(n)}<br />Financial</div>
        <div style={{ width: 0.5, height: 28, background: "#ccc" }} />
        <div style={{ fontSize: 7, color: "#bbb", lineHeight: 1.3 }}>Northwestern<br />Mutual</div>
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

type Form = {
  dbaStatus: string | null; dbaName: string; pitch: string; diff: string[]; diffCustom: string;
  audience: string[]; adjectives: string[]; nmLean: string | null; touchpoints: string[];
  pHH: string | null; pLM: string | null; pQB: string | null; pII: string | null; pLN: string | null;
  typo: string | null; density: string | null; tone: string | null; mood: string | null;
  mark: string | null; accent: string | null; inspiration: string; avoid: string[]; vision: string; truth: string[];
};
const blank = (): Form => ({
  dbaStatus: null, dbaName: "", pitch: "", diff: [], diffCustom: "",
  audience: [], adjectives: [], nmLean: null, touchpoints: [],
  pHH: null, pLM: null, pQB: null, pII: null, pLN: null,
  typo: null, density: null, tone: null, mood: null,
  mark: null, accent: null, inspiration: "", avoid: [], vision: "", truth: []
});

function genBrief(name: string, f: Form) {
  const dba = f.dbaName || `${sn(name)} Financial`;
  const mood1 = MOODS.find(x => x.id === f.mood);
  const moodStr = mood1 ? mood1.name.toLowerCase() : "distinctive";
  const typoStr = f.typo === "serif" ? "serif typography" : f.typo === "sans" ? "sans-serif typography" : "typographic direction TBD";
  const markStr = f.mark === "icon" ? "an icon-plus-wordmark system" : f.mark === "wordmark" ? "a clean wordmark" : "mark structure TBD";
  const acStr = f.accent ? (ACC.find(a => a.hex === f.accent)?.name.toLowerCase() || "NM blue") + " accent" : "accent TBD";
  const toneStr = f.tone === "established" ? "established and authoritative" : f.tone === "forward" ? "contemporary and forward-looking" : "tonally balanced";
  const adjStr = f.adjectives.length ? f.adjectives.join(", ") : "professional and trustworthy";
  const audStr = f.audience.length ? f.audience.join(" and ") : "a broad client base";
  const nmStr = f.nmLean === "nm_lead" ? "positioned as a named sub-brand of Northwestern Mutual"
    : f.nmLean === "equal" ? "co-branded as equal partners with Northwestern Mutual"
    : f.nmLean === "dba_lead" ? "positioned as the lead identity with Northwestern Mutual as endorser"
    : "NM relationship TBD";
  const truthStr = f.truth[0] || "feel timeless and credible";
  return `${dba} requires a ${moodStr} brand identity — ${toneStr} in character, built on ${typoStr} using ${markStr} with a ${acStr}. The practice serves ${audStr} and is described as ${adjStr}. The brand should be ${nmStr}. Above all, this logo must ${truthStr.toLowerCase()}.`;
}

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
function Rail({ step }: { step: number }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", marginBottom: 8 }}>
      {SECS.map((s, i) => {
        const cur = s.ss.includes(step), done = s.ss.every(x => x < step);
        return (
          <span key={i} style={{ fontSize: 10, color: cur ? NM : done ? "#333" : "#aaa", fontWeight: cur ? 500 : 400 }}>
            {done ? "✓ " : ""}{s.n}{i < SECS.length - 1 ? <span style={{ margin: "0 4px", color: "#ccc" }}>·</span> : null}
          </span>
        );
      })}
    </div>
  );
}
const TA = (props: any) => (
  <textarea {...props} style={{ width: "100%", background: "#f7f8fa", border: "0.5px solid #d0d5dd", borderRadius: 8, padding: "12px 14px", fontSize: 14, fontFamily: "inherit", color: "#111", resize: "none", outline: "none", lineHeight: 1.6, ...props.style }} />
);
const TxtInput = (props: any) => (
  <input {...props} style={{ width: "100%", background: "#f7f8fa", border: "0.5px solid #d0d5dd", borderRadius: 8, padding: "10px 13px", fontSize: 14, fontFamily: "inherit", color: "#111", outline: "none", ...props.style }} />
);
function TotCard({ sel, onClick, Preview, label, n }: any) {
  return (
    <button onClick={onClick} style={{ borderRadius: 10, cursor: "pointer", border: `${sel ? "2px" : "1.5px"} solid ${sel ? NM : "#e0e4ea"}`, background: "#f7f8fa", padding: 13, textAlign: "left", fontFamily: "inherit", flex: 1 }}>
      <Preview n={n} />
      <div style={{ fontSize: 13, fontWeight: 500, color: "#111", marginTop: 9 }}>{label}</div>
    </button>
  );
}

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

function Steps({ step, form, set, tog, name }: any) {
  switch (step) {
    case 0: return (
      <Q label="Do you have an approved DBA name?" sub="The official name your practice will operate under with Northwestern Mutual." why="This determines whether we're naming or just designing — different exercises entirely.">
        {[["approved","✓","Yes — it's been approved"],["considering","◎","In progress / still deciding"],["none","○","Not yet"]].map(([v, ic, l]: any) => (
          <OCard key={v} sel={form.dbaStatus === v} onClick={() => set("dbaStatus", v)}>
            <span style={{ marginRight: 10, color: form.dbaStatus === v ? NM : "#aaa" }}>{ic}</span>{l}
          </OCard>
        ))}
        {(form.dbaStatus === "approved" || form.dbaStatus === "considering") && (
          <TxtInput value={form.dbaName} onChange={(e: any) => set("dbaName", e.target.value)} placeholder={form.dbaStatus === "approved" ? "Enter approved name..." : "What are you considering?"} style={{ marginTop: 8 }} />
        )}
      </Q>
    );
    case 1: return (
      <Q label="Describe your practice in 1–2 sentences." sub="Not your elevator pitch. The raw truth about what you do and who you serve." why="The language you use here often surfaces the emotional core of the brand.">
        <TA value={form.pitch} onChange={(e: any) => set("pitch", e.target.value)} rows={4} maxLength={300} placeholder="e.g. We work with business owners who need a financial partner, not a product salesperson..." />
        <div style={{ textAlign: "right", fontSize: 11, color: "#aaa", marginTop: 4 }}>{form.pitch.length}/300</div>
      </Q>
    );
    case 2: return (
      <Q label="What makes your practice different?" sub="Select all that apply. Be honest about what you actually deliver." why="Differentiators often become the emotional anchor of the brand.">
        <div style={{ marginBottom: 10 }}>{DIFF.map(d => <Chip key={d} on={form.diff.includes(d)} onClick={() => tog("diff", d)}>{d}</Chip>)}</div>
        <TxtInput value={form.diffCustom} onChange={(e: any) => set("diffCustom", e.target.value)} placeholder="Anything not listed..." />
      </Q>
    );
    case 3: return (
      <Q label="Who is your primary client?" why="Understanding your client shapes how approachable or authoritative the identity needs to feel.">
        <div>{AUD.map(a => <Chip key={a} on={form.audience.includes(a)} onClick={() => tog("audience", a)}>{a}</Chip>)}</div>
      </Q>
    );
    case 4: return (
      <Q label="How do clients describe working with you?" sub="Pick up to 3. These should feel true — not aspirational." why="These adjectives become the emotional vocabulary we test every logo decision against.">
        <div style={{ marginBottom: 10 }}>{ADJ.map(a => <Chip key={a} on={form.adjectives.includes(a)} onClick={() => { if (form.adjectives.includes(a) || form.adjectives.length < 3) tog("adjectives", a); }}>{a}</Chip>)}</div>
        <div style={{ fontSize: 12, color: "#aaa" }}>{form.adjectives.length}/3 selected</div>
      </Q>
    );
    case 5: return (
      <Q label="How should Northwestern Mutual appear alongside your brand?" sub="This reflects how you see the relationship between your identity and theirs." why="NM guidelines require them in primary position — your intent here shapes the DBA identity's visual weight.">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {NM_LEAN.map(o => (
            <button key={o.v} onClick={() => set("nmLean", o.v)} style={{ background: form.nmLean === o.v ? NMbg : "#f7f8fa", border: `${form.nmLean === o.v ? "1.5px" : "0.5px"} solid ${form.nmLean === o.v ? NM : "#d0d5dd"}`, borderRadius: 10, padding: 10, cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}>
              <o.Preview n={name} />
              <div style={{ fontSize: 12, fontWeight: 500, color: "#111", marginTop: 8 }}>{o.l}</div>
              <div style={{ fontSize: 11, color: "#888", marginTop: 3, lineHeight: 1.4 }}>{o.d}</div>
            </button>
          ))}
        </div>
      </Q>
    );
    case 6: return (
      <Q label="Where will this logo primarily live?" sub="Select all touchpoints that apply." why="A logo for a 40px social avatar is designed differently than one built for letterhead.">
        <div>{TOUCH.map(t => <Chip key={t} on={form.touchpoints.includes(t)} onClick={() => tog("touchpoints", t)}>{t}</Chip>)}</div>
      </Q>
    );
    case 7: {
      const answered = [form.pHH, form.pLM, form.pQB, form.pII, form.pLN].filter(Boolean).length;
      return (
        <Q label="Brand personality — pick one from each pair." sub="Five axes that define the emotional fingerprint of your brand." why="This is the most important screen in the intake. Your answers here shape every design decision that follows.">
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
    case 8: return (
      <Q label="Typography — this or that." sub="Which feels more like you?" why="Serif feels authoritative and established; sans feels modern and precise.">
        <div style={{ display: "flex", gap: 12 }}>
          <TotCard n={name} sel={form.typo === "serif"} onClick={() => set("typo", "serif")} Preview={TypoSerif} label="Serif / classic" />
          <TotCard n={name} sel={form.typo === "sans"} onClick={() => set("typo", "sans")} Preview={TypoSans} label="Sans / modern" />
        </div>
      </Q>
    );
    case 9: return (
      <Q label="Design density — this or that." sub="How should your brand use space?" why="Minimal brands feel confident and premium. Layered brands feel comprehensive.">
        <div style={{ display: "flex", gap: 12 }}>
          <TotCard n={name} sel={form.density === "minimal"} onClick={() => set("density", "minimal")} Preview={DensMin} label="Minimal / open" />
          <TotCard n={name} sel={form.density === "rich"} onClick={() => set("density", "rich")} Preview={DensRich} label="Layered / rich" />
        </div>
      </Q>
    );
    case 10: return (
      <Q label="Overall tone — this or that." sub="If your brand walked into a room, how would it carry itself?" why="This is about attitude, not aesthetics. Both are professional — they project differently.">
        <div style={{ display: "flex", gap: 12 }}>
          <TotCard n={name} sel={form.tone === "established"} onClick={() => set("tone", "established")} Preview={ToneEst} label="Established / traditional" />
          <TotCard n={name} sel={form.tone === "forward"} onClick={() => set("tone", "forward")} Preview={ToneFwd} label="Forward / contemporary" />
        </div>
      </Q>
    );
    case 11: return (
      <Q label="Which aesthetic direction resonates most?" sub="Pick the one that feels closest. These are directions, not final logos." why="Seeing your emotional reaction to these is more useful than any description you could write.">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {MOODS.map(m => (
            <button key={m.id} onClick={() => set("mood", m.id)} style={{ background: form.mood === m.id ? NMbg : "#f7f8fa", border: `${form.mood === m.id ? "1.5px" : "0.5px"} solid ${form.mood === m.id ? NM : "#d0d5dd"}`, borderRadius: 10, padding: 10, cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}>
              <m.Preview n={name} />
              <div style={{ fontSize: 12, fontWeight: 500, color: "#111", marginTop: 7 }}>{m.name}</div>
              <div style={{ fontSize: 10, color: "#888", marginTop: 2, lineHeight: 1.4 }}>{m.desc}</div>
            </button>
          ))}
        </div>
      </Q>
    );
    case 12: return (
      <Q label="Mark structure — this or that." sub="Wordmark or icon + wordmark?" why="An icon creates versatility but requires a strong concept. A wordmark is timeless and always safe.">
        <div style={{ display: "flex", gap: 12 }}>
          <TotCard n={name} sel={form.mark === "wordmark"} onClick={() => set("mark", "wordmark")} Preview={MarkWord} label="Wordmark only" />
          <TotCard n={name} sel={form.mark === "icon"} onClick={() => set("mark", "icon")} Preview={MarkIcon} label="Icon + wordmark" />
        </div>
      </Q>
    );
    case 13: return (
      <Q label="Choose your accent color." sub="NM Blue is always primary. All options are within Northwestern Mutual guidelines." why="Your accent reinforces personality and differentiates you from other NM advisors.">
        {ACC.map(a => (
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
    case 14: return (
      <Q label="Name a brand or logo you admire — any industry." why="Admiration is honest. What catches your eye visually tells us more than what you say you want.">
        <TA value={form.inspiration} onChange={(e: any) => set("inspiration", e.target.value)} rows={4} placeholder="e.g. Goldman Sachs private wealth feels right. Apple's restraint. The clarity of Vanguard..." />
      </Q>
    );
    case 15: return (
      <Q label="What should your logo never be?" sub="Optional, but directionally useful.">
        <div>{AVOIDS.map(a => <Chip key={a} on={form.avoid.includes(a)} onClick={() => tog("avoid", a)} danger>{a}</Chip>)}</div>
      </Q>
    );
    case 16: return (
      <Q label="Five years from now — what do you want people to say when they see your logo?" sub="One sentence. Future tense. Be ambitious." why="Vision statements reveal what the brand needs to grow into — not just who you are today.">
        <TA value={form.vision} onChange={(e: any) => set("vision", e.target.value)} rows={4} maxLength={200} placeholder={`"That logo tells you everything — serious, local, and built to last."`} />
        <div style={{ textAlign: "right", fontSize: 11, color: "#aaa", marginTop: 4 }}>{form.vision.length}/200</div>
      </Q>
    );
    case 17: return (
      <Q label="One thing that is non-negotiable." sub="This logo must ___. Choose your absolute floor.">
        <div>{TRUTH.map(t => <Chip key={t} on={form.truth.includes(t)} onClick={() => tog("truth", t)}>{t}</Chip>)}</div>
        <div style={{ fontSize: 12, color: "#aaa", marginTop: 10 }}>{form.truth.length} selected</div>
      </Q>
    );
    default: return null;
  }
}

function Landing({ onStart }: { onStart: (name: string, email: string, practice: string) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [practice, setPractice] = useState("");
  const ok = name.trim().length > 1 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim());
  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "52px 24px 40px", background: "#fff", minHeight: "100vh" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: 10, letterSpacing: ".18em", color: "#888", textTransform: "uppercase", marginBottom: 14 }}>Brand identity discovery</div>
        <div style={{ fontSize: 24, fontWeight: 400, color: "#111", marginBottom: 6 }}>Northwestern Mutual</div>
        <div style={{ fontSize: 13, color: "#666", marginBottom: 20 }}>DBA logo discovery · ~8 minutes</div>
        <div style={{ background: "#f7f8fa", borderRadius: 10, padding: "14px 18px", fontSize: 13, color: "#666", lineHeight: 1.7, textAlign: "left" }}>
          Before we design anything, we need to understand you — your positioning, your clients, and how you want the world to see your practice. Your answers directly shape the creative brief. Be specific.
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
        <div>
          <label style={{ fontSize: 11, color: "#888", letterSpacing: ".08em", textTransform: "uppercase" }}>Your full name</label>
          <TxtInput value={name} onChange={(e: any) => setName(e.target.value)} placeholder="Jane Doe" style={{ marginTop: 6 }} />
        </div>
        <div>
          <label style={{ fontSize: 11, color: "#888", letterSpacing: ".08em", textTransform: "uppercase" }}>Email</label>
          <TxtInput type="email" value={email} onChange={(e: any) => setEmail(e.target.value)} placeholder="jane@northwesternmutual.com" style={{ marginTop: 6 }} />
        </div>
        <div>
          <label style={{ fontSize: 11, color: "#888", letterSpacing: ".08em", textTransform: "uppercase" }}>Practice name (optional)</label>
          <TxtInput value={practice} onChange={(e: any) => setPractice(e.target.value)} placeholder="Doe Wealth Strategies" style={{ marginTop: 6 }} />
        </div>
      </div>
      <button disabled={!ok} onClick={() => onStart(name.trim(), email.trim(), practice.trim())} style={{ width: "100%", background: ok ? NM : "#ccc", color: "#fff", border: "none", padding: "14px", borderRadius: 8, fontSize: 14, fontFamily: "inherit", fontWeight: 500, cursor: ok ? "pointer" : "default" }}>
        Begin discovery →
      </button>
      <div style={{ textAlign: "center", marginTop: 32, fontSize: 10, color: "#aaa", letterSpacing: ".12em", textTransform: "uppercase" }}>Prepared by ProjGrowth</div>
    </div>
  );
}

function Thanks({ name, form }: { name: string; form: Form }) {
  const mood = MOODS.find(x => x.id === form.mood);
  const traits: string[] = [];
  if (form.pHH) traits.push(form.pHH === "head" ? "analytical" : "relational");
  if (form.pQB) traits.push(form.pQB === "bold" ? "boldly confident" : "quietly authoritative");
  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "60px 24px", textAlign: "center", background: "#fff", minHeight: "100vh" }}>
      <div style={{ fontSize: 28, color: "#2d7a2d", marginBottom: 14 }}>✓</div>
      <div style={{ fontSize: 22, fontWeight: 400, color: "#111", marginBottom: 8 }}>Thank you, {sn(name)}.</div>
      <p style={{ color: "#666", fontSize: 13, lineHeight: 1.7, marginBottom: 24 }}>Your submission has been sent to the ProjGrowth team. Here's what your answers are already telling us.</p>
      <div style={{ background: "#f7f8fa", borderRadius: 10, padding: "18px 22px", marginBottom: 24, textAlign: "left" }}>
        {mood && <div style={{ marginBottom: 9, fontSize: 13, color: "#666" }}>→ Aesthetic direction: <strong>{mood.name}</strong></div>}
        {form.adjectives.length > 0 && <div style={{ marginBottom: 9, fontSize: 13, color: "#666" }}>→ Clients describe you as: <strong>{form.adjectives.join(", ")}</strong></div>}
        {traits.length > 0 && <div style={{ marginBottom: 9, fontSize: 13, color: "#666" }}>→ Brand personality: <strong>{traits.join(", ")}</strong></div>}
        {form.truth[0] && <div style={{ marginBottom: 9, fontSize: 13, color: "#666" }}>→ Non-negotiable: <strong>{form.truth[0]}</strong></div>}
        {form.vision && <div style={{ borderTop: "0.5px solid #e0e4ea", paddingTop: 10, marginTop: 4, fontSize: 13, color: "#666", fontStyle: "italic" }}>"{form.vision}"</div>}
      </div>
      <p style={{ color: "#666", fontSize: 13, lineHeight: 1.7 }}>We'll review your responses and reach out within 24–48 hours to schedule your strategy session.</p>
    </div>
  );
}

const STORE = "nm_discovery_v1";

export default function Discovery() {
  const [phase, setPhase] = useState<"landing" | "form" | "submitting" | "done">("landing");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [practice, setPractice] = useState("");
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(blank());
  const [err, setErr] = useState("");

  // Restore from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE);
      if (raw) {
        const s = JSON.parse(raw);
        if (s.email && s.form) {
          setName(s.name || ""); setEmail(s.email); setPractice(s.practice || "");
          setStep(s.step || 0); setForm(s.form); setPhase(s.phase || "landing");
        }
      }
    } catch {}
  }, []);
  useEffect(() => {
    if (phase === "form") {
      try { localStorage.setItem(STORE, JSON.stringify({ name, email, practice, step, form, phase })); } catch {}
    }
  }, [name, email, practice, step, form, phase]);

  const set = (k: keyof Form, v: any) => setForm(f => ({ ...f, [k]: v }));
  const tog = (k: keyof Form, v: any) => setForm(f => {
    const a = (f[k] as string[]) || [];
    return { ...f, [k]: a.includes(v) ? a.filter(x => x !== v) : [...a, v] };
  });

  const canNext = () => {
    const f = form, s = step;
    if (s === 0) return f.dbaStatus !== null;
    if (s === 1) return f.pitch.trim().length > 10;
    if (s === 2) return f.diff.length > 0 || f.diffCustom.trim().length > 2;
    if (s === 3) return f.audience.length > 0;
    if (s === 4) return f.adjectives.length > 0;
    if (s === 5) return f.nmLean !== null;
    if (s === 6) return f.touchpoints.length > 0;
    if (s === 7) return [f.pHH, f.pLM, f.pQB, f.pII, f.pLN].every(Boolean);
    if (s === 8) return f.typo !== null;
    if (s === 9) return f.density !== null;
    if (s === 10) return f.tone !== null;
    if (s === 11) return f.mood !== null;
    if (s === 12) return f.mark !== null;
    if (s === 13) return f.accent !== null;
    return true;
  };

  const submit = async () => {
    setPhase("submitting");
    setErr("");
    try {
      const brief = genBrief(name, form);
      const { error } = await supabase.functions.invoke("submit-discovery", {
        body: { full_name: name, email, practice_name: practice, responses: form, generated_brief: brief },
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
    if (!canNext()) return;
    if (step < TOTAL - 1) { setStep(s => s + 1); return; }
    submit();
  };

  if (phase === "landing") {
    return <Landing onStart={(n, e, p) => { setName(n); setEmail(e); setPractice(p); setStep(0); setForm(blank()); setPhase("form"); }} />;
  }
  if (phase === "done") return <Thanks name={name} form={form} />;
  if (phase === "submitting") {
    return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", color: "#666", fontFamily: "system-ui" }}>Submitting your responses…</div>;
  }

  const pct = ((step + 1) / TOTAL) * 100;
  const cn = canNext();
  return (
    <div style={{ background: "#fff", minHeight: "100vh", paddingTop: 24 }}>
      <div style={{ maxWidth: 540, margin: "0 auto", padding: "0 24px 40px" }}>
        <div style={{ height: 2, background: "#e0e4ea", marginBottom: 14, borderRadius: 2 }}>
          <div style={{ height: "100%", width: `${pct}%`, background: NM, borderRadius: 2, transition: "width .3s ease" }} />
        </div>
        <Rail step={step} />
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
          <span style={{ fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: "#888" }}>{(name || "you").toUpperCase()}</span>
          <span style={{ fontSize: 12, color: "#888" }}>{step + 1} / {TOTAL}</span>
        </div>
        <Steps step={step} form={form} set={set} tog={tog} name={name} />
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