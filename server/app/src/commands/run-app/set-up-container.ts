import Post from '@src/models/post'
import User from '@src/models/user'
import Container from 'typedi'
import { DataSource } from 'typeorm'

const setUpContainer = (db: DataSource) => {
  Container.set('TypeormUserRepository', db.getRepository(User))
  Container.set('TypeormPostRepository', db.getRepository(Post))
}

export default setUpContainer
