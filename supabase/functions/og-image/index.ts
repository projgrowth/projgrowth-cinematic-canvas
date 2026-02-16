const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE_NAME = "ProjGrowth";
const ACCENT_RGB = "102, 170, 204";
const BG_DARK = "#0a0a0f";
const BG_SURFACE = "#12121a";
const TEXT_WHITE = "#f0f0f5";
const TEXT_MUTED = "#8a8a9a";
const W = 1200;
const H = 630;

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function truncate(s: string, max: number): string {
  return s.length <= max ? s : s.slice(0, max - 1).trimEnd() + "\u2026";
}

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > maxChars && cur) {
      lines.push(cur.trim());
      cur = w;
    } else {
      cur = cur ? cur + " " + w : w;
    }
  }
  if (cur) lines.push(cur.trim());
  return lines;
}

function buildSvg(
  title: string,
  description?: string,
  type?: string,
  author?: string,
  date?: string,
  price?: string,
  imageUrl?: string
): string {
  const badge = type === "article" ? "Article" : type === "product" ? "Product" : null;
  const titleLines = wrapText(truncate(title, 90), 28);
  const fontSize = titleLines.length > 2 ? 42 : 52;
  const titleY = description ? 220 : 260;

  let titleSvg = "";
  for (let i = 0; i < titleLines.length; i++) {
    titleSvg += `<text x="80" y="${titleY + i * (fontSize + 10)}" font-family="system-ui, -apple-system, sans-serif" font-size="${fontSize}" font-weight="700" fill="${TEXT_WHITE}">${esc(titleLines[i])}</text>`;
  }

  let descSvg = "";
  if (description) {
    const dLines = wrapText(truncate(description, 120), 50);
    const dY = titleY + titleLines.length * (fontSize + 10) + 20;
    for (let i = 0; i < dLines.length; i++) {
      descSvg += `<text x="80" y="${dY + i * 28}" font-family="system-ui, -apple-system, sans-serif" font-size="20" fill="${TEXT_MUTED}">${esc(dLines[i])}</text>`;
    }
  }

  let badgeSvg = "";
  if (badge) {
    const bw = badge.length * 10 + 30;
    badgeSvg = `<rect x="80" y="130" width="${bw}" height="30" rx="15" fill="rgba(${ACCENT_RGB},0.15)" stroke="rgba(${ACCENT_RGB},0.3)" stroke-width="1"/><text x="${80 + bw / 2}" y="150" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="rgb(${ACCENT_RGB})" text-anchor="middle">${badge}</text>`;
  }

  const metaParts: string[] = [];
  if (author) metaParts.push(esc(author));
  if (date) metaParts.push(esc(date));
  if (price) metaParts.push(esc(price));
  const metaSvg = metaParts.length > 0
    ? `<text x="${W - 80}" y="${H - 30}" font-family="system-ui, sans-serif" font-size="15" fill="${TEXT_MUTED}" text-anchor="end">${metaParts.join("  \u00B7  ")}</text>`
    : "";

  let imgOverlay = "";
  if (imageUrl) {
    imgOverlay = `<image href="${esc(imageUrl)}" x="${W / 2}" y="0" width="${W / 2}" height="${H}" preserveAspectRatio="xMidYMid slice" opacity="0.25"/><rect x="${W / 2}" y="0" width="${W / 2}" height="${H}" fill="rgba(10,10,15,0.55)"/>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${BG_DARK}"/><stop offset="100%" style="stop-color:${BG_SURFACE}"/></linearGradient>
  <linearGradient id="a" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:rgba(${ACCENT_RGB},0.6)"/><stop offset="100%" style="stop-color:rgba(${ACCENT_RGB},0.1)"/></linearGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#g)"/>
<circle cx="${W - 200}" cy="120" r="300" fill="rgba(${ACCENT_RGB},0.03)"/>
<circle cx="100" cy="${H - 100}" r="200" fill="rgba(${ACCENT_RGB},0.02)"/>
<rect x="0" y="0" width="${W}" height="4" fill="url(#a)"/>
${imgOverlay}
<rect x="80" y="50" width="44" height="44" rx="8" fill="rgba(${ACCENT_RGB},0.15)" stroke="rgba(${ACCENT_RGB},0.3)" stroke-width="1"/>
<text x="102" y="80" font-family="system-ui, sans-serif" font-size="20" font-weight="700" fill="rgb(${ACCENT_RGB})" text-anchor="middle">PG</text>
<text x="136" y="80" font-family="system-ui, sans-serif" font-size="22" font-weight="500" fill="${TEXT_WHITE}">${SITE_NAME}</text>
${badgeSvg}
${titleSvg}
${descSvg}
<rect x="0" y="${H - 70}" width="${W}" height="70" fill="rgba(0,0,0,0.4)"/>
<text x="80" y="${H - 30}" font-family="system-ui, sans-serif" font-size="16" fill="${TEXT_MUTED}">projgrowth.com</text>
${metaSvg}
</svg>`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const title = url.searchParams.get("title") || SITE_NAME;
    const description = url.searchParams.get("description") || undefined;
    const type = url.searchParams.get("type") || "default";
    const imageUrl = url.searchParams.get("image") || undefined;
    const author = url.searchParams.get("author") || undefined;
    const date = url.searchParams.get("date") || undefined;
    const price = url.searchParams.get("price") || undefined;

    let validImage = imageUrl;
    if (imageUrl) {
      try { new URL(imageUrl); } catch { validImage = undefined; }
    }

    const svg = buildSvg(title, description, type, author, date, price, validImage);

    return new Response(svg, {
      headers: {
        ...corsHeaders,
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, s-maxage=86400, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    console.error("OG error:", err);
    const fallback = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="${BG_DARK}"/><text x="${W / 2}" y="${H / 2}" font-family="system-ui" font-size="48" font-weight="700" fill="${TEXT_WHITE}" text-anchor="middle">${SITE_NAME}</text></svg>`;
    return new Response(fallback, {
      headers: { ...corsHeaders, "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=3600" },
    });
  }
});
