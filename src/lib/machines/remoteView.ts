export type ListView = "loading" | "error" | "empty" | "ready";

export function listView(input: { isLoading: boolean; isError: boolean; count: number }): ListView {
  if (input.isLoading) return "loading";
  if (input.isError) return "error";
  if (input.count === 0) return "empty";
  return "ready";
}

export type RecordView = "loading" | "error" | "missing" | "ready";

export function recordView(input: { isLoading: boolean; isError: boolean; hasRecord: boolean }): RecordView {
  if (input.isLoading) return "loading";
  if (input.isError) return "error";
  if (!input.hasRecord) return "missing";
  return "ready";
}

/** Thrown when a slug has no published row. This is absence, not a failed request. */
export const POST_NOT_FOUND = "Post not found";

export function isPostNotFound(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    (error as { message: unknown }).message === POST_NOT_FOUND
  );
}

export function articleView(input: { isLoading: boolean; error: unknown; hasRecord: boolean }): RecordView {
  return recordView({
    isLoading: input.isLoading,
    isError: Boolean(input.error) && !isPostNotFound(input.error),
    hasRecord: input.hasRecord,
  });
}
