// Runs before `vite dev` and `vite build` via predev/prebuild hooks.
// Writes public/sitemap.xml with static routes + published blog posts + case studies.

import { writeFileSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const BASE_URL = "https://projgrowth.com";

// Parse .env for Supabase creds (no dotenv dep required)
function loadEnv() {
  try {
    const raw = readFileSync(resolve(".env"), "utf8");
    const env = {};
    for (const line of raw.split("\n")) {
      const m = line.match(/^([A-Z0-9_]+)\s*=\s*"?([^"]*)"?\s*$/);
      if (m) env[m[1]] = m[2];
    }
    return env;
  } catch {
    return {};
  }
}

const env = loadEnv();
const SUPABASE_URL = env.VITE_SUPABASE_URL || "";
const SUPABASE_KEY = env.VITE_SUPABASE_PUBLISHABLE_KEY || "";

// Static routes (mirror src/App.tsx, indexable public pages only)
const staticEntries = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/services/web-design", changefreq: "monthly", priority: "0.9" },
  { path: "/services/branding", changefreq: "monthly", priority: "0.9" },
  { path: "/services/content-creation", changefreq: "monthly", priority: "0.9" },
  { path: "/services/digital-marketing", changefreq: "monthly", priority: "0.9" },
  { path: "/work", changefreq: "weekly", priority: "0.8" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/privacy", changefreq: "yearly", priority: "0.5" },
  { path: "/terms", changefreq: "yearly", priority: "0.5" },
];

// Static case study slugs (from src/data/caseStudies.ts)
async function loadCaseStudySlugs() {
  try {
    const raw = readFileSync(resolve("src/data/caseStudies.ts"), "utf8");
    // Extract id: "slug" fields from the caseStudies array
    const matches = [...raw.matchAll(/id:\s*"([^"]+)"/g)];
    return matches.map((m) => m[1]);
  } catch {
    return [];
  }
}

async function fetchBlogSlugs() {
  if (!SUPABASE_URL || !SUPABASE_KEY) return [];
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?select=slug,published_at&published=eq.true&order=published_at.desc`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );
    if (!res.ok) {
      console.warn(`[sitemap] blog fetch failed: ${res.status}`);
      return [];
    }
    return await res.json();
  } catch (err) {
    console.warn(`[sitemap] blog fetch error: ${err?.message ?? err}`);
    return [];
  }
}

function xmlEntry(e) {
  return [
    "  <url>",
    `    <loc>${BASE_URL}${e.path}</loc>`,
    e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
    e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
    e.priority ? `    <priority>${e.priority}</priority>` : null,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

async function main() {
  const caseSlugs = await loadCaseStudySlugs();
  const blogPosts = await fetchBlogSlugs();

  const caseEntries = caseSlugs.map((slug) => ({
    path: `/work/${slug}`,
    changefreq: "monthly",
    priority: "0.7",
  }));

  const blogEntries = blogPosts.map((p) => ({
    path: `/blog/${p.slug}`,
    lastmod: p.published_at ? new Date(p.published_at).toISOString().split("T")[0] : undefined,
    changefreq: "monthly",
    priority: "0.6",
  }));

  const entries = [...staticEntries, ...caseEntries, ...blogEntries];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(xmlEntry),
    "</urlset>",
  ].join("\n");

  writeFileSync(resolve("public/sitemap.xml"), xml);
  console.log(
    `[sitemap] wrote ${entries.length} entries (${staticEntries.length} static, ${caseEntries.length} case studies, ${blogEntries.length} blog posts)`
  );
}

main().catch((err) => {
  console.error("[sitemap] failed:", err);
  process.exit(1);
});