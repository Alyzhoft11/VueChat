import { Arg, Mutation, PubSub, PubSubEngine, Query, Resolver, Root, Subscription } from 'type-graphql';
import { Server } from '../types/serverType';
import { Channels } from '../types/channelsType';
import { Message } from '../types/messageType';
import Servers from '../MongoSchemas/Servers';
import Users from '../MongoSchemas/Users';
import { ARRAY_CONTAINS } from 'class-validator';

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

  @Mutation(() => Server)
  async addChannel(
    @PubSub() pubSub: PubSubEngine,
    @Arg('serverId') serverId: string,
    @Arg('channelName') channelName: string,
    @Arg('topic') topic: string
  ): Promise<Server> {
    const server = await Servers.findById(serverId)

    server.channels.push({
      channelName: channelName,
      messages: []
    })

    await server.save()

    const payload: any = { server };
    await pubSub.publish(topic, payload);

    return server
  }

  @Query(() => [Channels])
  async getChannels(
    @Arg('serverId') serverId: string,
  ): Promise<Channels[] | null> {
    const server = await Servers.findById(serverId)

    const channels = server.channels

    return channels
  }

  @Query(() => Channels)
  async getMessages(
    @Arg('serverId') serverId: string,
    @Arg('channelName') channelName: string,
  ): Promise<Channels> {
    const server = await Servers.findById(serverId)

    const channel = server.channels.find((c: any) => c.channelName === channelName)

    return channel
  }

  @Mutation(() => Message)
  async addMessage(
    @Arg('serverId') serverId: string,
    @Arg('channelName') channelName: string,
    @Arg('userId') userId: string,
    @Arg('userName') userName: string,
    @Arg('text') text: string,
    @Arg('date') date: string,
    @Arg('time') time: string
  ): Promise<Message> {
    const server = await Servers.findById(serverId)

    server.channels.find((c: any) => c.channelName === channelName).messages.push({
      userName,
      userId,
      text,
      date,
      time
    })

    server.markModified('channels')

    await server.save()

    const message = {
      userName,
      userId,
      text,
      date,
      time
    }

    return message
  }

  @Subscription({
    topics: ({ args }) => args.topic,
  })
  subscriptionChannel(
    @Arg("topic") topic: string,
    @Root() { server }: any,
  ): Server { 
    return server;
  }
}