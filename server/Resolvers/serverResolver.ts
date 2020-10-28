import { Arg, Mutation, PubSub, PubSubEngine, Query, Resolver, Root, Subscription } from 'type-graphql';
import mongoose from 'mongoose'
import { Server } from '../types/serverType';
import { Channels } from '../types/channelsType';
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

  @Mutation(() => Server)
  async addChannel(
    @PubSub() pubSub: PubSubEngine,
    @Arg('serverId') serverId: string,
    @Arg('channelName') channelName: string,
    @Arg('topic') topic: string
  ): Promise<Server> {
    const server = await Servers.findById(serverId)

    server.channels.push({
      id: mongoose.Types.ObjectId(),
      channelName: channelName,
      messages: []
    })

    await server.save()

    const payload: any = { server };
    await pubSub.publish(topic, payload);

    return server
  }

  @Query(() => Server)
  async getChannels(
    @Arg('serverId') serverId: string,
  ): Promise<Server | null> {
    const server = await Servers.findById(serverId)

    return server
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

  @Mutation(() => Boolean)
  async addMessage(
    @PubSub() pubSub: PubSubEngine,
    @Arg('serverId') serverId: string,
    @Arg('channelName') channelName: string,
    @Arg('userId') userId: string,
    @Arg('userName') userName: string,
    @Arg('text') text: string,
    @Arg('date') date: string,
    @Arg('time') time: string,
    @Arg('topic') topic: string
  ): Promise<Boolean> {
    const server = await Servers.findById(serverId)

    const channel = server.channels.find((c: any) => c.channelName === channelName)

    channel.messages.push({
      userName,
      userId,
      text,
      date,
      time
    })

    server.markModified('channels')

    await server.save()

    const payload: any = { channel };
    await pubSub.publish(topic, payload);

    return true
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

  @Subscription({
    topics: ({ args }) => args.topic,
  })
  subscriptionMessage(
    @Arg("topic") topic: string,
    @Root() { channel }: any,
  ): Channels { 
    return channel;
  }
}