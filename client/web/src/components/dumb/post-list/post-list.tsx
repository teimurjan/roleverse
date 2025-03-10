import { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import PostCard from "@/components/widgets/post-card";
import { Post_Fragment } from "@/data/generated/get-sdk";
import { cn } from "@/lib/utils";

import PostSkeleton from "../post-skeleton";

interface PostListProps {
  className?: string;
  loading: boolean;
  posts: Post_Fragment[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  emptyText: ReactNode;
}

const PostList = ({
  className,
  loading,
  posts,
  hasNextPage,
  fetchNextPage,
  emptyText,
}: PostListProps) => {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {loading ? (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      ) : posts.length ? (
        <>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
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

export default PostList;
