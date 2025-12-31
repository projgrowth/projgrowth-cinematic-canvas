import { Skeleton } from "@/components/ui/skeleton";

interface CaseStudyCardSkeletonProps {
  count?: number;
}

const CaseStudyCardSkeleton = ({ count = 6 }: CaseStudyCardSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          {/* Image area skeleton */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-surface mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-muted/20 via-transparent to-muted/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Skeleton className="w-16 h-16 rounded-lg" />
            </div>
          </div>
          
          {/* Category skeleton */}
          <Skeleton className="h-3 w-20 mb-2" />
          
          {/* Title skeleton */}
          <Skeleton className="h-7 w-3/4 mb-2" />
          
          {/* Subtitle skeleton */}
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ))}
    </>
  );
};

export default CaseStudyCardSkeleton;
