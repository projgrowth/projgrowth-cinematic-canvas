export type IntakeStep = "identity" | "help" | "vision";

export type IntakeEvent =
  | {
      type: "continue";
      identityReady: boolean;
      helpReady: boolean;
      wantsLogo: boolean;
      visionReady: boolean;
    }
  | { type: "back" };

export type IntakeResult = { type: "stay"; step: IntakeStep } | { type: "begin" };

export function intakeTransition(step: IntakeStep, event: IntakeEvent): IntakeResult {
  switch (event.type) {
    case "back":
      switch (step) {
        case "identity":
          return { type: "stay", step: "identity" };
        case "help":
          return { type: "stay", step: "identity" };
        case "vision":
          return { type: "stay", step: "help" };
        default: {
          const unreachable: never = step;
          return unreachable;
        }
      }
    case "continue":
      switch (step) {
        case "identity":
          return event.identityReady
            ? { type: "stay", step: "help" }
            : { type: "stay", step: "identity" };
        case "help":
          if (!event.helpReady) return { type: "stay", step: "help" };
          return event.wantsLogo ? { type: "stay", step: "vision" } : { type: "begin" };
        case "vision":
          return event.visionReady ? { type: "begin" } : { type: "stay", step: "vision" };
        default: {
          const unreachable: never = step;
          return unreachable;
        }
      }
    default: {
      const unreachable: never = event;
      return unreachable;
    }
  }
}

export type DiscoveryPhase =
  | { status: "landing" }
  | { status: "form" }
  | { status: "reveal"; submitError: string | null }
  | { status: "submitting" }
  | { status: "done" };

export type DiscoveryEvent =
  | { type: "start" }
  | { type: "review" }
  | { type: "refine" }
  | { type: "submit" }
  | { type: "submitSucceeded" }
  | { type: "submitFailed"; message: string };

export const initialDiscoveryPhase: DiscoveryPhase = { status: "landing" };

/** In-progress sessions are only persisted while the questionnaire is open. */
export function restoreDiscoveryPhase(value: unknown): DiscoveryPhase {
  return value === "form" ? { status: "form" } : { status: "landing" };
}

export function discoveryTransition(phase: DiscoveryPhase, event: DiscoveryEvent): DiscoveryPhase {
  switch (phase.status) {
    case "landing":
      switch (event.type) {
        case "start":
          return { status: "form" };
        case "review":
        case "refine":
        case "submit":
        case "submitSucceeded":
        case "submitFailed":
          return phase;
        default: {
          const unreachable: never = event;
          return unreachable;
        }
      }
    case "form":
      switch (event.type) {
        case "review":
          return { status: "reveal", submitError: null };
        case "start":
        case "refine":
        case "submit":
        case "submitSucceeded":
        case "submitFailed":
          return phase;
        default: {
          const unreachable: never = event;
          return unreachable;
        }
      }
    case "reveal":
      switch (event.type) {
        case "refine":
          return { status: "form" };
        case "submit":
          return { status: "submitting" };
        case "submitFailed":
          return { status: "reveal", submitError: event.message };
        case "start":
        case "review":
        case "submitSucceeded":
          return phase;
        default: {
          const unreachable: never = event;
          return unreachable;
        }
      }
    case "submitting":
      switch (event.type) {
        case "submitSucceeded":
          return { status: "done" };
        case "submitFailed":
          return { status: "reveal", submitError: event.message };
        case "start":
        case "review":
        case "refine":
        case "submit":
          return phase;
        default: {
          const unreachable: never = event;
          return unreachable;
        }
      }
    case "done":
      switch (event.type) {
        case "start":
        case "review":
        case "refine":
        case "submit":
        case "submitSucceeded":
        case "submitFailed":
          return phase;
        default: {
          const unreachable: never = event;
          return unreachable;
        }
      }
    default: {
      const unreachable: never = phase;
      return unreachable;
    }
  }
}
