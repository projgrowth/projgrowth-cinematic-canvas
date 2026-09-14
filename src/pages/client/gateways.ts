/**
 * Client-facing copy for private review gateways. Nothing sensitive lives
 * here — the access code and destination URL are server-side only.
 */
export interface GatewayPage {
  label: string;
  path: string;
}

export interface GatewayCopy {
  slug: string;
  client: string;
  project: string;
  /** Shown once access is granted but the review isn't published yet. */
  holdingTitle: string;
  holdingBody: string;
  /** Pages of the client site offered in the review room. */
  pages: GatewayPage[];
}

export const golinowskiGateway: GatewayCopy = {
  slug: "golinowskilawrebuild",
  client: "Golinowski Law",
  project: "Website Rebuild",
  holdingTitle: "Website Rebuild",
  holdingBody: "Loading your review…",
  pages: [
    { label: "Home", path: "/" },
    { label: "Practice Areas", path: "/practice" },
    { label: "Answers", path: "/answers" },
    { label: "About", path: "/about" },
    { label: "Referrals", path: "/referrals" },
    { label: "Contact", path: "/contact" },
  ],
};
