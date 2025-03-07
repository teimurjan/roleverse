import User from '@src/models/user'
import UserRepository from '@src/repositories/user'
import { Service } from 'typedi'

@Service()
class UserService {
  constructor(private userRepo: UserRepository) {}

  async getUser(userId: string): Promise<User | null> {
    return await this.userRepo.findById(userId)
  }
}

export default UserService
