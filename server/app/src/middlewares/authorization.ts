import { ApolloServerErrorCode } from '@apollo/server/errors'
import AuthService from '@src/services/auth'
import { GQLContext } from '@src/types/gql-context'
import { GraphQLError } from 'graphql'
import { MiddlewareFn } from 'type-graphql'
import { Container } from 'typedi'

const AuthorizationMiddleware: MiddlewareFn<GQLContext> = async (
  { context },
  next,
) => {
  const accessToken = context.req.cookies?.token

  if (!accessToken) {
    throw new GraphQLError('Unauthorized: no token provided', {
      extensions: { code: ApolloServerErrorCode.BAD_REQUEST },
    })
  }

  try {
    const authService = Container.get(AuthService)
    const user = await authService.decodeAccessToken(accessToken)
    if (!user) {
      throw new Error()
    }

    context.user = user
    return next()
  } catch (_e) {
    context.res.clearCookie('token')
    throw new GraphQLError('Unauthorized: invalid token', {
      extensions: { code: ApolloServerErrorCode.BAD_REQUEST },
    })
  }
}

export default AuthorizationMiddleware
