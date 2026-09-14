import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.84.0";
import bcrypt from "https://esm.sh/bcryptjs@2.4.3";
import { issueReviewToken } from "../_shared/reviewToken.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

/**
 * Registry of private client review gateways. Adding another client means
 * adding one entry plus its two secrets — no new logic, no new function.
 * Secrets hold the access code (plaintext or bcrypt hash) and destination URL.
 */
const GATEWAYS: Record<string, { passwordSecret: string; urlSecret: string }> = {
  golinowskilawrebuild: {
    passwordSecret: "GOLINOWSKI_REVIEW_PASSWORD",
    urlSecret: "GOLINOWSKI_REVIEW_URL",
  },
};

const MAX_FAILURES = 5;
const WINDOW_MINUTES = 10;

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });

async function hashIp(ip: string): Promise<string> {
  const data = new TextEncoder().encode(`client-gateway:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const x = enc.encode(a);
  const y = enc.encode(b);
  let diff = x.length ^ y.length;
  const len = Math.max(x.length, y.length);
  for (let i = 0; i < len; i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return diff === 0;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") return json({ error: "invalid_request" }, 405);

  let slug = "";
  let code = "";
  try {
    const body = await req.json();
    slug = typeof body?.slug === "string" ? body.slug.trim().toLowerCase() : "";
    code = typeof body?.code === "string" ? body.code : "";
  } catch {
    return json({ error: "invalid_request" }, 400);
  }

  const gateway = GATEWAYS[slug];
  // Unknown slug and wrong code are indistinguishable to the caller.
  if (!gateway || code.length < 1 || code.length > 200) {
    return json({ error: "invalid_code" }, 401);
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") ||
    "unknown";
  const ipHash = await hashIp(ip);

  try {
    const since = new Date(Date.now() - WINDOW_MINUTES * 60_000).toISOString();
    const { count } = await supabase
      .from("client_access_attempts")
      .select("id", { count: "exact", head: true })
      .eq("client_slug", slug)
      .eq("ip_hash", ipHash)
      .eq("succeeded", false)
      .gte("created_at", since);

    if ((count ?? 0) >= MAX_FAILURES) {
      return json({ error: "throttled" }, 429);
    }

    const stored = Deno.env.get(gateway.passwordSecret);
    if (!stored) return json({ error: "unavailable" }, 503);

    const ok = stored.startsWith("$2")
      ? bcrypt.compareSync(code, stored)
      : timingSafeEqual(code, stored);

    await supabase.from("client_access_attempts").insert({
      client_slug: slug,
      ip_hash: ipHash,
      succeeded: ok,
    });

    if (!ok) return json({ error: "invalid_code" }, 401);

    const url = Deno.env.get(gateway.urlSecret)?.trim();
    const token = await issueReviewToken(slug);
    if (!url || !/^https:\/\//i.test(url)) {
      return json({ status: "pending", token }, 200);
    }
    return json({ status: "ready", url, token }, 200);
  } catch {
    return json({ error: "unavailable" }, 503);
  }
});
