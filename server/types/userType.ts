import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  userName: string;

  @Field()
  email: string;

  password: string;
}
