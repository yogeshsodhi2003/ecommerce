import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:3000/api/graphql", // your GraphQL API
});
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-apollo-operation-name": "GetProductBySlug",
      // 'authorization': `Bearer ${yourToken}`, // optional
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
