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
import { createServer } from 'http';

const startServer = async () => {
  const PORT = 4000
  const app = express();

  app.use(cors())

  const schema = await buildSchema({
    resolvers: [UserResolver, MessageResolver, ServerResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    validate: false
  });

  const apolloServer = new ApolloServer({ schema });

  apolloServer.applyMiddleware({ app });

  await mongoose.connect('mongodb://localhost/vueChat', { useNewUrlParser: true, useUnifiedTopology: true });

  const server = createServer(app);
  apolloServer.installSubscriptionHandlers(server)

  server.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`)
    console.log(`Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`)
  })
};

startServer();
