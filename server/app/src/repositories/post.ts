import Post from '@src/models/post'
import { Inject, Service } from 'typedi'
import { FindOptionsWhere, In, Repository } from 'typeorm'

interface FindAllFilter {
  liker?: string
  walletAddresses?: string[]
}

@Service()
class PostRepository {
  constructor(
    @Inject('TypeormPostRepository')
    private ormRepository: Repository<Post>,
  ) {}

  async create(post: Post): Promise<Post> {
    const entity = this.ormRepository.create({
      text: post.text,
      links: post.links,
      tags: post.tags,
      user: post.user,
    })
    await this.ormRepository.save(entity)
    return entity
  }

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

    if (filter.liker) {
      where.push({ likes: { id: In([filter.liker]) } })
    }

    if (filter.walletAddresses) {
      where.push({
        user: { walletAddress: In(filter.walletAddresses) },
      })
    }

    return where
  }
}

export default PostRepository
