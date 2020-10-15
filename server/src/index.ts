import 'reflect-metadata';
import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors'
import path from 'path';
import { buildSchema } from 'type-graphql';
import { UserResolver } from '../Resolvers/userResolver';
import { MessageResolver } from '../Resolvers/messageResolver';
import { ServerResolver } from '../Resolvers/serverResolver'

const startServer = async () => {
  const app = express();

  app.use(cors())

  const schema = await buildSchema({
    resolvers: [UserResolver, MessageResolver, ServerResolver],
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
