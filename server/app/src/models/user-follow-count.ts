import { Field, ObjectType } from 'type-graphql'

@ObjectType()
class UserFollowCount {
  @Field()
  following: number

  @Field()
  followers: number
}

export default UserFollowCount
