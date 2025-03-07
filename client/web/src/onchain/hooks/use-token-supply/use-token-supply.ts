import { RoleverseUpgradeableABI } from "@roleverse/contract-roleverse";
import { Address, zeroAddress } from "viem";
import { useReadContract } from "wagmi";

import config from "@/config";

interface UseTokenSupplyArgs {
  address?: Address;
}

const useTokenSupply = ({ address }: UseTokenSupplyArgs) => {
  return useReadContract({
    abi: RoleverseUpgradeableABI,
    address: config.roleverse_contract_address,
    functionName: "tokenSupply",
    args: [address ?? zeroAddress],
    query: {
      enabled: !!address,
    },
  });
};

export default useTokenSupply;
