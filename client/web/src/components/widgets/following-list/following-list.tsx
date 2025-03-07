"use client";

import { useAccount } from "wagmi";

import UserList from "@/components/blocks/user-list";
import useFollowers from "@/data/hooks/use-following";

interface FollowingListProps {
  className?: string;
}

const FollowingList = ({ className }: FollowingListProps) => {
  const { address } = useAccount();
  const {
    data: following,
    isPending,
    fetchNextPage,
    hasNextPage,
  } = useFollowers({
    walletAddress: address,
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
    />
  );
};

export default FollowingList;
