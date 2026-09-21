/**
 * Keeps a granted review session on the reviewer's own device so a refresh,
 * a back button or a closed tab does not force the access code again. The
 * stored token is short-lived and signed server-side; it expires on its own.
 */
export interface ReviewSession {
  url: string;
  token: string;
}

const keyFor = (slug: string) => `pg:review:session:${slug}`;

/** Expiry (ms) encoded in the signed token payload, or null when unreadable. */
const expiryOf = (token: string): number | null => {
  try {
    const [payload] = token.split(".");
    const pad = payload.replace(/-/g, "+").replace(/_/g, "/");
    const data = JSON.parse(atob(pad + "=".repeat((4 - (pad.length % 4)) % 4)));
    return typeof data?.e === "number" ? data.e * 1000 : null;
  } catch {
    return null;
  }
};

export const saveSession = (slug: string, session: ReviewSession) => {
  try {
    window.localStorage.setItem(keyFor(slug), JSON.stringify(session));
  } catch {
    /* storage unavailable — the reviewer simply re-enters the code */
  }
};

export const readSession = (slug: string): ReviewSession | null => {
  try {
    const raw = window.localStorage.getItem(keyFor(slug));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ReviewSession;
    if (typeof parsed?.url !== "string" || typeof parsed?.token !== "string") return null;
    const exp = expiryOf(parsed.token);
    if (exp !== null && exp < Date.now() + 60_000) {
      window.localStorage.removeItem(keyFor(slug));
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

export const clearSession = (slug: string) => {
  try {
    window.localStorage.removeItem(keyFor(slug));
  } catch {
    /* nothing to clear */
  }
};
