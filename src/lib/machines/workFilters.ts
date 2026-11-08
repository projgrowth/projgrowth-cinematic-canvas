export type WorkFilters = {
  category: string;
  query: string;
};

export function readWorkFilters(params: URLSearchParams, allowed: readonly string[]): WorkFilters {
  const rawCategory = params.get("category") ?? "All";
  const category = rawCategory === "All" || allowed.includes(rawCategory) ? rawCategory : "All";
  return { category, query: params.get("q") ?? "" };
}

export function writeWorkFilters(filters: WorkFilters): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.category !== "All") params.set("category", filters.category);
  if (filters.query) params.set("q", filters.query);
  return params;
}

/** A category chip that disappeared from the catalog falls back to All. */
export function activeCategory(selected: string, available: readonly string[]): string {
  if (selected === "All" || available.includes(selected)) return selected;
  return "All";
}
