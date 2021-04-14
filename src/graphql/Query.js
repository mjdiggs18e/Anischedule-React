import { ApolloClient, InMemoryCache } from "@apollo/client";

var hash = window.location.hash.substring(1);
var params = {};
hash.split("&").map((hk) => {
  let temp = hk.split("=");
  return (params[temp[0]] = temp[1]);
});

export const token = params.access_token;

export const client = new ApolloClient({
  uri: "https://graphql.anilist.co/",
  cache: new InMemoryCache({
    typePolicies: {
      Page: {
        keyFields: [],
      },
    },
  }),
});

export const clientMutation = new ApolloClient({
  uri: "https://graphql.anilist.co/",
  cache: new InMemoryCache(),
  headers: {
    Authorization: "Bearer " + token,
  },
});
