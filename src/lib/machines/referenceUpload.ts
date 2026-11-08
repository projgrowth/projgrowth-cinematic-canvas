export type UploadState = {
  status: "idle" | "uploading";
  notice: string | null;
};

export type UploadEvent =
  | { type: "start" }
  | { type: "notice"; message: string }
  | { type: "finish" };

export const initialUpload: UploadState = { status: "idle", notice: null };

export function uploadTransition(state: UploadState, event: UploadEvent): UploadState {
  switch (event.type) {
    case "start":
      if (state.status === "uploading") return state;
      return { status: "uploading", notice: null };
    case "notice":
      return { ...state, notice: event.message };
    case "finish":
      return { status: "idle", notice: state.notice };
    default: {
      const unreachable: never = event;
      return unreachable;
    }
  }
}
