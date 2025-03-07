import { ApolloServerErrorCode } from '@apollo/server/errors'
import GraphService from '@src/services/graph'
import { GQLContext } from '@src/types/gql-context'
import { GraphQLError } from 'graphql'
import { MiddlewareFn } from 'type-graphql'
import { Container } from 'typedi'

const MintingMiddleware: MiddlewareFn<GQLContext> = async (
  { context },
  next,
) => {
  if (!context.user) {
    throw new GraphQLError('Unauthorized: no user provided', {
      extensions: { code: ApolloServerErrorCode.BAD_REQUEST },
    })
  }

  try {
    const graphService = Container.get(GraphService)

    const token = await graphService.getToken(context.user.walletAddress)
    if (!token.token || token.token.supply === 0) {
      throw new GraphQLError('Unauthorized: no token minted', {
        extensions: { code: ApolloServerErrorCode.BAD_REQUEST },
      })
    }

    return next()
  } catch (_e) {
    throw new GraphQLError('Unauthorized: invalid token', {
      extensions: { code: ApolloServerErrorCode.BAD_REQUEST },
    })
  }
}

export default MintingMiddleware
