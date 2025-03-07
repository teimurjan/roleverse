import { viem } from 'hardhat'
import { parseEther, zeroAddress } from 'viem'

import {
  addPerk,
  addRole,
  deployAndInitializeFeeManager,
  deployAndInitializeNinjaRole,
  deployAndInitializePerkManager,
  deployAndInitializeRoleManager,
  deployAndInitializeRoleverse,
  deployAndInitializeVikingRole,
  deployAndInitializeWizardRole,
  deployConstants,
  loadConstants,
  setFeeManagerReferences,
} from '../utils-local'

const setup = async () => {
  const baseFee = 100n // e.g. 100 basis points = 1%

  const publicClient = await viem.getPublicClient()
  const walletClient = await viem.getWalletClient(zeroAddress)

  const walletClients = await viem.getWalletClients()
  const [deployer] = walletClients

  const constantsAddress = await deployConstants(
    deployer,
    walletClient,
    publicClient,
  )

  const feeManagerAddress = await deployAndInitializeFeeManager(
    baseFee,
    deployer,
    walletClient,
    publicClient,
  )

  const roleManagerAddress = await deployAndInitializeRoleManager(
    feeManagerAddress,
    deployer,
    walletClient,
    publicClient,
  )

  const perkManagerAddress = await deployAndInitializePerkManager(
    roleManagerAddress,
    deployer,
    walletClient,
    publicClient,
  )

  const constants = await loadConstants(constantsAddress, publicClient)

  await setFeeManagerReferences(
    feeManagerAddress,
    roleManagerAddress,
    deployer,
    walletClient,
    publicClient,
  )

  const roleverseAddress = await deployAndInitializeRoleverse(
    feeManagerAddress,
    deployer,
    walletClient,
    publicClient,
  )

  const wizardRoleAddress = await deployAndInitializeWizardRole(
    perkManagerAddress,
    'Wizard',
    parseEther('0.01'),
    deployer,
    walletClient,
    publicClient,
  )

  const ninjaRoleAddress = await deployAndInitializeNinjaRole(
    roleManagerAddress,
    'Ninja',
    parseEther('0.01'),
    deployer,
    walletClient,
    publicClient,
  )

  const vikingRoleAddress = await deployAndInitializeVikingRole(
    roleManagerAddress,
    'Viking',
    parseEther('0.01'),
    deployer,
    walletClient,
    publicClient,
  )

  const expirationTime = 30n * 60n
  const cooldownTime = 60n * 60n * 24n

  await addPerk(
    perkManagerAddress,
    constants.PERK_WIZARD_BOOST,
    parseEther('0.0005'),
    expirationTime,
    cooldownTime,
    wizardRoleAddress,
    deployer,
    walletClient,
    publicClient,
  )

  await addRole(
    roleManagerAddress,
    wizardRoleAddress,
    deployer,
    walletClient,
    publicClient,
  )

  await addRole(
    roleManagerAddress,
    ninjaRoleAddress,
    deployer,
    walletClient,
    publicClient,
  )

  await addRole(
    roleManagerAddress,
    vikingRoleAddress,
    deployer,
    walletClient,
    publicClient,
  )

  return {
    baseFee,
    publicClient,
    walletClient,
    walletClients,
    deployer,
    constantsAddress,
    feeManagerAddress,
    perkManagerAddress,
    roleManagerAddress,
    constants,
    wizardRoleAddress,
    ninjaRoleAddress,
    vikingRoleAddress,
    roleverseAddress,
  }
}

export default setup
