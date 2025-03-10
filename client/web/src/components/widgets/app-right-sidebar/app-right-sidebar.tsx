"use client";

import { useState } from "react";
import { useAccount } from "wagmi";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import useRole from "@/onchain/hooks/use-role";

import ChangeRoleDialog from "../change-role-dialog";
import PerkList from "../perk-list";

interface AppRightSidebarProps {
  className?: string;
}

const AppRightSidebar = ({ className }: AppRightSidebarProps) => {
  const [isChangingRole, setChangingRole] = useState(false);

  const { address } = useAccount();
  const { data: role, isPending: isRoleLoading } = useRole({ address });

  const isMobile = useIsMobile();

  return isMobile ? null : (
    <div
      className={cn(
        "flex flex-col bg-sidebar p-4",
        !isMobile && "m-2 border rounded-lg",
        className
      )}
    >
      <h4 className="text-lg font-semibold">Your Role</h4>
      <div className="flex items-center mt-2 mb-8">
        <span className="text-purple-300">
          {isRoleLoading ? (
            <Skeleton className="h-5 w-12 inline-block" />
          ) : (
            role?.name || "Human"
          )}
        </span>

        <Button className="ml-auto" onClick={() => setChangingRole(true)}>
          Change
        </Button>
      </div>

      <h4 className="text-lg font-semibold">Available Perks</h4>
      <PerkList className="mt-2" />

      <ChangeRoleDialog open={isChangingRole} onOpenChange={setChangingRole} />
    </div>
  );
};

export default AppRightSidebar;
