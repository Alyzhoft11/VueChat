import { ObjectType, Field } from 'type-graphql';

type Server = {
  id: string
}

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  userName: string;

  @Field()
  email: string;

  @Field(() => [String])
  servers: string[]

  password: string;
}
