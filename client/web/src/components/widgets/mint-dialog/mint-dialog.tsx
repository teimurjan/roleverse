"use client";

import { useAccount } from "wagmi";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useMint from "@/onchain/hooks/use-mint";
import useTokenSupply from "@/onchain/hooks/use-token-supply";
import { useAuth } from "@/providers/auth";

const MintDialog = () => {
  const { address } = useAccount();
  const { data: tokenSupply, refetch } = useTokenSupply({ address });
  const mint = useMint();
  const { logOut } = useAuth();

  const handleMintClick = async () => {
    await mint();
    await refetch();
  };

  return (
    <AlertDialog open={tokenSupply === BigInt(0)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Mint your token</AlertDialogTitle>
          <AlertDialogDescription>
            You have to mint your first token to start using the platform.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={logOut}>Log out</AlertDialogCancel>
          <AlertDialogAction onClick={handleMintClick}>Mint</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MintDialog;
