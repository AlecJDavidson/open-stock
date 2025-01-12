import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { PrismaClient } from '@prisma/client';
import 'reflect-metadata';
import { PartResolver } from './resolvers/PartResolver';

async function main() {
  const prisma = new PrismaClient();
  const schema = await buildSchema({
    resolvers: [PartResolver],
    emitSchemaFile: true, // Optional: Generates a schema.graphql file
  });

  const server = new ApolloServer({
    schema,
    context: () => ({ prisma }),
    cors: {
      origin: '*', // Allow all origins. You can specify specific origins if needed.
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed HTTP methods
      credentials: true, // If you need to support cookies or authentication tokens
      optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
    },
  });

  const { url } = await server.listen(3050);
  // const { url } = await server.listen({ host: '10.3.1.13', port: 3050 });
  console.log(`Server is running at ${url}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
