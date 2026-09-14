/**
 * Short-lived signed tokens for private client review sessions.
 * HMAC-SHA256 over a compact payload; no database state required.
 */

const encoder = new TextEncoder();

const b64url = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const fromB64url = (s: string) => {
  const pad = s.replace(/-/g, "+").replace(/_/g, "/");
  const padded = pad + "=".repeat((4 - (pad.length % 4)) % 4);
  return Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
};

async function key(): Promise<CryptoKey> {
  const secret = Deno.env.get("CLIENT_REVIEW_TOKEN_SECRET");
  if (!secret) throw new Error("missing_token_secret");
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

/** Issues a token valid for the given slug. Default lifetime: 8 hours. */
export async function issueReviewToken(slug: string, ttlSeconds = 8 * 60 * 60): Promise<string> {
  const payload = b64url(
    encoder.encode(JSON.stringify({ s: slug, e: Math.floor(Date.now() / 1000) + ttlSeconds })),
  );
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", await key(), encoder.encode(payload)));
  return `${payload}.${b64url(sig)}`;
}

/** Returns the slug the token authorizes, or null when invalid/expired. */
export async function verifyReviewToken(token: unknown): Promise<string | null> {
  if (typeof token !== "string" || token.length > 1024) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  try {
    const ok = await crypto.subtle.verify(
      "HMAC",
      await key(),
      fromB64url(sig),
      encoder.encode(payload),
    );
    if (!ok) return null;
    const data = JSON.parse(new TextDecoder().decode(fromB64url(payload)));
    if (typeof data?.s !== "string" || typeof data?.e !== "number") return null;
    if (data.e < Math.floor(Date.now() / 1000)) return null;
    return data.s;
  } catch {
    return null;
  }
}
