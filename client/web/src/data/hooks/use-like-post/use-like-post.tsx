import { useMutation } from "@tanstack/react-query";

import { useDataSdk } from "@/providers/data-sdk";

import useSetLikePost from "../use-set-like-post";
import useSetUnlikePost from "../use-set-unlike-post";

const useLikePost = () => {
  const { sdk } = useDataSdk();
  const setUnlikePost = useSetUnlikePost();
  const setLikePost = useSetLikePost();

  return useMutation({
    mutationFn: async (postId: string) => {
      return await sdk.LikePost({ postId });
    },
    onMutate: (postId) => {
      setLikePost(postId);
    },
    onError: (_, postId) => {
      setUnlikePost(postId);
    },
  });
};

export default useLikePost;
