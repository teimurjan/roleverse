import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface PostSkeletonProps {
  className?: string;
}

const PostSkeleton = ({ className }: PostSkeletonProps) => {
  return (
    <div className={cn(className, "p-6")}>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>

      <Skeleton className="h-24 w-full mt-4" />
    </div>
  );
};

export default PostSkeleton;
