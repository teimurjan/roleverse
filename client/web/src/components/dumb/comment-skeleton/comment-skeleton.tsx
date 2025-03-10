import { Skeleton } from "@/components/ui/skeleton";

const CommentSkeleton = () => {
  return (
    <div className="p-6">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>

      <Skeleton className="h-16 w-full mt-4" />
    </div>
  );
};

export default CommentSkeleton;
