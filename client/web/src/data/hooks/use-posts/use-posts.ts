import { useInfiniteQuery } from "@tanstack/react-query";

import { QueryKey } from "@/constants/query-key";
import { PostsQueryVariables } from "@/data/generated/get-sdk";
import { useDataSdk } from "@/providers/data-sdk";

const DEFAULT_LIMIT = 15;

type UsePostsArgs = Omit<PostsQueryVariables, "limit" | "offset">;

const usePosts = ({ liked, userId }: UsePostsArgs) => {
  const { sdk } = useDataSdk();
  return useInfiniteQuery({
    queryKey: [QueryKey.Posts, liked, userId] as const,
    queryFn: ({ pageParam }) => {
      return sdk.Posts({
        limit: DEFAULT_LIMIT,
        offset: pageParam,
        liked,
        userId,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.posts || lastPage.posts.length < DEFAULT_LIMIT) {
        return undefined;
      }

      return allPages.length * DEFAULT_LIMIT;
    },
  });
};

export default usePosts;
