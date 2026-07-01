import type { Discovery, Submission } from "./types";

const RESPONSE_LABELS: Record<string, string> = {
  pitch: "Elevator pitch",
  vision: "Vision",
  brandPromise: "Brand promise",
  brandStory: "Core belief / story",
  brandValues: "Brand values",
  adjectives: "Brand adjectives",
  tone: "Tone",
  mood: "Mood",
  pQB: "Personality vs polish",
  dbaName: "DBA / practice name",
  audience: "Target audience",
  idealClient: "Ideal client",
  differentiators: "Differentiators",
  competitors: "Competitors / inspiration",
  services: "Services interested in",
  websiteGoals: "Website goals",
  contentNeeds: "Content needs",
  adsBudget: "Ads budget",
  printNeeds: "Print needs",
  timeline: "Timeline",
  budget: "Budget",
  currentSite: "Current site",
  referenceNotes: "Reference notes",
  additionalNotes: "Additional notes",
  location: "Location",
  phone: "Phone",
  role: "Role / title",
};

export const prettifyKey = (k: string) =>
  RESPONSE_LABELS[k] ||
  k.replace(/([A-Z])/g, " $1").replace(/[_-]+/g, " ").replace(/^./, (c) => c.toUpperCase()).trim();

export const formatValue = (v: any): string => {
  if (v === null || v === undefined || v === "") return "—";
  if (v === "__exploring__") return "(still exploring)";
  if (Array.isArray(v)) return v.length ? v.join(", ") : "—";
  if (typeof v === "object") return JSON.stringify(v);
  return String(v);
};

const csvEscape = (v: any) => {
  if (v === null || v === undefined) return "";
  const s = Array.isArray(v) ? v.join("; ") : typeof v === "object" ? JSON.stringify(v) : String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export const downloadCsv = (filename: string, header: string[], rows: any[][]) => {
  const csv = [header, ...rows].map((r) => r.map(csvEscape).join(",")).join("\r\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

const today = () => new Date().toISOString().slice(0, 10);

export const buildDiscoveryProfile = (d: Discovery): string => {
  const lines: string[] = [];
  lines.push(`=== ${d.full_name}${d.practice_name ? ` — ${d.practice_name}` : ""} ===`);
  lines.push(`Email: ${d.email}`);
  lines.push(`Submitted: ${new Date(d.created_at).toLocaleString()}`);
  if (d.engagement_tier) lines.push(`Engagement tier: ${d.engagement_tier}`);
  if (d.confidence) lines.push(`Confidence: ${d.confidence}`);
  if (d.services?.length) lines.push(`Services: ${d.services.join(", ")}`);
  if (typeof d.quality_score === "number") lines.push(`Quality score: ${d.quality_score}/100`);
  if (d.quality_flags?.length) lines.push(`Flags: ${d.quality_flags.join(", ")}`);
  lines.push("");
  lines.push("--- Discovery answers ---");
  const r = d.responses || {};
  for (const [k, v] of Object.entries(r)) {
    lines.push(`${prettifyKey(k)}: ${formatValue(v)}`);
  }
  if (d.polished_brief) {
    lines.push("");
    lines.push("--- Polished brief (AI) ---");
    lines.push(d.polished_brief);
  }
  if (d.generated_brief) {
    lines.push("");
    lines.push("--- Generated brief ---");
    lines.push(d.generated_brief);
  }
  if (d.reference_signed_urls?.length) {
    lines.push("");
    lines.push("--- Reference uploads (signed URLs, 1h) ---");
    d.reference_signed_urls.forEach((u, i) => lines.push(`${i + 1}. ${u}`));
  }
  return lines.join("\n");
};

export const buildLeadProfile = (s: Submission): string =>
  [
    `=== ${s.name} ===`,
    `Email: ${s.email}`,
    `Submitted: ${new Date(s.created_at).toLocaleString()}`,
    `Source: ${s.source || "—"}`,
    `Service interest: ${s.service_interest || "—"}`,
    `Budget: ${s.budget || "—"}`,
    `Timeline: ${s.timeline || "—"}`,
    "",
    "--- Message ---",
    s.message || "—",
  ].join("\n");

export const exportLeadsCsv = (submissions: Submission[]) => {
  const header = [
    "id", "date", "name", "email", "source", "service_interest", "budget", "timeline",
    "email_sent", "message", "profile_text",
  ];
  const rows = submissions.map((s) => [
    s.id, s.created_at, s.name, s.email, s.source, s.service_interest, s.budget, s.timeline,
    s.email_sent, s.message, buildLeadProfile(s),
  ]);
  downloadCsv(`projgrowth-leads-${today()}.csv`, header, rows);
};

export const exportDiscoveryCsv = (discovery: Discovery[]) => {
  const clean = discovery.filter((d) => d.full_name !== "_TEST_VERIFY");
  const responseKeys = Array.from(
    new Set(clean.flatMap((d) => Object.keys(d.responses || {})))
  ).sort();
  const baseHeader = [
    "id", "date", "full_name", "email", "practice_name", "services", "engagement_tier",
    "confidence", "quality_score", "quality_flags", "email_sent",
    "polished_brief", "generated_brief",
    "reference_image_count", "reference_signed_urls",
    "profile_text", "responses_json",
  ];
  const header = [...baseHeader, ...responseKeys.map((k) => `q_${k}`)];
  const rows = clean.map((d) => [
    d.id, d.created_at, d.full_name, d.email, d.practice_name, d.services, d.engagement_tier,
    d.confidence, d.quality_score, d.quality_flags, d.email_sent,
    d.polished_brief, d.generated_brief,
    d.reference_signed_urls?.length || 0,
    (d.reference_signed_urls || []).join(" | "),
    buildDiscoveryProfile(d),
    JSON.stringify(d.responses || {}),
    ...responseKeys.map((k) => (d.responses || {})[k]),
  ]);
  downloadCsv(`projgrowth-discovery-${today()}.csv`, header, rows);
};