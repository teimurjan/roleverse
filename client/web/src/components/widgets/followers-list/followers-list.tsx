"use client";

import { useAccount } from "wagmi";

import UserList from "@/components/blocks/user-list";
import useFollowers from "@/data/hooks/use-followers";

interface FollowersListProps {
  className?: string;
}

const FollowersList = ({ className }: FollowersListProps) => {
  const { address } = useAccount();
  const {
    data: followers,
    isPending,
    fetchNextPage,
    hasNextPage,
  } = useFollowers({
    walletAddress: address,
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
    />
  );
};

export default FollowersList;
