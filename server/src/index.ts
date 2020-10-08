import 'reflect-metadata';
import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { buildSchema } from 'type-graphql';
import { UserResolver } from '../Resolvers/userResolver';
import { MessageResolver } from '../Resolvers/messageResolver';

const startServer = async () => {
  const app = express();

  const schema = await buildSchema({
    resolvers: [UserResolver, MessageResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
  });

  const server = new ApolloServer({ schema });

  server.applyMiddleware({ app });

  await mongoose.connect('mongodb://localhost/vueChat', { useNewUrlParser: true, useUnifiedTopology: true });

  app.listen(4000, () => {
    console.log(`Server is running http://localhost:4000${server.graphqlPath}`);
  });
};

startServer();
