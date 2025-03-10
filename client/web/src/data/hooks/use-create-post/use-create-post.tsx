import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QueryKey } from "@/constants/query-key";
import { CreatePostMutationVariables } from "@/data/generated/get-sdk";
import { useDataSdk } from "@/providers/data-sdk";

const useCreatePost = () => {
  const { sdk } = useDataSdk();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreatePostMutationVariables) => {
      return await sdk.CreatePost(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Feed] });
    },
  });
};

export default useCreatePost;
