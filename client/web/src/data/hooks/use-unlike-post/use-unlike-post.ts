import { useMutation } from "@tanstack/react-query";

import { useDataSdk } from "@/providers/data-sdk";

import useSetLikePost from "../use-set-like-post";
import useSetUnlikePost from "../use-set-unlike-post";

const useUnlikePost = () => {
  const { sdk } = useDataSdk();
  const setUnlikePost = useSetUnlikePost();
  const setLikePost = useSetLikePost();

  return useMutation({
    mutationFn: async (postId: string) => {
      return await sdk.UnlikePost({ postId });
    },
    onMutate: (postId) => {
      setUnlikePost(postId);
    },
    onError: (_, postId) => {
      setLikePost(postId);
    },
  });
};

export default useUnlikePost;
