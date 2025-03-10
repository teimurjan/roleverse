import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import Comment from './comment'
import Post from './post'

@Entity()
@ObjectType()
class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string

  @Column({ unique: true })
  @Field()
  walletAddress: string

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[]

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[]

  @Column({ unique: true })
  @Field()
  username: string

  @CreateDateColumn()
  @Field()
  createdAt: Date

  @UpdateDateColumn()
  @Field()
  updatedAt: Date
}

export default User
