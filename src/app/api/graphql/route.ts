// src/app/api/graphql/route.ts
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "@/graphql/schema";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    products: async (args: { limit?: number }) => {
      const limit = args?.limit ?? 50; // default if not provided
      return prisma.product.findMany({
        take: limit,
      });
    },
    getProductBySlug: async (
      _: unknown,
      { slug }: { slug: string },
      { prisma }: { prisma: PrismaClient }
    ) => {
      try {
        const product = await prisma.product.findUnique({ where: { slug } });
        if (!product) throw new Error("Product not found");
        return product;
      } catch (err) {
        console.error("Resolver error:", err);
        throw new Error("Something went wrong fetching product");
      }
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async () => ({ prisma }),
});

export { handler as GET, handler as POST };
