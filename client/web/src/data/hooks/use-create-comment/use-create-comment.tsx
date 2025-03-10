import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QueryKey } from "@/constants/query-key";
import { CreateCommentMutationVariables } from "@/data/generated/get-sdk";
import { useDataSdk } from "@/providers/data-sdk";

import useSetPost from "../use-set-post";

const useCreateComment = () => {
  const { sdk } = useDataSdk();
  const queryClient = useQueryClient();
  const setPost = useSetPost();

  return useMutation({
    mutationFn: async (payload: CreateCommentMutationVariables) => {
      return await sdk.CreateComment(payload);
    },
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Comments] });

      setPost(postId, (post) => ({
        ...post,
        commentsCount: post.commentsCount + 1,
      }));
    },
  });
};

export default useCreateComment;
