import { cn } from "@/lib/utils";

type Variant = "hero" | "page" | "center";

const variants: Record<Variant, string> = {
  hero: "radial-gradient(ellipse at 15% 40%, hsl(var(--accent) / 0.05), transparent 55%), radial-gradient(ellipse at 80% 70%, hsl(var(--accent) / 0.025), transparent 50%)",
  page: "radial-gradient(ellipse at 30% 50%, hsl(var(--accent) / 0.04), transparent 60%)",
  center: "radial-gradient(ellipse at 50% 30%, hsl(var(--accent) / 0.05), transparent 60%)",
};

export const AmbientGlow = ({ variant = "hero", className }: { variant?: Variant; className?: string }) => (
  <div
    aria-hidden="true"
    className={cn("absolute inset-0 pointer-events-none", className)}
    style={{ background: variants[variant] }}
  />
);

export default AmbientGlow;