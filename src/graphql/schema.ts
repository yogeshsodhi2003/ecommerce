import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Product {
    id: String!
    title: String!
    slug: String!
    description: String!
    price: Float!
    images: [String]
  }

  type Query {
    products(limit: Int): [Product!]!
    getProductBySlug(slug: String!): Product
  }
`;
