import {
  IRoleABI,
  RoleManagerUpgradeableABI,
} from "@roleverse/contract-roleverse";
import { Address } from "viem";
import { useReadContract, useReadContracts } from "wagmi";

import config from "@/config";

const useAvailableRoles = () => {
  const { data: availableRoles } = useReadContract({
    abi: RoleManagerUpgradeableABI,
    address: config.role_manager_contract_address,
    functionName: "getAvailableRoles",
    args: [],
  });

  return useReadContracts({
    contracts: availableRoles
      ? availableRoles?.flatMap((availableRole) => [
          {
            abi: IRoleABI,
            address: availableRole,
            functionName: "name",
          },
          {
            abi: IRoleABI,
            address: availableRole,
            functionName: "price",
          },
        ])
      : [],
    query: {
      select: (data) => {
        const result = [];

        for (let i = 0; i < data.length; i += 2) {
          const name = data[i].result as string | undefined;
          const price = data[i + 1].result as bigint | undefined;
          const address = availableRoles?.[i / 2] as Address | undefined;

          result.push({
            name,
            price,
            address,
          });
        }

        return result;
      },
      enabled: !!availableRoles?.length,
    },
  });
};

export default useAvailableRoles;
