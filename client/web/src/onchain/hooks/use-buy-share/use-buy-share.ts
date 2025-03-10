import { RoleverseUpgradeableABI } from "@roleverse/contract-roleverse";
import { useQueryClient } from "@tanstack/react-query";
import { Address } from "viem";
import { useAccount, usePublicClient, useWriteContract } from "wagmi";
import { getBalanceQueryKey } from "wagmi/query";

import config from "@/config";
import isReadContractQuery from "@/utils/is-read-contract-query";

import useGetTokenPrice from "../use-get-token-price";

interface BuyShareArgs {
  address: Address;
}

const useBuyShare = () => {
  const queryClient = useQueryClient();
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();
  const getTokenPrice = useGetTokenPrice();
  const { address: accountAddress } = useAccount();
  
  const buyShare = async ({ address }: BuyShareArgs) => {
    const value = await getTokenPrice({ address });
    const hash = await writeContractAsync({
      abi: RoleverseUpgradeableABI,
      address: config.roleverse_contract_address,
      functionName: "buyShare",
      args: [address],
      value,
    });
    const receipt = publicClient?.waitForTransactionReceipt({ hash });

    queryClient.invalidateQueries({
      predicate: (query) => {
        return (
          query.queryKey === getBalanceQueryKey({ address: accountAddress }) ||
          isReadContractQuery(query, "getBuyPrice") ||
          isReadContractQuery(query, "tokenSupply") ||
          isReadContractQuery(query, "balances")
        );
      },
    });

    return receipt;
  };

  return buyShare;
};

export default useBuyShare;
