import Post from '@src/models/post'
import User from '@src/models/user'
import PostRepository from '@src/repositories/post'
import UserRepository from '@src/repositories/user'
import { Service } from 'typedi'

import GraphService from './graph'

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

function extractExternalLinks(text: string): string[] {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  const matches = text.match(urlRegex)
  return matches || []
}

function extractTaggedUsernames(text: string): string[] {
  const tagRegex = /@(\w+)/g
  const usernames = new Set<string>()
  let match
  while ((match = tagRegex.exec(text)) !== null) {
    usernames.add(match[1])
  }
  return Array.from(usernames)
}

@Service()
class PostService {
  constructor(
    private postRepo: PostRepository,
    private userRepo: UserRepository,
    private graphService: GraphService,
  ) {}

  async createPost(text: string, user: User): Promise<Post> {
    if (!text || text.trim() === '') {
      throw new EmptyPostError()
    }

    const links = extractExternalLinks(text)
    const usernames = extractTaggedUsernames(text)

    const tags: User[] =
      usernames.length > 0 ? await this.userRepo.findByUsernames(usernames) : []

    const post = new Post()
    post.text = text
    post.links = links
    post.tags = tags
    post.user = user

    return await this.postRepo.create(post)
  }

  async getPosts(limit: number, offset: number, liker?: User): Promise<Post[]> {
    return await this.postRepo.findAll(
      limit,
      offset,
      liker
        ? {
            liker: liker.id,
          }
        : undefined,
    )
  }

  async like(postId: string, user: User): Promise<Post> {
    const post = await this.postRepo.findById(postId)
    if (!post) {
      throw new PostNotFoundError()
    }
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
    const post = await this.postRepo.findById(postId)
    if (!post) {
      throw new PostNotFoundError()
    }
    const likes = post.likes ?? []

    post.likes = likes.filter((userLiked) => userLiked.id !== user.id)

    await this.postRepo.save(post)

    return post
  }

  async feed(limit: number, offset: number, user: User): Promise<Post[]> {
    const feedUserWalletAddresses: Set<string> = new Set([user.walletAddress])

    const graphUser = await this.graphService.getUser(user.walletAddress)
    const roleId = graphUser.user?.role?.id
    if (roleId) {
      const sameRoleUsers = await this.graphService.getUsersByRole(roleId)
      sameRoleUsers.users.forEach((user) => {
        feedUserWalletAddresses.add(user.id)
      })
    }

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
    const roleId = graphUser.user?.role?.id
    if (roleId) {
      const otherRoleUsers =
        await this.graphService.getUsersByOmittingRole(roleId)
      otherRoleUsers.users.forEach((user) => {
        feedUserWalletAddresses.add(user.id)
      })
    }

    return await this.postRepo.findAll(limit, offset, {
      walletAddresses: Array.from(feedUserWalletAddresses),
    })
  }
}

export default PostService
