import { ObjectType, Field } from 'type-graphql';
import { Message } from './messageType'


@ObjectType()
export class Channels {
    @Field(type => String)
    channelName: string;

    @Field(type => [Message])
    messages: Message[]
}