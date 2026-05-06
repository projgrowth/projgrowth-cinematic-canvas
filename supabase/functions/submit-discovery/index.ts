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
});

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
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
    const { full_name, email, practice_name, responses, generated_brief } = parsed.data;

    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: row, error: dbError } = await supabase
      .from("discovery_submissions")
      .insert({
        full_name: full_name.trim(),
        email: email.trim().toLowerCase(),
        practice_name: practice_name?.trim() || null,
        responses,
        generated_brief: generated_brief || null,
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
        ${responses.dbaName ? `<p><strong>DBA name:</strong> ${esc(String(responses.dbaName))}</p>` : ""}
        ${generated_brief ? `<h3>Generated Brief</h3><p>${esc(generated_brief)}</p>` : ""}
        ${adjectives ? `<p><strong>Adjectives:</strong> ${esc(adjectives)}</p>` : ""}
        ${responses.vision ? `<p><strong>5-year vision:</strong> ${esc(String(responses.vision))}</p>` : ""}
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