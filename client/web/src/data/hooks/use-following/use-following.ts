import { useInfiniteQuery } from "@tanstack/react-query";

import { QueryKey } from "@/constants/query-key";
import { FollowingQueryVariables } from "@/data/generated/get-sdk";
import { useDataSdk } from "@/providers/data-sdk";

export type UseFollowingArgs = Omit<
  FollowingQueryVariables,
  "limit" | "offset"
>;

const DEFAULT_LIMIT = 15;

const useFollowing = ({ userId }: UseFollowingArgs) => {
  const { sdk } = useDataSdk();
  return useInfiniteQuery({
    queryKey: [QueryKey.Following, userId] as const,
    queryFn: ({ queryKey, pageParam }) => {
      return sdk.Following({
        userId: queryKey[1],
        limit: DEFAULT_LIMIT,
        offset: pageParam,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.following || lastPage.following.length < DEFAULT_LIMIT) {
        return undefined;
      }

      return allPages.length * DEFAULT_LIMIT;
    },
  });
};

export default useFollowing;
