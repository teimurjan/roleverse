import User from '@src/models/user'
import { Request, Response } from 'express'

export interface GQLContext {
  req: Request
  res: Response
  user?: User
}
