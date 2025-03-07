import { ReactNode } from "react";

import { Button } from "@/components/ui/button";
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
}

const UserList = ({
  className,
  loading,
  users,
  hasNextPage,
  fetchNextPage,
  emptyText,
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
            <UserListItem key={user.id} user={user} className="space-x-4" />
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
