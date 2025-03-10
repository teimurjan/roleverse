import { useMutation } from "@tanstack/react-query";
import { MouseEventHandler } from "react";
import { Address } from "viem";
import { useAccount } from "wagmi";

import { Button, ButtonProps } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import useSellShare from "@/onchain/hooks/use-sell-share";
import useTokenBalance from "@/onchain/hooks/use-token-balance";

interface SellTokenButton extends ButtonProps {
  tokenAddress: Address;
}

const SellTokenButton = ({
  tokenAddress,
  children = "Sell",
  onClick,
  loading,
  disabled,
  ...rest
}: SellTokenButton) => {
  const sellShare = useSellShare();
  const { address } = useAccount();
  const { data: balance } = useTokenBalance({
    ownerAddress: address,
    subjectAddress: tokenAddress,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: sellShare,
    onSuccess: (receipt) => {
      if (receipt) {
        toast({
          title: "You have successfully sold the token",
          description: `Transaction hash: ${receipt.transactionHash}`,
        });
      }
    },
  });

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    mutateAsync({ address: tokenAddress });
    onClick?.(e);
  };

  const isDisabledByBalance = !!balance && balance === BigInt(0);
  const isDisabled = disabled || !balance || isDisabledByBalance;

  const buttonElement = (
    <Button
      onClick={handleClick}
      loading={isPending || loading}
      disabled={isDisabled}
      {...rest}
    >
      {children}
    </Button>
  );

  if (isDisabledByBalance) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>{buttonElement}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>You don&apos;t have shares to sell.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return buttonElement;
};

export default SellTokenButton;
