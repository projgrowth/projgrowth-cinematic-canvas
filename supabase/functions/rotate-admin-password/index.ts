import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import bcrypt from "https://esm.sh/bcryptjs@2.4.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const password = Deno.env.get("NEW_ADMIN_PASSWORD");
    if (!password || password.length < 12) {
      return new Response(JSON.stringify({ error: "NEW_ADMIN_PASSWORD missing or too short (min 12 chars)" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const hash = await bcrypt.hash(password, 12);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error } = await supabase
      .from("admin_users")
      .update({ password_hash: hash, updated_at: new Date().toISOString() })
      .eq("email", "dan@projgrowth.com");

    if (error) throw error;

    return new Response(JSON.stringify({ ok: true, rotated: "dan@projgrowth.com" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});