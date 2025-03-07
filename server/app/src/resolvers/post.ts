import AuthorizationMiddleware from '@src/middlewares/authorization'
import MintingMiddleware from '@src/middlewares/minting'
import Post from '@src/models/post'
import User from '@src/models/user'
import PostService from '@src/services/post'
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
class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => [Post])
  @UseMiddleware(AuthorizationMiddleware, MintingMiddleware)
  async posts(
    @Arg('limit', () => Int, { defaultValue: 10 }) limit: number,
    @Arg('offset', () => Int, { defaultValue: 0 }) offset: number,
    @Arg('liked', () => Boolean, { defaultValue: false }) liked: boolean,
    @Ctx('user') user: User,
  ): Promise<Post[]> {
    return this.postService.getPosts(limit, offset, liked ? user : undefined)
  }

  @Query(() => [Post])
  @UseMiddleware(AuthorizationMiddleware, MintingMiddleware)
  async feed(
    @Arg('limit', () => Int, { defaultValue: 10 }) limit: number,
    @Arg('offset', () => Int, { defaultValue: 0 }) offset: number,
    @Ctx('user') user: User,
  ): Promise<Post[]> {
    return this.postService.feed(limit, offset, user)
  }

  @Query(() => [Post])
  @UseMiddleware(AuthorizationMiddleware, MintingMiddleware)
  async explore(
    @Arg('limit', () => Int, { defaultValue: 10 }) limit: number,
    @Arg('offset', () => Int, { defaultValue: 0 }) offset: number,
    @Ctx('user') user: User,
  ): Promise<Post[]> {
    return this.postService.explore(limit, offset, user)
  }

  @Mutation(() => Post)
  @UseMiddleware(AuthorizationMiddleware, MintingMiddleware)
  async createPost(
    @Arg('text') text: string,
    @Ctx('user') user: User,
  ): Promise<Post> {
    const post = await this.postService.createPost(text, user)
    console.log(post)
    return post
  }

  @Mutation(() => Post)
  @UseMiddleware(AuthorizationMiddleware, MintingMiddleware)
  async likePost(
    @Arg('postId') postId: string,
    @Ctx('user') user: User,
  ): Promise<Post> {
    return this.postService.like(postId, user)
  }

  @Mutation(() => Post)
  @UseMiddleware(AuthorizationMiddleware, MintingMiddleware)
  async unlikePost(
    @Arg('postId') postId: string,
    @Ctx('user') user: User,
  ): Promise<Post> {
    return this.postService.unlike(postId, user)
  }
}

export default PostResolver
