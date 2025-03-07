import { RoleManagerUpgradeableABI } from "@roleverse/contract-roleverse";
import { useQueryClient } from "@tanstack/react-query";
import { Address } from "viem";
import { usePublicClient, useWriteContract } from "wagmi";

import config from "@/config";
import { QueryKey } from "@/constants/query-key";
import isReadContractQuery from "@/utils/is-read-contract-query";
import isReadContractsQuery from "@/utils/is-read-contracts-query";

interface SetRoleArgs {
  roleAddress: Address;
  value: bigint;
}

const useSetRole = () => {
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();
  const queryClient = useQueryClient();

  const setRole = async ({ roleAddress, value }: SetRoleArgs) => {
    const hash = await writeContractAsync({
      abi: RoleManagerUpgradeableABI,
      address: config.role_manager_contract_address,
      functionName: "setRole",
      args: [roleAddress],
      value,
    });
    const reciept = await publicClient?.waitForTransactionReceipt({ hash });

    queryClient.invalidateQueries({
      predicate: (query) => {
        return (
          query.queryKey[0] === QueryKey.Feed ||
          query.queryKey[0] === QueryKey.Explore ||
          isReadContractQuery(query, "userRoles") ||
          isReadContractsQuery(query, ["isPerkAvailable", "isPerkActive"])
        );
      },
    });

    return reciept;
  };

  return setRole;
};

export default useSetRole;
