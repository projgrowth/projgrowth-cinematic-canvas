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
