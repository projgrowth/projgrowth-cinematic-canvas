import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.84.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { password } = await req.json();
    const adminPassword = Deno.env.get("ADMIN_PASSWORD");

    if (!adminPassword || password !== adminPassword) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const [{ data: submissions, error: e1 }, { data: discovery, error: e2 }] = await Promise.all([
      supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }).limit(200),
      supabase.from("discovery_submissions").select("*").order("created_at", { ascending: false }).limit(200),
    ]);

    if (e1 || e2) {
      console.error("DB error:", e1 || e2);
      return new Response(
        JSON.stringify({ error: "Failed to fetch submissions" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Sign reference image URLs (1h) for each discovery row
    const enriched = await Promise.all((discovery || []).map(async (d: any) => {
      const paths: string[] = Array.isArray(d.reference_image_urls) ? d.reference_image_urls : [];
      if (!paths.length) return { ...d, reference_signed_urls: [] };
      const { data: signed } = await supabase.storage.from("discovery-uploads").createSignedUrls(paths, 3600);
      return { ...d, reference_signed_urls: (signed || []).map((s: any) => s.signedUrl).filter(Boolean) };
    }));

    return new Response(
      JSON.stringify({ submissions, discovery: enriched }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Bad request" }),
      { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
