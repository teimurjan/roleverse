import { RoleverseUpgradeableABI } from "@roleverse/contract-roleverse";
import { Address, zeroAddress } from "viem";
import { readContract } from "viem/actions";
import { usePublicClient } from "wagmi";

import config from "@/config";

interface GetTokenPriceArgs {
  address: Address;
}

const useGetTokenPrice = () => {
  const publicClient = usePublicClient();

  return ({ address }: GetTokenPriceArgs) => {
    if (!publicClient) {
      return BigInt(0);
    }

    return readContract(publicClient, {
      abi: RoleverseUpgradeableABI,
      address: config.roleverse_contract_address,
      functionName: "getBuyPrice",
      args: [address ?? zeroAddress],
    });
  };
};

export default useGetTokenPrice;
