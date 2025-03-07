import AuthorizationMiddleware from '@src/middlewares/authorization'
import User from '@src/models/user'
import UserFollowCount from '@src/models/user-follow-count'
import GraphService from '@src/services/graph'
import UserService from '@src/services/user'
import { Arg, Ctx, Int, Query, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'

@Service()
@Resolver()
class UserResolver {
  constructor(
    private userService: UserService,
    private graphService: GraphService,
  ) {}

  @Query(() => User)
  @UseMiddleware(AuthorizationMiddleware)
  async me(@Ctx('user') user: User): Promise<User | null> {
    return this.userService.getUser(user.id)
  }

  @Query(() => [User])
  @UseMiddleware(AuthorizationMiddleware)
  async followers(
    @Arg('walletAddress', () => String, { nullable: true })
    walletAddress: string | null,
    @Arg('limit', () => Int, { defaultValue: 10 }) limit: number,
    @Arg('offset', () => Int, { defaultValue: 0 }) offset: number,
    @Ctx('user') user: User,
  ): Promise<User[]> {
    return this.graphService.getFollowers(
      walletAddress ?? user.walletAddress,
      limit,
      offset,
    )
  }

  @Query(() => [User])
  @UseMiddleware(AuthorizationMiddleware)
  async following(
    @Arg('walletAddress', () => String, { nullable: true })
    walletAddress: string | null,
    @Arg('limit', () => Int, { defaultValue: 10 }) limit: number,
    @Arg('offset', () => Int, { defaultValue: 0 }) offset: number,
    @Ctx('user') user: User,
  ): Promise<User[]> {
    return this.graphService.getFollowing(
      walletAddress ?? user.walletAddress,
      limit,
      offset,
    )
  }

  @Query(() => UserFollowCount)
  @UseMiddleware(AuthorizationMiddleware)
  async followCount(
    @Arg('walletAddress', () => String, { nullable: true })
    walletAddress: string | null,
    @Ctx('user') user: User,
  ): Promise<UserFollowCount> {
    return this.graphService.getFollowCount(walletAddress ?? user.walletAddress)
  }
}

export default UserResolver
