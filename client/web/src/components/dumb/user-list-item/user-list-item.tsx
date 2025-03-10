import { AvatarFallback } from "@radix-ui/react-avatar";
import Link from "next/link";
import { ReactNode } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/data/generated/get-sdk";
import { cn } from "@/lib/utils";
import shortenAddress from "@/utils/shorten-address";

interface UserListItemProps {
  className?: string;
  user: User;
  action?: ReactNode;
}

const UserListItem = ({ className, user, action }: UserListItemProps) => {
  return (
    <Link
      href={`/profile/${user.id}`}
      className={cn("flex items-center gap-4", className)}
    >
      <Avatar className="w-12 h-12">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback className="text-2xl">
          @{user.username.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-slate-500">{user.username}</span>
        <span>{shortenAddress(user.walletAddress)}</span>
      </div>

      {action && <div className="ml-auto">{action}</div>}
    </Link>
  );
};

export default UserListItem;
