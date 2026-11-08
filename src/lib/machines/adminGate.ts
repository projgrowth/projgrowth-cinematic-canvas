export const ADMIN_GATE_ERRORS = {
  invalid: "Invalid email or password",
  leads: "Failed to fetch leads",
  unexpected: "Something went wrong",
} as const;

export type AdminGateError = (typeof ADMIN_GATE_ERRORS)[keyof typeof ADMIN_GATE_ERRORS];

export type AdminGateState =
  | { status: "idle" }
  | { status: "verifying" }
  | { status: "loadingLeads" }
  | { status: "rejected"; message: AdminGateError };

export type AdminGateEvent =
  | { type: "submit" }
  | { type: "verified" }
  | { type: "rejected"; message: AdminGateError };

export const initialAdminGate: AdminGateState = { status: "idle" };

export function adminGateBusy(state: AdminGateState): boolean {
  switch (state.status) {
    case "idle":
    case "rejected":
      return false;
    case "verifying":
    case "loadingLeads":
      return true;
    default: {
      const unreachable: never = state;
      return unreachable;
    }
  }
}

export function adminGateTransition(state: AdminGateState, event: AdminGateEvent): AdminGateState {
  switch (state.status) {
    case "idle":
    case "rejected":
      switch (event.type) {
        case "submit":
          return { status: "verifying" };
        case "verified":
        case "rejected":
          return state;
        default: {
          const unreachable: never = event;
          return unreachable;
        }
      }
    case "verifying":
      switch (event.type) {
        case "verified":
          return { status: "loadingLeads" };
        case "rejected":
          return { status: "rejected", message: event.message };
        case "submit":
          return state;
        default: {
          const unreachable: never = event;
          return unreachable;
        }
      }
    case "loadingLeads":
      switch (event.type) {
        case "rejected":
          return { status: "rejected", message: event.message };
        case "submit":
        case "verified":
          return state;
        default: {
          const unreachable: never = event;
          return unreachable;
        }
      }
    default: {
      const unreachable: never = state;
      return unreachable;
    }
  }
}
