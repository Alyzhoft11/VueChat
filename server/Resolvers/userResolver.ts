import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../types/userType';
import Users from '../MongoSchemas/Users';

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async userByUserName(
    @Arg('userName') userName: string,
    @Arg('password') password: string
    ): Promise<User | undefined | null> {
    const user = await Users.findOne({ userName, password });

    return user;
  }

  @Query(() => User, { nullable: true })
  async userByUserId(@Arg('id') id: string): Promise<User | undefined | null> {
    const user = await Users.findOne({ _id: id });

    return user;
  }

  @Mutation(() => User)
  async createUser(@Arg('userName') userName: string, @Arg('password') password: string, @Arg('email') email: string): Promise<User> {
    const user = new Users({ userName, password, email });
    return await user.save();
  }

  @Mutation(() => User)
  async deleteUser(@Arg('id') id: string): Promise<Boolean> {
    await Users.deleteOne({ _id: id });
    return true;
  }
}
