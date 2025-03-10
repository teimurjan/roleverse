import User from '@src/models/user'
import UserRepository from '@src/repositories/user'
import { Service } from 'typedi'

export class UserNotFoundError extends Error {
  constructor() {
    const prototype = new.target.prototype
    super('User not found: user does not exist')
    Object.setPrototypeOf(this, prototype)
  }
}

@Service()
class UserService {
  constructor(private userRepo: UserRepository) {}

  async getUserSafe(userId: string): Promise<User | null> {
    return await this.userRepo.findById(userId)
  }

  async getUser(userId: string): Promise<User> {
    const user = await this.userRepo.findById(userId)
    if (!user) {
      throw new UserNotFoundError()
    }
    return user
  }

  async getByUsernames(usernames: string[]): Promise<User[]> {
    return await this.userRepo.findByUsernames(usernames)
  }
}

export default UserService
