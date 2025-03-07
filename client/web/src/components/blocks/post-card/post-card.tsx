import { formatDistanceToNow } from "date-fns";
import { Heart } from "lucide-react";

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
import { Post } from "@/data/generated/get-sdk";
import useLikePost from "@/data/hooks/use-like-post";
import useUnlikePost from "@/data/hooks/use-unlike-post";

interface PostCardProps {
  className?: string;
  post: Post;
}

const PostCard = ({ className, post }: PostCardProps) => {
  const { mutateAsync: likePost } = useLikePost();
  const { mutateAsync: unlikePost } = useUnlikePost();
  const isLiked = post.likes?.some((like) => like.id === post.user.id);
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
          <CardTitle>@{post.user.username}</CardTitle>
          <CardDescription className="mt-1">
            Posted {formatDistanceToNow(post.createdAt)} ago
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>{post.text}</CardContent>
      <CardFooter>
        <div className="w-full flex items-center justify-end gap-4">
          <Button
            className={isLiked ? "text-red-600" : undefined}
            variant="link"
            onClick={() => (isLiked ? unlikePost : likePost)(post.id)}
          >
            <Heart /> Like{isLiked && "d"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
