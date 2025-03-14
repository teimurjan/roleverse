import { useInfiniteQuery } from "@tanstack/react-query";

import { QueryKey } from "@/constants/query-key";
import { UserPostsQueryVariables } from "@/data/generated/get-sdk";
import { useDataSdk } from "@/providers/data-sdk";

const DEFAULT_LIMIT = 15;

type UseUserPostsArgs = Omit<UserPostsQueryVariables, "limit" | "offset">;

const useUserPosts = ({ userId }: UseUserPostsArgs) => {
  const { sdk } = useDataSdk();
  return useInfiniteQuery({
    queryKey: [QueryKey.UserPosts, userId] as const,
    queryFn: ({ pageParam }) => {
      return sdk.UserPosts({
        limit: DEFAULT_LIMIT,
        offset: pageParam,
        userId,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.userPosts || lastPage.userPosts.length < DEFAULT_LIMIT) {
        return undefined;
      }

      return allPages.length * DEFAULT_LIMIT;
    }, 
  });
};

export default useUserPosts;
