export type Device = "desktop" | "mobile";

export type ReviewStatus = "new" | "in_progress" | "done";

export interface ReviewComment {
  id: string;
  page_path: string;
  page_label: string | null;
  device: Device;
  x_pct: number;
  y_pct: number;
  body: string;
  status: ReviewStatus;
  created_at: string;
}

export const STATUS_LABEL: Record<ReviewStatus, string> = {
  new: "Sent",
  in_progress: "In progress",
  done: "Done",
};
