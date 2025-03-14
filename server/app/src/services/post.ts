import Post from '@src/models/post'
import User from '@src/models/user'
import PostRepository from '@src/repositories/post'
import extractExternalLinks from '@src/utils/extract-external-links'
import extractTaggedUsernames from '@src/utils/extract-tagged-usernames'
import { Service } from 'typedi'

import GraphService from './graph'
import UserService from './user'

export class EmptyPostError extends Error {
  constructor() {
    const prototype = new.target.prototype
    super('Post text empty: text cannot be empty')
    Object.setPrototypeOf(this, prototype)
  }
}

export class PostNotFoundError extends Error {
  constructor() {
    const prototype = new.target.prototype
    super('Post not found: post does not exist')
    Object.setPrototypeOf(this, prototype)
  }
}

@Service()
class PostService {
  constructor(
    private postRepo: PostRepository,
    private userService: UserService,
    private graphService: GraphService,
  ) {}

  async createPost(text: string, user: User): Promise<Post> {
    if (!text || text.trim() === '') {
      throw new EmptyPostError()
    }

    const links = extractExternalLinks(text)
    const usernames = extractTaggedUsernames(text)

    const tags: User[] =
      usernames.length > 0
        ? await this.userService.getByUsernames(usernames)
        : []

    const post = new Post()
    post.text = text
    post.links = links
    post.tags = tags
    post.user = user

    return await this.postRepo.save(post)
  }

  async getLikedPosts(
    limit: number,
    offset: number,
    userId: string,
  ): Promise<Post[]> {
    return await this.postRepo.findAll(limit, offset, {
      likedUserIds: [userId],
    })
  }

  async getUserPosts(
    limit: number,
    offset: number,
    userId?: string,
  ): Promise<Post[]> {
    return await this.postRepo.findAll(limit, offset, {
      userIds: userId ? [userId] : undefined,
    })
  }

  async getPostSafe(postId: string): Promise<Post | null> {
    return await this.postRepo.findById(postId)
  }

  async getPost(postId: string): Promise<Post> {
    const post = await this.getPostSafe(postId)
    if (!post) {
      throw new PostNotFoundError()
    }

    return post
  }

  async like(postId: string, user: User): Promise<Post> {
    const post = await this.getPost(postId)
    const likes = post.likes ?? []

    const alreadyLiked = likes.some((userLiked) => userLiked.id === user.id)
    if (alreadyLiked) {
      return post
    }

    post.likes.push(user)

    await this.postRepo.save(post)

    return post
  }

  async unlike(postId: string, user: User): Promise<Post> {
    const post = await this.getPost(postId)
    const likes = post.likes ?? []

    post.likes = likes.filter((userLiked) => userLiked.id !== user.id)

    await this.postRepo.save(post)

    return post
  }

  async feed(limit: number, offset: number, user: User): Promise<Post[]> {
    const feedUserWalletAddresses: Set<string> = new Set([user.walletAddress])

    const graphUser = await this.graphService.getUser(user.walletAddress)
    const roleId = graphUser.user?.role?.id?.toLowerCase()
    const sameRoleUsers = roleId
      ? await this.graphService.getUsersByRole(roleId)
      : await this.graphService.getUserWithoutRoleSet()
    sameRoleUsers.users.forEach((user) => {
      feedUserWalletAddresses.add(user.id)
    })

    const following = await this.graphService.getFollowing(
      user.walletAddress,
      20,
      0,
    )
    following.forEach((user) => {
      feedUserWalletAddresses.add(user.walletAddress)
    })

    return await this.postRepo.findAll(limit, offset, {
      walletAddresses: Array.from(feedUserWalletAddresses),
    })
  }

  async explore(limit: number, offset: number, user: User): Promise<Post[]> {
    const feedUserWalletAddresses: Set<string> = new Set([])

    const graphUser = await this.graphService.getUser(user.walletAddress)
    const roleId = graphUser.user?.role?.id?.toLowerCase()
    if (roleId) {
      const otherRoleUsers =
        await this.graphService.getUsersByOmittingRole(roleId)
      const noRoleUsers = await this.graphService.getUserWithoutRoleSet()
      ;[...otherRoleUsers.users, ...noRoleUsers.users].forEach((user) => {
        feedUserWalletAddresses.add(user.id)
      })
    } else {
      const usersWithRoleSet = await this.graphService.getUserWithRoleSet()
      usersWithRoleSet.users.forEach((user) => {
        feedUserWalletAddresses.add(user.id)
      })
    }

    return await this.postRepo.findAll(limit, offset, {
      walletAddresses: Array.from(feedUserWalletAddresses),
    })
  }
}

export default PostService
