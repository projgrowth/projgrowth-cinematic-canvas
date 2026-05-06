// Generates a clean, on-brand PDF of the advisor's brand brief.
import { jsPDF } from "jspdf";

export type BriefPdfInput = {
  name: string;
  email: string;
  practice: string;
  dba: string;
  visionSummary: string;
  brief: string;
  responses: Record<string, any>;
  services: string[];
  confidence: string;
  tier: string;
};

const EMERALD = "#44A078";
const NM_BLUE = "#0E497B";
const INK = "#1a1a1a";
const MUTE = "#6b7280";
const LINE = "#e5e7eb";
const PAGE_W = 612; // 8.5"
const PAGE_H = 792; // 11"
const M = 56;       // margin

function wrap(doc: jsPDF, text: string, maxWidth: number): string[] {
  return doc.splitTextToSize(text || "", maxWidth);
}

function header(doc: jsPDF, dba: string, page: number) {
  doc.setDrawColor(EMERALD);
  doc.setLineWidth(2);
  doc.line(M, 36, M + 28, 36);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(MUTE);
  doc.text("BRAND DISCOVERY · PROJGROWTH", M + 36, 39);
  doc.text(dba.toUpperCase(), PAGE_W - M, 39, { align: "right" });
  doc.text(String(page).padStart(2, "0"), PAGE_W - M, PAGE_H - 28, { align: "right" });
  doc.setTextColor(INK);
}

function sectionTitle(doc: jsPDF, label: string, y: number): number {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(EMERALD);
  doc.text(label.toUpperCase(), M, y);
  doc.setDrawColor(LINE);
  doc.setLineWidth(0.5);
  doc.line(M, y + 4, PAGE_W - M, y + 4);
  doc.setTextColor(INK);
  return y + 18;
}

function paragraph(doc: jsPDF, text: string, y: number, opts: { size?: number; bold?: boolean; color?: string; lh?: number } = {}): number {
  const size = opts.size ?? 10;
  doc.setFont("helvetica", opts.bold ? "bold" : "normal");
  doc.setFontSize(size);
  doc.setTextColor(opts.color || INK);
  const lines = wrap(doc, text, PAGE_W - M * 2);
  const lh = opts.lh ?? size * 1.45;
  lines.forEach((ln, i) => doc.text(ln, M, y + i * lh));
  return y + lines.length * lh + 4;
}

function kv(doc: jsPDF, k: string, v: string, y: number): number {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(MUTE);
  doc.text(k.toUpperCase(), M, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(INK);
  const lines = wrap(doc, v || "—", PAGE_W - M * 2 - 130);
  lines.forEach((ln, i) => doc.text(ln, M + 130, y + i * 13));
  return y + Math.max(13, lines.length * 13) + 6;
}

function safe(v: any): string {
  if (v == null) return "—";
  if (Array.isArray(v)) return v.length ? v.join(", ") : "—";
  if (typeof v === "string") return v.trim() || "—";
  return String(v);
}

export function buildBrandBriefPdf(input: BriefPdfInput): jsPDF {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const { name, email, practice, dba, visionSummary, brief, responses, services, confidence, tier } = input;

  // ---------- Page 1 ----------
  header(doc, dba, 1);

  // Hero
  let y = 110;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(EMERALD);
  doc.text("YOUR BRAND, IN YOUR WORDS", M, y);
  y += 26;

  doc.setFont("times", "italic");
  doc.setFontSize(34);
  doc.setTextColor(INK);
  const titleLines = wrap(doc, dba, PAGE_W - M * 2);
  titleLines.forEach((ln, i) => doc.text(ln, M, y + i * 38));
  y += titleLines.length * 38 + 20;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(INK);
  const summary = wrap(doc, visionSummary, PAGE_W - M * 2);
  summary.forEach((ln, i) => doc.text(ln, M, y + i * 17));
  y += summary.length * 17 + 28;

  // Snapshot block
  y = sectionTitle(doc, "Snapshot", y);
  y = kv(doc, "Advisor", `${name}  ·  ${email}`, y);
  y = kv(doc, "Practice", practice || dba, y);
  y = kv(doc, "Confidence", confidence, y);
  y = kv(doc, "Recommended scope", tier, y);
  y = kv(doc, "Services discussed", safe(services), y);

  y += 10;
  y = sectionTitle(doc, "Strategic Brief", y);
  y = paragraph(doc, brief, y, { size: 10.5, lh: 15 });

  // What it stands for
  const values = [...((responses?.brandValues as string[]) || []), responses?.brandValuesCustom].filter(Boolean).join(", ");
  const promise = (responses?.brandPromise as string) || "";
  const story = (responses?.brandStory as string) || "";
  if (values || promise || story) {
    y += 14;
    y = sectionTitle(doc, "What it stands for", y);
    if (values)  y = kv(doc, "Values", values, y);
    if (promise) y = kv(doc, "Promise", `"${promise}"`, y);
    if (story)   y = kv(doc, "Belief", story, y);
  }

  // Footer note
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(MUTE);
  doc.text("Mockups shown during the session are visual reference only — your actual identity is built in the next phase.", M, PAGE_H - 50, { maxWidth: PAGE_W - M * 2 });

  // ---------- Page 2 — answers ----------
  doc.addPage();
  header(doc, dba, 2);

  y = 90;
  y = sectionTitle(doc, "What you told us", y);

  const ANSWER_KEYS: Array<[string, string]> = [
    ["dbaName", "DBA name"],
    ["audience", "Audience"],
    ["adjectives", "Brand adjectives"],
    ["brandValues", "Brand values"],
    ["brandPromise", "Brand promise"],
    ["brandStory", "Driving belief"],
    ["tone", "Tone"],
    ["mood", "Mood direction"],
    ["typo", "Typography"],
    ["mark", "Mark structure"],
    ["iconConcept", "Icon direction"],
    ["accent", "Accent color"],
    ["density", "Density"],
    ["nmLean", "NM lockup approach"],
    ["truth", "Non-negotiable truths"],
    ["vision", "5-year vision"],
    ["references", "References"],
    ["websiteGoals", "Website goals"],
    ["contentGoals", "Content goals"],
    ["adsGoals", "Ads goals"],
    ["printNeeds", "Print needs"],
    ["timeline", "Timeline"],
  ];

  for (const [k, label] of ANSWER_KEYS) {
    const v = responses?.[k];
    if (v == null || v === "" || (Array.isArray(v) && !v.length)) continue;
    if (v === "__exploring__") {
      y = kv(doc, label, "Still exploring — open to recommendation", y);
    } else {
      y = kv(doc, label, safe(v), y);
    }
    if (y > PAGE_H - 80) {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.setTextColor(MUTE);
      doc.text("(continued)", M, PAGE_H - 50);
      doc.addPage();
      header(doc, dba, doc.getNumberOfPages());
      y = 90;
      y = sectionTitle(doc, "What you told us (cont.)", y);
    }
  }

  // ---------- Final page — what happens next ----------
  doc.addPage();
  header(doc, dba, doc.getNumberOfPages());
  y = 110;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(EMERALD);
  doc.text("WHAT HAPPENS NEXT", M, y);
  y += 22;
  doc.setFont("times", "italic");
  doc.setFontSize(28);
  doc.setTextColor(INK);
  doc.text("We'll be in touch.", M, y);
  y += 32;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(INK);
  y = paragraph(doc,
    "Within 24–48 hours you'll get a short, written read on what we heard — plus a recommendation on the smallest version of the engagement that gets you what you actually need. No deck. No fluff.",
    y, { size: 11, lh: 17 }
  );
  y += 12;
  y = paragraph(doc,
    "Keep this PDF. It's your brief in your own words — useful even if you decide to work with someone else.",
    y, { size: 10, color: MUTE, lh: 15 }
  );

  // Sign-off
  doc.setDrawColor(EMERALD);
  doc.setLineWidth(2);
  doc.line(M, PAGE_H - 90, M + 28, PAGE_H - 90);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(INK);
  doc.text("ProjGrowth", M, PAGE_H - 72);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(MUTE);
  doc.text("Boutique branding for advisors who refuse to look generic.", M, PAGE_H - 58);
  doc.text("info@projgrowth.com", M, PAGE_H - 44);

  return doc;
}

export function downloadBrandBriefPdf(input: BriefPdfInput) {
  const doc = buildBrandBriefPdf(input);
  const safeName = (input.dba || "brand-brief").replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  doc.save(`${safeName}-brand-brief.pdf`);
}
