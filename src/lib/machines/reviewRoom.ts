export type PinPoint = { x: number; y: number };

export type NotesLoadState = { status: "loading" } | { status: "ready" } | { status: "failed" };

export type NotesLoadEvent = { type: "loaded" } | { type: "failed" } | { type: "retry" };

export const initialNotesLoad: NotesLoadState = { status: "loading" };

export function notesLoadTransition(state: NotesLoadState, event: NotesLoadEvent): NotesLoadState {
  switch (state.status) {
    case "loading":
      switch (event.type) {
        case "loaded":
          return { status: "ready" };
        case "failed":
          return { status: "failed" };
        case "retry":
          return state;
        default: {
          const unreachable: never = event;
          return unreachable;
        }
      }
    case "ready":
      switch (event.type) {
        case "failed":
          return { status: "failed" };
        case "retry":
          return { status: "loading" };
        case "loaded":
          return state;
        default: {
          const unreachable: never = event;
          return unreachable;
        }
      }
    case "failed":
      switch (event.type) {
        case "retry":
          return { status: "loading" };
        case "loaded":
          return { status: "ready" };
        case "failed":
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

/** Comment mode and the placed pin. A pin cannot exist outside comment mode. */
export type AnnotationState =
  | { mode: "browse" }
  | { mode: "armed" }
  | { mode: "composing"; pin: PinPoint };

export type AnnotationEvent =
  | { type: "toggleCommentMode" }
  | { type: "place"; pin: PinPoint }
  | { type: "cancelDraft" }
  | { type: "contextChanged" }
  | { type: "noteSent" };

export const initialAnnotation: AnnotationState = { mode: "browse" };

export function annotationTransition(state: AnnotationState, event: AnnotationEvent): AnnotationState {
  switch (state.mode) {
    case "browse":
      return browseTransition(event);
    case "armed":
      return armedTransition(event);
    case "composing":
      return composingTransition(event);
    default: {
      const unreachable: never = state;
      return unreachable;
    }
  }
}

function browseTransition(event: AnnotationEvent): AnnotationState {
  switch (event.type) {
    case "toggleCommentMode":
      return { mode: "armed" };
    case "place":
    case "cancelDraft":
    case "contextChanged":
    case "noteSent":
      return { mode: "browse" };
    default: {
      const unreachable: never = event;
      return unreachable;
    }
  }
}

function armedTransition(event: AnnotationEvent): AnnotationState {
  switch (event.type) {
    case "toggleCommentMode":
    case "noteSent":
      return { mode: "browse" };
    case "place":
      return { mode: "composing", pin: event.pin };
    case "cancelDraft":
    case "contextChanged":
      return { mode: "armed" };
    default: {
      const unreachable: never = event;
      return unreachable;
    }
  }
}

function composingTransition(event: AnnotationEvent): AnnotationState {
  switch (event.type) {
    case "toggleCommentMode":
    case "noteSent":
      return { mode: "browse" };
    case "place":
      return { mode: "composing", pin: event.pin };
    case "cancelDraft":
    case "contextChanged":
      return { mode: "armed" };
    default: {
      const unreachable: never = event;
      return unreachable;
    }
  }
}

export const NOTE_SEND_FAILURE = "That note didn't send. Your words are safe below — try again in a moment.";

export type NoteSendState = { status: "idle" } | { status: "failed"; message: string };

export type NoteSendEvent = { type: "clear" } | { type: "fail"; message: string };

export const initialNoteSend: NoteSendState = { status: "idle" };

export function noteSendTransition(state: NoteSendState, event: NoteSendEvent): NoteSendState {
  switch (event.type) {
    case "clear":
      return { status: "idle" };
    case "fail":
      return { status: "failed", message: event.message };
    default: {
      const unreachable: never = event;
      return unreachable;
    }
  }
}

export function annotationCommentMode(state: AnnotationState): boolean {
  switch (state.mode) {
    case "browse":
      return false;
    case "armed":
    case "composing":
      return true;
    default: {
      const unreachable: never = state;
      return unreachable;
    }
  }
}

export function annotationDraft(state: AnnotationState): PinPoint | null {
  switch (state.mode) {
    case "browse":
    case "armed":
      return null;
    case "composing":
      return state.pin;
    default: {
      const unreachable: never = state;
      return unreachable;
    }
  }
}
