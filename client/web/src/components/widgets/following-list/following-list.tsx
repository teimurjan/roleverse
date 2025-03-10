"use client";

import UserList from "@/components/dumb/user-list";
import useFollowers from "@/data/hooks/use-following";

interface FollowingListProps {
  className?: string;
  userId: string;
}

const FollowingList = ({ className, userId }: FollowingListProps) => {
  const {
    data: following,
    isPending,
    fetchNextPage,
    hasNextPage,
  } = useFollowers({
    userId,
  });

  const allFollowing = following?.pages.flatMap((page) => page.following) ?? [];

  return (
    <UserList
      className={className}
      users={allFollowing}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      loading={isPending}
      emptyText="You are not following anyone"
      action="sell"
    />
  );
};

export default FollowingList;
