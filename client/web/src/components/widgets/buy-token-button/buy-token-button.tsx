import { useMutation } from "@tanstack/react-query";
import { MouseEventHandler } from "react";
import { Address } from "viem";
import { useBalance } from "wagmi";

import { Button, ButtonProps } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import useBuyShare from "@/onchain/hooks/use-buy-share";
import useTokenPrice from "@/onchain/hooks/use-token-price";

interface BuyTokenButton extends ButtonProps {
  tokenAddress: Address;
}

const BuyTokenButton = ({
  tokenAddress,
  children = "Buy",
  onClick,
  loading,
  disabled,
  ...rest
}: BuyTokenButton) => {
  const buyShare = useBuyShare();

  const { data: balance } = useBalance();
  const { data: price } = useTokenPrice({ address: tokenAddress });
  const { mutateAsync, isPending } = useMutation({
    mutationFn: buyShare,
    onSuccess: (receipt) => {
      if (receipt) {
        toast({
          title: "You have successfully bought the token",
          description: `Transaction hash: ${receipt.transactionHash}`,
        });
      }
    },
  });

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    mutateAsync({ address: tokenAddress });
    onClick?.(e);
  };

  const isDisabledByPrice = !!price && balance && price > balance.value;
  const isDisabled = disabled || !price || isDisabledByPrice;

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

  if (isDisabledByPrice) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>{buttonElement}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>You don&apos;t have enough funds to buy.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return buttonElement;
};

export default BuyTokenButton;
