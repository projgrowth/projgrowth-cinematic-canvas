import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { z } from "https://esm.sh/zod@3.23.8";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.84.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const schema = z.object({
  full_name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  practice_name: z.string().trim().max(200).optional().nullable(),
  responses: z.record(z.any()),
  generated_brief: z.string().max(5000).optional(),
  confidence: z.string().max(40).optional(),
  services: z.array(z.string().max(40)).max(20).optional(),
  engagement_tier: z.string().max(40).optional(),
  reference_image_urls: z.array(z.string().max(500)).max(10).optional(),
});

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ---- Quality scoring ----------------------------------------------------
function scoreSubmission(r: Record<string, any>, confidence?: string): { score: number; flags: string[] } {
  const flags: string[] = [];
  let score = 100;
  const wc = (s: any) => (typeof s === "string" ? s.trim().split(/\s+/).filter(Boolean).length : 0);

  if (wc(r.pitch) < 8) { flags.push("thin_pitch"); score -= 15; }
  if (wc(r.vision) < 6) { flags.push("thin_vision"); score -= 10; }
  if (!r.brandPromise || wc(r.brandPromise) < 4) { flags.push("missing_promise"); score -= 10; }
  if (!Array.isArray(r.adjectives) || r.adjectives.length < 2) { flags.push("few_adjectives"); score -= 8; }
  if (!Array.isArray(r.brandValues) || r.brandValues.length === 0) { flags.push("no_values"); score -= 8; }

  // Count "exploring" skips across service detail fields
  const skipFields = ["websiteGoals","contentNeeds","adsBudget","printNeeds","timeline"];
  const skipped = skipFields.filter(k => r[k] === "__exploring__").length;
  if (skipped >= 3) { flags.push("many_skips"); score -= 12; }

  // Tonal contradictions
  if (r.tone === "established" && r.pQB === "bold" && r.mood === "bold") {
    flags.push("tone_conflict"); score -= 6;
  }
  if (confidence === "discovery" && wc(r.pitch) < 5 && wc(r.vision) < 5) {
    flags.push("low_signal"); score -= 10;
  }

  return { score: Math.max(0, Math.min(100, score)), flags };
}

// ---- AI polish via Lovable AI Gateway ----------------------------------
async function polishBrief(rawBrief: string, responses: Record<string, any>): Promise<string | null> {
  const key = Deno.env.get("LOVABLE_API_KEY");
  if (!key || !rawBrief) return null;
  const sys = "You are a senior brand strategist writing internal creative briefs for a boutique design studio. Rewrite the input as two crisp paragraphs (max 140 words total). First paragraph: who the practice is and what it stands for. Second paragraph: visual direction and what success looks like. Use the advisor's own words where strong. No marketing fluff, no hedging, no headings. Plain prose only.";
  const user = `RAW BRIEF:\n${rawBrief}\n\nKEY DETAILS:\n- Promise: ${responses.brandPromise || "—"}\n- Belief: ${responses.brandStory || "—"}\n- Values: ${(responses.brandValues || []).join(", ") || "—"}\n- Vision: ${responses.vision || "—"}`;
  try {
    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: sys }, { role: "user", content: user }],
      }),
    });
    if (!resp.ok) { console.error("polishBrief gateway error", resp.status, await resp.text()); return null; }
    const data = await resp.json();
    return data?.choices?.[0]?.message?.content?.trim() || null;
  } catch (e) {
    console.error("polishBrief error", e);
    return null;
  }
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: "Invalid input", details: parsed.error.flatten() }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
    const { full_name, email, practice_name, responses, generated_brief,
      confidence, services, engagement_tier, reference_image_urls } = parsed.data;

    const { score: quality_score, flags: quality_flags } = scoreSubmission(responses, confidence);
    const polished_brief = await polishBrief(generated_brief || "", responses);

    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: row, error: dbError } = await supabase
      .from("discovery_submissions")
      .insert({
        full_name: full_name.trim(),
        email: email.trim().toLowerCase(),
        practice_name: practice_name?.trim() || null,
        responses,
        generated_brief: generated_brief || null,
        polished_brief: polished_brief,
        quality_score,
        quality_flags,
        confidence: confidence || null,
        services: services || [],
        engagement_tier: engagement_tier || null,
        reference_image_urls: reference_image_urls || [],
        email_sent: false,
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("DB error:", dbError);
      return new Response(JSON.stringify({ error: "Failed to save submission" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }

    let emailSent = false;
    try {
      const adjectives = Array.isArray(responses.adjectives) ? responses.adjectives.join(", ") : "";
      const html = `
        <h2>New NM Discovery Submission</h2>
        <p><strong>Name:</strong> ${esc(full_name)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        ${practice_name ? `<p><strong>Practice:</strong> ${esc(practice_name)}</p>` : ""}
        ${confidence ? `<p><strong>Confidence:</strong> ${esc(confidence)}</p>` : ""}
        ${services && services.length ? `<p><strong>Services:</strong> ${esc(services.join(", "))}</p>` : ""}
        ${engagement_tier ? `<p><strong>Suggested tier:</strong> ${esc(engagement_tier)}</p>` : ""}
        <p><strong>Quality:</strong> ${quality_score}/100${quality_flags.length ? ` · flags: ${esc(quality_flags.join(", "))}` : ""}</p>
        ${responses.dbaName ? `<p><strong>DBA name:</strong> ${esc(String(responses.dbaName))}</p>` : ""}
        ${polished_brief ? `<h3>Polished Brief (AI)</h3><p>${esc(polished_brief).replace(/\n/g,"<br/>")}</p>` : ""}
        ${generated_brief ? `<h3>Generated Brief</h3><p>${esc(generated_brief)}</p>` : ""}
        ${adjectives ? `<p><strong>Adjectives:</strong> ${esc(adjectives)}</p>` : ""}
        ${responses.vision ? `<p><strong>5-year vision:</strong> ${esc(String(responses.vision))}</p>` : ""}
        ${reference_image_urls && reference_image_urls.length ? `<p><strong>${reference_image_urls.length} reference image(s) uploaded</strong> — view in admin</p>` : ""}
        <p><a href="https://projgrowth.com/admin/leads">View in admin</a></p>
      `;
      await resend.emails.send({
        from: "ProjGrowth Discovery <onboarding@resend.dev>",
        to: ["info@projgrowth.com"],
        replyTo: email,
        subject: `NM Discovery: ${full_name}${practice_name ? ` — ${practice_name}` : ""}`,
        html,
      });
      emailSent = true;
    } catch (e) {
      console.error("Email failed (submission still saved):", e);
    }

    if (emailSent && row?.id) {
      await supabase.from("discovery_submissions").update({ email_sent: true }).eq("id", row.id);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err: any) {
    console.error("submit-discovery error:", err);
    return new Response(JSON.stringify({ error: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } });
  }
});