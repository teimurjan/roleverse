import { PerkManagerUpgradeableABI } from "@roleverse/contract-roleverse";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { usePublicClient } from "wagmi";

import { QueryKey } from "@/constants/query-key";

const usePerks = () => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: [QueryKey.Perks],
    queryFn: async () => {
      const events = await publicClient?.getContractEvents({
        abi: PerkManagerUpgradeableABI,
        address: process.env
          .NEXT_PUBLIC_PERK_MANAGER_CONTRACT_ADDRESSS as Address,
        eventName: "PerkAdded",
        fromBlock: BigInt(0),
        toBlock: "latest",
      });

      return events ? events.map((event) => event.args) : [];
    },
  });
};

export default usePerks;
