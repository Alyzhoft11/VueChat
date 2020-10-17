import { ObjectType, Field } from 'type-graphql';


@ObjectType()
export class Channels {
    @Field(type => String)
    channelName: string;
}