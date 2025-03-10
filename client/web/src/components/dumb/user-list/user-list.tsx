import { ReactNode } from "react";
import { Address } from "viem";

import { Button } from "@/components/ui/button";
import BuyTokenButton from "@/components/widgets/buy-token-button";
import SellTokenButton from "@/components/widgets/sell-token-button";
import { User } from "@/data/generated/get-sdk";
import { cn } from "@/lib/utils";

import UserListItem from "../user-list-item";
import UserSkeleton from "../user-skeleton";

interface UserListProps {
  className?: string;
  loading: boolean;
  users: User[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  emptyText: ReactNode;
  action?: "buy" | "sell";
}

const UserList = ({
  className,
  loading,
  users,
  hasNextPage,
  fetchNextPage,
  emptyText,
  action,
}: UserListProps) => {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {loading ? (
        <>
          <UserSkeleton />
          <UserSkeleton />
          <UserSkeleton />
        </>
      ) : users.length ? (
        <>
          {users.map((user) => (
            <UserListItem
              key={user.id}
              user={user}
              action={
                action ? (
                  action === "buy" ? (
                    <BuyTokenButton
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                      tokenAddress={user.walletAddress as Address}
                    />
                  ) : (
                    <SellTokenButton
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                      tokenAddress={user.walletAddress as Address}
                    />
                  )
                ) : null
              }
            />
          ))}

          {hasNextPage && (
            <Button
              variant="ghost"
              onClick={() => {
                fetchNextPage();
              }}
            >
              Load more
            </Button>
          )}
        </>
      ) : (
        <p>{emptyText}</p>
      )}
    </div>
  );
};

export default UserList;
