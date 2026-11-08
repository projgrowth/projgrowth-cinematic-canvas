export const CONTACT_STEPS = ["service", "details", "timeline", "budget", "contact"] as const;

export type ContactStepId = (typeof CONTACT_STEPS)[number];

export type ContactFieldErrors = {
  name: string;
  email: string;
};

export const EMPTY_CONTACT_ERRORS: ContactFieldErrors = { name: "", email: "" };

export type ContactFlowState =
  | { status: "editing"; step: ContactStepId; errors: ContactFieldErrors }
  | { status: "submitting" }
  | { status: "succeeded"; confetti: boolean };

export type ContactFlowEvent =
  | { type: "continue"; allowed: boolean }
  | { type: "back" }
  | { type: "submit" }
  | { type: "invalid"; errors: ContactFieldErrors }
  | { type: "succeeded" }
  | { type: "failed" }
  | { type: "confettiFinished" };

export const initialContactFlow: ContactFlowState = {
  status: "editing",
  step: "service",
  errors: EMPTY_CONTACT_ERRORS,
};

export function contactStepNumber(step: ContactStepId): number {
  return CONTACT_STEPS.indexOf(step) + 1;
}

export function contactFlowTransition(state: ContactFlowState, event: ContactFlowEvent): ContactFlowState {
  switch (state.status) {
    case "editing":
      return editingTransition(state, event);
    case "submitting":
      return submittingTransition(event);
    case "succeeded":
      return succeededTransition(state, event);
    default: {
      const unreachable: never = state;
      return unreachable;
    }
  }
}

function editingTransition(
  state: Extract<ContactFlowState, { status: "editing" }>,
  event: ContactFlowEvent,
): ContactFlowState {
  switch (event.type) {
    case "continue": {
      if (!event.allowed) return state;
      const index = CONTACT_STEPS.indexOf(state.step);
      const next = CONTACT_STEPS[index + 1];
      if (!next) return state;
      return { status: "editing", step: next, errors: EMPTY_CONTACT_ERRORS };
    }
    case "back": {
      const index = CONTACT_STEPS.indexOf(state.step);
      const previous = CONTACT_STEPS[index - 1];
      if (!previous) return state;
      return { status: "editing", step: previous, errors: EMPTY_CONTACT_ERRORS };
    }
    case "submit":
      if (state.step !== "contact") return state;
      return { status: "submitting" };
    case "invalid":
      if (state.step !== "contact") return state;
      return { status: "editing", step: "contact", errors: event.errors };
    case "succeeded":
    case "failed":
    case "confettiFinished":
      return state;
    default: {
      const unreachable: never = event;
      return unreachable;
    }
  }
}

function submittingTransition(event: ContactFlowEvent): ContactFlowState {
  switch (event.type) {
    case "succeeded":
      return { status: "succeeded", confetti: true };
    case "failed":
    case "invalid":
      return {
        status: "editing",
        step: "contact",
        errors: event.type === "invalid" ? event.errors : EMPTY_CONTACT_ERRORS,
      };
    case "continue":
    case "back":
    case "submit":
    case "confettiFinished":
      return { status: "submitting" };
    default: {
      const unreachable: never = event;
      return unreachable;
    }
  }
}

function succeededTransition(
  state: Extract<ContactFlowState, { status: "succeeded" }>,
  event: ContactFlowEvent,
): ContactFlowState {
  switch (event.type) {
    case "confettiFinished":
      return { status: "succeeded", confetti: false };
    case "continue":
    case "back":
    case "submit":
    case "invalid":
    case "succeeded":
    case "failed":
      return state;
    default: {
      const unreachable: never = event;
      return unreachable;
    }
  }
}
