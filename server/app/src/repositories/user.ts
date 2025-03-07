import User from '@src/models/user'
import { Inject, Service } from 'typedi'
import { In, Repository } from 'typeorm'

@Service()
class UserRepository {
  constructor(
    @Inject('TypeormUserRepository') private ormRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    const entity = this.ormRepository.create({
      walletAddress: user.walletAddress,
      username: user.username,
    })
    await this.ormRepository.save(entity)
    return entity
  }

  async findById(id: string): Promise<User | null> {
    const entity = await this.ormRepository.findOne({ where: { id } })
    return entity
  }

  async findByWallet(walletAddress: string): Promise<User | null> {
    const entity = await this.ormRepository.findOne({
      where: { walletAddress },
    })
    return entity
  }

  async findByWallets(walletAddresses: string[]): Promise<User[]> {
    const entity = await this.ormRepository.find({
      where: { walletAddress: In(walletAddresses) },
    })
    return entity
  }

  async findByUsernames(usernames: string[]): Promise<User[]> {
    return await this.ormRepository.find({
      where: { username: In(usernames) },
    })
  }
}

export default UserRepository
