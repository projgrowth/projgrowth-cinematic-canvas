/** Header presentation. Hidden always keeps the docked rail, matching the scrolled-and-concealed nav. */
export type NavChrome = "top" | "docked" | "hidden";

export function nextNavChrome(lastScrollY: number, scrollY: number): NavChrome {
  if (scrollY > 100 && scrollY > lastScrollY) return "hidden";
  if (scrollY > 20) return "docked";
  return "top";
}
