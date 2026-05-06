import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const surfaceCardVariants = cva(
  "rounded-lg border transition-all duration-300 ease-smooth",
  {
    variants: {
      variant: {
        surface: "bg-surface border-line",
        outline: "bg-transparent border-line",
        elevated: "bg-surface border-line shadow-elegant",
      },
      pad: {
        sm: "p-5",
        md: "p-6 md:p-7",
        lg: "p-7 md:p-9",
      },
      interactive: {
        true: "hover:border-accent/30 hover:-translate-y-0.5 hover:shadow-glow-accent",
        false: "",
      },
    },
    defaultVariants: { variant: "surface", pad: "md", interactive: false },
  },
);

export interface SurfaceCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof surfaceCardVariants> {}

export const SurfaceCard = React.forwardRef<HTMLDivElement, SurfaceCardProps>(
  ({ className, variant, pad, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(surfaceCardVariants({ variant, pad, interactive }), className)}
      {...props}
    />
  ),
);
SurfaceCard.displayName = "SurfaceCard";

export default SurfaceCard;