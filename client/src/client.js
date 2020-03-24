import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";

/**
 * Create a new apollo client and export as default
 */

// network interface to access a graphQL server

const link = new HttpLink({ uri: "http://localhost:5000" });
const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache
});

// shorthand method for query
// const query = gql`
//  {
//   characters {
//     results {
//       id
//       name
//     }
//   }
// }
// `

// client.query({ query })
//   .then(res => console.log(res))

export default client;
