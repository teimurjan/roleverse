import AuthorizationMiddleware from '@src/middlewares/authorization'
import MintingMiddleware from '@src/middlewares/minting'
import Post from '@src/models/post'
import User from '@src/models/user'
import PostService from '@src/services/post'
import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql'
import { Service } from 'typedi'

@Service()
@Resolver(() => Post)
class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => [Post])
  @UseMiddleware(AuthorizationMiddleware, MintingMiddleware)
  async userPosts(
    @Arg('limit', () => Int, { defaultValue: 10 }) limit: number,
    @Arg('offset', () => Int, { defaultValue: 0 }) offset: number,
    @Arg('userId', () => String) userId: string,
  ): Promise<Post[]> {
    return this.postService.getUserPosts(limit, offset, userId)
  }

  @Query(() => [Post])
  @UseMiddleware(AuthorizationMiddleware, MintingMiddleware)
  async likedPosts(
    @Arg('limit', () => Int, { defaultValue: 10 }) limit: number,
    @Arg('offset', () => Int, { defaultValue: 0 }) offset: number,
    @Ctx('user') user: User,
  ): Promise<Post[]> {
    return this.postService.getLikedPosts(limit, offset, user.id)
  }

  @Query(() => Post)
  @UseMiddleware(AuthorizationMiddleware, MintingMiddleware)
  async post(@Arg('postId', () => String) postId: string): Promise<Post> {
    return this.postService.getPost(postId)
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
    return await this.postService.createPost(text, user)
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

  @FieldResolver(() => Int)
  likesCount(@Root() post: Post): number {
    return post.likes ? post.likes.length : 0
  }

  @FieldResolver(() => Boolean)
  isLiked(@Root() post: Post, @Ctx('user') user: User): boolean {
    if (!user) {
      return false
    }
    return post.likes
      ? post.likes.some((like: User) => like.id === user.id)
      : false
  }

  @FieldResolver(() => Int)
  async commentsCount(@Root() post: Post): Promise<number> {
    console.log(await post.comments)
    return (await post.comments)?.length ?? 0
  }
}

export default PostResolver
