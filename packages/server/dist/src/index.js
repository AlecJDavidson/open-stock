"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const type_graphql_1 = require("type-graphql");
const client_1 = require("@prisma/client");
require("reflect-metadata");
const PartResolver_1 = require("./resolvers/PartResolver");
async function main() {
    const prisma = new client_1.PrismaClient();
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [PartResolver_1.PartResolver],
        emitSchemaFile: true, // Optional: Generates a schema.graphql file
    });
    const server = new apollo_server_1.ApolloServer({
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
