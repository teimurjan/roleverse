import { useQuery } from "@tanstack/react-query";

import { QueryKey } from "@/constants/query-key";
import { PostQueryVariables } from "@/data/generated/get-sdk";
import { useDataSdk } from "@/providers/data-sdk";

type UsePostParams = PostQueryVariables;

const usePost = ({ postId }: UsePostParams) => {
  const { sdk } = useDataSdk();
  return useQuery({
    queryKey: [QueryKey.Post, postId],
    queryFn: () => sdk.Post({ postId }),
  });
};

export default usePost