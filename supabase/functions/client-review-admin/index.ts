import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.84.0";
import bcrypt from "https://esm.sh/bcryptjs@2.4.3";
import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });

const schema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(1).max(200),
  action: z.enum(["list", "status", "delete"]),
  id: z.string().uuid().optional(),
  status: z.enum(["new", "in_progress", "done"]).optional(),
});

async function verifyAdmin(email: string, password: string, sb: ReturnType<typeof createClient>) {
  const { data } = await sb
    .from("admin_users")
    .select("password_hash, active")
    .eq("email", email.toLowerCase().trim())
    .maybeSingle();
  if (!data || !data.active) return false;
  return bcrypt.compareSync(password, (data as { password_hash: string }).password_hash);
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "invalid_request" }, 405);

  let parsed;
  try {
    parsed = schema.safeParse(await req.json());
  } catch {
    return json({ error: "invalid_request" }, 400);
  }
  if (!parsed.success) return json({ error: "invalid_request" }, 400);

  const { email, password, action, id, status } = parsed.data;
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  try {
    if (!(await verifyAdmin(email, password, supabase))) {
      return json({ error: "unauthorized" }, 401);
    }

    if (action === "status") {
      if (!id || !status) return json({ error: "invalid_request" }, 400);
      const { error } = await supabase.from("review_comments").update({ status }).eq("id", id);
      if (error) throw error;
    }

    if (action === "delete") {
      if (!id) return json({ error: "invalid_request" }, 400);
      const { error } = await supabase.from("review_comments").delete().eq("id", id);
      if (error) throw error;
    }

    const { data, error } = await supabase
      .from("review_comments")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(300);
    if (error) throw error;

    return json({ comments: data ?? [] }, 200);
  } catch (e) {
    console.error("client-review-admin error:", e);
    return json({ error: "unavailable" }, 503);
  }
});
