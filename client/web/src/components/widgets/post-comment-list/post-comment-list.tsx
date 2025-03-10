"use client";

import CommentList from "@/components/dumb/comment-list";
import useComments from "@/data/hooks/use-comments";

interface PostCommentListProps {
  postId: string;
}

const PostCommentList = ({ postId }: PostCommentListProps) => {
  const {
    data: comments,
    isPending: isLoadingComments,
    hasNextPage,
    fetchNextPage,
  } = useComments({ postId });

  return (
    <CommentList
      loading={isLoadingComments}
      comments={comments?.pages.flatMap((page) => page.comments) ?? []}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      emptyText="No comments to show."
    />
  );
};

export default PostCommentList;
