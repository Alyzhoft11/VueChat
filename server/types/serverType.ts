import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Server {
  @Field()
  id: string;

  @Field()
  serverName: string;

  @Field()
  imageURL: string;

  @Field()
  ownerId: string
}
