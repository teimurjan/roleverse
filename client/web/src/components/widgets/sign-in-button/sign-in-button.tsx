"use client";

import { useAccount } from "wagmi";

import { Button, ButtonProps } from "@/components/ui/button";
import { useAuth } from "@/providers/auth";

const SignInButton = ({
  loading,
  onClick,
  children = "Sign in",
  ...rest
}: ButtonProps) => {
  const { address } = useAccount();
  const { signIn, isLoading } = useAuth();

  return (
    <Button
      onClick={(e) => {
        if (address) {
          signIn({ walletAddress: address });
        }

        onClick?.(e);
      }}
      loading={loading || isLoading}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default SignInButton;
