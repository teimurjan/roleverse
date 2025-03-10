import React from "react";

import CreateCommentForm from "@/components/widgets/create-comment-form";
import PostCardFetcher from "@/components/widgets/post-card-fetcher";
import PostCommentList from "@/components/widgets/post-comment-list";

const Post = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div className="h-full w-full flex flex-col gap-4">
      <PostCardFetcher postId={id} />
      <CreateCommentForm postId={id} />
      <PostCommentList postId={id} />
    </div>
  );
};

export default Post;
