import { RoleverseUpgradeableABI } from "@roleverse/contract-roleverse";
import { usePublicClient, useWriteContract } from "wagmi";

import config from "@/config";

const useMint = () => {
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();

  const mint = async () => {
    const hash = await writeContractAsync({
      abi: RoleverseUpgradeableABI,
      address: config.roleverse_contract_address,
      functionName: "mint",
    });
    return publicClient?.waitForTransactionReceipt({ hash });
  };

  return mint;
};

export default useMint;
