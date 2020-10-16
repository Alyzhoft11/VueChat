import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Server } from '../types/serverType';
import Servers from '../MongoSchemas/Servers';
import Users from '../MongoSchemas/Users';

@Resolver()
export class ServerResolver {
  @Query(() => Server, { nullable: true })
  async server(@Arg('id') id: string): Promise<Server | undefined | null> {
    const server = await Servers.findOne({ _id: id });

    return server;
  }

  @Query(() => [Server], { nullable: true })
  async servers(@Arg('id', type => [String]) id: string[]): Promise<Server[] | undefined | null> {
    const servers = await Servers.find({_id: {$in: id}});
    return servers;
  }

  @Mutation(() => Server)
  async addServer(
    @Arg('serverName') serverName: string, 
    @Arg('imageURL') imageURL: string, 
    @Arg('ownerId') ownerId: string
  ): Promise<Server> {
    const server = new Servers({ serverName, imageURL, ownerId }); 
    await server.save();
    
    const user = await Users.findById(ownerId);

    user.servers.push(server.id)
    await user.save()

    return server
  }
}
