import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Product {
    id: String!
    title: String!
    slug: String!
    description: String!
    price: Float!

    categories: [String!]!
    image: String!
  }

  type Query {
    products: [Product!]!
  }
  type Query {
   getProductBySlug(slug: String!): Product
}
`;
