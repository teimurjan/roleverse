import { PerkManagerUpgradeableABI } from "@roleverse/contract-roleverse";
import { Address } from "viem";
import { useReadContracts } from "wagmi";

interface UsePerkStatusArgs {
  userAddress?: Address;
  perkKey: Address;
}

const usePerkStatus = ({ userAddress, perkKey }: UsePerkStatusArgs) => {
  return useReadContracts({
    contracts: [
      {
        abi: PerkManagerUpgradeableABI,
        address: process.env
          .NEXT_PUBLIC_PERK_MANAGER_CONTRACT_ADDRESS as Address,
        functionName: "isPerkAvailable",
        args: [userAddress!, perkKey],
      },
      {
        abi: PerkManagerUpgradeableABI,
        address: process.env
          .NEXT_PUBLIC_PERK_MANAGER_CONTRACT_ADDRESS as Address,
        functionName: "isPerkActive",
        args: [userAddress!, perkKey],
      },
    ],
    query: {
      refetchOnWindowFocus: true,
      select: (data) => {
        if (data[1].result) {
          return "active";
        }
        if (!data[0].result) {
          return "unavailable";
        }
        return "available";
      },
      enabled: !!userAddress,
    },
  });
};

export default usePerkStatus;
