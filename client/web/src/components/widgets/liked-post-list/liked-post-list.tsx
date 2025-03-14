"use client";

import PostList from "@/components/dumb/post-list";
import useLikedPosts from "@/data/hooks/use-liked-posts";

const LikedPostList = () => {
  const { data: feed, fetchNextPage, hasNextPage, isPending } = useLikedPosts();

  return (
    <PostList
      loading={isPending}
      posts={feed?.pages.flatMap((page) => page.likedPosts) ?? []}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      emptyText="No posts to show."
    />
  );
};

export default LikedPostList;
