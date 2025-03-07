import { viem } from 'hardhat'
import { Artifact } from 'hardhat/types'
import { Address } from 'viem'

import {
  constantsArtifact,
  feeManagerArtifact,
  ninjaRoleArtifact,
  perkManagerArtifact,
  roleManagerArtifact,
  roleverseArtifact,
  vikingRoleArtifact,
  wizardRoleArtifact,
} from './artifacts'

export async function deployContract(
  artifact: Omit<Artifact, 'bytecode' | 'abi'> & {
    bytecode: Address
    abi: any
  },
  args: any[],
  walletClient: Awaited<ReturnType<typeof viem.getWalletClient>>,
  publicClient: Awaited<ReturnType<typeof viem.getPublicClient>>,
  account: any,
): Promise<Address> {
  const txHash = await walletClient.deployContract({
    abi: artifact.abi,
    bytecode: artifact.bytecode,
    args,
    account,
  })
  const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash })
  return receipt.contractAddress!
}

export async function deployConstants(
  deployer: Awaited<ReturnType<typeof viem.getWalletClient>>,
  walletClient: Awaited<ReturnType<typeof viem.getWalletClient>>,
  publicClient: Awaited<ReturnType<typeof viem.getPublicClient>>,
): Promise<Address> {
  return deployContract(
    constantsArtifact,
    [],
    walletClient,
    publicClient,
    deployer.account!,
  )
}

export async function deployAndInitializeFeeManager(
  baseFee: bigint,
  deployer: Awaited<ReturnType<typeof viem.getWalletClient>>,
  walletClient: Awaited<ReturnType<typeof viem.getWalletClient>>,
  publicClient: Awaited<ReturnType<typeof viem.getPublicClient>>,
): Promise<Address> {
  const addr = await deployContract(
    feeManagerArtifact,
    [],
    walletClient,
    publicClient,
    deployer.account!,
  )
  const initTx = await walletClient.writeContract({
    abi: feeManagerArtifact.abi,
    address: addr,
    functionName: 'initialize',
    args: [baseFee, deployer.account!.address],
    account: deployer.account!,
  })
  await publicClient.waitForTransactionReceipt({ hash: initTx })
  return addr
}

export async function deployAndInitializeRoleManager(
  feeManagerAddr: Address,
  deployer: Awaited<ReturnType<typeof viem.getWalletClient>>,
  walletClient: Awaited<ReturnType<typeof viem.getWalletClient>>,
  publicClient: Awaited<ReturnType<typeof viem.getPublicClient>>,
): Promise<Address> {
  const addr = await deployContract(
    roleManagerArtifact,
    [],
    walletClient,
    publicClient,
    deployer.account!,
  )
  const initTx = await walletClient.writeContract({
    abi: roleManagerArtifact.abi,
    address: addr,
    functionName: 'initialize',
    args: [feeManagerAddr],
    account: deployer.account!,
  })
  await publicClient.waitForTransactionReceipt({ hash: initTx })
  return addr
}

export async function deployAndInitializePerkManager(
  roleManagerAddr: Address,
  deployer: Awaited<ReturnType<typeof viem.getWalletClient>>,
  walletClient: Awaited<ReturnType<typeof viem.getWalletClient>>,
  publicClient: Awaited<ReturnType<typeof viem.getPublicClient>>,
): Promise<Address> {
  const addr = await deployContract(
    perkManagerArtifact,
    [],
    walletClient,
    publicClient,
    deployer.account!,
  )
  const initTx = await walletClient.writeContract({
    abi: perkManagerArtifact.abi,
    address: addr,
    functionName: 'initialize',
    args: [roleManagerAddr],
    account: deployer.account!,
  })
  await publicClient.waitForTransactionReceipt({ hash: initTx })
  return addr
}

export async function deployAndInitializeRoleverse(
  feeManagerAddr: Address,
  deployer: Awaited<ReturnType<typeof viem.getWalletClient>>,
  walletClient: Awaited<ReturnType<typeof viem.getWalletClient>>,
  publicClient: Awaited<ReturnType<typeof viem.getPublicClient>>,
): Promise<Address> {
  const addr = await deployContract(
    roleverseArtifact,
    [],
    walletClient,
    publicClient,
    deployer.account!,
  )
  const initTx = await walletClient.writeContract({
    abi: roleverseArtifact.abi,
    address: addr,
    functionName: 'initialize',
    args: [feeManagerAddr],
    account: deployer.account!,
  })
  await publicClient.waitForTransactionReceipt({ hash: initTx })
  return addr
}

export async function loadConstants(
  constantsAddress: Address,
  publicClient: Awaited<ReturnType<typeof viem.getPublicClient>>,
): Promise<{
  PERK_WIZARD_BOOST: string
}> {
  const PERK_WIZARD_BOOST = await publicClient.readContract({
    abi: constantsArtifact.abi,
    address: constantsAddress,
    functionName: 'WIZARD_BOOST_PERK_NAME',
    args: [],
  })
  return { PERK_WIZARD_BOOST }
}

export async function setFeeManagerReferences(
  feeManagerAddr: Address,
  roleManagerAddr: Address,
  deployer: Awaited<ReturnType<typeof viem.getWalletClient>>,
  walletClient: Awaited<ReturnType<typeof viem.getWalletClient>>,
  publicClient: Awaited<ReturnType<typeof viem.getPublicClient>>,
): Promise<void> {
  const setRoleManagerTxHash = await walletClient.writeContract({
    abi: feeManagerArtifact.abi,
    address: feeManagerAddr,
    functionName: 'setRoleManager',
    args: [roleManagerAddr],
    account: deployer.account!,
  })
  await publicClient.waitForTransactionReceipt({ hash: setRoleManagerTxHash })
}

export async function deployAndInitializeWizardRole(
  perkManagerAddr: Address,
  roleName: string,
  rolePrice: bigint,
  deployer: Awaited<ReturnType<typeof viem.getWalletClient>>,
  walletClient: Awaited<ReturnType<typeof viem.getWalletClient>>,
  publicClient: Awaited<ReturnType<typeof viem.getPublicClient>>,
): Promise<Address> {
  const addr = await deployContract(
    wizardRoleArtifact,
    [],
    walletClient,
    publicClient,
    deployer.account!,
  )
  const initTx = await walletClient.writeContract({
    abi: wizardRoleArtifact.abi,
    address: addr,
    functionName: 'initialize',
    args: [perkManagerAddr, roleName, rolePrice],
    account: deployer.account!,
  })
  await publicClient.waitForTransactionReceipt({ hash: initTx })
  return addr
}

export async function deployAndInitializeNinjaRole(
  roleManagerAddr: Address,
  roleName: string,
  rolePrice: bigint,
  deployer: Awaited<ReturnType<typeof viem.getWalletClient>>,
  walletClient: Awaited<ReturnType<typeof viem.getWalletClient>>,
  publicClient: Awaited<ReturnType<typeof viem.getPublicClient>>,
): Promise<Address> {
  const addr = await deployContract(
    ninjaRoleArtifact,
    [],
    walletClient,
    publicClient,
    deployer.account!,
  )
  const initTx = await walletClient.writeContract({
    abi: ninjaRoleArtifact.abi,
    address: addr,
    functionName: 'initialize',
    args: [roleManagerAddr, roleName, rolePrice],
    account: deployer.account!,
  })
  await publicClient.waitForTransactionReceipt({ hash: initTx })
  return addr
}

export async function deployAndInitializeVikingRole(
  roleManagerAddr: Address,
  roleName: string,
  rolePrice: bigint,
  deployer: Awaited<ReturnType<typeof viem.getWalletClient>>,
  walletClient: Awaited<ReturnType<typeof viem.getWalletClient>>,
  publicClient: Awaited<ReturnType<typeof viem.getPublicClient>>,
): Promise<Address> {
  const addr = await deployContract(
    vikingRoleArtifact,
    [],
    walletClient,
    publicClient,
    deployer.account!,
  )
  const initTx = await walletClient.writeContract({
    abi: vikingRoleArtifact.abi,
    address: addr,
    functionName: 'initialize',
    args: [roleManagerAddr, roleName, rolePrice],
    account: deployer.account!,
  })
  await publicClient.waitForTransactionReceipt({ hash: initTx })
  return addr
}

export async function addPerk(
  perkManagerAddr: Address,
  perkName: string,
  perkPrice: bigint,
  perkExpiration: bigint,
  perkCooldown: bigint,
  role: Address,
  deployer: Awaited<ReturnType<typeof viem.getWalletClient>>,
  walletClient: Awaited<ReturnType<typeof viem.getWalletClient>>,
  publicClient: Awaited<ReturnType<typeof viem.getPublicClient>>,
): Promise<void> {
  const txHash = await walletClient.writeContract({
    abi: perkManagerArtifact.abi,
    address: perkManagerAddr,
    functionName: 'addPerk',
    args: [perkName, perkPrice, perkExpiration, perkCooldown, role],
    account: deployer.account!,
  })
  await publicClient.waitForTransactionReceipt({ hash: txHash })
}

export async function addRole(
  roleManagerAddr: Address,
  role: Address,
  deployer: Awaited<ReturnType<typeof viem.getWalletClient>>,
  walletClient: Awaited<ReturnType<typeof viem.getWalletClient>>,
  publicClient: Awaited<ReturnType<typeof viem.getPublicClient>>,
): Promise<void> {
  const txHash = await walletClient.writeContract({
    abi: roleManagerArtifact.abi,
    address: roleManagerAddr,
    functionName: 'addRole',
    args: [role],
    account: deployer.account!,
  })
  await publicClient.waitForTransactionReceipt({ hash: txHash })
}
