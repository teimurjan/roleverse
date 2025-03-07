import { useInfiniteQuery } from "@tanstack/react-query";

import { QueryKey } from "@/constants/query-key";
import { FollowersQueryVariables } from "@/data/generated/get-sdk";
import { useDataSdk } from "@/providers/data-sdk";

export type UseFollowersArgs = Omit<
  FollowersQueryVariables,
  "limit" | "offset"
>;

const DEFAULT_LIMIT = 15;

const useFollowers = ({ walletAddress }: UseFollowersArgs) => {
  const { sdk } = useDataSdk();
  return useInfiniteQuery({
    queryKey: [QueryKey.Followers, walletAddress] as const,
    queryFn: ({ queryKey, pageParam }) => {
      return sdk.Followers({
        walletAddress: queryKey[1],
        limit: DEFAULT_LIMIT,
        offset: pageParam,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.followers || lastPage.followers.length < DEFAULT_LIMIT) {
        return undefined;
      }

      return allPages.length * DEFAULT_LIMIT;
    },
  });
};

export default useFollowers;
