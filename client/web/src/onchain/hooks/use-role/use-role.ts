import { IRoleABI } from "@roleverse/contract-roleverse";
import { Address } from "viem";
import { useReadContracts } from "wagmi";

import useRoleAddress from "../use-role-address";

interface UseRoleArgs {
  address?: Address;
}

const useRole = ({ address }: UseRoleArgs) => {
  const { data: role } = useRoleAddress({ address });

  return useReadContracts({
    contracts: [
      {
        abi: IRoleABI,
        address: role,
        functionName: "name",
      },
      {
        abi: IRoleABI,
        address: role,
        functionName: "price",
      },
    ],
    query: {
      select: (data) => {
        return {
          name: data[0].result,
          price: data[1].result,
          address: role!,
        };
      },
      enabled: !!role,
    },
  });
};

export default useRole;
