export type SignInState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "rejected"; message: string };

export type SignInEvent =
  | { type: "submit" }
  | { type: "rejected"; message: string };

export const initialSignIn: SignInState = { status: "idle" };

export function signInTransition(state: SignInState, event: SignInEvent): SignInState {
  switch (state.status) {
    case "idle":
    case "rejected":
      switch (event.type) {
        case "submit":
          return { status: "submitting" };
        case "rejected":
          return state;
        default: {
          const unreachable: never = event;
          return unreachable;
        }
      }
    case "submitting":
      switch (event.type) {
        case "rejected":
          return { status: "rejected", message: event.message };
        case "submit":
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

export type MutationState =
  | { status: "idle" }
  | { status: "saving" }
  | { status: "failed"; message: string };

export type MutationEvent =
  | { type: "start" }
  | { type: "succeeded" }
  | { type: "failed"; message: string };

export const initialMutation: MutationState = { status: "idle" };

export function mutationTransition(state: MutationState, event: MutationEvent): MutationState {
  switch (state.status) {
    case "idle":
    case "failed":
      switch (event.type) {
        case "start":
          return { status: "saving" };
        case "succeeded":
          return { status: "idle" };
        case "failed":
          return { status: "failed", message: event.message };
        default: {
          const unreachable: never = event;
          return unreachable;
        }
      }
    case "saving":
      switch (event.type) {
        case "succeeded":
          return { status: "idle" };
        case "failed":
          return { status: "failed", message: event.message };
        case "start":
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
