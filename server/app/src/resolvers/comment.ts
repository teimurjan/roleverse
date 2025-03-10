import AuthorizationMiddleware from '@src/middlewares/authorization'
import MintingMiddleware from '@src/middlewares/minting'
import Comment from '@src/models/comment'
import User from '@src/models/user'
import CommentService from '@src/services/comment'
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql'
import { Service } from 'typedi'

@Service()
@Resolver()
class CommentResolver {
  constructor(private commentService: CommentService) {}

  @Query(() => [Comment])
  @UseMiddleware(AuthorizationMiddleware, MintingMiddleware)
  async comments(
    @Arg('limit', () => Int, { defaultValue: 10 }) limit: number,
    @Arg('offset', () => Int, { defaultValue: 0 }) offset: number,
    @Arg('postId', () => String) postId: string,
  ): Promise<Comment[]> {
    return this.commentService.getComments(limit, offset, postId)
  }

  @Mutation(() => Comment)
  @UseMiddleware(AuthorizationMiddleware, MintingMiddleware)
  async createComment(
    @Arg('text') text: string,
    @Arg('postId') postId: string,
    @Ctx('user') user: User,
  ): Promise<Comment> {
    return await this.commentService.createComment(text, postId, user)
  }
}

export default CommentResolver
