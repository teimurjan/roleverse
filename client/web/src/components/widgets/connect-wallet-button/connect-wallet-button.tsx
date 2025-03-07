"use client";

import { useAppKit } from "@reown/appkit/react";
import { ReactNode } from "react";
import { useAccount } from "wagmi";

import { Button, ButtonProps } from "@/components/ui/button";

const ConnectWalletButton = ({
  onClick,
  children = "Connect Wallet",
  connectedChildren = "Connected",
  ...rest
}: ButtonProps & { connectedChildren?: ReactNode }) => {
  const { isConnected } = useAccount();
  const { open } = useAppKit();

  if (isConnected) {
    return (
      <Button {...rest} disabled>
        {connectedChildren}
      </Button>
    );
  }

  return (
    <Button
      onClick={(e) => {
        open({ view: "Connect" });

        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ConnectWalletButton;
