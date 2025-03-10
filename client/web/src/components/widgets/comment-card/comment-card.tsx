import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Address } from "viem";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Comment_Fragment } from "@/data/generated/get-sdk";
import useRole from "@/onchain/hooks/use-role";

interface CommentCardProps {
  className?: string;
  comment: Comment_Fragment;
}

const CommentCard = ({ className, comment }: CommentCardProps) => {
  const { data: role } = useRole({
    address: comment.user.walletAddress as Address,
  });
  return (
    <Card className={className}>
      <CardHeader className="flex-row items-center gap-4">
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback className="text-xl">
            @{comment.user.username.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>
            <Link href={`/profile/${comment.user.id}`}>
              @{comment.user.username}{" "}
              <span className="text-purple-300">{role?.name}</span>
            </Link>
          </CardTitle>
          <CardDescription className="mt-1">
            Commented {formatDistanceToNow(comment.createdAt)} ago
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>{comment.text}</CardContent>
    </Card>
  );
};

export default CommentCard;
