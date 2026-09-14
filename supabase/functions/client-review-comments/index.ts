import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.84.0";
import { z } from "https://esm.sh/zod@3.23.8";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { verifyReviewToken } from "../_shared/reviewToken.ts";

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

const NOTIFY_TO = "info@projgrowth.com";

const createSchema = z.object({
  action: z.literal("create"),
  token: z.string().min(1),
  page_path: z.string().min(1).max(200),
  page_label: z.string().max(120).optional(),
  device: z.enum(["desktop", "mobile"]),
  x_pct: z.number().min(0).max(100),
  y_pct: z.number().min(0).max(100),
  body: z.string().trim().min(1).max(1000),
});

const listSchema = z.object({
  action: z.literal("list"),
  token: z.string().min(1),
});

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#039;");

// Lightweight in-memory throttle: 20 notes per 10 minutes per instance/IP.
const posts = new Map<string, { count: number; reset: number }>();
function throttled(ip: string): boolean {
  const now = Date.now();
  const rec = posts.get(ip);
  if (!rec || now > rec.reset) {
    posts.set(ip, { count: 1, reset: now + 10 * 60_000 });
    return false;
  }
  rec.count++;
  return rec.count > 20;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "invalid_request" }, 405);

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return json({ error: "invalid_request" }, 400);
  }

  const action = (raw as { action?: string })?.action;
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  try {
    if (action === "list") {
      const parsed = listSchema.safeParse(raw);
      if (!parsed.success) return json({ error: "invalid_request" }, 400);
      const slug = await verifyReviewToken(parsed.data.token);
      if (!slug) return json({ error: "unauthorized" }, 401);

      const { data, error } = await supabase
        .from("review_comments")
        .select("id, page_path, page_label, device, x_pct, y_pct, body, status, created_at")
        .eq("client_slug", slug)
        .order("created_at", { ascending: true })
        .limit(200);
      if (error) throw error;
      return json({ comments: data ?? [] }, 200);
    }

    if (action === "create") {
      const parsed = createSchema.safeParse(raw);
      if (!parsed.success) return json({ error: "invalid_request" }, 400);
      const slug = await verifyReviewToken(parsed.data.token);
      if (!slug) return json({ error: "unauthorized" }, 401);

      const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
      if (throttled(ip)) return json({ error: "throttled" }, 429);

      const { page_path, page_label, device, x_pct, y_pct, body } = parsed.data;
      const { data, error } = await supabase
        .from("review_comments")
        .insert({
          client_slug: slug,
          page_path,
          page_label: page_label ?? null,
          device,
          x_pct,
          y_pct,
          body,
        })
        .select("id, page_path, page_label, device, x_pct, y_pct, body, status, created_at")
        .single();
      if (error) throw error;

      // Notification is best-effort: never fail the client's note because email failed.
      try {
        const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
        await resend.emails.send({
          from: "ProjGrowth <onboarding@resend.dev>",
          to: [NOTIFY_TO],
          subject: `Review note — ${slug} (${page_label || page_path})`,
          html: `
            <h2>New client review note</h2>
            <p><strong>Client:</strong> ${escapeHtml(slug)}</p>
            <p><strong>Page:</strong> ${escapeHtml(page_label || page_path)} (${escapeHtml(page_path)})</p>
            <p><strong>Device:</strong> ${escapeHtml(device)}</p>
            <p><strong>Position:</strong> ${Math.round(x_pct)}% across, ${Math.round(y_pct)}% down the visible frame</p>
            <p><strong>Note:</strong></p>
            <p>${escapeHtml(body).replace(/\n/g, "<br>")}</p>
          `,
        });
      } catch (e) {
        console.error("Review note email failed:", e);
      }

      return json({ comment: data }, 200);
    }

    return json({ error: "invalid_request" }, 400);
  } catch (e) {
    console.error("client-review-comments error:", e);
    return json({ error: "unavailable" }, 503);
  }
});
