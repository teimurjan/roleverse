"use client";

import PostList from "@/components/dumb/post-list";
import usePosts from "@/data/hooks/use-posts";

const LikedPostList = () => {
  const {
    data: feed,
    fetchNextPage,
    hasNextPage,
    isPending,
  } = usePosts({ liked: true });

  return (
    <PostList
      loading={isPending}
      posts={feed?.pages.flatMap((page) => page.posts) ?? []}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      emptyText="No posts to show."
    />
  );
};

export default LikedPostList;
