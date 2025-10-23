import { Skeleton } from "@/components/ui/skeleton";

type SkeletonVariant = "card" | "detail" | "list";

interface LoadingSkeletonProps {
  variant?: SkeletonVariant;
  count?: number;
}

const LoadingSkeleton = ({ variant = "card", count = 1 }: LoadingSkeletonProps) => {
  if (variant === "card") {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="space-y-4 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
            <Skeleton className="aspect-video w-full rounded-sm" />
            <div className="space-y-3 px-6 pb-6">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <div className="grid grid-cols-2 gap-4 pt-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (variant === "detail") {
    return (
      <div className="space-y-8 animate-fade-in">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="aspect-video w-full rounded-sm" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "list") {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="space-y-4 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-32 w-full rounded-sm" />
          </div>
        ))}
      </>
    );
  }

  return null;
};

export default LoadingSkeleton;
