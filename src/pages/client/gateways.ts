/**
 * Client-facing copy for private review gateways. Nothing sensitive lives
 * here — the access code and destination URL are server-side only.
 */
export interface GatewayCopy {
  slug: string;
  client: string;
  project: string;
  /** Shown once access is granted but the review isn't published yet. */
  holdingTitle: string;
  holdingBody: string;
}

export const golinowskiGateway: GatewayCopy = {
  slug: "golinowskilawrebuild",
  client: "Golinowski Law",
  project: "Website Rebuild",
  holdingTitle: "Website Rebuild",
  holdingBody:
    "Large preview loading — this can take a few minutes. Keep this link; refreshing is safe.",
};
