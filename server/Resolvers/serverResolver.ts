import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Server } from '../types/serverType';
import Servers from '../MongoSchemas/Servers';

@Resolver()
export class ServerResolver {
  @Query(() => Server, { nullable: true })
  async message(@Arg('id') id: string): Promise<Server | undefined | null> {
    const server = await Servers.findOne({ _id: id });

    return server;
  }

  @Query(() => [Server], { nullable: true })
  async servers(@Arg('userId') userId: string): Promise<Server[] | undefined | null> {
    const servers = await Servers.find({ userId });

    return servers;
  }

  @Mutation(() => Server)
  async addServer(
    @Arg('serverName') serverName: string, 
    @Arg('imageURL') imageURL: string, 
    @Arg('ownerId') ownerId: string
  ): Promise<Server> {
    const server = new Servers({ serverName, imageURL, ownerId });
    return await server.save();
  }
}
