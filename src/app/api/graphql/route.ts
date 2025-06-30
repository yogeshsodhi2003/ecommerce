// src/app/api/graphql/route.ts
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from '@/graphql/schema';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

const resolvers = {
    Query: {
    products:  async() => {
      return  prisma.product.findMany();
    },
    getProductBySlug: async({ slug }: { slug: string }) =>{
      return prisma.product.findUnique({where: {slug: slug}})
    },
  },
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async () => ({ prisma }),
});

export { handler as GET, handler as POST };
