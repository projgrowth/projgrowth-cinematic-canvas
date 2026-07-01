import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { NM_BLUE, EMERALD } from "./mockups";
import { AXES, REFS, REF_STYLE } from "./constants";
import { C, Q } from "./primitives";

export function ReferenceStep({ form, set, tog }: any) {
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
export function AxisSlider({ axis, value, onSet }: { axis: typeof AXES[number]; value: string | null; onSet: (v: string) => void }) {
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
export function SvcSkip({ field, value, set }: { field: string; value: string; set: (k: any, v: any) => void }) {
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
