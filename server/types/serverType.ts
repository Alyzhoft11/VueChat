import { ObjectType, Field } from 'type-graphql';
import { Channels } from './channelsType'

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

  @Field(type => [Channels])
  channels: Channels[]
}
