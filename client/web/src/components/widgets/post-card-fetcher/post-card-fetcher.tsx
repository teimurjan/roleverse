"use client";

import PostSkeleton from "@/components/dumb/post-skeleton";
import usePost from "@/data/hooks/use-post";

import PostCard from "../post-card/post-card";

interface PostCardFetcherProps {
  postId: string;
  className?: string;
}

const PostCardFetcher = ({ postId, className }: PostCardFetcherProps) => {
  const { data: post, isPending } = usePost({ postId });

  if (isPending || !post) {
    return <PostSkeleton className={className} />;
  }

  return <PostCard className={className} post={post.post} />;
};

export default PostCardFetcher;
