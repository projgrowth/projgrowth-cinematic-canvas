import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.84.0";
import bcrypt from "https://esm.sh/bcryptjs@2.4.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

export async function verifyAdmin(email: string | undefined, password: string | undefined): Promise<{ ok: boolean; email?: string }> {
  if (!password) return { ok: false };
  // Legacy fallback: shared password env
  const adminPassword = Deno.env.get("ADMIN_PASSWORD");
  if (!email && adminPassword && password === adminPassword) {
    return { ok: true, email: "legacy" };
  }
  if (!email) return { ok: false };
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
  const { data, error } = await supabase
    .from("admin_users")
    .select("email, password_hash, active")
    .eq("email", email.toLowerCase().trim())
    .maybeSingle();
  if (error || !data || !data.active) return { ok: false };
  const ok = await bcrypt.compare(password, data.password_hash);
  return ok ? { ok: true, email: data.email } : { ok: false };
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, password } = await req.json();
    const result = await verifyAdmin(email, password);
    const authenticated = result.ok;
    return new Response(
      JSON.stringify({ authenticated, email: result.email }),
      { status: authenticated ? 200 : 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch {
    return new Response(
      JSON.stringify({ authenticated: false }),
      { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
