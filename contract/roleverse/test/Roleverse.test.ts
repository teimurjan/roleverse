import {
  mine,
  SnapshotRestorer,
  takeSnapshot,
  time,
} from '@nomicfoundation/hardhat-network-helpers'
import { viem } from 'hardhat'
import {
  Account,
  isAddressEqual,
  keccak256,
  parseEther,
  toBytes,
  zeroAddress,
} from 'viem'
import { Address } from 'viem'

import {
  feeManagerArtifact,
  perkManagerArtifact,
  roleManagerArtifact,
  roleverseArtifact,
  setup,
} from '../utils-local'

describe('Roleverse', () => {
  let feeManagerAddress: Address,
    perkManagerAddress: Address,
    roleManagerAddress: Address,
    roleverseAddress: Address,
    wizardRoleAddress: Address,
    ninjaRoleAddress: Address,
    vikingRoleAddress: Address

  let deployer: Awaited<ReturnType<typeof viem.getWalletClient>>,
    alice: Awaited<ReturnType<typeof viem.getWalletClient>>,
    bob: Awaited<ReturnType<typeof viem.getWalletClient>>,
    charlie: Awaited<ReturnType<typeof viem.getWalletClient>>,
    extra: Awaited<ReturnType<typeof viem.getWalletClient>>

  let baseFee: bigint

  let constants: {
    PERK_WIZARD_BOOST: string
  }

  const expirationTimes: Record<string, number> = {}

  let publicClient: Awaited<ReturnType<(typeof viem)['getPublicClient']>>
  let walletClient: Awaited<ReturnType<(typeof viem)['getWalletClient']>>

  let snapshot: SnapshotRestorer | undefined = undefined

  const mint = async (account: Account) => {
    const txHash = await walletClient!.writeContract({
      abi: roleverseArtifact.abi,
      address: roleverseAddress,
      functionName: 'mint',
      args: [],
      account,
    })
    return publicClient!.waitForTransactionReceipt({ hash: txHash })
  }

  const setRole = async (account: Account, role: Address) => {
    const txHash = await walletClient!.writeContract({
      abi: roleManagerArtifact.abi,
      address: roleManagerAddress,
      functionName: 'setRole',
      args: [role],
      account,
      value: parseEther('0.01'),
    })
    return publicClient!.waitForTransactionReceipt({ hash: txHash })
  }

  const usePerk = async (account: Account, perkName: string, value: bigint) => {
    const perkKey = keccak256(toBytes(perkName))
    const txHash = await walletClient!.writeContract({
      abi: perkManagerArtifact.abi,
      address: perkManagerAddress,
      functionName: 'usePerk',
      args: [perkKey],
      account,
      value,
    })
    return publicClient!.waitForTransactionReceipt({ hash: txHash })
  }

  const hasActivePerk = async (owner: Address, perkName: string) => {
    const perkKey = keccak256(toBytes(perkName))

    return publicClient!.readContract({
      abi: perkManagerArtifact.abi,
      address: perkManagerAddress,
      functionName: 'isPerkActive',
      args: [owner, perkKey],
    })
  }

  const getRole = async (user: Address) => {
    return publicClient!.readContract({
      abi: roleManagerArtifact.abi,
      address: roleManagerAddress,
      functionName: 'userRoles',
      args: [user],
    })
  }

  const getTokenSupply = async (owner: Address) => {
    return publicClient!.readContract({
      abi: roleverseArtifact.abi,
      address: roleverseAddress,
      functionName: 'tokenSupply',
      args: [owner],
    })
  }

  const getBalance = async (owner: Address, account: Address) => {
    return publicClient!.readContract({
      abi: roleverseArtifact.abi,
      address: roleverseAddress,
      functionName: 'balances',
      args: [owner, account],
    })
  }

  const getBuyPrice = async (owner: Address) => {
    return publicClient!.readContract({
      abi: roleverseArtifact.abi,
      address: roleverseAddress,
      functionName: 'getBuyPrice',
      args: [owner],
    })
  }

  const buyShare = async (seller: Address, buyer: Account, value: bigint) => {
    const txHash = await walletClient!.writeContract({
      abi: roleverseArtifact.abi,
      address: roleverseAddress,
      functionName: 'buyShare',
      args: [seller],
      account: buyer,
      value,
    })
    return publicClient!.waitForTransactionReceipt({ hash: txHash })
  }

  const sellShare = async (seller: Address, sellerAccount: Account) => {
    const txHash = await walletClient!.writeContract({
      abi: roleverseArtifact.abi,
      address: roleverseAddress,
      functionName: 'sellShare',
      args: [seller],
      account: sellerAccount,
    })
    return publicClient!.waitForTransactionReceipt({ hash: txHash })
  }

  const getEffectiveFeePercent = async (from: Address, to: Address) => {
    return publicClient!.readContract({
      abi: feeManagerArtifact.abi,
      address: feeManagerAddress,
      functionName: 'getEffectiveFeePercent',
      args: [from, to],
    })
  }

  const addFee = async (fee: bigint, account: Account) => {
    const txHash = await walletClient!.writeContract({
      abi: feeManagerArtifact.abi,
      address: feeManagerAddress,
      functionName: 'addFee',
      args: [],
      value: fee,
      account,
    })
    return publicClient!.waitForTransactionReceipt({ hash: txHash })
  }

  const withdrawFees = async (account: Account) => {
    const txHash = await walletClient!.writeContract({
      abi: feeManagerArtifact.abi,
      address: feeManagerAddress,
      functionName: 'withdrawFees',
      args: [],
      account,
    })
    return publicClient!.waitForTransactionReceipt({ hash: txHash })
  }

  afterEach(async () => {
    if (snapshot) {
      await snapshot.restore()
    }
  })

  beforeEach(async () => {
    snapshot = await takeSnapshot()

    const result = await setup()

    baseFee = result.baseFee
    publicClient = result.publicClient
    walletClient = result.walletClient
    deployer = result.deployer
    feeManagerAddress = result.feeManagerAddress
    perkManagerAddress = result.perkManagerAddress
    roleManagerAddress = result.roleManagerAddress
    roleverseAddress = result.roleverseAddress
    ;[deployer, alice, bob, charlie, extra] = result.walletClients

    constants = result.constants

    wizardRoleAddress = result.wizardRoleAddress
    ninjaRoleAddress = result.ninjaRoleAddress
    vikingRoleAddress = result.vikingRoleAddress

    expirationTimes[constants.PERK_WIZARD_BOOST] = 30 * 60
  })

  test('FeeManager: returns base fee when no conditions met', async () => {
    const result = await getEffectiveFeePercent(
      alice.account.address,
      bob.account.address,
    )
    expect(result).toBe(baseFee)
  })

  test('FeeManager: applies wizard discount', async () => {
    await setRole(alice.account, wizardRoleAddress)
    await usePerk(
      alice.account,
      constants.PERK_WIZARD_BOOST,
      parseEther('0.0005'),
    )
    const result = await getEffectiveFeePercent(
      alice.account.address,
      bob.account.address,
    )
    const expectedFee = BigInt(Math.floor((Number(baseFee) * 93) / 100))
    expect(result).toBe(expectedFee)
  })

  test('FeeManager: applies ninja discount', async () => {
    await setRole(bob.account, ninjaRoleAddress)
    await setRole(charlie.account, ninjaRoleAddress)
    const result = await getEffectiveFeePercent(
      bob.account.address,
      charlie.account.address,
    )
    const expectedFee = BigInt(Math.floor((Number(baseFee) * 95) / 100))
    expect(result).toBe(expectedFee)
  })

  test('FeeManager: applies viking discount', async () => {
    await setRole(deployer.account, vikingRoleAddress)
    const result = await getEffectiveFeePercent(
      deployer.account.address,
      alice.account.address,
    )
    const expectedFee = BigInt(Math.floor((Number(baseFee) * 97) / 100))
    expect(result).toBe(expectedFee)
  })

  test('PerkManager: using perk registers active perk', async () => {
    await setRole(alice.account, wizardRoleAddress)
    await usePerk(
      alice.account,
      constants.PERK_WIZARD_BOOST,
      parseEther('0.0005'),
    )
    const active = await hasActivePerk(
      alice.account.address,
      constants.PERK_WIZARD_BOOST,
    )
    expect(active).toBe(true)
  })

  test('PerkManager: perk becomes inactive after expiration', async () => {
    await setRole(bob.account, wizardRoleAddress)
    await usePerk(
      bob.account,
      constants.PERK_WIZARD_BOOST,
      parseEther('0.0005'),
    )
    await time.increase(expirationTimes[constants.PERK_WIZARD_BOOST] + 60)
    await mine()
    const active = await hasActivePerk(
      bob.account.address,
      constants.PERK_WIZARD_BOOST,
    )
    expect(active).toBe(false)
  })

  test('RoleManager: user can set role with sufficient fee', async () => {
    await setRole(charlie.account, ninjaRoleAddress)
    const role = await getRole(charlie.account.address)
    expect(isAddressEqual(role, ninjaRoleAddress)).toBe(true)
  })

  test('Roleverse: minting token sets role if not set', async () => {
    await mint(extra.account)
    const supplyAfter = await getTokenSupply(extra.account.address)
    expect(supplyAfter).toBe(1n)
    const balance = await getBalance(
      extra.account.address,
      extra.account.address,
    )
    expect(balance).toBe(1n)
    const role = await getRole(extra.account.address)
    expect(role).toBe(zeroAddress)
  })

  test('Roleverse: cannot mint token twice', async () => {
    await mint(alice.account)
    await expect(mint(alice.account)).rejects.toThrow()
  })

  test('Roleverse: getBuyPrice and buyShare work correctly', async () => {
    await mint(alice.account)
    await mint(bob.account)
    const bondingCurveConstant = 1_000_000_000_000_000n
    const supplyBefore = await getTokenSupply(alice.account.address)
    const expectedBuyPrice = bondingCurveConstant * supplyBefore
    const buyPrice = await getBuyPrice(alice.account.address)
    expect(buyPrice).toBe(expectedBuyPrice)
    const effectiveFee = await getEffectiveFeePercent(
      bob.account.address,
      alice.account.address,
    )
    const feeValue = (buyPrice * effectiveFee) / 10000n
    const totalCost = buyPrice + feeValue
    await buyShare(alice.account.address, bob.account, totalCost)
    const supplyAfter = await getTokenSupply(alice.account.address)
    expect(supplyAfter).toBe(supplyBefore + 1n)
    const bobBalance = await getBalance(
      alice.account.address,
      bob.account.address,
    )
    expect(bobBalance).toBe(1n)
  })

  test('Roleverse: sellShare refunds correct amount', async () => {
    await mint(alice.account)
    await mint(bob.account)
    const bondingCurveConstant = 1_000_000_000_000_000n
    const supplyBefore = await getTokenSupply(alice.account.address)
    const buyPrice = bondingCurveConstant * supplyBefore
    const effectiveFee = await getEffectiveFeePercent(
      bob.account.address,
      alice.account.address,
    )
    const feeValue = (buyPrice * effectiveFee) / 10000n
    const totalCost = buyPrice + feeValue
    await buyShare(alice.account.address, bob.account, totalCost)
    const bobBalanceBefore = await publicClient!.getBalance({
      address: bob.account.address,
    })
    await sellShare(alice.account.address, bob.account)
    const refundBase = bondingCurveConstant * (supplyBefore - 1n)
    const feeOnSale = (refundBase * effectiveFee) / 10000n
    const expectedRefund = refundBase - feeOnSale
    const bobBalanceAfter = await publicClient!.getBalance({
      address: bob.account.address,
    })
    expect(bobBalanceAfter - bobBalanceBefore).toBeGreaterThanOrEqual(
      expectedRefund - 1_000_000_000_000n,
    )
    const supplyAfter = await getTokenSupply(alice.account.address)
    expect(supplyAfter).toBe(supplyBefore)
    const bobShare = await getBalance(
      alice.account.address,
      bob.account.address,
    )
    expect(bobShare).toBe(0n)
  })

  test('FeeManager: owner can withdraw collected fees', async () => {
    const feeToAdd = 1_000_000_000_000_000n
    await addFee(feeToAdd, deployer.account)
    const collectedFeesBefore = await publicClient!.readContract({
      abi: feeManagerArtifact.abi,
      address: feeManagerAddress,
      functionName: 'collectedFees',
      args: [],
    })
    expect(collectedFeesBefore).toBe(feeToAdd)
    const deployerBalanceBefore = await publicClient!.getBalance({
      address: deployer.account.address,
    })
    await withdrawFees(deployer.account)
    const collectedFeesAfter = await publicClient!.readContract({
      abi: feeManagerArtifact.abi,
      address: feeManagerAddress,
      functionName: 'collectedFees',
      args: [],
    })
    expect(collectedFeesAfter).toBe(0n)
    const deployerBalanceAfter = await publicClient!.getBalance({
      address: deployer.account.address,
    })
    expect(deployerBalanceAfter).toBeGreaterThan(deployerBalanceBefore)
  })
})
