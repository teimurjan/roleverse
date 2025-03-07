import config from '@src/config'
import Post from '@src/models/post'
import User from '@src/models/user'
import { DataSource } from 'typeorm'

const setUpDb = async () => {
  const db = new DataSource({
    type: 'postgres',
    host: config.db.host,
    port: Number(config.db.port),
    username: config.db.username,
    password: config.db.password,
    database: config.db.name,
    entities: [User, Post],
    synchronize: config.environment === 'development',
    logging: false,
  })

  await db.initialize()

  return db
}

export default setUpDb
