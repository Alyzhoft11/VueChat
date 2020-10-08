import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Message } from '../types/messageType';
import Messages from '../MongoSchemas/Messages';

@Resolver()
export class MessageResolver {
  @Query(() => Message, { nullable: true })
  async message(@Arg('id') id: string): Promise<Message | undefined | null> {
    const message = await Messages.findOne({ _id: id });

    return message;
  }

  @Query(() => [Message], { nullable: true })
  async messages(@Arg('userId') userId: string): Promise<Message[] | undefined | null> {
    const messages = await Messages.find({ userId });

    return messages;
  }

  @Mutation(() => Message)
  async addMessage(@Arg('userId') userId: string, @Arg('text') text: string): Promise<Message> {
    const message = new Messages({ userId, text });
    return await message.save();
  }
}
