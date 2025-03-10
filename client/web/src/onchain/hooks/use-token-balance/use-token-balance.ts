import { RoleverseUpgradeableABI } from "@roleverse/contract-roleverse";
import { Address, zeroAddress } from "viem";
import { useReadContract } from "wagmi";

import config from "@/config";

interface UseTokenBalanceArgs {
  ownerAddress?: Address;
  subjectAddress?: Address;
}

const useTokenBalance = ({
  ownerAddress,
  subjectAddress,
}: UseTokenBalanceArgs) => {
  return useReadContract({
    abi: RoleverseUpgradeableABI,
    address: config.roleverse_contract_address,
    functionName: "balances",
    args: [ownerAddress ?? zeroAddress, subjectAddress ?? zeroAddress],
    query: {
      enabled: !!ownerAddress && !!subjectAddress,
    },
  });
};

export default useTokenBalance;
