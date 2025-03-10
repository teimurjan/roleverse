import { RoleverseUpgradeableABI } from "@roleverse/contract-roleverse";
import { Address, zeroAddress } from "viem";
import { useReadContract } from "wagmi";

import config from "@/config";

interface UseTokenPriceArgs {
  address?: Address;
}

const useTokenPrice = ({ address }: UseTokenPriceArgs) => {
  return useReadContract({
    abi: RoleverseUpgradeableABI,
    address: config.roleverse_contract_address,
    functionName: "getBuyPrice",
    args: [address ?? zeroAddress],
    query: {
      enabled: !!address,
    },
  });
};

export default useTokenPrice;
