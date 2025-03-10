import Comment from '@src/models/comment'
import Post from '@src/models/post'
import User from '@src/models/user'
import Container from 'typedi'
import { DataSource } from 'typeorm'

const setUpContainer = (db: DataSource) => {
  Container.set('TypeormUserRepository', db.getRepository(User))
  Container.set('TypeormPostRepository', db.getRepository(Post))
  Container.set('TypeormCommentRepository', db.getRepository(Comment))
}

export default setUpContainer
