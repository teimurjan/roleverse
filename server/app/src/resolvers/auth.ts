import config from '@src/config'
import AuthorizationMiddleware from '@src/middlewares/authorization'
import AuthService from '@src/services/auth'
import { GQLContext } from '@src/types/gql-context'
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'

@Service()
@Resolver()
class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Boolean)
  async register(
    @Arg('walletAddress') walletAddress: `0x${string}`,
    @Arg('username') username: string,
    @Arg('signature') signature: `0x${string}`,
    @Ctx() { res }: GQLContext,
  ): Promise<boolean> {
    const user = await this.authService.register(
      walletAddress,
      username,
      signature,
    )

    const token = this.authService.encodeAccessToken(user)

    res.cookie('token', token, {
      httpOnly: true,
      secure: config.environment === 'production',
      maxAge: 24 * 60 * 60 * 100,
      sameSite: config.environment === 'production' ? 'none' : 'lax',
    })

    return true
  }

  @Mutation(() => String)
  async generateChallenge(
    @Arg('walletAddress') walletAddress: string,
  ): Promise<string> {
    return await this.authService.generateLoginChallenge(walletAddress)
  }

  @Mutation(() => Boolean)
  async signIn(
    @Arg('walletAddress') walletAddress: `0x${string}`,
    @Arg('signature') signature: `0x${string}`,
    @Ctx() { res }: GQLContext,
  ): Promise<boolean> {
    const user = await this.authService.signIn(walletAddress, signature)

    const token = this.authService.encodeAccessToken(user)

    res.cookie('token', token, {
      httpOnly: true,
      secure: config.environment === 'production',
      maxAge: 24 * 60 * 60 * 100,
      sameSite: config.environment === 'production' ? 'none' : 'lax',
    })

    return true
  }

  @Mutation(() => Boolean)
  @UseMiddleware(AuthorizationMiddleware)
  async logOut(@Ctx() { res }: GQLContext): Promise<boolean> {
    res.cookie('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: config.environment === 'production' ? 'none' : 'lax',
      expires: new Date(0),
      path: '/',
    })

    return true
  }
}

export default AuthResolver
