import { RoleverseUpgradeableABI } from "@roleverse/contract-roleverse";
import { useQueryClient } from "@tanstack/react-query";
import { Address } from "viem";
import { useAccount, usePublicClient, useWriteContract } from "wagmi";
import { getBalanceQueryKey } from "wagmi/query";

import config from "@/config";
import { QueryKey } from "@/constants/query-key";
import isReadContractQuery from "@/utils/is-read-contract-query";

interface SellShareArgs {
  address: Address;
}

const useSellShare = () => {
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();
  const queryClient = useQueryClient();
  const { address: accountAddress } = useAccount();

  const sellShare = async ({ address }: SellShareArgs) => {
    const hash = await writeContractAsync({
      abi: RoleverseUpgradeableABI,
      address: config.roleverse_contract_address,
      functionName: "sellShare",
      args: [address],
    });
    return publicClient?.waitForTransactionReceipt({ hash });
  };

  queryClient.invalidateQueries({
    predicate: (query) => {
      return (
        query.queryKey[0] === QueryKey.FollowCount ||
        query.queryKey === getBalanceQueryKey({ address: accountAddress }) ||
        isReadContractQuery(query, "getBuyPrice") ||
        isReadContractQuery(query, "tokenSupply") ||
        isReadContractQuery(query, "balances")
      );
    },
  });

  return sellShare;
};

export default useSellShare;
