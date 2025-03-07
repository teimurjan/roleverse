import { Address, isAddress } from "viem";

const requireString = <T>(value: T): string => {
  if (typeof value !== "string") {
    throw new Error(`Should be a string: ${value}`);
  }

  return value;
};

const requireAddress = (value: string): Address => {
  if (!isAddress(value)) {
    throw new Error(`Should be an address: ${value}`);
  }

  return value;
};

const config = {
  appkit_project_id: requireString(process.env.NEXT_PUBLIC_APPKIT_PROJECT_ID),
  graphql_url: requireString(process.env.NEXT_PUBLIC_GRAPHQL_URL),
  role_manager_contract_address: requireAddress(
    requireString(process.env.NEXT_PUBLIC_ROLE_MANAGER_CONTRACT_ADDRESS)
  ),
  perk_manager_contract_address: requireAddress(
    requireString(process.env.NEXT_PUBLIC_PERK_MANAGER_CONTRACT_ADDRESS)
  ),
  roleverse_contract_address: requireAddress(
    requireString(process.env.NEXT_PUBLIC_ROLEVERSE_CONTRACT_ADDRESS)
  ),
};

export default config;
