"use client";

import PostList from "@/components/dumb/post-list";
import useExplore from "@/data/hooks/use-explore";

const ExplorePostList = () => {
  const { data: feed, fetchNextPage, hasNextPage, isPending } = useExplore();

  return (
    <PostList
      loading={isPending}
      posts={feed?.pages.flatMap((page) => page.explore) ?? []}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      emptyText="No posts to show."
    />
  );
};

export default ExplorePostList;
