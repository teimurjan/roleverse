import Comment from '@src/models/comment'
import { Inject, Service } from 'typedi'
import { FindOptionsWhere, In, Repository } from 'typeorm'

export interface FindAllFilter {
  postIds?: string[]
}

@Service()
class CommentRepository {
  constructor(
    @Inject('TypeormCommentRepository')
    private ormRepository: Repository<Comment>,
  ) {}

  async update(comment: Comment): Promise<Comment> {
    await this.ormRepository.update(comment.id, comment)
    return comment
  }

  async save(comment: Comment): Promise<Comment> {
    await this.ormRepository.save(comment)
    return comment
  }

  async findById(id: string): Promise<Comment | null> {
    const entity = await this.ormRepository.findOne({ where: { id } })
    return entity
  }

  async findAll(
    limit: number,
    offset: number,
    filter?: FindAllFilter,
  ): Promise<Comment[]> {
    const comments = await this.ormRepository.find({
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
      where: this.getFindAllWhereOptions(filter),
    })
    return comments
  }

  private getFindAllWhereOptions(
    filter?: FindAllFilter,
  ): FindOptionsWhere<Comment>[] {
    if (!filter) {
      return []
    }

    const where: FindOptionsWhere<Comment>[] = []

    if (filter.postIds) {
      where.push({ post: { id: In(filter.postIds) } })
    }

    return where
  }
}

export default CommentRepository
