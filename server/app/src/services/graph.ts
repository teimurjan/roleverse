import config from '@src/config'
import { getSdk, Sdk } from '@src/generated/get-sdk'
import UserFollowCount from '@src/models/user-follow-count'
import UserRepository from '@src/repositories/user'
import { GraphQLClient } from 'graphql-request'
import { Service } from 'typedi'

export class RoleverseGraphqlEndpointMissingError extends Error {
  constructor() {
    const prototype = new.target.prototype
    super(
      'Roleverse GQL endpoint missing: please set ROLEVERSE_GRAPHQL_ENDPOINT',
    )
    Object.setPrototypeOf(this, prototype)
  }
}

@Service()
class GraphService {
  private sdk: Sdk

  constructor(private userRepo: UserRepository) {
    if (!config.graph.roleverse_graphql_endpoint) {
      throw new RoleverseGraphqlEndpointMissingError()
    }
    const client = new GraphQLClient(config.graph.roleverse_graphql_endpoint)
    this.sdk = getSdk(client)
  }

  async getFollowers(walletAddress: string, limit: number, offset: number) {
    const tokenHolders = await this.sdk.GetTokenHolders({
      walletAddress: walletAddress.toLowerCase(),
      limit,
      offset,
    })

    return await this.userRepo.findByWallets(
      tokenHolders.tokenOwnerships.map(
        (ownership) => ownership.owner.token.address,
      ),
    )
  }

  async getFollowing(walletAddress: string, limit: number, offset: number) {
    const tokenHolders = await this.sdk.GetTokenHoldings({
      walletAddress: walletAddress.toLowerCase(),
      limit,
      offset,
    })

    return await this.userRepo.findByWallets(
      tokenHolders.tokenOwnerships.map(
        (ownership) => ownership.owner.token.address,
      ),
    )
  }

  async getFollowCount(walletAddress: string) {
    const holdingHoldersCount = await this.sdk.GetHoldingHoldersCount({
      walletAddress: walletAddress.toLowerCase(),
    })

    const followCount = new UserFollowCount()
    followCount.followers = holdingHoldersCount.user?.holders
    followCount.following = holdingHoldersCount.user?.holdings

    return followCount
  }

  async getUser(walletAddress: string) {
    const user = await this.sdk.GetUser({
      walletAddress: walletAddress.toLowerCase(),
    })

    return user
  }

  async getToken(walletAddress: string) {
    const user = await this.sdk.GetToken({
      walletAddress: walletAddress.toLowerCase(),
    })

    return user
  }

  async getUsersByRole(role: string) {
    const users = await this.sdk.GetUsersByRole({
      role,
    })

    return users
  }

  async getUsersByOmittingRole(role: string) {
    const users = await this.sdk.GetUsersByOmittingRole({
      role,
    })

    return users
  }

  async getUserWithRoleSet() {
    const users = await this.sdk.GetUsersWithRoleSet()

    return users
  }

  async getUserWithoutRoleSet() {
    const users = await this.sdk.GetUsersWithoutRoleSet()

    return users
  }
}

export default GraphService
