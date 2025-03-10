import Comment from '@src/models/comment'
import User from '@src/models/user'
import CommentRepository from '@src/repositories/comment'
import extractTaggedUsernames from '@src/utils/extract-tagged-usernames'
import { Service } from 'typedi'

import PostService from './post'
import UserService from './user'

export class EmptyCommentError extends Error {
  constructor() {
    const prototype = new.target.prototype
    super('Comment text empty: text cannot be empty')
    Object.setPrototypeOf(this, prototype)
  }
}

@Service()
class CommentService {
  constructor(
    private commentRepo: CommentRepository,
    private userService: UserService,
    private postService: PostService,
  ) {}

  async createComment(
    text: string,
    postId: string,
    user: User,
  ): Promise<Comment> {
    if (!text || text.trim() === '') {
      throw new EmptyCommentError()
    }

    const usernames = extractTaggedUsernames(text)

    const tags: User[] =
      usernames.length > 0
        ? await this.userService.getByUsernames(usernames)
        : []

    const post = await this.postService.getPost(postId)

    const comment = new Comment()
    comment.text = text
    comment.tags = tags
    comment.user = user
    comment.post = Promise.resolve(post)

    return await this.commentRepo.save(comment)
  }

  async getComments(
    limit: number,
    offset: number,
    postId?: string,
  ): Promise<Comment[]> {
    return await this.commentRepo.findAll(limit, offset, {
      postIds: postId ? [postId] : undefined,
    })
  }
}

export default CommentService
