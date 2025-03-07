import { PerkManagerUpgradeableABI } from "@roleverse/contract-roleverse";
import { Address } from "viem";
import { usePublicClient, useWriteContract } from "wagmi";

import config from "@/config";

interface ApplyPerkArgs {
  perkKey: Address;
  value: bigint;
}

const useApplyPerk = () => {
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();

  const applyPerk = async ({ perkKey, value }: ApplyPerkArgs) => {
    const hash = await writeContractAsync({
      abi: PerkManagerUpgradeableABI,
      address: config.perk_manager_contract_address,
      functionName: "usePerk",
      args: [perkKey],
      value,
    });
    return publicClient?.waitForTransactionReceipt({ hash });
  };

  return applyPerk;
};

export default useApplyPerk;
