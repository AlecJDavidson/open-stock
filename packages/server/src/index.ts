import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { PrismaClient } from '@prisma/client';
import 'reflect-metadata';

import { Part } from './types/Part';
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
  });

  const { url } = await server.listen(4000);
  console.log(`Server is running at ${url}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
