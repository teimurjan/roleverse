import { RoleManagerUpgradeableABI } from "@roleverse/contract-roleverse";
import { Address, zeroAddress } from "viem";
import { useReadContract } from "wagmi";

import config from "@/config";

interface UseRoleAddressArgs {
  address?: Address;
}

const useRoleAddress = ({ address }: UseRoleAddressArgs) => {
  return useReadContract({
    abi: RoleManagerUpgradeableABI,
    address: config.role_manager_contract_address,
    functionName: "userRoles",
    args: [address ?? zeroAddress],
    query: {
      enabled: !!address,
    },
  });
};

export default useRoleAddress;
