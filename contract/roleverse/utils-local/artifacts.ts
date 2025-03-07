import fs from 'fs'
import { Artifact } from 'hardhat/types'
import path from 'path'
import { Address } from 'viem'

import {
  ConstantsABI,
  FeeManagerUpgradeableABI,
  NinjaRoleABI,
  PerkManagerUpgradeableABI,
  RoleManagerUpgradeableABI,
  RoleverseUpgradeableABI,
  VikingRoleABI,
  WizardRoleABI,
} from '..'

export type ConstantsArtifact = Omit<Artifact, 'bytecode' | 'abi'> & {
  bytecode: Address
  abi: typeof ConstantsABI
}
export type FeeManagerArtifact = Omit<Artifact, 'bytecode' | 'abi'> & {
  bytecode: Address
  abi: typeof FeeManagerUpgradeableABI
}
export type PerkManagerArtifact = Omit<Artifact, 'bytecode' | 'abi'> & {
  bytecode: Address
  abi: typeof PerkManagerUpgradeableABI
}
export type RoleManagerArtifact = Omit<Artifact, 'bytecode' | 'abi'> & {
  bytecode: Address
  abi: typeof RoleManagerUpgradeableABI
}
export type RoleverseArtifact = Omit<Artifact, 'bytecode' | 'abi'> & {
  bytecode: Address
  abi: typeof RoleverseUpgradeableABI
}
export type WizardRoleArtifact = Omit<Artifact, 'bytecode' | 'abi'> & {
  bytecode: Address
  abi: typeof WizardRoleABI
}
export type NinjaRoleArtifact = Omit<Artifact, 'bytecode' | 'abi'> & {
  bytecode: Address
  abi: typeof NinjaRoleABI
}
export type VikingRoleArtifact = Omit<Artifact, 'bytecode' | 'abi'> & {
  bytecode: Address
  abi: typeof VikingRoleABI
}

export const constantsArtifact = JSON.parse(
  fs.readFileSync(
    path.resolve(
      __dirname,
      '../artifacts/contracts/Constants.sol/Constants.json',
    ),
    'utf8',
  ),
) as ConstantsArtifact

export const feeManagerArtifact = JSON.parse(
  fs.readFileSync(
    path.resolve(
      __dirname,
      '../artifacts/contracts/FeeManagerUpgradeable.sol/FeeManagerUpgradeable.json',
    ),
    'utf8',
  ),
) as FeeManagerArtifact

export const perkManagerArtifact = JSON.parse(
  fs.readFileSync(
    path.resolve(
      __dirname,
      '../artifacts/contracts/PerkManagerUpgradeable.sol/PerkManagerUpgradeable.json',
    ),
    'utf8',
  ),
) as PerkManagerArtifact

export const roleManagerArtifact = JSON.parse(
  fs.readFileSync(
    path.resolve(
      __dirname,
      '../artifacts/contracts/RoleManagerUpgradeable.sol/RoleManagerUpgradeable.json',
    ),
    'utf8',
  ),
) as RoleManagerArtifact

export const roleverseArtifact = JSON.parse(
  fs.readFileSync(
    path.resolve(
      __dirname,
      '../artifacts/contracts/RoleverseUpgradeable.sol/RoleverseUpgradeable.json',
    ),
    'utf8',
  ),
) as RoleverseArtifact

export const wizardRoleArtifact = JSON.parse(
  fs.readFileSync(
    path.resolve(
      __dirname,
      '../artifacts/contracts/WizardRole.sol/WizardRole.json',
    ),
    'utf8',
  ),
) as WizardRoleArtifact

export const ninjaRoleArtifact = JSON.parse(
  fs.readFileSync(
    path.resolve(
      __dirname,
      '../artifacts/contracts/NinjaRole.sol/NinjaRole.json',
    ),
    'utf8',
  ),
) as NinjaRoleArtifact

export const vikingRoleArtifact = JSON.parse(
  fs.readFileSync(
    path.resolve(
      __dirname,
      '../artifacts/contracts/VikingRole.sol/VikingRole.json',
    ),
    'utf8',
  ),
) as VikingRoleArtifact
