import { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import CommentCard from "@/components/widgets/comment-card";
import { Comment_Fragment } from "@/data/generated/get-sdk";
import { cn } from "@/lib/utils";

import CommentSkeleton from "../comment-skeleton";

interface CommentListProps {
  className?: string;
  loading: boolean;
  comments: Comment_Fragment[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  emptyText: ReactNode;
}

const CommentList = ({
  className,
  loading,
  comments,
  hasNextPage,
  fetchNextPage,
  emptyText,
}: CommentListProps) => {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {loading ? (
        <>
          <CommentSkeleton />
          <CommentSkeleton />
          <CommentSkeleton />
        </>
      ) : comments.length ? (
        <>
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}

          {hasNextPage && (
            <Button
              variant="ghost"
              onClick={() => {
                fetchNextPage();
              }}
            >
              Load more
            </Button>
          )}
        </>
      ) : (
        <p>{emptyText}</p>
      )}
    </div>
  );
};

export default CommentList;
