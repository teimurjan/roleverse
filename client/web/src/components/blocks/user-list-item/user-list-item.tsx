import { AvatarFallback } from "@radix-ui/react-avatar";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/data/generated/get-sdk";
import { cn } from "@/lib/utils";
import shortenAddress from "@/utils/shorten-address";

interface UserListItemProps {
  className?: string;
  user: User;
}

const UserListItem = ({ className, user }: UserListItemProps) => {
  return (
    <div className={cn("flex items-center", className)}>
      <Avatar className="w-12 h-12">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback className="text-2xl">
          @{user.username.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div className="space-x-2">
        <span className="text-slate-500">{user.username}</span>
        <span>{shortenAddress(user.walletAddress)}</span>
      </div>
    </div>
  );
};

export default UserListItem;
