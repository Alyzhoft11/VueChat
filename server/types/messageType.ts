import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Message {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field()
  text: string;
}
