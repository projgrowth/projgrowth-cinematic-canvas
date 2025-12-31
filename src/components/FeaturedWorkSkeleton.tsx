import { Skeleton } from "@/components/ui/skeleton";

const FeaturedWorkSkeleton = () => {
  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-accent/5 to-accent/3 border border-line rounded-lg p-6 md:p-8 lg:p-12">
        {/* Icon skeleton */}
        <div className="mb-6">
          <Skeleton className="w-8 h-8 md:w-10 md:h-10 rounded-md" />
        </div>

        {/* Content skeleton */}
        <div className="mb-8 md:mb-10">
          <Skeleton className="h-4 w-24 mb-3" />
          <Skeleton className="h-8 md:h-10 w-3/4 mb-3 md:mb-4" />
          <Skeleton className="h-5 w-full max-w-xl mb-2" />
          <Skeleton className="h-5 w-2/3 max-w-md" />
        </div>

        {/* Controls skeleton */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex gap-2">
            <Skeleton className="h-11 w-11 rounded-md" />
            <Skeleton className="h-11 w-11 rounded-md" />
          </div>
          <Skeleton className="h-11 w-full sm:w-32 rounded-md" />
        </div>

        {/* Dots skeleton */}
        <div className="flex gap-2 mt-6">
          <Skeleton className="h-1 w-8 rounded-full" />
          <Skeleton className="h-1 w-4 rounded-full" />
          <Skeleton className="h-1 w-4 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default FeaturedWorkSkeleton;
