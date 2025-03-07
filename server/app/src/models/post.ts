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

import User from './user'

@ObjectType()
@Entity()
class Post {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string

  @Column('text')
  @Field(() => String)
  text: string

  @ManyToOne(() => User, { eager: true })
  @Field(() => User)
  user: User

  @ManyToMany(() => User, { eager: true })
  @JoinTable()
  @Field(() => [User], { nullable: true })
  likes: User[]

  @Column('text', { array: true, nullable: true })
  @Field(() => [String], { nullable: true })
  links?: string[]

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

export default Post
