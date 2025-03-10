import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import Post from './post'
import User from './user'

@ObjectType()
@Entity()
class Comment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string

  @Column('text')
  @Field(() => String)
  text: string

  @ManyToOne(() => User, { eager: true })
  @Field(() => User)
  user: User

  @ManyToOne(() => Post, { lazy: true })
  post: Promise<Post>

  @ManyToMany(() => User, { eager: true })
  @JoinTable()
  @Field(() => [User], { nullable: true })
  tags?: User[]

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date

  @UpdateDateColumn()
  @Field()
  updatedAt: Date
}

export default Comment
