"use client";

import { Info } from "lucide-react";
import { Address } from "viem";
import { useAccount } from "wagmi";

import PostList from "@/components/dumb/post-list";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useUser from "@/data/hooks/use-user";
import useUserPosts from "@/data/hooks/use-user-posts";
import useTokenBalance from "@/onchain/hooks/use-token-balance";

interface UserProfilePostListProps {
  userId: string;
}

const UserProfilePostList = ({ userId }: UserProfilePostListProps) => {
  const {
    data: posts,
    isPending: isLoadingPosts,
    hasNextPage,
    fetchNextPage,
  } = useUserPosts({ userId });
  const { address } = useAccount();
  const { data: user } = useUser({ id: userId });
  const { data: balance, isPending: isLoadingBalance } = useTokenBalance({
    ownerAddress: address,
    subjectAddress: user?.user.walletAddress as Address | undefined,
  });

  if (!isLoadingBalance && balance === BigInt(0)) {
    return (
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>You are not following {user?.user.username}</AlertTitle>
        <AlertDescription>
          Buy a token to access {user?.user.username}&apos;s feed.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <PostList
      loading={isLoadingPosts || isLoadingBalance}
      posts={posts?.pages.flatMap((page) => page.userPosts) ?? []}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      emptyText="No posts to show."
    />
  );
};

export default UserProfilePostList;
