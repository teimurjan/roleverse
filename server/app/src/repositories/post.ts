import Post from '@src/models/post'
import { Inject, Service } from 'typedi'
import { FindOptionsWhere, In, Repository } from 'typeorm'

export interface FindAllFilter {
  likedUserIds?: string[]
  walletAddresses?: string[]
  userIds?: string[]
}

@Service()
class PostRepository {
  constructor(
    @Inject('TypeormPostRepository')
    private ormRepository: Repository<Post>,
  ) {}

  async update(post: Post): Promise<Post> {
    await this.ormRepository.update(post.id, post)
    return post
  }

  async save(post: Post): Promise<Post> {
    await this.ormRepository.save(post)
    return post
  }

  async findById(id: string): Promise<Post | null> {
    const entity = await this.ormRepository.findOne({ where: { id } })
    return entity
  }

  async findAll(
    limit: number,
    offset: number,
    filter?: FindAllFilter,
  ): Promise<Post[]> {
    const posts = await this.ormRepository.find({
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
      where: this.getFindAllWhereOptions(filter),
    })
    return posts
  }

  private getFindAllWhereOptions(
    filter?: FindAllFilter,
  ): FindOptionsWhere<Post>[] {
    if (!filter) {
      return []
    }

    const where: FindOptionsWhere<Post>[] = []

    if (filter.likedUserIds) {
      where.push({ likes: { id: In(filter.likedUserIds) } })
    }

    if (filter.walletAddresses) {
      where.push({
        user: { walletAddress: In(filter.walletAddresses) },
      })
    }

    if (filter.userIds) {
      where.push({
        user: { id: In(filter.userIds) },
      })
    }

    return where
  }
}

export default PostRepository
