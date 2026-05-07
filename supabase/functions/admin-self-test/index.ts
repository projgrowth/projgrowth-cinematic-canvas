import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.84.0";
import bcrypt from "https://esm.sh/bcryptjs@2.4.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TEST_MARKER = "_TEST_VERIFY";

async function verifyAdmin(email: string | undefined, password: string | undefined, sb: any): Promise<boolean> {
  if (!password) return false;
  const adminPassword = Deno.env.get("ADMIN_PASSWORD");
  if (!email && adminPassword && password === adminPassword) return true;
  if (!email) return false;
  const { data } = await sb
    .from("admin_users")
    .select("password_hash, active")
    .eq("email", email.toLowerCase().trim())
    .maybeSingle();
  if (!data || !data.active) return false;
  return await bcrypt.compare(password, data.password_hash);
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const steps: { step: string; ok: boolean; detail?: string }[] = [];
  const fail = (msg: string) =>
    new Response(JSON.stringify({ ok: false, steps, error: msg }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  try {
    const { email, password } = await req.json();
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    if (!(await verifyAdmin(email, password, supabase))) {
      return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // 1) Cleanup any leftover test rows first
    await supabase.from("discovery_submissions").delete().eq("full_name", TEST_MARKER);
    steps.push({ step: "Cleanup prior test rows", ok: true });

    // 2) Insert a synthetic row directly (exercises schema, no email/AI noise)
    const sampleResponses = {
      pitch: "Boutique advisory practice serving Orlando families with thoughtful long-horizon planning.",
      vision: "The most trusted multigenerational planner in Central Florida.",
      brandPromise: "Plans you actually understand.",
      brandStory: "Clarity beats complexity.",
      brandValues: ["clarity", "trust", "craft"],
      adjectives: ["calm", "modern", "warm"],
      tone: "established",
      mood: "refined",
      pQB: "refined",
      dbaName: "Self-Test Wealth",
    };

    const { data: inserted, error: insertErr } = await supabase
      .from("discovery_submissions")
      .insert({
        full_name: TEST_MARKER,
        email: "selftest@projgrowth.com",
        practice_name: "Self Test",
        responses: sampleResponses,
        generated_brief: "Synthetic brief used by admin self-test.",
        polished_brief: "Synthetic polished brief.",
        quality_score: 100,
        quality_flags: [],
        confidence: "committed",
        services: ["branding"],
        engagement_tier: "Self-Test",
        reference_image_urls: [],
        email_sent: false,
      })
      .select("id")
      .single();

    if (insertErr || !inserted) {
      steps.push({ step: "Insert test row", ok: false, detail: insertErr?.message || "no row" });
      return fail(insertErr?.message || "Insert failed — schema may be missing new columns");
    }
    steps.push({ step: "Insert test row", ok: true, detail: `id=${inserted.id}` });

    // 3) Read it back and confirm the new columns are present + populated
    const { data: row, error: readErr } = await supabase
      .from("discovery_submissions")
      .select("id, polished_brief, quality_score, quality_flags")
      .eq("id", inserted.id)
      .single();

    if (readErr || !row) {
      steps.push({ step: "Read row back", ok: false, detail: readErr?.message });
      return fail("Could not read row back");
    }

    const hasPolish = typeof row.polished_brief === "string" && row.polished_brief.length > 0;
    const hasScore = typeof row.quality_score === "number";
    const hasFlags = Array.isArray(row.quality_flags);
    steps.push({ step: "polished_brief column", ok: hasPolish });
    steps.push({ step: "quality_score column", ok: hasScore, detail: String(row.quality_score) });
    steps.push({ step: "quality_flags column", ok: hasFlags });

    // 4) Cleanup
    const { error: delErr } = await supabase
      .from("discovery_submissions")
      .delete()
      .eq("id", inserted.id);
    steps.push({ step: "Delete test row", ok: !delErr, detail: delErr?.message });

    const allOk = steps.every((s) => s.ok);
    return new Response(
      JSON.stringify({ ok: allOk, steps }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } },
    );
  } catch (e: any) {
    return fail(e?.message || "Server error");
  }
});