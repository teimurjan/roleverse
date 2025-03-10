import { useInfiniteQuery } from "@tanstack/react-query";

import { QueryKey } from "@/constants/query-key";
import { CommentsQueryVariables } from "@/data/generated/get-sdk";
import { useDataSdk } from "@/providers/data-sdk";

const DEFAULT_LIMIT = 15;

type UseCommentsArgs = Omit<CommentsQueryVariables, "limit" | "offset">;

const useComments = ({ postId }: UseCommentsArgs) => {
  const { sdk } = useDataSdk();
  return useInfiniteQuery({
    queryKey: [QueryKey.Comments, postId] as const,
    queryFn: ({ pageParam }) => {
      return sdk.Comments({
        limit: DEFAULT_LIMIT,
        offset: pageParam,
        postId,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.comments || lastPage.comments.length < DEFAULT_LIMIT) {
        return undefined;
      }

      return allPages.length * DEFAULT_LIMIT;
    },
  });
};

export default useComments;
