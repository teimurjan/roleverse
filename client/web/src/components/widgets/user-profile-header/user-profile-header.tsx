"use client";
import { Address, formatEther } from "viem";
import { useAccount } from "wagmi";

import CopyAddress from "@/components/dumb/copy-address";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUser from "@/data/hooks/use-user";
import useTokenBalance from "@/onchain/hooks/use-token-balance";
import useTokenPrice from "@/onchain/hooks/use-token-price";

import BuyTokenButton from "../buy-token-button";
import FollowCount from "../follow-count";
import SellTokenButton from "../sell-token-button";

interface UserProfileHeaderProps {
  userId: string;
}

const UserProfileHeader = ({ userId }: UserProfileHeaderProps) => {
  const { data: user } = useUser({ id: userId });
  const { address } = useAccount();

  const userAddress = user?.user.walletAddress as Address | undefined;
  const { data: balance } = useTokenBalance({
    ownerAddress: address,
    subjectAddress: userAddress,
  });
  const { data: price } = useTokenPrice({
    address,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback className="text-2xl">
            @{user?.user.username.slice(0, 2)}
          </AvatarFallback>
        </Avatar>

        {user && userAddress && (
          <div>
            <h3 className="font-bold text-lg">@{user.user.username}</h3>

            <CopyAddress className="text-md" address={userAddress} />
          </div>
        )}

        <div className="ml-auto">
          <div className="flex items-center justify-end gap-4">
            {userAddress && <BuyTokenButton tokenAddress={userAddress} />}
            {userAddress && (
              <SellTokenButton
                variant="secondary"
                disabled={!balance || balance === BigInt(0)}
                tokenAddress={userAddress}
              />
            )}
          </div>

          <div className="text-sm mt-2">
            Price: {price ? formatEther(price) : "0"} ETH
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <FollowCount userId={user?.user.id} />

        {typeof balance === "bigint" && (
          <div className="text-sm font-bold text-slate-500">
            You have {balance} token{balance === BigInt(1) ? "" : "s"}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileHeader;
