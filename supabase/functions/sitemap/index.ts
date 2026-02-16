import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const DOMAIN = "https://projgrowth.com";

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

const STATIC_PAGES: SitemapUrl[] = [
  { loc: "/", lastmod: "2025-06-01", changefreq: "weekly", priority: "1.0" },
  { loc: "/services", lastmod: "2025-06-01", changefreq: "monthly", priority: "0.9" },
  { loc: "/services/web-design", lastmod: "2025-06-01", changefreq: "monthly", priority: "0.9" },
  { loc: "/services/branding", lastmod: "2025-06-01", changefreq: "monthly", priority: "0.9" },
  { loc: "/services/content-creation", lastmod: "2025-06-01", changefreq: "monthly", priority: "0.9" },
  { loc: "/services/digital-marketing", lastmod: "2025-06-01", changefreq: "monthly", priority: "0.9" },
  { loc: "/work", lastmod: "2025-06-01", changefreq: "weekly", priority: "0.8" },
  { loc: "/about", lastmod: "2025-06-01", changefreq: "monthly", priority: "0.8" },
  { loc: "/blog", lastmod: "2025-06-01", changefreq: "weekly", priority: "0.8" },
  { loc: "/contact", lastmod: "2025-06-01", changefreq: "monthly", priority: "0.7" },
  { loc: "/privacy", lastmod: "2025-06-01", changefreq: "yearly", priority: "0.5" },
  { loc: "/terms", lastmod: "2025-06-01", changefreq: "yearly", priority: "0.5" },
];

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return new Date().toISOString().split("T")[0];
  return new Date(dateStr).toISOString().split("T")[0];
}

function buildUrlEntry(url: SitemapUrl): string {
  return `  <url>
    <loc>${escapeXml(DOMAIN + url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all dynamic entities in parallel
    const [blogRes, workRes, servicesRes] = await Promise.all([
      supabase
        .from("blog_posts")
        .select("slug, updated_at, published_at")
        .eq("published", true)
        .order("published_at", { ascending: false }),
      supabase
        .from("work")
        .select("slug, updated_at")
        .order("created_at", { ascending: false }),
      supabase
        .from("services")
        .select("slug, updated_at")
        .order("created_at", { ascending: false }),
    ]);

    const urls: SitemapUrl[] = [...STATIC_PAGES];

    // Blog posts
    if (blogRes.data) {
      for (const post of blogRes.data) {
        urls.push({
          loc: `/blog/${post.slug}`,
          lastmod: formatDate(post.updated_at),
          changefreq: "monthly",
          priority: "0.6",
        });
      }
    }

    // Work / case studies
    if (workRes.data) {
      for (const item of workRes.data) {
        urls.push({
          loc: `/work/${item.slug}`,
          lastmod: formatDate(item.updated_at),
          changefreq: "monthly",
          priority: "0.7",
        });
      }
    }

    // Services (dynamic — supplements static service pages if new ones added)
    if (servicesRes.data) {
      const staticSlugs = new Set(
        STATIC_PAGES.filter((p) => p.loc.startsWith("/services/")).map((p) =>
          p.loc.replace("/services/", "")
        )
      );
      for (const svc of servicesRes.data) {
        if (!staticSlugs.has(svc.slug)) {
          urls.push({
            loc: `/services/${svc.slug}`,
            lastmod: formatDate(svc.updated_at),
            changefreq: "monthly",
            priority: "0.9",
          });
        }
      }
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(buildUrlEntry).join("\n")}
</urlset>`;

    return new Response(xml, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/xml; charset=utf-8",
        },
      }
    );
  }
});
