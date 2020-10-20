import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Message {
  @Field()
  userId: string;

  @Field()
  userName: string;

  @Field()
  text: string;

  @Field()
  date: string;

  @Field()
  time: string
}
