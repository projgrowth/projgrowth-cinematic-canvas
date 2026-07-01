import { useState } from "react";
import { Check, X } from "lucide-react";
import type { Discovery } from "./types";
import { buildDiscoveryProfile } from "./exports";

const DiscoveryList = ({ discovery }: { discovery: Discovery[] }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  if (discovery.length === 0) {
    return (
      <div className="p-8 text-center text-mute border border-line rounded-lg">
        No discovery submissions yet. Share <code className="text-accent">/discovery</code> with prospects.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {discovery.map((d) => {
        const isOpen = openId === d.id;
        const r = d.responses || {};
        return (
          <div key={d.id} className="border border-line rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenId(isOpen ? null : d.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-surface/50 transition-colors text-left"
            >
              <div>
                <div className="text-text font-medium flex items-center gap-2 flex-wrap">
                  {d.full_name}
                  {d.engagement_tier && <span className="pill-accent">{d.engagement_tier}</span>}
                  {d.confidence && <span className="pill-neutral">{d.confidence}</span>}
                  {typeof d.quality_score === "number" && (
                    <span className={`text-xs px-2 py-0.5 rounded border ${d.quality_score >= 75 ? "border-success/40 text-success" : d.quality_score >= 50 ? "border-warning/40 text-warning" : "border-destructive/40 text-destructive"}`}>
                      {d.quality_score}/100
                    </span>
                  )}
                  {d.quality_flags && d.quality_flags.length > 0 && (
                    <span className="text-xs text-mute">⚑ {d.quality_flags.join(", ")}</span>
                  )}
                </div>
                <div className="text-mute text-xs mt-1">
                  {d.practice_name || "—"} · <a href={`mailto:${d.email}`} className="text-accent hover:underline">{d.email}</a>
                  {d.services && d.services.length > 0 && <span className="ml-2">· {d.services.join(", ")}</span>}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-mute text-xs">
                  {new Date(d.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
                {d.email_sent ? <Check className="w-4 h-4 text-success" /> : <X className="w-4 h-4 text-destructive" />}
              </div>
            </button>
            {isOpen && (
              <div className="border-t border-line bg-surface/30 p-5 space-y-4 text-sm">
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => navigator.clipboard.writeText(buildDiscoveryProfile(d))}
                    className="text-xs px-3 py-1.5 border border-accent/40 rounded text-accent hover:bg-accent/10 transition-colors"
                  >
                    Copy full profile (AI-ready)
                  </button>
                  <button
                    onClick={() => {
                      const blob = new Blob([buildDiscoveryProfile(d)], { type: "text/plain;charset=utf-8" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `${(d.full_name || "submission").replace(/\W+/g, "-").toLowerCase()}-profile.txt`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="text-xs px-3 py-1.5 border border-line rounded text-mute hover:text-text hover:border-accent/40 transition-colors"
                  >
                    Download profile (.txt)
                  </button>
                </div>
                {d.polished_brief && (
                  <div>
                    <div className="text-xs uppercase tracking-wide text-accent mb-2">Polished brief (AI)</div>
                    <div className="text-text bg-base p-4 rounded border border-accent/30 whitespace-pre-wrap">{d.polished_brief}</div>
                    <button
                      onClick={() => navigator.clipboard.writeText(d.polished_brief || "")}
                      className="text-xs text-accent hover:underline mt-2"
                    >
                      Copy polished brief
                    </button>
                  </div>
                )}
                {d.generated_brief && (
                  <div>
                    <div className="text-xs uppercase tracking-wide text-mute mb-2">Generated brief</div>
                    <div className="text-text bg-base p-4 rounded border border-line">{d.generated_brief}</div>
                    <button
                      onClick={() => navigator.clipboard.writeText(d.generated_brief || "")}
                      className="text-xs text-accent hover:underline mt-2"
                    >
                      Copy brief
                    </button>
                  </div>
                )}
                {d.reference_signed_urls && d.reference_signed_urls.length > 0 && (
                  <div>
                    <div className="text-xs uppercase tracking-wide text-mute mb-2">Reference uploads</div>
                    <div className="grid grid-cols-3 gap-2">
                      {d.reference_signed_urls.map((u, i) => (
                        <a key={i} href={u} target="_blank" rel="noreferrer" className="block aspect-square overflow-hidden rounded border border-line bg-base">
                          <img src={u} alt={`Reference ${i + 1}`} className="w-full h-full object-cover" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                  {Object.entries(r).map(([k, v]) => (
                    <div key={k} className="flex gap-3">
                      <span className="text-mute text-xs uppercase tracking-wide min-w-[110px]">{k}</span>
                      <span className="text-text text-xs flex-1 break-words">
                        {Array.isArray(v) ? (v.length ? v.join(", ") : "—") : String(v ?? "—")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DiscoveryList;