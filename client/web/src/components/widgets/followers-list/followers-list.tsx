"use client";

import UserList from "@/components/dumb/user-list";
import useFollowers from "@/data/hooks/use-followers";

interface FollowersListProps {
  className?: string;
  userId: string;
}

const FollowersList = ({ className, userId }: FollowersListProps) => {
  const {
    data: followers,
    isPending,
    fetchNextPage,
    hasNextPage,
  } = useFollowers({
    userId,
  });

  const allFollowers = followers?.pages.flatMap((page) => page.followers) ?? [];

  return (
    <UserList
      className={className}
      users={allFollowers}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      loading={isPending}
      emptyText="You have no followers"
      action="buy"
    />
  );
};

export default FollowersList;
