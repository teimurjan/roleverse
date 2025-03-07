import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QueryKey } from "@/constants/query-key";
import { useDataSdk } from "@/providers/data-sdk";

const useCreatePost = () => {
  const { sdk } = useDataSdk();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (text: string) => {
      return await sdk.CreatePost({ text });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Feed] });
    },
  });
};

export default useCreatePost;
