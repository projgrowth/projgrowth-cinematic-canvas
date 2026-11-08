export type ComposerPhase = "editing" | "sending" | "failed";

export type ComposerEvent = { type: "submit" } | { type: "succeeded" } | { type: "failed" };

export const initialComposerPhase: ComposerPhase = "editing";

export function composerTransition(phase: ComposerPhase, event: ComposerEvent): ComposerPhase {
  switch (phase) {
    case "editing":
      switch (event.type) {
        case "submit":
          return "sending";
        case "succeeded":
        case "failed":
          return phase;
        default: {
          const unreachable: never = event;
          return unreachable;
        }
      }
    case "sending":
      switch (event.type) {
        case "succeeded":
          return "editing";
        case "failed":
          return "failed";
        case "submit":
          return phase;
        default: {
          const unreachable: never = event;
          return unreachable;
        }
      }
    case "failed":
      switch (event.type) {
        case "submit":
          return "sending";
        case "succeeded":
          return "editing";
        case "failed":
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
