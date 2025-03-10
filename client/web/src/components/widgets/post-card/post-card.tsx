import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Address } from "viem";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Post_Fragment } from "@/data/generated/get-sdk";
import useLikePost from "@/data/hooks/use-like-post";
import useUnlikePost from "@/data/hooks/use-unlike-post";
import { cn } from "@/lib/utils";
import useRole from "@/onchain/hooks/use-role";

interface PostCardProps {
  className?: string;
  post: Post_Fragment;
}

const PostCard = ({ className, post }: PostCardProps) => {
  const { mutateAsync: likePost } = useLikePost();
  const { mutateAsync: unlikePost } = useUnlikePost();
  const { data: role } = useRole({
    address: post.user.walletAddress as Address,
  });
  return (
    <Card className={className}>
      <CardHeader className="flex-row items-center gap-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback className="text-2xl">
            @{post.user.username.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>
            <Link href={`/profile/${post.user.id}`}>
              @{post.user.username}{" "}
              <span className="text-purple-300">{role?.name}</span>
            </Link>
          </CardTitle>
          <CardDescription className="mt-1">
            Posted {formatDistanceToNow(post.createdAt)} ago
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pb-2">{post.text}</CardContent>
      <CardFooter className="w-full flex items-center justify-end gap-6 mt-2">
        <Button
          className={cn("p-0", post.isLiked && "text-red-300")}
          variant="link"
          onClick={() => (post.isLiked ? unlikePost : likePost)(post.id)}
        >
          <Heart /> {post.likesCount} Like{post.likesCount !== 1 && "s"}
        </Button>
        <Link href={`/post/${post.id}`}>
          <Button className="p-0" variant="link">
            <MessageCircle /> {post.commentsCount} Comment
            {post.commentsCount !== 1 && "s"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
