import config from '@src/config'
import User from '@src/models/user'
import UserRepository from '@src/repositories/user'
import jwt from 'jsonwebtoken'
import { Service } from 'typedi'
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'

export class InvalidSignatureError extends Error {
  constructor() {
    const prototype = new.target.prototype
    super('Invalid signature: wallet address does not match')
    Object.setPrototypeOf(this, prototype)
  }
}

export class InvalidChallengeError extends Error {
  constructor() {
    const prototype = new.target.prototype
    super('Invalid challenge: challenge does not exist or has expired')
    Object.setPrototypeOf(this, prototype)
  }
}

export class UserAlreadyExistsError extends Error {
  constructor() {
    const prototype = new.target.prototype
    super('User exists: this wallet address is already registered')
    Object.setPrototypeOf(this, prototype)
  }
}

export class UserDoesNotExistError extends Error {
  constructor() {
    const prototype = new.target.prototype
    super('User does not exist: this wallet address is not registered')
    Object.setPrototypeOf(this, prototype)
  }
}

const challenges: Map<string, { challenge: string; createdAt: Date }> =
  new Map()

@Service()
class AuthService {
  constructor(private userRepo: UserRepository) {}

  async generateLoginChallenge(walletAddress: string): Promise<string> {
    const challenge = uuidv4()
    challenges.set(walletAddress.toLowerCase(), {
      challenge,
      createdAt: new Date(),
    })
    return challenge
  }

  private getChallenge(walletAddress: string): string | undefined {
    return challenges.get(walletAddress.toLowerCase())?.challenge
  }

  private clearChallenge(walletAddress: string): void {
    challenges.delete(walletAddress.toLowerCase())
  }

  async signIn(
    walletAddress: `0x${string}`,
    signature: `0x${string}`,
  ): Promise<User> {
    const challenge = this.getChallenge(walletAddress)
    if (!challenge) {
      throw new InvalidChallengeError()
    }

    const isVerifiedAddress = await verifyMessage({
      message: challenge,
      signature: signature,
      address: walletAddress,
    })
    if (!isVerifiedAddress) {
      throw new InvalidSignatureError()
    }

    const user = await this.userRepo.findByWallet(walletAddress.toLowerCase())
    if (!user) {
      throw new UserDoesNotExistError()
    }

    this.clearChallenge(walletAddress)

    return user
  }

  async register(
    walletAddress: `0x${string}`,
    username: string,
    signature: `0x${string}`,
  ): Promise<User> {
    const challenge = this.getChallenge(walletAddress)
    if (!challenge) {
      throw new InvalidChallengeError()
    }

    const isVerifiedAddress = await verifyMessage({
      message: challenge,
      signature,
      address: walletAddress,
    })
    if (!isVerifiedAddress) {
      throw new InvalidSignatureError()
    }

    const existingUser = await this.userRepo.findByWallet(
      walletAddress.toLowerCase(),
    )
    if (existingUser) {
      throw new UserAlreadyExistsError()
    }

    const user = new User()
    user.walletAddress = walletAddress.toLowerCase()
    user.username = username

    this.clearChallenge(walletAddress)

    return await this.userRepo.create(user)
  }

  encodeAccessToken = (user: User) => {
    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        walletAddress: user.walletAddress,
      },
      config.auth.jwt_secret,
      { expiresIn: '1d' },
    )
  }

  decodeAccessToken = async (accessToken: string) => {
    const decoded = jwt.verify(accessToken, config.auth.jwt_secret)
    if (typeof decoded === 'object' && decoded.id) {
      return await this.userRepo.findById(decoded.id)
    }
  }
}

export default AuthService
