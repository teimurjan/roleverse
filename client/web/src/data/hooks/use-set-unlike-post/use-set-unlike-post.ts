import useSetPost from "../use-set-post";

const useSetLikePost = () => {
  const setPost = useSetPost();

  return (postId: string) => {
    setPost(postId, (post) => ({
      ...post,
      isLiked: false,
      likesCount: post.likesCount - 1,
    }));
  };
};

export default useSetLikePost;
