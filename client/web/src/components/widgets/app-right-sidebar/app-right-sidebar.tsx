"use client";

import { Wallet } from "lucide-react";
import { useState } from "react";
import { formatEther } from "viem";
import { useAccount, useBalance } from "wagmi";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
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
  const { data: balance, isPending: isBalanceLoading } = useBalance({
    address,
  });

  const getFormattedBalance = () => {
    if (!balance) {
      return null;
    }

    const remainder = balance.value % BigInt(1e16);
    return `${formatEther(balance.value - remainder)}${remainder > BigInt(0) ? "..." : ""} ${balance.symbol}`;
  };

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-center gap-2 p-4">
        <Wallet className="h-4 w-4" />
        {isBalanceLoading ? (
          <Skeleton className="h-6 w-24" />
        ) : (
          <span className="font-semibold text-right">
            {getFormattedBalance()}
          </span>
        )}
      </div>

      <Separator />

      <div className="flex items-center gap-4 p-4">
        <span className="flex items-center text-sm">
          <b className="mr-1">Role:</b>
          {isRoleLoading ? (
            <Skeleton className="h-4 w-12 inline-block" />
          ) : (
            role?.name || "Human"
          )}
        </span>

        <Button
          className="ml-auto h-auto py-1"
          size="sm"
          onClick={() => setChangingRole(true)}
        >
          Change
        </Button>
      </div>

      <div className="flex flex-col p-4">
        <span className="font-bold text-sm mb-1">Perks:</span>

        <PerkList />
      </div>

      <ChangeRoleDialog open={isChangingRole} onOpenChange={setChangingRole} />
    </div>
  );
};

export default AppRightSidebar;
