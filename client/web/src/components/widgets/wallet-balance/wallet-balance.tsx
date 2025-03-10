"use client";
import { Wallet } from "lucide-react";
import { formatEther } from "viem";
import { useAccount, useBalance } from "wagmi";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface WalletBalanceProps {
  className?: string;
}

const WalletBalance = ({ className }: WalletBalanceProps) => {
  const { address } = useAccount();
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
    <div className={cn("flex items-center gap-2", className)}>
      <Wallet className="h-4 w-4" />
      {isBalanceLoading ? (
        <Skeleton className="h-6 w-24" />
      ) : (
        <span className="font-semibold">{getFormattedBalance()}</span>
      )}
    </div>
  );
};

export default WalletBalance;
