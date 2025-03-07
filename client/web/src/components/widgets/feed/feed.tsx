"use client";

import PostList from "@/components/blocks/post-list";
import useFeed from "@/data/hooks/use-feed";

const Feed = () => {
  const { data: feed, fetchNextPage, hasNextPage, isPending } = useFeed();

  return (
    <PostList
      loading={isPending}
      posts={feed?.pages.flatMap((page) => page.feed) ?? []}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      emptyText="No posts to show."
    />
  );
};

export default Feed;
