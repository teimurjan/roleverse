"use client";

import { useMutation } from "@tanstack/react-query";
import { Address } from "viem";
import { useAccount } from "wagmi";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import useApplyPerk from "@/onchain/hooks/use-apply-perk";
import usePerkStatus from "@/onchain/hooks/use-perk-status";

interface PerkWithActionProps {
  name: string;
  perkKey: Address;
  price: bigint;
  className?: string;
}

const PerkWithAction = ({
  name,
  perkKey,
  price,
  className,
}: PerkWithActionProps) => {
  const { address } = useAccount();
  const {
    data: perkStatus,
    isPending: isLoadingPerkStatus,
    refetch,
  } = usePerkStatus({
    userAddress: address,
    perkKey,
  });
  const applyPerk = useApplyPerk();

  const { mutate, isPending: isApplyingPerk } = useMutation({
    mutationFn: applyPerk,
    onSuccess: (receipt) => {
      if (receipt) {
        toast({
          title: "Perk has been successfully applied",
          description: `Transaction hash: ${receipt.transactionHash}`,
        });
        refetch();
      }
    },
  });

  const handleButtonClick = () => {
    mutate({ perkKey, value: price });
  };

  const getButtonName = () => {
    if (perkStatus === "active") {
      return "Active";
    }
    return "Use";
  };

  return (
    <div key={perkKey} className={cn("flex items-center", className)}>
      <Badge variant="secondary">{name}</Badge>
      <Button
        size="sm"
        className="ml-auto h-auto py-1"
        loading={isLoadingPerkStatus || isApplyingPerk}
        disabled={perkStatus !== "available"}
        onClick={handleButtonClick}
      >
        {getButtonName()}
      </Button>
    </div>
  );
};

export default PerkWithAction;
