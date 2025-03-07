import { useInfiniteQuery } from "@tanstack/react-query";

import { QueryKey } from "@/constants/query-key";
import { useDataSdk } from "@/providers/data-sdk";

const DEFAULT_LIMIT = 15;

const useFeed = () => {
  const { sdk } = useDataSdk();
  return useInfiniteQuery({
    queryKey: [QueryKey.Feed] as const,
    queryFn: ({ pageParam }) => {
      return sdk.Feed({
        limit: DEFAULT_LIMIT,
        offset: pageParam,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.feed || lastPage.feed.length < DEFAULT_LIMIT) {
        return undefined;
      }

      return allPages.length * DEFAULT_LIMIT;
    },
  });
};

export default useFeed;
