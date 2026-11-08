export type JobState<T> =
  | { status: "idle" }
  | { status: "running" }
  | { status: "settled"; result: T };

export type JobEvent<T> =
  | { type: "start" }
  | { type: "finish"; result: T }
  | { type: "dismiss" };

export function initialJob<T>(): JobState<T> {
  return { status: "idle" };
}

export function jobTransition<T>(state: JobState<T>, event: JobEvent<T>): JobState<T> {
  switch (state.status) {
    case "idle":
      switch (event.type) {
        case "start":
          return { status: "running" };
        case "finish":
        case "dismiss":
          return state;
        default: {
          const unreachable: never = event;
          return unreachable;
        }
      }
    case "running":
      switch (event.type) {
        case "finish":
          return { status: "settled", result: event.result };
        case "start":
        case "dismiss":
          return state;
        default: {
          const unreachable: never = event;
          return unreachable;
        }
      }
    case "settled":
      switch (event.type) {
        case "start":
          return { status: "running" };
        case "dismiss":
          return { status: "idle" };
        case "finish":
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
