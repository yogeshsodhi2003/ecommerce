export const resolvers = {
  Query: {
    products: async (_, __, { prisma }) => {
      return await prisma.product.findMany();
    },
  },
};
