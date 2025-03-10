"use client";

import PostList from "@/components/dumb/post-list";
import usePosts from "@/data/hooks/use-posts";

interface UserProfilePostListProps {
  userId: string;
}

const UserProfilePostList = ({ userId }: UserProfilePostListProps) => {
  const {
    data: posts,
    isPending: isLoadingPosts,
    hasNextPage,
    fetchNextPage,
  } = usePosts({ userId });

  return (
    <PostList
      loading={isLoadingPosts}
      posts={posts?.pages.flatMap((page) => page.posts) ?? []}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      emptyText="No posts to show."
    />
  );
};

export default UserProfilePostList;
