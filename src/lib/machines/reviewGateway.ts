export type ReviewSession = { url: string; token: string };

export type ReviewAccessNotice = "invalid" | "throttled" | "unavailable" | "expired";

export const REVIEW_NOTICES: Record<ReviewAccessNotice, string> = {
  invalid: "Access code not recognized.",
  throttled: "Too many attempts. Please try again shortly.",
  unavailable: "Access is temporarily unavailable. Please try again shortly.",
  expired: "Your review session timed out. Enter your code to pick up where you left off.",
};

export type ReviewGatewayState =
  | { status: "prompt"; notice: ReviewAccessNotice | null }
  | { status: "checking" }
  | { status: "pending" }
  | { status: "granted"; review: ReviewSession };

export type ReviewGatewayEvent =
  | { type: "submit" }
  | { type: "rejected"; notice: Exclude<ReviewAccessNotice, "expired"> }
  | { type: "ready"; review: ReviewSession }
  | { type: "pending" }
  | { type: "unavailable" }
  | { type: "expired" };

export function initialReviewGateway(restored: ReviewSession | null): ReviewGatewayState {
  if (restored) return { status: "granted", review: restored };
  return { status: "prompt", notice: null };
}

export function reviewGatewayTransition(state: ReviewGatewayState, event: ReviewGatewayEvent): ReviewGatewayState {
  switch (state.status) {
    case "prompt":
      return promptTransition(state, event);
    case "checking":
      return checkingTransition(event);
    case "pending":
      return pendingTransition(event);
    case "granted":
      return grantedTransition(state, event);
    default: {
      const unreachable: never = state;
      return unreachable;
    }
  }
}

function promptTransition(
  state: Extract<ReviewGatewayState, { status: "prompt" }>,
  event: ReviewGatewayEvent,
): ReviewGatewayState {
  switch (event.type) {
    case "submit":
      return { status: "checking" };
    case "expired":
      return { status: "prompt", notice: "expired" };
    case "rejected":
    case "ready":
    case "pending":
    case "unavailable":
      return state;
    default: {
      const unreachable: never = event;
      return unreachable;
    }
  }
}

function checkingTransition(event: ReviewGatewayEvent): ReviewGatewayState {
  switch (event.type) {
    case "rejected":
      return { status: "prompt", notice: event.notice };
    case "ready":
      return { status: "granted", review: event.review };
    case "pending":
      return { status: "pending" };
    case "unavailable":
      return { status: "prompt", notice: "unavailable" };
    case "expired":
      return { status: "prompt", notice: "expired" };
    case "submit":
      return { status: "checking" };
    default: {
      const unreachable: never = event;
      return unreachable;
    }
  }
}

function pendingTransition(event: ReviewGatewayEvent): ReviewGatewayState {
  switch (event.type) {
    case "expired":
      return { status: "prompt", notice: "expired" };
    case "submit":
    case "rejected":
    case "ready":
    case "pending":
    case "unavailable":
      return { status: "pending" };
    default: {
      const unreachable: never = event;
      return unreachable;
    }
  }
}

function grantedTransition(
  state: Extract<ReviewGatewayState, { status: "granted" }>,
  event: ReviewGatewayEvent,
): ReviewGatewayState {
  switch (event.type) {
    case "expired":
      return { status: "prompt", notice: "expired" };
    case "submit":
    case "rejected":
    case "ready":
    case "pending":
    case "unavailable":
      return state;
    default: {
      const unreachable: never = event;
      return unreachable;
    }
  }
}
