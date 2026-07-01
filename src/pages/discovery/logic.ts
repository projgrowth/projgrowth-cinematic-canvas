import { ACC, MOODS, sn, LOGO_STEPS_FULL, LOGO_STEPS_GUIDED, LOGO_STEPS_CLEAR, type Form } from "./constants";

export function buildPlan(confidence: string, services: string[]): string[] {
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
export function engagementTier(c: string, s: string[]) {
  const n = s.filter(x => x !== "unsure").length;
  if (c === "clear" && n <= 1) return "Light";
  if (c === "discovery" || n >= 3) return "Full Studio";
  return "Standard";
}
export function genBrief(personName: string, f: Form, services: string[], confidence: string) {
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
export function visionSummary(name: string, f: Form): string {
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
