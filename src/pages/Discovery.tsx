import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { DiscoveryShell } from "./discovery/Shell";
import { BusinessCard, MockupDisclaimer, MiniCard, deriveSpec, NM_BLUE, EMERALD, fontFor, weightFor } from "./discovery/mockups";
import { downloadBrandBriefPdf } from "./discovery/brandBriefPdf";

// Extracted modules
import {
  ACC, MOODS, NM_LEAN, DIFF, AUD, ADJ, TOUCH, AXES, AVOIDS, TRUTH,
  BRAND_VALUES, ICON_CONCEPTS, REFS, REF_STYLE, SERVICES, CONFIDENCE,
  LOGO_STEPS_FULL, LOGO_STEPS_GUIDED, LOGO_STEPS_CLEAR,
  CHAPTER, CHAPTERS, HOST_NOTES,
  blank, sn,
  type Form,
} from "./discovery/constants";
import { buildPlan, engagementTier, genBrief, visionSummary } from "./discovery/logic";
import { C, OCard, Chip, Q, TA, TxtInput, MockTile } from "./discovery/primitives";
import { ReferenceStep, AxisSlider, SvcSkip } from "./discovery/steps";


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
              <span style={{ fontSize: 11, color: C.faint, letterSpacing: ".05em" }}>
                {(() => {
                  const remaining = Math.max(1, TOTAL - step - 1);
                  const mins = Math.max(1, Math.round(remaining * 0.4));
                  return step >= TOTAL - 1 ? "Last step" : `~${mins} min left · ${remaining} step${remaining === 1 ? "" : "s"}`;
                })()}
              </span>
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
          <div style={{ marginTop: 10, textAlign: "right", fontSize: 10, color: C.faint, letterSpacing: ".06em" }}>
            tip: <kbd style={{ background: "rgba(255,255,255,.06)", padding: "1px 5px", borderRadius: 3 }}>Enter</kbd> or <kbd style={{ background: "rgba(255,255,255,.06)", padding: "1px 5px", borderRadius: 3 }}>→</kbd> to advance
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
